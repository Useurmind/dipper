import { CounterStore } from "./CounterStore";

export interface MyContainer {
    globalCounterStore: CounterStore;
    perPageCounterStore: CounterStore;
    transientCounterStore: CounterStore;
}