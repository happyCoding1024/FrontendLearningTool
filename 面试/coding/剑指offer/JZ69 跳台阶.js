function jumpFloor(number)
{
    // write code here
    if (number === 1) return 1;
    if (number === 2) return 2;
    
    return jumpFloor(number - 1) + jumpFloor(number - 2);
}
module.exports = {
    jumpFloor : jumpFloor
};