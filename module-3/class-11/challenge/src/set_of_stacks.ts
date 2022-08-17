export class SetOfStacks<T> {
  // Must use the below Stack class internally.
  // When you need to create a new stack, do so with:
  //
  //    let stack = new Stack<T>(this.maxHeight);
  //
  stacks: Stack<T>[] = [];
  head: Stack<T> | undefined;
  constructor(private readonly maxHeight: number) { }

  push(t: T): void {
    //throw new Error("TODO(you)");
    if (!this.head || this.head._arr.length >= this.maxHeight) {
      let stack = new Stack<T>(this.maxHeight);
      this.head = stack;
      this.stacks.push(stack);
      stack.push(t);
    } else {
      this.head.push(t);
    }
  }

  pop(): T {
    console.log('HEAD',this.head);
    let popped;
    if (!this.head) { throw new Error('No stacks left') };
    if(this.head._arr.length > 0){
      popped = this.head._arr.pop();
    }
    if (this.head._arr.length === 0) {
      this.stacks.pop();
      this.head = this.stacks[this.stacks.length-1];
    };
    if (popped === undefined) {
      throw new Error('Item not found');
    }
    return popped;
  }

  get peek(): T {
    let peeked: any;
    if(this.head?._arr.length === 0 || !this.head){
      throw new Error('No stacks left');
    }
    peeked = this.head._arr[this.head._arr.length-1];
    if(peeked){
      return peeked;
    } else {
      throw new Error('No peek')
    };
  }

  // BONUS QUESTION
  get size(): number {
    let count: number = 0;
    for (let i = 0; i < this.stacks.length; i++) {
      count = count + this.stacks[i]._arr.length;
    };
    return count;
  }
}

class Stack<T> {
  readonly _arr: T[] = [];

  constructor(private readonly maxHeight: number) { }

  push(t: T) {
    if (this._arr.length > this.maxHeight) {
      throw new Error("Stack toppled over!");
    }
    this._arr.push(t);
  }

  pop() {
    return this._arr.pop();
  }

  get peek(): T | undefined {
    return this._arr.at(-1);
  }

  get size(): number {
    return this._arr.length;
  }
}
