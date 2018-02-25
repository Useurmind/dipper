import { IContainerCreationContext } from "./IContainerCreationContext";
import { Singleton } from ".";

/** 
 * This is the base class for a container.
 * It contains functions to define different resolution strategies.
 */
export class ContainerBase implements IContainerCreationContext {
    public single<T>(create: () => T): () => T {
        return new Singleton(create).toResolver();
    }
    public transient<T>(create: () => T): () => T {
        return create;
    }
}
