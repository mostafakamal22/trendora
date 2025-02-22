import GradientText from "../ui/GradientText";

export default function OrdersSkeleton() {
  return (
    <div role="status" className="mt-5 md:mt-10">
      <GradientText>
        <h1 className="mb-5 uppercase">Track Your Orders </h1>
      </GradientText>

      <div className="grid gap-4 mt-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 animate-pulse">
            {/* Order ID */}
            <div className="h-6 bg-primary-peach rounded-full w-1/2 mb-4 mx-auto" />

            {/* Order Info Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5">
              <div className="h-4 bg-primary-peach rounded-md" />
              <div className="h-4 bg-primary-peach rounded-md" />
              <div className="h-4 bg-primary-peach rounded-md" />
              <div className="h-4 bg-primary-peach rounded-md" />
            </div>

            {/* Product Items */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-4 p-4 bg-primary-sunset rounded-lg shadow-sm animate-pulse">
                {/* Product Image */}
                <div className="w-16 h-16 bg-primary-peach rounded-md flex">
                  <svg
                    className="w-10 h-10 text-primary-sunset m-auto"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>

                <div className="flex-1">
                  {/* Product Title */}
                  <div className="h-4 bg-primary-peach rounded-full w-3/4 mb-2" />

                  {/* Quantity */}
                  <div className="h-3 bg-primary-peach rounded-full w-1/2 mb-1" />

                  {/* Price */}
                  <div className="h-3 bg-primary-peach rounded-full w-1/4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
