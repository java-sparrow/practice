常见css布局需求
===============

水平居中
--------

###固定宽度的水平居中

####块级元素
在有DTD文档头的情况下（大部分如此），如下设置：
```
selector{
	width: 200px;			/* 需要指定宽度，单位可以是px、em、%等 */
	margin-left: auto;		/* 让浏览器自动计算 左外边距 */
	margin-right: auto;		/* 让浏览器自动计算 右外边距 */
}
```
就可以使块级元素自动居中了。

####内联元素
父容器设置 `text-align:center;` 。但这个属性会继承，所以如果子元素不希望文本居中，就另行设置 `text-align:left;` 覆盖。

####浮动元素
用 `block` 或 `inline-block` 的 `div标签` 包裹，然后就变成上面的情况了。

####绝对定位元素
```
/* 绝对定位的元素要水平居中（相对于其包含块） */
box{
	position: absolute;
	width: 200px;			/* 假设宽度是200px */
	
	left: 50%;				/* 首先设置 距离包含块左端50% */
	margin-left: -100px;	/* 然后设置，自身外边距 为 负一半宽度值 */
}
```
包含块 "containing block" 的定义：
> If the element has ‘position:absolute’, the containing block is established by the nearest ancestor with a ‘position’ of ‘absolute’, ‘relative’, or ‘fixed’. …  
翻译：如果一个元素有"position:absolute"的定义，则其包含块由最近的拥有"position:absolute|relative|fixed"属性的祖先元素确定。…

引用自 [这里](http://www.iyunlu.com/view/css-xhtml/56.html) ，顺便补充，如果没有符合要求的 **祖先元素** ，那么这个 **包含块** 就默认为 `body` 元素。


###不固定宽度的水平居中
####内联元素
方法同上面的 **《固定宽度的水平居中 之 内联元素》** 法

####块级元素
首先准备代码，html结构如下：
```
<div class="outBox">
	<div class="contentBox">
		需要居中的内容放这里
	</div>
</div>
```
css代码如下：
```
.outBox{
	display: inline-block;	/* 或者float: left|right; */
	
	/* 下面两句，可以改为一句 margin-left: 50%; ，一样的效果，但是要注意ie6下float时的双倍边距 */
	position: relative;
	left: 50%;
}
.outBox{
	*display: inline;		/* 使用display: inline-block;时，需增加这条规则：对ie6、7的hack */
}
.contentBox{
	position: relative;
	left: -50%;
}
```
说明一下原理，外层的outBox距离左边 `50%`，这样outBox里的内容就从 `50%` 处开始向右排列。  
然后，内层contentBox再根据自身宽度，左偏 `-50%` 。[说明案例在这里](# "如果我时间的话，这个链接就有效") 。视觉上就达到了居中。  
但是，这样实现起来，在ie7下，无法很好地选中居中层的文本，在ie6下，甚至 `Ctrl+A` 全选时，都选不中左边一半的文本。详情请看 [说明案例](# "如果我时间的话，这个链接就有效")  
课外书： [inline-block 前世今生](http://iyunlu.com/view/css-xhtml/64.html)

####绝对定位元素
```
.absoluteElement{
	position: absolute;
	left: 50%;
}
.absoluteElementContent{
	position: relative;
	left: -50%;
}
```
`absoluteElement` 是已经绝对定位的元素，要让未知宽度的它，水平居中，有点困难。所以，借助了另一个 `absoluteElementContent` 元素。  
也就是，将原来 `absoluteElement` 中的内容，移动到 `absoluteElementContent` 中，然后再把 `absoluteElementContent` 添加回到 `absoluteElement` 里。  

但是这样做有弊端，就是 万一 `absoluteElement` 有边框或设置了背景图，那么视觉效果就全废了。  
所以，比较好的方法，还是多嵌套几层div。定位信息设置在最外层的div里；边框、背景等，移到内层负责展示的div里。


- - - - - - - - - -


垂直居中
--------
垂直居中比较复杂，因为不像宽度那样，可以充满未知区域。  
所以垂直居中分为： **父容器已知高度** 和 **父容器未知高度** 的。  
然后，还要各自分为 **需要居中的子容器已知高度** 和 **需要居中的子容器未知高度** 。  

最简单情况的垂直居中：  
单行文本垂直居中，设置 `line-height` 的值与 `height` 的值一致。  

其它情况，需要设置多层div，用float占位、或者position定位。  
实在很复杂，不如其它情况用 **td** 吧！

要是你喜欢折腾，或许 下面的链接可以帮到你：  

* [CSS未知高度垂直居中](http://www.cnblogs.com/rubylouvre/archive/2010/07/08/1774025.html "司徒正美")
* [CSS解决未知高度垂直居中](http://www.planabc.net/2006/11/20/css_vertical_center_solution/ "怿飞（圆心）")
* [图片垂直居中的使用技巧](http://www.planabc.net/2008/05/26/img_vertical_center_solution/ "怿飞（圆心）")
* [CSS图片垂直居中方法整理集合](http://bbs.blueidea.com/thread-2666987-1-1.html "蓝色理想 snwebsite")