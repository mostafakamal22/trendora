import { useQuery } from "@tanstack/react-query";
import { Categories as CategoriesType } from "../../types";
import fetchData from "../../utils/fetchData";
import CategoryCard from "../CategoryCard/CategoryCard";
import MainSpinner from "../shared/MainSpinner";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";

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
    return <MainSpinner size={50} className="h-[50vh]" />;
  }

  if (isError) {
    console.error("Fetching categories failed:", error);
    return <FetchDataError name="categories" />;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-10">
      <h1>Trendy Picks, Crafted for You.</h1>
      {categoriesData?.data?.length ? (
        categoriesData.data.map((category) => (
          <CategoryCard key={category._id} {...category} />
        ))
      ) : (
        <NoDataAvailable name="categories" />
      )}
    </section>
  );
}
