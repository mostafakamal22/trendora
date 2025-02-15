import { useQuery } from "@tanstack/react-query";
import { Brands as BrandsType } from "../../types";
import fetchData from "../../utils/fetchData";
import BrandCard from "../BrandCard/BrandCard";
import FetchDataError from "../shared/FetchDataError";
import NoDataAvailable from "../shared/NoDataAvailable";
import BrandsSkeleton from "./BrandsSkeleton";
import GradientText from "../ui/GradientText";

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
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <BrandsSkeleton />;
  }

  if (isError) {
    console.error(error);
    return <FetchDataError name="brands" />;
  }

  return (
    <section className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5 md:mt-10">
      <GradientText className="col-span-full mx-auto">
        <h1 className="max-w-md mx-auto uppercase">Our Trusted Brands</h1>
      </GradientText>

      {brandsData?.data?.length ? (
        brandsData?.data?.map((brand) => (
          <BrandCard key={brand._id} {...brand} />
        ))
      ) : (
        <div className="col-span-full">
          <NoDataAvailable name="brands" />
        </div>
      )}
    </section>
  );
}
