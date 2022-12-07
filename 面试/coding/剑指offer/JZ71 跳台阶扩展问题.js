function jumpFloorII(number)
{
    // write code here
    const dp = [];
    dp[1] = 1;
    dp[2] = 2;
    for (let i = 2; i <= number; i++) {
      dp[i] = 2 * dp[i - 1];
    }

    return dp[number];
}
module.exports = {
    jumpFloorII : jumpFloorII
};
