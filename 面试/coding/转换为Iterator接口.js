const obj = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
}

// 使用generator 函数实现，generator函数返回的就是一个iterator接口
function makeIerator1 (obj) {
  let iteratorObj = Object.assign({}, obj)


  iteratorObj[Symbol.iterator] = function* () {
    const self = this;
    const keys = Object.keys(self);
    for (let index = 0;index < keys.length; index++) {
        yield self[keys[index]];
    } 
  }

  return iteratorObj;
}

// 不使用generator函数
function makeIerator2 (obj) {
  let iteratorObj = Object.assign({}, obj);

  iteratorObj[Symbol.iterator] = function () {
    const self = this;
    const keys = Object.keys(self);
    let index = 0;

    return {
      next: function () {
        if (index < keys.length) {
          return {
            value: self[keys[index++]], done: false
          }
        } else {
          return {
            value: undefined, done: true
          }
        }
      }
    }
  }

  return iteratorObj;
}


const iteObj = makeIerator2(obj);

for (const item of iteObj) {
  console.log(item)
}

const iteratorObj = {
  [Symbol.iterator]: function () {
    let index = 0;
    return {
      next: function () {
        if (index < 3) {
          return { value: index++, done: false}
        } else {
          return { value: index, done: true }
        }
      }
    }
  }
}

// for (let item of iteratorObj) {
//   console.log(item);
// }