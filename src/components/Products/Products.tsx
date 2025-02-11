import { useQuery } from "@tanstack/react-query";
import { Products as ProductsType } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import fetchData from "../../utils/fetchData";
import ProductCard from "../ProductCard/ProductCard";
import postData from "../../utils/postData";
import handleError from "../../utils/handleError";
import MainSpinner from "../shared/MainSpinner";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import toast from "@/lib/sonner";

export default function Products() {
  const [isDoingProductAction, setIsDoingProductAction] = useState(false);

  const [token] = useLocalStorage("token");

  const {
    isLoading,
    isFetching,
    data: productsData,
    error,
    isError,
  } = useQuery<ProductsType>({
    queryKey: ["products"],
    queryFn: () => fetchData<ProductsType>({ url: "/products?limit=15" }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  async function onAddToWishlist(id: string) {
    console.log("added to whislist", id);

    setIsDoingProductAction(true);

    try {
      const res = await postData({
        url: "/wishlist",
        data: {
          productId: id,
        },
        token: token as string,
      });

      console.log(res);

      toast.success("Product added to wishlist");
    } catch (error) {
      handleError(error);
    } finally {
      setIsDoingProductAction(false);
    }
  }

  async function onAddToCart(id: string) {
    console.log("added to cart", id);

    setIsDoingProductAction(true);

    try {
      const res = await postData({
        url: "/cart",
        data: {
          productId: id,
        },
        token: token as string,
      });

      console.log(res);

      toast.success("Product added to cart");
    } catch (error) {
      handleError(error);
    } finally {
      setIsDoingProductAction(false);
    }
  }

  if (isLoading || isFetching) {
    return <MainSpinner size={50} className="h-[50vh]" />;
  }

  if (isError) {
    console.error("Fetching products failed:", error);
    return <FetchDataError name="products" />;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 md:mt-10">
      <h1>Trendy Looks, Timeless Style. </h1>

      {productsData?.data?.length ? (
        productsData.data.map((product) => (
          <ProductCard
            key={product._id}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
            isDoingProductAction={isDoingProductAction}
            {...product}
          />
        ))
      ) : (
        <NoDataAvailable name="products" />
      )}
    </section>
  );
}
