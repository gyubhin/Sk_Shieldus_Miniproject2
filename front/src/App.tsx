import { useState } from "react";
import Router from "./router/router";
import { queryClient } from "./shared/setup/reactQuery";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toast from "./shared/components/toast/Toast";
import { useUiStore } from "./shared/stores/ui.store";
import { Loading } from "./shared/components/loading/Loading";

function App() {
  const [_queryClient] = useState(() => queryClient);
  const { loading } = useUiStore();

  return (
    <QueryClientProvider client={_queryClient}>
      <Router />

      <ReactQueryDevtools initialIsOpen={false} />

      {loading && <Loading />}
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
