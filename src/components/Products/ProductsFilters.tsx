import { Brands, Categories } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import fetchData from "@/utils/fetchData";

type Props = {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleFilterChange: (key: string, value: string) => void;
};

export default function ProductsFilters({
  setSearchKeyword,
  handleFilterChange,
}: Props) {
  const pathname = useLocation()?.pathname;

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchData<Categories>({ url: "/categories" }),
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: brandsData,
    isLoading: isBrandsLoading,
    isError: isBrandsError,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: () => fetchData<Brands>({ url: "/brands" }),
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isCategoriesLoading || isBrandsLoading) {
    return null;
  }

  if (isCategoriesError || isBrandsError) {
    return null;
  }

  if (pathname === "/") return null;

  return (
    <div className="col-span-full bg-custom-fadeOrange text-primary-default grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 p-3 rounded-md shadow">
      <h4 className="col-span-full text-sm font-bold uppercase pb-2 mb-3 border-b border-b-primary-peach">
        Filter Products
      </h4>

      {/* Search Keyword */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <input
          aria-label="Search product by name"
          type="text"
          placeholder="Search by name"
          onChange={(e) => {
            setSearchKeyword(e.target.value.toLowerCase());
          }}
          className="form-input font-medium text-xs"
        />
      </div>

      {/* Category Filter */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <select
          id="category"
          onChange={(e) => {
            handleFilterChange("category[in]", e.target.value);
          }}
          value={searchParams?.get("category[in]") || ""}
          className="form-input font-medium text-xs"
        >
          <option value="">All Categories</option>
          {categoriesData?.data.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <select
          aria-label="brand"
          onChange={(e) => {
            handleFilterChange("brand", e.target.value);
          }}
          value={searchParams?.get("brand") || ""}
          className="form-input font-medium text-xs"
        >
          <option value="">All Brands</option>
          {brandsData?.data?.map((brand) => (
            <option key={brand._id} value={brand._id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Prices Filters */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <select
          aria-label="price"
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              handleFilterChange("price[gte]", value.split("-")[0]);
              handleFilterChange("price[lte]", value.split("-")[1] || "");
            } else {
              searchParams.delete("price[gte]");
              searchParams.delete("price[lte]");
              setSearchParams(searchParams);
            }
          }}
          value={`${searchParams.get("price[gte]") || ""}-${
            searchParams.get("price[lte]") || ""
          }`}
          className="form-input font-medium text-xs"
        >
          <option value="">All Prices</option>
          <option value="0-200">Under $200</option>
          <option value="200-500">$200 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000-5000">$1000 - $5000</option>
          <option value="5000-10000">$5000 - $10000</option>
          <option value="10000-">Above $10000</option>
        </select>
      </div>

      {/* Sort Price Filter */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <select
          aria-label="sort"
          onChange={(e) => {
            handleFilterChange("sort", e.target.value);
          }}
          value={searchParams?.get("sort") || ""}
          className="form-input font-medium text-xs"
        >
          <option value="">Normal Sort</option>
          <option value="-price">Price: High to Low</option>
          <option value="+price">Price: Low to High</option>
        </select>
      </div>

      {/* Pages Limits */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <select
          aria-label="limit"
          onChange={(e) => {
            handleFilterChange("limit", e.target.value);
          }}
          value={searchParams?.get("limit") || "40"}
          className="form-input font-medium text-xs"
        >
          <option value="15">15 Product/Page</option>
          <option value="30">30 Product/Page</option>
          <option value="40">40 Product/Page</option>
          <option value="50">50 Product/Page</option>
        </select>
      </div>
    </div>
  );
}
