(()=>{"use strict";var e={913:()=>{try{self["workbox:core:5.1.4"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:5.1.4"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:5.1.4"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:5.1.4"]&&_()}catch(e){}}},t={};function s(n){if(t[n])return t[n].exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{s(977);const e=[],t={get:()=>e,add(t){e.push(...t)}};s(913);const n={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},r=e=>[n.prefix,e,n.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>e||r(n.precache),c=e=>e||r(n.runtime),o=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),i=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class h extends Error{constructor(e,t){super(i(e,t)),this.name=e,this.details=t}}const l=new Set;const u=(e,t)=>e.filter((e=>t in e)),f=async({request:e,mode:t,plugins:s=[]})=>{const n=u(s,"cacheKeyWillBeUsed");let r=e;for(const e of n)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},d=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:r=[]})=>{const a=await self.caches.open(e),c=await f({plugins:r,request:t,mode:"read"});let o=await a.match(c,n);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;o=await r.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:o,request:c})}return o},p=async({cacheName:e,request:t,response:s,event:n,plugins:r=[],matchOptions:a})=>{const c=await f({plugins:r,request:t,mode:"write"});if(!s)throw new h("cache-put-with-no-response",{url:o(c.url)});const i=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let r=t,a=!1;for(const t of n)if("cacheWillUpdate"in t){a=!0;const n=t.cacheWillUpdate;if(r=await n.call(t,{request:e,response:r,event:s}),!r)break}return a||(r=r&&200===r.status?r:void 0),r||null})({event:n,plugins:r,response:s,request:c});if(!i)return void 0;const p=await self.caches.open(e),w=u(r,"cacheDidUpdate"),g=w.length>0?await d({cacheName:e,matchOptions:a,request:c}):null;try{await p.put(c,i)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of l)await e()}(),e}for(const t of w)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:g,newResponse:i,request:c})},w=d,g=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=u(n,"fetchDidFail"),a=r.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const n=t.requestWillFetch,r=e.clone();e=await n.call(t,{request:r,event:s})}}catch(e){throw new h("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(r=await e.fetchDidSucceed.call(e,{event:s,request:c,response:r}));return r}catch(e){0;for(const t of r)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:a.clone(),request:c.clone()});throw e}};let y;async function m(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},r=t?t(n):n,a=function(){if(void 0===y){const e=new Response("");if("body"in e)try{new Response(e.body),y=!0}catch(e){y=!1}y=!1}return y}()?s.body:await s.blob();return new Response(a,r)}function _(e){if(!e)throw new h("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new h("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:r.href}}class R{constructor(e){this._cacheName=a(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=_(s),r="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new h("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new h("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],r=await self.caches.open(this._cacheName),a=await r.keys(),c=new Set(a.map((e=>e.url)));for(const[e,t]of this._urlsToCacheKeys)c.has(t)?n.push(e):s.push({cacheKey:t,url:e});const o=s.map((({cacheKey:s,url:n})=>{const r=this._cacheKeysToIntegrities.get(s),a=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:a,event:e,integrity:r,plugins:t,url:n})}));await Promise.all(o);return{updatedURLs:s.map((e=>e.url)),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const r of t)s.has(r.url)||(await e.delete(r),n.push(r.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:r,integrity:a}){const c=new Request(t,{integrity:a,cache:s,credentials:"same-origin"});let o,i=await g({event:n,plugins:r,request:c});for(const e of r||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:n,request:c,response:i}):i.status<400))throw new h("bad-precaching-response",{url:t,status:i.status});i.redirected&&(i=await m(i)),await p({event:n,plugins:r,response:i,request:e===t?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new h("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new h("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let v;const q=()=>(v||(v=new R),v);const U=(e,t)=>{const s=q().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:r}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const c=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(a,t);if(yield c.href,s&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=s,yield e.href}if(n){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let L=!1;function T(e){L||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const r=a();self.addEventListener("fetch",(a=>{const c=U(a.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!c)return;let o=self.caches.open(r).then((e=>e.match(c))).then((e=>e||fetch(c)));a.respondWith(o)}))})(e),L=!0)}const x=e=>{const s=q(),n=t.get();e.waitUntil(s.install({event:e,plugins:n}).catch((e=>{throw e})))},K=e=>{const t=q();e.waitUntil(t.activate())};s(80);const C=e=>e&&"object"==typeof e?e:{handle:e};class N{constructor(e,t,s="GET"){this.handler=C(t),this.match=e,this.method=s}}class b extends N{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class O{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:r}=this.findMatchingRoute({url:s,request:e,event:t});let a=r&&r.handler;if(!a&&this._defaultHandler&&(a=this._defaultHandler),!a)return void 0;let c;try{c=a.handle({url:s,request:e,event:t,params:n})}catch(e){c=Promise.reject(e)}return c instanceof Promise&&this._catchHandler&&(c=c.catch((n=>this._catchHandler.handle({url:s,request:e,event:t})))),c}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const r of n){let n;const a=r.match({url:e,request:t,event:s});if(a)return n=a,(Array.isArray(a)&&0===a.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=C(e)}setCatchHandler(e){this._catchHandler=C(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new h("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new h("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let M;const W=()=>(M||(M=new O,M.addFetchListener(),M.addCacheListener()),M);s(873);const E={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};var k;(function(e){q().addToCacheList(e),e.length>0&&(self.addEventListener("install",x),self.addEventListener("activate",K))})([{'revision':'66cb6d6698b51e7a07934784698a4502','url':'/assets/images/no-track.jpg'},{'revision':'4e710c6959c1e684026a7770c0c4ba6d','url':'/index.html'},{'revision':'0e81620f78cc1522f1437ee615884c13','url':'/main.0da09829d8734ff8f77f.css'},{'revision':'86088598a46786b3cc2b1415ecab3c9e','url':'/main.9c3b9701cccba5663568.js'},{'revision':'51726d2182679f9fc8f83a4d7298f208','url':'/manifest.json'}]),T(k),function(e,t,s){let n;if("string"==typeof e){const r=new URL(e,location.href);0;n=new N((({url:e})=>e.href===r.href),t,s)}else if(e instanceof RegExp)n=new b(e,t,s);else if("function"==typeof e)n=new N(e,t,s);else{if(!(e instanceof N))throw new h("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}W().registerRoute(n)}((e=>e.request.url.includes("font-awesome")),new class{constructor(e={}){if(this._cacheName=c(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some((e=>!!e.cacheWillUpdate));this._plugins=t?e.plugins:[E,...e.plugins]}else this._plugins=[E];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));const s=this._getFromNetwork({request:t,event:e});let n,r=await w({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(r){if(e)try{e.waitUntil(s)}catch(n){0}}else{0;try{r=await s}catch(e){n=e}}if(!r)throw new h("no-response",{url:t.url,error:n});return r}async _getFromNetwork({request:e,event:t}){const s=await g({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=p({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){0}return s}}({cacheName:"font-icons"}))})()})();