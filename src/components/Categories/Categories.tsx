import { useQuery } from "@tanstack/react-query";
import { Categories as CategoriesType } from "../../types";
import fetchData from "../../utils/fetchData";
import CategoryCard from "../CategoryCard/CategoryCard";

export default function Categories() {
  const {
    isLoading,
    isFetching,
    data: categoriesData,
    error,
    isError,
  } = useQuery<CategoriesType>({
    queryKey: ["categories"],
    queryFn: () => fetchData<CategoriesType>({ url: "/categories" }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    console.error("Fetching categories failed:", error);
    return (
      <div className="text-red-500 text-center">
        Error loading categories. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categoriesData?.data?.length ? (
        categoriesData.data.map((category) => (
          <CategoryCard key={category._id} {...category} />
        ))
      ) : (
        <p className="text-gray-500 text-center">No categories available.</p>
      )}
    </div>
  );
}
