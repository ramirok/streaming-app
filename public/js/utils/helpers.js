export const formatName = (string) => {
  return string
    .charAt(0)
    .toUpperCase()
    .concat(string.substring(1))
    .replace(/-/g, " ");
};
