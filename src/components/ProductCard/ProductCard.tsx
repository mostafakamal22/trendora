import { Link } from "react-router-dom";
import { Product } from "../../types";

interface ProductCardProps extends Product {
  onAddToWishlist: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export default function ProductCard({
  id,
  title,
  imageCover,
  ratingsAverage,
  category,
  price,
  priceAfterDiscount,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  return (
    <Link
      to={`/productDetails/${id}`}
      className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 p-4"
    >
      <img
        src={imageCover}
        alt={title}
        className="w-full h-60 object-contain rounded-lg"
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-500 text-sm">{category.name}</p>

        <div className="flex items-center justify-between mt-2">
          <p className="text-yellow-500 font-semibold">⭐ {ratingsAverage}</p>
          {priceAfterDiscount ? (
            <div className="flex gap-2">
              <p className="text-gray-500 line-through">${price}</p>
              <p className="text-green-600 font-bold">${priceAfterDiscount}</p>
            </div>
          ) : (
            <p className="text-gray-800 font-bold">${price}</p>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onAddToWishlist(id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Add to Wishlist
          </button>
          <button
            onClick={() => onAddToCart(id)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
