YUIDoc的使用
============

下载及安装
----------

打开node命令行模式，输入 `npm -g install yuidocjs` 则可以自动下载并安装了，命令行echo如下：

```
Your environment has been set up for using Node.js 0.10.12 (ia32) and npm.

C:\Users\Administrator>npm -g install yuidocjs
npm http GET https://registry.npmjs.org/yuidocjs
npm http 200 https://registry.npmjs.org/yuidocjs
npm http GET https://registry.npmjs.org/yuidocjs/-/yuidocjs-0.3.44.tgz
npm http 200 https://registry.npmjs.org/yuidocjs/-/yuidocjs-0.3.44.tgz
npm http GET https://registry.npmjs.org/yui/3.9.1
npm http GET https://registry.npmjs.org/rimraf
npm http GET https://registry.npmjs.org/node-markdown
npm http GET https://registry.npmjs.org/minimatch
npm http GET https://registry.npmjs.org/graceful-fs
npm http GET https://registry.npmjs.org/express
npm http 200 https://registry.npmjs.org/yui/3.9.1
npm http 200 https://registry.npmjs.org/node-markdown
npm http GET https://registry.npmjs.org/yui/-/yui-3.9.1.tgz
npm WARN deprecated node-markdown@0.1.1: highlight is deprecated in favor of "hi
ghliht.js"
npm http GET https://registry.npmjs.org/node-markdown/-/node-markdown-0.1.1.tgz
npm http 200 https://registry.npmjs.org/graceful-fs
npm http GET https://registry.npmjs.org/graceful-fs/-/graceful-fs-1.2.2.tgz
npm http 200 https://registry.npmjs.org/rimraf
npm http GET https://registry.npmjs.org/rimraf/-/rimraf-2.0.3.tgz
npm http 200 https://registry.npmjs.org/minimatch
npm http GET https://registry.npmjs.org/minimatch/-/minimatch-0.2.12.tgz
npm http 200 https://registry.npmjs.org/yui/-/yui-3.9.1.tgz
npm http 200 https://registry.npmjs.org/node-markdown/-/node-markdown-0.1.1.tgz
npm http 200 https://registry.npmjs.org/graceful-fs/-/graceful-fs-1.2.2.tgz
npm http 200 https://registry.npmjs.org/rimraf/-/rimraf-2.0.3.tgz
npm http 200 https://registry.npmjs.org/express
npm http GET https://registry.npmjs.org/express/-/express-3.1.2.tgz
npm http 200 https://registry.npmjs.org/minimatch/-/minimatch-0.2.12.tgz
npm http 200 https://registry.npmjs.org/express/-/express-3.1.2.tgz
npm http GET https://registry.npmjs.org/graceful-fs
npm http GET https://registry.npmjs.org/sigmund
npm http GET https://registry.npmjs.org/lru-cache
npm http GET https://registry.npmjs.org/connect/2.7.5
npm http GET https://registry.npmjs.org/commander/0.6.1
npm http GET https://registry.npmjs.org/mkdirp
npm http GET https://registry.npmjs.org/cookie/0.0.5
npm http GET https://registry.npmjs.org/range-parser/0.0.4
npm http GET https://registry.npmjs.org/buffer-crc32
npm http GET https://registry.npmjs.org/methods/0.0.1
npm http GET https://registry.npmjs.org/send/0.1.0
npm http GET https://registry.npmjs.org/fresh/0.1.0
npm http GET https://registry.npmjs.org/cookie-signature/1.0.0
npm http GET https://registry.npmjs.org/debug
npm http 200 https://registry.npmjs.org/sigmund
npm http GET https://registry.npmjs.org/sigmund/-/sigmund-1.0.0.tgz
npm http 200 https://registry.npmjs.org/lru-cache
npm http 304 https://registry.npmjs.org/graceful-fs
npm http GET https://registry.npmjs.org/lru-cache/-/lru-cache-2.3.0.tgz
npm http GET https://registry.npmjs.org/graceful-fs/-/graceful-fs-1.1.14.tgz
npm http 200 https://registry.npmjs.org/commander/0.6.1
npm http GET https://registry.npmjs.org/commander/-/commander-0.6.1.tgz
npm http 200 https://registry.npmjs.org/mkdirp
npm http 200 https://registry.npmjs.org/connect/2.7.5
npm http GET https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.5.tgz
npm http GET https://registry.npmjs.org/connect/-/connect-2.7.5.tgz
npm http 200 https://registry.npmjs.org/range-parser/0.0.4
npm http GET https://registry.npmjs.org/range-parser/-/range-parser-0.0.4.tgz
npm http 200 https://registry.npmjs.org/cookie/0.0.5
npm http GET https://registry.npmjs.org/cookie/-/cookie-0.0.5.tgz
npm http 200 https://registry.npmjs.org/methods/0.0.1
npm http GET https://registry.npmjs.org/methods/-/methods-0.0.1.tgz
npm http 200 https://registry.npmjs.org/fresh/0.1.0
npm http GET https://registry.npmjs.org/fresh/-/fresh-0.1.0.tgz
npm http 200 https://registry.npmjs.org/buffer-crc32
npm http GET https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.1.tgz
npm http 200 https://registry.npmjs.org/send/0.1.0
npm http GET https://registry.npmjs.org/send/-/send-0.1.0.tgz
npm http 200 https://registry.npmjs.org/cookie-signature/1.0.0
npm http 200 https://registry.npmjs.org/debug
npm http GET https://registry.npmjs.org/debug/-/debug-0.7.2.tgz
npm http GET https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.
0.tgz
npm http 200 https://registry.npmjs.org/sigmund/-/sigmund-1.0.0.tgz
npm http 200 https://registry.npmjs.org/lru-cache/-/lru-cache-2.3.0.tgz
npm http 200 https://registry.npmjs.org/graceful-fs/-/graceful-fs-1.1.14.tgz
npm http 200 https://registry.npmjs.org/commander/-/commander-0.6.1.tgz
npm http 200 https://registry.npmjs.org/connect/-/connect-2.7.5.tgz
npm http 200 https://registry.npmjs.org/range-parser/-/range-parser-0.0.4.tgz
npm http 200 https://registry.npmjs.org/cookie/-/cookie-0.0.5.tgz
npm http 200 https://registry.npmjs.org/methods/-/methods-0.0.1.tgz
npm WARN package.json range-parser@0.0.4 No repository field.
npm http 200 https://registry.npmjs.org/mkdirp/-/mkdirp-0.3.5.tgz
npm http 200 https://registry.npmjs.org/fresh/-/fresh-0.1.0.tgz
npm http 200 https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.2.1.tgz
npm WARN package.json methods@0.0.1 No repository field.
npm WARN package.json methods@0.0.1 No readme data.
npm WARN package.json fresh@0.1.0 No repository field.
npm http 200 https://registry.npmjs.org/send/-/send-0.1.0.tgz
npm http 200 https://registry.npmjs.org/debug/-/debug-0.7.2.tgz
npm http 200 https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.
0.tgz
npm WARN package.json cookie-signature@1.0.0 No repository field.
npm WARN package.json send@0.1.0 No repository field.
npm http GET https://registry.npmjs.org/mime/1.2.6
npm http GET https://registry.npmjs.org/qs/0.5.1
npm http GET https://registry.npmjs.org/formidable/1.0.11
npm http GET https://registry.npmjs.org/buffer-crc32/0.1.1
npm http GET https://registry.npmjs.org/bytes/0.2.0
npm http GET https://registry.npmjs.org/pause/0.0.1
npm http 200 https://registry.npmjs.org/mime/1.2.6
npm http GET https://registry.npmjs.org/mime/-/mime-1.2.6.tgz
npm http 200 https://registry.npmjs.org/pause/0.0.1
npm http GET https://registry.npmjs.org/pause/-/pause-0.0.1.tgz
npm http 200 https://registry.npmjs.org/bytes/0.2.0
npm http 200 https://registry.npmjs.org/buffer-crc32/0.1.1
npm http GET https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.1.1.tgz
npm http GET https://registry.npmjs.org/bytes/-/bytes-0.2.0.tgz
npm http 200 https://registry.npmjs.org/qs/0.5.1
npm http GET https://registry.npmjs.org/qs/-/qs-0.5.1.tgz
npm http 200 https://registry.npmjs.org/formidable/1.0.11
npm http GET https://registry.npmjs.org/formidable/-/formidable-1.0.11.tgz
npm http 200 https://registry.npmjs.org/mime/-/mime-1.2.6.tgz
npm http 200 https://registry.npmjs.org/pause/-/pause-0.0.1.tgz
npm http 200 https://registry.npmjs.org/formidable/-/formidable-1.0.11.tgz
npm WARN package.json pause@0.0.1 No repository field.
npm http 200 https://registry.npmjs.org/buffer-crc32/-/buffer-crc32-0.1.1.tgz
npm WARN package.json formidable@1.0.11 No repository field.
npm http 200 https://registry.npmjs.org/bytes/-/bytes-0.2.0.tgz
npm http 200 https://registry.npmjs.org/qs/-/qs-0.5.1.tgz
npm WARN package.json bytes@0.2.0 No repository field.
npm http GET https://registry.npmjs.org/request
npm http 200 https://registry.npmjs.org/request
npm http GET https://registry.npmjs.org/request/-/request-2.12.0.tgz
npm http 200 https://registry.npmjs.org/request/-/request-2.12.0.tgz
C:\Users\Administrator\AppData\Roaming\npm\yuidoc -> C:\Users\Administrator\AppD
ata\Roaming\npm\node_modules\yuidocjs\lib\cli.js
yuidocjs@0.3.44 C:\Users\Administrator\AppData\Roaming\npm\node_modules\yuidocjs

├── graceful-fs@1.2.2
├── node-markdown@0.1.1
├── rimraf@2.0.3 (graceful-fs@1.1.14)
├── minimatch@0.2.12 (sigmund@1.0.0, lru-cache@2.3.0)
├── express@3.1.2 (methods@0.0.1, fresh@0.1.0, range-parser@0.0.4, cookie-sig
nature@1.0.0, buffer-crc32@0.2.1, cookie@0.0.5, debug@0.7.2, commander@0.6.1, mk
dirp@0.3.5, send@0.1.0, connect@2.7.5)
└── yui@3.9.1 (request@2.12.0)

C:\Users\Administrator>^A
```

关于YUIDoc的规则
----------------
一开始，我对一个 按照java风格注释的js 文件 生成文档，然后发现生成之后的html文件并没有任何关于 js方法的描述。后来看了 [这篇](http://www.iunbug.com/archives/2012/06/07/296.html) 文章，并动手实验之后，才知道没有 `@class` 就生成不了 `@method` 的导航链接（不知道 `@method` 的方法有文档没有，反正没有链接就找不到了）。

这里摘录 [一段博文](http://liuxiaoming.com/dev/2012/06/29/how-to-build-js-doc-by-yuidoc/) ，说明一下 `@method` 、 `@class` 、 `@method` 这几个主标签的重要性：
> 如果一个文件中不注明它属于哪个模块，那么该文件会被忽略 不写@class的整个类都会被忽略 不写@method的那么这个方法在文档中是找不到的 yuidoc并不会去找你代码中的方法名 它只关心文档中的这几个关键的注释，至于注释的位置与代码是否真实存在都是没有关系的 完全可以是一个空文件，里面没有代码，定义一堆注释，yuidoc照样解析不误，所以注释的位置是没有关系的


使用
----
在node环境中输入 `yuidoc .` 即可对当前文件夹生成文档