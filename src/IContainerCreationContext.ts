/**
 * Interface that contains the functions to register instances with the available resolution strategies.
 */
export interface IContainerCreationContext {
    /**
     * Register an instance with the singleton resolution strategy.
     * @param create A fuction that will create the instance.
     */
    single<T>(create: () => T): () => T;

    /**
     * Register an instance with the transient resolution strategy.
     * @param create A fuction that will create the instance.
     */
    transient<T>(create: () => T): () => T;
}