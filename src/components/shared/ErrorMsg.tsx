import { FaCircleXmark } from "react-icons/fa6";

type Props = { message: string };

export default function ErrorMsg({ message }: Props) {
  return (
    <div className="bg-red-500 mt-2 p-2 font-semibold rounded-md shadow-md">
      <p className="flex items-center gap-1.5 flex-col sm:flex-row capitalize text-primary-peach text-xs">
        <FaCircleXmark size={18} />
        {message}
      </p>
    </div>
  );
}
