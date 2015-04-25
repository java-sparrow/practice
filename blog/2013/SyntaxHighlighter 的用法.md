SyntaxHighlighter 的用法（译）
========================

下载
----
在 [官方下载页面](http://alexgorbatchev.com/SyntaxHighlighter/download/) ，点击 [Click here to download](http://alexgorbatchev.com/SyntaxHighlighter/download/download.php?sh_current) 下载。


- - - - - - - - - -


如何使用？
----------

翻译自 [官网原文](http://alexgorbatchev.com/SyntaxHighlighter/manual/installation.html)  

###基本步骤
要在你的页面上应用 `SyntaxHighlighter` ，你需要这样做：

1. 在你的页面上加载基本文件： `shCore.js` 和 `shCore.css`
2. 添加你想要的“笔刷”（例如，用 `shBrushJScript.js` 渲染 `JavaScript` ，查看 [可用的“笔刷”](http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/) 列表）
3. 引用 `shCore.css` 和 `shThemeDefault.css` 样式表
4. 使用 `<pre />` 或 `<script />` 方式（详情请看下面）创建代码片段
5. 调用 JavaScript 方法： `SyntaxHighlighter.all()`

###使用< pre />方式
**优点：** 不受环境限制，即使脚本出现问题也能优雅降级，并且能以整齐的 `<pre />` 格式 展现给所有的 RSS 读者。

**不足：** 这种方式的主要问题是 所有的尖括号 **必须使用HTML转义** ，例如 `<` 要用 `&lt;` 替换；这是为了正确的渲染。

`SyntaxHighlighter` 会寻找所有带有特殊 `格式化class` 属性的 `<pre />` 标签。该属性的格式化规则等同 `CSS` 的 `style` 行内式规则。唯一需要的参数是 `brush` （详见 [配置](http://alexgorbatchev.com/SyntaxHighlighter/manual/configuration/) ），且参数值只能设置为 [这些笔刷别名](http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/) 其中之一。

这里举个栗子：  
![pre-example-before.png](img/pre-example-before.png)  
将被渲染为：  
![pre-example-after.png](img/pre-example-after.png)



###使用< script />方式
这种方式的好处是，能够在 `CDATA` 里放置任何代码 **而无需进行任何转义** ，所以这允许你从喜好的文本编辑器中直接 “复制 粘贴”。

**优点：** 无需转义尖括号。

**不足：**

1. 没有平稳退化。大部分的 RSS 读者会去掉 `<script/>` 标签内容，所以，如果你在博客上使用 `SyntaxHighlighter` ，你最好使用 `<pre />` 方式。
2. 如果你包含了一个脚本结束标签，比如 `</script>` ，即使是在 CDATA 代码块中的，大部分浏览器也会提前关闭 `<script type="syntaxhighlighter">` 标签。


**2.1版新特性** `SyntaxHighlighter` 会寻找带有特殊 `格式化class` 属性的 `<script type="syntaxhighlighter" />` 。该属性的格式化规则等同 `CSS` 的 `style` 行内式规则。唯一需要的参数是 `brush` （详见 [配置](http://alexgorbatchev.com/SyntaxHighlighter/manual/configuration/) ），且参数值只能设置为 [这些笔刷别名](http://alexgorbatchev.com/SyntaxHighlighter/manual/brushes/) 其中之一。

这里举个栗子（ **请注意 需要 CDATA 标签** ）：  
![script-example-before.png](img/script-example-before.png)  
将被渲染为：  
![script-example-before.png](img/script-example-after.png)  