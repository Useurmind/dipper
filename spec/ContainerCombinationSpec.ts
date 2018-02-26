import * as dipper from "../src";
import { ContainerBuilder } from "../src";

interface ILogger {

}

interface ILoggerContainer {
    logger: ILogger;
}

interface IMyStore1 {
    logger: ILogger;
}

interface IMyContainer {
    store: IMyStore1;
}

describe("When combining two containers", () => {
        var builder = new ContainerBuilder();

        let container = builder.add<ILoggerContainer>(c => ({
                logger: c.single(() => ({}))
            }))
        .add<IMyContainer>(c => ({
                store: c.single<IMyStore1>(() => ({ logger: c.logger() }))
            }))
        .create();

        var logger = container.logger();
        var store = container.store();

    it("all services are available on finished container", () => {
        expect(logger).toBeDefined();
        expect(store).toBeDefined();
    });

    it("dependencies are resolved accross container borders", () => {
        expect(store.logger).toBe(logger);        
    });
});