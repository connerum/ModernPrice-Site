const q="modulepreload",H=function(e){return"/"+e},v={},M=function(t,r,o){if(!r||r.length===0)return t();const i=document.getElementsByTagName("link");return Promise.all(r.map(s=>{if(s=H(s),s in v)return;v[s]=!0;const a=s.endsWith(".css"),d=a?'[rel="stylesheet"]':"";if(!!o)for(let n=i.length-1;n>=0;n--){const c=i[n];if(c.href===s&&(!a||c.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${d}`))return;const u=document.createElement("link");if(u.rel=a?"stylesheet":q,a||(u.as="script",u.crossOrigin=""),u.href=s,document.head.appendChild(u),a)return new Promise((n,c)=>{u.addEventListener("load",n),u.addEventListener("error",()=>c(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>t()).catch(s=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=s,window.dispatchEvent(a),!a.defaultPrevented)throw s})};function W(e={}){const{immediate:t=!1,onNeedRefresh:r,onOfflineReady:o,onRegistered:i,onRegisteredSW:s,onRegisterError:a}=e;let d,m;const u=async(c=!0)=>{await m};async function n(){if("serviceWorker"in navigator){const{Workbox:c}=await M(()=>import("./workbox-window.prod.es5.a7b12eab.js"),[]);d=new c("/sw.js",{scope:"/",type:"classic"}),d.addEventListener("activated",l=>{(l.isUpdate||l.isExternal)&&window.location.reload()}),d.addEventListener("installed",l=>{l.isUpdate||o?.()}),d.register({immediate:t}).then(l=>{s?s("/sw.js",l):i?.(l)}).catch(l=>{a?.(l)})}}return m=n(),u}W({immediate:!0,onRegisteredSW(e){},onOfflineReady(){}});const _=e=>history.state&&history.replaceState({...history.state,...e},""),w=!!document.startViewTransition,E=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),k=e=>location.pathname===e.pathname&&location.search===e.search,P=e=>document.dispatchEvent(new Event(e)),R=()=>P("astro:page-load"),C=()=>{let e=document.createElement("div");e.setAttribute("aria-live","assertive"),e.setAttribute("aria-atomic","true"),e.className="astro-route-announcer",document.body.append(e),setTimeout(()=>{let t=document.title||document.querySelector("h1")?.textContent||location.pathname;e.textContent=t},60)},p="data-astro-transition-persist";let T,g=0;history.state?(g=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):E()&&history.replaceState({index:g,scrollX,scrollY,intraPage:!1},"");const F=(e,t)=>{let r=!1,o=!1;return(...i)=>{if(r){o=!0;return}e(...i),r=!0,setTimeout(()=>{o&&(o=!1,e(...i)),r=!1},t)}};async function I(e){try{const t=await fetch(e),r=t.headers.get("content-type")?.replace(/;.*$/,"");return r!=="text/html"&&r!=="application/xhtml+xml"?null:{html:await t.text(),redirected:t.redirected?t.url:void 0,mediaType:r}}catch{return null}}function x(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function U(){let e=Promise.resolve();for(const t of Array.from(document.scripts)){if(t.dataset.astroExec==="")continue;const r=document.createElement("script");r.innerHTML=t.innerHTML;for(const o of t.attributes){if(o.name==="src"){const i=new Promise(s=>{r.onload=s});e=e.then(()=>i)}r.setAttribute(o.name,o.value)}r.dataset.astroExec="",t.replaceWith(r)}return e}function O(e){const t=e.effect;return!t||!(t instanceof KeyframeEffect)||!t.target?!1:window.getComputedStyle(t.target,t.pseudoElement).animationIterationCount==="infinite"}const L=(e,t,r)=>{const o=!k(e);let i=!1;e.href!==location.href&&(t?history.replaceState({...history.state},"",e.href):(history.replaceState({...history.state,intraPage:r},""),history.pushState({index:++g,scrollX:0,scrollY:0},"",e.href)),o&&(scrollTo({left:0,top:0,behavior:"instant"}),i=!0)),e.hash?location.href=e.href:i||scrollTo({left:0,top:0,behavior:"instant"})};function X(e){const t=[];for(const r of e.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${p}="${r.getAttribute(p)}"], link[rel=stylesheet][href="${r.getAttribute("href")}"]`)){const o=document.createElement("link");o.setAttribute("rel","preload"),o.setAttribute("as","style"),o.setAttribute("href",r.getAttribute("href")),t.push(new Promise(i=>{["load","error"].forEach(s=>o.addEventListener(s,i)),document.head.append(o)}))}return t}async function A(e,t,r,o,i){const s=n=>{const c=n.getAttribute(p),l=c&&e.head.querySelector(`[${p}="${c}"]`);if(l)return l;if(n.matches("link[rel=stylesheet]")){const y=n.getAttribute("href");return e.head.querySelector(`link[rel=stylesheet][href="${y}"]`)}return null},a=()=>{const n=document.activeElement;if(n?.closest(`[${p}]`)){if(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement){const c=n.selectionStart,l=n.selectionEnd;return{activeElement:n,start:c,end:l}}return{activeElement:n}}else return{activeElement:null}},d=({activeElement:n,start:c,end:l})=>{n&&(n.focus(),(n instanceof HTMLInputElement||n instanceof HTMLTextAreaElement)&&(n.selectionStart=c,n.selectionEnd=l))},m=()=>{const n=document.documentElement,c=[...n.attributes].filter(({name:f})=>(n.removeAttribute(f),f.startsWith("data-astro-")));[...e.documentElement.attributes,...c].forEach(({name:f,value:h})=>n.setAttribute(f,h));for(const f of document.scripts)for(const h of e.scripts)if(!f.src&&f.textContent===h.textContent||f.src&&f.type===h.type&&f.src===h.src){h.dataset.astroExec="";break}for(const f of Array.from(document.head.children)){const h=s(f);h?h.remove():f.remove()}document.head.append(...e.head.children);const l=document.body,y=a();document.body.replaceWith(e.body);for(const f of l.querySelectorAll(`[${p}]`)){const h=f.getAttribute(p),b=document.querySelector(`[${p}="${h}"]`);b&&b.replaceWith(f)}d(y),o?scrollTo(o.scrollX,o.scrollY):L(t,r.history==="replace",!1),P("astro:after-swap")},u=X(e);if(u.length&&await Promise.all(u),i==="animate"){const n=document.getAnimations();document.documentElement.dataset.astroTransitionFallback="old";const c=document.getAnimations().filter(y=>!n.includes(y)&&!O(y));await Promise.all(c.map(y=>y.finished)),m(),document.documentElement.dataset.astroTransitionFallback="new"}else m()}async function $(e,t,r,o){let i;const s=t.href,a=await I(s);if(a===null){location.href=s;return}a.redirected&&(t=new URL(a.redirected)),T??=new DOMParser;const d=T.parseFromString(a.html,a.mediaType);if(d.querySelectorAll("noscript").forEach(m=>m.remove()),!d.querySelector('[name="astro-view-transitions-enabled"]')){location.href=s;return}o||history.replaceState({...history.state,scrollX,scrollY},""),document.documentElement.dataset.astroTransition=e,w?i=document.startViewTransition(()=>A(d,t,r,o)).finished:i=A(d,t,r,o,x());try{await i}finally{await U(),R(),C()}}function Y(e,t){if(!E()){location.href=e;return}const r=new URL(e,location.href);location.origin===r.origin&&k(r)?L(r,t?.history==="replace",!0):$("forward",r,t??{})}function K(e){if(!E()&&e.state){history.scrollRestoration&&(history.scrollRestoration="manual"),location.reload();return}if(e.state===null){history.scrollRestoration&&(history.scrollRestoration="auto");return}history.scrollRestoration&&(history.scrollRestoration="manual");const t=history.state;if(t.intraPage)scrollTo(t.scrollX,t.scrollY);else{const r=t.index,o=r>g?"forward":"back";g=r,$(o,new URL(location.href),{},t)}}const S=()=>{_({scrollX,scrollY})};{(w||x()!=="none")&&(addEventListener("popstate",K),addEventListener("load",R),"onscrollend"in window?addEventListener("scrollend",S):addEventListener("scroll",F(S,300)));for(const e of document.scripts)e.dataset.astroExec=""}function B(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function N(e){if(document.querySelector(`link[rel=prefetch][href="${e}"]`))return;if(navigator.connection){let r=navigator.connection;if(r.saveData||/(2|3)g/.test(r.effectiveType||""))return}let t=document.createElement("link");t.setAttribute("rel","prefetch"),t.setAttribute("href",e),document.head.append(t)}(w||B()!=="none")&&(document.addEventListener("click",e=>{let t=e.target;t instanceof Element&&t.tagName!=="A"&&(t=t.closest("a")),!(!t||!(t instanceof HTMLAnchorElement)||t.dataset.astroReload!==void 0||t.hasAttribute("download")||!t.href||t.target&&t.target!=="_self"||t.origin!==location.origin||e.button!==0||e.metaKey||e.ctrlKey||e.altKey||e.shiftKey||e.defaultPrevented)&&(e.preventDefault(),Y(t.href,{history:t.dataset.astroHistory==="replace"?"replace":"auto"}))}),["mouseenter","touchstart","focus"].forEach(e=>{document.addEventListener(e,t=>{if(t.target instanceof HTMLAnchorElement){let r=t.target;r.origin===location.origin&&r.pathname!==location.pathname&&E()&&N(r.pathname)}},{passive:!0,capture:!0})}));
