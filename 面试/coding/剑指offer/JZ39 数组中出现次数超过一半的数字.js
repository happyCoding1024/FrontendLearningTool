function MoreThanHalfNum_Solution(numbers)
{
    // write code here
    const map = new Map();

    for (const num of numbers) {
      if (map.has(num)) {
        map.set(num, map.get(num) + 1);
      } else {
        map.set(num, 1);
      }
    }

    for (const num of numbers) {
      if (map.get(num) > numbers.length / 2) return num;
    }

    return 0;
}
module.exports = {
    MoreThanHalfNum_Solution : MoreThanHalfNum_Solution
};