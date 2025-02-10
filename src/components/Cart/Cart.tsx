import { useQuery } from "@tanstack/react-query";
import { Cart as CartType } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { CreditCard, Trash } from "lucide-react";
import fetchData from "../../utils/fetchData";
import CartProductCard from "../CartProductCard/CartProductCard";
import handleError from "../../utils/handleError";
import deleteData from "../../utils/deleteData";
import updateData from "../../utils/updateData";
import MainSpinner from "../shared/MainSpinner";

export default function Cart() {
  const [token] = useLocalStorage("token");
  const [, setUserId] = useLocalStorage("userId");

  const navigate = useNavigate();

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

  function onCheckout(cartId: string) {
    setUserId(cartData?.data?.cartOwner);

    navigate(`/check-out/${cartId}`);
  }

  if (isLoading || isFetching) {
    return <MainSpinner size={50} className="h-[50vh]" />;
  }

  if (isError) {
    console.error(error);
    return <div>Error loading cart.</div>;
  }

  return (
    <div className="p-4">
      <h1>Almost Yours!</h1>

      {cartData?.numOfCartItems ? (
        <>
          <div className="flex justify-between items-center gap-2  mt-4">
            <p className="text-gray-700">
              Total items: {cartData.numOfCartItems}
            </p>
            <p className="text-gray-700">
              Total price: ${cartData.data?.totalCartPrice}
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

          <div className="max-w-lg w-full mx-auto mt-6 flex items-center gap-4">
            <button
              onClick={() => onCheckout(cartData?.cartId)}
              className="btn flex-1 px-4 py-2 !bg-green-500 !shadow-green-600"
            >
              <CreditCard />
              Checkout
            </button>
            <button
              onClick={onClearCart}
              className="btn flex-1 px-4 py-2 !bg-primary-sunset !shadow-yellow-600"
            >
              <Trash />
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
