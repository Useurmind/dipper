import * as dipper from "../src";

interface IMyStore1 {
}

interface IMyContainer {
    store: IMyStore1;
}

describe("When using a container factory", () => {
        var builder = new dipper.ContainerBuilder();

        let container = builder.addIndependent<IMyContainer>(c => ({
                store: c.single<IMyStore1>(() => ({ }))
            }))
        .create();

        var store = container.store();
        var store2 = container.store();

        container.reset();

        var store3 = container.store();
        var store4 = container.store();

    it("all services are resolved", () => {
        expect(store).toBeDefined();
        expect(store2).toBeDefined();
        expect(store3).toBeDefined();
        expect(store4).toBeDefined();
    });

    it("services before reset are equal", () => {
        expect(store).toBe(store2);
    });

    it("services after reset are equal", () => {
        expect(store3).toBe(store4);
    });

    it("services before reset are not the same as after reset", () => {
        expect(store).not.toBe(store3);
    });
});