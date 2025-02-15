import Categories from "../Categories/Categories";
import Products from "../Products/Products";
import Hero from "./Hero";
import Sale from "./Sale";

export default function Home() {
  return (
    <div>
      <Hero />

      <Sale />

      <Categories />

      <Products />
    </div>
  );
}
