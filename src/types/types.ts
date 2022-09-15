export interface IButtonsStatus {
  addInHead: {
    disabled: boolean;
    loading: boolean;
  };
  addInTail: {
    disabled: boolean;
    loading: boolean;
  };
  deleteInHead: {
    disabled: boolean;
    loading: boolean;
  };
  deleteInTail: {
    disabled: boolean;
    loading: boolean;
  };
  addByIndex: {
    disabled: boolean;
    loading: boolean;
  };
  deleteByIndex: {
    disabled: boolean;
    loading: boolean;
  };
}

export interface IButtonsStatusSort {
    newArray: {
      disabled: boolean;
    };
    ascendingSort: {
      disabled: boolean;
      loading: boolean;
    };
    descendingSort: {
      disabled: boolean;
      loading: boolean;
    };
  }

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getSize: () => number;
  getStack: () => (T | null)[]
}

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
  getQueue: () => (T | null)[]
}

export interface ILinkedItem {
  value: string;
  up: React.ReactElement | null;
  down: React.ReactElement | null;
  next: boolean;
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}
