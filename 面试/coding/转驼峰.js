const obj = {
  'a_b_c': 1,
  'd_e': 2,
  'f_g_h': {
    'i_g_k': 3
  }
}

function forMatToCamel(key) {
  const arr = key.split('_');
  for (let i = 1; i < arr.length; i++) {
    const firstStr = arr[i][0];
    arr[i] = arr[i].replace(firstStr, firstStr.toUpperCase());
  }
  return arr.join('');
}

function toCamel(obj) {
  if (obj === null || typeof obj !== 'object') return obj; 

  const res = obj instanceof Object ? {} : [];
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      res[forMatToCamel(key)] = toCamel(obj[key]);
    }
  }

  return res;
}

console.log(toCamel(obj));