function Permutation(str)
{
    // write code here
    const res = [];
    const map = new Map();

    rec(str, [], map);

    return [...new Set(res)];
    
    function rec (str, temp, map) {
      if (temp.length === str.length) {
        res.push(temp.join(''));
        return;
      }

      for (let i = 0; i < str.length; i++) {
        if (map.get(i)) continue;
        // 例如AA这种情况，当前面的A用过之后后面的也要加上标记
        // if (i > 0 && str[i - 1] === str[i] && map.get(i-1)) continue;

        // 标记为使用过
        map.set(i, true);

        rec(str, temp.concat(str[i]), map);
        
        // 回溯
        map.set(i, false);
        temp.pop();
      }
    }
}

console.log(Permutation("aab"));

module.exports = {
    Permutation : Permutation
};