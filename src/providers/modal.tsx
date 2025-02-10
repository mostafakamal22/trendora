import { ModalContext } from "@/context/modal";
import { useState, ReactNode } from "react";

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalChildren, setModalChildren] = useState<ReactNode>(null);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        children: modalChildren,
        setChildren: setModalChildren,
        title,
        desc,
        setTitle,
        setDesc,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
