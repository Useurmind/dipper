import { IResolve } from "./IResolve";
import { IReset } from "./IReset";

/**
 * This interface allows classes to return resolvers.
 */
export interface IProvideResolve<T> extends IReset {
    /** 
     * Create a function that will resolve the registered instance.
     */
    toResolver(): IResolve<T>;

    /**
     * Reset the provider to discard any memory about created instances.
     */
    reset(): void;
}