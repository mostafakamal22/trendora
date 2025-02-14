import ProductsHeader from "./ProductsHeader";

export default function ProductsSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 md:mt-10">
      {/* Header */}
      <ProductsHeader />

      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          role="status"
          className="card relative group animate-pulse"
        >
          {/* Image */}
          <div className="w-full h-80 bg-primary-sunset rounded-md flex">
            <svg
              className="w-10 h-10 text-primary-peach m-auto"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>

          {/* Wishlist & Cart Buttons */}
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <div className="w-8 h-8 bg-primary-peach rounded-full" />
            <div className="w-8 h-8 bg-primary-peach rounded-full" />
          </div>

          <div className="p-4 text-left">
            {/* Title */}
            <div className="h-4 bg-primary-peach rounded-full w-3/4 mb-2" />

            {/* Description */}
            <div className="h-3 bg-primary-peach rounded-full mb-2.5" />
            <div className="h-3 bg-primary-peach rounded-full max-w-[240px] mb-2.5" />

            {/* Price & Discount */}
            <div className="flex items-center mt-2 gap-2">
              <div className="h-5 bg-primary-peach rounded-full w-20" />
              <div className="h-5 bg-primary-peach rounded-full w-14" />
              <div className="h-5 bg-primary-peach rounded-full w-12" />
            </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </section>
  );
}
