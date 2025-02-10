import { Link } from "react-router-dom";
import { Product } from "../../types";
import { HeartIcon, ShoppingCart, Star } from "lucide-react";
import { twMerge } from "tailwind-merge";

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
    <div className="card p-4">
      <Link to={`/productDetails/${id}`}>
        <img
          src={imageCover}
          alt={title}
          className="w-full h-60 object-contain rounded-lg"
          loading="lazy"
        />
        <div className="mt-4">
          <h2 className="text-lg text-primary-default drop-shadow-lg">
            {title}
          </h2>
          <p>{category.name}</p>

          <div className="flex items-center justify-between mt-2">
            <p className="text-primary-default font-semibold flex items-center gap-1">
              <Star className="fill-primary-default" size={18} />
              {ratingsAverage}
            </p>
            {priceAfterDiscount ? (
              <div className="flex justify-end gap-2">
                <p className="text-gray-500 line-through">${price}</p>
                <p className="text-green-600 font-bold">
                  ${priceAfterDiscount}
                </p>
              </div>
            ) : (
              <p className="text-gray-800 font-bold text-right">${price}</p>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => onAddToWishlist(id)}
          className="text-red-500 hover:text-red-600 transition-all ease-in-out duration-200"
          title="Add to Wishlist"
        >
          <HeartIcon
            className={twMerge("fill-red-500 hover:fill-red-600")}
            size={30}
          />
        </button>
        <button
          onClick={() => onAddToCart(id)}
          className="btn flex-1 px-3 py-2"
        >
          <ShoppingCart size={20} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
