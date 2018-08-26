export interface IDisposable {
    dispose(): void;
}

export function isDisposable(instance: any): instance is IDisposable {
    return "dispose" in instance;
}