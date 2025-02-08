import { useQuery } from "@tanstack/react-query";
import { Products as ProductsType } from "../../types";
import { useLocalStorage } from "@uidotdev/usehooks";
import fetchData from "../../utils/fetchData";
import ProductCard from "../ProductCard/ProductCard";
import postData from "../../utils/postData";
import handleError from "../../utils/handleError";

export default function Products() {
  const [token] = useLocalStorage("token");

  const {
    isLoading,
    isFetching,
    data: productsData,
    error,
    isError,
  } = useQuery<ProductsType>({
    queryKey: ["products"],
    queryFn: () => fetchData<ProductsType>({ url: "/products?limit=15" }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  async function onAddToWishlist(id: string) {
    console.log("added to whislist", id);

    try {
      const res = await postData({
        url: "/wishlist",
        data: {
          productId: id,
        },
        token: token as string,
      });

      console.log(res);
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
    } catch (error) {
      handleError(error);
    }
  }

  if (isLoading || isFetching) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    console.error("Fetching products failed:", error);
    return (
      <div className="text-red-500 text-center">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {productsData?.data?.length ? (
        productsData.data.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
            onAddToCart={onAddToCart}
            onAddToWishlist={onAddToWishlist}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">No products available.</p>
      )}
    </div>
  );
}
