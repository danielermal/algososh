import { IButtonsStatus } from "../../types/types";

export const defaultButtonsStatus: IButtonsStatus = {
  addInHead: {
    disabled: false,
    loading: false,
  },
  addInTail: {
    disabled: false,
    loading: false,
  },
  deleteInHead: {
    disabled: false,
    loading: false,
  },
  deleteInTail: {
    disabled: false,
    loading: false,
  },
  addByIndex: {
    disabled: false,
    loading: false,
  },
  deleteByIndex: {
    disabled: false,
    loading: false,
  },
};

export const disabledButtonsStatus: IButtonsStatus = {
  addInHead: {
    disabled: true,
    loading: false,
  },
  addInTail: {
    disabled: true,
    loading: false,
  },
  deleteInHead: {
    disabled: true,
    loading: false,
  },
  deleteInTail: {
    disabled: true,
    loading: false,
  },
  addByIndex: {
    disabled: true,
    loading: false,
  },
  deleteByIndex: {
    disabled: true,
    loading: false,
  },
};
