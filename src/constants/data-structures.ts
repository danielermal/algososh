import { IStack } from "../types/types";
import { IQueue } from "../types/types";
import { ILinkedItem } from "../types/types";
import { ILinkedList } from "../types/types";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  getStack() {
    const arr = [];
    for (let i of this.container) arr.push(i);
    return arr;
  }

  getSize = () => this.container.length;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  head = 0;
  tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail] = item;
    this.tail === this.size ? (this.tail = 0) : this.tail++;

    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    delete this.container[this.head];

    if (this.isEmpty()) {
      this.head = this.tail = 0;
    } else {
      this.head === this.size - 1 ? (this.head = 0) : this.head++;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    } else {
      return this.container[this.head % this.size];
    }
  };

  getQueue() {
    const arr = [];
    for (let i of this.container) arr.push(i);
    return arr;
  }

  isEmpty = () => this.length === 0;
}

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

  insertAt(element: T, index: number) {
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
  }

  append(element: T) {
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
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    this.head.next ? (this.head = this.head.next) : (this.head = null);
  }

  removeFrom(index: number) {
    if (index > 0 && index > this.size) return -1;
    else {
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
    }
  }

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
