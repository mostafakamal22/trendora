import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Cart, Products as ProductsType, WishList } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useLocation, useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import fetchData from "../../utils/fetchData";
import ProductCard from "../ProductCard/ProductCard";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";
import deleteData from "@/utils/deleteData";
import postData from "@/utils/postData";
import ProductsPagination from "./ProductsPagination";
import ProductsFilters from "./ProductsFilters";
import ProductsHeader from "./ProductsHeader";
import ProductsSkeleton from "./ProductsSkeleton";

type Props = { category?: string; productIdToExclude?: string };

export default function Products({ category, productIdToExclude }: Props) {
  const [token] = useLocalStorage("token");

  const pathname = useLocation()?.pathname;

  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const [searchKeyword, setSearchKeyword] = useState("");

  // Construct API URL dynamically from URL parameters
  const [searchParams, setSearchParams] = useSearchParams();

  const constructUrl = useMemo(() => {
    const baseUrl = "/products";

    if (pathname === "/" || pathname?.startsWith("/home")) {
      return `${baseUrl}?limit=20`;
    }

    if (pathname?.startsWith("/products") && searchParams?.size === 0) {
      return `${baseUrl}?page=1`;
    }

    if (pathname?.startsWith("/productDetails")) {
      return `${baseUrl}?category[in]=${category}&limit=6`;
    }

    const queryStrings: string[] = [];

    // Add filtering and pagination options
    searchParams.forEach((value, key) => {
      queryStrings.push(`${key}=${value}`);
    });

    return `${baseUrl}?${queryStrings.join("&")}`;
  }, [category, pathname, searchParams]);

  const queryKey = useMemo(() => {
    if (category) return `category[in]=${category}&limit=6`;

    if (pathname?.startsWith("/products") && searchParams?.size === 0)
      return "page=1";

    return searchParams.toString();
  }, [category, searchParams, pathname]);

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
    queryKey: ["products", queryKey],
    queryFn: () => fetchData<ProductsType>({ url: constructUrl }),
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
    return <ProductsSkeleton />;
  }

  if (isError) {
    console.error("Fetching products failed:", error);
    return <FetchDataError name="products" />;
  }

  const filteredProducts = productsData?.data?.filter(
    (product) =>
      product?._id !== productIdToExclude &&
      product.title.toLowerCase().includes(searchKeyword)
  );

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-10">
        {/* Header */}
        <ProductsHeader />

        {/* Filter Options */}
        <ProductsFilters
          handleFilterChange={handleFilterChange}
          setSearchKeyword={setSearchKeyword}
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
