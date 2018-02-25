export interface IContainerCreationContext {
    single<T>(create: () => T): () => T;
    transient<T>(create: () => T): () => T;
}