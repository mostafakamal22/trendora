import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Cart as CartType } from "../../types";
import { useLocalStorage, useWindowScroll } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { BsCreditCard, BsTrashFill } from "react-icons/bs";
import fetchData from "../../utils/fetchData";
import CartProductCard from "../CartProductCard/CartProductCard";
import deleteData from "../../utils/deleteData";
import updateData from "../../utils/updateData";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import handleToastPromise from "@/utils/handleToastPromise";
import useFormLoading from "@/hooks/useFormLoading";
import CartSkeleton from "./CartSkeleton";
import GradientText from "../ui/GradientText";

export default function Cart() {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const [token] = useLocalStorage("token");

  const [, setUserId] = useLocalStorage("userId");

  const [, scrollTo] = useWindowScroll();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    isLoading,
    isFetching,
    data: cartData,
    error,
    isError,
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
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
        queryClient.invalidateQueries({ queryKey: ["cart"], exact: true });
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
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
        queryClient.invalidateQueries({ queryKey: ["cart"], exact: true });
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
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
        queryClient.invalidateQueries({ queryKey: ["cart"], exact: true });
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
    return <CartSkeleton />;
  }

  if (isError) {
    console.error(error);
    return <FetchDataError name="cart items" />;
  }

  return (
    <section className="mt-5 md:mt-10">
      <GradientText>
        <h1 className="uppercase">
          {cartData?.numOfCartItems ? "Almost Yours!" : "Your Cart"}
        </h1>
      </GradientText>

      {cartData?.numOfCartItems ? (
        <>
          <div className="max-w-md w-full mx-auto flex flex-col xs:flex-row justify-between items-center gap-1.5 mt-4">
            <p className="bg-green-600 text-primary-peach p-1 rounded-md shadow m-0">
              Total items: {cartData.numOfCartItems}
            </p>
            <p className="bg-green-600 text-primary-peach p-1 rounded-md shadow m-0">
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
              <BsCreditCard size={18} />
              Checkout
            </button>
            <button
              onClick={onClearCart}
              className="btn flex-1 px-4 py-2 !bg-yellow-600 !shadow-yellow-600"
              disabled={isFormLoading}
            >
              <BsTrashFill size={18} />
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
