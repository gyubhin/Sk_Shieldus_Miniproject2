import { useState } from "react";
import Router from "./router/router";
import { queryClient } from "./shared/setup/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [_queryClient] = useState(() => queryClient);

  return (
    <QueryClientProvider client={_queryClient}>
      <Router />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
