import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mt-5 md:mt-10">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl font-kumbh text-primary-default drop-shadow">
          404
        </h1>
        <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
          Something's missing.
        </p>
        <p className="">
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.{" "}
        </p>

        <Link
          to="/"
          className="btn px-5 py-2.5 my-5 w-fit mx-auto font-playfair"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
}
