import { FaCircleXmark } from "react-icons/fa6";

type Props = { message: string };

export default function ErrorMsg({ message }: Props) {
  return (
    <div className="bg-red-500 mt-2 p-2 font-semibold rounded-md shadow-md">
      <p className="flex items-center gap-1.5 capitalize text-primary-peach text-xs">
        <FaCircleXmark className="block min-w-fit" size={18} />

        <span>{message}</span>
      </p>
    </div>
  );
}
