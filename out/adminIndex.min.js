var __awaiter$6=function(e,t,r,s){return new(r||(r=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function n(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,n)}c((s=s.apply(e,t||[])).next())}))};const firebase=window.firebase,config$1={apiKey:"AIzaSyAggX7zwnqbVl56pZP4O7oH0QtPu9YMph0",authDomain:"printess-saas.firebaseapp.com"};firebase.initializeApp(config$1);const checkErrorCode=e=>{const t=document.getElementById("errorContainer"),r=document.getElementById("errorWrapper");t&&(t.style.display=""),"auth/email-already-in-use"===e?r&&(r.innerHTML="This email address is already in use. <br>Did you mean to sign in?"):"auth/invalid-email"===e?r&&(r.textContent="Invalid e-mail address!"):"auth/weak-password"===e?r&&(r.textContent="Your password is weaaaak!"):"auth/wrong-password"===e||"auth/user-not-found"===e?r&&(r.innerHTML="Invalid e-mail address or password. <br>Please try again!"):"auth/too-many-requests"===e&&r&&(r.innerHTML="Access to this account has been temporarily <br>disabled due to many failed login attempts.")};function signinWithGoogle(){return __awaiter$6(this,void 0,void 0,(function*(){const e=new firebase.auth.GoogleAuthProvider;e.setCustomParameters({prompt:"select_account"});try{return yield firebase.auth().signInWithPopup(e)}catch(e){const t=e.code;throw checkErrorCode(t),e}}))}function signinUser(e,t){return __awaiter$6(this,void 0,void 0,(function*(){try{return yield firebase.auth().signInWithEmailAndPassword(e,t)}catch(e){const t=e.code;throw checkErrorCode(t),e}}))}var __awaiter$5=function(e,t,r,s){return new(r||(r=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function n(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,n)}c((s=s.apply(e,t||[])).next())}))};function createRequestInit(e,t,r,s){const i={Accept:"application/json","Content-Type":r};s&&(i.Authorization="Bearer "+s);return{method:e,mode:"cors",cache:"no-cache",credentials:"omit",headers:i,redirect:"error",referrerPolicy:"no-referrer",body:t}}function postPlainText(e,t,r){return __awaiter$5(this,void 0,void 0,(function*(){return yield fetch(e,createRequestInit("POST",t,"text/plain",r))}))}function postJson(e,t,r){return __awaiter$5(this,void 0,void 0,(function*(){return yield fetch(e,createRequestInit("POST",t,"application/json",r))}))}var t$3,i$4,s$5,e$4,__awaiter$4=function(e,t,r,s){return new(r||(r=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function n(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,n)}c((s=s.apply(e,t||[])).next())}))};class ServerErrorResponse{constructor(e,t){this.code=e,this.message=t}static Create(e){return __awaiter$4(this,void 0,void 0,(function*(){if("application/json; charset=utf-8"===e.headers.get("Content-Type")){const t=yield e.json();if("number"==typeof t.c&&"string"==typeof t.m)return new ServerErrorResponse(t.c,t.m)}return new ServerErrorResponse(e.status,e.statusText)}))}}class PrintessApi{constructor(e,t){this.urlPrefix=e||"http://localhost:5000",this.token=t}postPlainText(e,t){return __awaiter$4(this,void 0,void 0,(function*(){e.startsWith("/")||(e="/"+e);return postPlainText(this.urlPrefix+e,t,this.token)}))}postJson(e,t){return __awaiter$4(this,void 0,void 0,(function*(){e.startsWith("/")||(e="/"+e);return postJson(this.urlPrefix+e,t,this.token)}))}loginWithGoogleAuthToken(e){return __awaiter$4(this,void 0,void 0,(function*(){const t=yield this.postPlainText("/jwttokenlogin",e);return 200===t.status?yield t.json():yield ServerErrorResponse.Create(t)}))}activate(e,t){return __awaiter$4(this,void 0,void 0,(function*(){const r={userId:e,activationCode:t},s=yield this.postJson("/printess/activate",JSON.stringify(r));if(200!==s.status)return yield ServerErrorResponse.Create(s)}))}loadOrders(e){return __awaiter$4(this,void 0,void 0,(function*(){const t=yield this.postJson("/orders/list",JSON.stringify(e));return 200===t.status?yield t.json():yield ServerErrorResponse.Create(t)}))}loadProductionJobs(){return __awaiter$4(this,void 0,void 0,(function*(){const e=[];return e.push({enqueuedOn:new Date,processingOn:new Date,finishedOn:new Date,failedOn:new Date,isFinalStatus:!0,errorDetails:null,jobId:"my job id",productionType:"templateId",files:[{documentName:"my document",fileSize:2e3,downloadUrl:"https://www.example.com",pages:2}]}),e}))}}class PrintessAdminApi{constructor(e,t){this.urlPrefix=e||"http://localhost:5000",this.token=t}postJson(e,t){return __awaiter$4(this,void 0,void 0,(function*(){e.startsWith("/")||(e="/"+e);const r=this.urlPrefix+e,s=yield postJson(r,t,this.token);return 200===s.status?yield s.json():yield ServerErrorResponse.Create(s)}))}postJsonVoid(e,t){return __awaiter$4(this,void 0,void 0,(function*(){e.startsWith("/")||(e="/"+e);const r=this.urlPrefix+e,s=yield postJson(r,t,this.token);if(200!==s.status)return yield ServerErrorResponse.Create(s)}))}loadUsers(e){return __awaiter$4(this,void 0,void 0,(function*(){return this.postJson("/admin/codes/load",JSON.stringify(e))}))}activateUser(e){return __awaiter$4(this,void 0,void 0,(function*(){const t={userId:e};return this.postJsonVoid("admin/user/activate",JSON.stringify(t))}))}deactivateUser(e){return __awaiter$4(this,void 0,void 0,(function*(){const t={userId:e};return this.postJsonVoid("admin/user/deactivate",JSON.stringify(t))}))}setEmailVerified(e){return __awaiter$4(this,void 0,void 0,(function*(){const t={userId:e};return this.postJsonVoid("admin/user/setemailverified",JSON.stringify(t))}))}setEmailUnverified(e){return __awaiter$4(this,void 0,void 0,(function*(){const t={userId:e};return this.postJsonVoid("admin/user/setemailunverified",JSON.stringify(t))}))}loadWhitelist(){return __awaiter$4(this,void 0,void 0,(function*(){return this.postJson("admin/whitelist/load",JSON.stringify({}))}))}addWhitelistEntry(e){return __awaiter$4(this,void 0,void 0,(function*(){const t={email:e};return this.postJsonVoid("admin/whitelist/add",JSON.stringify(t))}))}removeWhitelistEntry(e){return __awaiter$4(this,void 0,void 0,(function*(){const t={email:e};return this.postJsonVoid("admin/whitelist/remove",JSON.stringify(t))}))}}class ApiStream{constructor(e,t,r,s){switch(t){case"orders":this.endpoint="wss://"+e+"/stream/orders"}this.closeConnection=!1,this.timeout=250,this.token=r,this.onMessage=s,this.connect()}disconnect(){clearInterval(this.pingHandle),clearTimeout(this.timeoutHandle),this.closeConnection=!0,this.socket.close()}tryReconnect(){clearInterval(this.pingHandle),clearTimeout(this.timeoutHandle),this.timeoutHandle=window.setTimeout((()=>this.connect()),this.timeout)}connect(){!0!==this.closeConnection&&(this.timeout=Math.min(1.5*this.timeout,1e4),this.socket=new WebSocket(this.endpoint),this.socket.onerror=()=>{this.tryReconnect()},this.socket.onclose=()=>{this.tryReconnect()},this.socket.onopen=()=>{const e={c:adm.useAdminMode?"adminAuth":"auth",p:this.token};this.timeout=250,clearInterval(this.pingHandle),this.pingHandle=window.setInterval((()=>this.sendPing()),25e3),this.socket.send(JSON.stringify(e))},this.socket.onmessage=e=>{const t=JSON.parse(e.data);switch(t.c){case"ping":this.sendPong();break;case"pong":case"auth":break;default:this.onMessage(t)}})}sendPing(){this.socket.send(JSON.stringify({c:"ping",p:""}))}sendPong(){this.socket.send(JSON.stringify({c:"pong",p:""}))}}class OrderStream extends ApiStream{constructor(e,t,r){super(e,"orders",t,(e=>{if("order"==e.c){const t=JSON.parse(e.p);r(t)}}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$6=globalThis.trustedTypes,l$2=o$6?o$6.createPolicy("lit-html",{createHTML:e=>e}):void 0,n$5=`lit$${(Math.random()+"").slice(9)}$`,h$2="?"+n$5,r$2=`<${h$2}>`,u$2=document,c$2=(e="")=>u$2.createComment(e),d=e=>null===e||"object"!=typeof e&&"function"!=typeof e,v=Array.isArray,a$3=e=>{var t;return v(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])},f$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m$1=/>/g,p=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,$=/'/g,g=/"/g,y=/^(?:script|style|textarea)$/i,b=e=>(t,...r)=>({_$litType$:e,strings:t,values:r}),T=b(1),w=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),P=new WeakMap,V=(e,t,r)=>{var s,i;const a=null!==(s=null==r?void 0:r.renderBefore)&&void 0!==s?s:t;let o=a._$litPart$;if(void 0===o){const e=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:null;a._$litPart$=o=new C(t.insertBefore(c$2(),e),e,void 0,r)}return o.I(e),o},E=u$2.createTreeWalker(u$2,129,null,!1),M=(e,t)=>{const r=e.length-1,s=[];let i,a=2===t?"<svg>":"",o=f$1;for(let t=0;t<r;t++){const r=e[t];let n,c,l=-1,d=0;for(;d<r.length&&(o.lastIndex=d,c=o.exec(r),null!==c);)d=o.lastIndex,o===f$1?"!--"===c[1]?o=_:void 0!==c[1]?o=m$1:void 0!==c[2]?(y.test(c[2])&&(i=RegExp("</"+c[2],"g")),o=p):void 0!==c[3]&&(o=p):o===p?">"===c[0]?(o=null!=i?i:f$1,l=-1):void 0===c[1]?l=-2:(l=o.lastIndex-c[2].length,n=c[1],o=void 0===c[3]?p:'"'===c[3]?g:$):o===g||o===$?o=p:o===_||o===m$1?o=f$1:(o=p,i=void 0);const h=o===p&&e[t+1].startsWith("/>")?" ":"";a+=o===f$1?r+r$2:l>=0?(s.push(n),r.slice(0,l)+"$lit$"+r.slice(l)+n$5+h):r+n$5+(-2===l?(s.push(void 0),t):h)}const n=a+(e[r]||"<?>")+(2===t?"</svg>":"");return[void 0!==l$2?l$2.createHTML(n):n,s]};class N{constructor({strings:e,_$litType$:t},r){let s;this.parts=[];let i=0,a=0;const o=e.length-1,n=this.parts,[c,l]=M(e,t);if(this.el=N.createElement(c,r),E.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=E.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(n$5)){const r=l[a++];if(e.push(t),void 0!==r){const e=s.getAttribute(r.toLowerCase()+"$lit$").split(n$5),t=/([.?@])?(.*)/.exec(r);n.push({type:1,index:i,name:t[2],strings:e,ctor:"."===t[1]?I:"?"===t[1]?L:"@"===t[1]?R:H})}else n.push({type:6,index:i})}for(const t of e)s.removeAttribute(t)}if(y.test(s.tagName)){const e=s.textContent.split(n$5),t=e.length-1;if(t>0){s.textContent=o$6?o$6.emptyScript:"";for(let r=0;r<t;r++)s.append(e[r],c$2()),E.nextNode(),n.push({type:2,index:++i});s.append(e[t],c$2())}}}else if(8===s.nodeType)if(s.data===h$2)n.push({type:2,index:i});else{let e=-1;for(;-1!==(e=s.data.indexOf(n$5,e+1));)n.push({type:7,index:i}),e+=n$5.length-1}i++}}static createElement(e,t){const r=u$2.createElement("template");return r.innerHTML=e,r}}function S$1(e,t,r=e,s){var i,a,o,n;if(t===w)return t;let c=void 0!==s?null===(i=r.Σi)||void 0===i?void 0:i[s]:r.Σo;const l=d(t)?void 0:t._$litDirective$;return(null==c?void 0:c.constructor)!==l&&(null===(a=null==c?void 0:c.O)||void 0===a||a.call(c,!1),void 0===l?c=void 0:(c=new l(e),c.T(e,r,s)),void 0!==s?(null!==(o=(n=r).Σi)&&void 0!==o?o:n.Σi=[])[s]=c:r.Σo=c),void 0!==c&&(t=S$1(e,c.S(e,t.values),c,s)),t}class k{constructor(e,t){this.l=[],this.N=void 0,this.D=e,this.M=t}u(e){var t;const{el:{content:r},parts:s}=this.D,i=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:u$2).importNode(r,!0);E.currentNode=i;let a=E.nextNode(),o=0,n=0,c=s[0];for(;void 0!==c;){if(o===c.index){let t;2===c.type?t=new C(a,a.nextSibling,this,e):1===c.type?t=new c.ctor(a,c.name,c.strings,this,e):6===c.type&&(t=new z(a,this,e)),this.l.push(t),c=s[++n]}o!==(null==c?void 0:c.index)&&(a=E.nextNode(),o++)}return i}v(e){let t=0;for(const r of this.l)void 0!==r&&(void 0!==r.strings?(r.I(e,r,t),t+=r.strings.length-2):r.I(e[t])),t++}}class C{constructor(e,t,r,s){this.type=2,this.N=void 0,this.A=e,this.B=t,this.M=r,this.options=s}setConnected(e){var t;null===(t=this.P)||void 0===t||t.call(this,e)}get parentNode(){return this.A.parentNode}get startNode(){return this.A}get endNode(){return this.B}I(e,t=this){e=S$1(this,e,t),d(e)?e===A||null==e||""===e?(this.H!==A&&this.R(),this.H=A):e!==this.H&&e!==w&&this.m(e):void 0!==e._$litType$?this._(e):void 0!==e.nodeType?this.$(e):a$3(e)?this.g(e):this.m(e)}k(e,t=this.B){return this.A.parentNode.insertBefore(e,t)}$(e){this.H!==e&&(this.R(),this.H=this.k(e))}m(e){const t=this.A.nextSibling;null!==t&&3===t.nodeType&&(null===this.B?null===t.nextSibling:t===this.B.previousSibling)?t.data=e:this.$(u$2.createTextNode(e)),this.H=e}_(e){var t;const{values:r,_$litType$:s}=e,i="number"==typeof s?this.C(e):(void 0===s.el&&(s.el=N.createElement(s.h,this.options)),s);if((null===(t=this.H)||void 0===t?void 0:t.D)===i)this.H.v(r);else{const e=new k(i,this),t=e.u(this.options);e.v(r),this.$(t),this.H=e}}C(e){let t=P.get(e.strings);return void 0===t&&P.set(e.strings,t=new N(e)),t}g(e){v(this.H)||(this.H=[],this.R());const t=this.H;let r,s=0;for(const i of e)s===t.length?t.push(r=new C(this.k(c$2()),this.k(c$2()),this,this.options)):r=t[s],r.I(i),s++;s<t.length&&(this.R(r&&r.B.nextSibling,s),t.length=s)}R(e=this.A.nextSibling,t){var r;for(null===(r=this.P)||void 0===r||r.call(this,!1,!0,t);e&&e!==this.B;){const t=e.nextSibling;e.remove(),e=t}}}class H{constructor(e,t,r,s,i){this.type=1,this.H=A,this.N=void 0,this.V=void 0,this.element=e,this.name=t,this.M=s,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this.H=Array(r.length-1).fill(A),this.strings=r):this.H=A}get tagName(){return this.element.tagName}I(e,t=this,r,s){const i=this.strings;let a=!1;if(void 0===i)e=S$1(this,e,t,0),a=!d(e)||e!==this.H&&e!==w,a&&(this.H=e);else{const s=e;let o,n;for(e=i[0],o=0;o<i.length-1;o++)n=S$1(this,s[r+o],t,o),n===w&&(n=this.H[o]),a||(a=!d(n)||n!==this.H[o]),n===A?e=A:e!==A&&(e+=(null!=n?n:"")+i[o+1]),this.H[o]=n}a&&!s&&this.W(e)}W(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class I extends H{constructor(){super(...arguments),this.type=3}W(e){this.element[this.name]=e===A?void 0:e}}class L extends H{constructor(){super(...arguments),this.type=4}W(e){e&&e!==A?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class R extends H{constructor(){super(...arguments),this.type=5}I(e,t=this){var r;if((e=null!==(r=S$1(this,e,t,0))&&void 0!==r?r:A)===w)return;const s=this.H,i=e===A&&s!==A||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==A&&(s===A||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this.H=e}handleEvent(e){var t,r;"function"==typeof this.H?this.H.call(null!==(r=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==r?r:this.element,e):this.H.handleEvent(e)}}class z{constructor(e,t,r){this.element=e,this.type=6,this.N=void 0,this.V=void 0,this.M=t,this.options=r}I(e){S$1(this,e)}}const Z={Z:"$lit$",U:n$5,Y:h$2,q:1,X:M,tt:k,it:a$3,st:S$1,et:C,ot:H,nt:L,rt:R,lt:I,ht:z};null===(i$4=(t$3=globalThis).litHtmlPlatformSupport)||void 0===i$4||i$4.call(t$3,N,C),(null!==(s$5=(e$4=globalThis).litHtmlVersions)&&void 0!==s$5?s$5:e$4.litHtmlVersions=[]).push("2.0.0-rc.2");
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e$3=Symbol();class n$4{constructor(e,t){if(t!==e$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return t$2&&void 0===this.t&&(this.t=new CSSStyleSheet,this.t.replaceSync(this.cssText)),this.t}toString(){return this.cssText}}const s$4=e=>new n$4(e+"",e$3),o$5=new Map,r$1=(e,...t)=>{const r=t.reduce(((t,r,s)=>t+(e=>{if(e instanceof n$4)return e.cssText;if("number"==typeof e)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+e[s+1]),e[0]);let s=o$5.get(r);return void 0===s&&o$5.set(r,s=new n$4(r,e$3)),s},i$3=(e,t)=>{t$2?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const r=document.createElement("style");r.textContent=t.cssText,e.appendChild(r)}))},S=t$2?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const r of e.cssRules)t+=r.cssText;return s$4(t)})(e):e
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var s$3,e$2,h$1,r;const o$4={toAttribute(e,t){switch(t){case Boolean:e=e?"":null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let r=e;switch(t){case Boolean:r=null!==e;break;case Number:r=null===e?null:Number(e);break;case Object:case Array:try{r=JSON.parse(e)}catch(e){r=null}}return r}},n$3=(e,t)=>t!==e&&(t==t||e==e),l$1={attribute:!0,type:String,converter:o$4,reflect:!1,hasChanged:n$3};class a$2 extends HTMLElement{constructor(){super(),this.Πi=new Map,this.Πo=void 0,this.Πl=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this.Πh=null,this.u()}static addInitializer(e){var t;null!==(t=this.v)&&void 0!==t||(this.v=[]),this.v.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,r)=>{const s=this.Πp(r,t);void 0!==s&&(this.Πm.set(s,r),e.push(s))})),e}static createProperty(e,t=l$1){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const r="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,r,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(s){const i=this[e];this[t]=s,this.requestUpdate(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||l$1}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this.Πm=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of t)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const e of r)t.unshift(S(e))}else void 0!==e&&t.push(S(e));return t}static"Πp"(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this.Πg=new Promise((e=>this.enableUpdating=e)),this.L=new Map,this.Π_(),this.requestUpdate(),null===(e=this.constructor.v)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,r;(null!==(t=this.ΠU)&&void 0!==t?t:this.ΠU=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(r=e.hostConnected)||void 0===r||r.call(e))}removeController(e){var t;null===(t=this.ΠU)||void 0===t||t.splice(this.ΠU.indexOf(e)>>>0,1)}"Π_"(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this.Πi.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return i$3(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this.ΠU)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})),this.Πl&&(this.Πl(),this.Πo=this.Πl=void 0)}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this.ΠU)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})),this.Πo=new Promise((e=>this.Πl=e))}attributeChangedCallback(e,t,r){this.K(e,r)}"Πj"(e,t,r=l$1){var s,i;const a=this.constructor.Πp(e,r);if(void 0!==a&&!0===r.reflect){const o=(null!==(i=null===(s=r.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==i?i:o$4.toAttribute)(t,r.type);this.Πh=e,null==o?this.removeAttribute(a):this.setAttribute(a,o),this.Πh=null}}K(e,t){var r,s,i;const a=this.constructor,o=a.Πm.get(e);if(void 0!==o&&this.Πh!==o){const e=a.getPropertyOptions(o),n=e.converter,c=null!==(i=null!==(s=null===(r=n)||void 0===r?void 0:r.fromAttribute)&&void 0!==s?s:"function"==typeof n?n:null)&&void 0!==i?i:o$4.fromAttribute;this.Πh=o,this[o]=c(t,e.type),this.Πh=null}}requestUpdate(e,t,r){let s=!0;void 0!==e&&(((r=r||this.constructor.getPropertyOptions(e)).hasChanged||n$3)(this[e],t)?(this.L.has(e)||this.L.set(e,t),!0===r.reflect&&this.Πh!==e&&(void 0===this.Πk&&(this.Πk=new Map),this.Πk.set(e,r))):s=!1),!this.isUpdatePending&&s&&(this.Πg=this.Πq())}async"Πq"(){this.isUpdatePending=!0;try{for(await this.Πg;this.Πo;)await this.Πo}catch(e){Promise.reject(e)}const e=this.performUpdate();return null!=e&&await e,!this.isUpdatePending}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this.Πi&&(this.Πi.forEach(((e,t)=>this[t]=e)),this.Πi=void 0);let t=!1;const r=this.L;try{t=this.shouldUpdate(r),t?(this.willUpdate(r),null===(e=this.ΠU)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(r)):this.Π$()}catch(e){throw t=!1,this.Π$(),e}t&&this.E(r)}willUpdate(e){}E(e){var t;null===(t=this.ΠU)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}"Π$"(){this.L=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.Πg}shouldUpdate(e){return!0}update(e){void 0!==this.Πk&&(this.Πk.forEach(((e,t)=>this.Πj(t,this[t],e))),this.Πk=void 0),this.Π$()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var i$2,l,o$3,s$2,n$2,a$1;a$2.finalized=!0,a$2.shadowRootOptions={mode:"open"},null===(e$2=(s$3=globalThis).reactiveElementPlatformSupport)||void 0===e$2||e$2.call(s$3,{ReactiveElement:a$2}),(null!==(h$1=(r=globalThis).reactiveElementVersions)&&void 0!==h$1?h$1:r.reactiveElementVersions=[]).push("1.0.0-rc.1"),(null!==(i$2=(a$1=globalThis).litElementVersions)&&void 0!==i$2?i$2:a$1.litElementVersions=[]).push("3.0.0-rc.1");class h extends a$2{constructor(){super(...arguments),this.renderOptions={host:this},this.Φt=void 0}createRenderRoot(){var e,t;const r=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=r.firstChild),r}update(e){const t=this.render();super.update(e),this.Φt=V(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this.Φt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this.Φt)||void 0===e||e.setConnected(!1)}render(){return w}}h.finalized=!0,h._$litElement$=!0,null===(o$3=(l=globalThis).litElementHydrateSupport)||void 0===o$3||o$3.call(l,{LitElement:h}),null===(n$2=(s$2=globalThis).litElementPlatformSupport)||void 0===n$2||n$2.call(s$2,{LitElement:h});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:r,elements:s}=t;return{kind:r,elements:s,finisher(t){window.customElements.define(e,t)}}})(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,i$1=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(r){r.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}};function e$1(e){return(t,r)=>void 0!==r?((e,t,r)=>{t.constructor.createProperty(r,e)})(e,t,r):i$1(e,t)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const o$2=({finisher:e,descriptor:t})=>(r,s)=>{var i;if(void 0===s){const s=null!==(i=r.originalKey)&&void 0!==i?i:r.key,a=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(r.key)}:{...r,key:s};return null!=e&&(a.finisher=function(t){e(t,s)}),a}{const i=r.constructor;void 0!==t&&Object.defineProperty(r,s,t(s)),null==e||e(i,s)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;function o$1(e,t){return o$2({descriptor:r=>{const s={get(){var t;return null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof r?Symbol():"__"+r;s.get=function(){var r;return void 0===this[t]&&(this[t]=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e)),this[t]}}return s}})}function assertNever(e,t=""){throw new Error(t||"Unexpected object: "+e)}function createOverlayDiv(){const e=document.createElement("div");return e.style.left="0",e.style.top="0",e.style.bottom="0",e.style.right="0",e.style.position="absolute",e.style.backgroundColor="transparent",e.style.cursor="grab",e}function isMobile(e=896){return!window.matchMedia(`(min-width:  ${e+1}px)`).matches}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t$1={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i=e=>(...t)=>({_$litDirective$:e,values:t});class s$1{constructor(e){}T(e,t,r){this.Σdt=e,this.M=t,this.Σct=r}S(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n extends s$1{constructor(e){if(super(e),this.vt=A,e.type!==t$1.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===A)return this.Vt=void 0,this.vt=e;if(e===w)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.vt)return this.Vt;this.vt=e;const t=[e];return t.raw=t,this.Vt={_$litType$:this.constructor.resultType,strings:t,values:[]}}}n.directiveName="unsafeHTML",n.resultType=1;const o=i(n);var __decorate$i=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};function getIcon(e){switch(e){case"docRef":return'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"   viewBox="50 50 412 412"   xml:space="preserve"><g>    <polygon points="272,160 352,160 352,240 384,240 384,128 272,128 \t"/><polygon points="160,240 160,160 240,160 240,128 128,128 128,240 \t"/>  <polygon points="240,352 160,352 160,272 128,272 128,384 240,384 \t"/>    <polygon points="352,272 352,352 272,352 272,384 384,384 384,272 \t"/></g></svg>';case"image":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V112c0-8.822 7.178-16 16-16h416c8.822 0 16 7.178 16 16v288zM112 232c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56 25.072 56 56 56zm0-80c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm207.029 23.029L224 270.059l-31.029-31.029c-9.373-9.373-24.569-9.373-33.941 0l-88 88A23.998 23.998 0 0 0 64 344v28c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-92c0-6.365-2.529-12.47-7.029-16.971l-88-88c-9.373-9.372-24.569-9.372-33.942 0zM416 352H96v-4.686l80-80 48 48 112-112 80 80V352z"/></svg>';case"help":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path  d="M200.343 0C124.032 0 69.761 31.599 28.195 93.302c-14.213 21.099-9.458 49.674 10.825 65.054l42.034 31.872c20.709 15.703 50.346 12.165 66.679-8.51 21.473-27.181 28.371-31.96 46.132-31.96 10.218 0 25.289 6.999 25.289 18.242 0 25.731-109.3 20.744-109.3 122.251V304c0 16.007 7.883 30.199 19.963 38.924C109.139 360.547 96 386.766 96 416c0 52.935 43.065 96 96 96s96-43.065 96-96c0-29.234-13.139-55.453-33.817-73.076 12.08-8.726 19.963-22.917 19.963-38.924v-4.705c25.386-18.99 104.286-44.504 104.286-139.423C378.432 68.793 288.351 0 200.343 0zM192 480c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm50.146-186.406V304c0 8.837-7.163 16-16 16h-68.292c-8.836 0-16-7.163-16-16v-13.749c0-86.782 109.3-57.326 109.3-122.251 0-32-31.679-50.242-57.289-50.242-33.783 0-49.167 16.18-71.242 44.123-5.403 6.84-15.284 8.119-22.235 2.848l-42.034-31.872c-6.757-5.124-8.357-14.644-3.62-21.677C88.876 60.499 132.358 32 200.343 32c70.663 0 146.089 55.158 146.089 127.872 0 96.555-104.286 98.041-104.286 133.722z"></path></svg>';case"bezier":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M576 176c35.35 0 64-28.65 64-64s-28.65-64-64-64c-29.79 0-54.6 20.44-61.74 48H400V64c0-17.67-14.33-32-32-32h-96c-17.67 0-32 14.33-32 32v32H125.74C118.6 68.44 93.79 48 64 48 28.65 48 0 76.65 0 112s28.65 64 64 64c29.79 0 54.6-20.44 61.74-48h112.81c-80.61 31.51-135.13 105.79-141.27 192H64c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32h-30.73c5.76-69.41 48.06-129.54 111.08-158.25.96 16.81 14.6 30.25 31.65 30.25h96c17.05 0 30.69-13.44 31.65-30.25 63.02 28.72 105.32 88.84 111.08 158.25H480c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32h-33.27c-6.13-86.21-60.66-160.49-141.27-192h112.81c7.13 27.56 31.94 48 61.73 48zM160 448H64v-96h96v96zM64 144c-17.64 0-32-14.36-32-32s14.36-32 32-32 32 14.36 32 32-14.36 32-32 32zm304 16h-96V64h96v96zm208 288h-96v-96h96v96zm0-368c17.64 0 32 14.36 32 32s-14.36 32-32 32-32-14.36-32-32 14.36-32 32-32z"/></svg>';case"pathText":return'<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">\t<path  d="M61.78,19.86l-3.6,5.15c-0.36,0.52-1.07,0.64-1.59,0.28l-1.87-1.31c-0.52-0.36-0.64-1.07-0.28-1.59l2.29-3.28\t\tl-6.68-4.66L36.96,33.19l2.69,1.88c0.52,0.36,0.64,1.07,0.28,1.59l-1.31,1.87c-0.36,0.52-1.07,0.64-1.59,0.28l-9.13-6.38\t\tc-0.52-0.36-0.64-1.07-0.28-1.59l1.31-1.87c0.36-0.52,1.07-0.64,1.59-0.28l2.69,1.88L46.3,11.84l-6.68-4.66l-2.29,3.28\t\tc-0.36,0.52-1.07,0.64-1.59,0.28l-1.87-1.31c-0.52-0.36-0.64-1.07-0.28-1.59l3.6-5.15c0.72-1.03,2.15-1.29,3.18-0.56l20.85,14.56\t\tC62.25,17.4,62.5,18.83,61.78,19.86z"/>\t<path   d="M43.23,61.54c-0.9,0-1.75-0.54-2.11-1.42C39.48,56.1,35.49,48.5,27.18,42.8c-8.77-6.01-17.75-6.78-22.34-6.76\t\tc-0.01,0-0.02,0-0.03,0c-1.24,0-2.26-1-2.27-2.25c-0.02-1.26,0.99-2.29,2.25-2.3c5.11-0.06,15.17,0.84,24.97,7.55\t\tc9.3,6.37,13.76,14.87,15.59,19.37c0.47,1.16-0.09,2.49-1.25,2.96C43.81,61.49,43.52,61.54,43.23,61.54z"/> </svg>';case"text":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M448 48v72a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8V64H240v384h72a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H136a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h72V64H32v56a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V48a16 16 0 0 1 16-16h416a16 16 0 0 1 16 16z"/></svg>';case"magnet":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M372 32c-19.9 0-36 16.1-36 36v172c0 64-40 96-79.9 96-40 0-80.1-32-80.1-96V68c0-19.9-16.1-36-36-36H36.4C16.4 32 .2 48.3.4 68.4c.3 24.5.6 58.4.7 91.6H0v32h1.1C1 218.3.7 242 0 257.3 0 408 136.2 504 256.8 504 377.5 504 512 408 512 257.3V68c0-19.9-16.1-36-36-36H372zM36.5 68H140v92H37.1c-.1-33.4-.4-67.4-.6-92zM476 258.1c-.1 30.4-6.6 59.3-19.4 85.8-11.9 24.9-29 47.2-50.8 66.3-20.6 18.1-45.2 32.9-71.2 42.9-25.5 9.8-52.4 15-77.9 15-25.5 0-52.5-5.2-78.2-15-26.2-10-51-24.9-71.8-43-22-19.2-39.2-41.5-51.3-66.3-12.9-26.5-19.4-55.3-19.6-85.6.7-15.9 1-39.7 1.1-66.1H140v48c0 49.2 18.9 79.7 34.8 96.6 10.8 11.5 23.5 20.4 37.8 26.5 13.8 5.9 28.5 8.9 43.5 8.9s29.7-3 43.5-8.9c14.3-6.1 27-15 37.7-26.5 15.8-16.9 34.7-47.4 34.7-96.6v-48h102.9c.1 26.2.4 50.1 1.1 66zM372 160V68h103.5c-.3 24.6-.6 58.6-.6 92H372z"/></svg>';case"pointer":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M154.149 488.438l-41.915-101.865-46.788 52.8C42.432 465.345 0 448.788 0 413.5V38.561c0-34.714 41.401-51.675 64.794-26.59L309.547 274.41c22.697 24.335 6.074 65.09-27.195 65.09h-65.71l42.809 104.037c8.149 19.807-1.035 42.511-20.474 50.61l-36 15.001c-19.036 7.928-40.808-1.217-48.828-20.71zm-31.84-161.482l61.435 149.307c1.182 2.877 4.117 4.518 6.926 3.347l35.999-15c3.114-1.298 4.604-5.455 3.188-8.896L168.872 307.5h113.479c5.009 0 7.62-7.16 3.793-11.266L41.392 33.795C37.785 29.932 32 32.879 32 38.561V413.5c0 5.775 5.935 8.67 9.497 4.65l80.812-91.194z"/></svg>';case"collapseLeft":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M153.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L192.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L153 264.5c-4.6-4.7-4.6-12.3.1-17zm-128 17l117.8 116c4.7 4.7 12.3 4.7 17 0l7.1-7.1c4.7-4.7 4.7-12.3 0-17L64.7 256l102.2-100.4c4.7-4.7 4.7-12.3 0-17l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L25 247.5c-4.6 4.7-4.6 12.3.1 17z"/></svg>';case"expandLeft":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17zm128-17l-117.8-116c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17L255.3 256 153.1 356.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l117.8-116c4.6-4.7 4.6-12.3-.1-17z"/></svg>';case"edit":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M417.8 315.5l20-20c3.8-3.8 10.2-1.1 10.2 4.2V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h292.3c5.3 0 8 6.5 4.2 10.2l-20 20c-1.1 1.1-2.7 1.8-4.2 1.8H48c-8.8 0-16 7.2-16 16v352c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16V319.7c0-1.6.6-3.1 1.8-4.2zm145.9-191.2L251.2 436.8l-99.9 11.1c-13.4 1.5-24.7-9.8-23.2-23.2l11.1-99.9L451.7 12.3c16.4-16.4 43-16.4 59.4 0l52.6 52.6c16.4 16.4 16.4 43 0 59.4zm-93.6 48.4L403.4 106 169.8 339.5l-8.3 75.1 75.1-8.3 233.5-233.6zm71-85.2l-52.6-52.6c-3.8-3.8-10.2-4-14.1 0L426 83.3l66.7 66.7 48.4-48.4c3.9-3.8 3.9-10.2 0-14.1z"/></svg>';case"pen":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M493.25 56.26l-37.51-37.51C443.25 6.25 426.87 0 410.49 0s-32.76 6.25-45.26 18.74L12.85 371.12.15 485.34C-1.45 499.72 9.88 512 23.95 512c.89 0 1.78-.05 2.69-.15l114.14-12.61 352.48-352.48c24.99-24.99 24.99-65.51-.01-90.5zM126.09 468.68l-93.03 10.31 10.36-93.17 263.89-263.89 82.77 82.77-263.99 263.98zm344.54-344.54l-57.93 57.93-82.77-82.77 57.93-57.93c6.04-6.04 14.08-9.37 22.63-9.37 8.55 0 16.58 3.33 22.63 9.37l37.51 37.51c12.47 12.48 12.47 32.78 0 45.26z"/></svg>';case"pencil-ruler":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.71 368.14L379.88 245.31l49.4-49.4 68.65-68.66c18.76-18.76 18.75-49.17 0-67.93l-45.25-45.25C443.3 4.69 431 0 418.71 0s-24.59 4.69-33.97 14.07l-68.65 68.64-49.4 49.4L143.87 9.29C137.68 3.1 129.56 0 121.44 0s-16.23 3.1-22.43 9.29L9.31 99c-12.38 12.39-12.39 32.47 0 44.86l122.8 122.8-113.01 113L.34 487.11c-2.72 15.63 11.22 26.9 24.59 24.56l107.44-18.84 112.94-112.96L368.14 502.7a31.621 31.621 0 0 0 22.42 9.29c8.12 0 16.24-3.1 22.43-9.29l89.72-89.7c12.39-12.39 12.39-32.47 0-44.86zM407.36 36.7c4.09-4.09 18.6-4.09 22.69 0l45.25 45.24c6.25 6.25 6.25 16.42 0 22.67l-46.03 46.03-67.94-67.94 46.03-46zM31.93 121.63l89.51-89.52L177.39 88l-39.03 39.03c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c3.12 3.12 8.19 3.12 11.31 0l39.04-39.04 44.1 44.05-89.5 89.49L31.93 121.63zm84.96 341.43L34.5 477.51l14.37-82.37 289.83-289.8 67.94 67.94-289.75 289.78zm273.88 17.02l-122.86-122.8 89.47-89.48 44.12 44.07-39.15 39.16c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c3.12 3.12 8.19 3.12 11.31 0l39.17-39.17 55.94 55.88-89.31 89.72z"></path></svg>';case"plus-circle":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"/></svg>';case"minus":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M140 274c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h232c6.6 0 12 5.4 12 12v12c0 6.6-5.4 12-12 12H140zm364-18c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z"/></svg>';case"shapes":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 288H320c-17.67 0-32 14.33-32 32v160c0 17.67 14.33 32 32 32h160c17.67 0 32-14.33 32-32V320c0-17.67-14.33-32-32-32zm0 192H320V320h160v160zM128 256C57.31 256 0 313.31 0 384s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 224c-52.93 0-96-43.07-96-96 0-52.94 43.07-96 96-96 52.94 0 96 43.06 96 96 0 52.93-43.06 96-96 96zm378.98-278.86L400.07 18.29C392.95 6.1 380.47 0 368 0s-24.95 6.1-32.07 18.29L229.02 201.14c-14.26 24.38 3.56 54.86 32.07 54.86h213.82c28.51 0 46.33-30.48 32.07-54.86zm-27.6 20.39c-.94 1.64-2.45 2.47-4.47 2.47H261.09c-2.02 0-3.53-.83-4.47-2.47-1.21-2.12-.35-3.6.02-4.23L363.55 34.44c.95-1.62 2.44-2.44 4.45-2.44s3.5.82 4.45 2.44L479.36 217.3c.37.63 1.24 2.11.02 4.23z"/></svg>';case"vector-shape":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M486.4 128c14.14 0 25.6-11.46 25.6-25.6V25.6C512 11.46 500.54 0 486.4 0h-76.8C395.46 0 384 11.46 384 25.6V48H128V25.6C128 11.46 116.54 0 102.4 0H25.6C11.46 0 0 11.46 0 25.6v76.8C0 116.54 11.46 128 25.6 128H48v256H25.6C11.46 384 0 395.46 0 409.6v76.8C0 500.54 11.46 512 25.6 512h76.8c14.14 0 25.6-11.46 25.6-25.6V464h256v22.4c0 14.14 11.46 25.6 25.6 25.6h76.8c14.14 0 25.6-11.46 25.6-25.6v-76.8c0-14.14-11.46-25.6-25.6-25.6H464V128h22.4zM416 32h64v64h-64V32zM32 96V32h64v64H32zm64 384H32v-64h64v64zm384-64v64h-64v-64h64zm-48-32h-22.4c-14.14 0-25.6 11.46-25.6 25.6V432H128v-22.4c0-14.14-11.46-25.6-25.6-25.6H80V128h22.4c14.14 0 25.6-11.46 25.6-25.6V80h256v22.4c0 14.14 11.46 25.6 25.6 25.6H432v256z"/></svg>';case"address-card":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M512 32H64C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm32 384c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V96c0-17.6 14.4-32 32-32h448c17.6 0 32 14.4 32 32v320zm-72-128H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0-64H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0-64H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM208 288c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm46.8 144c-19.5 0-24.4 7-46.8 7s-27.3-7-46.8-7c-21.2 0-41.8 9.4-53.8 27.4C100.2 342.1 96 355 96 368.9V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-23.1c0-7 2.1-13.8 6-19.6 5.6-8.3 15.8-13.2 27.3-13.2 12.4 0 20.8 7 46.8 7 25.9 0 34.3-7 46.8-7 11.5 0 21.7 5 27.3 13.2 3.9 5.8 6 12.6 6 19.6V392c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-23.1c0-13.9-4.2-26.8-11.4-37.5-12.3-18-32.9-27.4-54-27.4z"/></svg>';case"paperclip":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.106 512c-33.076 0-66.153-12.59-91.333-37.771-50.364-50.361-50.364-132.305-.002-182.665L319.842 29.498c39.331-39.331 103.328-39.331 142.66 0 39.331 39.332 39.331 103.327 0 142.657l-222.63 222.626c-28.297 28.301-74.347 28.303-102.65 0-28.3-28.301-28.3-74.349 0-102.649l170.301-170.298c4.686-4.686 12.284-4.686 16.97 0l5.661 5.661c4.686 4.686 4.686 12.284 0 16.971l-170.3 170.297c-15.821 15.821-15.821 41.563.001 57.385 15.821 15.82 41.564 15.82 57.385 0l222.63-222.626c26.851-26.851 26.851-70.541 0-97.394-26.855-26.851-70.544-26.849-97.395 0L80.404 314.196c-37.882 37.882-37.882 99.519 0 137.401 37.884 37.881 99.523 37.882 137.404.001l217.743-217.739c4.686-4.686 12.284-4.686 16.97 0l5.661 5.661c4.686 4.686 4.686 12.284 0 16.971L240.44 474.229C215.26 499.41 182.183 512 149.106 512z"/></svg>';case"facing-pages":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M546.4,32c-2.7,0-5.5,0.4-8.3,1.2L302.5,96h0L64,35.3c-9-2.2-16.5-4.5-30.3-3S5.9,49,5.9,62v332.4c0,9.2,15.9,16.7,30.4,21.6l0,0l238.4,60.7c18,4.3,37.5,4.4,55.5,0.1L540.7,424c16.8-4.9,27.9-16.6,27.9-29.7V48C568.6,38.8,558.1,32,546.4,32z M41.6,382.4V62.5l238.7,61.8v319.9L41.6,382.4z M324.6,444.4V124.2l214.6-61.7l1.8,322.9L324.6,444.4L324.6,444.4z"/></svg>';case"page":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 512"><path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16z"/></svg>';case"cog":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M482.696 299.276l-32.61-18.827a195.168 195.168 0 0 0 0-48.899l32.61-18.827c9.576-5.528 14.195-16.902 11.046-27.501-11.214-37.749-31.175-71.728-57.535-99.595-7.634-8.07-19.817-9.836-29.437-4.282l-32.562 18.798a194.125 194.125 0 0 0-42.339-24.48V38.049c0-11.13-7.652-20.804-18.484-23.367-37.644-8.909-77.118-8.91-114.77 0-10.831 2.563-18.484 12.236-18.484 23.367v37.614a194.101 194.101 0 0 0-42.339 24.48L105.23 81.345c-9.621-5.554-21.804-3.788-29.437 4.282-26.36 27.867-46.321 61.847-57.535 99.595-3.149 10.599 1.47 21.972 11.046 27.501l32.61 18.827a195.168 195.168 0 0 0 0 48.899l-32.61 18.827c-9.576 5.528-14.195 16.902-11.046 27.501 11.214 37.748 31.175 71.728 57.535 99.595 7.634 8.07 19.817 9.836 29.437 4.283l32.562-18.798a194.08 194.08 0 0 0 42.339 24.479v37.614c0 11.13 7.652 20.804 18.484 23.367 37.645 8.909 77.118 8.91 114.77 0 10.831-2.563 18.484-12.236 18.484-23.367v-37.614a194.138 194.138 0 0 0 42.339-24.479l32.562 18.798c9.62 5.554 21.803 3.788 29.437-4.283 26.36-27.867 46.321-61.847 57.535-99.595 3.149-10.599-1.47-21.972-11.046-27.501zm-65.479 100.461l-46.309-26.74c-26.988 23.071-36.559 28.876-71.039 41.059v53.479a217.145 217.145 0 0 1-87.738 0v-53.479c-33.621-11.879-43.355-17.395-71.039-41.059l-46.309 26.74c-19.71-22.09-34.689-47.989-43.929-75.958l46.329-26.74c-6.535-35.417-6.538-46.644 0-82.079l-46.329-26.74c9.24-27.969 24.22-53.869 43.929-75.969l46.309 26.76c27.377-23.434 37.063-29.065 71.039-41.069V44.464a216.79 216.79 0 0 1 87.738 0v53.479c33.978 12.005 43.665 17.637 71.039 41.069l46.309-26.76c19.709 22.099 34.689 47.999 43.929 75.969l-46.329 26.74c6.536 35.426 6.538 46.644 0 82.079l46.329 26.74c-9.24 27.968-24.219 53.868-43.929 75.957zM256 160c-52.935 0-96 43.065-96 96s43.065 96 96 96 96-43.065 96-96-43.065-96-96-96zm0 160c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"/></svg>';case"perspective":return'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"> <path d="M396.4,128c14.1,0,25.6-11.5,25.6-25.6V25.6C422,11.5,410.5,0,396.4,0h-76.8C305.5,0,294,11.5,294,25.6V48h-86V25.6 \tC208,11.5,196.5,0,182.4,0h-76.8C91.5,0,80,11.5,80,25.6v76.8c0,14.1,11.5,25.6,25.6,25.6H128L48,384H25.6C11.5,384,0,395.5,0,409.6 \tv76.8C0,500.5,11.5,512,25.6,512h76.8c14.1,0,25.6-11.5,25.6-25.6V464h256v22.4c0,14.1,11.5,25.6,25.6,25.6h76.8 \tc14.1,0,25.6-11.5,25.6-25.6v-76.8c0-14.1-11.5-25.6-25.6-25.6H464l-90-256H396.4z M326,32h64v64h-64V32z M112,96V32h64v64H112z \t M96,480H32v-64h64V480z M480,416v64h-64v-64H480z M432,384h-22.4c-14.1,0-25.6,11.5-25.6,25.6V432H128v-22.4 \tc0-14.1-11.5-25.6-25.6-25.6H80l80-256h22.4c14.1,0,25.6-11.5,25.6-25.6V80h86v22.4c0,14.1,11.5,25.6,25.6,25.6H342L432,384z"/> </svg> ';case"style":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M344 240H104c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zm0 96H104c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM418.1 0c-5.8 0-11.8 1.8-17.3 5.7L357.3 37 318.7 9.2c-8.4-6-18.2-9.1-28.1-9.1-9.8 0-19.6 3-28 9.1L224 37 185.4 9.2C177 3.2 167.1.1 157.3.1s-19.6 3-28 9.1L90.7 37 47.2 5.7C41.8 1.8 35.8 0 29.9 0 14.4.1 0 12.3 0 29.9v452.3C0 499.5 14.3 512 29.9 512c5.8 0 11.8-1.8 17.3-5.7L90.7 475l38.6 27.8c8.4 6 18.2 9.1 28.1 9.1 9.8 0 19.6-3 28-9.1L224 475l38.6 27.8c8.4 6 18.3 9.1 28.1 9.1s19.6-3 28-9.1l38.6-27.8 43.5 31.3c5.4 3.9 11.4 5.7 17.3 5.7 15.5 0 29.8-12.2 29.8-29.8V29.9C448 12.5 433.7 0 418.1 0zM416 477.8L376 449l-18.7-13.5-18.7 13.5-38.6 27.8c-2.8 2-6 3-9.3 3-3.4 0-6.6-1.1-9.4-3.1L242.7 449 224 435.5 205.3 449l-38.6 27.8c-2.8 2-6 3-9.4 3-3.4 0-6.6-1.1-9.4-3.1L109.3 449l-18.7-13.5L72 449l-40 29.4V34.2L72 63l18.7 13.5L109.4 63 148 35.2c2.8-2 6-3 9.3-3 3.4 0 6.6 1.1 9.4 3.1L205.3 63 224 76.5 242.7 63l38.6-27.8c2.8-2 6-3 9.4-3 3.4 0 6.6 1.1 9.4 3.1L338.7 63l18.7 13.5L376 63l40-28.8v443.6zM344 144H104c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h240c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8z"/></svg>';case"story":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M288 52v24a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V52a6 6 0 0 1 6-6h276a6 6 0 0 1 6 6zM6 210h436a6 6 0 0 0 6-6v-24a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6zm0 256h436a6 6 0 0 0 6-6v-24a6 6 0 0 0-6-6H6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6zm276-164H6a6 6 0 0 0-6 6v24a6 6 0 0 0 6 6h276a6 6 0 0 0 6-6v-24a6 6 0 0 0-6-6z"/></svg>';case"plus-square":return'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 448 512"  xml:space="preserve"><path fill="#FFFFFF" d="M400,64c8.8,0,16,7.2,16,16v352c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V80c0-8.8,7.2-16,16-16H400"/><path d="M400,64c8.8,0,16,7.2,16,16v352c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V80c0-8.8,7.2-16,16-16H400 M400,32H48 C21.5,32,0,53.5,0,80v352c0,26.5,21.5,48,48,48h352c26.5,0,48-21.5,48-48V80C448,53.5,426.5,32,400,32z M340,238h-98v-98 c0-6.6-5.4-12-12-12h-12c-6.6,0-12,5.4-12,12v98h-98c-6.6,0-12,5.4-12,12v12c0,6.6,5.4,12,12,12h98v98c0,6.6,5.4,12,12,12h12 c6.6,0,12-5.4,12-12v-98h98c6.6,0,12-5.4,12-12v-12C352,243.4,346.6,238,340,238z"/></svg>';case"text-flow":return'<svg   xmlns="http://www.w3.org/2000/svg"   x="0px" y="0px" viewBox="0 0 448 512" xml:space="preserve"><path d="M48,32h352c26.5,0,48,21.5,48,48v352c0,26.5-21.5,48-48,48H48c-26.5,0-48-21.5-48-48V80C0,53.5,21.5,32,48,32z"/><path fill="#FFFFFF" d="M67.4,312.9h149.9v91.6c0,13.8,16.8,20.8,26.5,11L391.6,267c6.1-6.1,6.1-15.8,0-21.8L243.8,96.5c-9.8-9.8-26.5-2.8-26.5,11v91.6H67.4c-8.5,0-15.5,7-15.5,15.5v82.7C51.9,305.9,58.9,312.9,67.4,312.9z"/></svg>';case"exchange":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M508.485 184.485l-92.485 92c-4.687 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.687-4.686-4.687-12.284 0-16.971L452.893 192H12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h440.905l-60.946-60.444c-4.687-4.686-4.687-12.284 0-16.971l7.07-7.07c4.687-4.686 12.284-4.686 16.971 0l92.485 92c4.687 4.686 4.686 12.284 0 16.97zm-504.97 160l92.485 92c4.687 4.686 12.284 4.686 16.971 0l7.07-7.07c4.687-4.686 4.687-12.284 0-16.971L59.095 352H500c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H59.107l60.934-60.444c4.687-4.686 4.687-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.687-16.97 0l-92.485 92c-4.686 4.686-4.687 12.284 0 16.97z"></path></svg>';case"text-align-justify-justify":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439 48H7a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8zm0 384H7a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-128H7a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-128H7a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>';case"text-align-justify-left":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M439,48H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8V56C447,51.6,443.4,48,439,48z M219,432H8 c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h211c4.4,0,8-3.6,8-8v-16C227,435.6,223.4,432,219,432z M439,304H7c-4.4,0-8,3.6-8,8v16 c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8v-16C447,307.6,443.4,304,439,304z M439,176H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432 c4.4,0,8-3.6,8-8v-16C447,179.6,443.4,176,439,176z"></path></svg>';case"text-align-justify-right":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439,48H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8V56C447,51.6,443.4,48,439,48z M439,432H228 c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h211c4.4,0,8-3.6,8-8v-16C447,435.6,443.4,432,439,432z M439,304H7c-4.4,0-8,3.6-8,8v16 c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8v-16C447,307.6,443.4,304,439,304z M439,176H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432 c4.4,0,8-3.6,8-8v-16C447,179.6,443.4,176,439,176z"></path></svg>';case"text-align-justify-center":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M439,48H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8V56C447,51.6,443.4,48,439,48z M329,432H118 c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h211c4.4,0,8-3.6,8-8v-16C337,435.6,333.4,432,329,432z M439,304H7c-4.4,0-8,3.6-8,8v16 c0,4.4,3.6,8,8,8h432c4.4,0,8-3.6,8-8v-16C447,307.6,443.4,304,439,304z M439,176H7c-4.4,0-8,3.6-8,8v16c0,4.4,3.6,8,8,8h432 c4.4,0,8-3.6,8-8v-16C447,179.6,443.4,176,439,176z"></path></svg>';case"text-align-left":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M280 48H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h272a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8zm160 384H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM280 304H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h272a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm160-128H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>';case"text-align-right":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M440 48H168a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h272a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8zm0 384H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-128H168a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h272a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-128H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>';case"text-align-center":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M344 48H104a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8V56a8 8 0 0 0-8-8zm96 384H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm-96-128H104a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm96-128H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h432a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>';case"check":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"></path></svg>';case"plus":return'<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path  d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z"></path></svg>';case"arrow-left":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M231.536 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273H436c6.627 0 12-5.373 12-12v-10c0-6.627-5.373-12-12-12H60.113L238.607 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L3.515 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path></svg>';case"mirror-x":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">       <line x1="249.883" y1="30" x2="249.884" y2="32.5" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>      <line x1="249.915" y1="90.5" x2="250.1" y2="438.5" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40" stroke-dasharray="4.833 58"/>      <line x1="250.116" y1="467.5" x2="250.117" y2="470" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>    <polygon points="317.688 394.553 479.598 395.132 317.101 104.868 317.688 394.553" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-linejoin="round" stroke-width="40"/>    <polygon points="177.01 394.553 20.101 395.132 177.598 104.868 177.01 394.553" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-linejoin="round" stroke-width="40"/>  </svg>';case"arrow-up":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path   d="M4.465 263.536l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L207 92.113V468c0 6.627 5.373 12 12 12h10c6.627 0 12-5.373 12-12V92.113l178.494 178.493c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-211.05-211.05c-4.686-4.686-12.284-4.686-16.971 0L4.465 246.566c-4.687 4.686-4.687 12.284 0 16.97z"></path></svg>';case"arrow-down":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M443.5 248.5l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L241 419.9V44c0-6.6-5.4-12-12-12h-10c-6.6 0-12 5.4-12 12v375.9L28.5 241.4c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.8 4.8-12.3.1-17z"></path></svg>';case"arrow-right":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M216.464 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L387.887 239H12c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h375.887L209.393 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L233.434 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>';case"mirror-y":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">  <g>    <g>      <line x1="469.849" y1="249.967" x2="467.349" y2="249.965" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>      <line x1="409.349" y1="249.934" x2="61.349" y2="249.749" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40" stroke-dasharray="4.833 58"/>      <line x1="32.349" y1="249.734" x2="29.849" y2="249.732" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/>    </g>    <polygon points="105.297 182.161 104.717 20.252 394.982 182.748 105.297 182.161" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-linejoin="round" stroke-width="40"/>    <polygon points="105.297 322.839 104.717 479.748 394.982 322.252 105.297 322.839" fill="none" stroke="#b2b2b2" stroke-linecap="round" stroke-linejoin="round" stroke-width="40"/>  </g></svg>';case"arrows-h":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M399.959 170.585c-4.686 4.686-4.686 12.284 0 16.971L451.887 239H60.113l51.928-51.444c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0l-84.485 84c-4.686 4.686-4.686 12.284 0 16.971l84.485 84c4.686 4.686 12.284 4.686 16.97 0l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L60.113 273h391.773l-51.928 51.444c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l84.485-84c4.687-4.686 4.687-12.284 0-16.971l-84.485-84c-4.686-4.686-12.284-4.686-16.97 0l-7.07 7.071z"></path></svg>';case"arrows-v":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path  d="M181.415 399.959c-4.686-4.686-12.284-4.686-16.971 0L113 451.887V60.113l51.444 51.928c4.686 4.686 12.284 4.686 16.971 0l7.07-7.071c4.686-4.686 4.686-12.284 0-16.97l-84-84.485c-4.686-4.686-12.284-4.686-16.971 0L3.515 88c-4.686 4.686-4.686 12.284 0 16.97l7.07 7.071c4.686 4.686 12.284 4.686 16.971 0L79 60.113v391.773l-51.444-51.928c-4.686-4.686-12.284-4.686-16.971 0l-7.07 7.071c-4.686 4.686-4.686 12.284 0 16.97l84 84.485c4.686 4.687 12.284 4.687 16.971 0l84-84.485c4.686-4.686 4.686-12.284 0-16.97l-7.071-7.07z"></path></svg>';case"arrows":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path   d="M337.782 434.704l-73.297 73.782c-4.686 4.686-12.284 4.686-16.971 0l-73.296-73.782c-4.686-4.686-4.686-12.284 0-16.97l7.07-7.07c4.686-4.686 12.284-4.686 16.971 0L239 451.887h1V272H60.113v1l41.224 40.741c4.686 4.686 4.686 12.284 0 16.971l-7.071 7.07c-4.686 4.686-12.284 4.686-16.97 0L3.515 264.485c-4.686-4.686-4.686-12.284 0-16.971l73.782-73.297c4.686-4.686 12.284-4.686 16.971 0l7.071 7.071c4.686 4.686 4.686 12.284 0 16.971L60.113 239v1H240V60.113h-1l-40.741 41.224c-4.686 4.686-12.284 4.686-16.971 0l-7.07-7.071c-4.686-4.686-4.687-12.284 0-16.97l73.297-73.782c4.686-4.686 12.284-4.686 16.971 0l73.297 73.782c4.686 4.686 4.686 12.284 0 16.971l-7.071 7.071c-4.686 4.686-12.284 4.686-16.971 0L273 60.113h-1V240h179.887v-1l-41.224-40.741c-4.686-4.686-4.686-12.284 0-16.971l7.071-7.07c4.686-4.686 12.284-4.686 16.97 0l73.782 73.297c4.687 4.686 4.686 12.284 0 16.971l-73.782 73.297c-4.686 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.686-4.686-4.686-12.284 0-16.971L451.887 273v-1H272v179.887h1l40.741-41.224c4.686-4.686 12.284-4.686 16.971 0l7.07 7.071c4.686 4.685 4.686 12.283 0 16.97z"></path></svg>';case"arrows-circle":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 139.54 139.54"><path d="M139.54,69.77A69.77,69.77,0,1,1,69.77,0,69.77,69.77,0,0,1,139.54,69.77ZM87.46,41.53,69.78,9.2,52.1,41.53ZM99.23,88l32.32-17.68L99.23,52.6ZM40.47,52.6,8.15,70.27,40.47,88ZM53,99.65,70.68,132,88.36,99.65Z"/></svg>';case"text-size":return'<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M624 32H272a16 16 0 0 0-16 16v72a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V64h144v384h-72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8h-72V64h144v56a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V48a16 16 0 0 0-16-16zM304 224H16a16 16 0 0 0-16 16v56a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8v-40h112v192H88a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h144a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8h-56V256h112v40a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8v-56a16 16 0 0 0-16-16z"></path></svg>';case"text-width":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M362.31 292.69a16.12 16.12 0 0 0-11.48-4.69c-8 0-15.83 5.69-15.83 16v64H111v-64a16 16 0 0 0-16.12-16 15.63 15.63 0 0 0-11.19 4.71l-80 80a16 16 0 0 0 0 22.63l80 80A16.16 16.16 0 0 0 95.17 480c8 0 15.83-5.69 15.83-16v-64h224v64a16 16 0 0 0 16.13 16 15.64 15.64 0 0 0 11.18-4.7l80-80a16 16 0 0 0 0-22.63zM79 368v57.37L37.63 384 79 342.64zm288 57.36v-82.73L408.37 384zM431 32H15A16 16 0 0 0-1 48v72a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V64h176v192h-40a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8h-40V64h176v56a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V48a16 16 0 0 0-16-16z"></path></svg>';case"line-width":return'<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 640 512" ><path d="M506.63,354h-368c-4.42,0-8,3.58-8,8v16c0,4.42,3.58,8,8,8h368c4.42,0,8-3.58,8-8v-16C514.63,357.58,511.04,354,506.63,354z M506.63,442h-368c-4.42,0-8,3.58-8,8v16c0,4.42,3.58,8,8,8h368c4.42,0,8-3.58,8-8v-16C514.63,445.58,511.04,442,506.63,442z M506.63,266h-368c-4.42,0-8,3.58-8,8v16c0,4.42,3.58,8,8,8h368c4.42,0,8-3.58,8-8v-16C514.63,269.58,511.04,266,506.63,266z"/><path d="M208,32.01c0-14.31-17.31-21.33-27.31-11.31l-80,80c-6.25,6.25-6.25,16.38,0,22.63c0,0,0,0,0,0l80,80 c9.31,9.32,27.31,4.32,27.31-11.32v-64h224v64c0,14.29,17.31,21.31,27.31,11.29l80-80c6.25-6.25,6.25-16.38,0-22.63c0,0,0,0,0,0 l-80-80C450,11.36,432,16.36,432,32.01v64H208V32.01z"/>\t<polygon points="464,70.63 505.37,112.01 464,153.36 \t"/>\t<polygon points="176,128.01 176,153.38 134.63,112.01 176,70.65 \t"/></svg>';case"line-height":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path   d="M175 144c14.31 0 21.33-17.31 11.31-27.31l-80-80a16 16 0 0 0-22.63 0l-80 80C-5.64 126-.64 144 15 144h64v224H15C.71 368-6.31 385.31 3.71 395.31l80 80a16 16 0 0 0 22.63 0l80-80C195.65 386 190.65 368 175 368h-64V144zm-38.62 256L95 441.37 53.65 400h82.73zM79 112H53.63L95 70.63 136.36 112H79zm552 128H263a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0 128H263a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0-256H263a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>';case"palette":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M112 264c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zm32-112c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM256 0c-16.9 0-34.2 1.6-51.7 5C104.9 24.4 24.8 104.3 5.2 203.4-29.4 378.5 116.4 512 239.5 512c8.3 0 16.5-.6 24.6-1.9 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.6 113.9 397.1 0 256 0zm191.1 288h-79.7c-35.3 0-67.4 17.9-85.7 47.8-18.2 29.7-19.6 66-3.7 97.2 4.9 9.6 4.8 21.6-.1 31.3-2.4 4.6-7.9 12.6-18.7 14.3-6.3 1-12.9 1.5-19.7 1.5-54.6 0-114.1-31.3-155.5-81.6-44-53.6-60.9-120.6-47.4-188.7 17.1-86.6 87-156.2 173.9-173.2 15.2-3 30.5-4.5 45.5-4.5 123.1 0 223.6 99.9 224 222.6 0 18.3-14.8 33.3-32.9 33.3zM368 136c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24zM240 88c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24z"></path></svg>';case"brush":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M352 0H32C14.33 0 0 14.33 0 32v288c0 35.35 28.66 64 64 64h64v64c0 35.35 28.66 64 64 64s64-28.65 64-64v-64h64c35.34 0 64-28.65 64-64V32c0-17.67-14.33-32-32-32zm0 320c0 17.64-14.36 32-32 32h-96v96c0 17.64-14.36 32-32 32s-32-14.36-32-32v-96H64c-17.64 0-32-14.36-32-32v-32h320v32zm0-64H32V32h320v224z"></path></svg>';case"undo":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M20 8h10c6.627 0 12 5.373 12 12v110.625C85.196 57.047 165.239 7.715 256.793 8.001 393.18 8.428 504.213 120.009 504 256.396 503.786 393.181 392.834 504 256 504c-63.926 0-122.202-24.187-166.178-63.908-5.113-4.618-5.354-12.561-.482-17.433l7.069-7.069c4.503-4.503 11.749-4.714 16.482-.454C150.782 449.238 200.935 470 256 470c117.744 0 214-95.331 214-214 0-117.744-95.331-214-214-214-82.862 0-154.737 47.077-190.289 116H180c6.627 0 12 5.373 12 12v10c0 6.627-5.373 12-12 12H20c-6.627 0-12-5.373-12-12V20c0-6.627 5.373-12 12-12z"></path></svg>';case"redo":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M492 8h-10c-6.627 0-12 5.373-12 12v110.625C426.804 57.047 346.761 7.715 255.207 8.001 118.82 8.428 7.787 120.009 8 256.396 8.214 393.181 119.166 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.354-12.561.482-17.433l-7.069-7.069c-4.503-4.503-11.749-4.714-16.482-.454C361.218 449.238 311.065 470 256 470c-117.744 0-214-95.331-214-214 0-117.744 95.331-214 214-214 82.862 0 154.737 47.077 190.289 116H332c-6.627 0-12 5.373-12 12v10c0 6.627 5.373 12 12 12h160c6.627 0 12-5.373 12-12V20c0-6.627-5.373-12-12-12z"></path></svg>';case"copy":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM352 32.491a15.88 15.88 0 0 1 7.431 4.195l51.882 51.883A15.885 15.885 0 0 1 415.508 96H352V32.491zM288 464c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V144c0-8.822 7.178-16 16-16h80v240c0 26.51 21.49 48 48 48h112v48zm128-96c0 8.822-7.178 16-16 16H176c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v240z"></path></svg>';case"cut":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M249.52 256L446.83 58.83a3.996 3.996 0 0 0 0-5.65c-12.5-12.5-32.76-12.5-45.25 0L224.06 230.56l-48.64-48.61C185.88 166.57 192 148 192 128c0-53.02-42.98-96-96-96S0 74.98 0 128s42.98 96 96 96c20.01 0 38.58-6.12 53.96-16.6l48.63 48.6-48.63 48.6C134.58 294.12 116.01 288 96 288c-53.02 0-96 42.98-96 96s42.98 96 96 96 96-42.98 96-96c0-20-6.12-38.57-16.58-53.95l48.64-48.61 177.52 177.38c12.5 12.5 32.76 12.5 45.25 0a3.996 3.996 0 0 0 0-5.65L249.52 256zM96 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm0 256c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"></path></svg>';case"paste":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M433.941 193.941l-51.882-51.882A48 48 0 0 0 348.118 128H320V80c0-26.51-21.49-48-48-48h-66.752C198.643 13.377 180.858 0 160 0s-38.643 13.377-45.248 32H48C21.49 32 0 53.49 0 80v288c0 26.51 21.49 48 48 48h80v48c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V227.882a48 48 0 0 0-14.059-33.941zm-22.627 22.627a15.888 15.888 0 0 1 4.195 7.432H352v-63.509a15.88 15.88 0 0 1 7.431 4.195l51.883 51.882zM160 30c9.941 0 18 8.059 18 18s-8.059 18-18 18-18-8.059-18-18 8.059-18 18-18zM48 384c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h66.752c6.605 18.623 24.389 32 45.248 32s38.643-13.377 45.248-32H272c8.822 0 16 7.178 16 16v48H176c-26.51 0-48 21.49-48 48v208H48zm352 96H176c-8.822 0-16-7.178-16-16V176c0-8.822 7.178-16 16-16h144v72c0 13.2 10.8 24 24 24h72v208c0 8.822-7.178 16-16 16z"></path></svg>';case"object-ungroup":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M564 224c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v20h-96v-32h20c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12h-72c-6.627 0-12 5.373-12 12v20H96V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v72c0 6.627 5.373 12 12 12h20v160H12c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-20h96v32h-20c-6.627 0-12 5.373-12 12v72c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-20h224v20c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-20V224h20zm-180 96v32h-32v-32h32zM352 64h32v32h-32V64zM32 64h32v32H32V64zm32 288H32v-32h32v32zm20-64H64V128h20c6.627 0 12-5.373 12-12V96h224v20c0 6.627 5.373 12 12 12h20v160h-20c-6.627 0-12 5.373-12 12v20H96v-20c0-6.627-5.373-12-12-12zm140 160h-32v-32h32v32zm256-52v20H256v-20c0-6.627-5.373-12-12-12h-20v-32h96v20c0 6.627 5.373 12 12 12h72c6.627 0 12-5.373 12-12v-72c0-6.627-5.373-12-12-12h-20v-96h96v20c0 6.627 5.373 12 12 12h20v160h-20c-6.627 0-12 5.373-12 12zm64 52h-32v-32h32v32zm-32-256v-32h32v32h-32z"></path></svg>';case"trash":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M296 432h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zm-160 0h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8zM440 64H336l-33.6-44.8A48 48 0 0 0 264 0h-80a48 48 0 0 0-38.4 19.2L112 64H8a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h24v368a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V96h24a8 8 0 0 0 8-8V72a8 8 0 0 0-8-8zM171.2 38.4A16.1 16.1 0 0 1 184 32h80a16.1 16.1 0 0 1 12.8 6.4L296 64H152zM384 464a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16V96h320zm-168-32h16a8 8 0 0 0 8-8V152a8 8 0 0 0-8-8h-16a8 8 0 0 0-8 8v272a8 8 0 0 0 8 8z"></path></svg>';case"remove-format":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M192 64h176l-44.56 133.68 25.35 20L400 64h176v56a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V48a16 16 0 0 0-16-16H176a16 16 0 0 0-16 16v21l32 25.19zm152 384h-72l44.55-133.64-25.35-20L240 448h-72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm293 37.31L23 1.8A7.86 7.86 0 0 0 11.79 3l-10 12.5A7.92 7.92 0 0 0 3 26.71l614 483.52a7.91 7.91 0 0 0 11.18-1.23l10-12.5a7.83 7.83 0 0 0-1.18-11.18z"></path></svg>';case"clipboard":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path  d="M336 64h-88.6c.4-2.6.6-5.3.6-8 0-30.9-25.1-56-56-56s-56 25.1-56 56c0 2.7.2 5.4.6 8H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 32c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm160 432c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16h48v20c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12V96h48c8.8 0 16 7.2 16 16z"></path></svg>';case"undo-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path></svg>';case"redo-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z"></path></svg>';case"copy-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg>';case"trash-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>';case"search-plus":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M304 192v32c0 6.6-5.4 12-12 12h-56v56c0 6.6-5.4 12-12 12h-32c-6.6 0-12-5.4-12-12v-56h-56c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h56v-56c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v56h56c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>';case"search-minus":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M304 192v32c0 6.6-5.4 12-12 12H124c-6.6 0-12-5.4-12-12v-32c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm201 284.7L476.7 505c-9.4 9.4-24.6 9.4-33.9 0L343 405.3c-4.5-4.5-7-10.6-7-17V372c-35.3 27.6-79.7 44-128 44C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208c0 48.3-16.4 92.7-44 128h16.3c6.4 0 12.5 2.5 17 7l99.7 99.7c9.3 9.4 9.3 24.6 0 34zM344 208c0-75.2-60.8-136-136-136S72 132.8 72 208s60.8 136 136 136 136-60.8 136-136z"></path></svg>';case"search-light":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path></svg>';case"save":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path></svg>';case"cloud-upload-alt":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z"></path></svg>';case"folder-open-solid":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"></path></svg>';case"tint":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path  d="M205.22 22.09C201.21 7.53 188.61 0 175.97 0c-12.35 0-24.74 7.2-29.19 22.09C100.01 179.85 0 222.72 0 333.91 0 432.35 78.72 512 176 512s176-79.65 176-178.09c0-111.75-99.79-153.34-146.78-311.82zM176 480c-79.4 0-144-65.54-144-146.09 0-48.36 23-81.32 54.84-126.94 29.18-41.81 65.34-93.63 89.18-170.91 23.83 77.52 60.06 129.31 89.3 171.08C297.06 252.52 320 285.3 320 333.91 320 414.46 255.4 480 176 480zm0-64c-44.12 0-80-35.89-80-80 0-8.84-7.16-16-16-16s-16 7.16-16 16c0 61.75 50.25 112 112 112 8.84 0 16-7.16 16-16s-7.16-16-16-16z"></path></svg>';case"warp-arc":return'<svg   xmlns="http://www.w3.org/2000/svg"  \t viewBox="0 0 500 500">\t<path  d="M499.63,193.5c0.11-0.55,0.19-1.09,0.25-1.64c0.07-0.6,0.11-1.18,0.12-1.78c0-0.54-0.03-1.07-0.07-1.6\t\tc-0.05-0.59-0.11-1.17-0.22-1.74c-0.1-0.55-0.24-1.08-0.39-1.62c-0.16-0.55-0.32-1.09-0.53-1.62c-0.2-0.52-0.44-1.03-0.7-1.54\t\tc-0.27-0.52-0.55-1.03-0.86-1.53c-0.29-0.45-0.6-0.88-0.94-1.31c-0.4-0.51-0.82-1-1.27-1.47c-0.18-0.19-0.31-0.4-0.5-0.58\t\tC477.8,161.3,387.48,82.52,250.17,81.35c-123.44-0.96-206.3,59.51-244.62,95.7l0.05,0.05c-5.33,5.02-7.22,13-4.05,20.05\t\tl95.09,211.08c2.95,6.54,9.38,10.41,16.11,10.41c1.91,0,3.82-0.41,5.69-1.06c0.5-0.14,0.99-0.3,1.48-0.48\t\tc0.02-0.01,0.05-0.01,0.07-0.02c0.02-0.01,0.03-0.02,0.05-0.03c1.85-0.71,3.63-1.67,5.22-3.03\t\tc18.75-16.07,59.09-42.87,119.53-42.87c0.52,0,1.06,0,1.59,0.01c68.59,0.54,113.14,35.8,121.38,42.87\t\tc3.33,2.86,7.42,4.25,11.49,4.25c4.97,0,9.92-2.09,13.41-6.16c0.1-0.11,0.16-0.24,0.25-0.36c1.33-1.34,2.52-2.86,3.4-4.65\t\tl101.98-209.48c0.12-0.25,0.17-0.51,0.28-0.76c0.25-0.57,0.46-1.14,0.64-1.73C499.36,194.59,499.51,194.05,499.63,193.5z\t\t M427.08,263.19c-20.18-12.43-77.33-42.87-159.73-47.76l-0.21-98.02c98.24,6.05,167.02,54.67,193.5,76.84L427.08,263.19z\t\t M373.06,374.17c-20.68-13.58-57.18-32.34-105.43-37.1l-0.19-86.22c78.64,5.12,130.51,35.41,144.1,44.27L373.06,374.17z\t\t M119.86,373.82L84,294.23c25.41-16.52,75.22-41.27,148.11-43.9l0.19,85.87C181.86,338.86,144.12,357.24,119.86,373.82z\t\t M232.04,215.02c-77.69,2.57-132.59,28.04-162.68,46.69L39.03,194.4c35.34-30.74,100.27-73.02,192.79-77.29L232.04,215.02z"/></svg>';case"warp-flag":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 427.46"><path d="M433,52.28C294.33-147,155.67,301.81,17,105.6,8.16,93.17,1,87.15,1,96q-.49,118.6-1,237.2c0,8.8,7.16,29.31,16,41.95,138.67,199.31,277.33-249.53,416-53.32,8.84,12.43,16,18.45,16,9.57q.5-118.6,1-237.2C449,85.44,441.84,64.92,433,52.28ZM33,157.45c58.67,62.83,117.33,19.1,176-33.25q-.5,44.45-1,88.89c-58.67,52.25-117.33,95.32-176,31.28Q32.49,200.92,33,157.45ZM32,363.37v-87c58.67,64,117.33,21,176-31.28v87C149.33,384.34,90.67,427.41,32,363.37ZM416,270c-58.67-62.83-117.33-19.1-176,33.25v-87c58.67-52.35,117.33-96.08,176-33.25Zm0-119c-58.67-62.83-117.33-19.1-176,33.25q.5-44.44,1-88.89C299.67,43.12,358.33.05,417,64.09Q416.51,107.55,416,151Z"/></svg>';case"warp-bulge":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 546.15"><path d="M438.38,118.66C341.05-39.17,109.3-39.55,11.32,117.53,5.06,127.76.63,143.83.63,152.5Q.31,273.61,0,392.57c0,8.59,4.4,24.63,10.62,34.91C108,585.32,339.7,585.7,437.68,428.62c6.25-10.23,10.68-26.3,10.69-35q.31-121.11.63-240.08C449,145,444.6,128.94,438.38,118.66ZM23.21,141C68.84,94.1,136.58,68.78,206.1,65q-.58,88.5-1.18,176.93c-69.5.61-137.1,4.43-182.49,11.49Q22.82,197.52,23.21,141ZM22.43,404.4V294c45.39,7.51,113,11.58,182.49,12.23V481.09C135.42,477.05,67.82,451.49,22.43,404.4Zm403.36.8c-45.63,46.84-113.37,72.16-182.89,76V306.25c69.52-.61,137.26-4.64,182.89-12.11Zm0-151.91c-45.63-7-113.37-10.81-182.89-11.38q.58-88.46,1.18-176.85c69.5,4,137.1,29.6,182.49,76.69Q426.18,197.18,425.79,253.29Z"/></svg>';case"warp-arc-lower":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 408.57"><path d="M433,0H17A16.17,16.17,0,0,0,1,16.07Q.32,136.07,0,255c.05,8.7,4.44,24.75,10.62,34.91C108,447.75,339.7,448.13,437.68,291.05c6.22-10.12,10.64-26.15,10.67-34.9Q448.52,135.54,449,16A16.11,16.11,0,0,0,433,0ZM31.84,36.42A1533.22,1533.22,0,0,0,208.66,48.17q-1,66.22-2,132.42c-63.47-2.34-126.09-17.16-178.88-44.46Q29.77,86.45,31.84,36.42Zm-8.28,234.7q1.53-49.34,3.07-98.69c51.22,34.58,114.9,53.35,179.64,56.32l-1,130.92C137.06,355,70.51,325.5,23.56,271.12Zm401.08.93c-47.18,54.09-113.84,83.32-182.09,87.7l-.93-130.95C306.38,226,370.13,207.42,421.49,173Zm-4.3-135.46c-52.9,27.16-115.58,41.84-179.06,44q.08-66.25.08-132.47A1533.93,1533.93,0,0,0,418.13,36.3Q419.19,86.28,420.34,136.59Z"/></svg>';case"warp-arc-upper":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 408.57"><path d="M438.38,118.66C341.05-39.17,109.3-39.55,11.32,117.53,5.1,127.64.68,143.68.65,152.42Q.49,273,0,392.57a16.1,16.1,0,0,0,16,16H432a16.16,16.16,0,0,0,16-16.07q.66-120,1-238.93C449,144.87,444.56,128.83,438.38,118.66Zm-414,17.87C71.54,82.44,138.2,53.2,206.45,48.82q-.12,66.27-.17,132.51c-64.7,2.95-128.35,21.6-179.61,55.95Q25.55,187.08,24.36,136.53Zm6.51,235.74q-1.53-49.35-3.07-98.69c52.83-27.07,115.42-41.77,178.85-44.09l1,130.93A1531.72,1531.72,0,0,0,30.87,372.27Zm386.29-.12a1533.24,1533.24,0,0,0-176.82-11.74l.93-131c63.44,2.18,126.09,16.74,179,43.67Q418.73,322.64,417.16,372.15Zm4.3-135.46c-51.41-34.17-115.13-52.64-179.85-55.41q1-66.19,2.11-132.38c68.22,4.66,134.77,34.18,181.72,88.55Q423.49,186.9,421.46,236.69Z"/></svg>';case"warp-pit-upper":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 261.48"><path d="M437,6.82c-107.81,136.38-316,136.71-424.26,1C5.88-.94.76-1.44.74,7.48Q.48,126,0,245.48a15.84,15.84,0,0,0,16,16H432a15.83,15.83,0,0,0,16-15.93q.62-119.07,1-239.07C449-2.47,443.87-2,437,6.82ZM26.55,51c50.09,46.73,114.73,72,180.54,75.77q-.21,24.76-.37,49.55C143.54,173.81,81.16,157.7,28,128Q27.32,89.38,26.55,51ZM31.16,233.2q-1.15-38.44-2.3-76.9C83.18,179.69,144.77,192.39,207,194.4q.38,24.53.74,49C148.11,242.9,88.65,239.49,31.16,233.2Zm385.7.11c-57.51,6.25-117,9.64-176.6,10.14l.69-49c62.23-1.88,123.87-14.46,178.26-37.73Q418,195,416.86,233.31Zm3.21-104.79C366.83,158.05,304.39,174,241.2,176.4q.9-24.81,1.83-49.65c65.8-4,130.35-29.53,180.27-76.51Q421.71,89.53,420.07,128.52Z"/></svg>';case"warp-pit-lower":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 261.48"><path d="M433,0H17A15.84,15.84,0,0,0,1,15.94Q.37,135,0,255c0,8.95,5.13,8.44,12-.34,107.81-136.37,316-136.7,424.26-1,6.88,8.74,12,9.24,12,.33q.25-118.55.74-238A15.84,15.84,0,0,0,433,0ZM32.14,28.18c57.52-6.26,117-9.64,176.6-10.15q-.86,24.8-1.76,49.62c-62.25,2-123.87,14.83-178.14,38.42Q30.46,67,32.14,28.18ZM25.7,211.25q1.14-38.46,2.29-76.9c53.11-29.88,115.52-46.1,178.72-48.66q-.37,24.53-.74,49.05C140.17,138.76,75.62,164.27,25.7,211.25Zm396.75-.8c-50.09-46.74-114.73-72-180.54-75.78q-.34-24.51-.7-49c63.22,2.4,125.68,18.47,178.89,48.19Q421.27,172.15,422.45,210.45Zm-3.21-104.79c-54.36-23.46-116-36.14-178.28-38q.18-24.78.31-49.58c59.62.54,119.08,3.95,176.57,10.24Q418.52,67.13,419.24,105.66Z"/></svg>';case"warp-fish":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 427.46"><path d="M433,104.18C294.33,303.49,155.67-145.35,17,50.86,8.16,63.62,1,84.09,1,92.64Q.51,214.52,0,333.23c0,8.44,7.16,29,16,41.95,138.67,199.31,277.33-249.53,416-53.32,8.84,12.76,16,18.9,16,9.78q.5-117.12,1-237.41C449,85,441.84,91.22,433,104.18Zm-400-30c58.67-48,117.33-14.59,176,25.4q-.5,48.19-1,97c-58.67-6-117.33-10.9-176-3.58Q32.49,133.91,33,74.16ZM32,352.48V235.85c58.67,7.8,117.33,2.55,176-3.81v96.54C149.33,368.49,90.67,401.39,32,352.48Zm384-71.32c-58.67-48-117.33-14.59-176,25.4v-78c58.67-6.37,117.33-11.7,176-4.05Zm0-77.53c-58.67,7.19-117.33,2.19-176-3.8q.5-39.42,1-78.25c58.67,39.91,117.33,72.81,176,23.9Q416.51,174.91,416,203.63Z"/></svg>';case"warp-squeeze":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 449 254.41"><path d="M435.46,4.49c-119.78,106.69-301,106.94-421,.76C6.75-1.66.83-.52.83,8.43Q.41,126.84,0,246.7c0,9,5.9,10.17,13.54,3.22,119.78-106.69,301-106.94,421.05-.77,7.66,6.92,13.58,5.78,13.58-3.17q.42-118.41.83-238.28C449-1.3,443.1-2.46,435.46,4.49ZM28.53,43.05C81.24,74.72,144.05,91.83,207.68,94.4q-.54,13.92-1.09,27.88c-63.62-.4-126.36-3-179-7.76Q28.08,78.55,28.53,43.05Zm-.9,168.85V140.71c52.6-5.08,115.34-7.83,179-8.27v27.62C143,162.79,80.23,180.07,27.63,211.9Zm392.84-.54C367.76,179.69,305,162.58,241.32,160V132.43c63.63.41,126.44,3.14,179.15,8.19Zm0-96.76c-52.71,4.74-115.52,7.31-179.15,7.69q.54-14,1.09-27.94c63.62-2.73,126.36-20,179-51.84Q420.92,78.78,420.47,114.6Z"/></svg>';case"settings":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352zM200 160h-40v-32c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v32H88c-13.2 0-24 10.8-24 24v48c0 13.2 10.8 24 24 24h40v116c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12V256h40c13.2 0 24-10.8 24-24v-48c0-13.2-10.8-24-24-24zm-8 64H96v-32h96v32zm168 32h-40V128c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v128h-40c-13.2 0-24 10.8-24 24v48c0 13.2 10.8 24 24 24h40v20c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12v-20h40c13.2 0 24-10.8 24-24v-48c0-13.2-10.8-24-24-24zm-8 64h-96v-32h96v32z"></path></svg>';case"slash":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M637 485.3L23 1.8C19.6-1 14.5-.5 11.8 3l-10 12.5C-1 19-.4 24 3 26.7l614 483.5c3.5 2.8 8.5 2.2 11.2-1.2l10-12.5c2.8-3.5 2.3-8.5-1.2-11.2z"></path></svg>';case"empty":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"></svg>';case"warp-mug":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M480 64H64a32 32 0 0 0-32 32v256a96 96 0 0 0 96 96h192a96 96 0 0 0 96-96v-96h64a96 96 0 0 0 0-192zm-96 288a64.07 64.07 0 0 1-64 64H128a64.07 64.07 0 0 1-64-64V96h320zm96-128h-64V96h64a64 64 0 0 1 0 128z"></path></svg>';case"close-square":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352zm-97.2-245.3L249.5 256l69.3 69.3c4.7 4.7 4.7 12.3 0 17l-8.5 8.5c-4.7 4.7-12.3 4.7-17 0L224 281.5l-69.3 69.3c-4.7 4.7-12.3 4.7-17 0l-8.5-8.5c-4.7-4.7-4.7-12.3 0-17l69.3-69.3-69.3-69.3c-4.7-4.7-4.7-12.3 0-17l8.5-8.5c4.7-4.7 12.3-4.7 17 0l69.3 69.3 69.3-69.3c4.7-4.7 12.3-4.7 17 0l8.5 8.5c4.6 4.7 4.6 12.3 0 17z"></path></svg>';case"close":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path  d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path></svg>';case"square":return'<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h352c8.8 0 16 7.2 16 16v352z"></path></svg>';case"mesh":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.725 198.725"  ><path d="M194.828,0H3.897C1.745,0,0,1.745,0,3.897v190.931c0,2.154,1.745,3.897,3.897,3.897h190.931\nc2.152,0,3.897-1.743,3.897-3.897V3.897C198.724,1.745,196.979,0,194.828,0z M135.336,7.793 c-1.794,7.887-5.085,24.174-6.073,41.085c-5.646-1.308-11.613-2.843-17.707-4.412c-16.791-4.322-34.076-8.731-48.241-9.287\nc3.851-12.645,8.947-23.169,11.117-27.386H135.336z M140.168,115.415c-8.484,1.236-14.626,4.939-20.562,8.586 c-8.348,5.126-16.984,10.43-33.881,10.43c-2.384,0-4.852-0.069-7.364-0.185c-2.669-15.64-8.165-33.341-16.343-52.032\nc-5.081-11.614-3.973-26.095-0.807-39.32c13.572,0.173,31.259,4.706,48.402,9.118c6.676,1.719,13.188,3.386,19.369,4.787 c-0.104,10.231,0.852,20.238,3.727,28.288C136.221,94.92,138.646,105.339,140.168,115.415z M7.793,7.793h57.904\nc-2.904,5.97-7.32,15.966-10.605,27.516C35.965,37.001,17.199,47.237,7.793,53.121V7.793z M7.793,62.433 c5.587-3.795,25.301-16.304,45.27-19.007c-3.023,13.934-3.764,29.158,1.815,41.912c7.629,17.44,12.812,33.863,15.476,48.384\nc-26.972-2.26-56.834-9.239-62.561-10.618C7.793,123.104,7.793,62.433,7.793,62.433z M72.105,161.319 c-1.425,14.256-6.164,25.315-8.246,29.612H7.793v-59.814c9.096,2.155,37.708,8.563,63.77,10.525\nC72.441,148.805,72.691,155.46,72.105,161.319z M72.436,190.931c2.574-5.996,6.162-16.211,7.425-28.836\tc0.6-6.013,0.396-12.767-0.413-19.996c2.131,0.081,4.228,0.125,6.277,0.125c19.101,0,29.119-6.153,37.961-11.583\nc5.622-3.453,10.651-6.485,17.484-7.505c1.621,15.093,1.182,28.805-0.8,37.726c-2.739,12.323-0.178,23.604,1.981,30.069H72.436z M190.93,190.932h-40.296v-0.001c-1.803-4.587-5.412-15.983-2.659-28.379c2.102-9.457,2.599-23.901,0.949-39.754\nc17.307,0.457,35.295,4.937,42.006,6.781V190.932z M190.93,121.497c-8.373-2.215-25.866-6.237-42.98-6.513 c-1.577-10.817-4.146-22.005-7.901-32.519c-2.405-6.734-3.285-15.201-3.281-24.043c6.291,1.197,12.11,1.975,17.145,1.975\nc16.583,0,30.355-0.984,37.017-1.562V121.497z M190.931,51.013c-6.188,0.551-20.108,1.591-37.017,1.591\tc-4.817,0-10.594-0.821-16.929-2.074c0.958-18.006,4.769-35.902,6.36-42.737h47.586V51.013z"/></svg>\n';case"crop":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M160 16c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v80H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h80v224c0 17.67 14.33 32 32 32h192v-64H160V16zm336 336h-80V128c0-17.67-14.33-32-32-32H192v64h160v336c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16v-80h80c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>';case"fill-image":return'<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 500 500"  >\t<rect x="1" y="181.66" width="36" height="32.33"/>\t<rect x="1" y="234.32" width="36" height="32.33"/>\t<rect x="1" y="286.98" width="36" height="32.33"/>\t<path d="M464.23,359.08h-25.8l-88.08-195.22c-1.87-4.15-5.42-7.37-9.8-8.63c-0.11-0.03-0.22-0.06-0.33-0.09\t\tc-10.21-2.76-20.98,1.95-26.48,10.98l-95.27,156.41l-39.93-58.07c-1.84-2.68-4.36-4.86-7.38-6.07c-0.37-0.15-0.74-0.28-1.12-0.41\t\tc-10.57-3.57-22.18,1.18-27.92,10.74l-54.44,90.61H37v-22H1v59h89v-0.29h320.23v0.03h90v-59h-36V359.08z"/>\t<path d="M37,141.33h27.48c4.94,28.88,30.08,50.86,60.36,50.86c30.8,0,56.29-22.74,60.6-52.34h21.31v-36h-26.5\t\tc0-0.01-0.01-0.03-0.01-0.03L69.07,104.3c0,0-0.01,0.02-0.01,0.03H1v59h36V141.33z"/>\t<polygon points="410.23,104.33 410.23,141.33 464.23,141.08 464.23,163.08 500.23,163.08 500.23,104.08 \t"/>\t<rect x="464" y="234.16" width="36" height="32.33"/>\t<rect x="464" y="181.5" width="36" height="32.33"/>\t<rect x="464" y="286.82" width="36" height="32.33"/>\t<rect x="350.91" y="103.85" width="28.83" height="36"/>\t<rect x="293.25" y="103.85" width="28.83" height="36"/>\t<rect x="235.58" y="103.85" width="28.83" height="36"/></svg>';case"fit-image":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"  xml:space="preserve">\t<path  d="M360.19,104H139.15c-20.2,0-36.58,16.38-36.58,36.58v219.49c0,20.2,16.38,36.58,36.58,36.58h221.04\t\tc20.2,0,36.58-16.38,36.58-36.58V140.58C396.77,120.38,380.39,104,360.19,104z M355.62,360.07h-211.9c-2.53,0-4.57-2.05-4.57-4.57\t\tV145.15c0-2.53,2.05-4.57,4.57-4.57h211.9c2.53,0,4.57,2.05,4.57,4.57V355.5C360.19,358.03,358.14,360.07,355.62,360.07z\t\t M199.42,178.07c-12.8,0-23.18,10.38-23.18,23.18s10.38,23.18,23.18,23.18c12.8,0,23.18-10.38,23.18-23.18\t\tS212.22,178.07,199.42,178.07z M174.73,323.49h148.88v-4.97l-38.7-89.7c-3.57-3.57-9.36-3.57-12.93,0l-34.08,58.09l-20.12-30.12\t\tc-3.57-3.57-9.36-3.57-12.93,0l-30.11,63.12V323.49z"/>\t<path  d="M36,319.31H0v-32.33h36V319.31z M36,266.65H0v-32.33h36V266.65z M36,213.99H0v-32.33h36V213.99z"/>\t<polygon  points="464.23,337.08 500.23,337.08 500.23,396.08 410.23,396.08 420.23,359.08 464.23,359.08 \t"/>\t<polygon  points="36,163.33 0,163.33 0,104.33 89,104.33 79,141.33 36,141.33 \t"/>\t<polygon  points="36,337.33 0,337.33 0,396.33 89,396.33 79,359.33 36,359.33 \t"/>\t<polygon  points="464.23,163.08 500.23,163.08 500.23,104.08 410.23,104.33 420.23,141.33 464.23,141.08 \t"/>\t<path  d="M500,319.15h-36v-32.33h36V319.15z M500,266.49h-36v-32.33h36V266.49z M500,213.83h-36V181.5h36V213.83z"/></svg>';case"vertical-align-bottom-baseline":return'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" \n               x="0px" y="0px" viewBox="0 0 512 512"   >\n           <path d="M177.9,463.9l-3.1-26.3h-1.3c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3\n                  c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25C75,258,100.8,250.7,128,250.7c65.9,0,82,43.5,82,85.3v78\n                  c0,18.1,0.9,35.8,3.6,50H177.9z M172.1,357.5c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9\n                  c1.3-3.9,2.2-8.2,2.2-12.1V357.5z"/>\n                  <path d="M459,255.4c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2\n                  l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3H418c-12,19.4-35.2,34.9-68.6,34.9\n                  c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9l1.8-31.4H459z M418.4,337.7\n                  c0-6.5-0.4-12.1-2.2-17.2c-7.1-22-26.3-40.1-54.8-40.1c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75\n                  c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V337.7z"/>\n          <rect x="33" y="481.6" width="209.8" height="28.8"/>\n          </svg>';case"vertical-align-bottom":return'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" c\n               c viewBox="0 0 512 512">\n               <path d="M177.9,423.3l-3.1-26.3h-1.3c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3\n                   c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25c17.8-11.2,43.7-18.5,70.8-18.5c65.9,0,82,43.5,82,85.3v78\n                   c0,18.1,0.9,35.8,3.6,50H177.9z M172.1,316.9c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9\n                   c1.3-3.9,2.2-8.2,2.2-12.1V316.9z"/>\n               <path d="M459,214.9c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2\n                   l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3H418c-12,19.4-35.2,34.9-68.6,34.9\n                   c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9l1.8-31.4H459z M418.4,297.1\n                   c0-6.5-0.4-12.1-2.2-17.2c-7.1-22-26.3-40.1-54.8-40.1c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75\n                   c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V297.1z"/>\n           </svg>';case"vertical-align-center":return'<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  \n               viewBox="0 0 512 512"  >\n             <path d="M183.9,317.1l-3.1-26.3h-1.3c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3\n                 c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25c17.8-11.2,43.7-18.5,70.8-18.5c65.9,0,82,43.5,82,85.3v78\n                 c0,18.1,0.9,35.8,3.6,50H183.9z M178.1,210.7c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9\n                 c1.3-3.9,2.2-8.2,2.2-12.1V210.7z"/>\n             <path d="M465,108.7c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2\n                 l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3H424c-12,19.4-35.2,34.9-68.6,34.9\n                 c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9l1.8-31.4H465z M424.4,190.9\n                 c0-6.5-0.4-12.1-2.2-17.2c-7.1-22-26.3-40.1-54.8-40.1c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75\n                 c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V190.9z"/>\n         </svg>';case"vertical-align-center-baseline":return'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" \n               viewBox="0 0 512 512" >\n           \n              <path d="M173.9,284.1l-3.1-26.3h-1.3c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3\n                  c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25C71,78.2,96.8,70.9,124,70.9c65.9,0,82,43.5,82,85.3v78\n                  c0,18.1,0.9,35.8,3.6,50H173.9z M168.1,177.7c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9\n                  c1.3-3.9,2.2-8.2,2.2-12.1V177.7z"/>\n              <path d="M455,75.7c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2\n                  l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3H414c-12,19.4-35.2,34.9-68.6,34.9\n                  c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9l1.8-31.4H455z M414.4,157.9\n                  c0-6.5-0.4-12.1-2.2-17.2c-7.1-22-26.3-40.1-54.8-40.1c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75\n                  c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V157.9z"/>\n           \n          <rect x="35.5" y="295.3" width="209.8" height="28.8"/>\n          </svg>\n          ';case"vertical-align-top":return'<svg version="1.1"   xmlns="http://www.w3.org/2000/svg" \n               viewBox="0 0 512 512"  ><path d="M177.5,216.5l-3.1-26.3H173c-12,16.4-35.2,31-65.9,31c-43.7,0-65.9-29.7-65.9-59.9c0-50.4,46.3-78,129.6-77.5v-4.3\n                     c0-17.2-4.9-48.2-49-48.2c-20,0-41,6-56.1,15.5l-8.9-25c17.8-11.2,43.7-18.5,70.8-18.5c65.9,0,82,43.5,82,85.3v78\n                     c0,18.1,0.9,35.8,3.6,50H177.5z M171.7,110.1c-42.8-0.9-91.3,6.5-91.3,47c0,24.6,16.9,36.2,37,36.2c28.1,0,45.9-17.2,52.1-34.9\n                     c1.3-3.9,2.2-8.2,2.2-12.1V110.1z"/>\n                 <path d="M458.6,8c-0.9,15.1-1.8,31.9-1.8,57.3v121c0,47.8-9.8,77.1-30.7,95.2c-20.9,19-51.2,25-78.4,25c-25.8,0-54.3-6-71.7-17.2\n                     l9.8-28.9c14.3,8.6,36.5,16.4,63.3,16.4c40.1,0,69.5-20.2,69.5-72.8v-23.3h-0.9c-12,19.4-35.2,34.9-68.6,34.9\n                     c-53.5,0-91.8-43.9-91.8-101.7c0-70.6,47.7-110.7,97.1-110.7c37.4,0,57.9,19,67.3,36.2h0.9L424.3,8H458.6z M418,90.2\n                     c0-6.5-0.4-12.1-2.2-17.2C408.7,51,389.5,33,361,33c-37.4,0-64.1,30.6-64.1,78.8c0,40.9,21.4,75,63.7,75\n                     c24.1,0,45.9-14.6,54.3-38.8c2.2-6.5,3.1-13.8,3.1-20.2V90.2z"/>\n              \n             </svg>\n             ';case"warning":return'<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>';case"effects":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M224 96l16-32 32-16-32-16-16-32-16 32-32 16 32 16 16 32zM80 160l26.66-53.33L160 80l-53.34-26.67L80 0 53.34 53.33 0 80l53.34 26.67L80 160zm0-96c8.84 0 16 7.16 16 16s-7.16 16-16 16-16-7.16-16-16 7.16-16 16-16zm352 224l-26.66 53.33L352 368l53.34 26.67L432 448l26.66-53.33L512 368l-53.34-26.67L432 288zm0 96c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm70.63-306.04L434.04 9.37C427.79 3.12 419.6 0 411.41 0s-16.38 3.12-22.63 9.37L9.37 388.79c-12.5 12.5-12.5 32.76 0 45.25l68.59 68.59c6.25 6.25 14.44 9.37 22.63 9.37s16.38-3.12 22.63-9.37l379.41-379.41c12.49-12.5 12.49-32.76 0-45.26zM100.59 480L32 411.41l258.38-258.4 68.6 68.6L100.59 480zm281.02-281.02l-68.6-68.6L411.38 32h.03L480 100.59l-98.39 98.39z"></path></svg>';case"robot":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M192,416h64V384H192ZM576,224H544V192a95.99975,95.99975,0,0,0-96-96H336V16a16,16,0,0,0-32,0V96H192a95.99975,95.99975,0,0,0-96,96v32H64a31.99908,31.99908,0,0,0-32,32V384a32.00033,32.00033,0,0,0,32,32H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a32.00033,32.00033,0,0,0,32-32V256A31.99908,31.99908,0,0,0,576,224ZM96,384H64V256H96Zm416,32a64.18916,64.18916,0,0,1-64,64H192a64.18916,64.18916,0,0,1-64-64V192a63.99942,63.99942,0,0,1,64-64H448a63.99942,63.99942,0,0,1,64,64Zm64-32H544V256h32ZM416,192a64,64,0,1,0,64,64A64.07333,64.07333,0,0,0,416,192Zm0,96a32,32,0,1,1,32-32A31.97162,31.97162,0,0,1,416,288ZM384,416h64V384H384Zm-96,0h64V384H288ZM224,192a64,64,0,1,0,64,64A64.07333,64.07333,0,0,0,224,192Zm0,96a32,32,0,1,1,32-32A31.97162,31.97162,0,0,1,224,288Z"></path></svg>';case"microchip":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M368 0H144c-26.51 0-48 21.49-48 48v416c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zm16 464c0 8.822-7.178 16-16 16H144c-8.822 0-16-7.178-16-16V48c0-8.822 7.178-16 16-16h224c8.822 0 16 7.178 16 16v416zm128-358v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42V88h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zm0 96v12a6 6 0 0 1-6 6h-18v6a6 6 0 0 1-6 6h-42v-48h42a6 6 0 0 1 6 6v6h18a6 6 0 0 1 6 6zM30 376h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6zm0-96h42v48H30a6 6 0 0 1-6-6v-6H6a6 6 0 0 1-6-6v-12a6 6 0 0 1 6-6h18v-6a6 6 0 0 1 6-6z"></path></svg>';case"record":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path   d="M160 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S64 42.98 64 96v160c0 53.02 42.98 96 96 96zM96 96c0-35.29 28.71-64 64-64s64 28.71 64 64v160c0 35.29-28.71 64-64 64s-64-28.71-64-64V96zm216 96h-16c-4.42 0-8 3.58-8 8v56c0 73.46-62.2 132.68-136.73 127.71C83.3 379.18 32 319.61 32 251.49V200c0-4.42-3.58-8-8-8H8c-4.42 0-8 3.58-8 8v50.34c0 83.39 61.65 156.12 144 164.43V480H72c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h176c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8h-72v-65.01C256.71 406.9 320 338.8 320 256v-56c0-4.42-3.58-8-8-8z"></path></svg>';case"play":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6zm-16.2 55.1l-352 208C45.6 483.9 32 476.6 32 464V47.9c0-16.3 16.4-18.4 24.1-13.8l352 208.1c10.5 6.2 10.5 21.4.1 27.6z"></path></svg>';case"running":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M396 216h-14.53l-9.04-27.12c-8.11-24.31-24.18-44-44.5-58.04C347 117.91 360 96.73 360 72c0-39.7-32.3-72-72-72s-72 32.3-72 72c0 8.34 1.56 16.28 4.2 23.72-8.62-1.98-17.37-3.22-26.13-3.22-20.55 0-40.8 5.53-58.64 16l-46.19 24.07C64.7 147.31 56.7 179.3 71.4 203.88c9.39 15.62 26.48 25.27 44.63 25.27 8.98 0 17.82-2.33 25.65-6.76l18.95-9.85L101.75 344H52c-28.67 0-52 23.33-52 52s23.33 52 52 52h62.91c33.65 0 63.95-19.99 77.2-50.92l19.32-39.74 43.7 19.63-19.64 68.74c-7.87 27.58 8.15 56.42 35.71 64.29 4.8 1.34 9.55 2 14.31 2 23.07 0 43.62-15.5 49.98-37.69l24.4-85.4c7.11-24.86 2.02-50.92-12.01-71.12 6.2 1.45 12.63 2.21 19.2 2.21H396c28.67 0 52-23.33 52-52s-23.33-52-52-52zM288 32c22.09 0 40 17.91 40 40s-17.91 40-40 40-40-17.91-40-40 17.91-40 40-40zM162.69 384.48A51.915 51.915 0 0 1 114.91 416H52c-11.05 0-20-8.95-20-20s8.95-20 20-20h62.91c4.8 0 9.12-2.86 11.03-7.28l26.72-56.88c6.9 12.72 17.07 23.57 29.98 31.43l-19.95 41.21zM396 288h-28.94a51.94 51.94 0 0 1-49.33-35.55l-13.59-40.8c-2.83-8.46-8.21-15.43-15-20.67l-41.47 103.69 52.78 23.72c23.41 10.55 35.72 37.09 28.67 61.73l-24.39 85.38c-2.52 8.78-10.52 14.5-19.22 14.5-1.83 0-3.67-.25-5.52-.77-10.61-3.03-16.77-14.11-13.73-24.73l24.39-85.38c1.64-5.69-1.22-11.81-6.62-14.25 0 0-85.82-39.04-88.71-41.16-17.8-13.09-25.42-36.48-18.51-57.88l37.75-87.57s-16.9-3.77-20.5-3.77c-7.88 0-15.59 2.14-22.5 6.31l-45.25 23.52a20.137 20.137 0 0 1-10.29 2.84c-6.8 0-13.41-3.46-17.16-9.7-5.67-9.48-2.61-21.77 6.86-27.45l45.26-23.52c13.24-7.93 28.06-11.99 43.1-11.99 6.83 0 13.72.84 20.51 2.53l68.19 17.05c28 6.98 50.17 27.52 59.31 54.92l13.59 40.8c1.64 4.91 6.22 8.2 11.39 8.2H396c11.05 0 20 8.95 20 20s-8.95 20-20 20z"></path></svg>';case"rotator":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"></path></svg>';case"lock-closed":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M224 420c-11 0-20-9-20-20v-64c0-11 9-20 20-20s20 9 20 20v64c0 11-9 20-20 20zm224-148v192c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48h16v-64C64 71.6 136-.3 224.5 0 312.9.3 384 73.1 384 161.5V224h16c26.5 0 48 21.5 48 48zM96 224h256v-64c0-70.6-57.4-128-128-128S96 89.4 96 160v64zm320 240V272c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16h352c8.8 0 16-7.2 16-16z"></path></svg>';case"lock-open":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M480.5 0C392-.3 320 71.6 320 160v64H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48h-48v-62.6c0-70.7 56.7-129 127.3-129.4C550.2 31.6 608 89.2 608 160v84c0 6.6 5.4 12 12 12h8c6.6 0 12-5.4 12-12v-82.5C640 73.1 568.9.3 480.5 0zM400 256c8.8 0 16 7.2 16 16v192c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h352z"></path></svg>';case"user-lock-closed":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M48 480a16 16 0 0 1-16-16v-41.6A102.47 102.47 0 0 1 134.4 320c19.6 0 39.1 16 89.6 16s70-16 89.6-16c2.7 0 5.3.6 7.9.8a79.45 79.45 0 0 1 13.1-30.7 132.34 132.34 0 0 0-21.1-2.1c-28.7 0-42.5 16-89.6 16s-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464a48 48 0 0 0 48 48h288.4a78.34 78.34 0 0 1-14.8-32zm176-224A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm0-224a96 96 0 1 1-96 96 96.15 96.15 0 0 1 96-96zm272 336a32 32 0 1 0 32 32 32 32 0 0 0-32-32zm96-80h-16v-48a80 80 0 0 0-160 0v48h-16a48 48 0 0 0-48 48v128a48 48 0 0 0 48 48h192a48 48 0 0 0 48-48V336a48 48 0 0 0-48-48zm-144-48a48 48 0 0 1 96 0v48h-96zm160 224a16 16 0 0 1-16 16H400a16 16 0 0 1-16-16V336a16 16 0 0 1 16-16h192a16 16 0 0 1 16 16z"></path></svg>';case"user-crown-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M352 0l-64 32-64-32-64 32L96 0v96h256V0zm-38.4 304h-16.71c-22.24 10.18-46.88 16-72.89 16s-50.65-5.82-72.89-16H134.4C60.17 304 0 364.17 0 438.4V464c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48v-25.6c0-74.23-60.17-134.4-134.4-134.4zM224 272c70.69 0 128-57.31 128-128v-16H96v16c0 70.69 57.31 128 128 128z"></path></svg>';case"user-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>';case"user-lock-opened":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M592,288H448V208.79c0-26.32,20.86-48.34,47.18-48.78A48,48,0,0,1,544,208v8a8,8,0,0,0,8,8h16a8,8,0,0,0,8-8v-7c0-43.28-34-79.51-77.26-80.95A80,80,0,0,0,416,208v80H400a48,48,0,0,0-48,48V464a48,48,0,0,0,48,48H592a48,48,0,0,0,48-48V336A48,48,0,0,0,592,288Zm16,176a16,16,0,0,1-16,16H400a16,16,0,0,1-16-16V336a16,16,0,0,1,16-16H592a16,16,0,0,1,16,16ZM224,256A128,128,0,1,0,96,128,128,128,0,0,0,224,256Zm0-224a96,96,0,1,1-96,96A96,96,0,0,1,224,32ZM496,368a32,32,0,1,0,32,32A32,32,0,0,0,496,368ZM48,480a16,16,0,0,1-16-16V422.4A102.47,102.47,0,0,1,134.4,320c19.6,0,39.1,16,89.6,16s70-16,89.6-16c2.7,0,5.3.6,7.9.8a79.38,79.38,0,0,1,13.1-30.7,132.22,132.22,0,0,0-21.1-2.1c-28.7,0-42.5,16-89.6,16s-60.8-16-89.6-16C60.2,288,0,348.2,0,422.4V464a48,48,0,0,0,48,48H336.4a78.37,78.37,0,0,1-14.8-32Z"></path></svg>';case"link":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M301.148 394.702l-79.2 79.19c-50.778 50.799-133.037 50.824-183.84 0-50.799-50.778-50.824-133.037 0-183.84l79.19-79.2a132.833 132.833 0 0 1 3.532-3.403c7.55-7.005 19.795-2.004 20.208 8.286.193 4.807.598 9.607 1.216 14.384.481 3.717-.746 7.447-3.397 10.096-16.48 16.469-75.142 75.128-75.3 75.286-36.738 36.759-36.731 96.188 0 132.94 36.759 36.738 96.188 36.731 132.94 0l79.2-79.2.36-.36c36.301-36.672 36.14-96.07-.37-132.58-8.214-8.214-17.577-14.58-27.585-19.109-4.566-2.066-7.426-6.667-7.134-11.67a62.197 62.197 0 0 1 2.826-15.259c2.103-6.601 9.531-9.961 15.919-7.28 15.073 6.324 29.187 15.62 41.435 27.868 50.688 50.689 50.679 133.17 0 183.851zm-90.296-93.554c12.248 12.248 26.362 21.544 41.435 27.868 6.388 2.68 13.816-.68 15.919-7.28a62.197 62.197 0 0 0 2.826-15.259c.292-5.003-2.569-9.604-7.134-11.67-10.008-4.528-19.371-10.894-27.585-19.109-36.51-36.51-36.671-95.908-.37-132.58l.36-.36 79.2-79.2c36.752-36.731 96.181-36.738 132.94 0 36.731 36.752 36.738 96.181 0 132.94-.157.157-58.819 58.817-75.3 75.286-2.651 2.65-3.878 6.379-3.397 10.096a163.156 163.156 0 0 1 1.216 14.384c.413 10.291 12.659 15.291 20.208 8.286a131.324 131.324 0 0 0 3.532-3.403l79.19-79.2c50.824-50.803 50.799-133.062 0-183.84-50.802-50.824-133.062-50.799-183.84 0l-79.2 79.19c-50.679 50.682-50.688 133.163 0 183.851z"></path></svg>';case"stroke-cap-round":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M64,29.58V0H32C14.33,0,0,14.33,0,32v0c0,17.67,14.33,32,32,32h32V34.51H39.27v4.87H24.59V24.7h14.68v4.88H64z"/></svg>';case"stroke-cap-projecting":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >\t<polygon  points="64,29.58 64,0 0,0 0,64 64,64 64,34.51 39.27,34.51 39.27,39.38 24.59,39.38 24.59,24.7 39.27,24.7 39.27,29.58 \t"/></svg>';case"stroke-cap-butt":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="39.27,29.54 63.92,29.54 64,29.54 64,0 31.96,0 31.96,21.66 21.51,21.66 21.51,42.34 31.96,42.34 31.96,64 64,64 64,34.47 63.92,34.47 39.27,34.47 39.19,34.47 39.19,39.34 31.96,39.34 24.51,39.34 24.51,24.66 31.96,24.66 39.19,24.66 39.19,29.54 \t"/></svg>';case"stroke-align-center":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="0,64 64,64 64,45.54 30.34,45.54 30.34,50.41 15.66,50.41 15.66,35.73 20.54,35.73 20.54,0 0,0 "/><polygon  points="30.34,35.73 30.34,40.61 64,40.61 64,23.23 42.77,23.23 42.77,0 25.47,0 25.47,35.73 "/></svg>';case"stroke-align-inside":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="17.54,32.73 15.66,32.73 12.66,32.73 12.66,53.41 33.34,53.41 33.34,48.54 64,48.54 64,45.54 30.34,45.54 30.34,50.41 15.66,50.41 15.66,35.73 20.54,35.73 20.54,0 17.54,0 \t"/><polygon points="30.34,35.73 30.34,40.61 64,40.61 64,16.23 48.77,16.23 48.77,0 25.47,0 25.47,35.73 \t"/></svg>';case"stroke-align-outside":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >\t<polygon points="0,64 64,64 64,45.54 30.34,45.54 30.34,50.41 15.66,50.41 15.66,35.73 20.54,35.73 20.54,0 0,0 "/>\t<polygon points="64,37.61 33.34,37.61 33.34,35.73 33.34,32.73 30.34,32.73 28.47,32.73 28.47,0 25.47,0 25.47,35.73 30.34,35.73 30.34,40.61 64,40.61"/></svg>';case"stroke-join-miter":return'<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve"><polygon  points="0,0 0,64 29.46,64 29.46,39.34 24.59,39.34 24.59,39.34 24.59,24.66 39.27,24.66 39.27,24.66 39.27,29.54 64,29.54 64,0 "/><polygon points="39.27,39.34 39.27,39.34 39.27,39.34 34.39,39.34 34.39,64 48.77,64 48.77,48.77 64,48.77 64,34.47 39.27,34.47"/></svg>';case"stroke-join-round":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" ><path  d="M0,36.75V64h29.46V39.34h-4.87v0V24.66h14.68h0v4.88H64V0H36.75C17.56,0,0,17.56,0,36.75z"/><polygon points="39.27,39.34 39.27,39.34 39.27,39.34 34.39,39.34 34.39,64 48.77,64 48.77,48.77 64,48.77 64,34.47 39.27,34.47 "/>';case"stroke-join-bevel":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon class="st0" points="0,32 0,64 29.46,64 29.46,39.34 24.59,39.34 24.59,39.34 24.59,24.66 39.27,24.66 39.27,24.66 39.27,29.54 64,29.54 64,0 32,0 "/><polygon class="st0" points="39.27,39.34 39.27,39.34 39.27,39.34 34.39,39.34 34.39,64 48.77,64 48.77,48.77 64,48.77 64,34.47 39.27,34.47 "/></svg>';case"ruler":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M635.7 165.8L556.1 27.9C550.2 17.7 539.5 12 528.5 12c-5.4 0-10.9 1.4-15.9 4.3L15.9 302.8C.7 311.5-4.5 331 4.3 346.2L83.9 484c5.9 10.2 16.6 15.9 27.6 15.9 5.4 0 10.9-1.4 15.9-4.3L624 209.1c15.3-8.6 20.5-28.1 11.7-43.3zM111.5 468.2L31.9 330.3l69-39.8 43.8 75.8c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9l-43.8-75.8 55.2-31.8 27.9 48.2c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9l-27.9-48.2 55.2-31.8 43.8 75.8c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9L294 179.1l55.2-31.8 27.9 48.2c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9l-27.9-48.2L432 99.5l43.8 75.8c2.2 3.8 7.1 5.1 10.9 2.9l13.8-8c3.8-2.2 5.1-7.1 2.9-10.9l-43.8-75.8 69-39.8 79.6 137.8-496.7 286.7z"></path></svg>';case"no-wrap":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >\t<rect y="57.5"  width="64" height="5"/>\t<rect x="18.32" y="34.5" class="st0" width="27.36" height="9"/>\t<rect x="18.32" y="48.5" class="st0" width="27.36" height="3.42"/>\t<rect x="47.68" y="43.5" class="st0" width="16.32" height="5"/>\t<rect y="43.5"  width="16.32" height="5"/>\t<rect x="18.32" y="20.5" class="st0" width="27.36" height="9"/>\t<rect x="47.68" y="29.5" class="st0" width="16.32" height="5"/>\t<rect y="29.5"  width="16.32" height="5"/>\t<rect x="18.32" y="12.15" class="st0" width="27.36" height="3.35"/>\t<rect y="15.5"  width="16.32" height="5"/><rect x="47.68" y="15.5"  width="16.32" height="5"/><rect y="1.5" width="64" height="5"/><rect x="12.32" y="11.15" width="39.36" height="41.77"/></svg>';case"wrap-both-sides":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"> <rect y="57.5" class="st0" width="64" height="5"/><path class="st0" d="M14.47,43.5H0v5h17.26C16.17,46.99,15.23,45.31,14.47,43.5z"/><path class="st0" d="M49.53,43.5c-0.76,1.81-1.7,3.49-2.79,5H64v-5H49.53z"/>\t<path class="st0" d="M12.21,32.08c0-0.87,0.04-1.73,0.11-2.58H0v5h12.31C12.24,33.7,12.21,32.89,12.21,32.08z"/><path class="st0" d="M51.68,29.5c0.07,0.85,0.11,1.71,0.11,2.58c0,0.82-0.03,1.63-0.1,2.42H64v-5H51.68z"/>\t<path class="st0" d="M17.36,15.5H0v5h14.53C15.31,18.69,16.26,17.01,17.36,15.5z"/>\t<path class="st0" d="M46.64,15.5c1.1,1.51,2.05,3.19,2.83,5H64v-5H46.64z"/><rect y="1.5" class="st0" width="64" height="5"/>\t<ellipse class="st0" cx="32" cy="32.07" rx="12.54" ry="15.18"/></svg>';case"printess-wand":return'<svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 64 64">\t<path   d="M58.08,21.21l-7.11-7.55l2.19-10.13c0.16-0.74-0.12-1.52-0.71-1.99s-1.41-0.57-2.1-0.24l-9.38,4.42L32.01,0.5\t\tc-0.66-0.38-1.48-0.36-2.11,0.06c-0.63,0.42-0.98,1.17-0.88,1.92l1.31,10.29l-7.73,6.91c-0.57,0.51-0.8,1.29-0.59,2.03\t\tc0.2,0.73,0.81,1.29,1.55,1.43l7.4,1.4L5.41,55.96c-0.87,1.07-0.71,2.65,0.36,3.52c0.46,0.38,1.02,0.56,1.58,0.56\t\tc0.73,0,1.45-0.32,1.94-0.92l25.6-31.48l3.05,6.92c0.31,0.7,0.98,1.16,1.74,1.19c0.03,0,0.06,0,0.09,0c0.73,0,1.4-0.4,1.75-1.04\t\tl4.98-9.09l10.32-1.05c0.76-0.08,1.41-0.58,1.67-1.29C58.76,22.56,58.6,21.76,58.08,21.21z M45.06,21.74\t\tc-0.66,0.07-1.24,0.45-1.55,1.03l-3.54,6.46l-2.97-6.74c-0.27-0.6-0.81-1.04-1.46-1.16l-7.24-1.37l5.49-4.91\t\tc0.49-0.44,0.73-1.09,0.65-1.74L33.5,6l6.37,3.71c0.57,0.33,1.27,0.36,1.86,0.08l6.66-3.14l-1.56,7.2\t\tc-0.14,0.64,0.05,1.31,0.5,1.79L52.39,21L45.06,21.74z"/>\t<polygon   points="12.92,5.15 10.56,9.47 6.25,11.83 10.56,14.19 12.92,18.5 15.28,14.19 19.6,11.83 15.28,9.47 \t\t12.92,5.15 \t"/>\t<path  d="M49.4,40.73c1.38,0,2.77,1,2.77,2.63c0,1.81-1.7,2.63-2.63,2.63s-2.63-0.9-2.63-2.63\t\tc0-2.29,2.02-2.63,2.63-2.63 M49.54,34.48l-3.14,5.74l-5.74,3.14l5.74,3.14l3.14,5.74l3.14-5.74l5.74-3.14l-5.74-3.14L49.54,34.48\t\tL49.54,34.48z"/></svg>';case"shopping-cart":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192z"></path></svg>';case"shopping-cart-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>';case"shopping-cart-add":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M551.991 64H129.28l-8.329-44.423C118.822 8.226 108.911 0 97.362 0H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h78.72l69.927 372.946C150.305 416.314 144 431.42 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-17.993-7.435-34.24-19.388-45.868C506.022 391.891 496.76 384 485.328 384H189.28l-12-64h331.381c11.368 0 21.177-7.976 23.496-19.105l43.331-208C578.592 77.991 567.215 64 551.991 64zM240 448c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm224 32c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32zm38.156-192H171.28l-36-192h406.876l-40 192zm-106.641-75.515l-51.029 51.029c-4.686 4.686-12.284 4.686-16.971 0l-51.029-51.029c-7.56-7.56-2.206-20.485 8.485-20.485H320v-52c0-6.627 5.373-12 12-12h8c6.627 0 12 5.373 12 12v52h35.029c10.691 0 16.045 12.926 8.486 20.485z"></path></svg>';case"folder-plus":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M464,128H272L217.37,73.37A32,32,0,0,0,194.74,64H48A48,48,0,0,0,0,112V400a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V176A48,48,0,0,0,464,128Zm16,272a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V112A16,16,0,0,1,48,96H194.74l54.63,54.63A32,32,0,0,0,272,160H464a16,16,0,0,1,16,16ZM339.5,272h-68V204a12,12,0,0,0-12-12h-8a12,12,0,0,0-12,12v68h-68a12,12,0,0,0-12,12v8a12,12,0,0,0,12,12h68v68a12,12,0,0,0,12,12h8a12,12,0,0,0,12-12V304h68a12,12,0,0,0,12-12v-8A12,12,0,0,0,339.5,272Z"></path></svg>';case"eye-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>';case"eye-solid-slash":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path></svg>';case"lock-closed-solid":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>';case"print-solid":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"></path></svg>';case"carret-down-solid":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>';case"carret-right-solid":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path  d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path></svg>';case"font":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M424 448h-36.6L247.13 42.77A16 16 0 0 0 232 32h-16a16 16 0 0 0-15.12 10.77L60.6 448H24a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8H94.48l44.3-128h170.44l44.31 128H312a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zM149.86 288L224 73.8 298.14 288z"></path></svg>';case"check-square":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path  d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 32c8.823 0 16 7.178 16 16v352c0 8.822-7.177 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h352m-34.301 98.293l-8.451-8.52c-4.667-4.705-12.265-4.736-16.97-.068l-163.441 162.13-68.976-69.533c-4.667-4.705-12.265-4.736-16.97-.068l-8.52 8.451c-4.705 4.667-4.736 12.265-.068 16.97l85.878 86.572c4.667 4.705 12.265 4.736 16.97.068l180.48-179.032c4.704-4.667 4.735-12.265.068-16.97z"></path></svg>';case"user-circle":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"></path></svg>';case"send-back":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M175 64H79a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm-16 96H95V96h64zm288-16v80h32v-80a48 48 0 0 0-48-48H287v32h144a16 16 0 0 1 16 16zm112 176h-96a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-96a16 16 0 0 0-16-16zm-16 96h-64v-64h64zm48-160H431a48 48 0 0 0-48 48v160a48 48 0 0 0 48 48h160a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48zm16 208a16 16 0 0 1-16 16H431a16 16 0 0 1-16-16V304a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16zm-416-96v-80h-32v80a48 48 0 0 0 48 48h144v-32H207a16 16 0 0 1-16-16zm64-160V48a48 48 0 0 0-48-48H47A48 48 0 0 0-1 48v160a48 48 0 0 0 48 48h160a48 48 0 0 0 48-48zm-224 0V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v160a16 16 0 0 1-16 16H47a16 16 0 0 1-16-16z"></path></svg>';case"send-backward":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M464,160H208a48,48,0,0,0-48,48V464a48,48,0,0,0,48,48H464a48,48,0,0,0,48-48V208A48,48,0,0,0,464,160Zm16,304a16,16,0,0,1-16,16H208a16,16,0,0,1-16-16V208a16,16,0,0,1,16-16H464a16,16,0,0,1,16,16ZM32,304V48A16,16,0,0,1,48,32H304a16,16,0,0,1,16,16v80h32V48A48,48,0,0,0,304,0H48A48,48,0,0,0,0,48V304a48,48,0,0,0,48,48h80V320H48A16,16,0,0,1,32,304Zm400-80H240a16,16,0,0,0-16,16V432a16,16,0,0,0,16,16H432a16,16,0,0,0,16-16V240A16,16,0,0,0,432,224ZM416,416H256V256H416Z"></path></svg>';case"bring-front":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M32 208V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v16h32V48a48 48 0 0 0-48-48H48A48 48 0 0 0 0 48v160a48 48 0 0 0 48 48h80v-32H48a16 16 0 0 1-16-16zm448 160V144a48 48 0 0 0-48-48H208a48 48 0 0 0-48 48v224a48 48 0 0 0 48 48h224a48 48 0 0 0 48-48zm-288 0V144a16 16 0 0 1 16-16h224a16 16 0 0 1 16 16v224a16 16 0 0 1-16 16H208a16 16 0 0 1-16-16zm400-112h-80v32h80a16 16 0 0 1 16 16v160a16 16 0 0 1-16 16H432a16 16 0 0 1-16-16v-16h-32v16a48 48 0 0 0 48 48h160a48 48 0 0 0 48-48V304a48 48 0 0 0-48-48zM464 448h96a16 16 0 0 0 16-16v-96a16 16 0 0 0-16-16h-48v32h32v64h-48.41a79.76 79.76 0 0 1-41.25 28.43A15.66 15.66 0 0 0 464 448zM176 64H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h48v-32H96V96h48.41a79.76 79.76 0 0 1 41.25-28.43A15.66 15.66 0 0 0 176 64z"></path></svg>';case"bring-forward":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 304V48a48 48 0 0 0-48-48H48A48 48 0 0 0 0 48v256a48 48 0 0 0 48 48h256a48 48 0 0 0 48-48zM48 48h256v256H48zm416 112h-80v48h80v256H208v-80h-48v80a48 48 0 0 0 48 48h256a48 48 0 0 0 48-48V208a48 48 0 0 0-48-48zM240 416a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V256a16 16 0 0 0-16-16h-32v144H240z"></path></svg>';case"distort":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path   d="M483.55,227.55H462c-50.68,0-76.07-61.27-40.23-97.11L437,115.19A28.44,28.44,0,0,0,396.8,75L381.56,90.22A55.74,55.74,0,0,1,341.74,107c-29.24,0-57.29-22.7-57.29-57V28.44a28.45,28.45,0,0,0-56.9,0V50c0,34.29-28.05,57-57.29,57a55.7,55.7,0,0,1-39.82-16.77L115.2,75A28.44,28.44,0,0,0,75,115.19l15.25,15.25c35.84,35.84,10.45,97.11-40.23,97.11H28.45a28.45,28.45,0,1,0,0,56.89H50c50.68,0,76.07,61.28,40.23,97.12L75,396.8A28.45,28.45,0,0,0,115.2,437l15.24-15.25A55.7,55.7,0,0,1,170.25,405c29.25,0,57.3,22.7,57.3,57v21.54a28.45,28.45,0,0,0,56.9,0V462c0-34.29,28.05-57,57.3-57a55.7,55.7,0,0,1,39.81,16.77L396.8,437A28.45,28.45,0,0,0,437,396.8l-15.25-15.24c-35.84-35.84-10.45-97.12,40.23-97.12h21.54a28.45,28.45,0,1,0,0-56.89ZM379.88,307.32c-10.64,25.71-8.94,53.3,3.84,76.44a86.92,86.92,0,0,0-42-10.75A89.42,89.42,0,0,0,256,437.11,89.42,89.42,0,0,0,170.25,373a86.92,86.92,0,0,0-42,10.75c12.78-23.14,14.48-50.73,3.84-76.44s-31.33-44-56.69-51.32c25.36-7.34,46.05-25.63,56.69-51.32s8.94-53.3-3.84-76.44a87,87,0,0,0,42,10.75A89.42,89.42,0,0,0,256,74.88,89.42,89.42,0,0,0,341.74,139a87,87,0,0,0,42-10.75c-12.78,23.14-14.48,50.73-3.84,76.44s31.33,44,56.69,51.32C411.21,263.33,390.52,281.63,379.88,307.32ZM224,176a48,48,0,1,0,48,48A48,48,0,0,0,224,176Zm0,64a16,16,0,1,1,16-16A16,16,0,0,1,224,240Zm80,48a16,16,0,1,0,16,16A16,16,0,0,0,304,288Z"></path></svg>';case"list-ul":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M32.39 224C14.73 224 0 238.33 0 256s14.73 32 32.39 32a32 32 0 0 0 0-64zm0-160C14.73 64 0 78.33 0 96s14.73 32 32.39 32a32 32 0 0 0 0-64zm0 320C14.73 384 0 398.33 0 416s14.73 32 32.39 32a32 32 0 0 0 0-64zM504 80H136a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8V88a8 8 0 0 0-8-8zm0 160H136a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0 160H136a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h368a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"></path></svg>';case"portrait":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path  d="M320 0H64C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zm32 448c0 17.6-14.4 32-32 32H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h256c17.6 0 32 14.4 32 32v384zM192 288c44.2 0 80-35.8 80-80s-35.8-80-80-80-80 35.8-80 80 35.8 80 80 80zm0-128c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zm46.8 144c-19.5 0-24.4 7-46.8 7s-27.3-7-46.8-7c-21.2 0-41.8 9.4-53.8 27.4C84.2 342.1 80 355 80 368.9V408c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-39.1c0-14 9-32.9 33.2-32.9 12.4 0 20.8 7 46.8 7 25.9 0 34.3-7 46.8-7 24.3 0 33.2 18.9 33.2 32.9V408c0 4.4 3.6 8 8 8h16c4.4 0 8-3.6 8-8v-39.1c0-13.9-4.2-26.8-11.4-37.5-12.1-18-32.7-27.4-53.8-27.4z"></path></svg>';case"ellipsis-v":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path  d="M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z"></path></svg>';case"sun-light":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M256 143.7c-61.8 0-112 50.3-112 112.1s50.2 112.1 112 112.1 112-50.3 112-112.1-50.2-112.1-112-112.1zm0 192.2c-44.1 0-80-35.9-80-80.1s35.9-80.1 80-80.1 80 35.9 80 80.1-35.9 80.1-80 80.1zm256-80.1c0-5.3-2.7-10.3-7.1-13.3L422 187l19.4-97.9c1-5.2-.6-10.7-4.4-14.4-3.8-3.8-9.1-5.5-14.4-4.4l-97.8 19.4-55.5-83c-6-8.9-20.6-8.9-26.6 0l-55.5 83-97.8-19.5c-5.3-1.1-10.6.6-14.4 4.4-3.8 3.8-5.4 9.2-4.4 14.4L90 187 7.1 242.5c-4.4 3-7.1 8-7.1 13.3 0 5.3 2.7 10.3 7.1 13.3L90 324.6l-19.4 97.9c-1 5.2.6 10.7 4.4 14.4 3.8 3.8 9.1 5.5 14.4 4.4l97.8-19.4 55.5 83c3 4.5 8 7.1 13.3 7.1s10.3-2.7 13.3-7.1l55.5-83 97.8 19.4c5.4 1.2 10.7-.6 14.4-4.4 3.8-3.8 5.4-9.2 4.4-14.4L422 324.6l82.9-55.5c4.4-3 7.1-8 7.1-13.3zm-116.7 48.1c-5.4 3.6-8 10.1-6.8 16.4l16.8 84.9-84.8-16.8c-6.6-1.4-12.8 1.4-16.4 6.8l-48.1 72-48.1-71.9c-3-4.5-8-7.1-13.3-7.1-1 0-2.1.1-3.1.3l-84.8 16.8 16.8-84.9c1.2-6.3-1.4-12.8-6.8-16.4l-71.9-48.1 71.9-48.2c5.4-3.6 8-10.1 6.8-16.4l-16.8-84.9 84.8 16.8c6.5 1.3 12.8-1.4 16.4-6.8l48.1-72 48.1 72c3.6 5.4 9.9 8.1 16.4 6.8l84.8-16.8-16.8 84.9c-1.2 6.3 1.4 12.8 6.8 16.4l71.9 48.2-71.9 48z"></path></svg>';case"adjust":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M256 40c119.945 0 216 97.337 216 216 0 119.945-97.337 216-216 216-119.945 0-216-97.337-216-216 0-119.945 97.337-216 216-216m0-32C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm-32 124.01v247.98c-53.855-13.8-96-63.001-96-123.99 0-60.99 42.145-110.19 96-123.99M256 96c-88.366 0-160 71.634-160 160s71.634 160 160 160V96z"></path></svg>';case"scroll-old":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path  d="M616 352h-72v-73.38L521.38 256 544 233.38v-82.75L521.38 128l22.25-22.28-.97-7.77C535.59 42.11 488.03 0 432 0H80C35.88 0 0 35.89 0 80v88c0 13.23 10.78 24 24 24h104v41.38L150.62 256 128 278.62v132.81c0 51.28 37.84 95.23 86.16 100.08 1.5.15 3 .14 4.5.23v.26h312C590.94 512 640 462.95 640 402.67V376c0-13.23-10.78-24-24-24zM128 160H32V80c0-26.47 21.53-48 48-48s48 21.53 48 48v80zm32 251.44V291.88L195.88 256 160 220.12V80c0-18-5.97-34.62-16.03-48H432c37.41 0 69.56 26.39 77.59 62.5L476.12 128 512 163.88v56.25L476.12 256 512 291.88V352h-73.38L416 374.62 393.38 352H320c-17.66 0-32 14.36-32 32v32c0 18.05-7.69 35.34-21.06 47.47-13.59 12.3-31.12 18.09-49.59 16.2-32.16-3.22-57.35-33.19-57.35-68.23zm448-8.77c0 42.64-34.69 77.33-77.34 77.33H294.83c15.82-17.55 25.17-40.18 25.17-64v-32h60.12L416 419.88 451.88 384H608v18.67z"></path></svg>';case"align-top":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">  <polygon points="500 0 0 0 0 34.468 88.66 34.468 88.66 433.596 228.66 433.596 228.66 34.468 274.787 34.468 274.787 313.745 414.787 313.745 414.787 34.468 500 34.468 500 0" /></svg>\n               ';case"align-middle":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500"><polygon points="500 234.489 414.787 234.489 414.787 111.149 274.787 111.149 274.787 234.489 228.66 234.489 228.66 50 88.66 50 88.66 234.489 0 234.489 0 268.957 88.66 268.957 88.66 450 228.66 450 228.66 268.957 274.787 268.957 274.787 391.149 414.787 391.149 414.787 268.957 500 268.957 500 234.489" /></svg>';case"align-bottom":return'<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 500 500"><rect x="88.66" y="65.404" width="140" height="400" /> <polygon points="414.787 465.532 414.787 186.255 274.787 186.255 274.787 465.532 0 465.532 0 500 500 500 500 465.532 414.787 465.532" /></svg>';case"align-left":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">  <polygon points="433.596 271.34 34.468 271.34 34.468 225.213 313.745 225.213 313.745 85.213 34.468 85.213 34.468 0 0 0 0 500 34.468 500 34.468 411.34 433.596 411.34 433.596 271.34" /></svg>';case"align-center":return'<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 500 500">  <polygon points="450 271.34 268.957 271.34 268.957 225.213 391.149 225.213 391.149 85.213 268.957 85.213 268.957 0 234.489 0 234.489 85.213 111.149 85.213 111.149 225.213 234.489 225.213 234.489 271.34 50 271.34 50 411.34 234.489 411.34 234.489 500 268.957 500 268.957 411.34 450 411.34 450 271.34"/></svg>';case"align-right":return'<svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 500 500">    <rect x="65.404" y="271.34" width="400" height="140" /><polygon points="465.532 0 465.532 85.213 186.255 85.213 186.255 225.213 465.532 225.213 465.532 500 500 500 500 0 465.532 0"/></svg>';case"space-vertical-around":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"> <rect x="120" y="296.302" width="260" height="140"/> <rect x="120" y="61.174" width="260" height="140"/> <path d="M403.446,500H96.554C87.412,500,80,493.284,80,485s7.412-15,16.554-15H403.446c9.142,0,16.554,6.716,16.554,15S412.588,500,403.446,500Z"/> <path d="M403.446,265H96.554C87.412,265,80,258.284,80,250s7.412-15,16.554-15H403.446c9.142,0,16.554,6.716,16.554,15S412.588,265,403.446,265Z"/> <path d="M403.446,31H96.554C87.412,31,80,24.284,80,16S87.412,1,96.554,1H403.446C412.588,1,420,7.716,420,16S412.588,31,403.446,31Z"/> </svg>';case"space-vertical-between":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"> <rect x="122.414" y="296.84" width="260" height="140"/> <rect x="122.414" y="60.713" width="260" height="140"/> <path d="M405.859,265H98.968c-9.143,0-16.554-6.716-16.554-15s7.411-15,16.554-15H405.859c9.143,0,16.555,6.716,16.555,15S415,265,405.859,265Z"/> </svg>';case"space-horizontal-around":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"> <rect x="60.552" y="124.264" width="140" height="260"/> <rect x="297.679" y="124.264" width="140" height="260"/> <path d="M485,424.263c-8.284,0-15-7.412-15-16.554V100.817c0-9.142,6.716-16.554,15-16.554s15,7.412,15,16.554V407.709C500,416.851,493.284,424.263,485,424.263Z"/> <path d="M250,424.263c-8.284,0-15-7.412-15-16.554V100.817c0-9.142,6.716-16.554,15-16.554s15,7.412,15,16.554V407.709C265,416.851,258.284,424.263,250,424.263Z"/> <path d="M15,424.263c-8.284,0-15-7.412-15-16.554V100.817c0-9.142,6.716-16.554,15-16.554s15,7.412,15,16.554V407.709C30,416.851,23.284,424.263,15,424.263Z"/> </svg>';case"space-horizontal-between":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"> <rect x="58.975" y="121.704" width="140" height="260"/> <rect x="298.102" y="121.704" width="140" height="260"/> <path d="M250,421.705c-8.284,0-15-7.412-15-16.555V98.259c0-9.143,6.716-16.554,15-16.554s15,7.411,15,16.554V405.15C265,414.293,258.284,421.705,250,421.705Z"/> </svg>';case"layer-group":return'<svg   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path  d="M512 256.01c0-9.98-5.81-18.94-14.77-22.81l-99.74-43.27 99.7-43.26c9-3.89 14.81-12.84 14.81-22.81s-5.81-18.92-14.77-22.79L271.94 3.33c-10.1-4.44-21.71-4.45-31.87-.02L14.81 101.06C5.81 104.95 0 113.9 0 123.87s5.81 18.92 14.77 22.79l99.73 43.28-99.7 43.26C5.81 237.08 0 246.03 0 256.01c0 9.97 5.81 18.92 14.77 22.79l99.72 43.26-99.69 43.25C5.81 369.21 0 378.16 0 388.14c0 9.97 5.81 18.92 14.77 22.79l225.32 97.76a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l225.29-97.74c9-3.89 14.81-12.84 14.81-22.81 0-9.98-5.81-18.94-14.77-22.81l-99.72-43.26 99.69-43.25c9-3.89 14.81-12.84 14.81-22.81zM45.23 123.87l208.03-90.26.03-.02c1.74-.71 3.65-.76 5.45.02l208.03 90.26-208.03 90.27c-1.81.77-3.74.77-5.48 0L45.23 123.87zm421.54 264.27L258.74 478.4c-1.81.77-3.74.77-5.48 0L45.23 388.13l110.76-48.06 84.11 36.49a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l84.11-36.49 110.76 48.07zm-208.03-41.87c-1.81.77-3.74.77-5.48 0L45.23 256 156 207.94l84.1 36.5a40.066 40.066 0 0 0 15.9 3.31c5.42 0 10.84-1.1 15.9-3.31l84.1-36.49 110.77 48.07-208.03 90.25z"></path></svg>';case"facebook-round":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>';case"primary-doc":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <g>\n        <path d="M149.075,177.875q13.047-5.4,27.225-12.375t27.675-15.3q13.5-8.322,25.875-17.551a177.165,177.165,0,0,0,22.275-19.574h46.8v273.85h-67.05V200.375a203.922,203.922,0,0,1-30.15,16.425q-16.653,7.425-32.4,12.825Z" />\n        <path d="M438.681,40A21.344,21.344,0,0,1,460,61.319V438.681A21.344,21.344,0,0,1,438.681,460H61.319A21.344,21.344,0,0,1,40,438.681V61.319A21.344,21.344,0,0,1,61.319,40H438.681m0-40H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0Z" />\n      </g>\n    </svg>\n    ';case"primary-doc-invers":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <path d="M438.681,0H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0ZM297.425,388.05h-67.05V201.5a203.922,203.922,0,0,1-30.15,16.425q-16.653,7.425-32.4,12.825L147.575,179q13.047-5.4,27.225-12.375t27.675-15.3q13.5-8.322,25.875-17.551A177.165,177.165,0,0,0,250.625,114.2h46.8Z" />\n    </svg>';case"preview-doc":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <g>\n        <path d="M438.681,40A21.344,21.344,0,0,1,460,61.319V438.681A21.344,21.344,0,0,1,438.681,460H61.319A21.344,21.344,0,0,1,40,438.681V61.319A21.344,21.344,0,0,1,61.319,40H438.681m0-40H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0Z" />\n        <path d="M247.218,179.532a67.28,67.28,0,0,0-19,3.052,33.841,33.841,0,0,1-46.086,46.242,67.868,67.868,0,1,0,65.09-49.294Zm193.557,59.235c-36.67-71.789-109.267-120.361-192.392-120.361S92.641,167.011,55.991,238.774a22.014,22.014,0,0,0,0,19.8c36.67,71.79,109.267,120.362,192.392,120.362s155.742-48.606,192.392-120.368A22.016,22.016,0,0,0,440.775,238.767Zm-193.557,97.02c-60.011,0-115.028-33.57-144.738-87.893C132.19,193.57,187.2,160,247.218,160s115.028,33.57,144.739,87.894C362.252,302.217,307.235,335.787,247.218,335.787Z" />\n      </g>\n    </svg>\n    ';case"preview-doc-invers":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <g>\n        <path d="M248.718,160.375c-60.017,0-115.028,33.57-144.738,87.894,29.71,54.323,84.727,87.893,144.738,87.893s115.034-33.57,144.739-87.893C363.746,193.945,308.735,160.375,248.718,160.375Zm65.5,106.607A67.973,67.973,0,1,1,183.628,229.2a33.615,33.615,0,0,0,16.424,4.419,33.94,33.94,0,0,0,29.662-50.661,64.66,64.66,0,0,1,38.037-.383A68.218,68.218,0,0,1,314.219,266.982Z" />\n        <path d="M438.681,0H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0Zm3.594,258.947c-36.65,71.762-109.267,120.368-192.392,120.368S94.161,330.743,57.491,258.953a22.014,22.014,0,0,1,0-19.8c36.65-71.763,109.267-120.368,192.392-120.368s155.722,48.572,192.392,120.361A22.016,22.016,0,0,1,442.275,258.947Z" />\n      </g>\n    </svg>\n    ';case"production-doc":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <path d="M390.625,257.812a23.438,23.438,0,1,0,23.438,23.438A23.438,23.438,0,0,0,390.625,257.812Zm31.25-89.937V97.539A46.876,46.876,0,0,0,408.145,64.4L357.48,13.73A46.876,46.876,0,0,0,324.336,0H107.891C91.445,0,78.125,13.994,78.125,31.25V167.875A78.128,78.128,0,0,0,0,246V375a15.62,15.62,0,0,0,15.625,15.625h62.5v93.75A15.62,15.62,0,0,0,93.75,500h312.5a15.62,15.62,0,0,0,15.625-15.625v-93.75h62.5A15.62,15.62,0,0,0,500,375V246A78.128,78.128,0,0,0,421.875,167.875ZM121,39.875H312.5V93.75a15.62,15.62,0,0,0,15.625,15.625H379v62.5H121Zm258,420.25H122v-69.5H379ZM457.125,347.75H42.875V246a31.291,31.291,0,0,1,31.25-31.25h351.75A31.291,31.291,0,0,1,457.125,246Z" />\n    </svg>\n    ';case"production-doc-invers":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <path d="M421.875,167.875V97.539A46.876,46.876,0,0,0,408.145,64.4L357.48,13.73A46.876,46.876,0,0,0,324.336,0H107.891C91.445,0,78.125,13.994,78.125,31.25V167.875A78.128,78.128,0,0,0,0,246V375a15.62,15.62,0,0,0,15.625,15.625h62.5v93.75A15.62,15.62,0,0,0,93.75,500h312.5a15.62,15.62,0,0,0,15.625-15.625v-93.75h62.5A15.62,15.62,0,0,0,500,375V246A78.128,78.128,0,0,0,421.875,167.875ZM121,39.875H312.5V93.75a15.62,15.62,0,0,0,15.625,15.625H379v62.5H121Zm258,420.25H122v-69.5H379Zm11.021-155.794a23.438,23.438,0,1,1,23.438-23.437A23.443,23.443,0,0,1,390.021,304.331Z" />\n    </svg>\n    ';case"layout-snippet":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <g>\n        <path d="M438.681,40A21.344,21.344,0,0,1,460,61.319V438.681A21.344,21.344,0,0,1,438.681,460H61.319A21.344,21.344,0,0,1,40,438.681V61.319A21.344,21.344,0,0,1,61.319,40H438.681m0-40H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0Z" />\n        <path d="M306.3,419.918a15,15,0,0,1-16.463-13.362h0a14.99,14.99,0,0,1,13.36-16.473h0a15,15,0,0,1,16.475,13.36h0a15,15,0,0,1-12.361,16.332h0C306.971,419.833,306.635,419.881,306.3,419.918Zm32.1-10.006a15.023,15.023,0,0,1,8.474-19.459h0a15,15,0,0,1,19.448,8.476h0a15,15,0,0,1-8.465,19.446h0a15.267,15.267,0,0,1-2.961.835h0A15.024,15.024,0,0,1,338.4,409.912Zm-85.17,9.247-.008.012h0a15.013,15.013,0,0,1-12.236-17.337h0A15,15,0,0,1,258.312,389.6h0a15.009,15.009,0,0,1,12.244,17.326h0a15.02,15.02,0,0,1-12.241,12.242h0A14.875,14.875,0,0,1,253.229,419.159Zm-50.618-1.082a15,15,0,0,1-7.1-19.985h0a15,15,0,0,1,20-7.093h0a14.988,14.988,0,0,1,7.09,19.988h0a14.977,14.977,0,0,1-11.015,8.337h0A14.849,14.849,0,0,1,202.611,418.077Z" />\n        <path d="M345.891,112.072a15.014,15.014,0,0,1-7.742-19.758h0a15,15,0,0,1,19.758-7.732h0a15,15,0,0,1,7.732,19.748h0a14.987,14.987,0,0,1-12.783,8.962h0A15,15,0,0,1,345.891,112.072Zm-151.172-8.013a15,15,0,0,1,7.822-19.721h0a15,15,0,0,1,19.721,7.822h0a15.007,15.007,0,0,1-7.811,19.721h0a15.1,15.1,0,0,1-4.984,1.2h0A15.012,15.012,0,0,1,194.719,104.059ZM302.667,112.9h0a14.989,14.989,0,0,1-12.808-16.912h0a15,15,0,0,1,16.9-12.807h0a14.985,14.985,0,0,1,12.809,16.9h0a15,15,0,0,1-13.858,12.929h0A14.932,14.932,0,0,1,302.667,112.9Zm-61.82-12.891a14.994,14.994,0,0,1,12.858-16.874h0A14.993,14.993,0,0,1,270.569,96h0a15,15,0,0,1-12.86,16.873h0c-.347.044-.695.076-1.045.1h0A14.986,14.986,0,0,1,240.847,100.01Z" />\n        <path d="M254.88,355.562l-8.631-6.142a497.046,497.046,0,0,1-51.729-43.463c-36.2-35.072-54.786-65.924-55.242-91.7-.3-16.99,7.154-31.8,21.556-42.839,15.728-12.052,33.054-16.663,50.106-13.345,19.3,3.76,34.431,16.594,44.261,27.594,9.889-10.637,24.91-22.943,43.629-26.432,16.034-2.99,32.148,1.2,46.592,12.124,15.439,11.675,23.43,27.262,23.108,45.076-.468,25.935-18.714,56.471-54.228,90.762a468.719,468.719,0,0,1-50.748,42.281ZM200.062,187.021c-6.894,0-13.8,2.712-20.982,8.212-6.912,5.3-9.936,11-9.807,18.488.3,17,16.582,42.016,45.861,70.436A478.656,478.656,0,0,0,255,318.5a450,450,0,0,0,38.736-33.146c28.585-27.658,44.5-52.329,44.8-69.467.091-5.135-.972-12.856-11.207-20.595-7.746-5.856-15.272-8-23-6.562-16.95,3.159-32.515,22.825-36.632,29.465l-13.078,21.1-12.582-21.364c-4.388-7.347-19.55-27.093-36.913-30.422A26.854,26.854,0,0,0,200.062,187.021Z" />\n        <path d="M154.914,418.145a15,15,0,0,1-7.1-19.985h0a15,15,0,0,1,20-7.093h0a14.988,14.988,0,0,1,7.09,19.988h0a14.981,14.981,0,0,1-11.015,8.338h0A14.858,14.858,0,0,1,154.914,418.145Z" />\n        <path d="M146.589,103.494a15,15,0,0,1,7.823-19.721h0A15,15,0,0,1,174.133,91.6h0a15.007,15.007,0,0,1-7.812,19.721h0a15.118,15.118,0,0,1-4.983,1.2h0A15.015,15.015,0,0,1,146.589,103.494Z" />\n      </g>\n    </svg>\n    ';case"layout-snippet-invers":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <g>\n        <path d="M320.09,195.292c-7.746-5.856-15.273-8-23-6.562-16.95,3.159-32.516,22.825-36.632,29.465l-13.078,21.1L234.8,217.929c-4.389-7.347-19.55-27.093-36.913-30.422a26.865,26.865,0,0,0-5.06-.486c-6.893,0-13.8,2.712-20.981,8.212-6.912,5.3-9.937,11-9.807,18.488.3,17,16.582,42.016,45.861,70.436A478.656,478.656,0,0,0,247.762,318.5,450,450,0,0,0,286.5,285.354c28.585-27.658,44.5-52.329,44.8-69.467C331.388,210.752,330.325,203.031,320.09,195.292Z" />\n        <path d="M438.681,0H61.319A61.319,61.319,0,0,0,0,61.319V438.681A61.319,61.319,0,0,0,61.319,500H438.681A61.319,61.319,0,0,0,500,438.681V61.319A61.319,61.319,0,0,0,438.681,0ZM329.149,92.314a15,15,0,1,1,7.742,19.758A15,15,0,0,1,329.149,92.314Zm-48.29,3.675A15.018,15.018,0,1,1,293.667,112.9,15,15,0,0,1,280.859,95.989ZM244.705,83.136a15,15,0,0,1,4,29.732c-.347.044-.695.076-1.045.1a15,15,0,0,1-2.959-29.831Zm-51.164,1.2a15,15,0,1,1-7.822,19.721A15,15,0,0,1,193.541,84.338Zm-46.129-.565a15,15,0,1,1-7.822,19.721A15,15,0,0,1,147.412,83.773ZM167.9,411.055a15,15,0,1,1-7.09-19.988A14.981,14.981,0,0,1,167.9,411.055Zm45.7-.068A15,15,0,1,1,206.507,391,14.975,14.975,0,0,1,213.6,410.987Zm47.959-4.062a14.974,14.974,0,0,1-17.327,12.234l-.008.012a15,15,0,1,1,17.335-12.246Zm36.75,12.85c-.335.058-.671.105-1.011.143a15.049,15.049,0,1,1,1.011-.143Zm50.55-1.4a15.267,15.267,0,0,1-2.961.835,15.035,15.035,0,1,1,2.961-.835ZM307.064,307.2a468.566,468.566,0,0,1-50.749,42.281l-8.673,6.081-8.631-6.142a497.115,497.115,0,0,1-51.73-43.463c-36.2-35.072-54.785-65.924-55.241-91.7-.3-16.99,7.153-31.8,21.556-42.839,15.727-12.052,33.053-16.663,50.106-13.345,19.3,3.76,34.431,16.594,44.261,27.594,9.889-10.637,24.91-22.943,43.629-26.432,16.034-2.99,32.147,1.2,46.592,12.124,15.439,11.675,23.429,27.262,23.108,45.076C360.823,242.373,342.578,272.909,307.064,307.2Z" />\n      </g>\n    </svg>\n    ';case"group-snippet":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <g>\n        <path d="M250,498c-66.937,0-129.657-25.233-176.6-71.053C26.066,380.754,0,318.623,0,252A250,250,0,0,1,426.776,75.224,248.361,248.361,0,0,1,500,252c0,66.623-26.066,128.754-73.4,174.947C379.657,472.767,316.938,498,250,498Zm0-456C134.205,42,40,136.205,40,252c0,115.514,92.243,206,210,206s210-90.486,210-206C460,136.205,365.8,42,250,42Z" />\n        <path d="M274.537,421.95a15,15,0,0,1-16.464-13.362h0a14.99,14.99,0,0,1,13.361-16.473h0a15,15,0,0,1,16.474,13.36h0a15,15,0,0,1-12.361,16.332h0Q275.046,421.894,274.537,421.95Zm32.1-21.006a15.025,15.025,0,0,1,8.475-19.459h0a15,15,0,0,1,19.447,8.476h0a15,15,0,0,1-8.465,19.446h0a15.267,15.267,0,0,1-2.961.835h0A15.024,15.024,0,0,1,306.64,400.944Zm-85.17,19.247-.008.012h0a15.015,15.015,0,0,1-12.236-17.337h0a15,15,0,0,1,17.327-12.235h0A15.009,15.009,0,0,1,238.8,407.957h0A15.021,15.021,0,0,1,226.556,420.2h0A14.9,14.9,0,0,1,221.47,420.191Zm-50.618-16.082a15,15,0,0,1-7.1-19.985h0a15,15,0,0,1,20-7.093h0a14.989,14.989,0,0,1,7.091,19.988h0a14.98,14.98,0,0,1-11.016,8.337h0A14.85,14.85,0,0,1,170.852,404.109Z" />\n        <path d="M315.941,117.156A15.012,15.012,0,0,1,308.2,97.4h0a15,15,0,0,1,19.758-7.732h0a15,15,0,0,1,7.732,19.748h0a14.988,14.988,0,0,1-12.783,8.962h0A15,15,0,0,1,315.941,117.156Zm-151.173-8.013a15,15,0,0,1,7.823-19.721h0a15,15,0,0,1,19.721,7.822h0a15.006,15.006,0,0,1-7.812,19.721h0a15.1,15.1,0,0,1-4.983,1.2h0A15.014,15.014,0,0,1,164.768,109.143Zm107.949-4.158h0a14.989,14.989,0,0,1-12.808-16.912h0a15,15,0,0,1,16.9-12.807h0a14.984,14.984,0,0,1,12.808,16.9h0A15,15,0,0,1,275.761,105.1h0A15,15,0,0,1,272.717,104.985ZM210.9,92.094A14.994,14.994,0,0,1,223.755,75.22h0a14.991,14.991,0,0,1,16.863,12.859h0a15,15,0,0,1-12.859,16.873h0c-.347.044-.7.076-1.045.1h0A14.986,14.986,0,0,1,210.9,92.094Z" />\n        <path d="M250.93,352.427l-8.631-6.142a496.968,496.968,0,0,1-51.73-43.463c-36.2-35.072-54.785-65.924-55.241-91.7-.3-16.99,7.153-31.8,21.556-42.839,15.727-12.052,33.054-16.663,50.106-13.345,19.3,3.76,34.431,16.594,44.261,27.594,9.889-10.637,24.91-22.943,43.629-26.431,16.034-2.991,32.147,1.2,46.592,12.124C356.911,179.9,364.9,195.489,364.58,213.3c-.469,25.935-18.714,56.471-54.228,90.762A468.936,468.936,0,0,1,259.6,346.347ZM196.111,183.886c-6.893,0-13.8,2.713-20.981,8.213-6.912,5.3-9.937,11-9.807,18.487.3,17,16.582,42.017,45.861,70.436a478.656,478.656,0,0,0,39.866,34.343,449.818,449.818,0,0,0,38.736-33.146c28.585-27.657,44.5-52.328,44.8-69.467.091-5.135-.972-12.856-11.207-20.595-7.746-5.856-15.273-8-23-6.561-16.95,3.158-32.516,22.824-36.632,29.465l-13.078,21.1-12.582-21.364c-4.389-7.347-19.55-27.093-36.913-30.422A26.865,26.865,0,0,0,196.111,183.886Z" />\n      </g>\n    </svg>';case"group-snippet-invers":return'<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">\n      <path d="M322.128,194.532c-7.746-5.856-15.273-8-23-6.561-16.95,3.158-32.516,22.824-36.632,29.465l-13.078,21.1-12.582-21.364c-4.389-7.347-19.55-27.093-36.913-30.422a26.865,26.865,0,0,0-5.06-.486c-6.893,0-13.8,2.713-20.981,8.213-6.912,5.3-9.937,11-9.807,18.487.3,17,16.582,42.017,45.861,70.436A478.656,478.656,0,0,0,249.8,317.74a449.818,449.818,0,0,0,38.736-33.146c28.585-27.657,44.5-52.328,44.8-69.467C333.426,209.992,332.363,202.271,322.128,194.532Z" />\n      <path d="M426.776,75.224A250,250,0,0,0,0,252c0,66.623,26.066,128.754,73.4,174.947C120.343,472.767,183.063,498,250,498s129.657-25.233,176.6-71.053C473.934,380.754,500,318.623,500,252A248.361,248.361,0,0,0,426.776,75.224ZM306.949,99.773a15,15,0,1,1,7.742,19.758A15,15,0,0,1,306.949,99.773Zm-48.29-9.325a15.018,15.018,0,1,1,12.808,16.912A15,15,0,0,1,258.659,90.448ZM222.505,77.6a15,15,0,0,1,4,29.732c-.347.044-.7.076-1.045.1A15,15,0,0,1,222.505,77.6ZM171.341,91.8a15,15,0,1,1-7.823,19.721A15,15,0,0,1,171.341,91.8Zm18.248,307.6a15,15,0,1,1-7.091-19.988A14.978,14.978,0,0,1,189.589,399.394Zm47.958,10.938a14.974,14.974,0,0,1-17.327,12.234l-.008.012a15,15,0,1,1,17.335-12.246Zm36.75,13.85q-.5.087-1.01.143a15.051,15.051,0,1,1,1.01-.143Zm50.55-12.4a15.267,15.267,0,0,1-2.961.835,15.036,15.036,0,1,1,2.961-.835ZM309.1,306.44a468.936,468.936,0,0,1-50.748,42.282l-8.674,6.08-8.631-6.142a496.968,496.968,0,0,1-51.73-43.463c-36.2-35.072-54.785-65.924-55.241-91.7-.3-16.99,7.153-31.8,21.556-42.839,15.727-12.052,33.054-16.663,50.106-13.345,19.3,3.76,34.431,16.594,44.261,27.594,9.889-10.637,24.91-22.943,43.629-26.431,16.034-2.991,32.147,1.2,46.592,12.124,15.439,11.674,23.429,27.261,23.108,45.075C362.861,241.613,344.616,272.149,309.1,306.44Z"/>\n  </svg>';case"file-invoice":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M312 416h-80c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8h80c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8zM64 240v96c0 8.84 8.19 16 18.29 16h219.43c10.1 0 18.29-7.16 18.29-16v-96c0-8.84-8.19-16-18.29-16H82.29C72.19 224 64 231.16 64 240zm32 16h192v64H96v-64zM72 96h112c4.42 0 8-3.58 8-8V72c0-4.42-3.58-8-8-8H72c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8zm0 64h112c4.42 0 8-3.58 8-8v-16c0-4.42-3.58-8-8-8H72c-4.42 0-8 3.58-8 8v16c0 4.42 3.58 8 8 8zm297.9-62.02L286.02 14.1c-9-9-21.2-14.1-33.89-14.1H47.99C21.5.1 0 21.6 0 48.09v415.92C0 490.5 21.5 512 47.99 512h288.02c26.49 0 47.99-21.5 47.99-47.99V131.97c0-12.69-5.1-24.99-14.1-33.99zM256.03 32.59c2.8.7 5.3 2.1 7.4 4.2l83.88 83.88c2.1 2.1 3.5 4.6 4.2 7.4h-95.48V32.59zm95.98 431.42c0 8.8-7.2 16-16 16H47.99c-8.8 0-16-7.2-16-16V48.09c0-8.8 7.2-16.09 16-16.09h176.04v104.07c0 13.3 10.7 23.93 24 23.93h103.98v304.01z"></path></svg>';case"clock-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path   d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path></svg>';case"page-plus-solid":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M377,105,279.1,7a24,24,0,0,0-17-7H256V128H384v-6.1A23.92,23.92,0,0,0,377,105ZM224,136V0H24A23.94,23.94,0,0,0,0,24V488a23.94,23.94,0,0,0,24,24H360a23.94,23.94,0,0,0,24-24V160H248A24.07,24.07,0,0,1,224,136Zm72,176v16a16,16,0,0,1-16,16H216v64a16,16,0,0,1-16,16H184a16,16,0,0,1-16-16V344H104a16,16,0,0,1-16-16V312a16,16,0,0,1,16-16h64V232a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16v64h64A16,16,0,0,1,296,312Z"></path></svg>';case"user-friends-solid":return'<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></svg>';case"opacity":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M255.9.2h-64v64h64zM0 64.17v64h64v-64zM128 .2H64v64h64zm64 255.9v64h64v-64zM0 192.12v64h64v-64zM383.85.2h-64v64h64zm128 0h-64v64h64zM128 256.1H64v64h64zM511.8 448v-64h-64v64zm0-128v-64h-64v64zM383.85 512h64v-64h-64zm128-319.88v-64h-64v64zM128 512h64v-64h-64zM0 512h64v-64H0zm255.9 0h64v-64h-64zM0 320.07v64h64v-64zm319.88-191.92v-64h-64v64zm-64 128h64v-64h-64zm-64 128v64h64v-64zm128-64h64v-64h-64zm0-127.95h64v-64h-64zm0 191.93v64h64v-64zM64 384.05v64h64v-64zm128-255.9v-64h-64v64zm191.92 255.9h64v-64h-64zm-128-191.93v-64h-64v64zm128-127.95v64h64v-64zm-128 255.9v64h64v-64zm-64-127.95H128v64h64zm191.92 64h64v-64h-64zM128 128.15H64v64h64zm0 191.92v64h64v-64z"></path></svg>';case"triangle-solid":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path  d="M329.6 24c-18.4-32-64.7-32-83.2 0L6.5 440c-18.4 31.9 4.6 72 41.6 72H528c36.9 0 60-40 41.6-72l-240-416z"></path></svg>';case"filter-reset":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">\n        <path d="M281.25,349.269V453.125l-62.5-46.875V250.691a136.239,136.239,0,0,1-.135-32.076L46.875,46.875h406.25l-57.384,57.383a136.154,136.154,0,0,1,43.12,23.139L486.224,80.02C515.666,50.578,494.8,0,453.078,0H46.931C5.292,0-15.717,50.518,13.785,80.02l158.09,158.146V406.25c0,14.754,6.946,28.647,18.75,39.062l62.5,45.963c30.54,21.343,75,1.5,75-37.5V367.907A135.49,135.49,0,0,1,281.25,349.269Z"/>\n        <path d="M383.977,234.255l14.251-14.25a19.937,19.937,0,0,0,0-28.19l-.192-.191a19.686,19.686,0,0,0-27.807,0l-14.442,14.443-14.251-14.252a19.933,19.933,0,0,0-28.189,28.19l14.251,14.25-14.251,14.252A19.932,19.932,0,0,0,341.536,276.7l14.251-14.252L370.038,276.7a19.933,19.933,0,0,0,28.19-28.189Z"/>\n        <path d="M354.063,347.894A113.83,113.83,0,1,1,467.894,234.063,113.959,113.959,0,0,1,354.063,347.894Zm0-187.66a73.83,73.83,0,1,0,73.831,73.829A73.913,73.913,0,0,0,354.063,160.234Z"/>\n      </svg>';case"compact-disc":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">\n        <path class="fa-secondary" d="M248,8C111,8,0,119,0,256S111,504,248,504,496,393,496,256,385,8,248,8ZM88,256H56C56,150.1,142.1,64,248,64V96C159.8,96,88,167.8,88,256Zm160,96a96,96,0,1,1,96-96A96,96,0,0,1,248,352Z"/>\n        <path class="fa-primary" d="M248,160a96,96,0,1,0,96,96A96,96,0,0,0,248,160Zm0,128a32,32,0,1,1,32-32A32,32,0,0,1,248,288Z" opacity="0.4"/>\n      </svg>';case"chevron-double-down-duotone":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\n        <path class="fa-secondary" d="M207 285.54L12.7 91.14a23.9 23.9 0 0 1 0-33.9l22.7-22.7a24.08 24.08 0 0 1 33.9 0l154.7 154 154.7-154a23.9 23.9 0 0 1 33.9 0l22.7 22.7a23.9 23.9 0 0 1 0 33.9L241 285.54a24.2 24.2 0 0 1-34 0z" opacity="0.4"/>\n        <path class="fa-primary" d="M207 477.54L12.7 283.14a23.9 23.9 0 0 1 0-33.9l22.7-22.7a23.9 23.9 0 0 1 33.9 0l154.7 154 154.7-154a24.08 24.08 0 0 1 33.9 0l22.7 22.7a23.9 23.9 0 0 1 0 33.9L241 477.54a24.2 24.2 0 0 1-34 0z"/>\n      </svg>';case"chevron-right":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">\n        <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/>\n      </svg>';case"chevron-left":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">\n        <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"/>\n      </svg>';case"angle-left":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">\n        <path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"/>\n      </svg>';case"angle-right":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512">\n        <path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/>\n      </svg>';case"database":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\n        <path d="M224 32c106 0 192 28.75 192 64v32c0 35.25-86 64-192 64S32 163.25 32 128V96c0-35.25 86-64 192-64m192 149.5V224c0 35.25-86 64-192 64S32 259.25 32 224v-42.5c41.25 29 116.75 42.5 192 42.5s150.749-13.5 192-42.5m0 96V320c0 35.25-86 64-192 64S32 355.25 32 320v-42.5c41.25 29 116.75 42.5 192 42.5s150.749-13.5 192-42.5m0 96V416c0 35.25-86 64-192 64S32 451.25 32 416v-42.5c41.25 29 116.75 42.5 192 42.5s150.749-13.5 192-42.5M224 0C145.858 0 0 18.801 0 96v320c0 77.338 146.096 96 224 96 78.142 0 224-18.801 224-96V96c0-77.338-146.096-96-224-96z"/>\n      </svg>';case"coins":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n        <path class="fa-secondary" d="M416 311.4c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5zm-4.7-95.1c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2zM512 64c0-35.3-86-64-192-64S128 28.7 128 64s86 64 192 64 192-28.7 192-64z" opacity="0.4"/>\n        <path class="fa-primary" d="M192 320c106 0 192-35.8 192-80s-86-80-192-80S0 195.8 0 240s86 80 192 80zM0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zm0-104.9V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4z"/>\n      </svg>';case"sync-alt":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n        <path d="M483.515 28.485L431.35 80.65C386.475 35.767 324.485 8 256 8 123.228 8 14.824 112.338 8.31 243.493 7.971 250.311 13.475 256 20.301 256h28.045c6.353 0 11.613-4.952 11.973-11.294C66.161 141.649 151.453 60 256 60c54.163 0 103.157 21.923 138.614 57.386l-54.128 54.129c-7.56 7.56-2.206 20.485 8.485 20.485H492c6.627 0 12-5.373 12-12V36.971c0-10.691-12.926-16.045-20.485-8.486zM491.699 256h-28.045c-6.353 0-11.613 4.952-11.973 11.294C445.839 370.351 360.547 452 256 452c-54.163 0-103.157-21.923-138.614-57.386l54.128-54.129c7.56-7.56 2.206-20.485-8.485-20.485H20c-6.627 0-12 5.373-12 12v143.029c0 10.691 12.926 16.045 20.485 8.485L80.65 431.35C125.525 476.233 187.516 504 256 504c132.773 0 241.176-104.338 247.69-235.493.339-6.818-5.165-12.507-11.991-12.507z"/>\n      </svg>';case"clock-light":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n        <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"/>\n      </svg>';case"calendar-alt":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\n        <path d="M400 64h-48V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H128V12c0-6.6-5.4-12-12-12h-8c-6.6 0-12 5.4-12 12v52H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h352c8.8 0 16 7.2 16 16v48H32v-48c0-8.8 7.2-16 16-16zm352 384H48c-8.8 0-16-7.2-16-16V192h384v272c0 8.8-7.2 16-16 16zM148 320h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 96h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-96 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm192 0h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12z"/>\n      </svg>';case"calendar-light":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\n        <path d="M400 64h-48V12c0-6.627-5.373-12-12-12h-8c-6.627 0-12 5.373-12 12v52H128V12c0-6.627-5.373-12-12-12h-8c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zM48 96h352c8.822 0 16 7.178 16 16v48H32v-48c0-8.822 7.178-16 16-16zm352 384H48c-8.822 0-16-7.178-16-16V192h384v272c0 8.822-7.178 16-16 16z"/>\n      </svg>';case"coin-light":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n        <path d="M256 64C114.67 64 0 128.44 0 208v112c0 70.72 114.67 128 256 128s256-57.28 256-128V208c0-79.56-114.67-144-256-144zM64 366.61C43.69 352 32 335.68 32 320v-42.34A183.65 183.65 0 0 0 64 303zm80 35.32A306.25 306.25 0 0 1 96 385v-64.69a327.39 327.39 0 0 0 48 17zm96 13.68a450 450 0 0 1-64-6.61v-64.27a442.1 442.1 0 0 0 64 6.53zm96-6.61a450 450 0 0 1-64 6.64v-64.38a442.1 442.1 0 0 0 64-6.53zm80-24a306.25 306.25 0 0 1-48 16.9v-64.6a327.39 327.39 0 0 0 48-17zm64-65c0 15.68-11.69 32-32 46.61V303a183.65 183.65 0 0 0 32-25.37zm-224 0c-132 0-224-59-224-112S124 96 256 96s224 59 224 112-92 112-224 112z"/>\n      </svg>';case"page-inverse":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\n        <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/>\n      </svg>';case"coin":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\n          <path d="M256 64C114.67 64 0 128.44 0 208v112c0 70.72 114.67 128 256 128s256-57.28 256-128V208c0-79.56-114.67-144-256-144zM88 363.37C62.42 349.16 48 333.2 48 320v-28.27a226 226 0 0 0 40 24.75zm96 30.88a348.83 348.83 0 0 1-64-16.32v-48.09a373.73 373.73 0 0 0 64 16.28zm112 4c-12.81 1.1-26.1 1.78-40 1.78s-27.19-.68-40-1.78v-48.18c13.07 1.16 26.36 1.93 40 1.93s26.93-.77 40-1.93zm96-20.29a348.83 348.83 0 0 1-64 16.32v-48.16a373.73 373.73 0 0 0 64-16.28zM464 320c0 13.2-14.42 29.16-40 43.37v-46.89a226 226 0 0 0 40-24.75zm-208-16c-119 0-208-50.68-208-96s89-96 208-96 208 50.68 208 96-88.95 96-208 96z"/>\n        </svg>';case"page-light":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\n        <path d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zm-22.6 22.7c2.1 2.1 3.5 4.6 4.2 7.4H256V32.5c2.8.7 5.3 2.1 7.4 4.2l83.9 83.9zM336 480H48c-8.8 0-16-7.2-16-16V48c0-8.8 7.2-16 16-16h176v104c0 13.3 10.7 24 24 24h104v304c0 8.8-7.2 16-16 16z"/>\n      </svg>';case"bars-light":return'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\n        <path d="M442 114H6a6 6 0 0 1-6-6V84a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6zm0 160H6a6 6 0 0 1-6-6v-24a6 6 0 0 1 6-6h436a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6z"/>\n      </svg>';default:assertNever(e)}}let WcIcon=class extends h{constructor(){super(...arguments),this.primaryColor="text",this.icon="pen"}static get styles(){return r$1`
:host, :host * {
  box-sizing: border-box;
}

:host {
  display: block;
}

svg {
  width: 100%;
  height: 100%;
  display: block;
}


.color-arrows {
  fill: rgba(255,255,255,0.5);
}
svg.color-arrows:hover {
  fill:  rgba(255,255,255,0.6);
}

.color-headline {
  fill: var(--printess-headlineColor);
}
svg.color-headline:hover {
  fill: var(--printess-headlineColorHover);
}

.color-text {
    fill: var(--printess-textColor);
} 
svg.color-text:hover {
  fill: var(--printess-textColorHover);
}

.color-medium {
  fill: var(--printess-textColorDisabled);
} 
svg.color-medium:hover {
    fill: var(--printess-textColorDisabledHover);
}

.color-light {
  fill: var(--printess-textColorLight);
}   
.color-light:hover {  
  fill: var(--printess-textColorLightHover);
}

.color-toolbar {
  fill: var(--printess-toolbarColor);
} 
svg.color-toolbar:hover {
  fill: var(--printess-toolbarColorHover);
}
.color-remove {
  fill: var(--printess-textColor);
} 
svg.color-remove:hover {
  fill: tomato;
}
.color-red {
  fill: red;
} 
svg.color-red:hover {
  fill: tomato;
}
.color-pink, .color-pink:hover {
  fill: #d3277c;
}
.color-black, .color-black:hover {
  fill: black;
}
.color-green, .color-green:hover {
  fill: green;
}
.color-lightgreen, .color-lightgreen:hover {
  fill: #83c000;
}
.color-blue, .color-blue:hover {
  fill: blue;
}
.color-gray, .color-gray:hover {
  fill: #555555;
}
.color-lightgray, .color-lightgray:hover {
  fill: #bbb;
}
.color-warning, .color-warning:hover {
  fill: orange;
}
.color-frame {
  fill:  var(--printess-frameColor);
  } 
svg.color-frame:hover {
  fill: var(--printess-frameColorHover);
}

.color-head-toolbar  {
  fill:  var(--printess-headToolbarColor);
} 
svg.color-head-toolbar:hover {
  fill: var(--printess-headToolbarColorHover);
}
`}render(){let e="color-"+this.primaryColor;return this.classList.contains("strict-no-zoom")&&(e+=" strict-no-zoom"),T`${o(getIcon(this.icon).replace("<svg ",' <svg class="'+e+'"'))}`}};__decorate$i([e$1()],WcIcon.prototype,"primaryColor",void 0),__decorate$i([e$1()],WcIcon.prototype,"icon",void 0),WcIcon=__decorate$i([n$1("wc-icon")],WcIcon);const menuItemH=28,submMenuHGap=7,contextOverlayDiv=createOverlayDiv();contextOverlayDiv.addEventListener("mousedown",removeCtxMenu);const contextMenuDiv=document.createElement("div");contextMenuDiv.classList.add("printess-ctx-menu"),contextMenuDiv.id="contextMenu";let canReceiveMenuClick=!1;function getLi(e){const t=document.createElement("li");if("-"===e.caption)return t.classList.add("printess-ctx-menu-item-seperator"),t;if(t.classList.add("printess-ctx-menu-item"),e.callback&&!0!==e.disabled&&t.addEventListener("mouseup",(()=>{canReceiveMenuClick&&e.callback&&e.callback()})),e.disabled)if(t.classList.add("disabled"),e.icon){const r=new WcIcon;r.icon=e.icon,r.primaryColor="gray",t.appendChild(r)}else t.appendChild(document.createElement("div"));else if(!e.textOnly)if(e.icon){const r=new WcIcon;r.icon=e.icon,e.icon.indexOf("-invers")>=0?r.primaryColor="headline":r.primaryColor="text",t.appendChild(r)}else{const r=document.createElement("div");e.color&&(r.style.backgroundColor=e.color,r.classList.add("color")),t.appendChild(r)}const r=document.createElement("div");if(r.classList.add("printess-ctx-menu-caption"),r.innerText=e.caption,e.font&&(r.style.fontFamily=e.font,r.style.fontSize="11pt"),t.appendChild(r),e.sub){const e=new WcIcon;e.icon="carret-right-solid",e.primaryColor="text",e.classList.add("arrow"),t.appendChild(e)}return t}function showCtxMenu(e,t,r=0,s=0,i=180,a=!1){e.preventDefault();const o=i;removeCtxMenu();const n=e.clientX,c=e.clientY;if(!e.target)return;if(!t){const r=e.target;"function"==typeof r.getContextMenu&&(t=r.getContextMenu(e.target,n,c))}if(!t)return;const l=28*t.filter((e=>"-"!==e.caption)).length+7*t.filter((e=>"-"===e.caption)).length;contextMenuDiv.style.height=l+"px",contextMenuDiv.style.width=o+"px",e.preventDefault();let d=n,h=c,p=n,u=c;contextMenuDiv.innerHTML="";const g=document.createElement("div");contextMenuDiv.appendChild(g);const v=document.createElement("ul");g.appendChild(v),canReceiveMenuClick=!1;for(const e of t){const t=getLi(e);if(t.addEventListener("mousedown",(()=>{canReceiveMenuClick=!0})),t.addEventListener("mouseup",(()=>{canReceiveMenuClick&&removeCtxMenu()})),e.sub&&e.sub.length){t.classList.add("printess-sub-menu-trigger");const r=document.createElement("div"),s=document.createElement("ul");r.appendChild(s),r.classList.add("printess-sub-menu");for(const t of e.sub){const e=getLi(t);s.appendChild(e)}u=window.innerHeight-c<7?-33-(c+7-window.innerHeight):7,p=window.innerWidth-n<2*o?-o:o,r.style.top=u+"px",r.style.left=p+"px",r.style.width=o+"px",t.onmouseover=()=>{r.style.display="block"},r.onmouseover=()=>{r.style.display="block"},t.onmouseout=()=>{r.style.display="none"},r.onmouseout=()=>{r.style.display="none"},t.appendChild(r)}v.appendChild(t)}h=c+l>window.innerHeight?window.innerHeight-l-10:c,window.innerWidth-(n+r)<o?(d=n-o,contextMenuDiv.classList.add("printess-rev-ctx-menu")):(contextMenuDiv.classList.remove("printess-rev-ctx-menu"),d=n),contextMenuDiv.style.top=h+s+"px",contextMenuDiv.style.left=d+r+"px",document.body.appendChild(contextOverlayDiv),document.body.appendChild(contextMenuDiv)}function removeCtxMenu(){contextMenuDiv.parentElement&&document.body.removeChild(contextMenuDiv),contextOverlayDiv.parentElement&&document.body.removeChild(contextOverlayDiv)}const config={mobileDeviceWidth:896,isMobile:isMobile(896)},accountStyles=r$1`
  .account-page {
    font-family: var(--printess-text-font);
    font-size: 14px;
    font-weight: 400;
    color: #555555;
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
  }

  .card {
    width: 80%;
    margin-top: 30px;
    margin-bottom: 70px;
  }

  wc-icon {
    padding: 5px 0 0 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .pink { border-bottom: 2px solid var(--printess-pink); }
  .green { border-bottom: 2px solid var(--printess-green); }
  .magenta { border-bottom: 2px solid #d20064; }
  .blue { border-bottom: 2px solid var(--printess-blue); }

  .table-header {
    padding-left: 20px;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 0;
  }

  .title {
    font-size: 18px;
    font-weight: 400;
    line-height: 50px;
    margin: 0;
  }

  .pink .table-header { background-color: var(--printess-pink); }
  .green .table-header { background-color: var(--printess-green); }
  .magenta .table-header { background-color: #d20064; }
  .blue .table-header { background-color: var(--printess-blue); }

  dl {
    display: grid;
    margin-top: 0;
    margin-bottom: 0;
    grid-template-columns: 120px calc(100% - 120px);
  }

  dt, dd {
    display: flex;
    line-height: 25px;
    margin-left: 0;
    text-align: left;
    padding: 10px 20px;
  }

  dd {
    display: flex;
    justify-content: space-between;
  }

  .token {
    width: 70%;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pink dt:nth-of-type(even), .pink dd:nth-of-type(even) {
    background-color: var(--printess-lightpink);
  }
  .green dt:nth-of-type(even), .green dd:nth-of-type(even) {
    background-color: var(--printess-lightgreen);
  }
  .blue dt:nth-of-type(even), .blue dd:nth-of-type(even) {
    background-color: var(--printess-lightblue);
  }

  input.readonly {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
  }

  button {
    padding: 2px 7px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
  }

  .settings {
    padding: 7px 20px;
    margin: 20px 15px;
  }

  .pink button { background-color: var(--printess-pink); }
  .green button { background-color: var(--printess-green); }
  .magenta button { background-color: #d20064; }
  .blue button { background-color: var(--printess-blue); }

  .pink .hide-token {
    background-color: var(--printess-pink);
    border: 1px solid var(--printess-pink);
    color: var(--printess-pink);
  }
  .green .hide-token {
    background-color: var(--printess-lightgreen);
    border: 1px solid var(--printess-green);
    color: var(--printess-green);
  }
  .magenta .hide-token {
    background-color: var(--printess-lightmagenta);
    border: 1px solid var(--printess-magenta);
    color: var(--printess-magenta);
  }
  .blue .hide-token {
    background-color: var(--printess-lightblue);
    border: 1px solid var(--printess-blue);
    color: var(--printess-blue);
  }
  
  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }

    .card {
      width: 100%;
      margin-bottom: 50px;
    }

    .table-header {
      padding-left: 10px;
    }

    .title {
      font-size: 14px;
      line-height: 36px;
      margin: 0;
    }

    dl {
      grid-template-columns: 80px calc(100% - 80px);
    }

    dd, dt {
      font-size: 12px;
      word-break: break-word;
      line-height: 16px;
      padding: 10px;
    }

    .table-body p {
      font-size: 12px;
      padding: 0 10px;
    }

    .settings {
      font-size: 12px;
    }
  }
`,dialogStyles=r$1`
  .modal {
    font-family: var(--printess-text-font);
    color: #555555;
    display: block;
    position: fixed;
    z-index: 100;
    padding-top: 70px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .modal-wrapper {
    background-color: #fefefe;
    margin: auto;
    width: 50vmin;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.2), 0px 4px 20px rgba(0,0,0,0.2);
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .modal {
      padding-top: 45px;
    }

    .modal-wrapper {
      width: 70vmin;
    }
  }

  .pink { border-bottom: 2px solid #e35fbc; }
  .green { border-bottom: 2px solid var(--printess-green); }
  .magenta { border-bottom: 2px solid var(--printess-magenta); }
  .blue { border-bottom: 2px solid var(--printess-blue); }

  .modal-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 20px;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 0;
  }

  .modal-title {
    line-height: 50px;
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }

  wc-icon {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin: 15px 20px;
  }

  .pink .modal-header { background-color: #e35fbc; }
  .green .modal-header { background-color: var(--printess-green); }
  .magenta .modal-header { background-color: var(--printess-magenta); }
  .blue .modal-header { background-color: var(--printess-blue); }

  .modal-content {
    padding: 20px;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    min-height: 160px;
  }

  label {
    font-size: 14px;
    padding-left: 2px;
  }

  input {
    padding: 10px;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    margin-top: 7px;
    border: 1px solid rgb(118, 118, 118);
  }

  input:hover {
    background-color: var(--printess-lightpink);
    border: 1px solid rgb(118, 118, 118);
  }

  button.submit {
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    color: white;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 4px;
    background-color: #e35fbc;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
  }

  .pink .submit { background-color: #e35fbc; }
  .green .submit { background-color: var(--printess-green); }
  .magenta .submit { background-color: var(--printess-magenta); }
  .blue .submit { background-color: var(--printess-blue); }

  .pink .submit:hover {
    background-color: #e447b6;
  }
`;var __decorate$h=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcBackdrop=class extends h{constructor(){super()}static get styles(){return r$1`
      :host, :host * {
          box-sizing: border-box;
      }
      :host  {
          position: absolute;
          left:0;
          top:0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.5);
          z-index: 89;
      }
    `}cancelMouse(e){e.preventDefault(),e.stopPropagation()}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.cancelMouse),this.addEventListener("mouseup",this.cancelMouse),this.addEventListener("mousemove",this.cancelMouse)}disconnectedCallback(){this.removeEventListener("mousedown",this.cancelMouse),this.removeEventListener("mouseup",this.cancelMouse),this.removeEventListener("mousemove",this.cancelMouse),super.disconnectedCallback()}render(){return T``}};WcBackdrop=__decorate$h([n$1("wc-backdrop")],WcBackdrop);const pinnedUserStyles=r$1`
  .pinned-user {
    display: grid;
    margin-top: 0;
    margin-bottom: 0;
    grid-template-columns: 250px calc(100% - 250px);
  }

  .pinned-user.lightgreen {
    background-color: var(--printess-lightgreen);
  }

  wc-icon {
    padding: 5px 0 0 5px;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .pinned-user-name, .pinned-user-email {
    display: flex;
    font-size: 16px;
    line-height: 25px;
    margin-left: 0;
    font-weight: 400;
    text-align: left;
    padding: 10px 20px;
  }

  .pinned-user-email {
    display: flex;
    justify-content: space-between;
  }

  button {
    padding: 2px 7px;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
  }

  .pink button { background-color: var(--printess-pink); }
  .green button { background-color: var(--printess-green); }
  .magenta button { background-color: var(--printess-magenta); }
  .blue button { background-color: var(--printess-blue); }

  .button-span {
    display: flex;
    flex-direction: row;
  }

  .user-name {
    padding-left: 10px;
  }
`;var __decorate$g=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcPinnedUser=class extends h{constructor(e,t,r){super(),this.name="",this.email="",this.name=e,this.email=t,this.idx=r}static get styles(){return[pinnedUserStyles]}render(){return T`
      <div class="pinned-user green ${this.idx%2==0?"":"lightgreen"}">
        <div class="pinned-user-name">
          <wc-icon icon="user-solid"></wc-icon>
          <span name="user-name" class="user-name">${this.name}</span>
        </div>
        <div class="pinned-user-email">
          <span name="user-email" class="user-email">${this.email}</span>
          <span class="button-span">
            <button @click=${this.adjustUserRights} style="margin-right: 10px;">user rights</button>
            <button @click=${this.removeUser}>remove user</button>
          </span>
        </div>
      </div>
    `}adjustUserRights(e){console.log(e.target.parentNode.parentNode.querySelector("span.user-email").textContent)}removeUser(e){this.remove()}};__decorate$g([e$1({type:String})],WcPinnedUser.prototype,"name",void 0),__decorate$g([e$1({type:String})],WcPinnedUser.prototype,"email",void 0),__decorate$g([e$1({type:Number})],WcPinnedUser.prototype,"idx",void 0),WcPinnedUser=__decorate$g([n$1("wc-pinned-user")],WcPinnedUser);var __decorate$f=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcDialogPinUser=class extends h{constructor(){super(),this.errorMsg="",this.backdrop=new WcBackdrop}showDialog(e){this.callback=e,document.body.appendChild(this.backdrop),document.body.appendChild(this)}closeDialog(){document.body.removeChild(this.backdrop),document.body.removeChild(this)}static get styles(){return[dialogStyles]}render(){return T`
      <div class="modal">
      
        <div class="modal-wrapper pink">
          <div class="modal-header">
            <slot name="title" class="modal-title">Add User</slot>
            <wc-icon primaryColor="arrows" icon="close" @click=${()=>this.closeDialog()}></wc-icon>
          </div>
      
          <div class="modal-content">
            <div>
              <label for="name" style="display: flex;">Pin a user: &nbsp;<span style="color: red; display: ${this.errorMsg?"block":"none"}"> ${this.errorMsg}</span></label>
              <input type="text" id="name" name="name" placeholder="user name">
              <input type="email" id="email" name="email" placeholder="e-mail address" required>
              <button @click=${this.addUser} class="submit">Add User</button>
            </div>
          </div>
        </div>
      
      </div>
    `}addUser(e){const t=e.target.parentNode.querySelector("#name").value,r=e.target.parentNode.querySelector("#email").value;t||-1!==r.indexOf("@")?t?-1!==r.indexOf("@")?(this.errorMsg="",this.callback&&this.callback(t,r),this.closeDialog()):this.errorMsg="no valid email address":this.errorMsg="name missing":this.errorMsg="to pin a user fill in name and email address"}};__decorate$f([e$1({type:String})],WcDialogPinUser.prototype,"errorMsg",void 0),WcDialogPinUser=__decorate$f([n$1("wc-dialog-pin-user")],WcDialogPinUser);var __decorate$e=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcAccountPage=class extends h{constructor(){super(...arguments),this.pinnedUsers=[{name:"Christoph Clermont",email:"cc@printess.com"}],this.currentUser=currentUser}static get styles(){return[accountStyles]}connectedCallback(){super.connectedCallback()}render(){return T`
            <div class="account-page"> 
                <h3 class="topic">Profile</h3>
            
                <div class="card green">
                    <div class="table-header">
                        <h3 class="title">Personal Information</h3>
                    </div>
                    <div class="table-body">
                        <dl>
                            <dt>Name:</dt>
                            <dd>${this.currentUser.displayName}</dd>
                            <dt>Email:</dt>
                            <dd>${this.currentUser.eMailAddress}</dd>
                            <!-- <dt>Password:</dt>
                            <dd>********</dd> -->
                            <dt>Last Login:</dt>
                            <dd>${this.currentUser.lastLogin}</dd>
                        </dl>
                        <!-- <button class="settings">Edit Settings</button> -->
                    </div>
                </div>
            
                <h3 class="topic">Danger Zone</h3>
                <p class="subtopic">Irreversible and destructive actions</p>
            
                <div class="card magenta">
                    <div class="table-header">
                        <h3 class="title">Delete Account</h3>
                    </div>
                    <div class="table-body">
                        <p style="padding-left: 20px;">Once you delete this account, there is no going back. All your content will
                            be deleted.</p>
                        <button class="settings">Delete Account</button>
                    </div>
                </div>
            </div>
        `}addUser(e){(new WcDialogPinUser).showDialog(((e,t)=>{this.pinnedUsers=[...this.pinnedUsers,{name:e,email:t}]}))}};__decorate$e([e$1({type:Array})],WcAccountPage.prototype,"pinnedUsers",void 0),WcAccountPage=__decorate$e([n$1("wc-account-page")],WcAccountPage);class NobsBase{constructor(e,t){if(e instanceof Nobs&&t instanceof NobsBase){e._called_from_constructor_findMutations(t);for(const r of Object.keys(t)){const s=t[r];s instanceof NobsBase?e.hasObjectReplacement(s)?this[r]=e.getObjectReplacement(s):e._called_from_constructor_hasMutation(s)?this[r]=new s.constructor(e,s):this[r]=s:s instanceof Map?this[r]=e._called_from_constructor_cloneMap(s):Array.isArray(s)?this[r]=e._called_from_constructor_cloneArray(s):e.hasProperty(t,r)?this[r]=e.popProperty(t,r):this[r]=t[r]}const r=e.getChangedProperties(t);if(r&&r.size>0)for(const[e,t]of r)this[e]=t}}}class Nobs{constructor(){this.createdObjects=new Map,this.replacedObjects=new Map,this.removedObjects=new Set,this.changedProperties=new Map,this.replacedCollections=new Map,this.mutatedObjects=new Set}setProperty(e,t,r){if(e&&(r instanceof NobsBase||null===r)&&e[t]instanceof NobsBase)this.replaceObject(e[t],r);else{let s=this.changedProperties.get(e);s||(s=new Map,this.changedProperties.set(e,s)),s.set(t,r)}return this}getChangedProperties(e){return this.changedProperties.get(e)}getProperty(e,t){const r=this.changedProperties.get(e);return r&&r.has(t)?r.get(t):e[t]}popProperty(e,t){const r=this.changedProperties.get(e);if(r&&r.has(t)){const e=r.get(t);return r.delete(t),e}return e[t]}hasProperty(e,t){const r=this.changedProperties.get(e);return!(!r||!r.has(t))}replaceCollection(e,t){return this.replacedCollections.set(e,t),this}addToCollection(e,t,r,s){let i=this.createdObjects.get(e);i||(i=[],this.createdObjects.set(e,i));const a={object:t,insertBefore:r,insertAfter:s};return i.push(a),this}reOrderInsideCollection(e,t,r,s){return t!==r&&t!==s&&(this.removeObject(t),this.addToCollection(e,t,r,s)),this}replaceObject(e,t){return this.replacedObjects.set(e,t),this}hasObjectReplacement(e){return this.replacedObjects.has(e)}getObjectReplacement(e){return this.replacedObjects.get(e)}removeObject(e){return this.removedObjects.add(e),this}_called_from_constructor_hasMutation(e){return this.mutatedObjects.has(e)}_called_from_constructor_findMutations(e){let t=!1;for(const r of Object.keys(e)){const s=e[r];if(this.hasProperty(e,r)&&(t=!0),s instanceof NobsBase)(this.replacedObjects.has(s)||this._called_from_constructor_findMutations(s))&&(this.mutatedObjects.add(s),t=!0);else if(s instanceof Map||Array.isArray(s)){if(this.replacedCollections.has(s)&&(this.mutatedObjects.add(s),t=!0),s instanceof Map)for(const e of s.values())(this.removedObjects.has(e)||this.replacedObjects.has(e))&&(this.mutatedObjects.add(e),t=!0),t=this._called_from_constructor_findMutations(e)||t;else for(const e of s)(this.removedObjects.has(e)||this.replacedObjects.has(e))&&(this.mutatedObjects.add(e),t=!0),t=this._called_from_constructor_findMutations(e)||t;this.createdObjects.has(s)&&(t=!0)}}return t&&this.mutatedObjects.add(e),t}static getId(e){const t=e.id;if(!t)throw new Error("Nobs: By convention, objects stored in a Map need to have an 'id' property");return t}_called_from_constructor_cloneMap(e){const t=new Map,r=this.replacedCollections.get(e);if(r&&r instanceof Map)return r;let s;const i=this.createdObjects.get(e);for(const[r,a]of e.entries())if(!this.removedObjects.has(a)){if(s=this.replacedObjects.get(a),!s&&this.mutatedObjects.has(a)&&(s=new a.constructor(this,a)),s||(s=a),i)for(const e of i)e.insertBefore===s&&t.set(Nobs.getId(e.object),e.object);if(t.set(r,s),i)for(const e of i)e.insertAfter===s&&t.set(Nobs.getId(e.object),e.object)}if(i)for(const e of i)void 0===e.insertBefore&&void 0===e.insertAfter&&t.set(Nobs.getId(e.object),e.object);return t}_called_from_constructor_cloneArray(e){const t=[],r=this.replacedCollections.get(e);if(r&&Array.isArray(r))return r;let s;const i=this.createdObjects.get(e);for(const r of e)if(!this.removedObjects.has(r)){if(s=this.replacedObjects.get(r),!s&&this.mutatedObjects.has(r)&&(s=new r.constructor(this,r)),s||(s=r),i)for(const e of i)e.insertBefore===s&&t.push(e.object);if(t.push(s),i)for(const e of i)e.insertAfter===s&&t.push(e.object)}if(i)for(const e of i)void 0===e.insertBefore&&void 0===e.insertAfter&&t.push(e.object);return t}}var __awaiter$3=function(e,t,r,s){return new(r||(r=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function n(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,n)}c((s=s.apply(e,t||[])).next())}))};function getData(e){return __awaiter$3(this,void 0,void 0,(function*(){const t=yield fetch(e);return yield t.json()}))}const templateStyles=r$1`
  .template-item {    
    width: 270px;
    display: flex;
    border-radius: 5px;
    padding: 20px;
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .pink  { background-color: var(--printess-lightpink); }
  .green  { background-color: var(--printess-lightgreen); }
  .blue  { background-color: var(--printess-lightblue); }
  .magenta  { background-color: var(--printess-lightmagenta); }

  .template-img {
    display: flex;
    width: 100px;
    padding-right:20px;
    justify-content: center;
    align-items: center;
  }

  img {
    border-radius: 5px;
    width: 100px;
    height: 80px;
    object-fit: cover;
  }

  .template-txt {
    justify-content: center;
    margin: auto;
    width: 180px;
  }

  .template-title {
    margin-top: 0;
  }

  .template-info {
    margin-bottom: 0;
    font-size: 12px;
    line-height: 20px;
  }
`;var __decorate$d=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcTemplatePreview=class extends h{constructor(e,t){super(),this.color="",this.color=t,this.template=e}static get styles(){return[templateStyles]}render(){var e,t,r,s;return T`
            <div class="template-item ${this.color}">
                <div class="template-img">
                    <img src=${this.template&&this.template.imageSource} alt=${null===(e=this.template)||void 0===e?void 0:e.templateName}>
                </div>
                <div class="template-txt">
                    <p class="template-title">${null===(t=this.template)||void 0===t?void 0:t.templateName}</p>
                    <p class="template-info">
                        <span>created: ${null===(r=this.template)||void 0===r?void 0:r.dateCreated}</span><br>
                        <span>last modified: ${null===(s=this.template)||void 0===s?void 0:s.dateModified}</span>
                    </p>
                </div>
            </div>
        `}};__decorate$d([e$1({attribute:!0,type:Object})],WcTemplatePreview.prototype,"template",void 0),__decorate$d([e$1({attribute:!0,type:String})],WcTemplatePreview.prototype,"color",void 0),WcTemplatePreview=__decorate$d([n$1("wc-template-preview")],WcTemplatePreview);const templatesPageStyles=r$1`
  .template-page {
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
  }

  .template-wrapper {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    grid-gap: 20px;
    margin-top: 30px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }
  }
`;var __decorate$c=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcTemplatesPage=class extends h{static get styles(){return[templatesPageStyles]}connectedCallback(){super.connectedCallback(),getData("../../mockup/templates.json").then((e=>this.templates=e.templates))}renderTemplates(){return this.templates?T`${this.templates.map(((e,t)=>new WcTemplatePreview(e,["green","pink","blue","magenta"][t%4])))}`:T`<p>Templates loading ...</p>`}render(){return T`
            <div class="template-page">
                <h3 class="topic">User Templates</h3>
                <p class="subtopic">Templates list</p>
                <div class="template-wrapper">
                    ${this.renderTemplates()}
                </div>
            </div>
        `}};__decorate$c([e$1({type:Array})],WcTemplatesPage.prototype,"templates",void 0),WcTemplatesPage=__decorate$c([n$1("wc-templates-page")],WcTemplatesPage);class SearchOrders extends NobsBase{constructor(e,t){var r,s,i,a;if(super(e,t),!(e instanceof Nobs||t instanceof SearchOrders))if("string"==typeof e)this.templateName=e,this.origin="",this.productType="",this.externalOrderId="";else{const t=e;this.templateName=null!==(r=t.templateName)&&void 0!==r?r:"",this.templateNameOperator=t.templateNameOperator,this.origin=null!==(s=t.origin)&&void 0!==s?s:"",this.productType=null!==(i=t.productType)&&void 0!==i?i:"",this.externalOrderId=null!==(a=t.externalOrderId)&&void 0!==a?a:"",this.startDate=t.startDate,this.endDate=t.endDate,this.isFinished=t.isFinished,this.isImposed=t.isImposed,this.take=t.take,this.skip=t.skip}}toDto(){return{templateName:this.templateName,templateNameOperator:this.templateNameOperator,origin:this.origin,productType:this.productType,externalOrderId:this.externalOrderId,startDate:this.startDate,endDate:this.endDate,isFinished:this.isFinished,isImposed:this.isImposed,isFailed:this.isFailed,take:this.take,skip:this.skip,payload:adm.useAdminMode?"skipUserIdCheck":""}}}const printjobsStyles=r$1`
  .user-orders {
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
    color: #555555;
  }

  .filter-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
  }

  .setting-buttons {
    display: flex;
    flex-direction: row;
  }

  .inline {
    display: flex;
    align-items: center;
  }

  .template-name-label {
    font-size: 16px;
  }

  .table-settings {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    height: 35px;
    margin-right: 10px;
    cursor: pointer;
    border: 1px solid #ADADAD;
    outline: none;
    border-radius: 4px;
    font-family: var(--printess-button-font);
    font-size: 14px;
    font-weight: 400;
    color: #555555;
  }

  .table-settings:hover {
    background-color: #e2e2e2;
  }

  .input-label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    width: 200px;
  }

  label {
    font-size: 12px;
    font-weight: 400;
    color: #555555;
  }

  input {
    padding: 10px 20px;
    background-color: #f8f8f8;
    border-radius: 4px;
    border: none;
    outline: none;
    margin: 10px 10px 0 0;
    font-size: 14px;
    font-weight: 400;
    font-family: var(--printess-text-font);
    height: 40px;
    width: 200px;
    color:  #555555;
  }

  .expanded-filter {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  select {
    padding: 10px 20px;
    margin: 10px 10px 0 0;
    height: 40px;
    width: 200px;
    font-family: var(--printess-text-font);
    font-size: 14px;
    font-weight: 400;
    background-color: #f8f8f8;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #555555;
  }

  wc-icon {
    width: 25px;
    height: 25px;
  }

  .table-container {
    margin-top: 10px;
  }

  .hidden {
    display: none;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }

    .filter-wrapper {
      margin-top: 20px;
    }

    .setting-buttons {
      margin-bottom: 10px;
    }

    .table-settings {
      font-size: 12px;
      padding: 7px 10px;
      height: 30px;
      margin-right: 5px;
    }

    .inline {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      margin-top: 20px;
    }

    .template-name-label {
      font-size: 12px;
    }
    
    input {
      padding: 0 15px;
      font-size: 12px;
      height: 30px;
    }

    label {
      font-size: 12px;
    }

    wc-icon {
      width: 15px;
      height: 15px;
    }

    .inline wc-icon {
      width: 20px;
      height: 20px;
    }
  }
`;class ValueDebounce{constructor(e){this.timeout=1e3,this.callback=e}change(e,t=1e3){this.value=e,window.clearTimeout(this.timeoutHandle),this.timeoutHandle=window.setTimeout((()=>{this.callback(this.value)}),t)}immediate(e){this.value=e,this.callback(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{et:t}=Z,e=()=>document.createComment(""),u$1=(r,s,i)=>{var a;const o=r.A.parentNode,n=void 0===s?r.B:s.A;if(void 0===i){const s=o.insertBefore(e(),n),a=o.insertBefore(e(),n);i=new t(s,a,r,r.options)}else{const e=i.B.nextSibling,t=i.M!==r;if(t&&(null===(a=i.Q)||void 0===a||a.call(i,r),i.M=r),e!==n||t){let t=i.A;for(;t!==e;){const e=t.nextSibling;o.insertBefore(t,n),t=e}}}return i},c$1=(e,t,r=e)=>(e.I(t,r),e),s={},f=(e,t=s)=>e.H=t,a=e=>e.H,m=e=>{var t;null===(t=e.P)||void 0===t||t.call(e,!1,!0);let r=e.A;const s=e.B.nextSibling;for(;r!==s;){const e=r.nextSibling;r.remove(),r=e}},u=(e,t,r)=>{const s=new Map;for(let i=t;i<=r;i++)s.set(e[i],i);return s},c=i(class extends s$1{constructor(e){if(super(e),e.type!==t$1.CHILD)throw Error("repeat() can only be used in text expressions")}Mt(e,t,r){let s;void 0===r?r=t:void 0!==t&&(s=t);const i=[],a=[];let o=0;for(const t of e)i[o]=s?s(t,o):o,a[o]=r(t,o),o++;return{values:a,keys:i}}render(e,t,r){return this.Mt(e,t,r).values}update(e,[t,r,s]){var i;const o=a(e),{values:n,keys:c}=this.Mt(t,r,s);if(!o)return this.Pt=c,n;const l=null!==(i=this.Pt)&&void 0!==i?i:this.Pt=[],d=[];let h,p,g=0,v=o.length-1,b=0,y=n.length-1;for(;g<=v&&b<=y;)if(null===o[g])g++;else if(null===o[v])v--;else if(l[g]===c[b])d[b]=c$1(o[g],n[b]),g++,b++;else if(l[v]===c[y])d[y]=c$1(o[v],n[y]),v--,y--;else if(l[g]===c[y])d[y]=c$1(o[g],n[y]),u$1(e,d[y+1],o[g]),g++,y--;else if(l[v]===c[b])d[b]=c$1(o[v],n[b]),u$1(e,o[g],o[v]),v--,b++;else if(void 0===h&&(h=u(c,b,y),p=u(l,g,v)),h.has(l[g]))if(h.has(l[v])){const t=p.get(c[b]),r=void 0!==t?o[t]:null;if(null===r){const t=u$1(e,o[g]);c$1(t,n[b]),d[b]=t}else d[b]=c$1(r,n[b]),u$1(e,o[g],r),o[t]=null;b++}else m(o[v]),v--;else m(o[g]),g++;for(;b<=y;){const t=u$1(e,d[y+1]);c$1(t,n[b]),d[b++]=t}for(;g<=v;){const e=o[g++];null!==e&&m(e)}return this.Pt=c,f(e,d),w}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function toInteger(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function requiredArgs(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function toDate(e){requiredArgs(1,arguments);var t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new Date(e.getTime()):"number"==typeof e||"[object Number]"===t?new Date(e):("string"!=typeof e&&"[object String]"!==t||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function addDays(e,t){requiredArgs(2,arguments);var r=toDate(e),s=toInteger(t);return isNaN(s)?new Date(NaN):s?(r.setDate(r.getDate()+s),r):r}function getTimezoneOffsetInMilliseconds(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}function compareAsc(e,t){requiredArgs(2,arguments);var r=toDate(e),s=toDate(t),i=r.getTime()-s.getTime();return i<0?-1:i>0?1:i}function differenceInCalendarMonths(e,t){requiredArgs(2,arguments);var r=toDate(e),s=toDate(t),i=r.getFullYear()-s.getFullYear(),a=r.getMonth()-s.getMonth();return 12*i+a}function differenceInMilliseconds(e,t){requiredArgs(2,arguments);var r=toDate(e),s=toDate(t);return r.getTime()-s.getTime()}function endOfDay(e){requiredArgs(1,arguments);var t=toDate(e);return t.setHours(23,59,59,999),t}function endOfMonth(e){requiredArgs(1,arguments);var t=toDate(e),r=t.getMonth();return t.setFullYear(t.getFullYear(),r+1,0),t.setHours(23,59,59,999),t}function isLastDayOfMonth(e){requiredArgs(1,arguments);var t=toDate(e);return endOfDay(t).getTime()===endOfMonth(t).getTime()}function differenceInMonths(e,t){requiredArgs(2,arguments);var r,s=toDate(e),i=toDate(t),a=compareAsc(s,i),o=Math.abs(differenceInCalendarMonths(s,i));if(o<1)r=0;else{1===s.getMonth()&&s.getDate()>27&&s.setDate(30),s.setMonth(s.getMonth()-a*o);var n=compareAsc(s,i)===-a;isLastDayOfMonth(toDate(e))&&1===o&&1===compareAsc(e,i)&&(n=!1),r=a*(o-Number(n))}return 0===r?0:r}function differenceInSeconds(e,t){requiredArgs(2,arguments);var r=differenceInMilliseconds(e,t)/1e3;return r>0?Math.floor(r):Math.ceil(r)}var formatDistanceLocale={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function formatDistance$1(e,t,r){var s;return r=r||{},s="string"==typeof formatDistanceLocale[e]?formatDistanceLocale[e]:1===t?formatDistanceLocale[e].one:formatDistanceLocale[e].other.replace("{{count}}",t),r.addSuffix?r.comparison>0?"in "+s:s+" ago":s}function buildFormatLongFn(e){return function(t){var r=t||{},s=r.width?String(r.width):e.defaultWidth;return e.formats[s]||e.formats[e.defaultWidth]}}var dateFormats={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},timeFormats={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},dateTimeFormats={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},formatLong={date:buildFormatLongFn({formats:dateFormats,defaultWidth:"full"}),time:buildFormatLongFn({formats:timeFormats,defaultWidth:"full"}),dateTime:buildFormatLongFn({formats:dateTimeFormats,defaultWidth:"full"})},formatRelativeLocale={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function formatRelative(e,t,r,s){return formatRelativeLocale[e]}function buildLocalizeFn(e){return function(t,r){var s,i=r||{};if("formatting"===(i.context?String(i.context):"standalone")&&e.formattingValues){var a=e.defaultFormattingWidth||e.defaultWidth,o=i.width?String(i.width):a;s=e.formattingValues[o]||e.formattingValues[a]}else{var n=e.defaultWidth,c=i.width?String(i.width):e.defaultWidth;s=e.values[c]||e.values[n]}return s[e.argumentCallback?e.argumentCallback(t):t]}}var eraValues={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},quarterValues={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},monthValues={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},dayValues={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},dayPeriodValues={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},formattingDayPeriodValues={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}};function ordinalNumber(e,t){var r=Number(e),s=r%100;if(s>20||s<10)switch(s%10){case 1:return r+"st";case 2:return r+"nd";case 3:return r+"rd"}return r+"th"}var localize={ordinalNumber:ordinalNumber,era:buildLocalizeFn({values:eraValues,defaultWidth:"wide"}),quarter:buildLocalizeFn({values:quarterValues,defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:buildLocalizeFn({values:monthValues,defaultWidth:"wide"}),day:buildLocalizeFn({values:dayValues,defaultWidth:"wide"}),dayPeriod:buildLocalizeFn({values:dayPeriodValues,defaultWidth:"wide",formattingValues:formattingDayPeriodValues,defaultFormattingWidth:"wide"})};function buildMatchPatternFn(e){return function(t,r){var s=String(t),i=r||{},a=s.match(e.matchPattern);if(!a)return null;var o=a[0],n=s.match(e.parsePattern);if(!n)return null;var c=e.valueCallback?e.valueCallback(n[0]):n[0];return{value:c=i.valueCallback?i.valueCallback(c):c,rest:s.slice(o.length)}}}function buildMatchFn(e){return function(t,r){var s=String(t),i=r||{},a=i.width,o=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],n=s.match(o);if(!n)return null;var c,l=n[0],d=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth];return c="[object Array]"===Object.prototype.toString.call(d)?findIndex(d,(function(e){return e.test(l)})):findKey(d,(function(e){return e.test(l)})),c=e.valueCallback?e.valueCallback(c):c,{value:c=i.valueCallback?i.valueCallback(c):c,rest:s.slice(l.length)}}}function findKey(e,t){for(var r in e)if(e.hasOwnProperty(r)&&t(e[r]))return r}function findIndex(e,t){for(var r=0;r<e.length;r++)if(t(e[r]))return r}var matchOrdinalNumberPattern=/^(\d+)(th|st|nd|rd)?/i,parseOrdinalNumberPattern=/\d+/i,matchEraPatterns={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},parseEraPatterns={any:[/^b/i,/^(a|c)/i]},matchQuarterPatterns={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},parseQuarterPatterns={any:[/1/i,/2/i,/3/i,/4/i]},matchMonthPatterns={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},parseMonthPatterns={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},matchDayPatterns={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},parseDayPatterns={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},matchDayPeriodPatterns={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},parseDayPeriodPatterns={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},match={ordinalNumber:buildMatchPatternFn({matchPattern:matchOrdinalNumberPattern,parsePattern:parseOrdinalNumberPattern,valueCallback:function(e){return parseInt(e,10)}}),era:buildMatchFn({matchPatterns:matchEraPatterns,defaultMatchWidth:"wide",parsePatterns:parseEraPatterns,defaultParseWidth:"any"}),quarter:buildMatchFn({matchPatterns:matchQuarterPatterns,defaultMatchWidth:"wide",parsePatterns:parseQuarterPatterns,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:buildMatchFn({matchPatterns:matchMonthPatterns,defaultMatchWidth:"wide",parsePatterns:parseMonthPatterns,defaultParseWidth:"any"}),day:buildMatchFn({matchPatterns:matchDayPatterns,defaultMatchWidth:"wide",parsePatterns:parseDayPatterns,defaultParseWidth:"any"}),dayPeriod:buildMatchFn({matchPatterns:matchDayPeriodPatterns,defaultMatchWidth:"any",parsePatterns:parseDayPeriodPatterns,defaultParseWidth:"any"})},locale={code:"en-US",formatDistance:formatDistance$1,formatLong:formatLong,formatRelative:formatRelative,localize:localize,match:match,options:{weekStartsOn:0,firstWeekContainsDate:1}};function assign(e,t){if(null==e)throw new TypeError("assign requires that input parameter not be null or undefined");for(var r in t=t||{})t.hasOwnProperty(r)&&(e[r]=t[r]);return e}function cloneObject(e){return assign({},e)}var MINUTES_IN_DAY=1440,MINUTES_IN_ALMOST_TWO_DAYS=2520,MINUTES_IN_MONTH=43200,MINUTES_IN_TWO_MONTHS=86400;function formatDistance(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};requiredArgs(2,arguments);var s=r.locale||locale;if(!s.formatDistance)throw new RangeError("locale must contain formatDistance property");var i=compareAsc(e,t);if(isNaN(i))throw new RangeError("Invalid time value");var a,o,n=cloneObject(r);n.addSuffix=Boolean(r.addSuffix),n.comparison=i,i>0?(a=toDate(t),o=toDate(e)):(a=toDate(e),o=toDate(t));var c,l=differenceInSeconds(o,a),d=(getTimezoneOffsetInMilliseconds(o)-getTimezoneOffsetInMilliseconds(a))/1e3,h=Math.round((l-d)/60);if(h<2)return r.includeSeconds?l<5?s.formatDistance("lessThanXSeconds",5,n):l<10?s.formatDistance("lessThanXSeconds",10,n):l<20?s.formatDistance("lessThanXSeconds",20,n):l<40?s.formatDistance("halfAMinute",null,n):l<60?s.formatDistance("lessThanXMinutes",1,n):s.formatDistance("xMinutes",1,n):0===h?s.formatDistance("lessThanXMinutes",1,n):s.formatDistance("xMinutes",h,n);if(h<45)return s.formatDistance("xMinutes",h,n);if(h<90)return s.formatDistance("aboutXHours",1,n);if(h<MINUTES_IN_DAY){var p=Math.round(h/60);return s.formatDistance("aboutXHours",p,n)}if(h<MINUTES_IN_ALMOST_TWO_DAYS)return s.formatDistance("xDays",1,n);if(h<MINUTES_IN_MONTH){var u=Math.round(h/MINUTES_IN_DAY);return s.formatDistance("xDays",u,n)}if(h<MINUTES_IN_TWO_MONTHS)return c=Math.round(h/MINUTES_IN_MONTH),s.formatDistance("aboutXMonths",c,n);if((c=differenceInMonths(o,a))<12){var g=Math.round(h/MINUTES_IN_MONTH);return s.formatDistance("xMonths",g,n)}var v=c%12,m=Math.floor(c/12);return v<3?s.formatDistance("aboutXYears",m,n):v<9?s.formatDistance("overXYears",m,n):s.formatDistance("almostXYears",m+1,n)}function subDays(e,t){requiredArgs(2,arguments);var r=toInteger(t);return addDays(e,-r)}const tableStyles$1=r$1`
  .table-wrapper {
    overflow: auto;
    border-bottom: 2px solid #d0049b;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    font-family: var(--printess-text-font);
  }
  
  table {
    margin-top:0;
    position: relative;
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    font-weight: 400;
  }

  td, th {
    padding: 7px 20px;
    line-height: 25px;
    white-space: nowrap;
    color: #555555;
  }

  tr:nth-child(odd){
    background-color:rgba(208, 4, 155, 0.04);
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #d0049b;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
    position: sticky;
    top:0;
  }

  td a {
    text-decoration: none;
    color: #d3277c;
  }

  wc-icon {
    width: 25px;
    height: 25px;
  }

  .flex {
    display: flex;
  }

  .hide {
    display: none;
  }

  .loader {
    position: fixed;
    left: 50%;
    top: 50%;
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--printess-magenta);
    border-color: var(--printess-magenta) transparent var(--printess-magenta) transparent;
    animation: loader 1.2s linear infinite;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner,
  .spinner:after {
    border-radius: 50%;
    width: 2em;
    height: 2em;
  }
  .spinner {
    font-size: 8px;
    position: relative;
    border-top: 0.5em solid rgba(230,0,126, 0.2);
    border-right: 0.5em solid rgba(230,0,126, 0.2);
    border-bottom: 0.5em solid rgba(230,0,126, 0.2);
    border-left: 0.5em solid #e6007e;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

`;var __decorate$b=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcDialogErrorMessage=class extends h{constructor(e){super(),this.backdrop=new WcBackdrop,this.errorMsg=e}static get styles(){return[dialogStyles,r$1`
      .modal-wrapper {
        width: 70vmin;
      }
    `]}showDialog(){document.body.appendChild(this.backdrop),document.body.appendChild(this)}closeDialog(){document.body.removeChild(this.backdrop),document.body.removeChild(this)}render(){return T`
      <div class="modal">
      
        <div class="modal-wrapper pink">
          <div class="modal-header">
            <slot name="title" class="modal-title">Failure Details</slot>
            <wc-icon primaryColor="arrows" icon="close" @click=${()=>this.closeDialog()}></wc-icon>
          </div>

          <div class="modal-content">
            <p style="word-break: break-word;">${this.errorMsg}</p>
            <button @click=${this.closeDialog} class="submit">Close</button>
          </div>
        </div>
      </div>
    `}};__decorate$b([e$1({attribute:!1,type:String})],WcDialogErrorMessage.prototype,"errorMsg",void 0),WcDialogErrorMessage=__decorate$b([n$1("wc-dialog-error-message")],WcDialogErrorMessage);var __decorate$a=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const columns=[{name:"id",title:"ID"},{name:"jobId",title:"Job ID"},{name:"userInfo",title:"User Info"},{name:"userId",title:"User ID"},{name:"sourceUserId",title:"Source User ID"},{name:"externalOrderId",title:"External Order ID"},{name:"templateName",title:"Template Name"},{name:"origin",title:"Origin"},{name:"shopSaveId",title:"Shop Save ID"},{name:"productType",title:"Product Type"},{name:"createdOn",title:"Created"},{name:"finishedOn",title:"Finished"},{name:"isFinished",title:"Status"},{name:"failureDetails",title:"Failure Details"},{name:"result",title:"Pdf File"},{name:"document",title:"Documents"},{name:"pages",title:"Pages"},{name:"size",title:"Size"},{name:"loadableTemplateName",title:"Loadable Template Name"}];let WcPrintjobsTable=class extends h{constructor(e,t){super(),this.data=e,this.headers=t;const r=localStorage.getItem("tableSettings");r?this.headers=JSON.parse(r):this.headers}static get styles(){return[tableStyles$1]}showError(e){console.log("error msg: ",e.message,"error code: ",e.code)}getUserInfo(e){let t="";if(this.data.users){const r=this.data.users.filter((t=>t.id===e.userId))[0];if(r&&(t+=r.d+" ("+r.e+")"),e.sourceUserId){const r=this.data.users.filter((t=>t.id===e.sourceUserId))[0];r&&(t+=", issued by "+r.d+" ("+r.e+")")}}return t}render(){return T`    
    ${this.data?T`
    <div class="table-wrapper">
      <table class="layout display responsive-table">
        <thead>
          <tr>
            ${c(columns,(e=>e.name),(e=>T`
              <th class=${this.headers.includes(`${e.title}`)?"":"hide"}>${e.title}</th>
            `))}
          </tr>
        </thead>
        <tbody>
          ${this.data&&c(this.data.orders,(e=>e.id),(e=>{var t,r;const s=this.getUserInfo(e);return T`
            <tr>
              <td class='orders-id ${this.headers.includes("ID")?"":"hide"}'>${e.id}</td>
              <td class=${this.headers.includes("Job ID")?"":"hide"}>${e.jobId}</td>
              <td class=${this.headers.includes("User Info")?"":"hide"}>${s}</td>
              <td class=${this.headers.includes("User ID")?"":"hide"}>${e.userId}</td>
              <td class=${this.headers.includes("Source User ID")?"":"hide"}>${e.sourceUserId}</td>
              <td class=${this.headers.includes("External Order ID")?"":"hide"}>${e.externalOrderId}</td>
              <td class=${this.headers.includes("Template Name")?"":"hide"}><a href="https://editor.printess.com/?name=${encodeURIComponent(e.loadableTemplateName)}${currentUser.id===e.userId?"":"&userId="+e.userId}" target="_blank" style="display:flex;flex-direction:row;" title=${s}><wc-icon primaryColor="pink" icon="printess-wand"></wc-icon> &nbsp ${e.templateName}</a></td>
              <td class=${this.headers.includes("Origin")?"":"hide"}>${e.origin}</td>
              <td class=${this.headers.includes("Shop Save ID")?"":"hide"}>${e.shopSaveId}</td>
              <td class=${this.headers.includes("Product Type")?"":"hide"}>${e.productType}</td>
              <td class=${this.headers.includes("Created")?"":"hide"}>${formatDistance(subDays(new Date(e.createdOn),0),new Date,{addSuffix:!0})}</td>
              <td class=${this.headers.includes("Finished")?"":"hide"}>${e.isFinished?formatDistance(subDays(new Date(e.finishedOn?e.finishedOn:0),0),new Date,{addSuffix:!0}):""}</td>
              <td class=${this.headers.includes("Status")?"":"hide"}>${this.statusValue(e.isFinished,e.isFailure,e.failureDetails,e.jobId,e.createdOn)}</td>
              <td class=${this.headers.includes("Failure Details")?"":"hide"}>${e.failureDetails}</td>
              <td class=${this.headers.includes("Pdf File")?"flex":"hide"}>${this.pdfValue(null===(t=e.result)||void 0===t?void 0:t.r,null===(r=e.result)||void 0===r?void 0:r.zip)}</td>
              <td class=${this.headers.includes("Documents")?"":"hide"}>${e.documents}</td>
              <td class=${this.headers.includes("Pages")?"":"hide"}>${e.pages}</td>
              <td class=${this.headers.includes("Size")?"":"hide"}>${e.size?T`${(e.size/1e6).toFixed(2)} MB`:"0 MB"}</td>
              <td class=${this.headers.includes("Loadable Template Name")?"":"hide"}><a href="https://editor.printess.com/?name=${e.loadableTemplateName}" target="_blank" title=${s}>${e.loadableTemplateName}</a></td>
            </tr>
          `}))}
          </tbody>
      </table>
    </div>
    `:T`<div class="loader"></div>`}`}showErrorMsg(e){new WcDialogErrorMessage(e).showDialog()}statusValue(e,t,r,s,i){return e&&!t?T`<wc-icon primaryColor="lightgreen" icon="check"></wc-icon>`:e?T`<wc-icon primaryColor="pink" icon="warning" @click=${()=>this.showErrorMsg(r)} style="cursor: pointer;"></wc-icon>`:T`<div class="spinner"></div>`}pdfValue(e,t){return e?T`${Object.keys(e).map((t=>T`
        <a href=${e[t]} style="display: inline-block" target="_blank">
          <wc-icon primaryColor="pink" icon="page-inverse" style="margin-right: 10px;"></wc-icon>
        </a>`))}`:t?T`
        <a href="${t}" target="_blank">
          <wc-icon primaryColor="pink" icon="page-inverse"></wc-icon>
        </a>`:T`<wc-icon primaryColor="gray" icon="page-light"></wc-icon>`}};__decorate$a([e$1({attribute:!1,type:Object})],WcPrintjobsTable.prototype,"data",void 0),__decorate$a([e$1({attribute:!1,type:Array})],WcPrintjobsTable.prototype,"headers",void 0),__decorate$a([e$1({attribute:!1,type:String})],WcPrintjobsTable.prototype,"errorMsg",void 0),__decorate$a([e$1({attribute:!1,type:Object})],WcPrintjobsTable.prototype,"productionStatus",void 0),WcPrintjobsTable=__decorate$a([n$1("wc-printjobs-table")],WcPrintjobsTable);var __decorate$9=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const mobileColumns=[{name:"id",title:"ID"},{name:"jobId",title:"Job ID"},{name:"userInfo",title:"User Info"},{name:"userId",title:"User ID"},{name:"sourceUserId",title:"Source User ID"},{name:"externalOrderId",title:"External Order ID"},{name:"origin",title:"Origin"},{name:"shopSaveId",title:"Shop Save ID"},{name:"productType",title:"Product Type"},{name:"createdOn",title:"Created"},{name:"result",title:"Pdf File"},{name:"loadableTemplateName",title:"Loadable Template Name"}];let WcDialogTableSettings=class extends h{constructor(){super(),this.state=["ID","Template Name","Created","Status","Pdf File","Documents","Pages","Size"],this.headerSelection=config.isMobile?mobileColumns:columns,this.backdrop=new WcBackdrop}static get styles(){return[dialogStyles,r$1`
      label {
        cursor: pointer;
        font-family: var(--printess-text-font);
      }
      input {
        width: auto;
      }

      [type="checkbox"] {
        position: relative;
        border: none;
        border-radius: 10px;
        outline: none;
        left: 0px;
        top: -10px;
        width: 40px;
        height: 16px;
        z-index: 0;
        -webkit-appearance: none;
      }

      [type="checkbox"]:focus, [type="checkbox"]:hover {
        display: hidden;
        border: none;
        outline: none;
      }

      [type="checkbox"] + label {
        position: relative;
        display: block;
        cursor: pointer;
        line-height: 1.3;
        padding-left: 70px;
        position: relative;
        margin-top: -35px;
      }
      [type="checkbox"] + label:before {
        width: 40px;
        height: 18px;
        border-radius: 30px;
        border: 2px solid #ddd;
        background-color: #EEE;
        content: "";
        margin-right: 15px;
        transition: background-color 0.5s linear;
        z-index: 5;
        position: absolute;
        left: 0px;
      }
      [type="checkbox"] + label:after {
        width: 18px;
        height: 18px;
        border-radius: 30px;
        background-color: #fff;
        content: "";
        transition: margin 0.1s linear;
        box-shadow: 0px 0px 5px #aaa;
        position: absolute;
        left: 2px;
        top: 2px;
        z-index: 10;
      }
      [type="checkbox"]:checked + label:before {
        background-color: #e35fbc;
      }
      [type="checkbox"]:checked + label:after {
        margin: 0 0 0 22px;
      }
    `]}showDialog(e){this.callback=e,document.body.appendChild(this.backdrop),document.body.appendChild(this);const t=localStorage.getItem("tableSettings");t?this.state=JSON.parse(t):this.state}closeDialog(){document.body.removeChild(this.backdrop),document.body.removeChild(this)}checkAll(e){var t,r;e.target.checked?(columns.forEach((e=>this.state.push(e.title))),null===(r=this.shadowRoot)||void 0===r||r.querySelectorAll("input").forEach((e=>e.checked=!0))):(null===(t=this.shadowRoot)||void 0===t||t.querySelectorAll("input").forEach((e=>e.checked=!1)),this.state=[])}addColumn(e){const t=e.target.value;if(this.state.includes(t)){const e=this.state.indexOf(t);this.state.splice(e,1)}else this.state=[...this.state,t]}adjustTable(){this.callback&&this.callback(this.state),localStorage.setItem("tableSettings",JSON.stringify(this.state)),this.closeDialog()}render(){return T`
      <div class="modal">
      
        <div class="modal-wrapper pink">
          <div class="modal-header">
            <slot name="title" class="modal-title">Select Columns</slot>
            <wc-icon primaryColor="arrows" icon="close" @click=${()=>this.closeDialog()}></wc-icon>
          </div>

          <div class="modal-content">
            <input @change=${this.checkAll} type="checkbox" name="all" id="all" value="Select All">
            <label for="all" style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #777777"> Select All</label>

            ${c(this.headerSelection,(e=>e.name),(e=>T`
              <input @change=${this.addColumn} type="checkbox" name=${e.name} id=${e.name} value=${e.title} ?checked=${this.state.includes(`${e.title}`)}>
              <label for=${e.name}> ${e.title}</label><br>
            `))}

            <button @click=${this.adjustTable} class="submit">Change Table Settings</button>
          </div>
        </div>
      </div>
    `}};__decorate$9([e$1({type:Array})],WcDialogTableSettings.prototype,"state",void 0),WcDialogTableSettings=__decorate$9([n$1("wc-dialog-table-settings")],WcDialogTableSettings);const paginationStyles=r$1`
  wc-icon {
    width: 25px;
    height: 25px;
  }

  .pagination-container {
    font-size: 14px; 
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    align-items: center;
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .page-button {
    cursor: pointer;
    margin-left: 10px;
    background-color: transparent;
    border: none;
    outline: none;
    width: 30px;
    height: 30px;
    border-radius: 4px;
  }

  .page-button:hover {
    background-color: #eee;
  }

  .page-button wc-icon {
    width: 20px;
    height: 20px;
  }

  .active-page {
    background-color: #d0049b;
    color: white;
  }

  .active-page:hover {
    background-color: #d0049b;
    cursor: default;
  }

  .disabled:hover, .disabled:focus {
    cursor: default;
    background-color: transparent;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    width: 80px;
  }

  .current-take {
    background-color: #f8f8f8;
    border-radius: 4px;
    border: none;
    outline: none;
    font-size: 14px;
    font-weight: 400;
    height: 40px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .entries-list {
    display: block;
    position: absolute;
    width: 80px;
    left: 0;
    z-index: 1;
    border: 1px solid lightgray;
    background-color: white;
    border-radius: 4px;
  }

  .top {
    top: 40px;
  }

  .bottom {
    bottom: 40px;
  }

  .entry {
    display: block;
    text-align: center;
    padding: 10px 20px;
    cursor: pointer;
  }

  .entry:hover {
    background-color: #eee;
  }

  .hidden {
    display: none;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .pagination-container {
      font-size: 12px;
      grid-template-columns: 2fr 1fr 3fr;
    }

    .current-take {
      font-size: 12px;
      height: 30px;
      width: 80px;
    }

    .top {
      top: 30px;
    }

    .bottom {
      bottom: 30px;
    }

    .page-button {
      margin-left: 0;
      width: 20px;
      height: 20px;
    }

    wc-icon {
      width: 15px;
      height: 15px;
    }

    .page-button wc-icon {
      width: 15px;
      height: 15px;
    }
  }
`;var __decorate$8=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcPagination=class extends h{constructor(e,t,r,s,i){super(),this.hideTopList=!0,this.hideBottomList=!0,this.page=1,this.take=100,this.skip=0,this.count=e,this.page=t,this.skip=r,this.take=s,this.position=i}static get styles(){return[paginationStyles]}getPageValues(e){this.callback=e}displayTopList(){this.hideTopList=!this.hideTopList}displayBottomList(){this.hideBottomList=!this.hideBottomList}changeEntries(e){const t=e.target.getAttribute("data-value");this.take=null!==t?parseInt(t):this.take,this.skip=0,this.page=1,"top"===this.position?this.hideTopList=!this.hideTopList:this.hideBottomList=!this.hideBottomList,this.callback&&this.callback(this.page,this.skip,this.take)}updateTable(){const e=this.count%this.take;this.skip=(this.page-1)*this.take,this.skip===this.count&&(this.take=e,this.skip=this.count-e),this.callback&&this.callback(this.page,this.skip,this.take)}nextPage(){this.page!==Math.ceil(this.count/this.take)&&(this.page++,this.updateTable())}prevPage(){1!==this.page&&(this.page--,this.updateTable())}firstPage(){1!==this.page&&(this.page=1,this.updateTable())}lastPage(){this.page!==Math.ceil(this.count/this.take)&&(this.page=Math.ceil(this.count/this.take),this.updateTable())}render(){return T`
    <div class="pagination-container">
      <div>
        ${config.isMobile?T`
          ${this.take*this.page-this.take+1} - ${this.page*this.take>this.count?this.count:this.page*this.take} / ${this.count}`:T`
        Showing ${this.take*this.page-this.take+1} to ${this.page*this.take>this.count?this.count:this.page*this.take} of ${this.count} entries`}
        
      </div>
      <div style="display: flex; justify-content: center; align-items: center;">
        ${config.isMobile?"":T`<span>Entries: &nbsp</span>`}
        <div class="dropdown">
          <div class="current-take" @click=${this.displayTopList}>${this.take}<wc-icon primaryColor="gray" icon="carret-down-solid" style="margin-left: 10px;"></wc-icon></div>
          <div class="entries-list ${this.position} ${this.hideTopList?"hidden":""}">
            <div @click=${this.changeEntries} class="entry" data-value="10">10</div>
            <div @click=${this.changeEntries} class="entry" data-value="20">20</div>
            <div @click=${this.changeEntries} class="entry" data-value="50">50</div>
            <div @click=${this.changeEntries} class="entry" data-value="100">100</div>
            <div @click=${this.changeEntries} class="entry" data-value="200">200</div>
            <div @click=${this.changeEntries} class="entry" data-value="500">500</div>
          </div>
        </div>
      </div>
      <div class="paging" style="display: flex; justify-content: flex-end; align-items: center;">
        <button @click=${this.firstPage} class="page-button ${1===this.page?"disabled":""}" style="margin: 0;">
          <wc-icon primaryColor=${1===this.page?"gray":"black"} icon="collapseLeft"></wc-icon>
        </button>
        <button @click=${this.prevPage} class="page-button ${1===this.page?"disabled":""}" style="margin: 0;">
          <wc-icon primaryColor=${1===this.page?"gray":"black"} icon="angle-left"></wc-icon>
        </button>
        <span style="margin: 0 10px;">${this.page} ${config.isMobile?"":T`of ${Math.ceil(this.count/this.take)}`}</span>
        <button @click=${this.nextPage} class="page-button ${this.page===Math.ceil(this.count/this.take)?"disabled":""}" style=" margin-left: 0;">
          <wc-icon primaryColor=${this.page===Math.ceil(this.count/this.take)?"gray":"black"} icon="angle-right"></wc-icon>
        </button>
        <button @click=${this.lastPage} class="page-button ${this.page===Math.ceil(this.count/this.take)?"disabled":""}" style="margin: 0 5px 0 0;">
          <wc-icon primaryColor=${this.page===Math.ceil(this.count/this.take)?"gray":"black"} icon="expandLeft"></wc-icon>
        </button>
      </div>
    </div>
  `}};__decorate$8([e$1({attribute:!1,type:Boolean})],WcPagination.prototype,"hideTopList",void 0),__decorate$8([e$1({attribute:!1,type:Boolean})],WcPagination.prototype,"hideBottomList",void 0),__decorate$8([e$1({attribute:!1,type:Number})],WcPagination.prototype,"page",void 0),__decorate$8([e$1({attribute:!1,type:Number})],WcPagination.prototype,"take",void 0),__decorate$8([e$1({attribute:!1,type:Number})],WcPagination.prototype,"skip",void 0),__decorate$8([e$1({attribute:!1,type:Number})],WcPagination.prototype,"count",void 0),__decorate$8([e$1({attribute:!1,type:String})],WcPagination.prototype,"position",void 0),WcPagination=__decorate$8([n$1("wc-pagination")],WcPagination);const tableStyles=r$1`
  .table-wrapper {
    margin-top: 15px;
    overflow: auto;
    border-bottom: 2px solid #d0049b;
    font-family: var(--printess-text-font);
  }

  a {
    text-decoration: none;
    color: white;
  }

  dl {
    display: grid;
    margin-top: 0;
    margin-bottom: 20px;
    grid-template-columns: 80px calc(100% - 80px);
  }

  .mobile-table-header {
    font-size: 14px;
    padding: 10px 20px;
    grid-column: 1 / span 2;
    background-color: #D0049B;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  dt, dd {
    display: flex;
    line-height: 16px;
    margin-left: 0;
    text-align: left;
    padding: 10px;
    font-size: 12px;
  }

  dd {
    display: flex;
    justify-content: space-between;
  }

  dt:nth-of-type(even), dd:nth-of-type(even) {
    background-color: #D0049B19;
  }

  dd a {
    text-decoration: none;
    color: #d3277c;
  }

  wc-icon {
    width: 15px;
    height: 15px;
  }

  .flex {
    display: flex;
  }

  .hide {
    display: none;
  }

  .loader {
    position: fixed;
    left: 50%;
    top: 50%;
    display: inline-block;
    width: 80px;
    height: 80px;
  }
  .loader:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid var(--printess-magenta);
    border-color: var(--printess-magenta) transparent var(--printess-magenta) transparent;
    animation: loader 1.2s linear infinite;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .spinner,
  .spinner:after {
    border-radius: 50%;
    width: 2em;
    height: 2em;
  }
  .spinner {
    font-size: 8px;
    position: relative;
    border-top: 0.5em solid rgba(230,0,126, 0.2);
    border-right: 0.5em solid rgba(230,0,126, 0.2);
    border-bottom: 0.5em solid rgba(230,0,126, 0.2);
    border-left: 0.5em solid #e6007e;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
  }
  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

`;var __decorate$7=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcPrintjobsTableMobile=class extends h{constructor(e,t){super(),this.data=e,this.headers=t;const r=localStorage.getItem("tableSettings");r?this.headers=JSON.parse(r):this.headers}static get styles(){return[tableStyles]}showError(e){console.log("error msg: ",e.message,"error code: ",e.code)}getUserInfo(e){let t="";if(this.data.users){const r=this.data.users.filter((t=>t.id===e.userId))[0];if(r&&(t+=r.d+" ("+r.e+")"),e.sourceUserId){const r=this.data.users.filter((t=>t.id===e.sourceUserId))[0];r&&(t+=", issued by "+r.d+" ("+r.e+")")}}return t}render(){return T`    
    ${this.data?T`
    <div class="table-wrapper">
      
        ${this.data&&c(this.data.orders,(e=>e.id),(e=>{var t,r;const s=this.getUserInfo(e);return T`
      <dl>
        ${this.headers.includes("Template Name")?T`
          <div class="mobile-table-header"><a href="https://editor.printess.com/?name=${encodeURIComponent(e.loadableTemplateName)}${currentUser.id===e.userId?"":"&userId="+e.userId}" target="_blank" style="display:flex;flex-direction:row;" title=${s}><wc-icon primaryColor="toolbar" icon="printess-wand"></wc-icon> &nbsp ${e.templateName}</a></div>
        `:""}
        ${this.headers.includes("ID")?T`
          <dt>ID</dt>
          <dd>${e.id}</dd>
        `:""}
        ${this.headers.includes("Job ID")?T`
          <dt>Job ID</dt>
          <dd>${e.jobId}</dd>
        `:""}
        ${this.headers.includes("User Info")?T`
          <dt>User Info</dt>
          <dd>${s}</dd>
        `:""}
        ${this.headers.includes("User ID")?T`
          <dt>User ID</dt>
          <dd>${e.userId}</dd>
        `:""}
        ${this.headers.includes("Source User ID")?T`
          <dt>Source User ID</dt>
          <dd>${e.sourceUserId}</dd>
        `:""}
        ${this.headers.includes("External Order ID")?T`
          <dt>External Order ID</dt>
          <dd>${e.externalOrderId}</dd>
        `:""}
        ${this.headers.includes("Origin")?T`
          <dt>Origin</dt>
          <dd>${e.origin}</dd>
        `:""}
        ${this.headers.includes("Shop Save ID")?T`
          <dt>Shop Save ID</dt>
          <dd>${e.shopSaveId}</dd>
        `:""}
        ${this.headers.includes("Product Type")?T`
          <dt>Product Type</dt>
          <dd>${e.productType}</dd>
        `:""}
        ${this.headers.includes("Created")?T`
          <dt>Created</dt>
          <dd>
            ${formatDistance(subDays(new Date(e.createdOn),0),new Date,{addSuffix:!0})}
            ${this.statusValue(e.isFinished,e.isFailure,e.failureDetails,e.jobId,e.createdOn)}
          </dd>
        `:""}
        ${this.headers.includes("Pdf File")?T`
          <dt>Pdf File</dt>
          <dd>
            ${this.pdfValue(null===(t=e.result)||void 0===t?void 0:t.r,null===(r=e.result)||void 0===r?void 0:r.zip)}
            (${e.size?T`${(e.size/1e6).toFixed(2)} MB`:"0 MB"})
          </dd>
        `:""}
        ${this.headers.includes("Loadable Template Name")?T`
          <dt>Loadable Template Name</dt>
          <dd><a href="https://editor.printess.com/?name=${encodeURIComponent(e.loadableTemplateName)}${currentUser.id===e.userId?"":"&userId="+e.userId}" target="_blank" title=${s}>${e.loadableTemplateName}</a></dd>
        `:""}
      </dl>
      `}))}
    

      <!-- <table class="layout display responsive-table">
        <thead>
          <tr>
            ${c(columns,(e=>e.name),(e=>T`
              <th class=${this.headers.includes(`${e.title}`)?"":"hide"}>${e.title}</th>
            `))}
          </tr>
        </thead>
        <tbody>
          ${this.data&&c(this.data.orders,(e=>e.id),(e=>{var t,r;const s=this.getUserInfo(e);return T`
            <tr>
              <td class='orders-id ${this.headers.includes("ID")?"":"hide"}'>${e.id}</td>
              <td class=${this.headers.includes("Job ID")?"":"hide"}>${e.jobId}</td>
              <td class=${this.headers.includes("User Info")?"":"hide"}>${s}</td>
              <td class=${this.headers.includes("User ID")?"":"hide"}>${e.userId}</td>
              <td class=${this.headers.includes("Source User ID")?"":"hide"}>${e.sourceUserId}</td>
              <td class=${this.headers.includes("External Order ID")?"":"hide"}>${e.externalOrderId}</td>
              <td class=${this.headers.includes("Template Name")?"":"hide"}><a href="https://editor.printess.com/?name=${encodeURIComponent(e.loadableTemplateName)}${currentUser.id===e.userId?"":"&userId="+e.userId}" target="_blank" style="display:flex;flex-direction:row;" title=${s}><wc-icon primaryColor="pink" icon="printess-wand"></wc-icon> &nbsp ${e.templateName}</a></td>
              <td class=${this.headers.includes("Origin")?"":"hide"}>${e.origin}</td>
              <td class=${this.headers.includes("Shop Save ID")?"":"hide"}>${e.shopSaveId}</td>
              <td class=${this.headers.includes("Product Type")?"":"hide"}>${e.productType}</td>
              <td class=${this.headers.includes("Created")?"":"hide"}>${formatDistance(subDays(new Date(e.createdOn),0),new Date,{addSuffix:!0})}</td>
              <td class=${this.headers.includes("Finished")?"":"hide"}>${e.isFinished?formatDistance(subDays(new Date(e.finishedOn?e.finishedOn:0),0),new Date,{addSuffix:!0}):""}</td>
              <td class=${this.headers.includes("Status")?"":"hide"}>${this.statusValue(e.isFinished,e.isFailure,e.failureDetails,e.jobId,e.createdOn)}</td>
              <td class=${this.headers.includes("Failure Details")?"":"hide"}>${e.failureDetails}</td>
              <td class=${this.headers.includes("Pdf File")?"flex":"hide"}>${this.pdfValue(null===(t=e.result)||void 0===t?void 0:t.r,null===(r=e.result)||void 0===r?void 0:r.zip)}</td>
              <td class=${this.headers.includes("Documents")?"":"hide"}>${e.documents}</td>
              <td class=${this.headers.includes("Pages")?"":"hide"}>${e.pages}</td>
              <td class=${this.headers.includes("Size")?"":"hide"}>${e.size?T`${(e.size/1e6).toFixed(2)} MB`:"0 MB"}</td>
              <td class=${this.headers.includes("Loadable Template Name")?"":"hide"}><a href="https://editor.printess.com/?name=${e.loadableTemplateName}" target="_blank" title=${s}>${e.loadableTemplateName}</a></td>
            </tr>
          `}))}
          </tbody>
      </table> -->
    </div>
    `:T`<div class="loader"></div>`}`}showErrorMsg(e){new WcDialogErrorMessage(e).showDialog()}statusValue(e,t,r,s,i){return e&&!t?T`<wc-icon primaryColor="lightgreen" icon="check"></wc-icon>`:e?T`<wc-icon primaryColor="pink" icon="warning" @click=${()=>this.showErrorMsg(r)} style="cursor: pointer;"></wc-icon>`:T`<div class="spinner"></div>`}pdfValue(e,t){return e?T`${Object.keys(e).map((t=>T`
        <a href=${e[t]} style="display: inline-block" target="_blank">
          <wc-icon primaryColor="pink" icon="page-inverse" style="margin-right: 10px;"></wc-icon>
        </a>`))}`:t?T`
        <a href="${t}" target="_blank">
          <wc-icon primaryColor="pink" icon="page-inverse"></wc-icon>
        </a>`:T`<wc-icon primaryColor="gray" icon="page-light"></wc-icon>`}};__decorate$7([e$1({attribute:!1,type:Object})],WcPrintjobsTableMobile.prototype,"data",void 0),__decorate$7([e$1({attribute:!1,type:Array})],WcPrintjobsTableMobile.prototype,"headers",void 0),__decorate$7([e$1({attribute:!1,type:String})],WcPrintjobsTableMobile.prototype,"errorMsg",void 0),__decorate$7([e$1({attribute:!1,type:Object})],WcPrintjobsTableMobile.prototype,"productionStatus",void 0),WcPrintjobsTableMobile=__decorate$7([n$1("wc-printjobs-table-mobile")],WcPrintjobsTableMobile);var __decorate$6=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},__awaiter$2=function(e,t,r,s){return new(r||(r=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function n(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,n)}c((s=s.apply(e,t||[])).next())}))};let WcPrintjobsPage=class extends h{constructor(){super(),this.headers=["ID","Template Name","Created","Status","Pdf File","Documents","Pages","Size"],this.hideFilter=!0,this.page=1,this.take=100,this.skip=0,this.isFilter=!1,this.loadTemplatesDebounce=new ValueDebounce((e=>__awaiter$2(this,void 0,void 0,(function*(){const t=yield api.loadOrders(e);t instanceof ServerErrorResponse?this.showError(t):this.data=t})))),this.date=new Date,this.date.setDate(this.date.getDate()-30),this.state=new SearchOrders({templateName:"",origin:"",productType:"",externalOrderId:"",take:this.take,startDate:this.date})}static get styles(){return[printjobsStyles]}setState(e){this.state=new SearchOrders(e,this.state)}showError(e){console.log("error msg: ",e.message,"error code: ",e.code)}handleOrder(e){if(console.log(e),1===this.page&&!this.isFilter){let t=this.data.count,r=this.data.users,s=[],i=!1;this.data.orders.forEach((r=>{r.id===e.id?(i=!0,e.isFinished?("isProcessing"!==this.status.value&&s.push(e),"isProcessing"===this.status.value&&t--):s.push(r)):s.push(r)})),i||("isProcessing"===this.status.value&&e.isFinished?(t--,s.length>this.take&&s.pop()):(t++,s=[e,...s],s.length>this.take&&s.pop())),this.data={orders:s,count:t,users:r}}}connectedCallback(){super.connectedCallback();const e=this.state.toDto();this.loadTemplatesDebounce.immediate(e),this.connectOrderStream()}connectOrderStream(){var e;this.orderStream&&this.orderStream.disconnect(),this.orderStream=new OrderStream(apiEndpoint,null!==(e=api.token)&&void 0!==e?e:"",this.handleOrder.bind(this)),this.orderStream}loadTemplates(){const e=this.state.toDto();this.loadTemplatesDebounce.change(e,500)}setSearchOrders(e,t){const r=new Nobs;this.page=1,r.setProperty(this.state,"skip",0),r.setProperty(this.state,"take",this.take),r.setProperty(this.state,t,e),this.setState(r),this.loadTemplates()}onSearchOrderChange(e){let t=e.target.value;this.isFilter=!0;const r=e.target.name;this.setSearchOrders(t,r)}onStatusChange(e){const t=new Nobs;let r,s;switch(this.page=1,this.isFilter=!0,e.target.value){case"all":r=void 0,s=void 0;break;case"isFinished":r=!0,s=!1;break;case"isProcessing":r=!1,s=!1,this.isFilter=!1;break;case"isFailed":r=!0,s=!0}t.setProperty(this.state,"skip",0),t.setProperty(this.state,"take",this.take),t.setProperty(this.state,"isFinished",r),t.setProperty(this.state,"isFailed",s),this.setState(t),this.loadTemplates()}expandFilter(){this.hideFilter=!this.hideFilter}resetFilter(){var e;this.page=1,this.isFilter=!1,this.state=new SearchOrders({templateName:"",origin:"",productType:"",externalOrderId:"",take:this.take,startDate:this.date}),null===(e=this.shadowRoot)||void 0===e||e.querySelectorAll("input").forEach((e=>e.value="")),this.status.value="all";const t=this.state.toDto();this.loadTemplatesDebounce.immediate(t)}setTableSettings(){(new WcDialogTableSettings).showDialog((e=>{this.headers=e}))}setPagination(e){if(this.data){const t=new WcPagination(this.data.count,this.page,this.skip,this.take,e);return t.getPageValues(((e,t,r)=>{this.page=e,this.skip=t,this.take=r,this.applyPagination()})),t}}applyPagination(){const e=new Nobs;e.setProperty(this.state,"take",this.take),e.setProperty(this.state,"skip",this.skip),this.setState(e),this.loadTemplates()}renderTable(){return config.isMobile?new WcPrintjobsTableMobile(this.data,this.headers):new WcPrintjobsTable(this.data,this.headers)}toggleAdminMode(){adm.useAdminMode=!adm.useAdminMode,this.connectOrderStream(),this.loadTemplates(),this.requestUpdate()}render(){return console.log(this.data),T`
      <div class="user-orders">
        <h3 class="topic">Print Jobs</h3>
        <p class="subtopic">Customer orders</p>

        <div class="filter-wrapper">
          <div class="setting-buttons">
            <button @click=${this.setTableSettings} class="table-settings">${config.isMobile?T`<wc-icon primaryColor="gray" icon="settings" style="width: 15px; margin-right: 10px;"></wc-icon>`:"select"} columns</button>
            <button @click=${this.loadTemplates} class="table-settings">${config.isMobile?T`<wc-icon primaryColor="gray" icon="sync-alt" style="width: 12px; margin-right: 10px;"></wc-icon>`:"refresh"}  printjobs</button>
          ${adm.canUseAdminMode?T`<button @click=${this.toggleAdminMode} class="table-settings"><wc-icon primaryColor="gray" icon=${adm.useAdminMode?"user-crown-solid":"user-solid"} style="width: 14px; margin-right: 10px;"></wc-icon>${adm.useAdminMode?"admin":"user"}</button>`:""}
          </div>

          <div class="inline">
            <wc-icon @click=${this.expandFilter} primaryColor="gray" icon=${this.hideFilter?"carret-right-solid":"carret-down-solid"} style="cursor: pointer;"></wc-icon>
            <label class="template-name-label" for="templateName">Search:</label>
            <input @keyup=${this.onSearchOrderChange} type="text" name="templateName" placeholder="template name" style="margin: 0 10px;">
            <wc-icon @click=${this.resetFilter} primaryColor="gray" icon="filter-reset" style="cursor: pointer;"></wc-icon>
          </div>
        </div>

        <div class="expanded-filter ${this.hideFilter?"hidden":""}" style="margin-top: 20px;">
          <div class="input-label">
            <label for="origin">Origin:</label>
            <input @keyup=${this.onSearchOrderChange} type="text" name="origin" placeholder="origin">
          </div>
          <div class="input-label">
            <label for="productType">Product Type:</label>
            <input @keyup=${this.onSearchOrderChange} type="text" name="productType" placeholder="product type">
          </div>
          <div class="input-label">
            <label for="externalOrderId">External Order ID:</label>
            <input @keyup=${this.onSearchOrderChange} type="text" name="externalOrderId" placeholder="external order id">
          </div>
          <div class="input-label">
            <label for="startDate">From:</label>
            <input @change=${this.onSearchOrderChange} type="date" name="startDate" placeholder="start date">
          </div>
          <div class="input-label">
            <label for="endDate">To:</label>
            <input @change=${this.onSearchOrderChange} type="date" name="endDate" placeholder="end date">
          </div>
          <div class="input-label">
            <label for="status">Status:</label>
            <select @change=${this.onStatusChange} name="status">
              <option value="all">All</option>
              <option value="isFinished">Finished</option>
              <option value="isProcessing">Unfinished</option>
              <option value="isFailed">Failed</option>
            </select>
          </div>
        </div>
        
        ${this.data&&0===this.data.count?T`<div style="width: 100%; display: flex; justify-content: center;"><p>~ No Print Jobs available ~</p></div>`:T`
        <div class="pagination" style="margin-top: 30px;">
          ${this.setPagination("top")}
        </div>
        
        <div class="table-container">
          ${this.renderTable()}
        </div>
        
        <div class="pagination" style="margin-top: 10px;">
          ${this.setPagination("bottom")}
        </div>
        `}
      </div>
  `}};__decorate$6([e$1({attribute:!1,type:Object})],WcPrintjobsPage.prototype,"state",void 0),__decorate$6([e$1({attribute:!1,type:Object})],WcPrintjobsPage.prototype,"data",void 0),__decorate$6([e$1({attribute:!1,type:Array})],WcPrintjobsPage.prototype,"headers",void 0),__decorate$6([e$1({attribute:!1,type:Boolean})],WcPrintjobsPage.prototype,"hideFilter",void 0),__decorate$6([e$1({attribute:!1,type:Number})],WcPrintjobsPage.prototype,"page",void 0),__decorate$6([e$1({attribute:!1,type:Number})],WcPrintjobsPage.prototype,"take",void 0),__decorate$6([e$1({attribute:!1,type:Number})],WcPrintjobsPage.prototype,"skip",void 0),__decorate$6([e$1({attribute:!1,type:Object})],WcPrintjobsPage.prototype,"date",void 0),__decorate$6([e$1({attribute:!1,type:Boolean})],WcPrintjobsPage.prototype,"isFilter",void 0),__decorate$6([o$1("select")],WcPrintjobsPage.prototype,"status",void 0),WcPrintjobsPage=__decorate$6([n$1("wc-printjobs-page")],WcPrintjobsPage);const statisticsStyles=r$1`
  .printjobs-statistics {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
  }

  .box {
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    padding: 15px 20px 5px;
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: rgb(248, 248, 248);
    border-radius: 4px;
    min-width: 200px;
  }

  wc-icon {
    grid-column: 1;
    grid-row: 1;
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }

  .text-wrapper {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .topic {
    font-size: 14px;
  }

  .value {
    font-size: 22px;
  }

  hr {
    grid-column: 1 / span 2;
    grid-row: 2;
    width: 100%;
    border: none;
    border-bottom: 1px solid gray;
  }

  .status {
    grid-column: 1 / span 2;
    grid-row: 2;
    font-size: 12px;
    color: #bbbbbb;
    padding-top: 10px;
    border-top: 1px solid #ccc;
    display: flex;
    flex-direction: row;
  }
`;var __decorate$5=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcPrintjobsStatistics=class extends h{constructor(e){super(),this.printjobs=0,this.data=e}static get styles(){return[statisticsStyles]}setState(e){this.state=new SearchOrders(e,this.state)}showError(e){console.log("error msg: ",e.message,"error code: ",e.code)}handleOrder(e){console.log(e),e.isFinished?this.printjobs--:this.printjobs++,this.data&&e.isFinished&&(this.data={orders:[e,...this.data.orders],count:this.data.count++,users:this.data.users})}connectedCallback(){super.connectedCallback(),this.connectOrderStream()}connectOrderStream(){var e;this.orderStream&&this.orderStream.disconnect(),this.orderStream=new OrderStream(apiEndpoint,null!==(e=api.token)&&void 0!==e?e:"",this.handleOrder.bind(this)),this.orderStream}usageValue(){let e=0;return this.data&&this.data.orders.forEach((t=>e+=t.size)),e<1e4?`${e} Byte`:e<1e8?`${(e/1e6).toFixed(2)} MB`:`${(e/1e9).toFixed(2)} GB`}getRecentPrintjobs(){const e=new Date;return e.setHours(e.getHours()-1),this.data.orders.filter((t=>new Date(t.createdOn).getTime()>=e.getTime()))}createdValue(){if(this.data){return this.getRecentPrintjobs().length}return 0}errorValue(){if(this.data){return this.getRecentPrintjobs().filter((e=>!0===e.isFailure)).length}return 0}creditValue(){if(this.data){const e=new Date;e.setDate(1),e.setHours(0),e.setMinutes(0),e.setSeconds(0);return this.data.orders.filter((t=>new Date(t.createdOn).getTime()>=e.getTime()&&!t.isFailure)).length}return 0}render(){return console.log("statistics",this.data),T`
      <div class="printjobs-statistics">
        <div class="space box">
          <wc-icon primaryColor="gray" icon="database"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">Total Usage</span>
            <span class="value">${this.usageValue()}</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="calendar-light" style="width: 15px; height: 15px;"></wc-icon>
            Last 30 days
          </div>
        </div>
        <div class="production box">
          <wc-icon primaryColor="gray" icon="page-light"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">In Production</span>
            <span class="value">${this.printjobs>0?this.printjobs:0}</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="sync-alt" style="width: 15px; height: 15px;"></wc-icon>
            Updated now
          </div>
        </div>
        <div class="creation box">
          <wc-icon primaryColor="gray" icon="page-inverse"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">Created</span>
            <span class="value">${Math.ceil(this.createdValue()/60)} / min</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="sync-alt" style="width: 15px; height: 15px;"></wc-icon>
            Updated now
          </div>
        </div>
        <div class="errors box">
          <wc-icon primaryColor="gray" icon="warning"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">Errors</span>
            <span class="value">${this.errorValue()}</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="clock-light" style="width: 15px; height: 15px;"></wc-icon>
            In the last hour
          </div>
        </div>
        <div class="credits box">
          <wc-icon primaryColor="gray" icon="coin"></wc-icon>
          <div class="text-wrapper">
            <span class="topic">Credits</span>
            <span class="value"><span style="color: ${this.creditValue()>1e3?"rgb(211, 39, 124)":"#555555"}">${this.creditValue()}</span> / 1.000</span>
          </div>
          <div class="status">
            <wc-icon primaryColor="lightgray" icon="calendar-light" style="width: 15px; height: 15px;"></wc-icon>
            Current month
          </div>
        </div>
      </div>
  `}};__decorate$5([e$1({attribute:!1,type:Object})],WcPrintjobsStatistics.prototype,"state",void 0),__decorate$5([e$1({attribute:!1,type:Object})],WcPrintjobsStatistics.prototype,"data",void 0),__decorate$5([e$1({attribute:!1,type:Number})],WcPrintjobsStatistics.prototype,"printjobs",void 0),WcPrintjobsStatistics=__decorate$5([n$1("wc-printjobs-statistics")],WcPrintjobsStatistics);const dashboardStyles=r$1`
  .dashboard {
    font-family: var(--printess-text-font);
    color: #555555;    
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
    color: #555555;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }
  }
`
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,isCEPolyfill="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,removeNodes=(e,t,r=null)=>{for(;t!==r;){const r=t.nextSibling;e.removeChild(t),t=r}},marker=`{{lit-${String(Math.random()).slice(2)}}}`,nodeMarker=`\x3c!--${marker}--\x3e`,markerRegex=new RegExp(`${marker}|${nodeMarker}`),boundAttributeSuffix="$lit$";class Template{constructor(e,t){this.parts=[],this.element=t;const r=[],s=[],i=document.createTreeWalker(t.content,133,null,!1);let a=0,o=-1,n=0;const{strings:c,values:{length:l}}=e;for(;n<l;){const e=i.nextNode();if(null!==e){if(o++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:r}=t;let s=0;for(let e=0;e<r;e++)endsWith(t[e].name,"$lit$")&&s++;for(;s-- >0;){const t=c[n],r=lastAttributeNameRegex.exec(t)[2],s=r.toLowerCase()+"$lit$",i=e.getAttribute(s);e.removeAttribute(s);const a=i.split(markerRegex);this.parts.push({type:"attribute",index:o,name:r,strings:a}),n+=a.length-1}}"TEMPLATE"===e.tagName&&(s.push(e),i.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(marker)>=0){const s=e.parentNode,i=t.split(markerRegex),a=i.length-1;for(let t=0;t<a;t++){let r,a=i[t];if(""===a)r=createMarker();else{const e=lastAttributeNameRegex.exec(a);null!==e&&endsWith(e[2],"$lit$")&&(a=a.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),r=document.createTextNode(a)}s.insertBefore(r,e),this.parts.push({type:"node",index:++o})}""===i[a]?(s.insertBefore(createMarker(),e),r.push(e)):e.data=i[a],n+=a}}else if(8===e.nodeType)if(e.data===marker){const t=e.parentNode;null!==e.previousSibling&&o!==a||(o++,t.insertBefore(createMarker(),e)),a=o,this.parts.push({type:"node",index:o}),null===e.nextSibling?e.data="":(r.push(e),o--),n++}else{let t=-1;for(;-1!==(t=e.data.indexOf(marker,t+1));)this.parts.push({type:"node",index:-1}),n++}}else i.currentNode=s.pop()}for(const e of r)e.parentNode.removeChild(e)}}const endsWith=(e,t)=>{const r=e.length-t.length;return r>=0&&e.slice(r)===t},isTemplatePartActive=e=>-1!==e.index,createMarker=()=>document.createComment(""),lastAttributeNameRegex=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/,walkerNodeFilter=133;function removeNodesFromTemplate(e,t){const{element:{content:r},parts:s}=e,i=document.createTreeWalker(r,133,null,!1);let a=nextActiveIndexInTemplateParts(s),o=s[a],n=-1,c=0;const l=[];let d=null;for(;i.nextNode();){n++;const e=i.currentNode;for(e.previousSibling===d&&(d=null),t.has(e)&&(l.push(e),null===d&&(d=e)),null!==d&&c++;void 0!==o&&o.index===n;)o.index=null!==d?-1:o.index-c,a=nextActiveIndexInTemplateParts(s,a),o=s[a]}l.forEach((e=>e.parentNode.removeChild(e)))}const countNodes=e=>{let t=11===e.nodeType?0:1;const r=document.createTreeWalker(e,133,null,!1);for(;r.nextNode();)t++;return t},nextActiveIndexInTemplateParts=(e,t=-1)=>{for(let r=t+1;r<e.length;r++){const t=e[r];if(isTemplatePartActive(t))return r}return-1};function insertNodeIntoTemplate(e,t,r=null){const{element:{content:s},parts:i}=e;if(null==r)return void s.appendChild(t);const a=document.createTreeWalker(s,133,null,!1);let o=nextActiveIndexInTemplateParts(i),n=0,c=-1;for(;a.nextNode();){c++;for(a.currentNode===r&&(n=countNodes(t),r.parentNode.insertBefore(t,r));-1!==o&&i[o].index===c;){if(n>0){for(;-1!==o;)i[o].index+=n,o=nextActiveIndexInTemplateParts(i,o);return}o=nextActiveIndexInTemplateParts(i,o)}}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const directives=new WeakMap,isDirective=e=>"function"==typeof e&&directives.has(e),noChange={},nothing={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class TemplateInstance{constructor(e,t,r){this.__parts=[],this.template=e,this.processor=t,this.options=r}update(e){let t=0;for(const r of this.__parts)void 0!==r&&r.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=isCEPolyfill?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],r=this.template.parts,s=document.createTreeWalker(e,133,null,!1);let i,a=0,o=0,n=s.nextNode();for(;a<r.length;)if(i=r[a],isTemplatePartActive(i)){for(;o<i.index;)o++,"TEMPLATE"===n.nodeName&&(t.push(n),s.currentNode=n.content),null===(n=s.nextNode())&&(s.currentNode=t.pop(),n=s.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(n.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(n,i.name,i.strings,this.options));a++}else this.__parts.push(void 0),a++;return isCEPolyfill&&(document.adoptNode(e),customElements.upgrade(e)),e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const policy=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),commentMarker=` ${marker} `;class TemplateResult{constructor(e,t,r,s){this.strings=e,this.values=t,this.type=r,this.processor=s}getHTML(){const e=this.strings.length-1;let t="",r=!1;for(let s=0;s<e;s++){const e=this.strings[s],i=e.lastIndexOf("\x3c!--");r=(i>-1||r)&&-1===e.indexOf("--\x3e",i+1);const a=lastAttributeNameRegex.exec(e);t+=null===a?e+(r?commentMarker:nodeMarker):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+marker}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==policy&&(t=policy.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const isPrimitive=e=>null===e||!("object"==typeof e||"function"==typeof e),isIterable=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class AttributeCommitter{constructor(e,t,r){this.dirty=!0,this.element=e,this.name=t,this.strings=r,this.parts=[];for(let e=0;e<r.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new AttributePart(this)}_getValue(){const e=this.strings,t=e.length-1,r=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=r[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!isIterable(e))return e}let s="";for(let i=0;i<t;i++){s+=e[i];const t=r[i];if(void 0!==t){const e=t.value;if(isPrimitive(e)||!isIterable(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class AttributePart{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===noChange||isPrimitive(e)&&e===this.value||(this.value=e,isDirective(e)||(this.committer.dirty=!0))}commit(){for(;isDirective(this.value);){const e=this.value;this.value=noChange,e(this)}this.value!==noChange&&this.committer.commit()}}class NodePart{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(createMarker()),this.endNode=e.appendChild(createMarker())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=createMarker()),e.__insert(this.endNode=createMarker())}insertAfterPart(e){e.__insert(this.startNode=createMarker()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;isDirective(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=noChange,e(this)}const e=this.__pendingValue;e!==noChange&&(isPrimitive(e)?e!==this.value&&this.__commitText(e):e instanceof TemplateResult?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):isIterable(e)?this.__commitIterable(e):e===nothing?(this.value=nothing,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,r="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=r:this.__commitNode(document.createTextNode(r)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof TemplateInstance&&this.value.template===t)this.value.update(e.values);else{const r=new TemplateInstance(t,e.processor,this.options),s=r._clone();r.update(e.values),this.__commitNode(s),this.value=r}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let r,s=0;for(const i of e)r=t[s],void 0===r&&(r=new NodePart(this.options),t.push(r),0===s?r.appendIntoPart(this):r.insertAfterPart(t[s-1])),r.setValue(i),r.commit(),s++;s<t.length&&(t.length=s,this.clear(r&&r.endNode))}clear(e=this.startNode){removeNodes(this.startNode.parentNode,e.nextSibling,this.endNode)}}class BooleanAttributePart{constructor(e,t,r){if(this.value=void 0,this.__pendingValue=void 0,2!==r.length||""!==r[0]||""!==r[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=r}setValue(e){this.__pendingValue=e}commit(){for(;isDirective(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=noChange,e(this)}if(this.__pendingValue===noChange)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=noChange}}class PropertyCommitter extends AttributeCommitter{constructor(e,t,r){super(e,t,r),this.single=2===r.length&&""===r[0]&&""===r[1]}_createPart(){return new PropertyPart(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class PropertyPart extends AttributePart{}let eventOptionsSupported=!1;(()=>{try{const e={get capture(){return eventOptionsSupported=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class EventPart{constructor(e,t,r){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=r,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;isDirective(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=noChange,e(this)}if(this.__pendingValue===noChange)return;const e=this.__pendingValue,t=this.value,r=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),s=null!=e&&(null==t||r);r&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),s&&(this.__options=getOptions(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=noChange}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const getOptions=e=>e&&(eventOptionsSupported?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function templateFactory(e){let t=templateCaches.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},templateCaches.set(e.type,t));let r=t.stringsArray.get(e.strings);if(void 0!==r)return r;const s=e.strings.join(marker);return r=t.keyString.get(s),void 0===r&&(r=new Template(e,e.getTemplateElement()),t.keyString.set(s,r)),t.stringsArray.set(e.strings,r),r}const templateCaches=new Map,parts=new WeakMap,render$1=(e,t,r)=>{let s=parts.get(t);void 0===s&&(removeNodes(t,t.firstChild),parts.set(t,s=new NodePart(Object.assign({templateFactory:templateFactory},r))),s.appendInto(t)),s.setValue(e),s.commit()};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class DefaultTemplateProcessor{handleAttributeExpressions(e,t,r,s){const i=t[0];if("."===i){return new PropertyCommitter(e,t.slice(1),r).parts}if("@"===i)return[new EventPart(e,t.slice(1),s.eventContext)];if("?"===i)return[new BooleanAttributePart(e,t.slice(1),r)];return new AttributeCommitter(e,t,r).parts}handleTextExpression(e){return new NodePart(e)}}const defaultTemplateProcessor=new DefaultTemplateProcessor;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const html=(e,...t)=>new TemplateResult(e,t,"html",defaultTemplateProcessor)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,getTemplateCacheKey=(e,t)=>`${e}--${t}`;let compatibleShadyCSSVersion=!0;void 0===window.ShadyCSS?compatibleShadyCSSVersion=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),compatibleShadyCSSVersion=!1);const shadyTemplateFactory=e=>t=>{const r=getTemplateCacheKey(t.type,e);let s=templateCaches.get(r);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},templateCaches.set(r,s));let i=s.stringsArray.get(t.strings);if(void 0!==i)return i;const a=t.strings.join(marker);if(i=s.keyString.get(a),void 0===i){const r=t.getTemplateElement();compatibleShadyCSSVersion&&window.ShadyCSS.prepareTemplateDom(r,e),i=new Template(t,r),s.keyString.set(a,i)}return s.stringsArray.set(t.strings,i),i},TEMPLATE_TYPES=["html","svg"],removeStylesFromLitTemplates=e=>{TEMPLATE_TYPES.forEach((t=>{const r=templateCaches.get(getTemplateCacheKey(t,e));void 0!==r&&r.keyString.forEach((e=>{const{element:{content:t}}=e,r=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{r.add(e)})),removeNodesFromTemplate(e,r)}))}))},shadyRenderSet=new Set,prepareTemplateStyles=(e,t,r)=>{shadyRenderSet.add(e);const s=r?r.element:document.createElement("template"),i=t.querySelectorAll("style"),{length:a}=i;if(0===a)return void window.ShadyCSS.prepareTemplateStyles(s,e);const o=document.createElement("style");for(let e=0;e<a;e++){const t=i[e];t.parentNode.removeChild(t),o.textContent+=t.textContent}removeStylesFromLitTemplates(e);const n=s.content;r?insertNodeIntoTemplate(r,o,n.firstChild):n.insertBefore(o,n.firstChild),window.ShadyCSS.prepareTemplateStyles(s,e);const c=n.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)t.insertBefore(c.cloneNode(!0),t.firstChild);else if(r){n.insertBefore(o,n.firstChild);const e=new Set;e.add(o),removeNodesFromTemplate(r,e)}},render=(e,t,r)=>{if(!r||"object"!=typeof r||!r.scopeName)throw new Error("The `scopeName` option is required.");const s=r.scopeName,i=parts.has(t),a=compatibleShadyCSSVersion&&11===t.nodeType&&!!t.host,o=a&&!shadyRenderSet.has(s),n=o?document.createDocumentFragment():t;if(render$1(e,n,Object.assign({templateFactory:shadyTemplateFactory(s)},r)),o){const e=parts.get(n);parts.delete(n);const r=e.value instanceof TemplateInstance?e.value.template:void 0;prepareTemplateStyles(s,n,r),removeNodes(t,t.firstChild),t.appendChild(n),parts.set(t,e)}!i&&a&&window.ShadyCSS.styleElement(t.host)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
var _a$1;window.JSCompiler_renameProperty=(e,t)=>e;const defaultConverter={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},notEqual=(e,t)=>t!==e&&(t==t||e==e),defaultPropertyDeclaration={attribute:!0,type:String,converter:defaultConverter,reflect:!1,hasChanged:notEqual},STATE_HAS_UPDATED=1,STATE_UPDATE_REQUESTED=4,STATE_IS_REFLECTING_TO_ATTRIBUTE=8,STATE_IS_REFLECTING_TO_PROPERTY=16,finalized="finalized";class UpdatingElement extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,r)=>{const s=this._attributeNameForProperty(r,t);void 0!==s&&(this._attributeToPropertyMap.set(s,r),e.push(s))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=defaultPropertyDeclaration){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const r="symbol"==typeof e?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,r,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}static getPropertyDescriptor(e,t,r){return{get(){return this[t]},set(s){const i=this[e];this[t]=s,this.requestUpdateInternal(e,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||defaultPropertyDeclaration}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty(finalized)||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const r of t)this.createProperty(r,e[r])}}static _attributeNameForProperty(e,t){const r=t.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,r=notEqual){return r(e,t)}static _propertyValueFromAttribute(e,t){const r=t.type,s=t.converter||defaultConverter,i="function"==typeof s?s:s.fromAttribute;return i?i(e,r):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const r=t.type,s=t.converter;return(s&&s.toAttribute||defaultConverter.toAttribute)(e,r)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,r){t!==r&&this._attributeToProperty(e,r)}_propertyToAttribute(e,t,r=defaultPropertyDeclaration){const s=this.constructor,i=s._attributeNameForProperty(e,r);if(void 0!==i){const e=s._propertyValueToAttribute(t,r);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(i):this.setAttribute(i,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const r=this.constructor,s=r._attributeToPropertyMap.get(e);if(void 0!==s){const e=r.getPropertyOptions(s);this._updateState=16|this._updateState,this[s]=r._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,r){let s=!0;if(void 0!==e){const i=this.constructor;r=r||i.getPropertyOptions(e),i._valueHasChanged(this[e],t,r.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==r.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,r))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(e){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(t){throw e=!1,this._markUpdated(),t}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}UpdatingElement[_a$1=finalized]=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const standardProperty=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?Object.assign(Object.assign({},t),{finisher(r){r.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(r){r.createProperty(t.key,e)}},legacyProperty=(e,t,r)=>{t.constructor.createProperty(r,e)};function property(e){return(t,r)=>void 0!==r?legacyProperty(e,t,r):standardProperty(e,t)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const supportsAdoptingStyleSheets=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,constructionToken=Symbol();class CSSResult{constructor(e,t){if(t!==constructionToken)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(supportsAdoptingStyleSheets?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const unsafeCSS=e=>new CSSResult(String(e),constructionToken),textFromCSSResult=e=>{if(e instanceof CSSResult)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)},css=(e,...t)=>{const r=t.reduce(((t,r,s)=>t+textFromCSSResult(r)+e[s+1]),e[0]);return new CSSResult(r,constructionToken)};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const renderNotImplemented={};class LitElement extends UpdatingElement{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,r)=>e.reduceRight(((e,r)=>Array.isArray(r)?t(r,e):(e.add(r),e)),r),r=t(e,new Set),s=[];r.forEach((e=>s.unshift(e))),this._styles=s}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!supportsAdoptingStyleSheets){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new CSSResult(String(t),constructionToken)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?supportsAdoptingStyleSheets?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==renderNotImplemented&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return renderNotImplemented}}LitElement.finalized=!0,LitElement.render=render,LitElement.shadowRootOptions={mode:"open"};
/**
 * @license
 * Copyright 2014-2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const loaderPromise=new Promise(((e,t)=>{if("undefined"!=typeof google&&google.charts&&"function"==typeof google.charts.load)e();else{let r=document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');r||(r=document.createElement("script"),r.src="https://www.gstatic.com/charts/loader.js",document.head.appendChild(r)),r.addEventListener("load",e),r.addEventListener("error",t)}}));async function load(e={}){await loaderPromise;const{version:t="current",packages:r=["corechart"],language:s=document.documentElement.lang||"en",mapsApiKey:i}=e;return google.charts.load(t,{packages:r,language:s,mapsApiKey:i})}async function dataTable(e){if(await load(),null==e)return new google.visualization.DataTable;if(e.getNumberOfRows)return e;if(e.cols)return new google.visualization.DataTable(e);if(e.length>0)return google.visualization.arrayToDataTable(e);if(0===e.length)throw new Error("Data was empty.");throw new Error("Data format was not recognized.")}async function createChartWrapper(e){return await load(),new google.visualization.ChartWrapper({container:e})}
/**
 * @license
 * Copyright 2014-2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var __decorate$4=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};const DEFAULT_EVENTS=["ready","select"],CHART_TYPES={area:"AreaChart",bar:"BarChart","md-bar":"google.charts.Bar",bubble:"BubbleChart",calendar:"Calendar",candlestick:"CandlestickChart",column:"ColumnChart",combo:"ComboChart",gantt:"Gantt",gauge:"Gauge",geo:"GeoChart",histogram:"Histogram",line:"LineChart","md-line":"google.charts.Line",org:"OrgChart",pie:"PieChart",sankey:"Sankey",scatter:"ScatterChart","md-scatter":"google.charts.Scatter","stepped-area":"SteppedAreaChart",table:"Table",timeline:"Timeline",treemap:"TreeMap",wordtree:"WordTree"};class GoogleChart extends LitElement{constructor(){super(...arguments),this.type="column",this.events=[],this.options=void 0,this.cols=void 0,this.rows=void 0,this.data=void 0,this.view=void 0,this.selection=void 0,this.drawn=!1,this._data=void 0,this.chartWrapper=null,this.redrawTimeoutId=void 0}render(){return html`
      <div id="styles"></div>
      <div id="chartdiv"></div>
    `}firstUpdated(){createChartWrapper(this.shadowRoot.getElementById("chartdiv")).then((e=>{this.chartWrapper=e,this.typeChanged(),google.visualization.events.addListener(e,"ready",(()=>{this.drawn=!0})),google.visualization.events.addListener(e,"select",(()=>{this.selection=e.getChart().getSelection()})),this.propagateEvents(DEFAULT_EVENTS,e)}))}updated(e){e.has("type")&&this.typeChanged(),(e.has("rows")||e.has("cols"))&&this.rowsOrColumnsChanged(),e.has("data")&&this.dataChanged(),e.has("view")&&this.viewChanged(),(e.has("_data")||e.has("options"))&&this.redraw(),e.has("selection")&&this.selectionChanged()}typeChanged(){if(null==this.chartWrapper)return;this.chartWrapper.setChartType(CHART_TYPES[this.type]||this.type);const e=this.chartWrapper.getChart();google.visualization.events.addOneTimeListener(this.chartWrapper,"ready",(()=>{const t=this.chartWrapper.getChart();t!==e&&this.propagateEvents(this.events.filter((e=>!DEFAULT_EVENTS.includes(e))),t);const r=this.shadowRoot.getElementById("styles");r.children.length||this.localizeGlobalStylesheets(r),this.selection&&this.selectionChanged()})),this.redraw()}propagateEvents(e,t){for(const r of e)google.visualization.events.addListener(t,r,(e=>{this.dispatchEvent(new CustomEvent(`google-chart-${r}`,{bubbles:!0,composed:!0,detail:{chart:this.chartWrapper.getChart(),data:e}}))}))}selectionChanged(){if(null==this.chartWrapper)return;const e=this.chartWrapper.getChart();if(null!=e&&e.setSelection){if("timeline"===this.type){const t=JSON.stringify(e.getSelection());if(JSON.stringify(this.selection)===t)return}e.setSelection(this.selection)}}redraw(){null!=this.chartWrapper&&null!=this._data&&(this.chartWrapper.setDataTable(this._data),this.chartWrapper.setOptions(this.options||{}),this.drawn=!1,void 0!==this.redrawTimeoutId&&clearTimeout(this.redrawTimeoutId),this.redrawTimeoutId=window.setTimeout((()=>{this.chartWrapper.draw()}),5))}get imageURI(){if(null==this.chartWrapper)return null;const e=this.chartWrapper.getChart();return e&&e.getImageURI()}viewChanged(){this.view&&(this._data=this.view)}async rowsOrColumnsChanged(){const{rows:e,cols:t}=this;if(e&&t)try{const r=await dataTable({cols:t});r.addRows(e),this._data=r}catch(e){this.shadowRoot.getElementById("chartdiv").textContent=e}}dataChanged(){let e,t=this.data;if(!t)return;let r=!1;try{t=JSON.parse(t)}catch(e){r="string"==typeof t||t instanceof String}e=r?fetch(t).then((e=>e.json())):Promise.resolve(t),e.then(dataTable).then((e=>{this._data=e}))}localizeGlobalStylesheets(e){const t=Array.from(document.head.querySelectorAll('link[rel="stylesheet"][type="text/css"][id^="load-css-"]'));for(const r of t){const t=document.createElement("link");t.setAttribute("rel","stylesheet"),t.setAttribute("type","text/css"),t.setAttribute("href",r.getAttribute("href")),e.appendChild(t)}}}GoogleChart.styles=css`
    :host {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      margin: 0;
      padding: 0;
      width: 400px;
      height: 300px;
    }

    :host([hidden]) {
      display: none;
    }

    :host([type="gauge"]) {
      width: 300px;
      height: 300px;
    }

    #chartdiv {
      width: 100%;
    }

    /* Workaround for slow initial ready event for tables. */
    .google-visualization-table-loadtest {
      padding-left: 6px;
    }
  `,__decorate$4([property({type:String,reflect:!0})],GoogleChart.prototype,"type",void 0),__decorate$4([property({type:Array})],GoogleChart.prototype,"events",void 0),__decorate$4([property({type:Object,hasChanged:()=>!0})],GoogleChart.prototype,"options",void 0),__decorate$4([property({type:Array})],GoogleChart.prototype,"cols",void 0),__decorate$4([property({type:Array})],GoogleChart.prototype,"rows",void 0),__decorate$4([property({type:String})],GoogleChart.prototype,"data",void 0),__decorate$4([property({type:Object})],GoogleChart.prototype,"view",void 0),__decorate$4([property({type:Array})],GoogleChart.prototype,"selection",void 0),__decorate$4([property({type:Object})],GoogleChart.prototype,"_data",void 0),customElements.define("google-chart",GoogleChart);var __decorate$3=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o},__awaiter$1=function(e,t,r,s){return new(r||(r=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function n(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,n)}c((s=s.apply(e,t||[])).next())}))};let WcDashboardPage=class extends h{constructor(){super(),this.loadTemplatesDebounce=new ValueDebounce((e=>__awaiter$1(this,void 0,void 0,(function*(){const t=yield api.loadOrders(e);t instanceof ServerErrorResponse?this.showError(t):this.data=t}))));const e=new Date;e.setDate(e.getDate()-30),this.state=new SearchOrders({templateName:"",origin:"",productType:"",externalOrderId:"",startDate:e})}static get styles(){return[dashboardStyles]}setState(e){this.state=new SearchOrders(e,this.state)}showError(e){console.log("error msg: ",e.message,"error code: ",e.code)}connectedCallback(){super.connectedCallback();const e=this.state.toDto();this.loadTemplatesDebounce.immediate(e)}renderStatistics(){return new WcPrintjobsStatistics(this.data)}render(){return console.log("dashboard",this.data),T`
      <div class="dashboard">
        <h3 class="topic">Dashboard</h3>
        <p class="subtopic">Printjobs Statistics</p>

        <div class="statistics-container">
          ${this.renderStatistics()}
        </div>

        <!-- <div class="daily-printjobs">
          <google-chart style="width: 100%"
            type='line'
            data='[["Bar", "Height" ], ["Bar 1", 10], ["Bar 2", 14], ["Bar 3", 16], ["Bar 4", 22],["Bar 5", 28]]'>
          </google-chart>
        </div> -->
      </div>
  `}};__decorate$3([e$1({attribute:!1,type:Object})],WcDashboardPage.prototype,"state",void 0),__decorate$3([e$1({attribute:!1,type:Object})],WcDashboardPage.prototype,"data",void 0),WcDashboardPage=__decorate$3([n$1("wc-dashboard-page")],WcDashboardPage);const paymentStyles=r$1`
  .payment-page {
    font-family: var(--printess-text-font);
    color: #555555;
  }

  .topic {
    font-size: 22px;
    font-weight: 500;
    font-family: var(--printess-header-font);
  }
  
  .icons {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .icon {
    margin: 20px;
    padding-top: 10px;
    font-size: 12px;
  }

  wc-icon {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .topic {
      font-size: 20px;
    }

    .subtopic {
      font-size: 14px;
    }
  }
`;var __decorate$2=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcPaymentPage=class extends h{constructor(){super(...arguments),this.wcicons=["page-light","coin-light","coin","page-inverse","calendar-light","calendar-alt","clock-light","sync-alt","coins","database","angle-left","angle-right","chevron-left","chevron-right","filter-reset","compact-disc","chevron-double-down-duotone","image","portrait","bezier","text","pathText","magnet","pointer","close-square","close","docRef","collapseLeft","expandLeft","edit","pen","pencil-ruler","plus","plus-circle","plus-square","minus","shapes","square","settings","vector-shape","address-card","paperclip","facing-pages","page","cog","perspective","style","story","text-flow","exchange","text-align-justify-justify","text-align-justify-left","text-align-justify-right","text-align-justify-center","text-align-left","text-align-right","text-align-center","check","check-square","user-circle","user-solid","user-crown-solid","arrow-left","arrow-right","arrow-up","arrow-down","arrows","arrows-circle","arrows-h","arrows-v","carret-down-solid","carret-right-solid","text-size","text-width","line-height","line-width","palette","brush","undo","undo-solid","redo","redo-solid","copy","copy-solid","paste","cut","object-ungroup","trash","trash-solid","remove-format","clipboard","search-plus","search-minus","search-light","save","slash","empty","cloud-upload-alt","folder-open-solid","tint","warp-arc","warp-flag","warp-bulge","warp-arc-upper","warp-pit-upper","warp-arc-lower","warp-pit-lower","warp-fish","warp-squeeze","warp-mug","mesh","crop","fill-image","fit-image","vertical-align-bottom-baseline","vertical-align-center-baseline","vertical-align-center","vertical-align-top","vertical-align-bottom","warning","effects","robot","microchip","record","play","running","rotator","lock-closed","lock-open","lock-closed-solid","user-lock-closed","user-lock-opened","link","stroke-cap-round","stroke-cap-projecting","stroke-cap-butt","stroke-align-center","stroke-align-inside","stroke-align-outside","stroke-join-miter","stroke-join-round","stroke-join-bevel","wrap-both-sides","no-wrap","printess-wand","print-solid","shopping-cart","shopping-cart-solid","shopping-cart-add","folder-plus","eye-solid","eye-solid-slash","font","send-back","send-backward","bring-front","bring-forward","distort","list-ul","ellipsis-v","sun-light","adjust","scroll-old","align-top","align-middle","align-bottom","align-left","align-center","align-right","space-vertical-around","space-vertical-between","space-horizontal-around","space-horizontal-between","layer-group","ruler","layout-snippet","layout-snippet-invers","group-snippet","group-snippet-invers","primary-doc","primary-doc-invers","preview-doc","preview-doc-invers","production-doc","production-doc-invers","facebook-round","clock-solid","page-plus-solid","user-friends-solid","opacity","file-invoice","help","triangle-solid","mirror-x","mirror-y"].sort()}static get styles(){return[paymentStyles]}render(){return T`
            <div class="payment-page">
                <h3 class="topic">Payments</h3>
                <p class="subtopic">Order list</p>
            
                <div class="icons">
                    ${this.wcicons.map((e=>T`<p class="icon">
                        <wc-icon primaryColor="green" icon="${e}"></wc-icon><span>${e}</span>
                    </p>`))}
                </div>
            </div>
        `}};__decorate$2([e$1({type:Array})],WcPaymentPage.prototype,"wcicons",void 0),WcPaymentPage=__decorate$2([n$1("wc-payment-page")],WcPaymentPage);const layoutStyles=r$1`
  .account-layout {
    font-family: var(--printess-font);
    height: 100vh;
    display: grid;
    grid-template-rows: 50px 1fr;
    grid-template-columns: 200px 1fr;
  }

  #user-content {
    grid-column: 2/3;
    grid-row: 2/3;
    padding: 40px 50px;
    overflow-y: scroll;
  }
  
  .drawer {
    background-color: #ececec;
    grid-column: 1/2;
    grid-row: 2/3;
    border-right: 1px solid #1a39601a;
    outline: none;
    padding: 50px;
  }

  @media (max-width: ${config.mobileDeviceWidth}px) {
    .account-layout {
      display: flex;
      flex-direction: column;
    }

    #user-content {
      padding: 50px 30px 20px;
    }

    .drawer {
      position: fixed;
      top: 50;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      height: auto;
      padding: 0;
      z-index: 10;
    }
  }
`,navbarStyles=r$1`
  header {
    grid-column: 1/3;
    grid-row: 1/2;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    z-index: 1;
    height: 50px;
    background-color: var(--printess-navbar-blue);
    padding-left: 70.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #printess-logo {
    display: inline-block;
    height: 35px;
    width: 120px;
    padding-bottom: 5px;
    padding-left: 0px;
    background-size: 100%;
    background-image: url(https://printess.com/printess-white-2.svg);
    background-position: 0px 0px;
    background-size: contain;
    background-repeat: no-repeat;
    text-decoration: none;
    background-origin: content-box;
  }
`,drawerStyles=r$1`  
  .tab {
    cursor: pointer;
    color: #222;
    font-family: var(--printess-font);
    font-size: 18px;
    font-weight: 500;
    line-height: 40px;
    color: #555555;
  }

  .selected {
    color: var(--printess-pink);
  }

  .user-icon {
    display: flex;
    align-items: center;
    position: relative;
  }

  .hidden {
    display: none;
  }

    @media (max-width: ${config.mobileDeviceWidth}px) {
    .menu-icon {
      position: fixed;
      top: 17px;
      left: 20px;
      height: 25px;
      width: 30px;
    }

    .tab {
      border-bottom: 1px solid #ddd;
      width: 100%;
      font-size: 15px;
      justify-content: center;
    }

    .hidden {
      display: none !important;
    }
  }
`;var __decorate$1=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcAppDrawer=class extends h{constructor(e){super(),this.selectedDrawer="dashboard",this.drawerOpen=!1,this.debug="localhost"===window.location.hostname||window.location.href.indexOf("debug=1")>0||!0===window.printessDebug,this.drawers=[{name:"dashboard",title:"Dashboard"},{name:"account",title:"User Profile"},{name:"templates",title:"Templates"},{name:"printJobs",title:"Print Jobs"},{name:"editor",title:"Editor"},{name:"payment",title:"Payment"},{name:"settings",title:"Settings"}],this.publicDrawer=[{name:"dashboard",title:"Dashboard"},{name:"account",title:"User Profile"},{name:"printJobs",title:"Print Jobs"},{name:"editor",title:"Editor"}],this.selectedDrawer=e}static get styles(){return[drawerStyles]}getDrawerSelection(e){this.callback=e}openDrawer(){this.drawerOpen=!this.drawerOpen,this.requestUpdate()}setDrawerSelection(e){this.selectedDrawer=e,this.callback&&this.callback(this.selectedDrawer)}render(){return T`
      ${config.isMobile?T`<wc-icon @click=${this.openDrawer} class="menu-icon" primaryColor="toolbar" icon=${this.drawerOpen?"close":"bars-light"}></wc-icon>`:""} 
      <aside class="drawer ${!this.drawerOpen&&config.isMobile?"hidden":""}">
        ${this.debug?this.drawers.map((e=>T`<div class="tab ${this.selectedDrawer===e.name?"selected":""}" style="display: flex; align-items: center;"
          @click=${()=>this.setDrawerSelection(e.name)}>${e.title}<wc-icon class=${"editor"===e.name?"":"hidden"} primaryColor=${"editor"===this.selectedDrawer?"pink":"gray"} icon="printess-wand" style="margin-left: 10px; width: 17px; height: 17px;"></wc-icon></div>`)):this.publicDrawer.map((e=>T`<div class="tab ${this.selectedDrawer===e.name?"selected":""}"  style="display: flex; align-items: center;"
          @click=${()=>this.setDrawerSelection(e.name)}>${e.title}<wc-icon class=${"editor"===e.name?"":"hidden"} primaryColor=${"editor"===this.selectedDrawer?"pink":"gray"} icon="printess-wand" style="margin-left: 10px; width: 17px; height: 17px;"></wc-icon></div>`))}
      </aside>
    `}};__decorate$1([e$1({type:String})],WcAppDrawer.prototype,"selectedDrawer",void 0),WcAppDrawer=__decorate$1([n$1("wc-app-drawer")],WcAppDrawer);var __decorate=function(e,t,r,s){var i,a=arguments.length,o=a<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,r,s);else for(var n=e.length-1;n>=0;n--)(i=e[n])&&(o=(a<3?i(o):a>3?i(t,r,o):i(t,r))||o);return a>3&&o&&Object.defineProperty(t,r,o),o};let WcAppLayout=class extends h{constructor(){super(...arguments),this.selectedDrawer="dashboard",this.drawerOpen=!1}static get styles(){return[layoutStyles,navbarStyles]}render(){return T`
        <div class="account-layout">
            <header>                
                <a href="https://printess.com" id="printess-logo"></a>
                <div class="user-icon" style="margin-right: 40px;">
                    <wc-icon @mousedown=${e=>this.userClick(e)} icon="user-solid" style="width: 30px; height: 25px; cursor: pointer;"></wc-icon>
                </div>
            </header>

            <div class="drawer">${this.renderDrawer()}</div>            
            
            <div id="user-content">
                ${this.getUserContent()}
            </div>
        </div>
        `}openDrawer(){this.drawerOpen=!this.drawerOpen,this.requestUpdate()}renderDrawer(){const e=new WcAppDrawer(this.selectedDrawer);return e.getDrawerSelection((e=>{this.selectedDrawer=e})),e}getUserContent(){switch(this.selectedDrawer){case"account":return new WcAccountPage;case"templates":return new WcTemplatesPage;case"printJobs":return new WcPrintjobsPage;case"dashboard":return new WcDashboardPage;case"editor":window.open("https://editor.printess.com/","_self");break;case"payment":return new WcPaymentPage;case"settings":return T`<p>not implemented</p>`;default:assertNever(this.selectedDrawer)}}userClick(e){showCtxMenu(e,[{caption:currentUser.displayName,disabled:!0},{caption:"Log out",callback:()=>{this.logoutUser()}}])}logoutUser(){logoutFunc()}};__decorate([e$1({type:String})],WcAppLayout.prototype,"selectedDrawer",void 0),WcAppLayout=__decorate([n$1("wc-app-layout")],WcAppLayout),r$1`
  :host, :host * {
    box-sizing: border-box; 
  }
  :host  {
    position: absolute;
    background-color: var(--printess-panelBackground);
    box-shadow: black 0 0 10px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    overflow: auto;
    max-height: 100vh;
    max-width: 100vw;
    
    font-family: Lato, sans-serif; 
    font-size: var(--printess-textSize);
    color:  var(--printess-textColor); 
    display: grid;
    width: fit-content;
    grid-template-rows: 1fr auto;
    z-index: 100;
}
  .content {
    padding: var(--printess-dialog-padding);
    overflow: auto;
  }
  .footer {                
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    column-gap: calc(var(--printess-dialog-padding) / 2);
    padding: var(--printess-dialog-padding);
    border-top: 1px solid var(--printess-textColorDisabled);
  }
  .header {                
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    padding: var(--printess-dialog-padding);
    padding-bottom: 25px;
    border-bottom: 1px solid var(--printess-textColorDisabled);
    font-size: var(--printess-headlineSize);
    color: var(--printess-headlineColor);
    
  }
  h1 {
    font-size: var(--printess-headlineSize);
    color: var(--printess-headlineColor);
    margin-top: 20px;
    margin-bottom: 10px;
  }
  p {
    font-size: var(--printess-textSize);
    line-height: 1.4;
    color: var(--printess-textColor);
    margin-top: 10px;
    margin-bottom: 20px;
  }
  p > b {
    color: var(--printess-headlineColor);
  }
`,r$1`
  
    :host {
      display: block;
      width: 100%;
      overflow: hidden; 
    } 
     
   /* :host > *:not(.seperator) {*/
    :host > *:not(.two-cols) {
      /*border-bottom: 20px solid yellow;*/
        margin-bottom: 7px;
    }
    .two-cols > * {
      margin-bottom: 7px;
    }
    .seperator {
      height: 0px;
      opacity: 0.5;
      border-bottom: dashed 1px var(--printess-textColorDisabled);
    }
    p {
      font-size: 12px;
      color: var(--printess-textColor);
      margin: 0px;
      margin-bottom: 3px;
    }
    b {
      background-color: var(--printess-headlineColor);
      color: white;
      padding: 2px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 15%;
      box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
      margin-right: 3px;
      margin-left: 3px;
    }
    h5 {
      font-size: 14px;
      color: var(--printess-textColor);
      margin-bottom: 3px;
      margin-top: 2px;
    }
    .section-head {
        font-size: var(--printess-labelSize);
        margin: 0;
        margin-bottom: 10px;
    }
    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 5px;
  }
  .two-cols.uneven {
      grid-template-columns: auto 1fr;
      
  }
  .two-cols.fr2fr1 {
      grid-template-columns: 2fr 1fr;
      
  }
    .buyer-properties-devider {
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 4px;
        font-size: var(--printess-textSize); /* 16px; */
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .admin-properties-devider {
        position: relative;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 2px;
        padding-bottom: 3px;
        font-size: var(--printess-labelSize);  
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .anchor-grid {
      display: grid;
            
      align-items: stretch;
      align-content: stretch;
      grid-gap: 8px 8px;
      grid-template-rows:   var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
      grid-template-columns:    var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
                  
      grid-template-areas:  "m_lt m_ct m_rt"
                            "m_lm m_cm m_rm"
                            "m_lb m_cb m_rb";
      margin-top: 10px;                        
    }
    
    .anchor-box {
        grid-column-start: m_lt; 
        grid-column-end: m_rb;
        grid-row-start: m_lt; 
        grid-row-end: m_rb;
        padding: calc(var(--printess-anchor-size) / 2);
    }
    .anchor-box > div {
        border: 1px solid var(--printess-headlineColor); 
        height: 100%;
    }
    .anchor-grid > .checker {
        border: var(--printess-headlineColor) 1px solid;
      border-radius: 10%;
      transition: border-color;
      transition-duration: 0.7s;
      cursor: pointer;
    }
    .anchor-grid > .checker:hover {
         background-color: white;
    }
    
    .anchor-grid >  .on {
        background-color: var(--printess-headlineColor);
    }
    .anchor-grid >  .off {
        background-color: #eee;
    }
    
    .anchor-grid > .checker.on:hover {
        background-color: var(--printess-headlineColorHover);
    }
    
    .anchor-grid > .mixed {
        background-color: #ddd;
    }
    .anchor-grid > .null {
        background-color: yellow;
    }
`,r$1`
  
    :host {
      display: block;
      width: 100%;
      overflow: hidden; 
    } 
   /* :host > *:not(.seperator) {*/
    :host > *:not(.two-cols) {
      /*border-bottom: 20px solid yellow;*/
        margin-bottom: 7px;
    }
    .two-cols > * {
      margin-bottom: 7px;
    }
    .seperator {
      height: 0px;
      opacity: 0.5;
      border-bottom: dashed 1px var(--printess-textColorDisabled);
    }
    p {
      font-size: 12px;
      color: var(--printess-textColor);
      margin: 0px;
      margin-bottom: 3px;
    }
    b {
      background-color: var(--printess-headlineColor);
      color: white;
      padding: 2px;
      padding-left: 6px;
      padding-right: 6px;
      border-radius: 15%;
      box-shadow: 1px 1px 2px 0px rgba(0,0,0,0.75);
      margin-right: 3px;
      margin-left: 3px;
    }
    h5 {
      font-size: 14px;
      color: var(--printess-textColor);
      margin-bottom: 3px;
      margin-top: 2px;
    }
    .section-head {
        font-size: var(--printess-labelSize);
        margin: 0;
        margin-bottom: 10px;
    }
    .two-cols {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 5px;
  }
    .two-cols.uneven {
      grid-template-columns: auto 1fr;
      
  }
    .header-bar {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
       
        padding: 4px;
       
    }
    .header-bar-title {
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color: var(--printess-headlineColorInverse);
    }
    .header-button {
      grid-column: 3;
      border: 1px solid var(--printess-headlineColorInverse);
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: row;
    } 
    .header-button:hover {
      background-color: rgba(0,0,0,0.1);
    }
    .header-button-icon {
      padding: 2px;
      width: 24px;
      height: 24px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: uppercase;
      color:  var(--printess-headlineColorInverse);
    }
    .header-button-text {
      padding: 2px 6px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color:  var(--printess-headlineColorInverse);
    }
    /****** IMAGE PROPERTIES ******/
    .image-property-grid {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-column-gap: 15px;
      align-items: center;
    }
    
    .image-property-caption {
      color: var(--printess-headlineColor);
      font-size: 14px; 
      font-weight: bold;
    }
    .image-property-container {
      display: flex;
      flex-wrap: wrap;
    }
    .image-property-button {
      margin: 5px;
      padding: 3px;
      background-color:  var( --printess-fatButtonBackgroundSelected);
      color:  var(--printess-fatButtonForeground);
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      flex-direction: row;
    } 
    
    .image-property-button-icon {
      padding: 2px;
      width: 24px;
      height: 24px;
      font-size: var(--printess-textSize); /* 16px; */
      fill:  var(--printess-fatButtonForeground);
    }
    .image-property-button-text {
      padding: 2px 6px;
      font-size: var(--printess-textSize); /* 16px; */
      text-transform: none;
      letter-spacing: 0px;
      color:  var( --printess-fatButtonForeground);
    } 
    .image-property-button.sepia > * {
      color: #a39775;
      fill: #a39775;
    }
    .image-property-button.enhance > * {
      color: #7b658b;
      fill: #7b658b;
    }
    .image-property-button:hover {
      background-color: var(--printess-headlineColor);
    }
    .image-property-button:hover > * {
      color: var(--printess-headlineColorInverse);
      fill: var(--printess-headlineColorInverse);
    }
    
   /* .image-property-button.sepia:hover > * {
      color: #746b53;
      fill: #746b53;
    }*/
  
   /* .image-property-button.enhance:hover > * {
      color: #544560;
      fill: #544560;
    }*/
   
    
    .color-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .color-list > * {
      margin: 4px;
    }
    
    .admin-properties-devider {
        position: relative;
        margin-top: 20px;
        margin-bottom: 5px;
        background: var(--printess-headlineColor);
        color:  var(--printess-headlineColorInverse);
        padding: 2px;
        padding-bottom: 3px;
        font-size: var(--printess-labelSize);  
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .anchor-grid {
      display: grid;
            
      align-items: stretch;
      align-content: stretch;
      grid-gap: 8px 8px;
      grid-template-rows:   var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
      grid-template-columns:    var(--printess-anchor-size)  var(--printess-anchor-size)  var(--printess-anchor-size) ;
                  
      grid-template-areas:  "m_lt m_ct m_rt"
                            "m_lm m_cm m_rm"
                            "m_lb m_cb m_rb";
      margin-top: 10px;                        
    }
    
    .anchor-box {
        grid-column-start: m_lt; 
        grid-column-end: m_rb;
        grid-row-start: m_lt; 
        grid-row-end: m_rb;
        padding: calc(var(--printess-anchor-size) / 2);
    }
    .anchor-box > div {
        border: 1px solid var(--printess-headlineColor); 
        height: 100%;
    }
    .anchor-grid > .checker {
        border: var(--printess-headlineColor) 1px solid;
      border-radius: 10%;
      transition: border-color;
      transition-duration: 0.7s;
      cursor: pointer;
    }
    .anchor-grid > .checker:hover {
         background-color: white;
    }
    
    .anchor-grid >  .on {
        background-color: var(--printess-headlineColor);
    }
    .anchor-grid >  .off {
        background-color: #eee;
    }
    
    .anchor-grid > .checker.on:hover {
        background-color: var(--printess-headlineColorHover);
    }
    
    .anchor-grid > .mixed {
        background-color: #ddd;
    }
    .anchor-grid > .null {
        background-color: yellow;
    }
    .imageListWrapper {
        display: block;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 22px; /* because of scrollbar */
    }
    .imageList {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        margin: -2px;
    }
    .imageItem {
        display: grid;
        grid-template-columns: 70px;
        grid-template-rows: 70px;
        margin: 2px;
        cursor: pointer;
    }
    .small-image-list {
        height: 70px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: 2px;
    }
    .small-image-item {
        width: 33px;
        height: 33px;
        margin-right: 2px;
        margin-bottom: 2px;
        cursor: pointer;
    }
   
    .imageBox {
        width: 100%;  
        height: 100%;
      
        background-size: cover;
        border: 1px solid  var(--printess-textColor);
        border-radius: 3px;
        background-color: #bbb;
     } 
     .imageBox:hover {
      border: 1px solid  var(--printess-headlineColor);
     }
     .imageBox.selected {
        border: 2px solid  var(--printess-headlineColor);
    }
    .imageName {
        font-size: 9px;
        text-overflow: ellipsis;
        width: 100%;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }   
    .image-upload .progress {
      width: 250px; 
      border: 1px solid black; 
      height: 22px;
    }
    .image-upload-progress > div {
      background: var(--printess-headlineColor); 
      height: 100%; 
      color: var(--printess-headlineColorInverse);
      text-align: center;
      padding: 2px;
    }

    









    
`;const masterStyles=r$1` 
:root {
    --printess-properties-width: 442px;
    --printess-resourcebar-width: 32px;
    --printess-toolbar-width: 38px;
    --printess-open-toolbar-width: 72px;
    --printess-top-tabs-height: 36px;
    --printess-dialog-padding: 20px;
    --printess-anchor-size: 10px; /* small boxes in anchor grid */
    /**** PATH EDITOR  ******/
    --printess-path-editor-cover-bg: rgba(0,0,0,0.1);
    --printess-path-editor-cover-border: 1px solid rgba(0,0,0,0.5);
    --printess-path-editor-path-color: #21b7ff;
    --printess-path-editor-disabled-path-color: #bbbbbb;
    /**** Z-INDEX *****/
    --printess-z-index-ui-hint: 9987;
    --printess-z-index-context-menu: 9990;
    --printess-z-index-box-drag: 9985;
    --printess-z-index-box-selection: 9980;
    --printess-z-index-click-action-boxes: 9975;
    --printess-z-index-page-border: 9970;
    --printess-z-index-pasteboard: 9960;
    --printess-z-index-bleed: 9962;
    
    
    /*** FRAME  ***/
    --printess-frame-mover-size: 5px;
    --printess-extra-mover-catch-offset: -14px;
    --printess-cropper-large-side: 15px;
    --printess-cropper-small-side: 5px;
    --printess-annotationColor: DarkSlateBlue;
    --printess-rubberBandColor: red;
    --printess-resource-toolbar-width: 32px;
    --printess-resource-panel-initial-width: 200px;
    /* Mobile buyer side */ 
    /***** FORM PADDING *****/
    --printess-input-top-padding: 0; /*8px;*/ 
 
    /***** TEXT SIZE *****/
    --printess-annotationSize: 10px;
    --printess-labelSize: 11px;
    --printess-inputSize: 12px;
    --printess-textSize: 14px;
    --printess-headlineSize: 18px;
 
    /****** HEAD-TOOLBAR *******/ 
    --printess-headToolbarColor: white;
    --printess-headToolbarColorHover: #ffcccc;
    --printess-headToolbarBackgroundColor:   rgb(150, 150, 150);
    --printess-headToolbarBorderColor:   #444444; 
    /*** VAADIN COLOR MAPPING ***/
    --lumo-primary-text-color: var(--printess-headlineColor);
    --lumo-primary-color: var(--printess-headlineColor);
    --lumo-secondary-text-color: var(--printess-textColor) ;
    --lumo-disabled-text-color: var(--printess-textColorDisabled);  
    --lumo-body-text-color: var(--printess-inputColor);
    --lumo-base-color: var(--printess-panelBackground);
    --lumo-contrast-60pct: var(--printess-textColor);
    --lumo-contrast-5pct: var(--printess-inputBackgroundDisabled); /* input disabled background color */ 
    --lumo-contrast-10pct: var(--printess-inputBackground); /*rgba(255,255,255,0.2);*/ /* input background-color */
    --lumo-contrast-20pct: var(--printess-radioBackground); /*rgba(255,255,255,0.2);*/ /* input background-color used in radio buttons */
    --lumo-contrast-30pct: var(--printess-radioBackgroundHover); /*rgba(255,255,255,0.2);*/ /* input background-color used in radio buttons */
    --lumo-space-m: var(--printess-input-top-padding); /* padding-top of vaadin-text-box */
    --vaadin-text-field-default-width: 50px; /* make smaller to addopt to 100% later */
    /*input and button captions */ 
    --lumo-font-size-s: var(--printess-inputSize); /* input box size */
    --lumo-font-size-m:  var(--printess-inputSize); /* select-box does not react to theme=small */
    /*labels*/
    --lumo-font-size-xs:  var(--printess-labelSize); 
   
    /* MOBILE THEME DEFAULT */ 
    --printess-maxContrastColor: white;
    --printess-maxContrastColorInverse: black;
   
    /****** TEXT COLORS ********/
    --printess-headlineColor: #ff82d7;  
    --printess-headlineColorInverse: white;  
    --printess-headlineColorHover: #ffbeea;  
    --printess-textColor:#fff;
    --printess-textColorDisabled: #ddd;
    --printess-menuColorDisabled: #aaa;
    --printess-textColorHover: #fff;
    
    --printess-inputColor: white;
    --printess-inputColorDisabled:  rgb(200,200,200);
    --printess-inputBackground: rgba(255, 255, 255, 0.1);
    --printess-radioBackground: rgba(255, 255, 255, 0.2);
    --printess-radioBackgroundHover: rgba(255, 255, 255, 0.3);
    --printess-inputBackgroundDisabled: rgba(255, 255, 255, 0.05); 
    /****** FAT-BUTTON *****/
    --printess-fatButtonBackground: var(--printess-panelBackground);
    --printess-fatButtonBackgroundHover: var( --panelBackgroundHover:);
    --printess-fatButtonBackgroundSelected: var(--printess-panelBackgroundSelected);
    --printess-fatButtonForeground: var(--printess-textColor);
    --printess-fatButtonForegroundSelected: var(--printess-headlineColor);
     /****** SIDE-TOOLBARs *******/ 
    --printess-toolbarColor:  #fff;
    --printess-toolbarColorHover: #fff;
    --printess-toolbarBackgroundSelected: #000;
    --printess-toolbarBackground: #333; 
    --printess-toolbarBackgroundHover: #222;
    --printess-toolbarBorderColor:  Indigo; /* black */
     /*** PANEL COLORS ***/
    --printess-panelBackground: #15518e; //   hsl(214, 90%, 52%);  
    --printess-panelBackgroundSelected: #2a2a2a;
    --printess-panelAnchorMixed: #934a7c;
    --printess-panelBackgroundHover: #222;
    --printess-slider-rail: hsl(216, 85%, 68%);
    --printess-frameColor: #21b7ff;
    --printess-frameColorHover:  #1ca0df;
     
}
/* DESKTOP / TABLET STYLES */






  
*, *:before, *:after {
    box-sizing: border-box;
}
#printessMainGrid h1 {
  color: var(--printess-headlineColor);
}
#printessMainGrid h2 {
  color: red; 
}
#printessMainGrid {
    background: var(--printess-panelBackground); /* #727272;*/
    font-family: Lato, sans-serif; 
    font-size: var(--printess-textSize);
    overflow: hidden;
    margin: 0;
    padding: 0;
    color:  var(--printess-textColor); 
    opacity: 0; /* until loaded */
}
.printess-container-fullscreen {
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  width: initial !important;
  height: initial !important;
  right: 0 !important;
  bottom: 0 !important;
}
#printessCopyPasteIndicator {
    background-color: black;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: none;
    opacity: 0.25;
}
#printess-clipboard-container {
    height: 16px;
    width: 50px;
    position: absolute;
   right: 100px;;
    top: 0
}
 
/*
 ************** MAIN LAYOUT GRID  *******************
 */
#printessMainGrid {
    transform: none;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*width: 100vw;
    height: 100vh;*/
   /* background-color: transparent;*/
    display: grid;
    grid-gap: 0;
    grid-template-rows: 0px 36px auto 100px;
    grid-template-columns: 1fr;
    grid-template-areas: 'doc-selector' 'toolbar' 'stage' 'properties';
}
#printessMainGrid.hide-controls {
    grid-template-areas: 'stage';
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
}
#printessMainGrid.hide-controls > .doc-selector,
#printessMainGrid.hide-controls > .toolbar,
#printessMainGrid.hide-controls > .printess-resources,
#printessMainGrid.hide-controls > .printess-properties,
#printessMainGrid.hide-controls > .printess-buyer-pages,
#printessMainGrid.hide-controls > .printess-data-panel,
#printessMainGrid.hide-controls > .printess-footer,
#printessMainGrid.hide-controls > #resourcesSplitterBar,
#printessMainGrid.hide-controls > #propertiesSplitterBar
{
  display: none !important;
}
.printess-data-panel {
  border-top: 1px solid black;
  grid-area: data;
  height: inherit;
}
.printess-resources {
    grid-area: resources;
    display: none;
    height: 100%;
    background: var(--printess-panelBackground);
}
#propertiesSplitterBar {
    grid-area: propertiesSplitterBar;
}
#resourcesSplitterBar {
    grid-area: resourcesSplitterBar;
    display: none;
}
#printessMainGrid.admin > #resourcesSplitterBar {
    display: block;
}
#resourcesSplitterBar, #propertiesSplitterBar {
    background-color: black; /* loooks better in dark and light mode var(--printess-maxContrastColor); */
    cursor: ew-resize;
    position: relative;
    display: none;
}
#resourcesSplitterBar::after, #propertiesSplitterBar::after {
    content: "";
    position: absolute;
    background-color: transparent;
    width: 7px;
    left: -3px;
    top: 0;
    bottom: 0;
    cursor: ew-resize;
}
.printess-nav-bar {
    grid-row: 2;
    height: 100%;
    width: 100%;
    grid-area: toolbar;
}
.printess-doc-selector {
    grid-row: 1;
    grid-area: doc-selector;
    display: none;
}
.printess-stage {
    grid-area: stage;
    height: 100%;
    overflow: hidden;
    background: #4e4e50;
    position: relative;
}
.printess-stage  > .printess-content {
    width: 1200px;
    height: 1200px;
    position: relative;
    /* background: white;*/
}
.printess-properties {
    grid-area: properties;
    height: 100%;
    background: var(--printess-panelBackground);
    position: relative;
}
.printess-buyer-pages {
    grid-area: pages;
    height: 100%;
    display: none;
    background: var(--printess-panelBackground);
}
#printessMainGrid.buyer > .printess-buyer-pages {
    display: block;
}
.printess-footer {
    background-color: lightblue;
    grid-area: footer;
}














 /*
 ******** SAFARI WEB APP NOTIFICATION 
 */
 #webAppNotification {
  z-index: 99999;
  display: none;
  position: absolute;
  bottom: 30px;
  left: 5%;
  right: 5%;
  height: 80px;
  padding: 7px;
  border-radius: 3px;
  background-color: #f7f8ef; /* ED6BB8FF*/ 
  color:  black;
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
  box-shadow: 0px 5px 10px black;
} 
/* Triangle hack to make tooltip look like a speech bubble */
#webAppNotification:after {
  position: absolute;
  bottom: -20px;
  left: 50%;
  margin-left: -5px;
  width: 0;
  border-top: 20px solid #f7f8ef;
  border-right: 20px solid transparent;
  border-left: 20px solid transparent;
  content: " ";
  font-size: 0;
  line-height: 0;
  
}
#webAppNotification > .closeAppNotification {
  position: absolute;
  cursor: pointer;
  left: 4px;
  top: 4px;
  text-decoration: underline; 
  color: darkblue;
}
#webAppNotification > .closeAppNotification:hover {
  color: red;
}
/*
 ************** CONTEXT MENU AND TOAST************
 */
/*
.printess-toastwrp {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    overflow: hidden;
    z-index: -999;
}
.printess-toast {
    position: absolute;
    border-radius: 3px;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.43);
    color: rgba(255, 255, 255, 0.84);
    animation-name: printess-toast;
    animation-duration: 1s;
    animation-iteration-count: 1;
    transition-timing-function: cubic-bezier(0.27, 0.81, 0.86, 1.37);
}
@keyframes printess-toast {
    0% {
        top: 100vh;
    }
    30% {
        top: 90vh;
    }
    80% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        top: 90vh;
    }
}*/
/* BASIC MENU */
.printess-ctx-menu, .printess-rev-ctx-menu, .printess-sub-menu {
    cursor: pointer;
    position: absolute;
    border-radius: 2px;
    width: 150px;
    height: 200px;
    background-color: white;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 4px #555;
    animation-duration: 0.2s;
    animation-iteration-count: 1;
    transition: 0.2s;
    font-family: Lato, sans-serif; 
}
.printess-ctx-menu-item {
    position: relative;
    display: grid;
    grid-template-columns: 24px 1fr 24px;
    grid-template-rows: 28px;
    list-style-type: none;
    align-items: stretch;
    justify-content: stretch;
    width: 100%;
  
}
.printess-ctx-menu-item-seperator {
    display: block;
    width: 100%;
    height: 1px;
    background-color: var(--printess-textColorDisabled);
    margin-top: 3px;
    margin-bottom: 3px;
}
.printess-ctx-menu-item > .printess-ctx-menu-caption {
  color: #555555;
  white-space: nowrap;
  align-self: center;
  font-size: var(--printess-inputSize);
  padding-left: 10px;
}
.printess-ctx-menu-item > wc-icon {
   width: 16px;
   height: 16px; 
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item > wc-icon.arrow {
   width: 14px;
   height: 14px;
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item > .color {
   width: 16px;
   height: 16px;
   align-self: center;
   justify-self: center;
}
.printess-ctx-menu-item.disabled > .printess-ctx-menu-caption{
    color: var(--printess-menuColorDisabled);
}
.printess-ctx-menu-item:hover {
    background-color: var(--printess-headlineColor);
}
.printess-ctx-menu-item:hover > .printess-ctx-menu-caption, .printess-ctx-menu-item:hover > wc-icon {
    color: #fff;
}
 .printess-ctx-menu-item.disabled:hover {
    background-color: transparent; 
    
}
 .printess-ctx-menu-item.disabled:hover > .printess-ctx-menu-caption{
     color: var(--printess-menuColorDisabled);
}
.printess-ctx-menu:hover, .printess-rev-ctx-menu:hover, .printess-sub-menu:hover {
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.05) inset, 0px 4px 8px #555;
}
.printess-ctx-menu ul {
    margin: 0;
    padding: 0;
    text-align: left;
}
.printess-ctx-menu {
    animation-name: printess-appear;
    z-index: var(--printess-z-index-context-menu);
}
.printess-rev-ctx-menu {
    animation-name: printess-revappear;
}
.printess-sub-menu {
    height: 175px;
    display: none;
    overflow: auto;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.05) inset, 0px 4px 8px #555;
}
.printess-sub-menu:hover {
    display: block;
}
.printess-red-line {
    position: absolute;
    height: 3px;
    width: 25px;
    top: 12px;
    left: 1px;
    transform-origin: 50% 50%;
    transform: rotate(45deg);
    background-color: red;
}
@keyframes printess-appear { 
    0% {
        transform: scale(0.1) translateX(-100px);
    }
    100% {
        transform: scale(1) translateX(0px);
    }
}
@keyframes printess-revappear {
    0% {
        transform: scale(0.1) translateX(100px);
    }
    100% {
        transform: scale(1) translateX(0px);
    }
}
`;class JOSEError extends Error{constructor(e){super(e),this.code=JOSEError.code,this.name=this.constructor.name,Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}}JOSEError.code="ERR_JOSE_GENERIC";class JWTClaimValidationFailed extends JOSEError{constructor(e,t="unspecified",r="unspecified"){super(e),this.code=JWTClaimValidationFailed.code,this.claim=t,this.reason=r}}JWTClaimValidationFailed.code="ERR_JWT_CLAIM_VALIDATION_FAILED";class JOSEAlgNotAllowed extends JOSEError{constructor(){super(...arguments),this.code=JOSEAlgNotAllowed.code}}JOSEAlgNotAllowed.code="ERR_JOSE_ALG_NOT_ALLOWED";class JOSENotSupported extends JOSEError{constructor(){super(...arguments),this.code=JOSENotSupported.code}}JOSENotSupported.code="ERR_JOSE_NOT_SUPPORTED";class JWSInvalid extends JOSEError{constructor(){super(...arguments),this.code=JWSInvalid.code}}JWSInvalid.code="ERR_JWS_INVALID";class JWTInvalid extends JOSEError{constructor(){super(...arguments),this.code=JWTInvalid.code}}JWTInvalid.code="ERR_JWT_INVALID";class JWSSignatureVerificationFailed extends JOSEError{constructor(){super(...arguments),this.code=JWSSignatureVerificationFailed.code,this.message="signature verification failed"}}JWSSignatureVerificationFailed.code="ERR_JWS_SIGNATURE_VERIFICATION_FAILED";class JWTExpired extends JWTClaimValidationFailed{constructor(){super(...arguments),this.code=JWTExpired.code}}JWTExpired.code="ERR_JWT_EXPIRED";const encoder=new TextEncoder,decoder=new TextDecoder;function concat(...e){const t=e.reduce(((e,{length:t})=>e+t),0),r=new Uint8Array(t);let s=0;return e.forEach((e=>{r.set(e,s),s+=e.length})),r}const isDisjoint=(...e)=>{const t=e.filter(Boolean);if(0===t.length||1===t.length)return!0;let r;for(const e of t){const t=Object.keys(e);if(r&&0!==r.size)for(const e of t){if(r.has(e))return!1;r.add(e)}else r=new Set(t)}return!0};function isObjectLike(e){return"object"==typeof e&&null!==e}function isObject(e){if(!isObjectLike(e)||"[object Object]"!==Object.prototype.toString.call(e))return!1;if(null===Object.getPrototypeOf(e))return!0;let t=e;for(;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}const checkKeyType=(e,t)=>{if(e.startsWith("HS")||"dir"===e||e.startsWith("PBES2")||e.match(/^A\d{3}(?:GCM)KW$/)){if(t instanceof Uint8Array||"secret"===t.type)return;throw new TypeError('CryptoKey or KeyObject instances for symmetric algorithms must be of type "secret"')}if(t instanceof Uint8Array)throw new TypeError("CryptoKey or KeyObject instances must be used for asymmetric algorithms");if("secret"===t.type)throw new TypeError('CryptoKey or KeyObject instances for asymmetric algorithms must not be of type "secret"')};function getGlobal(){if("undefined"!=typeof globalThis)return globalThis;if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;throw new Error("unable to locate global object")}var globalThis$1=getGlobal();const decode=e=>{let t=e;t instanceof Uint8Array&&(t=decoder.decode(t)),t=t.replace(/-/g,"+").replace(/_/g,"/").replace(/\s/g,"");try{return new Uint8Array(globalThis$1.atob(t).split("").map((e=>e.charCodeAt(0))))}catch(e){throw new TypeError("The input to be decoded is not correctly encoded.")}};function subtleDsa(e){switch(e){case"HS256":return{hash:{name:"SHA-256"},name:"HMAC"};case"HS384":return{hash:{name:"SHA-384"},name:"HMAC"};case"HS512":return{hash:{name:"SHA-512"},name:"HMAC"};case"PS256":return{hash:{name:"SHA-256"},name:"RSA-PSS",saltLength:32};case"PS384":return{hash:{name:"SHA-384"},name:"RSA-PSS",saltLength:48};case"PS512":return{hash:{name:"SHA-512"},name:"RSA-PSS",saltLength:64};case"RS256":return{hash:{name:"SHA-256"},name:"RSASSA-PKCS1-v1_5"};case"RS384":return{hash:{name:"SHA-384"},name:"RSASSA-PKCS1-v1_5"};case"RS512":return{hash:{name:"SHA-512"},name:"RSASSA-PKCS1-v1_5"};case"ES256":return{hash:{name:"SHA-256"},name:"ECDSA",namedCurve:"P-256"};case"ES384":return{hash:{name:"SHA-384"},name:"ECDSA",namedCurve:"P-384"};case"ES512":return{hash:{name:"SHA-512"},name:"ECDSA",namedCurve:"P-521"};default:throw new JOSENotSupported(`alg ${e} is not supported either by JOSE or your javascript runtime`)}}var crypto=globalThis$1.crypto;function isCryptoKey(e){return void 0!==globalThis$1.CryptoKey&&(null!=e&&e instanceof globalThis$1.CryptoKey)}var checkKeyLength=(e,t)=>{if(e.startsWith("HS")){const r=parseInt(e.substr(-3),10),{length:s}=t.algorithm;if("number"!=typeof s||s<r)throw new TypeError(`${e} requires symmetric keys to be ${r} bits or larger`)}if(e.startsWith("RS")||e.startsWith("PS")){const{modulusLength:r}=t.algorithm;if("number"!=typeof r||r<2048)throw new TypeError(`${e} requires key modulusLength to be 2048 bits or larger`)}};function getCryptoKey(e,t,r){if(isCryptoKey(t))return t;if(t instanceof Uint8Array){if(!e.startsWith("HS"))throw new TypeError("symmetric keys are only applicable for HMAC-based algorithms");return crypto.subtle.importKey("raw",t,{hash:{name:`SHA-${e.substr(-3)}`},name:"HMAC"},!1,[r])}throw new TypeError("invalid key input")}const verify=async(e,t,r,s)=>{const i=await getCryptoKey(e,t,"verify");checkKeyLength(e,i);const a=subtleDsa(e);try{return await crypto.subtle.verify(a,i,r,s)}catch(e){return!1}};function validateCrit(e,t,r,s,i){if(void 0!==i.crit&&void 0===s.crit)throw new e('"crit" (Critical) Header Parameter MUST be integrity protected');if(!s||void 0===s.crit)return new Set;if(!Array.isArray(s.crit)||0===s.crit.length||s.crit.some((e=>"string"!=typeof e||0===e.length)))throw new e('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');let a;a=void 0!==r?new Map([...Object.entries(r),...t.entries()]):t;for(const t of s.crit){if(!a.has(t))throw new JOSENotSupported(`Extension Header Parameter "${t}" is not recognized`);if(void 0===i[t])throw new e(`Extension Header Parameter "${t}" is missing`);if(a.get(t)&&void 0===s[t])throw new e(`Extension Header Parameter "${t}" MUST be integrity protected`)}return new Set(s.crit)}const validateAlgorithms=(e,t)=>{if(void 0!==t&&(!Array.isArray(t)||t.some((e=>"string"!=typeof e))))throw new TypeError(`"${e}" option must be an array of strings`);if(t)return new Set(t)},checkExtensions=validateCrit.bind(void 0,JWSInvalid,new Map([["b64",!0]])),checkAlgOption=validateAlgorithms.bind(void 0,"algorithms");async function flattenedVerify(e,t,r){var s;if(!isObject(e))throw new JWSInvalid("Flattened JWS must be an object");if(void 0===e.protected&&void 0===e.header)throw new JWSInvalid('Flattened JWS must have either of the "protected" or "header" members');if(void 0!==e.protected&&"string"!=typeof e.protected)throw new JWSInvalid("JWS Protected Header incorrect type");if(void 0===e.payload)throw new JWSInvalid("JWS Payload missing");if("string"!=typeof e.signature)throw new JWSInvalid("JWS Signature missing or incorrect type");if(void 0!==e.header&&!isObject(e.header))throw new JWSInvalid("JWS Unprotected Header incorrect type");let i={};if(e.protected){const t=decode(e.protected);i=JSON.parse(decoder.decode(t))}if(!isDisjoint(i,e.header))throw new JWSInvalid("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");const a={...i,...e.header};let o=!0;if(checkExtensions(null==r?void 0:r.crit,i,a).has("b64")&&(o=i.b64,"boolean"!=typeof o))throw new JWSInvalid('The "b64" (base64url-encode payload) Header Parameter must be a boolean');const{alg:n}=a;if("string"!=typeof n||!n)throw new JWSInvalid('JWS "alg" (Algorithm) Header Parameter missing or invalid');const c=r&&checkAlgOption(r.algorithms);if(c&&!c.has(n))throw new JOSEAlgNotAllowed('"alg" (Algorithm) Header Parameter not allowed');if(o){if("string"!=typeof e.payload)throw new JWSInvalid("JWS Payload must be a string")}else if("string"!=typeof e.payload&&!(e.payload instanceof Uint8Array))throw new JWSInvalid("JWS Payload must be a string or an Uint8Array instance");"function"==typeof t&&(t=await t(i,e)),checkKeyType(n,t);const l=concat(encoder.encode(null!==(s=e.protected)&&void 0!==s?s:""),encoder.encode("."),"string"==typeof e.payload?encoder.encode(e.payload):e.payload),d=decode(e.signature);if(!await verify(n,t,d,l))throw new JWSSignatureVerificationFailed;let h;h=o?decode(e.payload):"string"==typeof e.payload?encoder.encode(e.payload):e.payload;const p={payload:h};return void 0!==e.protected&&(p.protectedHeader=i),void 0!==e.header&&(p.unprotectedHeader=e.header),p}async function compactVerify(e,t,r){if(e instanceof Uint8Array&&(e=decoder.decode(e)),"string"!=typeof e)throw new JWSInvalid("Compact JWS must be a string or Uint8Array");const{0:s,1:i,2:a,length:o}=e.split(".");if(3!==o)throw new JWSInvalid("Invalid Compact JWS");const n=await flattenedVerify({payload:i||void 0,protected:s||void 0,signature:a||void 0},t,r);return{payload:n.payload,protectedHeader:n.protectedHeader}}var epoch=e=>Math.floor(e.getTime()/1e3);const minute=60,hour=3600,day=86400,week=7*day,year=31557600,REGEX=/^(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)$/i;var secs=e=>{const t=REGEX.exec(e);if(!t)throw new TypeError("invalid time period format");const r=parseFloat(t[1]);switch(t[2].toLowerCase()){case"sec":case"secs":case"second":case"seconds":case"s":return Math.round(r);case"minute":case"minutes":case"min":case"mins":case"m":return Math.round(60*r);case"hour":case"hours":case"hr":case"hrs":case"h":return Math.round(3600*r);case"day":case"days":case"d":return Math.round(r*day);case"week":case"weeks":case"w":return Math.round(r*week);default:return Math.round(r*year)}};const normalizeTyp=e=>e.toLowerCase().replace(/^application\//,""),checkAudiencePresence=(e,t)=>"string"==typeof e?t.includes(e):!!Array.isArray(e)&&t.some(Set.prototype.has.bind(new Set(e)));var jwtPayload=(e,t,r={})=>{const{typ:s}=r;if(s&&("string"!=typeof e.typ||normalizeTyp(e.typ)!==normalizeTyp(s)))throw new JWTClaimValidationFailed('unexpected "typ" JWT header value',"typ","check_failed");let i;try{i=JSON.parse(decoder.decode(t))}catch(e){}if(!isObject(i))throw new JWTInvalid("JWT Claims Set must be a top-level JSON object");const{issuer:a}=r;if(a&&!(Array.isArray(a)?a:[a]).includes(i.iss))throw new JWTClaimValidationFailed('unexpected "iss" claim value',"iss","check_failed");const{subject:o}=r;if(o&&i.sub!==o)throw new JWTClaimValidationFailed('unexpected "sub" claim value',"sub","check_failed");const{audience:n}=r;if(n&&(c=i.aud,l="string"==typeof n?[n]:n,!("string"==typeof c?l.includes(c):Array.isArray(c)&&l.some(Set.prototype.has.bind(new Set(c))))))throw new JWTClaimValidationFailed('unexpected "aud" claim value',"aud","check_failed");var c,l;let d;switch(typeof r.clockTolerance){case"string":d=secs(r.clockTolerance);break;case"number":d=r.clockTolerance;break;case"undefined":d=0;break;default:throw new TypeError("invalid clockTolerance option type")}const{currentDate:h}=r,p=epoch(h||new Date);if(void 0!==i.iat||r.maxTokenAge){if("number"!=typeof i.iat)throw new JWTClaimValidationFailed('"iat" claim must be a number',"iat","invalid");if(void 0===i.exp&&i.iat>p+d)throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)',"iat","check_failed")}if(void 0!==i.nbf){if("number"!=typeof i.nbf)throw new JWTClaimValidationFailed('"nbf" claim must be a number',"nbf","invalid");if(i.nbf>p+d)throw new JWTClaimValidationFailed('"nbf" claim timestamp check failed',"nbf","check_failed")}if(void 0!==i.exp){if("number"!=typeof i.exp)throw new JWTClaimValidationFailed('"exp" claim must be a number',"exp","invalid");if(i.exp<=p-d)throw new JWTExpired('"exp" claim timestamp check failed',"exp","check_failed")}if(r.maxTokenAge){const e=p-i.iat;if(e-d>("number"==typeof r.maxTokenAge?r.maxTokenAge:secs(r.maxTokenAge)))throw new JWTExpired('"iat" claim timestamp check failed (too far in the past)',"iat","check_failed");if(e<0-d)throw new JWTClaimValidationFailed('"iat" claim timestamp check failed (it should be in the past)',"iat","check_failed")}return i};async function jwtVerify(e,t,r){var s;const i=await compactVerify(e,t,r);if((null===(s=i.protectedHeader.crit)||void 0===s?void 0:s.includes("b64"))&&!1===i.protectedHeader.b64)throw new JWTInvalid("JWTs MUST NOT use unencoded payload");return{payload:jwtPayload(i.protectedHeader,i.payload,r),protectedHeader:i.protectedHeader}}function subtleMapping(e){let t,r;switch(e.kty){case"oct":switch(e.alg){case"HS256":case"HS384":case"HS512":t={name:"HMAC",hash:{name:`SHA-${e.alg.substr(-3)}`}},r=["sign","verify"];break;case"A128CBC-HS256":case"A192CBC-HS384":case"A256CBC-HS512":throw new JOSENotSupported(`${e.alg} keys cannot be imported as CryptoKey instances`);case"A128GCM":case"A192GCM":case"A256GCM":case"A128GCMKW":case"A192GCMKW":case"A256GCMKW":t={name:"AES-GCM"},r=["encrypt","decrypt"];break;case"A128KW":case"A192KW":case"A256KW":t={name:"AES-KW"},r=["wrapKey","unwrapKey"];break;case"PBES2-HS256+A128KW":case"PBES2-HS384+A192KW":case"PBES2-HS512+A256KW":t={name:"PBKDF2"},r=["deriveBits"];break;default:throw new JOSENotSupported('unsupported or invalid JWK "alg" (Algorithm) Parameter value')}break;case"RSA":switch(e.alg){case"PS256":case"PS384":case"PS512":t={name:"RSA-PSS",hash:{name:`SHA-${e.alg.substr(-3)}`}},r=e.d?["sign"]:["verify"];break;case"RS256":case"RS384":case"RS512":t={name:"RSASSA-PKCS1-v1_5",hash:{name:`SHA-${e.alg.substr(-3)}`}},r=e.d?["sign"]:["verify"];break;case"RSA-OAEP":case"RSA-OAEP-256":case"RSA-OAEP-384":case"RSA-OAEP-512":t={name:"RSA-OAEP",hash:{name:`SHA-${parseInt(e.alg.substr(-3),10)||1}`}},r=e.d?["decrypt","unwrapKey"]:["encrypt","wrapKey"];break;default:throw new JOSENotSupported('unsupported or invalid JWK "alg" (Algorithm) Parameter value')}break;case"EC":switch(e.alg){case"ES256":case"ES384":case"ES512":t={name:"ECDSA",namedCurve:e.crv},r=e.d?["sign"]:["verify"];break;case"ECDH-ES":case"ECDH-ES+A128KW":case"ECDH-ES+A192KW":case"ECDH-ES+A256KW":t={name:"ECDH",namedCurve:e.crv},r=e.d?["deriveBits"]:[];break;default:throw new JOSENotSupported('unsupported or invalid JWK "alg" (Algorithm) Parameter value')}break;default:throw new JOSENotSupported('unsupported or invalid JWK "kty" (Key Type) Parameter value')}return{algorithm:t,keyUsages:r}}const parse=async e=>{var t,r;const{algorithm:s,keyUsages:i}=subtleMapping(e);let a="jwk",o={...e};return delete o.alg,"PBKDF2"===s.name&&(a="raw",o=decode(e.k)),crypto.subtle.importKey(a,o,s,null!==(t=e.ext)&&void 0!==t&&t,null!==(r=e.key_ops)&&void 0!==r?r:i)};async function parseJwk(e,t,r){if(!isObject(e))throw new TypeError("JWK must be an object");if(t||(t=e.alg),"string"!=typeof t||!t)throw new TypeError('"alg" argument is required when "jwk.alg" is not present');switch(e.kty){case"oct":if("string"!=typeof e.k||!e.k)throw new TypeError('missing "k" (Key Value) Parameter value');return null!=r||(r=!0!==e.ext),r?parse({...e,alg:t,ext:!1}):decode(e.k);case"RSA":if(void 0!==e.oth)throw new JOSENotSupported('RSA JWK "oth" (Other Primes Info) Parameter value is not supported');case"EC":case"OKP":return parse({...e,alg:t});default:throw new JOSENotSupported('unsupported "kty" (Key Type) Parameter value')}}var _a,_b,_c,__awaiter=function(e,t,r,s){return new(r||(r=Promise))((function(i,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function n(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(o,n)}c((s=s.apply(e,t||[])).next())}))};const apiEndpoint="api.printess.com",adm={useAdminMode:!1,canUseAdminMode:!1},api=new PrintessApi("https://"+apiEndpoint),adminApi=new PrintessAdminApi("https://"+apiEndpoint);let currentUser={id:"",displayName:"",eMailAddress:"",isEmailAddressVerified:!1,lastLogin:new Date,code:"",isActivated:!1};const wcAppLayout=new WcAppLayout;function setDisplay(e,t){const r=document.getElementById(e);r&&(r.style.display=t)}function readTokenData(e){return __awaiter(this,void 0,void 0,(function*(){try{const t=yield parseJwk({kty:"RSA",e:"AQAB",n:"wXIBXKQ_dpETu27jq5mx2blcCqrjvF5B0zuI4I1O3LJjOFqEKJrfIfVxVNf9er4qfQquSLaNYf_780rtUZTZkqX5rittfeTiQqzMVuFwipmfNdqlFMJeJiZAlZRq_t1BOQ9FxaE2Iz85eo_uWxT_tcXYDVPiLn-SzJNV2BNrLOvE1Qb3fqz3t-Tol4LudlcNI_-1DWRGTqHlllC6BUivFfbaBbCJBK1zTHJNtzXDvpNvADJWzmbRn8mBUcRjNFqPwUX6dwa_SudQ0oKvuBJXJhaxo1mfNntJj2UIOuJDBrNqEmY8uaUjNHzAtrzh2YUaTwaG6R6vdGlDsbqXWV6m966Y1KZP2tMv1cMyD0EgfOBGLKp98MY8uO3KvvN_8lfSyHbHMAz-I_0Gd7n1LjRUIFGmrXHp-xnyiZw3MuwhVyIP9JUzH87HQ5OlOfSJeaknqa9mWvoMldD0LnUdiaVXef7icTMjppykadj8rOiC5VAmhL6Cm_EL_GFLmylyQ5cSW0b6ns6ufO-3OuIAaxd5iacuIkgZr1ZX-r_ViA4lUnjl2fp-DEi_-BZPQCVzvwWE8QNKxTMpj1qm2rIvR1cWDcxQNuoyJEAEynk_b0vUxaWiu91dNgUtmC8AOunCxr7Hj41YBJPhRI2I985MF4xRLWISLhFmkttT0NpWUxzxsf0"},"RS256"),{payload:r}=yield jwtVerify(e,t,{issuer:"Printess GmbH & Co.KG",audience:"printess-saas"});if(r.role)if("string"==typeof r.role)"admin"===r.role&&(adm.canUseAdminMode=!0);else{r.role.forEach((e=>{"admin"===e&&(adm.canUseAdminMode=!0)}))}}catch(e){console.error(e)}adm.canUseAdminMode&&(adm.useAdminMode=!0)}))}function printessLogin(e){return __awaiter(this,void 0,void 0,(function*(){const t=yield e.getIdToken(),r=yield api.loginWithGoogleAuthToken(t);if(r instanceof ServerErrorResponse)alert(r.message),setDisplay("loginPage","");else{setDisplay("loginPage","none"),adminApi.token=r.token,api.token=r.token,yield readTokenData(r.token);const e=document.getElementById("userAccount");null==e||e.append(wcAppLayout);const t=document.getElementsByTagName("head")[0],s=document.createElement("style");s.setAttribute("type","text/css"),s.appendChild(document.createTextNode(masterStyles.toString())),t.appendChild(s)}}))}null===(_a=document.getElementById("createAccountCtrl"))||void 0===_a||_a.addEventListener("click",(()=>__awaiter(void 0,void 0,void 0,(function*(){var e,t;const r=null===(e=document.getElementById("emailCtrl"))||void 0===e?void 0:e.value,s=null===(t=document.getElementById("passwordCtrl"))||void 0===t?void 0:t.value;yield signinUser(r,s)})))),null===(_b=document.getElementById("google-signin"))||void 0===_b||_b.addEventListener("click",(()=>__awaiter(void 0,void 0,void 0,(function*(){yield signinWithGoogle()})))),firebase.auth().onAuthStateChanged((function(e){return __awaiter(this,void 0,void 0,(function*(){if(e){const t=new Date(e.metadata.lastSignInTime);currentUser={id:e.uid,displayName:e.displayName,eMailAddress:e.email,isEmailAddressVerified:e.emailVerified,lastLogin:t,code:e.providerData[0].photoURL,isActivated:!1},setDisplay("userAccount",""),yield printessLogin(e)}else setDisplay("loginPage","")}))}));const logoutFunc=()=>{__awaiter(void 0,void 0,void 0,(function*(){yield firebase.auth().signOut(),window.location.reload()}))};null===(_c=document.getElementById("eye"))||void 0===_c||_c.addEventListener("click",(()=>{const e=document.getElementById("eye"),t=document.getElementById("passwordCtrl");"password"===t.type?(e.classList.remove("fa-eye-slash"),e.classList.add("fa-eye"),t.type="text"):(e.classList.remove("fa-eye"),e.classList.add("fa-eye-slash"),t.type="password")}));export{adm,api,apiEndpoint,currentUser,logoutFunc};