import GradientText from "../ui/GradientText";

export default function SettingSkeleton() {
  return (
    <div role="status" className="mt-5 md:mt-10">
      <GradientText>
        <h1 className="uppercase">Update Your Setting</h1>
      </GradientText>

      <div className="max-w-3xl w-full mx-auto p-3 bg-primary-vibrant rounded-md animate-pulse">
        <div className="h-8 w-3/4 mx-auto bg-primary-peach rounded-md"></div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4">
          <div className="h-6 w-3/4 mx-auto bg-primary-peach rounded-md"></div>
          <div className="h-6 w-3/4 mx-auto bg-primary-peach rounded-md"></div>
          <div className="h-6 w-3/4 mx-auto bg-primary-peach rounded-md"></div>
        </div>
      </div>

      <div className="max-w-lg w-full mx-auto mt-6 flex flex-col xs:flex-row items-stretch xs:items-center gap-4">
        <div className="h-10 bg-primary-peach rounded-full w-full" />
        <div className="h-10 bg-primary-peach rounded-full w-full" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
