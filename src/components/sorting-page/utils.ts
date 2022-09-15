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
