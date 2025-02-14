import { Brands, Categories } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SetURLSearchParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { BsFillFilterCircleFill } from "react-icons/bs";
import { useClickAway } from "@uidotdev/usehooks";
import fetchData from "@/utils/fetchData";

type Props = {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleFilterChange: (key: string, value: string) => void;
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
};

export default function ProductsFilters({
  searchParams,
  setSearchKeyword,
  handleFilterChange,
  setSearchParams,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const pathname = useLocation()?.pathname;

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
    <div
      className={twMerge(
        "fixed top-0 z-10 w-60 min-h-screen flex flex-col items-center gap-3 px-3 py-5 bg-green-600 text-primary-peach shadow-lg transition-all",
        isOpen ? "left-0" : "-left-60"
      )}
      ref={ref}
    >
      {/* Toggle Button */}
      <button
        className="absolute left-full top-1/3 p-2 bg-green-600 text-primary-peach rounded-r"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle filters"
      >
        <BsFillFilterCircleFill size={20} />
      </button>

      <h4 className="text-xl font-bold uppercase drop-shadow pb-4 mb-5 border-b border-b-primary-peach">
        Filter Products
      </h4>

      {/* Search Keyword */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <label
          htmlFor="search-product"
          className="bg-custom-fadeOrange text-primary-default p-1 rounded-md shadow flex place-items-center"
        >
          Name
        </label>
        <input
          id="search-product"
          type="text"
          placeholder="Product name"
          aria-label="product name"
          onChange={(e) => setSearchKeyword(e.target.value.toLowerCase())}
          className="form-input font-medium text-xs"
        />
      </div>

      {/* Category Filter */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <label
          htmlFor="category"
          className="bg-custom-fadeOrange text-primary-default p-1 rounded-md shadow flex place-items-center"
        >
          Category
        </label>
        <select
          id="category"
          onChange={(e) => handleFilterChange("category[in]", e.target.value)}
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
        <label
          htmlFor="brand"
          className="bg-custom-fadeOrange text-primary-default p-1 rounded-md shadow flex place-items-center"
        >
          Brand
        </label>
        <select
          id="brand"
          onChange={(e) => handleFilterChange("brand", e.target.value)}
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
        <label
          htmlFor="price"
          className="bg-custom-fadeOrange text-primary-default p-1 rounded-md shadow flex place-items-center"
        >
          Price
        </label>

        <select
          id="price"
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
          <option value="0-50">Under $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200-500">$200 - $500</option>
          <option value="500-">Above $500</option>
        </select>
      </div>

      {/* Pages Limits */}
      <div className="w-full flex gap-2 text-xs font-bold">
        <label
          htmlFor="limit"
          className="bg-custom-fadeOrange text-primary-default p-1 rounded-md shadow flex place-items-center"
        >
          Limit
        </label>
        <select
          id="limit"
          onChange={(e) => handleFilterChange("limit", e.target.value)}
          value={searchParams?.get("limit") || "40"}
          className="form-input font-medium text-xs"
        >
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
}
