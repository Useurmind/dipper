export class CounterStore {
    private counter: number = 0;
    private subscriber: (count: number) => void = null;

    public increment(): void {
        this.counter++;
        if(this.subscriber) {
            this.subscriber(this.counter);
        }
    }

    public subscribe(next: (count: number) => void) {
        this.subscriber = next;
    }
}