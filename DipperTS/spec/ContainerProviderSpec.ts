import * as dipper from "../src";
import { IProvideResolve, ResolvingContainer, ScopedContainer } from "../src";
import { IContainer } from "../src/IContainer";

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

        let container2 = dipper.getContainerProvider().getContainer<IMyContainer>();

       

    it("the provided container is the container that was set", () => {
        expect(container2).toBe(container);
    });

    it("the provider resets the container", () => {
        let storeBeforeReset = container2.store();
        dipper.getContainerProvider().reset();
        let storeAfterReset = container2.store();

        expect(storeBeforeReset).not.toBe(storeAfterReset);
    });

    it("can still use lifetimescopes on container", () => {
        let scopedConainer = container2.startLifetimeScope("asd");

        var store3 = scopedConainer.store();
    });
});