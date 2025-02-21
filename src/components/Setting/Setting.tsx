import { useQuery } from "@tanstack/react-query";
import { User } from "@/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaAddressCard, FaUser } from "react-icons/fa6";
import { BsPassFill } from "react-icons/bs";
import { useState } from "react";
import fetchData from "@/utils/fetchData";
import GradientText from "../ui/GradientText";
import useFormLoading from "@/hooks/useFormLoading";
import FetchDataError from "../shared/FetchDataError";
import EditUserInfoDrawer from "./EditUserInfoDrawer";
import ChangePasswordDrawer from "./ChangePasswordDrawer";
import SettingSkeleton from "./SettingSkeleton";
import AddNewAddressDrawer from "./AddNewAddressDrawer";
import UserAddresses from "./UserAddresses";
import UserInformation from "./UserInformation";

export default function Setting() {
  const { isFormLoading } = useFormLoading();
  const [token] = useLocalStorage("token");
  const [userId] = useLocalStorage("userId");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [isAddNewAddressOpen, setIsAddNewAddressOpen] = useState(false);

  const {
    isLoading,
    isFetching,
    data: userData,
    error,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetchData<{ data: User }>({
        url: `/users/${userId}`,
        token: token as string | undefined,
      }),
    staleTime: 5 * 60 * 1000,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading || isFetching) {
    return <SettingSkeleton />;
  }

  if (isError) {
    console.error(error);
    return <FetchDataError name="User data" />;
  }

  return (
    <section className="mt-5 md:mt-10">
      <GradientText>
        <h1 className="uppercase">Update Your Setting</h1>
      </GradientText>

      <div className="max-w-3xl w-full mx-auto p-3 bg-green-200 shadow rounded-md mt-5">
        <UserInformation userData={userData} />

        <UserAddresses addresses={userData?.data?.addresses || []} />
      </div>

      <div className="max-w-3xl w-full mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 justify-between items-center gap-4 mt-5">
        <button
          className="btn text-sm sm:text-base px-4 py-2 !bg-blue-600 !shadow-blue-600"
          disabled={isFormLoading}
          onClick={() => setIsEditOpen(true)}
        >
          <FaUser size={18} />
          Update Info
        </button>
        <button
          className="btn text-sm sm:text-base px-4 py-2 !bg-rose-600 !shadow-rose-600"
          disabled={isFormLoading}
          onClick={() => setIsPasswordOpen(true)}
        >
          <BsPassFill size={18} />
          Change Password
        </button>

        <button
          className="btn text-sm sm:text-base px-4 py-2 !bg-lime-600 !shadow-lime-600"
          disabled={isFormLoading}
          onClick={() => setIsAddNewAddressOpen(true)}
        >
          <FaAddressCard size={18} />
          Add New Address
        </button>
      </div>

      <EditUserInfoDrawer
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        userData={userData?.data}
      />

      <ChangePasswordDrawer
        isOpen={isPasswordOpen}
        setIsOpen={setIsPasswordOpen}
      />

      <AddNewAddressDrawer
        isOpen={isAddNewAddressOpen}
        setIsOpen={setIsAddNewAddressOpen}
      />
    </section>
  );
}
