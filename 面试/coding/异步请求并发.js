// 有M个请求，一次并发发送N个，当前面N个发送完成之后再发送后面N个
function requestPool(promiseArr, count) {
  return new Promise ((resolve, reject) => {
    let index = 0;
    const res = [];
  
    run();
    
    function run () {
      if (index >= count) {
        resolve(res);
        return;      
      }

      old_index = index
      index += count;
      
      const excutePromiseArr = promiseArr.slice(old_index, index);

      let excuteCount = 0

      for (const excutePromise of excutePromiseArr) {
        excutePromise.then((data) => {
          res.push(data);
          excuteCount++;
          if (excuteCount === count) {
            run();
          }
        }).catch((e) => {
          res.push(e);
        })
      }
    }

  })
}

const promiseArr = [];
for (let i = 0; i < 6; i++) {
  promiseArr.push(new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, i);
  }));
}

// requestPool(promiseArr, 6).then((data) => {
//   console.log(data);
// })


// 有M个请求，一次发送N个，每发送完一个接着发送另外一个
function promisePool (promiseArr, count) {

  return new Promise((resolve, reject) => {
    const res = [];
    const isExcuteMap = new Map();
    let index = 0;
    run (promiseArr.slice(0, count));
  
    function run (proArr) {
      if (index === promiseArr.length) {
        resolve(res);
        return;
      }
      index = proArr.length;
  
      for (const promise of proArr) {
        if (!isExcuteMap.get(promise)) {
          promise.then((data) => {
            res.push(data);
            console.log(data);
            proArr.push(promiseArr[index]);
            run(proArr);
          });
  
          isExcuteMap.set(promise, true);
        }
      }
    }
  })
}

promisePool(promiseArr, 2).then((data) => {
  console.log(data);
})

console.log(1)


