// valid script
export const valid = {
  // jwt check
  isJwt: (str?: string | null): boolean => {
    if (!str) return false;
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;
    return jwtRegex.test(str);
  },
};
