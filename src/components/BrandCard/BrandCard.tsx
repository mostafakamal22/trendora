import { Link } from "react-router-dom";
import { Brand } from "../../types";

export default function BrandCard({ name, image, _id }: Brand) {
  return (
    <Link
      to={`/products?brand=${_id}`}
      className="card p-4 hover:scale-105 cursor-pointer"
      title="Shop brand's products"
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover rounded-lg"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-32 flex items-center justify-center bg-gray-200 text-gray-500 text-sm rounded-lg">
          No Image Available
        </div>
      )}
      <h3 className="mt-2 text-lg font-semibold text-gray-800 text-center">
        {name}
      </h3>
    </Link>
  );
}
