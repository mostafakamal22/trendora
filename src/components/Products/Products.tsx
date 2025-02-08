import { useQuery } from "@tanstack/react-query";
import { Products as ProductsType } from "../../types";
import fetchData from "../../utils/fetchData";
import ProductCard from "../ProductCard/ProductCard";

export default function Products() {
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
          <ProductCard key={product._id} {...product} />
        ))
      ) : (
        <p className="text-gray-500 text-center">No products available.</p>
      )}
    </div>
  );
}
