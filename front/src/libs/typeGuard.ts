import { AxiosError } from "axios";

/**
 *@description axios type guard
 */
export function isAxiosError<T = unknown>(err: unknown): err is AxiosError<T> {
  return (err as AxiosError<T>)?.isAxiosError === true;
}
