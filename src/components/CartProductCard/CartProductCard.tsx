import { ProductProduct } from "../../types";

interface CartProductCardProps extends ProductProduct {
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
    <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm">
      <img
        src={imageCover}
        alt={title}
        className="w-16 h-16 object-cover rounded-md"
      />

      <div className="flex-1">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-700">${price.toFixed(2)}</p>
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
        className="text-red-500 hover:text-red-700 transition"
      >
        Remove
      </button>
    </div>
  );
}
