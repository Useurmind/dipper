/** 
 * Interface that allows to resolve an instance of a specific type.
 */
export interface IResolve<T> {
    ():  T;
}