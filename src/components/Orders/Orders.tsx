import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Orders as OrdersType } from "../../types";
import OrderProductCard from "../OrderProductCard/OrderProductCard";
import fetchData from "../../utils/fetchData";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import OrdersSkeleton from "./OrdersSkeleton";
import GradientText from "../ui/GradientText";

export default function Orders() {
  const [token] = useLocalStorage("token");
  const [userId] = useLocalStorage("userId");

  const {
    isLoading,
    isFetching,
    data: ordersData,
    error,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      fetchData<OrdersType>({
        url: `/orders/user/${userId}`,
        token: token as string | undefined,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <OrdersSkeleton />;
  }

  if (isError) {
    console.error(error);
    return <FetchDataError name="cart items" />;
  }

  return (
    <section className="mt-5 md:mt-10">
      <GradientText>
        <h1 className="mb-5 uppercase">Track Your Orders </h1>
      </GradientText>

      {ordersData?.length ? (
        <div className="grid gap-4 mt-4">
          {ordersData.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-md bg-gray-50"
            >
              <h3 className="text-gray-800 font-kumbh">
                Order ID: {order._id}
              </h3>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 items-center">
                <p className="bg-green-600 text-primary-peach p-1 rounded-md shadow">
                  Total: ${order.totalOrderPrice.toFixed(2)}
                </p>
                <p className="bg-green-600 text-primary-peach p-1 rounded-md shadow">
                  Payment:{" "}
                  {order.paymentMethodType === "card" ? "Card" : "Cash"}
                </p>
                <p className="bg-green-600 text-primary-peach p-1 rounded-md shadow">
                  Status: {order.isPaid ? "Paid" : "Pending"} |{" "}
                  {order.isDelivered ? "Delivered" : "Not Delivered"}
                </p>
                <p className="bg-green-600 text-primary-peach p-1 rounded-md shadow">
                  Shipping: {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.details}
                </p>
              </div>

              <div className="mt-4 space-y-2">
                {order.cartItems.map((item) => (
                  <OrderProductCard key={item._id} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NoDataAvailable name="orders" />
      )}
    </section>
  );
}
