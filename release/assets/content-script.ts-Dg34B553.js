import{r as R,T as w}from"./bridge-Bwnd3sev.js";function $(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)r.hasOwnProperty(n)&&(e[n]=r[n])}return e}function N(e,t){return Array(t+1).join(e)}function V(e){return e.replace(/^\n*/,"")}function U(e){for(var t=e.length;t>0&&e[t-1]===`
`;)t--;return e.substring(0,t)}var W=["ADDRESS","ARTICLE","ASIDE","AUDIO","BLOCKQUOTE","BODY","CANVAS","CENTER","DD","DIR","DIV","DL","DT","FIELDSET","FIGCAPTION","FIGURE","FOOTER","FORM","FRAMESET","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","HTML","ISINDEX","LI","MAIN","MENU","NAV","NOFRAMES","NOSCRIPT","OL","OUTPUT","P","PRE","SECTION","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","UL"];function T(e){return y(e,W)}var x=["AREA","BASE","BR","COL","COMMAND","EMBED","HR","IMG","INPUT","KEYGEN","LINK","META","PARAM","SOURCE","TRACK","WBR"];function S(e){return y(e,x)}function _(e){return D(e,x)}var O=["A","TABLE","THEAD","TBODY","TFOOT","TH","TD","IFRAME","SCRIPT","AUDIO","VIDEO"];function X(e){return y(e,O)}function j(e){return D(e,O)}function y(e,t){return t.indexOf(e.nodeName)>=0}function D(e,t){return e.getElementsByTagName&&t.some(function(r){return e.getElementsByTagName(r).length})}var s={};s.paragraph={filter:"p",replacement:function(e){return`

`+e+`

`}};s.lineBreak={filter:"br",replacement:function(e,t,r){return r.br+`
`}};s.heading={filter:["h1","h2","h3","h4","h5","h6"],replacement:function(e,t,r){var n=Number(t.nodeName.charAt(1));if(r.headingStyle==="setext"&&n<3){var a=N(n===1?"=":"-",e.length);return`

`+e+`
`+a+`

`}else return`

`+N("#",n)+" "+e+`

`}};s.blockquote={filter:"blockquote",replacement:function(e){return e=e.replace(/^\n+|\n+$/g,""),e=e.replace(/^/gm,"> "),`

`+e+`

`}};s.list={filter:["ul","ol"],replacement:function(e,t){var r=t.parentNode;return r.nodeName==="LI"&&r.lastElementChild===t?`
`+e:`

`+e+`

`}};s.listItem={filter:"li",replacement:function(e,t,r){e=e.replace(/^\n+/,"").replace(/\n+$/,`
`).replace(/\n/gm,`
    `);var n=r.bulletListMarker+"   ",a=t.parentNode;if(a.nodeName==="OL"){var i=a.getAttribute("start"),l=Array.prototype.indexOf.call(a.children,t);n=(i?Number(i)+l:l+1)+".  "}return n+e+(t.nextSibling&&!/\n$/.test(e)?`
`:"")}};s.indentedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="indented"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,r){return`

    `+t.firstChild.textContent.replace(/\n/g,`
    `)+`

`}};s.fencedCodeBlock={filter:function(e,t){return t.codeBlockStyle==="fenced"&&e.nodeName==="PRE"&&e.firstChild&&e.firstChild.nodeName==="CODE"},replacement:function(e,t,r){for(var n=t.firstChild.getAttribute("class")||"",a=(n.match(/language-(\S+)/)||[null,""])[1],i=t.firstChild.textContent,l=r.fence.charAt(0),u=3,o=new RegExp("^"+l+"{3,}","gm"),f;f=o.exec(i);)f[0].length>=u&&(u=f[0].length+1);var h=N(l,u);return`

`+h+a+`
`+i.replace(/\n$/,"")+`
`+h+`

`}};s.horizontalRule={filter:"hr",replacement:function(e,t,r){return`

`+r.hr+`

`}};s.inlineLink={filter:function(e,t){return t.linkStyle==="inlined"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t){var r=t.getAttribute("href"),n=d(t.getAttribute("title"));return n&&(n=' "'+n+'"'),"["+e+"]("+r+n+")"}};s.referenceLink={filter:function(e,t){return t.linkStyle==="referenced"&&e.nodeName==="A"&&e.getAttribute("href")},replacement:function(e,t,r){var n=t.getAttribute("href"),a=d(t.getAttribute("title"));a&&(a=' "'+a+'"');var i,l;switch(r.linkReferenceStyle){case"collapsed":i="["+e+"][]",l="["+e+"]: "+n+a;break;case"shortcut":i="["+e+"]",l="["+e+"]: "+n+a;break;default:var u=this.references.length+1;i="["+e+"]["+u+"]",l="["+u+"]: "+n+a}return this.references.push(l),i},references:[],append:function(e){var t="";return this.references.length&&(t=`

`+this.references.join(`
`)+`

`,this.references=[]),t}};s.emphasis={filter:["em","i"],replacement:function(e,t,r){return e.trim()?r.emDelimiter+e+r.emDelimiter:""}};s.strong={filter:["strong","b"],replacement:function(e,t,r){return e.trim()?r.strongDelimiter+e+r.strongDelimiter:""}};s.code={filter:function(e){var t=e.previousSibling||e.nextSibling,r=e.parentNode.nodeName==="PRE"&&!t;return e.nodeName==="CODE"&&!r},replacement:function(e){if(!e)return"";e=e.replace(/\r?\n|\r/g," ");for(var t=/^`|^ .*?[^ ].* $|`$/.test(e)?" ":"",r="`",n=e.match(/`+/gm)||[];n.indexOf(r)!==-1;)r=r+"`";return r+t+e+t+r}};s.image={filter:"img",replacement:function(e,t){var r=d(t.getAttribute("alt")),n=t.getAttribute("src")||"",a=d(t.getAttribute("title")),i=a?' "'+a+'"':"";return n?"!["+r+"]("+n+i+")":""}};function d(e){return e?e.replace(/(\n+\s*)+/g,`
`):""}function B(e){this.options=e,this._keep=[],this._remove=[],this.blankRule={replacement:e.blankReplacement},this.keepReplacement=e.keepReplacement,this.defaultRule={replacement:e.defaultReplacement},this.array=[];for(var t in e.rules)this.array.push(e.rules[t])}B.prototype={add:function(e,t){this.array.unshift(t)},keep:function(e){this._keep.unshift({filter:e,replacement:this.keepReplacement})},remove:function(e){this._remove.unshift({filter:e,replacement:function(){return""}})},forNode:function(e){if(e.isBlank)return this.blankRule;var t;return(t=p(this.array,e,this.options))||(t=p(this._keep,e,this.options))||(t=p(this._remove,e,this.options))?t:this.defaultRule},forEach:function(e){for(var t=0;t<this.array.length;t++)e(this.array[t],t)}};function p(e,t,r){for(var n=0;n<e.length;n++){var a=e[n];if(G(a,t,r))return a}}function G(e,t,r){var n=e.filter;if(typeof n=="string"){if(n===t.nodeName.toLowerCase())return!0}else if(Array.isArray(n)){if(n.indexOf(t.nodeName.toLowerCase())>-1)return!0}else if(typeof n=="function"){if(n.call(e,t,r))return!0}else throw new TypeError("`filter` needs to be a string, array, or function")}function Y(e){var t=e.element,r=e.isBlock,n=e.isVoid,a=e.isPre||function(F){return F.nodeName==="PRE"};if(!(!t.firstChild||a(t))){for(var i=null,l=!1,u=null,o=E(u,t,a);o!==t;){if(o.nodeType===3||o.nodeType===4){var f=o.data.replace(/[ \r\n\t]+/g," ");if((!i||/ $/.test(i.data))&&!l&&f[0]===" "&&(f=f.substr(1)),!f){o=g(o);continue}o.data=f,i=o}else if(o.nodeType===1)r(o)||o.nodeName==="BR"?(i&&(i.data=i.data.replace(/ $/,"")),i=null,l=!1):n(o)||a(o)?(i=null,l=!0):i&&(l=!1);else{o=g(o);continue}var h=E(u,o,a);u=o,o=h}i&&(i.data=i.data.replace(/ $/,""),i.data||g(i))}}function g(e){var t=e.nextSibling||e.parentNode;return e.parentNode.removeChild(e),t}function E(e,t,r){return e&&e.parentNode===t||r(t)?t.nextSibling||t.parentNode:t.firstChild||t.nextSibling||t.parentNode}var A=typeof window<"u"?window:{};function K(){var e=A.DOMParser,t=!1;try{new e().parseFromString("","text/html")&&(t=!0)}catch{}return t}function z(){var e=function(){};return q()?e.prototype.parseFromString=function(t){var r=new window.ActiveXObject("htmlfile");return r.designMode="on",r.open(),r.write(t),r.close(),r}:e.prototype.parseFromString=function(t){var r=document.implementation.createHTMLDocument("");return r.open(),r.write(t),r.close(),r},e}function q(){var e=!1;try{document.implementation.createHTMLDocument("").open()}catch{A.ActiveXObject&&(e=!0)}return e}var Q=K()?A.DOMParser:z();function J(e,t){var r;if(typeof e=="string"){var n=Z().parseFromString('<x-turndown id="turndown-root">'+e+"</x-turndown>","text/html");r=n.getElementById("turndown-root")}else r=e.cloneNode(!0);return Y({element:r,isBlock:T,isVoid:S,isPre:t.preformattedCode?ee:null}),r}var v;function Z(){return v=v||new Q,v}function ee(e){return e.nodeName==="PRE"||e.nodeName==="CODE"}function te(e,t){return e.isBlock=T(e),e.isCode=e.nodeName==="CODE"||e.parentNode.isCode,e.isBlank=re(e),e.flankingWhitespace=ne(e,t),e}function re(e){return!S(e)&&!X(e)&&/^\s*$/i.test(e.textContent)&&!_(e)&&!j(e)}function ne(e,t){if(e.isBlock||t.preformattedCode&&e.isCode)return{leading:"",trailing:""};var r=ie(e.textContent);return r.leadingAscii&&k("left",e,t)&&(r.leading=r.leadingNonAscii),r.trailingAscii&&k("right",e,t)&&(r.trailing=r.trailingNonAscii),{leading:r.leading,trailing:r.trailing}}function ie(e){var t=e.match(/^(([ \t\r\n]*)(\s*))(?:(?=\S)[\s\S]*\S)?((\s*?)([ \t\r\n]*))$/);return{leading:t[1],leadingAscii:t[2],leadingNonAscii:t[3],trailing:t[4],trailingNonAscii:t[5],trailingAscii:t[6]}}function k(e,t,r){var n,a,i;return e==="left"?(n=t.previousSibling,a=/ $/):(n=t.nextSibling,a=/^ /),n&&(n.nodeType===3?i=a.test(n.nodeValue):r.preformattedCode&&n.nodeName==="CODE"?i=!1:n.nodeType===1&&!T(n)&&(i=a.test(n.textContent))),i}var ae=Array.prototype.reduce,le=[[/\\/g,"\\\\"],[/\*/g,"\\*"],[/^-/g,"\\-"],[/^\+ /g,"\\+ "],[/^(=+)/g,"\\$1"],[/^(#{1,6}) /g,"\\$1 "],[/`/g,"\\`"],[/^~~~/g,"\\~~~"],[/\[/g,"\\["],[/\]/g,"\\]"],[/^>/g,"\\>"],[/_/g,"\\_"],[/^(\d+)\. /g,"$1\\. "]];function m(e){if(!(this instanceof m))return new m(e);var t={rules:s,headingStyle:"setext",hr:"* * *",bulletListMarker:"*",codeBlockStyle:"indented",fence:"```",emDelimiter:"_",strongDelimiter:"**",linkStyle:"inlined",linkReferenceStyle:"full",br:"  ",preformattedCode:!1,blankReplacement:function(r,n){return n.isBlock?`

`:""},keepReplacement:function(r,n){return n.isBlock?`

`+n.outerHTML+`

`:n.outerHTML},defaultReplacement:function(r,n){return n.isBlock?`

`+r+`

`:r}};this.options=$({},t,e),this.rules=new B(this.options)}m.prototype={turndown:function(e){if(!ue(e))throw new TypeError(e+" is not a string, or an element/document/fragment node.");if(e==="")return"";var t=L.call(this,new J(e,this.options));return oe.call(this,t)},use:function(e){if(Array.isArray(e))for(var t=0;t<e.length;t++)this.use(e[t]);else if(typeof e=="function")e(this);else throw new TypeError("plugin must be a Function or an Array of Functions");return this},addRule:function(e,t){return this.rules.add(e,t),this},keep:function(e){return this.rules.keep(e),this},remove:function(e){return this.rules.remove(e),this},escape:function(e){return le.reduce(function(t,r){return t.replace(r[0],r[1])},e)}};function L(e){var t=this;return ae.call(e.childNodes,function(r,n){n=new te(n,t.options);var a="";return n.nodeType===3?a=n.isCode?n.nodeValue:t.escape(n.nodeValue):n.nodeType===1&&(a=se.call(t,n)),P(r,a)},"")}function oe(e){var t=this;return this.rules.forEach(function(r){typeof r.append=="function"&&(e=P(e,r.append(t.options)))}),e.replace(/^[\t\r\n]+/,"").replace(/[\t\r\n\s]+$/,"")}function se(e){var t=this.rules.forNode(e),r=L.call(this,e),n=e.flankingWhitespace;return(n.leading||n.trailing)&&(r=r.trim()),n.leading+t.replacement(r,e,this.options)+n.trailing}function P(e,t){var r=U(e),n=V(t),a=Math.max(e.length-r.length,t.length-n.length),i=`

`.substring(0,a);return r+i+n}function ue(e){return e!=null&&(typeof e=="string"||e.nodeType&&(e.nodeType===1||e.nodeType===9||e.nodeType===11))}var C=/highlight-(?:text|source)-([a-z0-9]+)/;function fe(e){e.addRule("highlightedCodeBlock",{filter:function(t){var r=t.firstChild;return t.nodeName==="DIV"&&C.test(t.className)&&r&&r.nodeName==="PRE"},replacement:function(t,r,n){var a=r.className||"",i=(a.match(C)||[null,""])[1];return`

`+n.fence+i+`
`+r.firstChild.textContent+`
`+n.fence+`

`}})}function ce(e){e.addRule("strikethrough",{filter:["del","s","strike"],replacement:function(t){return"~"+t+"~"}})}var he=Array.prototype.indexOf,de=Array.prototype.every,c={};c.tableCell={filter:["th","td"],replacement:function(e,t){return I(e,t)}};c.tableRow={filter:"tr",replacement:function(e,t){var r="",n={left:":--",right:"--:",center:":-:"};if(b(t))for(var a=0;a<t.childNodes.length;a++){var i="---",l=(t.childNodes[a].getAttribute("align")||"").toLowerCase();l&&(i=n[l]||i),r+=I(i,t.childNodes[a])}return`
`+e+(r?`
`+r:"")}};c.table={filter:function(e){return e.nodeName==="TABLE"&&b(e.rows[0])},replacement:function(e){return e=e.replace(`

`,`
`),`

`+e+`

`}};c.tableSection={filter:["thead","tbody","tfoot"],replacement:function(e){return e}};function b(e){var t=e.parentNode;return t.nodeName==="THEAD"||t.firstChild===e&&(t.nodeName==="TABLE"||me(t))&&de.call(e.childNodes,function(r){return r.nodeName==="TH"})}function me(e){var t=e.previousSibling;return e.nodeName==="TBODY"&&(!t||t.nodeName==="THEAD"&&/^\s*$/i.test(t.textContent))}function I(e,t){var r=he.call(t.parentNode.childNodes,t),n=" ";return r===0&&(n="| "),n+e+" |"}function pe(e){e.keep(function(r){return r.nodeName==="TABLE"&&!b(r.rows[0])});for(var t in c)e.addRule(t,c[t])}function ge(e){e.addRule("taskListItems",{filter:function(t){return t.type==="checkbox"&&t.parentNode.nodeName==="LI"},replacement:function(t,r){return(r.checked?"[x]":"[ ]")+" "}})}function ve(e){e.use([fe,ce,pe,ge])}const M=new m;M.use(ve);async function H(){var r,n,a;let e="";const t=await navigator.clipboard.read();if(t.length){const i=t[0];(r=i.types)!=null&&r.includes("text/markdown")?e=await(await i.getType("text/markdown")).text():(n=i.types)!=null&&n.includes("text/html")?(e=await(await i.getType("text/html")).text(),e=M.turndown(e)):(a=i.types)!=null&&a.includes("text/plain")&&(e=await(await i.getType("text/html")).text())}document.execCommand("insertText",!1,e)}R(w.EXISTS,()=>!0);R(w.PASTE,H);H();
