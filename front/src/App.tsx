import { useState } from "react";
import Router from "./router/router";
import { queryClient } from "./shared/setup/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [_queryClient] = useState(() => queryClient);

  return (
    <QueryClientProvider client={_queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
