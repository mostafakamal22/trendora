import { ShoppingCart, Trash } from "lucide-react";
import { Product } from "../../types";

interface WishlistProductCardProps extends Product {
  isDoingProductAction: boolean;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export default function WishlistProductCard({
  _id,
  title,
  imageCover,
  price,
  isDoingProductAction,
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
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        <p className="font-semibold">${price}</p>
      </div>

      <div className="w-full flex flex-col justify-stretch gap-2 sm:flex-row sm:w-fit">
        <button
          onClick={() => onRemove(_id)}
          className="btn px-4 py-2 !bg-red-500 !hover:bg-red-600 !shadow-red-500"
          disabled={isDoingProductAction}
        >
          <Trash />
          Remove
        </button>

        <button
          onClick={() => onAddToCart(_id)}
          className="btn px-4 py-2"
          disabled={isDoingProductAction}
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
