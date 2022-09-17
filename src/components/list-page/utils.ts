import { IButtonsStatus, ILinkedItem, ILinkedList } from "../../types/types";

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

export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  addByIndex = (element: T, index: number) => {
    if (index < 0 || index >= this.size) {
      console.log("Enter a valid index");
      return;
    }
    const node = new LinkedListNode(element);

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let curr = this.head;
      let currIndex = 0;
      while (currIndex < index - 1) {
        curr = curr!.next;
        currIndex++;
      }
      node.next = curr!.next;
      curr!.next = node;
    }

    this.size++;
  };

  prepend = (element: T) => {
    const node = new LinkedListNode(element);
    node.next = this.head;
    this.head = node;
  };

  append = (element: T) => {
    const node = new LinkedListNode(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  };

  deleteHead = () => {
    if (!this.head) {
      return null;
    }
    this.head.next ? (this.head = this.head.next) : (this.head = null);
  };

  deleteByIndex = (index: number) => {
    if (index > 0 && index > this.size) return -1;
    let current,
      previous,
      it = 0;
    current = this.head;
    previous = current;

    if (index === 0) {
      this.head = current ? current.next : null;
    } else {
      while (it < index) {
        it++;
        previous = current;
        current = current?.next;
      }
      if (previous) {
        previous.next = current ? current.next : null;
      }
    }
    this.size--;
  };

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res: ILinkedItem[] = [];
    while (curr) {
      res = [
        ...res,
        {
          value: `${curr.value}`,
          next: curr.next ? true : false,
          down: null,
          up: null,
        },
      ];
      curr = curr.next;
    }
    return res;
  }
}
