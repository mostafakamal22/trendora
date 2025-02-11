import { useQuery } from "@tanstack/react-query";
import { Cart as CartType } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { CreditCard, Trash } from "lucide-react";
import { useState } from "react";
import fetchData from "../../utils/fetchData";
import CartProductCard from "../CartProductCard/CartProductCard";
import handleError from "../../utils/handleError";
import deleteData from "../../utils/deleteData";
import updateData from "../../utils/updateData";
import MainSpinner from "../shared/MainSpinner";
import FetchDataError from "../shared/FetchDataError";
import toast from "@/lib/sonner";
import NoDataAvailable from "../shared/NoDataAvailable";

export default function Cart() {
  const [isDoingProductAction, setIsDoingProductAction] = useState(false);

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

    setIsDoingProductAction(true);

    try {
      const res = await deleteData({
        url: `/cart/${productId}`,
        token: token as string,
      });

      console.log(res);
      refetch();

      toast.success("Product removed from cart.");
    } catch (error) {
      handleError(error);
    } finally {
      setIsDoingProductAction(false);
    }
  }

  async function updateProductCount(productId: string, newCount: number) {
    if (newCount <= 0) return;
    setIsDoingProductAction(true);
    try {
      const res = await updateData({
        url: `/cart/${productId}`,
        data: { count: newCount },
        token: token as string,
      });

      console.log(res);
      refetch();
      toast.success("Product quantity updated.");
    } catch (error) {
      handleError(error);
    } finally {
      setIsDoingProductAction(false);
    }
  }

  async function onClearCart() {
    console.log("Clearing cart");
    setIsDoingProductAction(true);
    try {
      const res = await deleteData({
        url: "/cart",
        token: token as string,
      });

      console.log(res);
      refetch();
      toast.success("Your cart is empty.");
    } catch (error) {
      handleError(error);
    } finally {
      setIsDoingProductAction(false);
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
    return <FetchDataError name="cart items" />;
  }

  return (
    <section className="mt-5 md:mt-10">
      <h1>Almost Yours!</h1>

      {cartData?.numOfCartItems ? (
        <>
          <div className="max-w-md w-full mx-auto flex flex-col xs:flex-row justify-between items-center gap-2 mt-4">
            <p className="bg-green-600 text-primary-peach p-1 rounded-md shadow">
              Total items: {cartData.numOfCartItems}
            </p>
            <p className="bg-green-600 text-primary-peach p-1 rounded-md shadow">
              Total price: ${cartData.data?.totalCartPrice}
            </p>
          </div>

          <div className="grid gap-4 mt-4">
            {cartData.data.products.map((productElement) => (
              <CartProductCard
                key={productElement._id}
                price={productElement.price}
                count={productElement.count}
                productId={productElement?.product?._id}
                onRemoveFromCart={onRemoveFromCart}
                updateProductCount={updateProductCount}
                isDoingProductAction={isDoingProductAction}
                {...productElement.product}
              />
            ))}
          </div>

          <div className="max-w-lg w-full mx-auto mt-6 flex flex-col xs:flex-row items-stretch xs:items-center gap-4">
            <button
              onClick={() => onCheckout(cartData?.cartId)}
              className="btn flex-1 px-4 py-2 !bg-blue-600 !shadow-blue-600"
              disabled={isDoingProductAction}
            >
              <CreditCard />
              Checkout
            </button>
            <button
              onClick={onClearCart}
              className="btn flex-1 px-4 py-2 !bg-yellow-600 !shadow-yellow-600"
              disabled={isDoingProductAction}
            >
              <Trash />
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <NoDataAvailable name="items" />
      )}
    </section>
  );
}
