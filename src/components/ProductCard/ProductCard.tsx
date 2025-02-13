import { Link } from "react-router-dom";
import { Cart, Product, WishList } from "../../types";
import {
  BsCart,
  BsCartFill,
  BsHeart,
  BsHeartFill,
  BsStarFill,
} from "react-icons/bs";

interface ProductCardProps extends Product {
  onAddToWishlist: (id: string) => void;
  onAddToCart: (id: string) => void;
  isFormLoading: boolean;
  wishlistData: WishList | undefined;
  cartData: Cart | undefined;
}

export default function ProductCard({
  id,
  title,
  imageCover,
  ratingsAverage,
  category,
  description,
  price,
  priceAfterDiscount,
  onAddToCart,
  onAddToWishlist,
  isFormLoading,
  wishlistData,
  cartData,
}: ProductCardProps) {
  const isProductInWishlist = wishlistData?.data?.find((p) => p?._id === id);

  const isProductInCart = cartData?.data?.products?.find(
    (p) => p?.product?._id === id
  );

  return (
    <Link to={`/productDetails/${id}`} className="card relative group">
      <div className="absolute top-0 w-full h-80 bg-transparent group-hover:bg-black/15 transition-all duration-200 ease-in-out">
        <div className="absolute right-2 top-2 flex flex-col gap-2 lg:opacity-0 lg:translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-in-out delay-100">
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onAddToWishlist(id);
            }}
            className="bg-green-600 text-primary-peach p-2 rounded-full transition-all ease-in-out duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            title={isProductInCart ? "Already in Wishlist" : "Add to Wishlist"}
            disabled={isFormLoading || Boolean(isProductInWishlist)}
          >
            {isProductInWishlist ? (
              <BsHeartFill size={20} />
            ) : (
              <BsHeart size={20} />
            )}
          </button>
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onAddToCart(id);
            }}
            className="bg-green-600 text-primary-peach p-2 rounded-full transition-all ease-in-out duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            title={isProductInCart ? "Already in Cart" : "Add to Cart"}
            disabled={isFormLoading || Boolean(isProductInCart)}
          >
            {isProductInCart ? <BsCartFill size={20} /> : <BsCart size={20} />}
          </button>
        </div>

        <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-bold bg-custom-fadeOrange text-custom-orange flex items-center gap-1 rounded-md shadow">
          <BsStarFill className="fill-primary-default" size={16} />
          {ratingsAverage}
        </span>

        <span className="absolute bottom-2 right-2 px-2 py-1 text-xs font-bold bg-green-600 text-primary-peach flex items-center gap-1 rounded-md shadow">
          {category?.name}
        </span>
      </div>

      <img
        src={imageCover}
        alt={title}
        className="w-full h-80 object-cover"
        loading="lazy"
      />

      <div className="p-4 text-left">
        <h4 className="font-bold truncate">{title}</h4>
        <p className="text-sm truncate">{description}</p>

        <div className="flex items-center mt-2">
          {priceAfterDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium text-lg">
                ${priceAfterDiscount}
              </span>

              <span className="text-gray-400 line-through">${price}</span>

              <span className="ml-2 text-xs bg-green-600 text-primary-peach p-1 rounded-md font-semibold">
                {((1 - priceAfterDiscount / price) * 100).toFixed(0)}% OFF
              </span>
            </div>
          ) : (
            <span className="font-medium text-gray-900 text-lg">${price}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
