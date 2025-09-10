/**
 *@description login api 바디
 */
export type LoginApiBody = {
  email: string;
  password: string;
};

/**
 *@description 회원가입 api 바디
 */
export type SignupApiBody = {
  email: string;
  password: string;
  nickname: string;
  region: string;
};
