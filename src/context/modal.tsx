import { createContext, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  children: ReactNode;
  setChildren: (c: ReactNode) => void;
  title?: string;
  desc?: string;
  setTitle: (t: string) => void;
  setDesc: (d: string) => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
