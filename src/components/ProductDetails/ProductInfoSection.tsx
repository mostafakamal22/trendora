import { Product } from "@/types";
import { ShoppingCart } from "lucide-react";

type props = {
  product: Product;
  onAddToCart: (_id: string) => void;
};

export default function ProductInfoSection({
  onAddToCart,
  product: { _id, price, priceAfterDiscount, description, title, brand },
}: props) {
  return (
    <section className="max-w-[35rem] flex justify-stretch flex-col p-6 text-left lg:flex-basis-1/2">
      <h3>{brand?.name}</h3>
      <h2>{title}</h2>
      <p>{description}</p>

      <div className="flex items-center gap-4 mt-5">
        <span className="text-2xl font-bold">
          ${priceAfterDiscount || price}
        </span>

        {priceAfterDiscount && (
          <span className="text-gray-500 line-through">${price}</span>
        )}

        {priceAfterDiscount && (
          <span className="bg-custom-fadeOrange text-custom-orange p-1 rounded-md font-semibold">
            {((1 - priceAfterDiscount / price) * 100).toFixed(2)}%
          </span>
        )}
      </div>

      <button
        onClick={() => onAddToCart(_id)}
        className="btn px-4 py-3 mt-auto font-semibold"
      >
        <ShoppingCart size={20} />
        Add to Cart
      </button>
    </section>
  );
}
