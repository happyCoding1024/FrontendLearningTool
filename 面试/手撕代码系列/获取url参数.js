// 方法一：自己写函数
function queryUrlSearch () {
  let searArr = {}
  let key, value
  // eslint-disable-next-line no-undef
  const search = location.search.substr(1)
  const arr = search.split('&')
  arr.forEach(item => {
    key = item.split('=')[0]
    value = item.split('=')[1]
    searArr[key] = value
  })
  return searArr
}

const res = queryUrlSearch()
console.log(res.a)

// 方法2：URLSearchParams

// const res = new URLSearchParams(location.search)
// console.log(res.get('a'))
