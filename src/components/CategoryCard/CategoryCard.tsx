import { Category } from "../../types";

export default function CategoryCard({ name, image }: Category) {
  return (
    <div className="card">
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover"
        loading="lazy"
      />
      <div className="p-4 text-center">
        <h2 className="text-lg text-primary-default drop-shadow-lg">{name}</h2>
      </div>
    </div>
  );
}
