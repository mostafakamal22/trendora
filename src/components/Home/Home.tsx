import Categories from "../Categories/Categories";
import Products from "../Products/Products";

export default function Home() {
  return (
    <div className="space-y-20">
      <Categories />

      <Products />
    </div>
  );
}
