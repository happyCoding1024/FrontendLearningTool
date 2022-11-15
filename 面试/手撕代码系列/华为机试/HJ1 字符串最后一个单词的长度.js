const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        line = line.trim();
        let tokens = line.split(' ');
        console.log(tokens[tokens.length - 1].length);
    }
}()
