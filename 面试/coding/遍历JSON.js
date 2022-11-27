function traverseJson (json) {

  const rec = (json, path) => {
    if (typeof json !== 'object' || typeof json === null) {
      console.log(path, json);
      return json;
    }
    
    for (const key of Object.keys(json)) {
      rec(json[key], path.concat(key))
    }
  }

  rec(json, []);
}

const json = {
  a: 1,
  b: {
    c: 2,
    d: [3, 4, { e: 5 }]
  }
}

traverseJson(json);