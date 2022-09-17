import { IStack } from "../../types/types";

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
  
    elements = () => {
      const arr = [];
      for (let i of this.container) arr.push(i);
      return arr;
    }
  
    clear = () => {
      this.container = []
    }
  
    getSize = () => this.container.length;
  }