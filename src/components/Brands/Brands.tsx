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
      <header className="col-span-full mx-auto">
        <GradientText>
          <h1 className="max-w-md mx-auto uppercase">Our Trusted Brands</h1>
        </GradientText>

        <p className="text-sm mb-5">
          Boycott zionist{" "}
          <a
            href="https://bdnaash.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-default font-semibold"
          >
            supporters'
          </a>{" "}
          brands and products.
          <br />
          <span className="inline-block mt-2 uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-slate-300 to-red-600">
            FREE Palestine
          </span>
        </p>
      </header>

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
