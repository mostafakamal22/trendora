import { useQuery } from "@tanstack/react-query";
import { WishList } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import fetchData from "../../utils/fetchData";
import WishlistProductCard from "../WishlistProductCard/WishlistProductCard";
import postData from "../../utils/postData";
import deleteData from "../../utils/deleteData";
import handleError from "../../utils/handleError";
import MainSpinner from "../shared/MainSpinner";
import NoDataAvailable from "../shared/NoDataAvailable";
import FetchDataError from "../shared/FetchDataError";
import toast from "@/lib/sonner";

export default function Wishlist() {
  const [isDoingProductAction, setIsDoingProductAction] = useState(false);

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
    setIsDoingProductAction(true);
    try {
      const res = await deleteData({
        url: `/wishlist/${id}`,

        token: token as string,
      });

      console.log(res);

      refetch();
      toast.success("Product removed from wishlist.");
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

      const removedItem = await onRemove(id);

      console.log(removedItem);

      refetch();
      toast.success("Product added to cart.");
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
              isDoingProductAction={isDoingProductAction}
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
