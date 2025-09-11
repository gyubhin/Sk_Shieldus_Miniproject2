import { useState } from "react";
import Router from "./router/router";
import { queryClient } from "./shared/setup/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toast from "./shared/components/toast/Toast";

function App() {
  const [_queryClient] = useState(() => queryClient);

  return (
    <QueryClientProvider client={_queryClient}>
      <Router />

      <ReactQueryDevtools initialIsOpen={false} />

      <Toast />
    </QueryClientProvider>
  );
}

export default App;
