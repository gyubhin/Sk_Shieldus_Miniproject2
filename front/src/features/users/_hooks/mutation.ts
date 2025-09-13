import { useMutation } from "@tanstack/react-query";
import type { PatchUserBody } from "../_types/body";
import { patchUser } from "../_apis/user.api";

/**
 *@description 유저 수정 훅
 */
export function usePatchUser() {
  return useMutation({
    mutationFn: (body: PatchUserBody) => patchUser(body),
  });
}
