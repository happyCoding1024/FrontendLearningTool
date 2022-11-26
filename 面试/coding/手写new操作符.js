function new1 (func) {
  const o = Object.create(func.prototype);
  const k = func.call(o);
  return typeof k === 'object' ? k : o;
}