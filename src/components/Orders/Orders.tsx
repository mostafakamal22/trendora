import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Orders as OrdersType } from "../../types";
import OrderProductCard from "../OrderProductCard/OrderProductCard";
import fetchData from "../../utils/fetchData";

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
    return <div>Loading orders...</div>;
  }

  if (isError) {
    console.error(error);
    return <div>Error loading orders.</div>;
  }

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">
        My Orders ({ordersData?.length ?? 0})
      </h2>

      {ordersData?.length ? (
        <div className="grid gap-4 mt-4">
          {ordersData.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded-lg shadow-md bg-gray-100"
            >
              <h3 className="text-lg font-medium text-gray-800">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-700">
                Total: ${order.totalOrderPrice.toFixed(2)}
              </p>
              <p className="text-gray-700">
                Payment: {order.paymentMethodType === "card" ? "Card" : "Cash"}
              </p>
              <p className="text-gray-700">
                Status: {order.isPaid ? "Paid" : "Pending"} |{" "}
                {order.isDelivered ? "Delivered" : "Not Delivered"}
              </p>
              <p className="text-gray-700">
                Shipping: {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.details}
              </p>

              <div className="mt-4">
                {order.cartItems.map((item) => (
                  <OrderProductCard key={item._id} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">No orders found.</p>
      )}
    </div>
  );
}
