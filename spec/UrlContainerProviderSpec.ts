import * as dipper from "../src";
import { IProvideResolve, ResolvingContainer, ScopedContainer, ContainerBuilder2 } from "../src";
import { IContainer } from "../dist/src/IContainer";

interface IMyStore1 {
}

interface IMyContainer {
    store: IMyStore1;
}

describe("When using the url container provider", () => {
    var builder = new dipper.ContainerBuilder();

    let container = builder.addIndependent<IMyContainer>(c => ({
        store: c.single<IMyStore1>(() => ({}))
    }))
        .create();

    dipper.provideContainerPerUrl({
        container,
        historyLength: 2
    });
   
    let location1 = new URL("http://www.myhost.de/path1");
    dipper.LocationHelper.setFakeLocation(location1);

    let container1 = dipper.getContainerProvider().getContainer<IMyContainer>();
    let container1_2 = dipper.getContainerProvider().getContainer<IMyContainer>();
    
    let location2 = new URL("http://www.myhost.de/path2");
    dipper.LocationHelper.setFakeLocation(location2);

    let container2 = dipper.getContainerProvider().getContainer<IMyContainer>();

    // switch around and fill hsitory, location1 evicted here
    let location3 = new URL("http://www.myhost.de/path3");
    dipper.LocationHelper.setFakeLocation(location3);
    let container3 = dipper.getContainerProvider().getContainer<IMyContainer>();

    // go back to location1 and check it is a new container
    dipper.LocationHelper.setFakeLocation(location1);

    let container1_3 = dipper.getContainerProvider().getContainer<IMyContainer>();

    it("the provided container changes per location", () => {
        expect(container1).not.toBe(container);
        expect(container1_2).toBe(container1);
        expect(container2).not.toBe(container1);
        expect(container2).not.toBe(container);
        expect(container3).not.toBe(container);
        expect(container3).not.toBe(container2);
        expect(container3).not.toBe(container1);
        expect(container1_3).not.toBe(container);
        expect(container1_3).not.toBe(container2);
    });

    it("locations are evicted from history", () => {
        expect(container1).not.toBe(container1_3);
    });
});