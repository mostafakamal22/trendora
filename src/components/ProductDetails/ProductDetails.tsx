import { useParams } from "react-router-dom";
import { Product } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import handleError from "../../utils/handleError";
import ProductCarousel from "./ProductCarousel";
import ProductInfoSection from "./ProductInfoSection";
import FetchDataError from "../shared/FetchDataError";
import MainSpinner from "../shared/MainSpinner";
import toast from "@/lib/sonner";
import NoDataAvailable from "../shared/NoDataAvailable";

export default function ProductDetails() {
  const [isDoingProductAction, setIsDoingProductAction] = useState(false);

  const [token] = useLocalStorage("token");

  const { id } = useParams();

  const {
    isLoading,
    isFetching,
    data: productData,
    error,
    isError,
  } = useQuery<{ data: Product }>({
    queryKey: ["products", id],
    queryFn: () => fetchData<{ data: Product }>({ url: `/products/${id}` }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

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
    console.error("Fetching product failed:", error);
    return <FetchDataError name="product" />;
  }

  if (!productData) {
    return <NoDataAvailable name="product" />;
  }

  const { data: product } = productData;

  return (
    <div className="py-4 flex flex-col items-center lg:items-start lg:flex-row gap-8">
      <ProductCarousel {...product} />

      <ProductInfoSection
        onAddToCart={onAddToCart}
        product={product}
        isDoingProductAction={isDoingProductAction}
      />
    </div>
  );
}
