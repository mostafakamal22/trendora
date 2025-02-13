import { useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

export function ErrorBoundaryFullback({ error }: { error: Error }) {
  const { resetBoundary } = useErrorBoundary();

  useEffect(() => {
    console.log("Error at [ Main Error ] Boundary");
    console.log(error);
    console.log(error.message);
  }, [error]);

  return (
    <section className="mt-5 md:mt-10">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl font-kumbh text-primary-default drop-shadow">
          500
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
          Something went wrong on our end.
        </p>
        <p className="">
          Please try again later or contact support if the issue persists.
        </p>

        <button
          onClick={resetBoundary}
          className="btn px-5 py-2.5 my-5 w-fit mx-auto font-playfair"
        >
          Try again{" "}
        </button>
      </div>
    </section>
  );
}
