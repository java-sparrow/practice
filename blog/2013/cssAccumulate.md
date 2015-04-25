css厚积薄发
===========

ie6不支持border透明，现有几种方法可以解决：
--------------------------------------------

1. 设置需要透明的那个 `border-style` 为 **`dotted`** ，在 `width` （内容区）**小于一倍** `border-width` 时，该 `border` 不渲染圆点，既呈现透明状；
2. 设置需要透明的那个 `border-style` 为 **`dashed`** ，在 `width` （内容区）**小于三倍** `border-width` 时，该 `border` 不渲染虚线，既呈现透明状；
3. 使用 chroma滤镜 进行颜色过滤透明，语法： **`filter:chroma`** (color=颜色值)。使用这个滤镜进行透明，会使子元素的该颜色值也被透明。据目前实验所知，chroma滤镜 支持的颜色格式为**16进制**（#00ff00）和英文单词**颜色名**（pink等），不支持rgb和hsl方式的颜色表示法。

2013.6.4补充：在Chromium内核浏览器里，即使 `width` （内容区）小于三倍 `border-width` ， `dashed` 边框**仍会被渲染**。使用时需注意！

- - -



不增加标签清除浮动的几种方法
----------------------------
总结自：**[解读浮动闭合最佳方案：clearfix](http://www.daqianduan.com/clearfix/)**  

1. 父元素加上 **.clearfix** 类，这个类利用伪元素（伪对象），向标签后面添加内容，设置清除左右浮动达到效果，样式：`.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}` ，需要配合hack `*+height:1%` ；  
2. 父元素设置样式： **`overflow:auto;`** 需要配合hack `_height:1%` ；
3. 父元素设置样式： **`overflow:hidden;`** 需要配合hack `_zoom:1` 。

以上并未充分测试，不确定hack是否必须。  

使用 `overflow` 方法时，注意容器宽度和高度，当内容超出时， `auto` 时会出现滚动条，而 `hidden` 直接就什么都看不到了。

- - -



补充overflow
------------
与 `overflow: hidden;` 相反的不是 `overflow: auto;` ，而是 `overflow: visible;` 。  

这个 `overflow: visible;` 属性，可以用来恢复被隐藏的绝对定位内容（浮动层或自定义下拉菜单时可能会遇到，唯一比采用 `display` 好一点的地方是，不用却分 `display` 显示时对应的是 `block` 还是其它，虽然其它情况极少见）。  

- - -



margin负值的几种应用
--------------------
总结自：**[margin负值5种应用](http://fed.renren.com/archives/517)**  

1. 布局，如WordPress的两栏式不固定布局；
2. 左右边框重叠 或 列表项上下分割线重叠；
3. 列表项与日期水平左右对齐（可扩展至任何需要左右布局的地方，左中右也可以，再多就需要计算 `padding` 值，因为能利用的文本对齐方式只有 `left` 、 `right` 、 `center` ）

- - -



### 首先解释一下将要用到的术语：*【定位元素】*  
这里的**【定位元素】**是指， `position` 为 `absolute` 、 `relative` 、 `fixed` （即非默认的 `static` ）的节点，如果一个元素没有找到符合的**父级【定位元素】**，则其以 `body` 为定位依据。  

好，下面开始：


关于z-index
-----------
总结自：**[关于z-index的那些事儿](http://www.qianduan.net/that-thing-on-the-z-index.html)**  

`z-index` 的层次优先级，并不是单纯靠其值大小来决定的，还与其 为【定位元素】的父级节点有关，即 `z-index` 有一个**堆栈环境**，属于同一个**堆栈环境**的，才能直接比较 `z-index` 的值。如果不在同一个**堆栈环境**内，则比较它们的父级【定位元素】的 `z-index` ，以此类推。注意，除了【定位元素】会创建堆栈环境外， `opacity` 也会创建一个堆栈环境。另外，ie的 `z-index` 默认值是0，其它主流浏览器的 `z-index` 默认值是 `auto` ，这也会影响堆栈环境的创建，所以需要显式声明 `z-index` 的值，避免浏览器差异。  

下面是一张解释堆栈环境的图，来自[这里](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context?redirectlocale=en-US&redirectslug=CSS%2FUnderstanding_z-index%2FThe_stacking_context)  
![火狐开发者社区的图](http://t1.qpic.cn/mblogpic/3ca23b490a1f1cc2bb9a/2000.jpg)![html结构](http://t1.qpic.cn/mblogpic/3cd64ea38cf443fef0a6/2000.jpg)  

- - -



关于overflow:hidden
-------------------
这是另一个与**【定位元素】**有关的。在没有设置 `overflow` 为 `hidden` 时，子元素宽度或高度超过父元素后，会溢出至父元素外显示，但不会改变父元素的布局（在设置了 `width` 和 `hieght` 的情况下。如果没有设置，则会自动撑开父元素，这里没有充分测试，仅凭经验，但出入不大）。当父元素设置了 `overflow` 为 `hidden` 之后，一般可以隐藏掉超出范围的子元素，但在ie里有时却无法隐藏子级**【定位元素】**，因为该父元素不是**【定位元素】**。所以，使该父元素 `position` 为 `relative` 就可以解决这个问题。

- - -



关于position:fixed
------------------
*注意：这个属性ie6是不支持的，而ie7，在省略 `left` 和 `right` 时，会有比较奇特的表现，应用时需要注意。*  

在现代浏览器里， `fixed` 可以省略 `left` 和 `right` （这时它的水平位置就是当它为 `static` 时在文档流中的水平位置），也可以同时拥有 `left` 和 `right` （如果它没有指定的 `width` 值或百分比，它将自动延伸至指定的 `left` 和 `right` ；而如果设置了 `width` 值或百分比，则会忽略 `right` ）。但是，当 `fixed` 而又没有指定 `top` 或 `bottom` 时，它默认的 `top` 就是 它为 `static` 时距离文档顶部的距离（可能会很大，所以总是看不见，因为浏览器可视高度一般在 `600px` 左右）  

- - -



补充margin
----------
`margin` 单位可以是百分比，但是不管水平还是垂直方向，百分比依照的都是父元素的 `width` 。

- - -



less的介绍
----------
> LESS 将 CSS 赋予了动态语言的特性，如 变量， 继承， 运算， 函数
——[LESS中国官网](http://www.lesscss.net)  

* 关于变量：方便维护，一改全改，而且可以通过变量名见名知意。除此之外，它还有更强大的功能，通过变量引用变量，类似js中动态读取属性 `obj[variable]` ；  
* 关于混合：可以在样式定义里书写一个类名，这样就能继承那个类的样式了，还可以像函数那样传参数。。。；  
* 关于嵌套：可以书写 像 `DOM` 节点那样 具有层次结构的 `css` ；  
* 关于运算：四则运算中，less还能够分辨出颜色和单位；  
* 其它：还有函数、字符串拼接、注释（块和行注释）、执行js表达式等。。。  

- - -



2013.6.4更新
------------
补充 `overflow` ：设置 `overflow-x` 或 `overflow-y` 溢时出 `hidden` ，则另一边在溢出时会自动出现滚动条，不受 `overflow-方向: visible;` 控制。所以，如果要一边隐藏，一边溢出显示，需要使用两个层。外层设置高宽并设置一边控制溢出，内层什么都不管就行了。

- - -



2013.6.17更新
-------------
对于表单元素的垂直居中，人人网FED已给出[方案](http://fed.renren.com/archives/46 "基于vertical-align的表单元素垂直对齐方式研究")。  
这里再简单总结一下：
1. 为 `input` 周围的字体设置 `font-family: Verdana Tahoma;`；
2. 为input设置 `vertical-align:middle;`




