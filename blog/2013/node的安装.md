Hello node!
===========

下载
----
从 [这个页面](http://nodejs.org/download/) 可以看到各种操作系统的下载列表。  

32位windows，可以点这里的链接直接下载 [node.exe](http://nodejs.org/dist/v0.10.12/node.exe) 或 [node-v0.10.12-x86.msi](http://nodejs.org/dist/v0.10.12/node-v0.10.12-x86.msi)

- - - - - - - - - -

介绍
----
**msi安装包** 和 **exe可执行程序** 有什么区别呢？其实这好比 JDK 与 JRE 的关系。  
简单点说， **exe可执行程序** 是一个包含 *node环境* 的命令行程序，可以执行js代码（带I-O库）。而 **msi安装包** 安装之后，不仅安装目录里包含了 **exe可执行程序** ，而且还携带了 *npm包管理器* ，方便用户安装其它node模块。

推荐使用安装模式来安装 `nodeJS` ，这样不仅省去了下载 *npm包管理器* 的步骤，还可以利用安装目录中的 `nodevars.bat` 启动配置好的 nodeJS命令行模式，方便调用 *npm包管理器* 下载node模块（想必你也和我一样，是为了使用工具而安装node环境的吧~）。

- - - - - - - - - -

使用
----
利用类似 `npm -g install yuidocjs` 的命令，可以从官方仓库下载node模块（工具）。

