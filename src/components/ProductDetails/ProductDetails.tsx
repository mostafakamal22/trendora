import { useParams } from "react-router-dom";
import { Product } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import handleError from "../../utils/handleError";
import ProductCarousel from "./ProductCarousel";
import ProductInfoSection from "./ProductInfoSection";

export default function ProductDetails() {
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
    try {
      const res = await postData({
        url: "/cart",
        data: {
          productId: id,
        },
        token: token as string,
      });

      console.log(res);
    } catch (error) {
      handleError(error);
    }
  }

  if (isLoading || isFetching) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    console.error("Fetching products failed:", error);
    return (
      <div className="text-red-500 text-center">
        Error loading products. Please try again later.
      </div>
    );
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  const { data: product } = productData;

  return (
    <div className="py-4 flex flex-col items-center lg:items-start lg:flex-row gap-8">
      <ProductCarousel {...product} />

      <ProductInfoSection onAddToCart={onAddToCart} product={product} />
    </div>
  );
}
