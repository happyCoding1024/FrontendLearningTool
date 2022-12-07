function GetLeastNumbers_Solution(input, k)
{
    // write code here
    if (!input) return null;

    input.sort((a, b) => a - b);

    return input.slice(0, k);
}
module.exports = {
    GetLeastNumbers_Solution : GetLeastNumbers_Solution
};