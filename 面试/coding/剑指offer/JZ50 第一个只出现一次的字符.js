function FirstNotRepeatingChar(str)
{
    // write code here
    const map = {};

    for (let i = 0; i < str.length; i++) {
      if (!map[str[i]]) {
        map[str[i]] = 1;
      } else {
        map[str[i]]++
      }
    }

    let firstWord;
    for (const [key, value] of Object.entries(map)) {
      if (value === 1) {
        firstWord = key;
        break;
      }
    }

    return str.indexOf(firstWord);
}

const str = 'aa';
console.log(FirstNotRepeatingChar(str))

module.exports = {
    FirstNotRepeatingChar : FirstNotRepeatingChar
};