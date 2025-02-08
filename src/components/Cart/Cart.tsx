import { useQuery } from "@tanstack/react-query";
import { Cart as CartType } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import fetchData from "../../utils/fetchData";
import CartProductCard from "../CartProductCard/CartProductCard";
import handleError from "../../utils/handleError";
import deleteData from "../../utils/deleteData";
import updateData from "../../utils/updateData";

export default function Cart() {
  const [token] = useLocalStorage("token");

  const {
    isLoading,
    isFetching,
    data: cartData,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: () =>
      fetchData<CartType>({
        url: "/cart",
        token: token as string | undefined,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  async function onRemoveFromCart(productId: string) {
    console.log("removed from cart", productId);

    try {
      const res = await deleteData({
        url: `/cart/${productId}`,
        token: token as string,
      });

      console.log(res);
      refetch();
    } catch (error) {
      handleError(error);
    }
  }

  async function updateProductCount(productId: string, newCount: number) {
    if (newCount <= 0) return;

    try {
      const res = await updateData({
        url: `/cart/${productId}`,
        data: { count: newCount },
        token: token as string,
      });

      console.log(res);
      refetch();
    } catch (error) {
      handleError(error);
    }
  }

  async function onClearCart() {
    console.log("Clearing cart");

    try {
      const res = await deleteData({
        url: "/cart",
        token: token as string,
      });

      console.log(res);
      refetch();
    } catch (error) {
      handleError(error);
    }
  }

  if (isLoading || isFetching) {
    return <div>Loading cart...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>Error loading cart.</div>;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Cart</h2>

      {cartData?.numOfCartItems ? (
        <>
          <div className="mt-4">
            <p className="text-gray-700">
              Total items: {cartData.numOfCartItems}
            </p>
            <p className="text-gray-700">
              Total price: ${cartData.data?.totalCartPrice?.toFixed(2)}
            </p>
          </div>

          <div className="grid gap-4 mt-4">
            {cartData.data.products.map((productElement) => (
              <CartProductCard
                key={productElement._id}
                {...productElement.product}
                price={productElement.price}
                count={productElement.count}
                productId={productElement?.product?._id}
                onRemoveFromCart={onRemoveFromCart}
                updateProductCount={updateProductCount}
              />
            ))}
          </div>

          <div className="mt-4 flex gap-4">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
              Checkout
            </button>

            <button
              onClick={onClearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500 mt-2">No items in your cart.</p>
      )}
    </div>
  );
}
