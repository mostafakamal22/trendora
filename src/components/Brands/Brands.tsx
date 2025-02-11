import { useQuery } from "@tanstack/react-query";
import { Brands as BrandsType } from "../../types";
import fetchData from "../../utils/fetchData";
import BrandCard from "../BrandCard/BrandCard";
import MainSpinner from "../shared/MainSpinner";
import FetchDataError from "../shared/FetchDataError";

export default function Brands() {
  const {
    isLoading,
    isFetching,
    data: brandsData,
    error,
    isError,
  } = useQuery<BrandsType>({
    queryKey: ["brands"],
    queryFn: () => fetchData<BrandsType>({ url: "/brands" }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <MainSpinner size={50} className="h-[50vh]" />;
  }

  if (isError) {
    console.error(error);

    return <FetchDataError name="brands" />;
  }

  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 md:mt-10">
      <h1>Our Trusted Brands.</h1>
      {brandsData?.data?.map((brand) => (
        <BrandCard key={brand._id} {...brand} />
      ))}
    </section>
  );
}
