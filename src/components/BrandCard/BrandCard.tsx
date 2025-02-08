import { Brand } from "../../types";

export default function BrandCard({ name, image }: Brand) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4 transition-transform transform hover:scale-105">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-32 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-32 flex items-center justify-center bg-gray-200 text-gray-500 text-sm rounded-lg">
          No Image Available
        </div>
      )}
      <h3 className="mt-2 text-lg font-semibold text-gray-800 text-center">
        {name}
      </h3>
    </div>
  );
}
