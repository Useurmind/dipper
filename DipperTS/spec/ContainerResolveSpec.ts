import * as dipper from "../src";

interface IMyStore1 {
}

interface IMyContainer {
    store: IMyStore1;
}

describe("When using resolve on a container", () => {
    var builder = new dipper.ContainerBuilder();

    let container = builder.addIndependent<IMyContainer>(c => ({
            store: c.single<IMyStore1>(() => ({ marker: 1 }))
        })) 
    .create();

    var store = container.resolve("store");
    var store2 = container.resolve("store");

    it("all services are resolved", () => {
        expect(store).toBeDefined();
        expect(store2).toBeDefined();
        expect(store.marker).toBe(1);
    });

    it("single instances are the same", () => {
        expect(store).toBe(store2);
    });
});