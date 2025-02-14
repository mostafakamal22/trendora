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
          <div className="w-full h-80 bg-primary-peach rounded-md" />

          {/* Wishlist & Cart Buttons */}
          <div className="absolute right-2 top-2 flex flex-col gap-2">
            <div className="w-10 h-10 bg-primary-peach rounded-full" />
            <div className="w-10 h-10 bg-primary-peach rounded-full" />
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
