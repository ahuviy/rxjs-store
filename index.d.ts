import { Observable } from 'rxjs';

export declare function Store<T>(initialState: T): PrivateStore<T>;

export interface PrivateStore<T> {
  /**
   * The observable state of the store.
   */
  stream: Observable<T>;

  /**
   * The current store value.
   */
  readonly value: T;

  /**
   * Publish a new store state. use the mutator function
   * to mutate the store value before publishing the new copy.
   */
  publish(mutator?: (value: T) => void): void;

  /**
   * Returns the public version of the store,
   * without the ability to publish (push updates).
   */
  toPublic(): PublicStore<T>;
}

export interface PublicStore<T> {
  /**
   * The observable state of the store.
   */
  stream: Observable<T>;
  
  /**
   * The current store value.
   */
  readonly value: T;
}
