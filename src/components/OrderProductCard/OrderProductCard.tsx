import { CartItem } from "../../types";

export default function OrderProductCard({ product, count, price }: CartItem) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-200 rounded-lg shadow-sm">
      <img
        src={product.imageCover}
        alt={product.title}
        className="w-16 h-16 object-cover rounded-md"
        loading="lazy"
      />

      <div className="flex-1">
        <h4 className="text-lg font-semibold">{product.title}</h4>
        <p className="text-gray-700">Quantity: {count}</p>
        <p className="text-gray-700">Price: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
