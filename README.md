DipperTS - A typescript dependency inversion framework
======

Apply the dependency inversion principle (DIP) to your code with DipperTS.

## Installation

```powershell
npm i dipperts --save
```

## Basic example

First define two classes that depend on each other.
Naturally, the dependency should only be on interfaces.

```typescript
// Interfaces.ts
export interface IMyStore1 {
    doSomething();
}

export interface IMyStore2 {
    doSomethingElse();
}
```
    
```typescript
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

```typescript
// MyStore2.ts
import { IMyStore2 } from "./Interfaces";

export class MyStore2 {
    doSomethingElse() {
        // ...
    }
}
```
Next, setup your container and inject the dependent components into each other:

```typescript
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

## Resolution Strategies

### Single

The single resolution strategy means that the container will only ever create one instance of this service type.

**Example:**

```typescript
let container = builder.add<IMyContainer>(c => ({
        myStore2: c.single<IMyStore2>(() => new MyStore2())
    }))
    .create();

// store2 is same instance as store2_2
let store2 = container.myStore2();
let store2_2 = container.myStore2();
```

### Transient

Transient means that whenever this type is requested a new instance is created.

**Example:**

```typescript
let container = builder.add<IMyContainer>(c => ({
        myStore2: c.transient<IMyStore2>(() => new MyStore2())
    }))
    .create();

    
// store2 is a different instance than store2_2
let store2 = container.myStore2();
let store2_2 = container.myStore2();
```

### Scoped

Scoped resolution means that per matching scope key a new instance is created. Whenever a scoped service is requested from the same scope the same instance will be returned.

**Example:**

```typescript
let container = builder.add<IMyContainer>(c => ({
        myStore2: c.scoped<IMyStore2>(() => new MyStore2(), "myScope")
    }))
    .create();

let container1 = container.startLifetimeScope("myScope");
let container2 = container.startLifetimeScope("myScope");

// store2 and store2_2 are resolved from the same scope
// therefore they are the same
let store2 = container1.myStore2();
let store2_2 = container1.myStore2();

// store2_3 is resolved from another scope, therefore it is different
let store2_3 = container2.myStore2();
```

## Container Provider

The container provider is a means to implement a global provider for a container scope that should be used in any given context.

When you want to use scoped resolution strategy you usually have to implement when to change the scope. Also the scoped container needs to be used to resolve instances in the new scope.

Using the container provider as a global place for dependency resolution you can implement there when to switch the container scopes.

You could use this to provide a new container scope for each url/route that your application is navigated too. By that you can scope instances of your services to specific urls/routes.

**Example:**
Provide a single container throughout the app.

```typescript
let container = builder.add<IMyContainer>(c => ({
        myStore2: c.scoped<IMyStore2>(() => new MyStore2(), "myScope")
    }))
    .create();

dipper.provideContainerInstance(container);

// container2 will be the same as container1
let container2 = dipper.getContainerProvider().getContainer<IMyContainer>();
```


## Other Topics
- Container Combinations
- Resetting the container

## License

[MIT License](LICENSE.md)