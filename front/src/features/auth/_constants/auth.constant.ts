/**
 *@description auth constant
 */
export const authConstant = {
  error: {
    validation: {
      // schema 검증 에러
      wrongFormatEmail: "유효한 이메일을 입력해주세요.",
      worngFormatPassword: {
        min: "비밀번호는 최소 8자 이상입니다.",
        max: "비밀번호는 최대 20자 이하입니다.",
      },
      notMatchPasswordConfirm: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    },
    login: {
      // login error
    },
  },
} as const;
