import { createContext, Dispatch, SetStateAction } from "react";

interface FormLoadingContextType {
  isFormLoading: boolean;
  setIsFormLoading: Dispatch<SetStateAction<boolean>>;
}

export const FormLoadingContext = createContext<
  FormLoadingContextType | undefined
>(undefined);
