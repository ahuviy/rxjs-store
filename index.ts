import { BehaviorSubject, Observable } from 'rxjs';

export function Store<T>(initialState: T): PrivateStore<T> {
    const internalStore$ = new BehaviorSubject(initialState);

    return {
        /**
         * The observable state of the store.
         */
        $: internalStore$.asObservable(),
        /**
         * The current store value.
         */
        get v() { return internalStore$.getValue(); },
        publish,
        toPublic,
    };

    /**
     * Push a new store state. use the mutator function
     * to mutate the store value before pushing the new copy.
     */
    function publish(mutator?: (v: T) => void): void {
        mutator && mutator(internalStore$.getValue());
        internalStore$.next(internalStore$.getValue());
    }

    /**
     * Returns the public version of the store,
     * without the ability to publish (push updates).
     */
    function toPublic(): PublicStore<T> {
        return {
            $: internalStore$.asObservable(),
            get v() { return internalStore$.getValue(); }
        };
    }
}

export interface PrivateStore<T> {
    $: Observable<T>;
    readonly v: T;
    publish(mutator?: (v: T) => void): void;
    toPublic(): PublicStore<T>;
}

export interface PublicStore<T> {
    $: Observable<T>;
    readonly v: T;
}
