import MoonLoader from "react-spinners/MoonLoader";
import { twMerge } from "tailwind-merge";

type Props = {
  size?: number;
  className?: string;
};

export default function MainSpinner({ size = 90, className }: Props) {
  return (
    <div
      className={twMerge(
        "h-screen w-full flex justify-center items-center",
        className
      )}
    >
      <MoonLoader
        loading
        color="#ff7d1a"
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
