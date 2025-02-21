import { Address } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorage, useWindowScroll } from "@uidotdev/usehooks";
import { BsTrashFill } from "react-icons/bs";
import useFormLoading from "@/hooks/useFormLoading";
import deleteData from "@/utils/deleteData";
import handleToastPromise from "@/utils/handleToastPromise";

type Props = {
  addresses: Address[];
};

export default function UserAddresses({ addresses }: Props) {
  const { isFormLoading, setIsFormLoading } = useFormLoading();

  const queryClient = useQueryClient();

  const [token] = useLocalStorage("token");

  const [, scrollTo] = useWindowScroll();

  const handleRemoveAddress = (id: string) => {
    setIsFormLoading(true);

    handleToastPromise({
      promise: deleteData({
        url: `/addresses/${id}`,
        token: token as string,
      }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        setIsFormLoading(false);
        scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      successMsg: "Address removed Successfully",
      onError: () => {
        setIsFormLoading(false);
      },
    });
  };

  return (
    <div className="max-w-lg w-full mx-auto mt-6">
      <h3 className="text-gray-800">Your Addresses</h3>

      {addresses.length === 0 ? (
        <p className="text-gray-500 text-center">No saved addresses.</p>
      ) : (
        <ul className="space-y-1.5">
          {addresses.map((address) => (
            <li
              key={address._id}
              className="p-4 bg-green-600 text-primary-peach rounded-lg shadow-md flex justify-between items-start gap-1"
            >
              <div className="flex flex-col gap-2 text-left">
                <span className="font-bold">{address.name}</span>
                <span className="text-sm">{address.details}</span>
                <span className="text-sm">{address.city}</span>
                <span className="text-sm">{address.phone}</span>
              </div>
              <button
                onClick={() => handleRemoveAddress(address?._id)}
                className="btn px-2 py-1.5 !bg-red-500 !shadow-none text-sm !border-solid border border-primary-peach"
                disabled={isFormLoading}
              >
                <BsTrashFill size={14} />
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
