import { useQuery } from "@tanstack/react-query";
import { WishList } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import fetchData from "../../utils/fetchData";
import WishlistProductCard from "../WishlistProductCard/WishlistProductCard";
import postData from "../../utils/postData";
import deleteData from "../../utils/deleteData";
import MainSpinner from "../shared/MainSpinner";
import NoDataAvailable from "../shared/NoDataAvailable";
import FetchDataError from "../shared/FetchDataError";
import useFormLoading from "@/hooks/useFormLoading";
import handleToastPromise from "@/utils/handleToastPromise";

export default function Wishlist() {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const [token] = useLocalStorage("token");

  const {
    isLoading,
    isFetching,
    data: wishlistData,
    error,
    isError,
    refetch,
  } = useQuery({
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

  async function onRemove(id: string) {
    console.log("removed from wishlist", id);
    setIsFormLoading(true);

    handleToastPromise({
      promise: deleteData({
        url: `/wishlist/${id}`,
        token: token as string,
      }),
      onSuccess: () => {
        setIsFormLoading(false);
        refetch();
      },
      successMsg: "Product removed from your wishlist.",
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
        refetch();
      },
      successMsg: "Product added to your cart.",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  if (isLoading || isFetching) {
    return <MainSpinner size={50} className="h-[50vh]" />;
  }

  if (isError) {
    console.error(error);
    return <FetchDataError name="wishlist items" />;
  }

  return (
    <section className="mt-5 md:mt-10">
      <h2>Your Favorite Picks ({wishlistData?.count ?? 0})</h2>

      {wishlistData?.count ? (
        <div className="grid gap-4 mt-4">
          {wishlistData.data.map((product) => (
            <WishlistProductCard
              key={product._id}
              onAddToCart={onAddToCart}
              onRemove={onRemove}
              isFormLoading={isFormLoading}
              {...product}
            />
          ))}
        </div>
      ) : (
        <NoDataAvailable name="items" />
      )}
    </section>
  );
}
