/**
 *@description mutation 공통 응답
 */
export type MutationResponse = {
  success: boolean;
};

/**
 *@description 페이징 네이션 요청 기본 쿼리
 */
export type PagingQuery = {
  size: number;
  page: number;
  sort?: string;
};

export type PagingResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  page: number;
  last: boolean;
};

/**
 *@description createdAt, updatedAt, deletedAt field
 */
export type TimeResponse = {
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type ErrorResponse = {
  code: string;
  message: string;
  field?: string;
};
