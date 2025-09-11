// ui.store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ToastType = "success" | "error";

type ToastState = {
  show: boolean;
  message: string;
  type: ToastType;
};

type UiState = {
  toast: ToastState;
  showToast: (payload: Omit<ToastState, "show">) => void;
  clearToast: () => void;
};

const initialToast: ToastState = {
  show: false,
  message: "",
  type: "success",
};

export const useUiStore = create<UiState>()(
  devtools((set) => ({
    toast: initialToast,

    showToast: (payload) =>
      set(() => ({
        toast: { ...payload, show: true },
      })),
    clearToast: () =>
      set(() => ({
        toast: initialToast,
      })),
  })),
);
