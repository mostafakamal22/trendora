import { FormLoadingContext } from "@/context/FormLoading";
import { ReactNode, useState } from "react";

export const FormLoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isFormLoading, setIsFormLoading] = useState(false);

  return (
    <FormLoadingContext.Provider value={{ isFormLoading, setIsFormLoading }}>
      {children}
    </FormLoadingContext.Provider>
  );
};
