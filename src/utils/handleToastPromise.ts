import toast from "@/lib/sonner";
import handleError from "@/utils/handleError";

interface ToastPromiseParams<T> {
  promise: Promise<T>;
  onSuccess: (arg0: T) => void;
  successMsg?: string;
  onError?: (error: unknown) => void;
}

export default function handleToastPromise<T>({
  promise,
  successMsg = "Success!",
  onSuccess,
  onError,
}: ToastPromiseParams<T>) {
  return toast.promise(promise, {
    loading: "Loading...",
    success: (data) => {
      onSuccess(data);
      return successMsg;
    },
    error: (error) => {
      if (onError) onError(error);
      return handleError(error);
    },
  });
}
