webpackJsonp([46,90],{1017:function(n,s){n.exports={content:'<h2 id="需求"><a href="#%E9%9C%80%E6%B1%82" aria-hidden="true"><span class="icon icon-link"></span></a>需求</h2>\n<p>在项目开发初期，未考虑到需要做数据列表页面的数据（如分页、排序、条件查询...）同步至 url.</p>\n<p>但这种需求在对于数据列表是必要的。</p>\n<p>因此需要一种较为“优雅的”方式来“独立”实现数据-url 的同步</p>\n<h2 id="思路"><a href="#%E6%80%9D%E8%B7%AF" aria-hidden="true"><span class="icon icon-link"></span></a>思路</h2>\n<ol>\n<li>首先，项目中的页面结构如下</li>\n</ol>\n<pre><code data-query="{}" data-lang="">state.js    # mobx \nindex.js    # react page\n...\n</code></pre>\n<p>一个view 对应一个 state</p>\n<ol start="2">\n<li>\n<p>我们需要同步的数据一般在 state.js 中</p>\n</li>\n<li>\n<p>约定一个 state "生命周期"规范</p>\n</li>\n</ol>\n<pre><code data-query="{}" data-lang="">componentWillMount() -> trigger -> state.init(props)\ncomponentWillReceiveProps() -> trigger -> state.update(newProps) | state.init(newProps)\ncomponentWillUnmount() -> trigger -> state.exit(props)\n</code></pre>\n<ol start="4">\n<li>在 init 方法中，注入下面的逻辑</li>\n</ol>\n<pre><code data-query="{}" data-lang="">根据 url 预设 state\n\n观察需要同步数据的改动，如果改动了，则将其数据写入url\n</code></pre>\n<ol start="5">\n<li>在 exit 方法中，注入销毁 init 观察者的逻辑</li>\n</ol>\n<h2 id="需要注意的点"><a href="#%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E7%9A%84%E7%82%B9" aria-hidden="true"><span class="icon icon-link"></span></a>需要注意的点</h2>\n<ul>\n<li>适用于 state 独立于一个 class 的架构</li>\n<li>state 必须有 <code>init/exit</code> 周期方法（继承）</li>\n<li>在对应 View 的生命周期方法中，绑定 state 的 <code>init/exit</code> 方法（HOC）</li>\n</ul>\n<h2 id="使用方法"><a href="#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95" aria-hidden="true"><span class="icon icon-link"></span></a>使用方法</h2>\n<ul>\n<li>\n<p>State</p>\n<pre><code class="hljs language-js" data-query="{}" data-lang="js"><span class="hljs-keyword">import</span> {urlsync} <span class="hljs-keyword">from</span> <span class="hljs-string">\'common/decorator\'</span>\n\n<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">State</span> </span>{\n\n    @observable initialized = <span class="hljs-literal">false</span>\n\n    <span class="hljs-comment">// 若不是observable，urlsync将自动转化为observable</span>\n    @urlsync\n    deptId = <span class="hljs-string">\'\'</span>\n\n    <span class="hljs-comment">// 避免重名，使用 page 命名</span>\n    @urlsync(<span class="hljs-string">\'page\'</span>)\n    @observable pagination = <span class="hljs-keyword">new</span> Pagination({\n        <span class="hljs-attr">pageNum</span>: <span class="hljs-number">1</span>,\n        <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>,\n        <span class="hljs-attr">pageSize</span>: <span class="hljs-number">10</span>\n    })\n    \n    init() {}\n    exit() {}\n    ...\n}</code></pre>\n</li>\n<li>\n<p>View</p>\n<pre><code class="hljs language-js" data-query="{}" data-lang="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">View</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{\n    \n    local = <span class="hljs-keyword">new</span> State();\n    \n    componentWillMount() {\n        <span class="hljs-keyword">this</span>.local.init(<span class="hljs-keyword">this</span>.props)\n    }\n    \n    componentWillUnmount() {\n        <span class="hljs-keyword">this</span>.local.exit(<span class="hljs-keyword">this</span>.props)\n    }\n    \n    ...\n}</code></pre>\n</li>\n</ul>\n<h2 id="其他问题"><a href="#%E5%85%B6%E4%BB%96%E9%97%AE%E9%A2%98" aria-hidden="true"><span class="icon icon-link"></span></a>其他问题</h2>\n<ul>\n<li>不适用于数据嵌套过深的数据结构</li>\n<li>url 变得“丑陋”</li>\n</ul>\n',extra:{}}}});