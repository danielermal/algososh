import { IQueue } from "../../types/types";

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

  elements = () => {
    const arr = [];
    for (let i of this.container) arr.push(i);
    return arr;
  };

  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;
}
