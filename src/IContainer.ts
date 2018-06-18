import { IReset } from "./IReset";
import { IDisposable } from "./IDisposable";

export interface IContainer extends IReset, IDisposable {
    /**
     * Reset the state of the container to start resolving fresh instances afterwards.
     */
    reset(): void;

    /**
     * Resolve a registered component from the container.
     * @param key The key which should be resolved.
     */
    resolve(key: string): any;
}

export interface IScopeProvider<TContainer> {
    /**
     * Start a new lifetime scope.
     * @param tag Give a name to the scope that is matched to the registrations.
     */
    startLifetimeScope(tag?: string): IScopeProvider<TContainer> & TContainer;
}