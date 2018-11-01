import { Observable } from 'rxjs';

/**
 * Creates an RxJS-based observable data container.
 * 
 * @param initialState The initial state.
 */
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
   * Publish a new store state.
   * 
   * @param transformer A function that receives the previous state and returns the new state.
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
