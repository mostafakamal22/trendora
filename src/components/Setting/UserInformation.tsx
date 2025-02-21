import { User } from "@/types";

type Props = {
  userData?: {
    data: User;
  };
};

export default function UserInformation({ userData }: Props) {
  return (
    <div>
      <h3 className="text-gray-800">Current information</h3>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-1.5">
        <p className="bg-green-600 text-primary-peach px-2 py-1 rounded-md shadow flex justify-between gap-6 sm:justify-center m-0">
          <span className="sm:hidden font-bold">Username</span>{" "}
          <span className="truncate">{userData?.data?.name}</span>
        </p>
        <p className="bg-green-600 text-primary-peach px-2 py-1 rounded-md shadow flex justify-between gap-6 sm:justify-center m-0">
          <span className="sm:hidden font-bold">Email</span>{" "}
          <span className="truncate">{userData?.data?.email}</span>
        </p>
        <p className="bg-green-600 text-primary-peach px-2 py-1 rounded-md shadow flex justify-between gap-6 sm:justify-center m-0">
          <span className="sm:hidden font-bold">Phone</span>{" "}
          <span className="truncate">{userData?.data?.phone}</span>
        </p>
      </div>
    </div>
  );
}
