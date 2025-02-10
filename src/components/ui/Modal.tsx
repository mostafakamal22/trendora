import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onChange,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/90 animate-overlayShow" />
        <Dialog.Content
          className={
            "fixed top-1/2 left-1/2 z-[101] w-[90vw] max-w-[450px] max-h-[85vh] overflow-y-scroll rounded-md bg-white p-6 shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-contentShow focus:outline-none scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
          }
        >
          <Dialog.Close asChild>
            <button
              className="absolute right-1 sm:right-2 top-1 sm:top-4 hover:opacity-90 focus:opacity-90 focus-visible:outline-none"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-custom-orange" size={16} />
            </button>
          </Dialog.Close>

          {title && (
            <Dialog.Title className="m-0 text-[17px] font-medium">
              {title}
            </Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="mt-2 mb-5 text-[15px] leading-[1.5]">
              {description}
            </Dialog.Description>
          )}

          <div className="pt-2 mt-4 border-t border-t-custom-orange">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
