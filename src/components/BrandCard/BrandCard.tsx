import useModal from "@/hooks/useModal";
import { Brand } from "../../types";

export default function BrandCard({ name, image }: Brand) {
  const { setChildren, openModal, setTitle } = useModal();

  function handleOpenBrand() {
    setTitle(name);
    setChildren(
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        <div className="basis-1/2">
          <h1 className="text-custom-orange">{name}</h1>
          <p>{name}</p>
        </div>
        <div className="basis-1/2">
          <img alt={name} src={image} />
        </div>
      </div>
    );

    openModal();
  }

  return (
    <div
      onClick={handleOpenBrand}
      className="bg-white shadow-lg rounded-xl overflow-hidden p-4 transition-transform transform hover:scale-105 cursor-pointer"
    >
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
