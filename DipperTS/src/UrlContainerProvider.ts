import { IContainerProvider, IContainer, setContainerProvider } from ".";
import { ScopedContainer } from "./ScopedContainer";

export interface IUrlContainerProviderOptions {
    /**
     * The container that should be used as the basis for the 
     * different scopes.
     */
    container: IContainer;

    /**
     * Keep the given number of scopes.
     * Remove older scopes.
     */
    historyLength?: number;

    /**
     * The scope key.
     * Use this to scope your services.
     */
    scopeKey?: string;

    /**
     * Include the hash portion of the window location into the url.
     */
    includeHash?: boolean;

    /**
     * Include the search portion of the window location into the url.
     */
    includeSearch?: boolean;
}

/**
 * Provide a new container scope for each different url.
 * This is a very simple scoping strategy as per window.location you will
 * get a different container scope.
 */
export class UrlContainerProvider implements IContainerProvider {
    private scopedContainers = new Map<string, IContainer>();

    constructor(private options: IUrlContainerProviderOptions) {
        this.options.historyLength = this.options.historyLength ? this.options.historyLength : 20;
        this.options.scopeKey = this.options.scopeKey ? this.options.scopeKey : "urlScope";
        this.options.includeHash = this.options.includeHash !== undefined ? this.options.includeHash : true;
        this.options.includeSearch = this.options.includeSearch !== undefined ? this.options.includeSearch : true;
    }

    public getContainer<TContainer>(): ScopedContainer<TContainer> {
        const urlKey = this.getUrlKey();
        let container: IContainer;

        if(this.scopedContainers.has(urlKey)) {
            container = this.scopedContainers.get(urlKey);
            this.scopedContainers.delete(urlKey);
            // reset for lru eviction
            this.scopedContainers.set(urlKey, container);            
        } else {
            container = this.getScopedContainer().startLifetimeScope(this.options.scopeKey);
            this.scopedContainers.set(urlKey, container);

            if (this.scopedContainers.size >= this.options.historyLength) {
                // least-recently used cache eviction strategy
                const keyToDelete = this.scopedContainers.keys().next().value;
          
                this.scopedContainers.delete(keyToDelete);
            }
        }

        return container as any as ScopedContainer<TContainer>;
    }

    public reset(): void {
        this.scopedContainers.forEach(container => {
            container.reset();
        });
    }

    private getScopedContainer(): ScopedContainer<IContainer> {
        return this.options.container as ScopedContainer<IContainer>;
    }

    private getUrlKey(): string {
        let key = LocationHelper.getUrlKey(this.options);
        return key;
    }
}

export class LocationHelper {
    private static fakeLocation: URL;

    public static getUrlKey(options: IUrlContainerProviderOptions): string {
        let baseLocation: Location | URL = this.fakeLocation;
        if(!baseLocation) {
            baseLocation = window.location;
        }

        let key = baseLocation.pathname;
        if(options.includeSearch) {
            key += baseLocation.search;
        }
        if(options.includeHash) {
            key += baseLocation.hash;
        }
        return key;
    }

    /**
     * Used for unit testing.
     * @param location 
     */
    public static setFakeLocation(location: URL) {
        this.fakeLocation = location;
    }
}

export function provideContainerPerUrl(options: IUrlContainerProviderOptions) {
    setContainerProvider(new UrlContainerProvider(options));
}