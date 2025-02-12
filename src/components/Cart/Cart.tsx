import { useQuery } from "@tanstack/react-query";
import { Cart as CartType } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { CreditCard, Trash } from "lucide-react";
import fetchData from "../../utils/fetchData";
import CartProductCard from "../CartProductCard/CartProductCard";
import deleteData from "../../utils/deleteData";
import updateData from "../../utils/updateData";
import MainSpinner from "../shared/MainSpinner";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";

export default function Cart() {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

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

    setIsFormLoading(true);

    handleToastPromise({
      promise: deleteData({
        url: `/cart/${productId}`,
        token: token as string,
      }),
      onSuccess: () => {
        setIsFormLoading(false);
        refetch();
      },
      successMsg: "Product removed from your cart.",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  async function updateProductCount(productId: string, newCount: number) {
    if (newCount <= 0) return;

    setIsFormLoading(true);

    handleToastPromise({
      promise: updateData({
        url: `/cart/${productId}`,
        data: { count: newCount },
        token: token as string,
      }),
      onSuccess: () => {
        setIsFormLoading(false);
        refetch();
      },
      successMsg: "Product quantity updated.",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  }

  async function onClearCart() {
    console.log("Clearing cart");

    setIsFormLoading(true);

    handleToastPromise({
      promise: deleteData({
        url: "/cart",
        token: token as string,
      }),
      onSuccess: () => {
        setIsFormLoading(false);
        refetch();
      },
      successMsg: "Your cart is empty now.",
      onError: () => {
        setIsFormLoading(false);
      },
    });
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
      {cartData?.numOfCartItems ? <h1>Almost Yours!</h1> : <h1>Your Cart</h1>}

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
                isFormLoading={isFormLoading}
                {...productElement.product}
              />
            ))}
          </div>

          <div className="max-w-lg w-full mx-auto mt-6 flex flex-col xs:flex-row items-stretch xs:items-center gap-4">
            <button
              onClick={() => onCheckout(cartData?.cartId)}
              className="btn flex-1 px-4 py-2 !bg-blue-600 !shadow-blue-600"
              disabled={isFormLoading}
            >
              <CreditCard />
              Checkout
            </button>
            <button
              onClick={onClearCart}
              className="btn flex-1 px-4 py-2 !bg-yellow-600 !shadow-yellow-600"
              disabled={isFormLoading}
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
