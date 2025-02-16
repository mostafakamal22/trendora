import axios from "axios";

export default function handleError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    // Handle Axios-specific error
    console.error("Axios error:", error.response?.data || error.message);
    // Handle setting route error message location in the response
    if (
      location?.pathname === "/setting" ||
      location?.pathname === "/setting/"
    ) {
      return (
        error.response?.data?.errors?.msg ||
        "Invalid request. Please check your inputs and try again."
      );
    }
    // Default error message for all routes
    return error.response?.data?.message || "Request failed";
  } else if (error instanceof Error) {
    // Handle generic JavaScript errors
    console.error("General error:", error.message);
    return "Something went wrong, try again later.";
  } else {
    console.error("Unknown error:", error);
    return "Something went wrong, try again later.";
  }
}
