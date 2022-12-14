export const fibonacci = (n: number): number[] => {
  const arr = [0, 1];
  for (let i = 2; i <= n; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

export const MIN_VALUE = 1;
export const MAX_VALUE = 19;
