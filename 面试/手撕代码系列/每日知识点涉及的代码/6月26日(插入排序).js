(function (arr) {
    var _a;
    for (var i = 0, len = arr.length; i < len; i++) {
        var j = i;
        while (j > 0 && arr[j] < arr[j - 1]) {
            _a = [arr[j - 1], arr[j]], arr[j] = _a[0], arr[j - 1] = _a[1];
            j--;
        }
    }
    console.log(arr)
    return arr;
})([1, 3, 2]);


