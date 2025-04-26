export const flattenArray = (arr: any): any[] => {
  if (!Array.isArray(arr)) return [arr];

  const result: any[] = [];
  const flatten = (subArr: any) => {
    for (const item of subArr) {
      if (Array.isArray(item)) {
        flatten(item);
      } else {
        result.push(item);
      }
    }
  };

  flatten(arr);
  return result;
};
