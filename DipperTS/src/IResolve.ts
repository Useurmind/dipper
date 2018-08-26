/** 
 * Interface that allows to resolve an instance of a specific type.
 */
export interface IResolve<T> extends IResolveWithOrigin {
    ():  T;
}

export interface IResolveWithOrigin {
    resolverType: ResolverType;

    toOrigin(): any;
}

export function isResolverWithOrigin(instance: any): instance is IResolveWithOrigin {
    return "toOrigin" in instance && "resolverType" in instance;
}

export enum ResolverType {
    Singleton,
    Transient
}