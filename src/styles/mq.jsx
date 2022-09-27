export const breakpoints = {
  xs: 320,
  sm: 560,
  md: 960, 
  lg: 1280,
  xl: 1920
};
export const mqMin = (min) => {
  return `@media (min-width: ${String(min)}px)`;
};
export const mqMax = (max) => {
  return `@media (max-width: ${String(max - 1)}px)`;
};
export const mqRange = (min, max) => {
  return `@media (min-width: ${String(min)}px) and (max-width: ${String(max - 1)}px)`;
};