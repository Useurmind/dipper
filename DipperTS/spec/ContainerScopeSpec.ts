import * as dipper from "../src";

interface IMyStore1 {
}

interface IMyContainer {
    store: IMyStore1;
}

describe("When creating scopes on containers", () => {
    var builder = new dipper.ContainerBuilder();
    const scopeKey = "scope";

    let container = builder.addIndependent<IMyContainer>(c => ({
            store: c.scoped<IMyStore1>(() => ({ marker: 1 }), scopeKey)
        })) 
    .create();

    // first container with one instance resolved twice
    var store = container.store();
    var store2 = container.store();

    // second container with new scope and new instance
    var container2 = container.startLifetimeScope(scopeKey);
    var store3 = container2.store();
    var store4 = container2.store();

    // third container whose scope should not influence this instance
    var container3 = container.startLifetimeScope("unrelatedScope");
    var store5 = container3.store();
    var store6 = container3.store(); 

    // third container whose scope should not influence this instance
    var container4 = container3.startLifetimeScope("unrelatedScope");
    var store7 = container4.store();
    var store8 = container4.store(); 

    it("all services are resolved", () => {
        expect(store).toBeDefined();
        expect(store2).toBeDefined();
        expect(store3).toBeDefined();
        expect(store4).toBeDefined();
        expect(store5).toBeDefined();
        expect(store6).toBeDefined();
        expect(store7).toBeDefined();
        expect(store8).toBeDefined();
    });

    it("services in each scope are the same", () => {
        expect(store).toBe(store2);
        expect(store3).toBe(store4);
        expect(store5).toBe(store6);
        expect(store7).toBe(store8);
    });

    it("services in different scopes are different", () => {
        expect(store).not.toBe(store3);
        expect(store5).not.toBe(store3);
    });

    it("services in first unrelated derived scope are the same", () => {
        expect(store).toBe(store5);
    });
    
    it("services in second unrelated derived scope are the same", () => {
        expect(store).toBe(store7);
    });
});