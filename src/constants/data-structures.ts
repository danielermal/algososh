interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getSize: () => number;
  }
  
  export class Stack<T> implements IStack<T> {
    container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item)
    };
  
    pop = (): void => {
      if (this.container.length !== 0) {
        this.container.pop()
      }
    };
  
    getSize = () => this.container.length;
  }

