import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Cart, Products as ProductsType, WishList } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import fetchData from "../../utils/fetchData";
import ProductCard from "../ProductCard/ProductCard";
import MainSpinner from "../shared/MainSpinner";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";
import deleteData from "@/utils/deleteData";
import postData from "@/utils/postData";
import ProductsPagination from "./ProductsPagination";
import ProductsFilters from "./ProductsFilters";
import ProductsHeader from "./ProductsHeader";

export default function Products() {
  const [token] = useLocalStorage("token");

  const pathname = useLocation()?.pathname;

  const { isFormLoading, setIsFormLoading } = useFormLoading();
  const [searchKeyword, setSearchKeyword] = useState("");

  // Construct API URL dynamically from URL parameters
  const [searchParams, setSearchParams] = useSearchParams();

  const constructUrl = () => {
    const baseUrl = "/products";

    if (pathname === "/") {
      return `${baseUrl}?limit=20`;
    }

    const queryStrings: string[] = [];

    // Add filtering and pagination options
    searchParams.forEach((value, key) => {
      queryStrings.push(`${key}=${value}`);
    });

    return `${baseUrl}?${queryStrings.join("&")}`;
  };

  const queryClient = useQueryClient();

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () =>
      fetchData<WishList>({
        url: "/wishlist",
        token: token as string | undefined,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetchData<Cart>({
        url: "/cart",
        token: token as string | undefined,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const {
    isLoading,
    isFetching,
    data: productsData,
    error,
    isError,
  } = useQuery<ProductsType>({
    queryKey: ["products", searchParams.toString()],
    queryFn: () => fetchData<ProductsType>({ url: constructUrl() }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  // Handle Pagination
  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  // Handle Filtering
  const handleFilterChange = (key: string, value: string) => {
    if (value) {
      searchParams.set(key, value);
      searchParams.delete("page");
    } else {
      searchParams.delete(key);
    }
    setSearchParams(searchParams);
  };

  async function onAddToWishlist(id: string) {
    console.log("added to whislist", id);

    setIsFormLoading(true);

    handleToastPromise({
      promise: postData({
        url: "/wishlist",
        data: {
          productId: id,
        },
        token: token as string,
      }),
      onSuccess: () => {
        setIsFormLoading(false);
        queryClient.refetchQueries({ queryKey: ["wishlist"], exact: true });
      },
      successMsg: "Product added to your wishlist",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  async function onAddToCart(id: string) {
    console.log("added to cart", id);

    setIsFormLoading(true);

    handleToastPromise({
      promise: (async () => {
        const res = await postData({
          url: "/cart",
          data: {
            productId: id,
          },
          token: token as string,
        });

        console.log(res);

        const removedItem = await deleteData({
          url: `/wishlist/${id}`,
          token: token as string,
        });

        console.log(removedItem);

        return res;
      })(),
      onSuccess: () => {
        setIsFormLoading(false);
        queryClient.invalidateQueries({ queryKey: ["wishlist"], exact: true });
        queryClient.refetchQueries({ queryKey: ["cart"], exact: true });
      },
      successMsg: "Product added to your cart",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  if (isLoading || isFetching) {
    return <MainSpinner size={50} className="h-[50vh]" />;
  }

  if (isError) {
    console.error("Fetching products failed:", error);
    return <FetchDataError name="products" />;
  }

  const filteredProducts = productsData?.data?.filter((product) =>
    product.title.toLowerCase().includes(searchKeyword)
  );

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-10">
        {/* Header */}
        <ProductsHeader />

        {/* Filter Options */}
        <ProductsFilters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          setSearchKeyword={setSearchKeyword}
          handleFilterChange={handleFilterChange}
        />

        {filteredProducts?.length ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              onAddToCart={onAddToCart}
              onAddToWishlist={onAddToWishlist}
              isFormLoading={isFormLoading}
              wishlistData={wishlistData}
              cartData={cartData}
              {...product}
            />
          ))
        ) : (
          <div className="col-span-full">
            <NoDataAvailable name="products" />
          </div>
        )}
      </section>

      {/* Pagination */}
      {filteredProducts && filteredProducts?.length > 0 && (
        <ProductsPagination
          handlePageChange={handlePageChange}
          productsData={productsData}
        />
      )}
    </>
  );
}
