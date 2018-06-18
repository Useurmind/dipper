DipperTS - A typescript dependency inversion framework
======

Apply the dependency inversion principle (DIP) to your code with DipperTS.

## Installation

```
npm i dipperts --save
```

## Basic example

First define two classes that depend on each other.
Naturally, the dependency should only be on interfaces.

```
// Interfaces.ts
export interface IMyStore1 {
    doSomething();
}

export interface IMyStore2 {
    doSomethingElse();
}
```
    
```
// MyStore1.ts
import { IMyStore1, IMyStore2 } from "./Interfaces";

export class MyStore1 implements IMyStore1 {
    constructor(private myStore2: IMyStore2){}

    public doSomething() {
        // ...

        this.myStore2.doSomethingElse();

        // ...
    }
}
```
```
// MyStore2.ts
import { IMyStore2 } from "./Interfaces";

export class MyStore2 {
    doSomethingElse() {
        // ...
    }
}
```
Next, setup your container and inject the dependent components into each other:
```
// MyContainer.ts
import * as dipper from "dipperTS";
import { IMyStore1, IMyStore2 } from "./Interfaces";
import { MyStore1 } from "./MyStore1";
import { MyStore2 } from "./MyStore2";

// define an interface that reflects which 
// components should be available in it
interface IMyContainer {
    myStore1: IMyStore1;
    myStore2: IMyStore2;
}

// create the container builder to setup your container
let builder = new dipper.ContainerBuilder();

// create the container
// - add your interface
// - setup all components (in this case to singletons)
// - create the container
let container = builder.add<IMyContainer>(c => ({
        myStore1: c.single<IMyStore1>(() => new MyStore1(c.myStore2())),
        myStore2: c.single<IMyStore2>(() => new MyStore2())
    }))
    .create();

// resolve MyStore1
let myStore1 = container.myStore1();

// do something with your store
myStore.doSomething();
```

## Other Topics
- Resolution strategies
- Container Combinations
- Resetting the container

## License

[MIT License](LICENSE.md)