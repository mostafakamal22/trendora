type Props = {
  name: string;
};

export default function NoDataAvailable({ name }: Props) {
  return (
    <div className="content-center">
      <p className="text-gray-500 text-center">No {name} available.</p>
    </div>
  );
}
