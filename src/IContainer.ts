import { IReset } from "./IReset";
import { IDisposable } from "./IDisposable";

export interface IContainer extends IReset, IDisposable {
    /**
     * Reset the state of the container to start resolving fresh instances afterwards.
     */
    reset(): void;
}

export interface IScopeProvider<TContainer> {
    /**
     * Start a new lifetime scope.
     * @param tag Give a name to the scope that is matched to the registrations.
     */
    startLifetimeScope(tag?: string): TContainer;
}