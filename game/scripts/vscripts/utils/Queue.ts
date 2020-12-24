
class Queue<T>{
    private items:Array<T>;
    constructor() {
        this.items = [];
    }
    enqueue(data: T): void {
        this.items.push(data);
    }
    dequeue(): T {
        return this.items.shift();
    }
    head(): T {
        return this.items[0];
    }
    size(): number {
        return this.items.length;
    }
    clear(): void {
        this.items = new Array<T>();
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    tail(): T {
        return this.items[this.items.length - 1];
    }
    print(): void {
        print(this.items);
    }
}
