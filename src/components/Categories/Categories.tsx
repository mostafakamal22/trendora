import { useQuery } from "@tanstack/react-query";
import { Categories as CategoriesType } from "../../types";
import fetchData from "../../utils/fetchData";
import CategoryCard from "../CategoryCard/CategoryCard";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import CategoriesHeader from "./CategoriesHeader";
import CategoriesSkeleton from "./CategoriesSkeleton";

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
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <CategoriesSkeleton />;
  }

  if (isError) {
    console.error("Fetching categories failed:", error);
    return <FetchDataError name="categories" />;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-10">
      <CategoriesHeader />

      {categoriesData?.data?.length ? (
        categoriesData.data.map((category) => (
          <CategoryCard key={category._id} {...category} />
        ))
      ) : (
        <div className="col-span-full">
          <NoDataAvailable name="categories" />
        </div>
      )}
    </section>
  );
}
