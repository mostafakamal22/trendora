export default function WishlistSkeleton() {
  return (
    <div role="status" className="mt-5 md:mt-10">
      <div className="max-w-md w-full mx-auto flex flex-col xs:flex-row justify-between items-center gap-2 mt-4 animate-pulse">
        <div className="h-6 w-3/4 mx-auto bg-primary-peach rounded-md"></div>
      </div>

      <div className="grid gap-4 mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-primary-sunset rounded-lg shadow-sm animate-pulse"
          >
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

            <div className="flex-1 w-full text-center sm:text-left space-y-2">
              <div className="h-4 bg-primary-peach rounded w-3/4 mx-auto sm:mx-0"></div>
              <div className="h-4 bg-primary-peach rounded w-1/2 mx-auto sm:mx-0"></div>
            </div>

            <div className="w-full flex flex-col items-center gap-2 sm:flex-row sm:w-fit">
              <div className="h-10 w-full sm:w-24 bg-primary-peach rounded-md"></div>
              <div className="h-10 w-full sm:w-24 bg-primary-peach rounded-md"></div>
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
