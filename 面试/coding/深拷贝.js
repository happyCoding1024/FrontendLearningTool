/**
 * 深拷贝
 */
function deepClone(obj) {
  if (typeof obj !== 'object' || typeof obj === null) return obj;

  const cloneObj = obj instanceof Array ? [] : {};


  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key]);
    }
  }

  return cloneObj;
}

const obj = {
  a: {
    foo: {
      name: 'zhangsan'
    }
  }
}

console.log(deepClone(obj));