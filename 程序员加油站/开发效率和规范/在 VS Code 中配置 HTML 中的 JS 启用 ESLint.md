# 在 VS Code 中配置 HTML 中的 JS 启用 ESLint

一般情况下ESLint只能检测JavaScript文件中的代码，如果我们想检测Html中的JavaScript怎么办？我们可以使用eslint-plugin-html插件，步骤如下：

1）项目中安装html插件：

```bash
cnpm i eslint-plugin-html -D
```

2）在设置中添加对.html后缀文件支持，在“file->preferences->settings”进行配置：

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200524104023.png)

```js
{
    "eslint.validate": [
        "javascript",
        "html"
    ]
}
```

3）.eslintrc.js中添加eslint-plugin-html插件名称：

```js
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "html", //eslint-plugin-html插件
    ],
    "rules": {
        "no-alert": 1,//禁止使用alert confirm prompt
        "no-console": 2,//禁止使用console
    }
};
```

如上设置，可以在html和vue等文件中的 `<script></script>` 标签中启用eslint了。

如果你需要对其他后缀结尾的文件启用ESLint，只要在eslint.validate设置中添加后缀即可，是不是很方便？赶快行动吧！
