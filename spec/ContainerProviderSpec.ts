import * as dipper from "../src";

interface IMyStore1 {
}

interface IMyContainer {
    store: IMyStore1;
}

describe("When using container instance provider", () => {
        var builder = new dipper.ContainerBuilder();

        let container = builder.addIndependent<IMyContainer>(c => ({
                store: c.single<IMyStore1>(() => ({ }))
            }))
        .create();

        dipper.provideContainerInstance(container);

        let container2 = dipper.getContainerProvider().getContainer();

    it("the provided container is the container that was set", () => {
        expect(container2).toBe(container);
    });
});