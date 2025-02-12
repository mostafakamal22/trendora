import { useParams } from "react-router-dom";
import { Product } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import fetchData from "../../utils/fetchData";
import postData from "../../utils/postData";
import ProductCarousel from "./ProductCarousel";
import ProductInfoSection from "./ProductInfoSection";
import FetchDataError from "../shared/FetchDataError";
import MainSpinner from "../shared/MainSpinner";
import NoDataAvailable from "../shared/NoDataAvailable";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";

export default function ProductDetails() {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

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
    console.log("adding to cart", id);

    setIsFormLoading(true);

    handleToastPromise({
      promise: postData({
        url: "/cart",
        data: {
          productId: id,
        },
        token: token as string,
      }),
      onSuccess: () => {
        setIsFormLoading(false);
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
        isFormLoading={isFormLoading}
      />
    </div>
  );
}
