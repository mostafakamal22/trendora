import { useParams } from "react-router-dom";
import { Cart, Product } from "../../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import deleteData from "@/utils/deleteData";

export default function ProductDetails() {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const [token] = useLocalStorage("token");

  const { id } = useParams();

  const queryClient = useQueryClient();

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
        cartData={cartData}
      />
    </div>
  );
}
