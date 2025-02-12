import { Trash } from "lucide-react";
import { ProductMinimalDetails } from "../../types";

interface CartProductCardProps extends ProductMinimalDetails {
  price: number;
  count: number;
  productId: string;
  isFormLoading: boolean;
  onRemoveFromCart: (productId: string) => void;
  updateProductCount: (productId: string, newCount: number) => void;
}

export default function CartProductCard({
  title,
  imageCover,
  price,
  count,
  productId,
  isFormLoading,
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
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
        <p className="font-semibold">${price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateProductCount(productId, count - 1)}
          className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition disabled:cursor-not-allowed"
          disabled={count <= 1 || isFormLoading}
        >
          -
        </button>
        <span className="text-gray-700 font-semibold">{count}</span>
        <button
          onClick={() => updateProductCount(productId, count + 1)}
          className="px-2 py-1 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition disabled:cursor-not-allowed"
          disabled={isFormLoading}
        >
          +
        </button>
      </div>

      <button
        onClick={() => onRemoveFromCart(productId)}
        className="btn px-4 py-2 !bg-red-500 !shadow-red-500"
        disabled={isFormLoading}
      >
        <Trash />
        Remove
      </button>
    </div>
  );
}
