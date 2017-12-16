webpackJsonp([73,90],{990:function(n,s){n.exports={content:'<h2 id="为什么有这个需求"><a href="#%E4%B8%BA%E4%BB%80%E4%B9%88%E6%9C%89%E8%BF%99%E4%B8%AA%E9%9C%80%E6%B1%82" aria-hidden="true"><span class="icon icon-link"></span></a>为什么有这个需求</h2>\n<ol>\n<li>个人习惯于书写原生的Markdown（纯粹的文本编辑）。不需要记各种快捷键。</li>\n<li>书写原始 markdown 文件方便进行个人博客文章的部署和备份。</li>\n<li>方便将文章发布至其他平台（GitHub/SF...）</li>\n</ol>\n<h2 id="如何使用"><a href="#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8" aria-hidden="true"><span class="icon icon-link"></span></a>如何使用</h2>\n<p><a href="https://github.com/imcuttle/doc-import-md">repo地址(doc-import-md)</a></p>\n<ul>\n<li>cli</li>\n</ul>\n<pre><code class="hljs language-bash" data-query="{}" data-lang="bash">npm i -g doc-import-md\ndocin -h\ndocin <span class="hljs-built_in">set</span>-username &#x3C;your name>\ndocin <span class="hljs-built_in">set</span>-password\n\ncat file/to/markdown | docin</code></pre>\n<ul>\n<li>package  </li>\n</ul>\n<pre><code class="hljs language-js" data-query="{}" data-lang="js"><span class="hljs-keyword">var</span> DocImportMd = <span class="hljs-built_in">require</span>(<span class="hljs-string">\'doc-import-md\'</span>);\n<span class="hljs-keyword">var</span> <span class="hljs-keyword">import</span> = <span class="hljs-keyword">new</span> DocImportMd(<span class="hljs-string">\'username\'</span>, <span class="hljs-string">\'pwd\'</span>, <span class="hljs-string">\'address\'</span>)\n<span class="hljs-keyword">var</span> markdown = <span class="hljs-string">\'# H1\\n ## hhh\'</span>\n\n<span class="hljs-comment">// new an document &#x26; push to server.</span>\n<span class="hljs-keyword">import</span>\n    .new(markdown, <span class="hljs-string">\'title\'</span>)\n    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">listId</span>) </span>{\n\n    });\n\n<span class="hljs-comment">// insert document to document</span>\n<span class="hljs-comment">// which is already existed</span>\n<span class="hljs-keyword">import</span>\n    .insert(<span class="hljs-string">\'listId\'</span>, markdown, <span class="hljs-string">\'parentId &#x3C;maybe is null>\'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{\n        <span class="hljs-comment">// data.listId</span>\n        <span class="hljs-comment">// data.nodeId // maybe undefined</span>\n    });</code></pre>\n<h2 id="实现思路"><a href="#%E5%AE%9E%E7%8E%B0%E6%80%9D%E8%B7%AF" aria-hidden="true"><span class="icon icon-link"></span></a>实现思路</h2>\n<pre><code class="hljs language-markdown" data-query="{}" data-lang="markdown"><span class="hljs-section"># A               ->  # A --- i\'m an apple.</span>\ni\'m an apple.             |-- i\'m an egg.\ni\'m an egg.               |-- > <span class="hljs-code">```\n> ```                     |   > code A\n> code A                  |   > ``` \n> ```                     \\-- ## A-1 --- text in A-1 \n                                     |-- 1. A-1-1\n## A-1                               |      |-- description1 in A-1-1 \n                                     |      \\-- description2 in A-1-1\ntext in A-1                          |-- 2. A-1-2\n                                     |-- 3. A-1-3\n1. A-1-1                             |-- not description \ndescription1 in A-1-1                \\-- ~~~\\ncode\\n~~~\ndescription2 in A-1-1\n2. A-1-2\n\n3. A-1-3\n\n\nnot description\n\n~~~\ncode B\n~~~</span></code></pre>\n<p>上面为 markdown 的输入和需要输出的中间数据结构。</p>\n<ol>\n<li>\n<p>#难点 解析 Markdown 文本（借助亮亮的 <a href="https://github.com/imcuttle/doc-import-md/blob/master/lib/TokenParser.js">TokenParserV2</a>设计）得到<a href="https://github.com/imcuttle/doc-import-md/blob/master/lib/parser-factory/md-to-tree.js">树形数据结构</a>。</p>\n</li>\n<li>\n<p>分析 doc.eux 的传参规则. <a href="https://github.com/imcuttle/doc-import-md/blob/master/lib/actions.js">code</a></p>\n</li>\n<li>\n<p>进行 登录 -> 新建文章 -> 修改文章名 -> 添加内容节点. <a href="https://github.com/imcuttle/doc-import-md/blob/master/index.js">code</a></p>\n</li>\n</ol>\n<h2 id="todo"><a href="#todo" aria-hidden="true"><span class="icon icon-link"></span></a>Todo</h2>\n<ul>\n<li>\n<p>加入 <code>doc -> md</code> 的方向，与 <code>md -> doc</code> 互逆</p>\n</li>\n<li>\n<p>同构 request 实现  浏览器端的支持</p>\n</li>\n<li>\n<p>考虑后续加入项目配置 <code>.docinrc</code></p>\n<pre><code class="hljs language-js" data-query="{}" data-lang="js"><span class="hljs-comment">// 后续提交 `docRoot` 下的`*.md` 文件</span>\n<span class="hljs-comment">// git可以自动同步至doc</span>\n{\n    <span class="hljs-string">"docRoot"</span>: <span class="hljs-string">"./doc"</span>,\n    <span class="hljs-string">"docAddress"</span>: <span class="hljs-string">"...."</span>,\n    <span class="hljs-string">"user"</span>: {...}\n}</code></pre>\n</li>\n</ul>\n',extra:{}}}});