import { IButtonsStatusSort } from "../../types/types";

export const defaultButtonsStatusSort: IButtonsStatusSort = {
  newArray: {
    disabled: false,
  },
  ascendingSort: {
    disabled: true,
    loading: false,
  },
  descendingSort: {
    disabled: true,
    loading: false,
  },
};

export const disabledButtonsStatusSort: IButtonsStatusSort = {
  ascendingSort: {
    disabled: true,
    loading: false,
  },
  newArray: {
    disabled: true,
  },
  descendingSort: {
    disabled: true,
    loading: false,
  },
};

export const currentButtonsStatusSort: IButtonsStatusSort = {
  ascendingSort: {
    disabled: false,
    loading: false,
  },
  newArray: {
    disabled: false,
  },
  descendingSort: {
    disabled: false,
    loading: false,
  },
};

export const selectionSortUp = (arr: number[]) => {
  for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let indexMin = i;
      for (let j = i + 1; j < l; j++) {
          if (arr[indexMin] > arr[j]) {
              indexMin = j;
          }
      }
      if (indexMin !== i) {
          [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
      }
  }
  return arr;
};

export const selectionSortDown = (arr: number[]) => {
  for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
      let indexMax = i;
      for (let j = i + 1; j < l; j++) {
          if (arr[indexMax] < arr[j]) {
              indexMax = j;
          }
      }
      if (indexMax !== i) {
          [arr[i], arr[indexMax]] = [arr[indexMax], arr[i]];
      }
  }
  return arr;
};

export const bubbleSortUp = (arr: number[]) => {
  for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      let wasSwap = false;
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
          if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              wasSwap = true;
          }
      }
      if (!wasSwap) break;
  }
  return arr;
};

export const bubbleSortDown = (arr: number[]) => {
  for (let i = 0, endI = arr.length - 1; i < endI; i++) {
      let wasSwap = false;
      for (let j = 0, endJ = endI - i; j < endJ; j++) {
          if (arr[j] < arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
              wasSwap = true;
          }
      }
      if (!wasSwap) break;
  }
  return arr;
};