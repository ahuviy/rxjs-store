var BehaviorSubject = require('rxjs').BehaviorSubject;

exports.Store = function (initialState) {
  var internalStore$ = new BehaviorSubject(initialState);

  return {
    stream: internalStore$.asObservable(),
    get value() {
      return internalStore$.getValue();
    },
    publish: function (mutator) {
      mutator && mutator(internalStore$.getValue());
      internalStore$.next(internalStore$.getValue());
    },
    toPublic: function () {
      return {
        stream: internalStore$.asObservable(),
        get value() { return internalStore$.getValue(); }
      };
    },
  };
}
