import axios from "axios";
import toast from "@/lib/sonner";

export default function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    // Handle Axios-specific error
    console.error("Axios error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Request failed");
  } else if (error instanceof Error) {
    // Handle generic JavaScript errors
    console.error("General error:", error.message);
    toast.error("Something went wrong, try again later.");
  } else {
    console.error("Unknown error:", error);
    toast.error("Something went wrong, try again later.");
  }
}
