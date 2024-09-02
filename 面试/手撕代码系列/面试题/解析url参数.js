function parseUrl(url) {
  let urlMap = {}

  const pathString = url.split('?')[1];

  pathString.split('&').forEach((item) => {
    const temp = item.split('=')
    urlMap[temp[0]] = temp[1]
  })

  return urlMap
}

const url = 'https://www.baidu.com?a=1&b=2'
console.log(parseUrl(url))