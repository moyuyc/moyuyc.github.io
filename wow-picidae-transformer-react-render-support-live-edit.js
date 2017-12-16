webpackJsonp([0,90],{1058:function(e,n,t){e.exports={content:'<h2 id="首先看一个实例！"><a href="#%E9%A6%96%E5%85%88%E7%9C%8B%E4%B8%80%E4%B8%AA%E5%AE%9E%E4%BE%8B%EF%BC%81" aria-hidden="true"><span class="icon icon-link"></span></a>首先看一个实例！</h2>\n<p><a href="https://github.com/m-cuttlefish/react-code-editor"><code>react-code-editor</code></a><br>\n如下代码：</p>\n<pre><code class="hljs language-css" data-query="{}" data-lang="css"><span class="hljs-selector-class">.stage</span> {\n  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> dashed <span class="hljs-number">#333</span>;\n  <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;  \n}</code></pre>\n<div class="transformer-react-render-container"><pre><code class="hljs language-react" data-query="{}" data-lang="react"><span class="hljs-keyword">import</span> React from <span class="hljs-string">\'react\'</span>\n<span class="hljs-keyword">import</span> CodeEditor from <span class="hljs-string">\'react-code-editor\'</span>\n\nconst code =\n`const hello = <span class="hljs-string">\'world\'</span>\n`\n\nexport <span class="hljs-keyword">default</span> (\n    &#x3C;div className=<span class="hljs-string">"stage"</span>>\n        &#x3C;h4 style={{margin: <span class="hljs-number">0</span>}}>CodeEditor&#x3C;/h4>\n        &#x3C;CodeEditor\n            // workerUrl=<span class="hljs-string">"/hljs.worker.js"</span>\n            language=<span class="hljs-string">"javascript"</span>\n            className=<span class="hljs-string">"javascript"</span>\n            tabSize={<span class="hljs-number">2</span>}\n            code={code}\n            mountStyle={false}\n            onChange={console.log}\n        />\n        &#x3C;CodeEditor\n            // workerUrl=<span class="hljs-string">"/hljs.worker.js"</span>\n            language=<span class="hljs-string">"javascript"</span>\n            className=<span class="hljs-string">"javascript"</span>\n            tabSize={<span class="hljs-number">2</span>}\n            code={code}\n            mountStyle={false}\n            onChange={console.log}\n        />\n    &#x3C;/div>\n)</code></pre><transformer-react-render data-id="0"></transformer-react-render></div>\n<h2 id="section--range"><a href="#section--range" aria-hidden="true"><span class="icon icon-link"></span></a>Section / Range</h2>\n<pre><code class="hljs language-html" data-query="{}" data-lang="__html"><span class="hljs-tag">&#x3C;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"stage"</span>></span>\n    <span class="hljs-tag">&#x3C;<span class="hljs-name">pre</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dom-editable"</span> <span class="hljs-attr">contenteditable</span>=<span class="hljs-string">"true"</span>></span>Input Here.\nSecond Line.\n<span class="hljs-tag">&#x3C;/<span class="hljs-name">pre</span>></span>\n    <span class="hljs-tag">&#x3C;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn-1"</span>></span>Select Second line<span class="hljs-tag">&#x3C;/<span class="hljs-name">button</span>></span>\n<span class="hljs-tag">&#x3C;/<span class="hljs-name">div</span>></span>\n\n<span class="hljs-tag">&#x3C;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>></span><span class="javascript">\n    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectionHelper</span>(<span class="hljs-params">el, pos</span>) </span>{\n        <span class="hljs-keyword">var</span> indexes = {}\n        <span class="hljs-comment">// getSelection</span>\n        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> pos === <span class="hljs-string">\'undefined\'</span>) {\n            <span class="hljs-keyword">var</span> selection = <span class="hljs-built_in">window</span>.getSelection()\n            <span class="hljs-keyword">var</span> range = selection.getRangeAt(<span class="hljs-number">0</span>);\n            <span class="hljs-keyword">var</span> clone = range.cloneRange();\n\n            clone.selectNodeContents(el);\n            clone.setEnd(range.endContainer, range.endOffset);\n            indexes.end = clone.toString().length;\n            clone.setStart(range.startContainer, range.startOffset);\n            indexes.start = indexes.end - clone.toString().length;\n            indexes.atStart = clone.startOffset === <span class="hljs-number">0</span>;\n            indexes.commonAncestorContainer = clone.commonAncestorContainer;\n            indexes.endContainer = clone.endContainer;\n            indexes.startContainer = clone.startContainer;\n\n            <span class="hljs-keyword">return</span> indexes;\n        }\n\n        <span class="hljs-keyword">var</span> setSelection = pos.end &#x26;&#x26; pos.end !== pos.start;\n        <span class="hljs-keyword">var</span> length = <span class="hljs-number">0</span>;\n        <span class="hljs-keyword">var</span> range = <span class="hljs-built_in">document</span>.createRange();\n        <span class="hljs-keyword">var</span> next;\n        <span class="hljs-keyword">var</span> startindex;\n        <span class="hljs-keyword">var</span> start = pos.start > el.textContent.length ? el.textContent.length : pos.start;\n        <span class="hljs-keyword">var</span> end = pos.end > el.textContent.length ? el.textContent.length : pos.end;\n        <span class="hljs-keyword">var</span> atStart = pos.atStart;\n\n\n        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &#x3C; el.childNodes.length; i++) {\n            next = el.childNodes[i]\n            <span class="hljs-keyword">if</span> (next.nodeType === Node.TEXT_NODE) {\n                <span class="hljs-keyword">var</span> olen = length;\n                length += next.textContent.length;\n\n                <span class="hljs-comment">// Set start point of selection</span>\n                <span class="hljs-keyword">var</span> atLength = atStart ? length > start : length >= start;\n                <span class="hljs-keyword">if</span> (!startindex &#x26;&#x26; atLength) {\n                    startindex = <span class="hljs-literal">true</span>;\n                    range.setStart(next, start - olen);\n                    <span class="hljs-keyword">if</span> (!setSelection) {\n                        range.collapse(<span class="hljs-literal">true</span>);\n                        makeSelection(el, range);\n                        <span class="hljs-keyword">break</span>;\n                    }\n                }\n\n                <span class="hljs-comment">// Set end point of selection</span>\n                <span class="hljs-keyword">if</span> (setSelection &#x26;&#x26; length >= end) {\n                    range.setEnd(next, end - olen);\n                    makeSelection(el, range);\n                    <span class="hljs-keyword">break</span>;\n                }\n            }\n        }\n\n        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeSelection</span>(<span class="hljs-params">el, range</span>) </span>{\n            <span class="hljs-keyword">var</span> selection = <span class="hljs-built_in">window</span>.getSelection();\n            el.focus();\n            selection.removeAllRanges();\n            selection.addRange(range);\n        }\n    }\n\n    <span class="hljs-keyword">var</span> dom = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">\'dom-editable\'</span>);\n    dom.addEventListener(<span class="hljs-string">\'keyup\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{\n        <span class="hljs-built_in">console</span>.log(selectionHelper(dom))\n    });\n\n    dom.addEventListener(<span class="hljs-string">\'keydown\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{\n        <span class="hljs-keyword">if</span> (evt.keyCode === <span class="hljs-number">13</span>) {\n            <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">\'insertHTML\'</span>, <span class="hljs-literal">false</span>, <span class="hljs-string">\'\\n\'</span>);\n            evt.preventDefault()\n        }\n    });\n\n    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">\'btn-1\'</span>).addEventListener(<span class="hljs-string">\'click\'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{\n        <span class="hljs-keyword">var</span> lines = dom.textContent.split(<span class="hljs-string">\'\\n\'</span>)\n        <span class="hljs-keyword">if</span> (lines.length &#x3C; <span class="hljs-number">2</span>) <span class="hljs-keyword">return</span>\n        <span class="hljs-keyword">var</span> start = <span class="hljs-number">0</span>, end = <span class="hljs-number">0</span>;\n        start += lines[<span class="hljs-number">0</span>].length + <span class="hljs-number">1</span>\n        end += start + lines[<span class="hljs-number">1</span>].length\n        <span class="hljs-built_in">console</span>.log(start, end)\n        selectionHelper(dom, {<span class="hljs-attr">start</span>: start, <span class="hljs-attr">end</span>: end})\n    });\n</span><span class="hljs-tag">&#x3C;/<span class="hljs-name">script</span>></span></code></pre>\n<transformer-html-loader><div class="stage">\n    <pre id="dom-editable" contenteditable="true">Input Here.\nSecond Line.\n</pre>\n    <button id="btn-1">Select Second line</button>\n</div>\n\n<script type="text/javascript">\n    function selectionHelper(el, pos) {\n        var indexes = {}\n        // getSelection\n        if (typeof pos === \'undefined\') {\n            var selection = window.getSelection()\n            var range = selection.getRangeAt(0);\n            var clone = range.cloneRange();\n\n            clone.selectNodeContents(el);\n            clone.setEnd(range.endContainer, range.endOffset);\n            indexes.end = clone.toString().length;\n            clone.setStart(range.startContainer, range.startOffset);\n            indexes.start = indexes.end - clone.toString().length;\n            indexes.atStart = clone.startOffset === 0;\n            indexes.commonAncestorContainer = clone.commonAncestorContainer;\n            indexes.endContainer = clone.endContainer;\n            indexes.startContainer = clone.startContainer;\n\n            return indexes;\n        }\n\n        var setSelection = pos.end && pos.end !== pos.start;\n        var length = 0;\n        var range = document.createRange();\n        var next;\n        var startindex;\n        var start = pos.start > el.textContent.length ? el.textContent.length : pos.start;\n        var end = pos.end > el.textContent.length ? el.textContent.length : pos.end;\n        var atStart = pos.atStart;\n\n\n        for (var i = 0; i < el.childNodes.length; i++) {\n            next = el.childNodes[i]\n            if (next.nodeType === Node.TEXT_NODE) {\n                var olen = length;\n                length += next.textContent.length;\n\n                // Set start point of selection\n                var atLength = atStart ? length > start : length >= start;\n                if (!startindex && atLength) {\n                    startindex = true;\n                    range.setStart(next, start - olen);\n                    if (!setSelection) {\n                        range.collapse(true);\n                        makeSelection(el, range);\n                        break;\n                    }\n                }\n\n                // Set end point of selection\n                if (setSelection && length >= end) {\n                    range.setEnd(next, end - olen);\n                    makeSelection(el, range);\n                    break;\n                }\n            }\n        }\n\n        function makeSelection(el, range) {\n            var selection = window.getSelection();\n            el.focus();\n            selection.removeAllRanges();\n            selection.addRange(range);\n        }\n    }\n\n    var dom = document.getElementById(\'dom-editable\');\n    dom.addEventListener(\'keyup\', function (evt) {\n        console.log(selectionHelper(dom))\n    });\n\n    dom.addEventListener(\'keydown\', function (evt) {\n        if (evt.keyCode === 13) {\n            document.execCommand(\'insertHTML\', false, \'\\n\');\n            evt.preventDefault()\n        }\n    });\n\n    document.getElementById(\'btn-1\').addEventListener(\'click\', function (evt) {\n        var lines = dom.textContent.split(\'\\n\')\n        if (lines.length < 2) return\n        var start = 0, end = 0;\n        start += lines[0].length + 1\n        end += start + lines[1].length\n        console.log(start, end)\n        selectionHelper(dom, {start: start, end: end})\n    });\n</script></transformer-html-loader>\n',extra:{},"transformer-react-render":{list:[['function anonymous(React,Component,ReactDOM,require\n/*``*/) {\n\nvar exports = {}, module = {};\nmodule.exports = exports;\n(function picidaeTransformerReactRender() {\n    Object.defineProperty(exports, "__esModule", {\n        value: true\n    });\n\n    var _react = require("react");\n\n    var _react2 = _interopRequireDefault(_react);\n\n    var _reactCodeEditor = require("react-code-editor");\n\n    var _reactCodeEditor2 = _interopRequireDefault(_reactCodeEditor);\n\n    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n    var code = "const hello = \'world\'\\n";\n    exports.default = _react2.default.createElement(\n        "div",\n        {\n            className: "stage"\n        },\n        _react2.default.createElement(\n            "h4",\n            {\n                style: {\n                    margin: 0\n                }\n            },\n            "CodeEditor"\n        ),\n        _react2.default.createElement(_reactCodeEditor2.default // workerUrl="/hljs.worker.js"\n        // workerUrl="/hljs.worker.js"\n        , {\n            language: "javascript",\n            className: "javascript",\n            tabSize: 2,\n            code: code,\n            mountStyle: false,\n            onChange: console.log\n        }),\n        _react2.default.createElement(_reactCodeEditor2.default, {\n            language: "javascript",\n            className: "javascript",\n            tabSize: 2,\n            code: code,\n            mountStyle: false,\n            onChange: console.log\n        })\n    );\n})(exports, module)\nreturn module.exports.default || module.exports;\n}',{}]],pkg:{react:t(6),"react-dom":t(107),"react-code-editor":t(1092)}}}},1092:function(e,n,t){e.exports=t(1096)},1093:function(e,n,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var a=t(6),r=s(a),l=t(1095),o=s(l),i=r.default.createElement("style",{type:"text/css",dangerouslySetInnerHTML:{__html:o.default}});n.default=function(){return i}},1094:function(e,n,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var a,r,l=t(65),o=s(l),i=t(98),c=s(i),d=t(66),p=s(d),u=t(63),f=s(u),h=t(152),g=s(h),m=t(53),v=s(m),j=t(64),y=s(j),k=t(55),x=s(k),C=t(54),b=s(C),w=t(6),S=s(w),_=t(1097),E=s(_),T=t(1104),R=s(T),O=t(1102),M=s(O),L=t(1103),D=s(L),P=t(1101),K=s(P),N=t(1099),U=(s(N),t(1105)),A=s(U),H=t(1100),z=t(1098),I=t(1093),B=s(I),q=(r=a=function(e){function n(){var e,t,s,a,r=this;(0,v.default)(this,n);for(var l=arguments.length,o=Array(l),i=0;i<l;i++)o[i]=arguments[i];return t=s=(0,x.default)(this,(e=n.__proto__||(0,g.default)(n)).call.apply(e,[this].concat(o))),s.id=Math.random()+"-"+(new Date).getTime(),s.undoStack=[],s.undoOffset=0,s.undoTimestamp=0,s.compositing=!1,s.state={html:""},s.onRef=function(e){s.ref=e},s.getPlain=function(){if(s._innerHTML===s.ref.innerHTML)return s._plain;var e=(0,K.default)((0,D.default)(s.ref.innerHTML));return s._plain=e,s._innerHTML=s.ref.innerHTML,s._plain},s.recordChange=function(e,n){if(e!==s.undoStack[s.undoStack.length-1]){var t=Date.now(),a={plain:e,selection:n};t-s.undoTimestamp<3e3?s.undoStack[s.undoStack.length-1]=a:(s.undoStack.push(a),s.undoStack.length>50&&s.undoStack.shift()),s.undoTimestamp=t}},s.updateContent=function(){var e=(0,f.default)(p.default.mark(function e(){var n,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.getPlain(),a=arguments[1];return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,R.default)({id:s.id,code:t,language:s.props.language,workerUrl:s.props.workerUrl});case 2:n=e.sent,s.setState({html:n},a),s.props.onChange&&s.props.onChange(t);case 5:case"end":return e.stop()}},e,r)}));return function(){return e.apply(this,arguments)}}(),s.restoreStackState=function(e){var n=s.undoStack[s.undoStack.length-1-e],t=n.plain,a=n.selection;s.selection=a,s.undoOffset=e,s.updateContent(t)},s.undo=function(){var e=s.undoOffset+1;e>=s.undoStack.length||s.restoreStackState(e)},s.redo=function(){var e=s.undoOffset-1;e<0||s.restoreStackState(e)},s.onKeyDown=function(e){var n=s.props,t=n.onKeyDown,a=n.tabSize;if(t&&t(e),!s.props.ignoreTabKey||9!==e.keyCode){var r=!1;if(9!==e.keyCode||e.shiftKey)if(8===e.keyCode||(r=9===e.keyCode&&e.shiftKey)){var l=(0,A.default)(s.ref),o=l.start,i=l.end;if(o!==i)return;var c=(0,H.getDeindentLevel)(s.getPlain(),o,a);if(c<=0)return void(r&&e.preventDefault());(0,z.deleteTimes)(c),e.preventDefault()}else if(13===e.keyCode){var d=(0,A.default)(s.ref),p=d.start,u=(0,H.getIndent)(s.getPlain(),p);document.execCommand("insertHTML",!1,"\n"+u),e.preventDefault()}else if(90!==e.keyCode||e.metaKey===e.ctrlKey||e.altKey){if(e.ctrlKey!==e.metaKey&&191===e.keyCode){e.preventDefault();var f=(0,A.default)(s.ref),h=f.start,g=f.end,m=s.getPlain(),v=(0,H.getLineRange)(m,h),j=(0,H.getLine)(m,h);if(/^(\s*)(\/\/\s?)/.test(j)){var y=v[0]+RegExp.$1.length+RegExp.$2.length;return(0,A.default)(s.ref,{start:y,end:y}),(0,z.deleteTimes)(RegExp.$2.length),void(0,A.default)(s.ref,{start:h-RegExp.$2.length,end:g-RegExp.$2.length})}(0,A.default)(s.ref,{start:v[0],end:v[0]}),document.execCommand("insertText",!1,"// "),v[1]!==m.length?(0,A.default)(s.ref,{start:h-v[0]+v[1],end:g-v[0]+v[1]}):(0,A.default)(s.ref,{start:h+3,end:g+3})}else if(e.ctrlKey!==e.metaKey&&68===e.keyCode){e.preventDefault();var k=(0,A.default)(s.ref),x=k.start,C=k.end,b=s.getPlain(),w=(0,H.getLine)(b,x),S=(0,H.getLineRange)(b,x);if(x===C){(0,A.default)(s.ref,{start:S[1],end:S[1]}),S[1]!==b.length?document.execCommand("insertText",!1,w.replace(/\n$/,"\r\n")):document.execCommand("insertText",!1,"\n"+w.replace(/\n$/,"\r\n"));var _=(0,A.default)(s.ref);_.start,_.end;(0,A.default)(s.ref,{start:S[1]+(x-S[0]),end:S[1]+(C-S[0])})}else{(0,A.default)(s.ref,{start:C,end:C});var E=w.substring(x-S[0],C-S[0]);document.execCommand("insertText",!1,E),(0,A.default)(s.ref,{start:C,end:C+E.length})}}}else e.shiftKey?s.redo():s.undo(),e.preventDefault();else document.execCommand("insertText",!1," ".repeat(a)),e.preventDefault()}},s.onKeyUp=function(e){if(s.props.onKeyUp&&s.props.onKeyUp(e),13===e.keyCode&&(s.undoTimestamp=0),s.selection=(0,A.default)(s.ref),37!==e.keyCode&&38!==e.keyCode&&39!==e.keyCode&&40!==e.keyCode){var n=s.getPlain();s.recordChange(n,s.selection),!s.compositing&&s.updateContent(n)}else s.undoTimestamp=0},s.onCompositionStart=function(e){s.props.onCompositionStart&&s.props.onCompositionStart(e),s.compositing=!0},s.onCompositionEnd=function(e){s.props.onCompositionEnd&&s.props.onCompositionEnd(e),s.compositing=!1},s.onClick=function(e){s.props.onClick&&s.props.onClick(e),s.undoTimestamp=0,s.selection=(0,A.default)(s.ref)},a=t,(0,x.default)(s,a)}return(0,b.default)(n,e),(0,y.default)(n,[{key:"componentWillUnmount",value:function(){(0,T.killWorker)(this.id)}},{key:"componentDidMount",value:function(){function e(){return n.apply(this,arguments)}var n=(0,f.default)(p.default.mark(function e(){var n;return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,R.default)({id:this.id,code:(0,M.default)(this.props.code),language:this.props.language,workerUrl:this.props.workerUrl});case 2:n=e.sent,this.setState({html:n}),this.recordChange(this.getPlain()),this.undoTimestamp=0;case 6:case"end":return e.stop()}},e,this)}));return e}()},{key:"componentWillReceiveProps",value:function(){function e(e){return n.apply(this,arguments)}var n=(0,f.default)(p.default.mark(function e(n){var t,s=n.code,a=n.language,r=n.workerUrl;return p.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(s===this.props.code&&a===this.props.language&&r===this.props.workerUrl){e.next=5;break}return e.next=3,(0,R.default)({id:this.id,code:(0,M.default)(s),language:a,workerUrl:r});case 3:t=e.sent,this.setState({html:t});case 5:case"end":return e.stop()}},e,this)}));return e}()},{key:"componentDidUpdate",value:function(){var e=this.selection;e&&(0,A.default)(this.ref,e)}},{key:"render",value:function(){var e=this.props,n=e.contentEditable,t=e.className,s=e.mountStyle,a=(e.tabSize,e.style),r=(e.workerUrl,e.code,e.ignoreTabKey,e.language,(0,c.default)(e,["contentEditable","className","mountStyle","tabSize","style","workerUrl","code","ignoreTabKey","language"])),l=this.state.html;return S.default.createElement("pre",null,s&&S.default.createElement(B.default,null),S.default.createElement("code",(0,o.default)({spellCheck:"false"},r,{ref:this.onRef,style:a,onKeyDown:n?this.onKeyDown:void 0,onKeyUp:n?this.onKeyUp:void 0,onCompositionEnd:n?this.onCompositionEnd:void 0,onCompositionStart:n?this.onCompositionStart:void 0,onClick:n?this.onClick:void 0,contentEditable:n,className:(0,E.default)("code-editor","hljs",t),dangerouslySetInnerHTML:{__html:l}})))}}]),n}(w.Component),a.defaultProps={contentEditable:!0,mountStyle:!0,language:"",tabSize:4,code:"",className:"",style:{},workerUrl:null,ignoreTabKey:!1},r);n.default=q},1095:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default="\n.code-editor {\n  display: block;\n  white-space: pre;\n\n  background-color: #1D1F21;\n  color: #C5C8C6;\n\n  padding: 0.5rem;\n  margin: 0;\n\n  box-sizing: border-box;\n  vertical-align: baseline;\n  outline: none;\n  text-shadow: none;\n  -webkit-hyphens: none;\n  -ms-hyphens: none;\n  hyphens: none;\n  word-wrap: normal;\n  word-break: normal;\n  text-align: left;\n  word-spacing: normal;\n  -moz-tab-size: 2;\n  -o-tab-size: 2;\n  tab-size: 2;\n}\n"},1096:function(e,n,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=t(1094),r=s(a);n.default=r.default},1097:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=function(){for(var e=arguments.length,n=Array(e),t=0;t<e;t++)n[t]=arguments[t];return n.filter(Boolean).join(" ")};n.default=t},1098:function(e,n){"use strict";function t(e,n){if(null!=e)if(e.createTextRange){var t=e.createTextRange();t.move("character",n),t.select()}else e.selectionStart?(e.focus(),e.setSelectionRange(n,n)):e.focus()}function s(e){for(var n=0;n<e;n++)document.execCommand("delete",!1)}Object.defineProperty(n,"__esModule",{value:!0}),n.setCaretPosition=t,n.deleteTimes=s},1099:function(e,n){"use strict";e.exports=function(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&/g,"&amp;").replace(/"/g,"&quot;")}},1100:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=(n.getLine=function(e,n){var t=e.slice(n),s=e.slice(0,n),a=s.lastIndexOf("\n")+1,r=t.indexOf("\n")+1;return r=0===r?e.length:r,s.slice(a)+t.slice(0,r)},n.getLineRange=function(e,n){var t=e.slice(n),s=e.slice(0,n),a=s.lastIndexOf("\n")+1,r=t.indexOf("\n")+1;r=0===r?e.length:r;var l=s.slice(a),o=t.slice(0,r);return[n-l.length,n+o.length]},n.getBeforeLine=function(e,n){var t=e.slice(0,n),s=t.lastIndexOf("\n")+1;return t.slice(s)}),s=/^\s+/,a=(n.getIndent=function(e,n){var a=t(e,n),r=a.match(s);return null===r?"":r[0]||""},/^(\t|  )*  $/);n.getDeindentLevel=function(e,n){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2,r=t(e,n);return a.test(r)?s:0}},1101:function(e,n,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var a=t(465),r=s(a),l=function(e){return(0,r.default)(e.replace(/<br>/gm,"\n").replace(/<\/?[^>]*>/gm,""))};n.default=l},1102:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=/^((\t|  )+)/gm,s=/\t/g,a=function(e){return e.replace(t,function(e,n){return n.replace(s,"  ")})};n.default=a},1103:function(e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=function(e){return e.replace("\n","<br>")};n.default=t},1104:function(e,n,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function a(e){var n=u[e];n&&(n.terminate(),delete u[e])}Object.defineProperty(n,"__esModule",{value:!0});var r=t(66),l=s(r),o=t(153),i=s(o),c=t(63),d=s(c);n.killWorker=a;var p=t(297),u={},f=function(){var e=(0,d.default)(l.default.mark(function e(n){var t,s=n.code,r=n.language,o=n.workerUrl,c=n.id;return l.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=u[c],"function"!=typeof Worker||t||"string"!=typeof o||(t=new Worker(o),u[c]=t),"string"!=typeof o&&t&&a(c),!t){e.next=5;break}return e.abrupt("return",new i.default(function(e){t.postMessage({type:"highlight",id:c,arguments:[s,r]}),t.onmessage=function(n){var t=n.data;return e(t)}}));case 5:return e.abrupt("return",(r?(0,p.highlight)(r,s,!0):(0,p.highlightAuto)(s)).value);case 6:case"end":return e.stop()}},e,void 0)}));return function(n){return e.apply(this,arguments)}}();n.default=f},1105:function(e,n,t){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function a(e,n){var t=window.getSelection();if(1==arguments.length){if(!t.rangeCount)return;var s={},a=t.getRangeAt(0),l=a.cloneRange();return l.selectNodeContents(e),l.setEnd(a.endContainer,a.endOffset),s.end=l.toString().length,l.setStart(a.startContainer,a.startOffset),s.start=s.end-l.toString().length,s.atStart=0===l.startOffset,s.commonAncestorContainer=l.commonAncestorContainer,s.endContainer=l.endContainer,s.startContainer=l.startContainer,s}for(var i,c,d=n.end&&n.end!==n.start,p=0,a=document.createRange(),u=(0,o.default)(e).select(Node.TEXT_NODE).revisit(!1),f=n.start>e.textContent.length?e.textContent.length:n.start,h=n.end>e.textContent.length?e.textContent.length:n.end,g=n.atStart;i=u.next();){var m=p;p+=i.textContent.length;var v=g?p>f:p>=f;if(!c&&v&&(c=!0,a.setStart(i,f-m),!d)){a.collapse(!0),r(e,a);break}if(d&&p>=h){a.setEnd(i,h-m),r(e,a);break}}}function r(e,n){var t=window.getSelection();e.focus(),t.removeAllRanges(),t.addRange(n)}Object.defineProperty(n,"__esModule",{value:!0}),n.makeSelection=r;var l=t(292),o=s(l);n.default=a}});