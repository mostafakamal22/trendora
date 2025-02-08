import { useQuery } from "@tanstack/react-query";
import { WishList } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import fetchData from "../../utils/fetchData";
import WishlistProductCard from "../WishlistProductCard/WishlistProductCard";
import postData from "../../utils/postData";
import deleteData from "../../utils/deleteData";
import handleError from "../../utils/handleError";

export default function Wishlist() {
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

    try {
      const res = await deleteData({
        url: `/wishlist/${id}`,

        token: token as string,
      });

      console.log(res);

      refetch();
    } catch (error) {
      handleError(error);
    }
  }

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

      refetch();
    } catch (error) {
      handleError(error);
    }
  }

  if (isLoading || isFetching) {
    return <div>Loading wishlist...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>Error loading wishlist.</div>;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">
        Wishlist ({wishlistData?.count ?? 0})
      </h2>

      {wishlistData?.count ? (
        <div className="grid gap-4 mt-4">
          {wishlistData.data.map((product) => (
            <WishlistProductCard
              key={product._id}
              {...product}
              onAddToCart={onAddToCart}
              onRemove={onRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No items in your wishlist.</p>
      )}
    </div>
  );
}
