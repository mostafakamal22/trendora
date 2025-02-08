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

      <button
        onClick={() => onRemove(_id)}
        className="text-red-500 hover:text-red-700 transition"
      >
        Remove
      </button>

      <button
        onClick={() => onAddToCart(_id)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
