import * as dipper from "../src";

interface IMyStore1 {
    store2?: IMyStore2;
}

interface IMyStore2 {

}

interface IMyContainer {
    myStore1: IMyStore1;
    myStore2?: IMyStore2;
}

describe("When creating a singleton from an instance", () => {
    let myStore1 = {};

    var builder = new dipper.ContainerBuilder();

    var container = builder.addIndependent<IMyContainer>(c => ({
        myStore1: c.single<IMyStore1>(() => myStore1)
    })).create();

    let createdStore = container.myStore1();

    it("it should be the same as the instance", () => {
        expect(createdStore).toBe(myStore1);
    })

    it("second created instance should be same as first", () => {
        let createdStore2 = container.myStore1();

        expect(createdStore2).toBe(createdStore);
    })
});

describe("When creating a singleton from a function", () => {
    var builder = new dipper.ContainerBuilder();

    var container = builder.addIndependent<IMyContainer>(c => ({
        myStore1: c.single<IMyStore1>(() => ({}))
    })).create();

    let createdStore = container.myStore1();

    it("it should be defined", () => {
        expect(createdStore).toBeDefined();
    })

    it("second created instance should be same as first", () => {
        let createdStore2 = container.myStore1();

        expect(createdStore2).toBe(createdStore);
    })
});

describe("When creating a singleton from a function with singleton dependency", () => {
    var builder = new dipper.ContainerBuilder();

    var container = builder.addIndependent<IMyContainer>(c => ({
        myStore1: c.single<IMyStore1>(() => ({
            store2: c.myStore2()
        })),
        myStore2: c.single<IMyStore2>(() => ({}))
    })).create();

    let createdStore1 = container.myStore1();
    let createdStore2 = container.myStore2();

    it("the dependency should be defined", () => {
        expect(createdStore1.store2).toBeDefined();
    })

    it("the dependency should be the same instance as resolved from the container", () => {
        expect(createdStore1.store2).toBe(createdStore2);
    })

    it("the dependency of the second resolution should be the same instance as resolved from the container", () => {
        let secondCreatedStore1 = container.myStore1();

        expect(secondCreatedStore1.store2).toBe(createdStore2);
    })
});

describe("When creating a transient from a function", () => {
    var builder = new dipper.ContainerBuilder();

    var container = builder.addIndependent<IMyContainer>(c => ({
        myStore1: c.transient<IMyStore1>(() => ({}))
    })).create();

    let createdStore1 = container.myStore1();

    it("it should be defined", () => {
        expect(createdStore1).toBeDefined();
    })

    it("the second resolution should be different from the first", () => {
        let secondCreatedStore1 = container.myStore1();

        expect(secondCreatedStore1).not.toBe(createdStore1);
    })
});

describe("When creating a transient from a function with transient dependencies", () => {
    var builder = new dipper.ContainerBuilder();

    var container = builder.addIndependent<IMyContainer>(c => ({
        myStore1: c.transient<IMyStore1>(() => ({
            store2: c.myStore2()
        })),
        myStore2: c.transient<IMyStore2>(() => ({}))
    })).create();

    let createdStore1 = container.myStore1();

    it("it should be defined", () => {
        expect(createdStore1).toBeDefined();
    })

    it("the dependency should be defined", () => {
        expect(createdStore1.store2).toBeDefined();
    })

    it("the second resolution dependency should be different from the first", () => {
        let secondCreatedStore1 = container.myStore1();

        expect(secondCreatedStore1.store2).not.toBe(createdStore1.store2);
    })
});

describe("When creating a transient from a function with singleton dependencies", () => {
    var builder = new dipper.ContainerBuilder();

    var container = builder.addIndependent<IMyContainer>(c => ({
        myStore1: c.transient<IMyStore1>(() => ({
            store2: c.myStore2()
        })),
        myStore2: c.single<IMyStore2>(() => ({}))
    })).create();

    let createdStore1 = container.myStore1();

    it("it should be defined", () => {
        expect(createdStore1).toBeDefined();
    })

    it("the dependency should be defined", () => {
        expect(createdStore1.store2).toBeDefined();
    })

    it("the second resolution dependency should be the same as the first dependency", () => {
        let secondCreatedStore1 = container.myStore1();

        expect(secondCreatedStore1.store2).toBe(createdStore1.store2);
    })
});