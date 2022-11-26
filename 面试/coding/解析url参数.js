/**
 * 方式一：解析url参数
 * 
 * @param {*} urlSearch 
 * @returns 
 */
function queryUrlSearch(urlSearch) {
  const urlSearchMap = {};
  const urlSearchArr = urlSearch.substr(1).split('&');
  urlSearchArr.forEach(element => {
    const searchArr = element.split('=');
    urlSearchMap[searchArr[0]] = searchArr[1];
  });

  return urlSearchMap;
}

const urlSearch = queryUrlSearch('?a=1&b=2&c=3');
console.log(urlSearch);

/**
 * 方法二：使用 URLSearchParams
 */
const urlParams = new URLSearchParams('?a=1&b=2&c=3');
console.log(urlParams);

