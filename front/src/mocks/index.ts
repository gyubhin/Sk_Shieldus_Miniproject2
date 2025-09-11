import { groupHandlers } from "@/features/group/_mocks/group.mock";
import { setupWorker } from "msw/browser";

export const worker = setupWorker(...groupHandlers);
