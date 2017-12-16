webpackJsonp([41,90],{1022:function(n,e){n.exports={content:'<h1 id="前言"><a href="#%E5%89%8D%E8%A8%80" aria-hidden="true"><span class="icon icon-link"></span></a>前言</h1>\n<p>之前说了我做的在线实时画板与你画我猜游戏，但是把程序放到服务器node运行后，却发现内网正常访问，外网却不能访问。\n于是搜索查找，得到解决方法，做此记录。</p>\n<!--more-->\n<h1 id="解决"><a href="#%E8%A7%A3%E5%86%B3" aria-hidden="true"><span class="icon icon-link"></span></a>解决</h1>\n<h2 id="下载nginx"><a href="#%E4%B8%8B%E8%BD%BDnginx" aria-hidden="true"><span class="icon icon-link"></span></a>下载nginx</h2>\n<p>nginx大致相当于一个转发器，通过url进行转发到正确处理的端口。</p>\n<h2 id="配置nginx"><a href="#%E9%85%8D%E7%BD%AEnginx" aria-hidden="true"><span class="icon icon-link"></span></a>配置nginx</h2>\n<p><code>conf/nginx.conf</code> 添加如下</p>\n<pre><code data-query="{}" data-lang=""> include myconf/*.conf;  # 将myconf文件夹中*.conf 内容包含\n</code></pre>\n<p>在<code>conf/myconf</code> 中添加如下文件\n<code>conf4000.conf</code></p>\n<pre><code data-query="{}" data-lang="">upstream web4000 {\n    server localhost:4000;\n}\n \nserver {\n    listen   80; #监听的端口\n\n    server_name  paintgame.moyuyc.xyz; #匹配的域名或者ip\n \n    location / {\n        proxy_pass http://web4000; #转发到哪里？\n\n        proxy_http_version 1.1;\n        proxy_set_header Upgrade $http_upgrade; # 支持websocket\n        proxy_set_header Connection "upgrade"; # 支持websocket\n    }\n\n}\n</code></pre>\n<p>最后运行nginx即可，当然同时也需要运行node服务器\n关于<code>websocket</code>与<code>upgrade</code> <a href="https://www.zhihu.com/question/20215561">参看这里</a></p>\n<h1 id="其他问题"><a href="#%E5%85%B6%E4%BB%96%E9%97%AE%E9%A2%98" aria-hidden="true"><span class="icon icon-link"></span></a>其他问题</h1>\n<ol>\n<li>用了<code>nginx</code>后，打开<code>[paint.moyuyc.xyz](http://paint.moyuyc.xyz/)</code> 特别慢，<code>[paintgame.moyuyc.xyz](http://paintgame.moyuyc.xyz/)</code> 却挺正常的，</li>\n<li>而且基于<code>websocket</code> 基于tcp长连接，经常会自己断开连接.</li>\n</ol>\n',extra:{}}}});