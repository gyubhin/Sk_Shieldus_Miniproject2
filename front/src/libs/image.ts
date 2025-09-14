export const getImageUrl = (url?: string | null) => {
  if (!url) return undefined;

  return `${import.meta.env.VITE_APP_IMG_BASE_URL}${url}`;
};
