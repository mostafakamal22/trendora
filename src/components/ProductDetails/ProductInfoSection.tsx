import { Cart, Product } from "@/types";
import { BsCart } from "react-icons/bs";

type props = {
  product: Product;
  onAddToCart: (_id: string) => void;
  isFormLoading: boolean;
  cartData: Cart | undefined;
};

export default function ProductInfoSection({
  onAddToCart,
  product: { _id, price, priceAfterDiscount, description, title, brand },
  isFormLoading,
  cartData,
}: props) {
  const isProductInCart = cartData?.data?.products?.find(
    (p) => p?.product?._id === _id
  );

  return (
    <section className="max-w-[35rem] mx-auto self-stretch flex justify-stretch flex-col p-6 text-left lg:flex-basis-1/2 lg:mx-0">
      <h3>{brand?.name}</h3>
      <h2>{title}</h2>
      <p>{description}</p>

      <div className="flex items-center gap-3 mt-5">
        <span className="text-2xl font-extrabold">
          ${priceAfterDiscount || price}
        </span>

        {priceAfterDiscount && (
          <span className="text-gray-500 line-through">${price}</span>
        )}

        {priceAfterDiscount && (
          <span className="bg-custom-fadeOrange text-custom-orange p-1 rounded-md font-semibold">
            {((1 - priceAfterDiscount / price) * 100).toFixed(0)}%
          </span>
        )}
      </div>

      <button
        onClick={() => onAddToCart(_id)}
        className="btn px-4 py-3 mt-10 lg:mt-auto font-semibold"
        disabled={isFormLoading || Boolean(isProductInCart)}
      >
        <BsCart size={20} />
        {isProductInCart && "Already in your cart"}
        {!isProductInCart && isFormLoading && "Adding to cart..."}
        {!isProductInCart && !isFormLoading && "Add to Cart"}
      </button>
    </section>
  );
}
