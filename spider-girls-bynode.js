webpackJsonp([16,90],{1047:function(s,n){s.exports={content:'<h1 id="流氓不可怕就怕流氓有文化"><a href="#%E6%B5%81%E6%B0%93%E4%B8%8D%E5%8F%AF%E6%80%95%E5%B0%B1%E6%80%95%E6%B5%81%E6%B0%93%E6%9C%89%E6%96%87%E5%8C%96" aria-hidden="true"><span class="icon icon-link"></span></a>“流氓不可怕,就怕流氓有文化”</h1>\n<blockquote>\n<p>前天刚考完编译，今天考完网络，就开始捣鼓代码了，花了一天时间摸索了一下<code>nodejs</code>的爬虫，也就是<code>tcp</code>，<code>http</code>连接。</p>\n</blockquote>\n<p>也是就做了一个爬取<a href="http://jandan.net/">煎蛋网妹子图</a>的爬虫，并保持至本地。</p>\n<!--more-->\n<h1 id="思路介绍"><a href="#%E6%80%9D%E8%B7%AF%E4%BB%8B%E7%BB%8D" aria-hidden="true"><span class="icon icon-link"></span></a>思路介绍</h1>\n<ol>\n<li>通过<code>http请求报文</code>模拟一次访问煎蛋网的操作</li>\n<li>获取到了网页的HTML代码后，进行正则表达式匹配，得到图片地址</li>\n<li>通过图片地址，再次发送<code>http请求报文</code>，将图片数据保存至本地\n思路简单了解后，便开始工作了。</li>\n</ol>\n<h1 id="然而并不是一帆风顺"><a href="#%E7%84%B6%E8%80%8C%E5%B9%B6%E4%B8%8D%E6%98%AF%E4%B8%80%E5%B8%86%E9%A3%8E%E9%A1%BA" aria-hidden="true"><span class="icon icon-link"></span></a>然而并不是一帆风顺</h1>\n<h2 id="得不到html？"><a href="#%E5%BE%97%E4%B8%8D%E5%88%B0html%EF%BC%9F" aria-hidden="true"><span class="icon icon-link"></span></a>得不到<code>HTML</code>？</h2>\n<p>参考资料<a href="http://chenxi.name/60.html">http://chenxi.name/60.html</a>，利用<code>request</code>包进行傻瓜式调用，然而并不能生效，将会跳转至一个<a href="http://jandan.net/block.php">屏蔽提示网页</a>\n<img src="http://obu9je6ng.bkt.clouddn.com/Fii2x4oUFPuo7VrVYxvqehkx2i88?imageslim" alt="ClipboardImage" width="488" height="350" />\n煎蛋网为了防止恶意爬取数据，进行了一定程度的防爬措施。\n但这可难不倒我，<strong>为什么在浏览器上就能正常浏览图片页面呢？</strong>\n于是我打开浏览器控制台，复制页面请求报文的cmd格式，粘贴至命令行中运行，能够正确得到<code>HTML</code>\n<img src="http://obu9je6ng.bkt.clouddn.com/FrHslUCGbtbb2kB0cUFU7kzH5wWE?imageslim" alt="ClipboardImage" width="1916" height="540" />\n<img src="http://obu9je6ng.bkt.clouddn.com/FiJx6_i37Ln_FqOYPdg_GGuz-ocG?imageslim" alt="ClipboardImage" width="1075" height="545" />\n所以，我觉得问题就是出现在请求报文头部数据，于是复制下浏览器中报头，利用<code>nodejs</code>的<code>http</code>包，建立http连接。</p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">\'http\'</span>).get({\n        <span class="hljs-attr">hostname</span>:<span class="hljs-string">\'jandan.net\'</span>,\n        <span class="hljs-attr">path</span>:<span class="hljs-string">\'/\'</span>,\n        <span class="hljs-attr">header</span>:{\n            ...\n        }\n    },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{\n        \n    })</code></pre>\n<p>但是奇怪的是！还是响应302，跳转至屏蔽提示页面。</p>\n<p>最后没办法的我只好利用底层一点的api——<code>net</code>包，建立tcp连接，发送符合<code>http请求报文</code>格式的数据。</p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-keyword">var</span> net = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'net\'</span>);\n<span class="hljs-keyword">var</span> header = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'fs\'</span>).readFileSync(<span class="hljs-string">\'./header.txt\'</span>).toString();\n\n<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">path,callback</span>) </span>{\n    <span class="hljs-keyword">const</span> socket = net.createConnection(<span class="hljs-number">80</span>,<span class="hljs-string">\'jandan.net\'</span>);\n\n    socket.write(\n        <span class="hljs-string">\'GET \'</span>+path+<span class="hljs-string">\' HTTP/1.1\\r\\n\'</span>+\n        header\n    );\n\n    socket.setEncoding(<span class="hljs-string">\'utf-8\'</span>);\n    socket.setTimeout(<span class="hljs-number">4000</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{\n        callback(html);\n        <span class="hljs-built_in">console</span>.error(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">\'Time OUT\'</span>));\n        socket.end();\n    });\n\n    <span class="hljs-keyword">var</span> html = <span class="hljs-string">\'\'</span>;\n    socket.on(<span class="hljs-string">\'data\'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">chunk</span>) </span>{\n        html+=chunk;\n    });\n\n    socket.on(<span class="hljs-string">\'end\'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{\n        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'disconnected from server\'</span>);\n    });\n}</code></pre>\n<p><code>header.txt</code></p>\n<pre><code data-query="{}" data-lang="">Host: jandan.net\nConnection: keep-alive\nCache-Control: max-age=0\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8\nUpgrade-Insecure-Requests: 1\nUser-Agent: Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36\nReferer: http://jandan.net/v\nAccept-Language: zh-CN,zh;q=0.8\nCookie: gif-click-load=on; bad-click-load=on; PHPSESSID=u1gnmqnpb75injakbgvkb6r413; 4036050675=c119Yp%2BLrMWuv%2BWMyYtq3x6vTdbFzaTbUyoiLt%2Fv; jdna=596e6fb28c1bb47f949e65e1ae03f7f5#1467288596467; Hm_lvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1467287791; Hm_lpvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1467288598; _ga=GA1.2.330681373.1467287790\n</code></pre>\n<p><strong>注意，header.txt最后需要两个<code>\\r\\n</code>表示请求报头结束</strong>\n最后果然是成功了，但具体两种方法的不同我也说不上来，希望有热心读者能告诉我。</p>\n<h2 id="数据传输同步异步？"><a href="#%E6%95%B0%E6%8D%AE%E4%BC%A0%E8%BE%93%E5%90%8C%E6%AD%A5%E5%BC%82%E6%AD%A5%EF%BC%9F" aria-hidden="true"><span class="icon icon-link"></span></a>数据传输同步异步？</h2>\n<p>利用下面的递归方法加上<code>Promise.all</code>同步方法，防止过度的tcp连接（改用下面方法后，tcp读写错误明显减少，但还是会出现，不知道有没有大神帮我解决该问题呢？）</p>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params">i,low</span>) </span>{\n    <span class="hljs-keyword">if</span>(i&#x3C;low) <span class="hljs-keyword">return</span>;\n    spider(<span class="hljs-string">\'/ooxx/page-\'</span>+i,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">html</span>) </span>{\n        <span class="hljs-keyword">var</span> images = [];\n        html.replace(<span class="hljs-regexp">/&#x3C;img.+?src="(http.+?sina.+?)"/g</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">m,c</span>) </span>{\n            images.unshift(c);\n        });\n        <span class="hljs-keyword">var</span> page = i;\n        <span class="hljs-keyword">var</span> proms = images.map(<span class="hljs-function">(<span class="hljs-params">x,i,a</span>)=></span>{\n            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve,reject</span>)=></span>{\n                <span class="hljs-keyword">var</span> req = http.get(x,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{\n                    res.on(<span class="hljs-string">\'error\'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{\n                        <span class="hljs-built_in">console</span>.error(err);\n                        resolve(<span class="hljs-string">\'fail\'</span>);\n                    });\n                    <span class="hljs-keyword">var</span> filename = x.substr(x.lastIndexOf(<span class="hljs-string">\'/\'</span>)+<span class="hljs-number">1</span>);\n                    download(dir+<span class="hljs-string">\'/\'</span>+filename,res);\n                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">\'PAGE:\'</span>+page+<span class="hljs-string">\'...\'</span>+filename+<span class="hljs-string">\'...\'</span>+(i+<span class="hljs-number">1</span>)+<span class="hljs-string">\'/\'</span>+a.length);\n                    resolve(<span class="hljs-string">\'done\'</span>);\n                }).end();\n            });\n        });\n        <span class="hljs-built_in">Promise</span>.all(proms)\n            .then(<span class="hljs-function">(<span class="hljs-params">values</span>)=></span>{\n                <span class="hljs-comment">//上一页的图片加入下载队列后，再开始递归下一页。</span>\n                run(i<span class="hljs-number">-1</span>,low);\n            });\n    });\n}</code></pre>\n<p>最后文件夹就像下面一样！\n<a href="http://obu9je6ng.bkt.clouddn.com/FuRBxi6UhWP-j2K6GxZG4fXUBmoD?imageslim">ClipboardImage</a></p>\n<h1 id="甩下代码地址，飙个车"><a href="#%E7%94%A9%E4%B8%8B%E4%BB%A3%E7%A0%81%E5%9C%B0%E5%9D%80%EF%BC%8C%E9%A3%99%E4%B8%AA%E8%BD%A6" aria-hidden="true"><span class="icon icon-link"></span></a>甩下代码地址，飙个车!</h1>\n<p><a href="https://github.com/moyuyc/jandan-spider">jandan-spider</a></p>\n<p>关注我的博客<a href="http://moyuyc.github.io/">moyuyc.github.io</a> ,有技术的老司机带你飙车！</p>\n<img src="http://obu9je6ng.bkt.clouddn.com/FkB3MBiTLxrELGuFZeXBHHw4_OQZ?imageslim" alt="ClipboardImage" width="180" height="180" />\n<img src="http://obu9je6ng.bkt.clouddn.com/FjiONZ1a7fl88HkQymtFq07BzGoC?imageslim" alt="ClipboardImage" width="169" height="169" />\n<img src="http://obu9je6ng.bkt.clouddn.com/Fj6lS1js5U2IfhYiWt-f4_wB73-R?imageslim" alt="ClipboardImage" width="600" height="600" />\n<img src="http://obu9je6ng.bkt.clouddn.com/FqqRmz55PM7e_H6thdl5dopo6gS4?imageslim" alt="ClipboardImage" width="582" height="676" />\n<img src="http://obu9je6ng.bkt.clouddn.com/Fvy1_Jk-S0ZDke1GGbrFHvvI0wlm?imageslim" alt="ClipboardImage" width="600" height="713" />\n<img src="http://obu9je6ng.bkt.clouddn.com/Fs1hyIcV8oGDuu4e208V0KC9EfYt?imageslim" alt="ClipboardImage" width="600" height="562" />\n',extra:{}}}});