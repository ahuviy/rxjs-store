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
   * Publish a new store state. The transformer function
   * returns the new store value to be published.
   */
  publish(transformer?: (value: T) => T): void;

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
