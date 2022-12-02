// 有100个请求，一次只能并发发送10个
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
  promiseArr.push(Promise.resolve(`这是第${i}个promise`));
}

requestPool(promiseArr, 6).then((data) => {
  console.log(data);
})

Promise.all = (promiseArr) => {
  return new Promise((resolve, reject) => {
    const res = [];
    let count = 0;

    for (promise of promiseArr) {
      promise.then((data) => {
        count++;

      }).catch((e) => {
        
      })
    }
  })  
} 


