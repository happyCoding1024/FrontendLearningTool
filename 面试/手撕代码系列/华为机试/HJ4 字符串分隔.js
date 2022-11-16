// 重点在于一些数组API不熟练，然后就是分组的使用不流畅

const str = 'abcdefgha';

const groupNum = Math.floor(str.length / 8);
const lastGroupLen = str.length % 8;

for (let i = 0; i < groupNum; i++) {
  console.log(str.slice(i * 8, i * 8 + 8));
}

const lastStr = str.slice(groupNum * 8, groupNum * 8 + lastGroupLen);

console.log(lastStr.padEnd( 8 - lastGroupLen, 0));







