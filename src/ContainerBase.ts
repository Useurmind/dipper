import { IContainerCreationContext } from "./IContainerCreationContext";
import { Singleton } from ".";

export class ContainerBase implements IContainerCreationContext {
    public single<T>(create: () => T): () => T{
        return new Singleton(create).toResolver();
    }
    public transient<T>(create: () => T): () => T{
        return create;
    }
}
