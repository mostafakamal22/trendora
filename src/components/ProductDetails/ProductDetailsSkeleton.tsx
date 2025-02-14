export default function ProductDetailsSkeleton() {
  return (
    <div
      role="status"
      className="py-4 flex flex-col items-center lg:items-start lg:flex-row gap-8 animate-pulse"
    >
      <div className="mySwiper overflow-hidden rounded-md bg-primary-sunset flex">
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

      <div className="max-w-[35rem] w-full mx-auto self-stretch flex justify-stretch flex-col p-6 text-left lg:basis-1/2 lg:mx-0">
        {/* Brand Name */}
        <div className="h-2.5 bg-primary-peach rounded-full w-24 mb-2" />

        {/* Title */}
        <div className="h-8 bg-primary-peach rounded-full w-full mb-4" />

        {/* Description */}
        <div className="h-2 bg-primary-peach rounded-full mb-2.5" />
        <div className="h-2 bg-primary-peach rounded-full max-w-[440px] mb-2.5" />
        <div className="h-2 bg-primary-peach rounded-full max-w-[460px] mb-2.5" />
        <div className="h-2 bg-primary-peach rounded-full max-w-[360px] mb-5" />

        {/* Price */}
        <div className="h-5 bg-primary-peach rounded-full w-28 mb-3" />

        {/* Discount Price & Badge */}
        <div className="flex items-center gap-3">
          <div className="h-5 bg-primary-peach rounded-full w-20" />
          <div className="h-5 bg-primary-peach rounded-full w-12" />
        </div>

        {/* Add to Cart Button */}
        <div className="h-10 bg-primary-peach rounded-full w-full mt-10 lg:mt-auto" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
