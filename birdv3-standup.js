webpackJsonp([79,90],{984:function(n,e){n.exports={content:'<h2 id="头痛"><a href="#%E5%A4%B4%E7%97%9B" aria-hidden="true"><span class="icon icon-link"></span></a>头痛</h2>\n<p>erp这边rd用的编译型语言Java，每次发版代码都需要重新编译一下，然后才能生效。\n但就是这个编译重新载入的时间，经常会影响我们FE开发！\n破坏我们创作代码的热情！</p>\n<p>于是为了解决该问题，基于birdV3的standup应运而生</p>\n<h2 id="原理"><a href="#%E5%8E%9F%E7%90%86" aria-hidden="true"><span class="icon icon-link"></span></a>原理</h2>\n<p>首先了解一下BirdV3的基本原理</p>\n<pre><code data-query="{}" data-lang="">Client(Browser)  -------->    Bird    --------->   Remote Server \n              1. client request     2. bird request\n              4. bird response      3. remote response\n                 &#x3C;--------            &#x3C;---------\n</code></pre>\n<p>nodejs实现转发的代码 <a href="https://github.com/imcuttle/simple-hot-reload-server/blob/master/src/helpers/forward-request.js">forward-request.js</a></p>\n<p>如上面的简单示意，通过Bird可以实现跨域的请求转发\n然后我们需要在 3 -> 4 之间，加上一个拦截器(interceptor)的东西</p>\n<p>通过拦截器，可以解决上面让我们头疼的问题，思路如下\n1. 如果这个请求（url）对应的响应是我们需要cache的，进入2，否则不进行拦截\n2. 如果对于remote response，我们认为它是服务器错误，则进入3，否则进入4\n3. 如果在cache中找到该请求（url）对应缓存的响应，则进行拦截！并且bird response响应缓存中的数据。否则不进行拦截\n4. 将remote response写入缓存中</p>\n<p>这样当服务器出错时候，默认认为是 <code>statusCode >= 400</code>，会把最新成功的数据给返回，这样本地就感受不到远端的崩溃了</p>\n<h2 id="使用"><a href="#%E4%BD%BF%E7%94%A8" aria-hidden="true"><span class="icon icon-link"></span></a>使用</h2>\n<p>配置bird远程服务器配置</p>\n<pre><code data-query="{}" data-lang="">module.exports = {\n    server: \'http://sit-offer-web.dev.weiyun.baidu.com\',\n    plugin: \'uuap2\',\n\n    useUser: \'tangrui\',\n\n    users: {\n        tangrui: \'tangrui7700\',\n    },\n\n    intercept: {\n        name: \'standup\',\n        option: {\n            matcher: function (url) {\n                return url !== \'/favicon.ico\';\n            },\n            checkIsBroken: function (res) {\n                return parseInt(res.statusCode, 10) >= 400;\n            },\n            // 是否在程序结束时保存缓存\n            saveLastCache: true\n        }\n    },\n\n    reloginSeq: 35\n}\n</code></pre>\n',extra:{}}}});