import { valid } from "@/shared/utils/valid";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type InitState = {
  accessToken: string | null;
  isLogin: boolean;
};

type AccessTokenState = {
  setToken: (payload: string | null) => void;
  reset: () => void;
} & InitState;

const initialState = {
  accessToken: null,
  isLogin: false,
};

/**
 *@description 유저 at 관리 전역 store`
 */
export const useAccessTokenStore = create<AccessTokenState>()(
  devtools((set) => ({
    ...initialState,

    setToken: (payload) =>
      set(() => ({
        accessToken: payload,
        isLogin: valid.isJwt(payload),
      })),

    reset: () => set((prev) => ({ ...prev, ...initialState })),
  })),
);
