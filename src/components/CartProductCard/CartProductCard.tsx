import { Trash } from "lucide-react";
import { ProductMinimalDetails } from "../../types";

interface CartProductCardProps extends ProductMinimalDetails {
  price: number;
  count: number;
  productId: string;
  onRemoveFromCart: (productId: string) => void;
  updateProductCount: (productId: string, newCount: number) => void;
}

export default function CartProductCard({
  title,
  imageCover,
  price,
  count,
  productId,
  onRemoveFromCart,
  updateProductCount,
}: CartProductCardProps) {
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

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateProductCount(productId, count - 1)}
          className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
          disabled={count <= 1}
        >
          -
        </button>
        <span className="text-gray-700">{count}</span>
        <button
          onClick={() => updateProductCount(productId, count + 1)}
          className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
        >
          +
        </button>
      </div>

      <button
        onClick={() => onRemoveFromCart(productId)}
        className="btn px-4 py-2 !bg-red-500 !hover:bg-red-600 !shadow-red-500"
      >
        <Trash />
        Remove
      </button>
    </div>
  );
}
