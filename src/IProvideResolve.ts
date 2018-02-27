import { IResolve } from "./IResolve";
import { IReset } from "./IReset";
import { IDisposable } from "./IDisposable";

/**
 * This interface allows classes to return resolvers.
 */
export interface IProvideResolve<T> extends IReset, IDisposable {
    /** 
     * Create a function that will resolve the registered instance.
     */
    toResolver(): IResolve<T>;

    /**
     * Reset the provider to discard any memory about created instances.
     */
    reset(): void;
}