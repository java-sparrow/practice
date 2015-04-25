（今天，《css那些事》有人问到ie兼容性模式是哪个ie版本的表现……遂，有了这篇讲解文章）  

关于ie开发人员工具的 *浏览器模式* 和 *文档模式*
===============================================

定义
----
**浏览器模式** 是指：ie在渲染页面（包括执行js代码时）时使用的内核版本  
**文档模式** 是指：ie在解析css时（js的执行和条件注释的识别，依然由 **浏览器模式** 决定），所依据的内核版本显示方案

* * * * *

在模式之间切换时，有几种情况：  
-----------------------------
1. 切换 **浏览器模式** 时， **文档模式** 会相应改变；  
2. 切换 **文档模式** 时， **浏览器模式** 不会相应改变；  
3. 如果先切换了 **文档模式** ，然后再切换 **浏览器模式** ，则 **文档模式** 不会相应改变，这是第1项的特殊情况



**以上是默认情况下的，即 *不人工干预页面显示行为时* 的结论。**  
可以配合此 [demo](/blog/demo/testBrowserVision.html "浏览器版本测试") 测试

* * * * *

下面，对 页面干预过的 *文档模式* 进行说明
-----------------------------------------
ie浏览器下，可以在页面头部里添加`<meta http-equiv="X-UA-Compatible" content="IE=EmulateIEx" />`强制指定浏览器的 *文档模式* ，这个在开发人员工具里，对应为 *默认的浏览器模式+指定的文档模式* 。但是， **条件注释** 和 **js引擎** 仍会以 *指定的文档模式* 为准。


###在这种情况下，模式之间的切换，只有第一种情况是不同的：

1. 切换 **浏览器模式** 时， **文档模式** 不会相应改变，因为已由页面指定了（其实上面的第三种情况，也可以理解为是这种：在页面指定 **文档模式** 后，切换 **浏览器模式** ）


###最后，再重复一下 *浏览器模式* 和 *文档模式* 的影响范围：  

1. 在没有指定 **文档模式** 时，切换 **浏览器模式** 可以改变 *条件注释* 、 *js引擎* 和 *样式hack* （因 *文档模式* 顺带被改变）；  
2. 在指定 **文档模式** 时，切换 **浏览器模式** 可以改变 *条件注释* 、 *js引擎* 和 *样式hack* ，但无法改变 *样式hack* （因 *文档模式* 没有改变）；  
3. 切换 **文档模式** 时，仅改变 *样式hack* ，也就是说仅改变视觉渲染


* * * * *

##补充： *文档模式* 中的`Quirks模式`，视觉渲染相当于ie5.5，在没有加DTD时会自动触发。

