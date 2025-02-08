import axios from "axios";

export default function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    // Handle Axios-specific error
    console.error("Axios error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Request failed");
  } else if (error instanceof Error) {
    // Handle generic JavaScript errors
    console.error("General error:", error.message);
    throw new Error(error.message);
  } else {
    console.error("Unknown error:", error);
    throw new Error("An unexpected error occurred");
  }
}
