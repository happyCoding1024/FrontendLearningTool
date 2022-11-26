function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.onreadystatechange = (res) => {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) {
          resolve(res.data);
        } else if (xhr.status === 404) {
          reject(new Error('404 not found'));
        }
      }
    }
    xhr.send(null);
  })
}

ajax('').then()