var { BehaviorSubject } = require('rxjs');

function Store(initialState) {
  var internalStore$ = new BehaviorSubject(initialState);

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
  function publish(mutator) {
    mutator && mutator(internalStore$.getValue());
    internalStore$.next(internalStore$.getValue());
  }

  /**
   * Returns the public version of the store,
   * without the ability to publish (push updates).
   */
  function toPublic() {
    return {
      $: internalStore$.asObservable(),
      get v() { return internalStore$.getValue(); }
    };
  }
}

module.exports = { Store };
