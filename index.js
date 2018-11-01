var BehaviorSubject = require('rxjs').BehaviorSubject;

exports.Store = function (initialState) {
  var internalStore$ = new BehaviorSubject(initialState);

  return {
    stream: internalStore$.asObservable(),
    get value() {
      return internalStore$.getValue();
    },
    publish: function (transformer) {
      var newValue = transformer
        ? transformer(internalStore$.getValue())
        : internalStore$.getValue();
      internalStore$.next(newValue);
    },
    toPublic: function () {
      return {
        stream: internalStore$.asObservable(),
        get value() { return internalStore$.getValue(); }
      };
    },
  };
}
