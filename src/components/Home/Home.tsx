import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import Hero from "./Hero";

export default function Home() {
  return (
    <div>
      <Hero />

      <Categories />

      <Products />
    </div>
  );
}
