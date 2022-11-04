import { LooseObject } from '../types/models';

export const serializeToQueryParam = (obj: LooseObject) => {
  const str = [];
  for (const p in obj)
    if (obj[p]) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};
