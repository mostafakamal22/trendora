import MoonLoader from "react-spinners/MoonLoader";

export default function MainSpinner() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <MoonLoader
        loading
        color="#ff7d1a"
        size={90}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
