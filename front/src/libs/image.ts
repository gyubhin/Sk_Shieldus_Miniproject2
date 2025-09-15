export const getImageUrl = (url?: string | null) => {
  if (!url) return undefined;

  if (url.indexOf("http") !== -1) return url;

  return `${import.meta.env.VITE_APP_IMG_BASE_URL}${url}`;
};
