# encryption tool

加密/解密你的文本

你可以在 `js/encrypt` 文件夹自定义你的加密算法, 流程如下：

1. 创建文件，实现如下接口:
``` javascript
define('your module name', [/* your dependencies */], () => {
	const meta = {
    name: "算法名",
    from: "from",
    to: "to",
    emoji: "图标",
    describe: "描述",
    options: [
      /* WIP */
      /* 用户自定义配置 */
    ],
  };

  return {
    meta,
    transform,
    transformBack,
  };
})
```
2. 在 `js/encrpyt/index.js` 中添加对你模块的引用：
``` javascript
define("encrypt", ["encrypt.mao", "encrypt.doubleKnife", /* yourModuleName */], (
  mao,
  doubleKnife,
  yourModuleName
) => {
  return [mao, doubleKnife, yourModuleName];
});

```

3. 在 `index.html` 中引入你的脚本：
``` html
<script src="js/utils.js"></script>
<!-- to insert here -->
<script src="js/encrypt/mao.js"></script>
<script src="js/encrypt/index.js"></script>
```