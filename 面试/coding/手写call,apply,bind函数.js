/**
 * bind
 */
Function.prototype.bind = function (obj, ...rest) {
  const func = this;
  
  return function () {
    func.call(obj, ...rest);
  }
}

/**
 * apply
 */
Function.prototype.apply = function (obj, args) {
  const func = this;

  func.call(obj, ...args);
}

/**
 * call
 */
Function.prototype.call = function (obj, ...rest) {
  const func = this;

  func.apply(obj, rest);
}


