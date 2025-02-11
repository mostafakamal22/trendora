import { Category } from "../../types";

export default function CategoryCard({ name, image }: Category) {
  return (
    <div className="card cursor-pointer relative group">
      <img
        src={image}
        alt={name}
        className="w-full h-80 object-cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"></div>

      <span className="absolute right-2 top-2 p-1 rounded-lg bg-green-600 text-primary-peach text-xs font-bold">
        15-20% OFF
      </span>

      <div className="px-3 py-2 text-center absolute bottom-2 left-[15%] right-[15%] bg-custom-fadeOrange rounded-lg font-bold">
        <h4>{name}</h4>
      </div>
    </div>
  );
}
