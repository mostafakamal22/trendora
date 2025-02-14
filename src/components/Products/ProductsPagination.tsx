import { Products } from "@/types";
import { useLocation } from "react-router-dom";

type Props = {
  handlePageChange: (newPage: number) => void;
  productsData: Products | undefined;
};

export default function ProductsPagination({
  handlePageChange,
  productsData,
}: Props) {
  const pathname = useLocation()?.pathname;

  if (pathname === "/") return null;

  if (productsData?.metadata.numberOfPages === 1) return null;

  return (
    <div className="mt-10 flex justify-center items-center gap-3">
      <button
        onClick={() => {
          handlePageChange((productsData?.metadata.currentPage || 1) - 1);
        }}
        disabled={(productsData?.metadata.currentPage || 1) === 1}
        className="border-2 border-primary-sunset text-xs font-semibold px-4 py-2 rounded cursor-pointer hover:bg-primary-peach disabled:bg-primary-peach disabled:cursor-not-allowed transition-all shadow-lg"
      >
        Prev
      </button>
      <button
        onClick={() => {
          handlePageChange((productsData?.metadata.currentPage || 1) + 1);
        }}
        disabled={
          (productsData?.metadata.currentPage || 1) ===
          productsData?.metadata.numberOfPages
        }
        className="border-2 border-primary-sunset text-xs font-semibold px-4 py-2 rounded cursor-pointer hover:bg-primary-peach disabled:bg-primary-peach disabled:cursor-not-allowed transition-all shadow-lg"
      >
        Next
      </button>
    </div>
  );
}
