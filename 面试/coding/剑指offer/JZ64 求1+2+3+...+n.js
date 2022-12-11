function Sum_Solution(n)
{
  return n > 0 && Sum_Solution(n - 1) + n;
}

module.exports = {
    Sum_Solution : Sum_Solution
};