import { useQuery } from "@tanstack/react-query";
import { Products as ProductsType } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import fetchData from "../../utils/fetchData";
import ProductCard from "../ProductCard/ProductCard";
import postData from "../../utils/postData";
import MainSpinner from "../shared/MainSpinner";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";

export default function Products() {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

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
    console.error("Fetching products failed:", error);
    return <FetchDataError name="products" />;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-10">
      <h1>Trendy Looks, Timeless Style. </h1>

      {productsData?.data?.length ? (
        productsData.data.map((product) => (
          <ProductCard
            key={product._id}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
            isFormLoading={isFormLoading}
            {...product}
          />
        ))
      ) : (
        <NoDataAvailable name="products" />
      )}
    </section>
  );
}
