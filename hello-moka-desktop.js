webpackJsonp([60,90],{1003:function(e,o){e.exports={content:'<h2 id="what-is-moka-desktop"><a href="#what-is-moka-desktop" aria-hidden="true"><span class="icon icon-link"></span></a>What Is Moka Desktop</h2>\n<p><code>Moka Desktop</code> 是为<a href="https://github.com/moyuyc/moka">Moka</a>而生的桌面端应用，专门为不喜欢命令行的童鞋设计的。<br>\n将Moka融入至应用程序中，下载可以在<a href="https://github.com/moyuyc/moka-desktop/releases">发布页</a> 或者直接联系我本人  </p>\n<p><code>Moka Desktop</code>将Moka命令与<a href="https://github.com/moyuyc/markdown-editor">编辑器</a> (具有实时高亮同步与粘贴图片功能,极大程度优化用户书写博文体验) 融合起来，十分方便用户书写文章，管理博客。</p>\n<img src="http://obu9je6ng.bkt.clouddn.com/Fi566IB2hQppOk8s3KCA0Xrk4DU5?imageslim" alt="ClipboardImage" width="188" height="198" />\n<h2 id="have-a-look"><a href="#have-a-look" aria-hidden="true"><span class="icon icon-link"></span></a>Have A Look</h2>\n<img src="http://obu9je6ng.bkt.clouddn.com/FhB8E45ALXw-hYBVnEfSsPgijXr8?imageslim" alt="ClipboardImage" width="870" height="603" />\n<img src="http://obu9je6ng.bkt.clouddn.com/Fo0ujWSbz2Qq5AYDh2CBfuNxfLG7?imageslim" alt="ClipboardImage" width="870" height="603" />\n<h2 id="usage"><a href="#usage" aria-hidden="true"><span class="icon icon-link"></span></a>Usage</h2>\n<ol>\n<li>下载完毕，打开后，首先需要选中一个空的文件夹作为博客工作目录</li>\n<li>然后执行<code>Init</code>，初始化工作目录。可以打开右侧日志，查看运行状态。</li>\n<li>之后<code>Generate</code>生成初始静态博客</li>\n<li>完毕后，你可以<code>StaticServer</code>查看效果</li>\n<li><code>Server</code>与<code>StaticServer</code>区别: 后者依赖于<code>Generate</code>(<code>static</code>目录)，前者不需要在<code>Generate</code>之后运行, 而且会动态更新资源。比如你修改<code>source/_articles</code>中的文章后，<code>Server</code>中的资源会同步更新！</li>\n<li><code>Deploy</code>和<code>Bak</code>则是根据文件<code>moka.config.json</code>中的<code>deploy</code>,<code>bak</code>配置repo Url. 需要用户自己创建对应repo和github pages以及<a href="https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/">产生ssh key至本地</a>。</li>\n<li><code>一键发布</code>则是做了<code>Generate</code>-><code>Deploy&#x26;Bak</code>的工作</li>\n</ol>\n<h2 id="why-use-it"><a href="#why-use-it" aria-hidden="true"><span class="icon icon-link"></span></a>Why Use It</h2>\n<ol>\n<li>与<code>Moka</code>完全融入</li>\n<li>\n<p>舒适的书写博客体验，以下快捷键均只能在编辑区对焦后生效</p>\n<ol>\n<li><code>ctrl/cmd + U</code>  自动保存(编辑区失去焦点保存)开关</li>\n<li><code>ctrl/cmd + B/M</code> 放大缩小字号</li>\n<li><code>ctrl/cmd + S</code> 保存修改</li>\n<li>支持图片粘贴嵌入</li>\n<li>具有同步预览，右键预览区可控制开关</li>\n</ol>\n</li>\n</ol>\n<img src="http://obu9je6ng.bkt.clouddn.com/FnO_h1FTHMT8REA-0aSyXvHW4bIp?imageslim" alt="ClipboardImage" width="806" height="809" />\n',extra:{}}}});