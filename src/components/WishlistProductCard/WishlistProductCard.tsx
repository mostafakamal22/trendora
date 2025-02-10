import { ShoppingCart, Trash } from "lucide-react";
import { Product } from "../../types";

interface WishlistProductCardProps extends Product {
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export default function WishlistProductCard({
  _id,
  title,
  imageCover,
  price,
  onRemove,
  onAddToCart,
}: WishlistProductCardProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-100 rounded-lg shadow-sm">
      <img
        src={imageCover}
        alt={title}
        className="w-16 h-16 object-cover rounded-md"
        loading="lazy"
      />

      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-lg tracking-normal">{title}</h3>
        <p className="font-semibold">${price}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onRemove(_id)}
          className="btn px-4 py-2 !bg-red-500 !hover:bg-red-600 !shadow-red-500"
        >
          <Trash />
          Remove
        </button>

        <button onClick={() => onAddToCart(_id)} className="btn px-4 py-2">
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
