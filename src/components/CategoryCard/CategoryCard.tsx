import { Category } from "../../types";

export default function CategoryCard({ name, image }: Category) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover"
        loading="lazy"
      />
      <div className="p-4 text-center">
        <h3 className="text-accent-blue text-lg">{name}</h3>
      </div>
    </div>
  );
}
