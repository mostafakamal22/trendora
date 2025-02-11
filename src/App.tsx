import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ModalProvider } from "./providers/modal";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <RouterProvider router={router} />

        <Toaster theme="light" richColors closeButton />
      </ModalProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
