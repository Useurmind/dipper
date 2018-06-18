import { IResolve } from ".";

/**
 * Interface that contains the functions to register instances with the available resolution strategies.
 */
export interface IContainerCreationContext {
    /**
     * Register an instance with the singleton resolution strategy.
     * @param create A function that will create the instance.
     */
    single<T>(create: () => T): IResolve<T>;

    /**
     * Register an instance with the transient resolution strategy.
     * @param create A function that will create the instance.
     */
    transient<T>(create: () => T): IResolve<T>;

    /**
     * Register an instance with the singleton resolution strategy per scope.
     * @param create A function that will create the instance.
     * @param scopeKey The key that identifies the scope in which the instance should be unique.
     */
    scoped<T>(create: () => T, scopeKey: string): IResolve<T>;
}