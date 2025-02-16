import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaUser } from "react-icons/fa6";
import { BsPassFill } from "react-icons/bs";
import { useState } from "react";
import fetchData from "@/utils/fetchData";
import GradientText from "../ui/GradientText";
import useFormLoading from "@/hooks/useFormLoading";
import FetchDataError from "../shared/FetchDataError";
import EditUserInfoDrawer from "./EditUserInfoDrawer";
import ChangePasswordDrawer from "./ChangePasswordDrawer";
import SettingSkeleton from "./SettingSkeleton";

export default function Setting() {
  const { isFormLoading } = useFormLoading();
  const [token] = useLocalStorage("token");
  const [userId] = useLocalStorage("userId");

  const queryClient = useQueryClient();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

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
        <h3 className="text-gray-800">Current information</h3>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-2">
          <p className="bg-green-600 text-primary-peach px-2 py-1 rounded-md shadow flex justify-between gap-6 sm:justify-center">
            <span className="sm:hidden">Username</span>{" "}
            <span className="truncate">{userData?.data?.name}</span>
          </p>
          <p className="bg-green-600 text-primary-peach px-2 py-1 rounded-md shadow flex justify-between gap-6 sm:justify-center">
            <span className="sm:hidden">Email</span>{" "}
            <span className="truncate">{userData?.data?.email}</span>
          </p>
          <p className="bg-green-600 text-primary-peach px-2 py-1 rounded-md shadow flex justify-between gap-6 sm:justify-center">
            <span className="sm:hidden">Phone</span>{" "}
            <span className="truncate">{userData?.data?.phone}</span>
          </p>
        </div>
      </div>

      <div className="max-w-md w-full mx-auto grid grid-cols-1 xs:grid-cols-2 justify-between items-center gap-4 mt-5">
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
      </div>

      <EditUserInfoDrawer
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        userData={userData?.data}
        queryClient={queryClient}
      />

      <ChangePasswordDrawer
        isOpen={isPasswordOpen}
        setIsOpen={setIsPasswordOpen}
      />
    </section>
  );
}
