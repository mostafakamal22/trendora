type Props = {
  name: string;
};

export default function FetchDataError({ name }: Props) {
  return (
    <div className="bg-custom-fadeOrange text-red-500 text-center font-semibold p-2 rounded-md shadow mt-5">
      Error loading {name}. Please refresh the page or try again later.
    </div>
  );
}
