Object.prototype.instanceof1 = function (constructor) {
  if (typeof constructor !== 'function') return false;

  const obj = this;
  
  let prototype = obj.__proto__;
  while (prototype) {
    if (prototype === constructor.prototype) return true
    prototype = prototype.__proto__;
  }    

  return false;
}

class A {};
const a = new A();


console.log(a.instanceof1(A));
console.log(a.instanceof1(Array));
console.log(a.instanceof1(Object));
