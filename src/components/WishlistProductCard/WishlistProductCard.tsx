import { Product } from "../../types";
import { BsCartFill, BsTrashFill } from "react-icons/bs";

interface WishlistProductCardProps extends Product {
  isFormLoading: boolean;
  onRemove: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export default function WishlistProductCard({
  _id,
  title,
  imageCover,
  price,
  isFormLoading,
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
          className="btn px-4 py-2 !bg-red-500 !shadow-red-500"
          disabled={isFormLoading}
        >
          <BsTrashFill size={18} />
          Remove
        </button>

        <button
          onClick={() => onAddToCart(_id)}
          className="btn px-4 py-2"
          disabled={isFormLoading}
        >
          <BsCartFill size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
