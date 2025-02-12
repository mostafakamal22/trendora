import { FormLoadingContext } from "@/context/FormLoading";
import { useContext } from "react";

const useFormLoading = () => {
  const context = useContext(FormLoadingContext);

  if (!context) {
    throw new Error("useFormLoading must be used within a FormLoadingProvider");
  }

  return context;
};

export default useFormLoading;
