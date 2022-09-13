interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  getSize: () => number;
}

export class Stack<T> implements IStack<T> {
  container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    if (this.container.length !== 0) {
      this.container.pop();
    }
  };

  getSize = () => this.container.length;
}

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  container: (T | null)[] = [];
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

  isEmpty = () => this.length === 0;
}

export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export interface ILinkedItem {
  value: string;
  up: React.ReactElement | null;
  down: React.ReactElement | null;
  next: boolean;
}

interface ILinkedList<T> {
  append: (element: T) => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index >= this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new Node(element);

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
  }

  append(element: T) {
    const node = new Node(element);
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
    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
    }
  }

  removeFrom(index: number) {
    if (index > 0 && index > this.size) return -1;
    else {
      let current,
        previous,
        it = 0;
      current = this.head;
      previous = current;

      if (index == 0) {
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
        { value: `${curr.value}`, next: curr.next ? true : false, down: null, up: null },
      ];
      curr = curr.next;
    }
    return res;
  }
}
