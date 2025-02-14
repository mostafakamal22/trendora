import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { FormLoadingProvider } from "./providers/FormLoading";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FormLoadingProvider>
        <RouterProvider router={router} />
      </FormLoadingProvider>

      <Toaster theme="light" richColors closeButton />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
