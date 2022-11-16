// 判断是否为质数
function isPrimeNum(n) {
  if (n < 2) return false;

  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false; 
  }

  return true;
}

console.log(isPrimeNum(6))

const res = [];
let num = 180;
for (let i = 2; i <= num; i++) {
  if (isPrimeNum(i)) {
    while(num % i === 0) {
      num = num / i;
      res.push(i)
    }
  }
}

console.log(res);
