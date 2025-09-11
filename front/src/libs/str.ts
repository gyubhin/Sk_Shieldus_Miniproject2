/*
문자열 처리 유틸
*/
export const strUtils = {
  /**
   * 문자열에서 숫자만 남기기
   * 예: "a1b2c3" -> "123"
   */
  replaceNumber: (text: string): string => {
    return text.replace(/[^0-9]/g, "");
  },

  /**
   * 문자열을 안전하게 숫자로 변환
   * 빈 문자열, NaN일 경우 0 반환
   */
  toNumber: (text: string): number => {
    const onlyNums = strUtils.replaceNumber(text);
    return onlyNums ? Number(onlyNums) : 0;
  },

  /**
   * 숫자를 문자열로 변환하면서 0 패딩
   * 예: (5, 3) -> "005"
   */
  padNumber: (num: number, length: number): string => {
    return num.toString().padStart(length, "0");
  },

  /**
   * 숫자에 천단위 콤마 추가
   * 예: 1234567 -> "1,234,567"
   */
  formatWithComma: (num: number | string): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  /**
   * 문자열이 순수 숫자로만 이루어져 있는지 확인
   */
  isNumeric: (text: string): boolean => {
    return /^[0-9]+$/.test(text);
  },
};
