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
};
