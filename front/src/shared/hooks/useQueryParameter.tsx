import { useSearchParams } from "react-router-dom";

/**
 *@description 쿼리 파라미터 조회, 추가, 삭제 훅
 */
export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // key로 값 가져오기
  const get = (key: string) => searchParams.get(key);

  // key로 값 추가/수정
  const set = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key); // 빈 값이면 삭제
    }
    setSearchParams(newParams);
  };

  // key 삭제
  const remove = (key: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    setSearchParams(newParams);
  };

  // 객체로 전체 반환 (디버깅/편의용)
  const toObject = () => Object.fromEntries(searchParams.entries());

  return { get, set, remove, toObject, searchParams };
}
