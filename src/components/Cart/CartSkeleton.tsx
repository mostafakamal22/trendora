export default function CartSkeleton() {
  return (
    <div className="mt-5 md:mt-10">
      <h1>Loading...</h1>

      <div className="max-w-md w-full mx-auto flex flex-col xs:flex-row justify-between items-center gap-2 mt-4 animate-pulse">
        <div className="h-6 w-24 bg-primary-peach rounded-md"></div>
        <div className="h-6 w-24 bg-primary-peach rounded-md"></div>
      </div>

      <div className="grid gap-4 mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-primary-sunset rounded-lg shadow-sm animate-pulse"
          >
            <div className="w-16 h-16 bg-primary-peach rounded-md" />
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="h-4 bg-primary-peach rounded w-3/4 mx-auto sm:mx-0"></div>
              <div className="h-4 bg-primary-peach rounded w-1/2 mx-auto sm:mx-0"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary-peach rounded-md"></div>
              <div className="w-6 h-6 bg-primary-peach rounded-md"></div>
              <div className="w-6 h-6 bg-primary-peach rounded-md"></div>
            </div>
            <div className="h-8 w-24 bg-primary-peach rounded-md"></div>
          </div>
        ))}
      </div>

      <div className="max-w-lg w-full mx-auto mt-6 flex flex-col xs:flex-row items-stretch xs:items-center gap-4">
        <div className="h-10 bg-primary-peach rounded-full w-full" />
        <div className="h-10 bg-primary-peach rounded-full w-full" />
      </div>
    </div>
  );
}
