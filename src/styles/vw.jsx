export const vwChange = (prop, px, viewport) => {
  return (`${prop}: ${(px / viewport) * 100 }vw;`);
};
export const vwRange = (prop, minpx, maxpx, minvw, maxvw) =>  {
  return (`${prop}: calc(${minpx}px + ${maxpx - minpx} * (100vw - ${minvw}px) / ${maxvw - minvw});` );
};