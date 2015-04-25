ie滤镜说明
==========

rgba(2013.7.4)
--------------

用opacity，会使子元素也继承此透明度。  
如果想要父元素背景透明，而子元素不受影响，可以使用rgba。  

标准浏览器：`color: rgba(255, 00, 00, %50);` 50%红色透明  
ie6、7、8： `filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#80FF0000, endColorstr=#80FF0000);` 50%红色透明  
ie语法 `startColorstr=#AARRGGBB, endColorstr=#AARRGGBB` ，其中前两位AA表示透明度，后六位表示颜色值，取值范围从00-FF，与rgba表示法相似。　　

注意：  
1 使用时需将背景去除，否则透明度会被背景覆盖，看不出效果。
2 ie9在支持rgba，所以若在ie9上同时使用rgba和该滤镜，则两者效果会叠加。
3 该滤镜不仅使元素透明，而且会使元素失去“阻挡性”，即可通过该元素 **选中被其覆盖的文本** （部分ie下）
4 ie678不认识background的rgba值，不会解析出来，所以不用刻意设置 `background: transparent\9;` 去覆盖（如果设置了ie678认识的background值，则覆盖滤镜效果，所以才需要这样设置透明背景以使滤镜生效）
5 解决上述 **第二点** 提到的 **效果叠加** 问题，解决方法是，使用ie678不认识的 `:root ` 范围限定选择器，设置样式 `filter: none;` （如果其它高级浏览器有滤镜效果又不想屏蔽的话，请使用 `filter: none\9;` ）

关于gradient滤镜的更多参数介绍，请查阅： http://blog.csdn.net/mshopping/article/details/3292167

- - - - - - - - - -

opacity(2013.7.8)
-----------------
标准浏览器直接使用 `opacity: 0~1;` ，ie678使用滤镜 `filter: alpha(opacity=0~100);` 。  
需要注意的是，ie9同时支持 `opacity` 属性与 `filter: alpha` 滤镜，但是两者同时使用不会产生叠加效果，所以无需额外再hack。


