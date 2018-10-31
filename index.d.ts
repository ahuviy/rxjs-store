import { Observable } from 'rxjs';

export declare function Store<T>(initialState: T): PrivateStore<T>;

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
