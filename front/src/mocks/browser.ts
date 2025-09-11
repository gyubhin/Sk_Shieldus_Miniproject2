import { setupWorker } from "msw/browser";
import { groupHandlers } from "@/features/group/_mocks/group.mock";
import { categoriesHandlers } from "@/features/category/_mocks/category.mock";
import { userHandlers } from "@/features/users/_mocks/user.mock";
import { eventHandlers } from "@/features/event/_mocks/event.mock";
import { postHandlers } from "@/features/post/_mocks/post.mock";
import { authHandlers } from "@/features/auth";
import { commentHandlers } from "@/features/comment/_mocks/comment.mock";

export const worker = setupWorker(
  ...groupHandlers,
  ...categoriesHandlers,
  ...userHandlers,
  ...eventHandlers,
  ...postHandlers,
  ...authHandlers,
  ...commentHandlers,
);
