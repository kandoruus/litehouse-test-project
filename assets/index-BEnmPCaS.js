var T=Object.defineProperty;var v=i=>{throw TypeError(i)};var O=(i,e,t)=>e in i?T(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var n=(i,e,t)=>O(i,typeof e!="symbol"?e+"":e,t),L=(i,e,t)=>e.has(i)||v("Cannot "+t);var o=(i,e,t)=>(L(i,e,"read from private field"),t?t.call(i):e.get(i)),p=(i,e,t)=>e.has(i)?v("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(i):e.set(i,t),m=(i,e,t,r)=>(L(i,e,"write to private field"),r?r.call(i,t):e.set(i,t),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}})();const y={_dataList:[],_currentPage:"",_firstPage:"",_lastPage:"",_nextPage:"",_prevPage:""},R={Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json"},E="https://kitsu.io/api/edge/anime?page%5Blimit%5D=10&page%5Boffset%5D=",I=[{id:"first-btn",text:"First"},{id:"prev-btn",text:"&lt;&lt; Prev"},{id:"next-btn",text:"Next &gt;&gt;"},{id:"last-btn",text:"Last"}],N=async(i=E)=>{const t=await(await fetch(i,{headers:R})).json();console.log(t);const{data:r,links:a}=t;return{_dataList:r.map(P=>{const{canonicalTitle:x,description:w,posterImage:A}=P.attributes;return{title:x,description:w,imgUrl:A.small}}),_currentPage:i,_firstPage:a.first,_lastPage:a.last,_nextPage:a.next||"",_prevPage:a.prev||""}},C=(i,e,t)=>{const r=document.createElement("button");return r.classList.add("nav-bar-button"),r.id=i,r.innerHTML=e,r.addEventListener("click",t),r},M=`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}
.card {
  background-color: var(--LIGHT_COLOR);
  border: 3px solid var(--MID_DARK_COLOR);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--DARK_COLOR);
  box-shadow: 5px 5px 15px black;
  overflow: hidden;
}

.h2-wrapper {
  background-color: var(--MID_DARK_COLOR);
  width: 100%;
  margin-bottom: var(--SMALL_MARGIN);
  position: relative;
  height: calc(var(--STANDARD_PADDING) * 2 + 1.15 * var(--LARGE_FONT));
  overflow: visible;
}

h2 {
  color: var(--LIGHT_COLOR);
  background-color: var(--MID_DARK_COLOR);
  font-weight: bolder;
  font-size: var(--LARGE_FONT);
  line-height: 1.15em;
  margin-bottom: var(--SMALL_MARGIN);
  text-align: center;
  width: 100%;
  padding: var(--STANDARD_PADDING);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

h2:hover {
  white-space: wrap;
  z-index: 10;
  cursor: default;
}

.card figure {
  background-color: var(--LIGHT_COLOR);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
}

.card figcaption {
  position: absolute;
  left: -10000px;
}

.card p {
  line-height: 1.125rem;
  background-color: var(--LIGHT_COLOR);
  margin: var(--STANDARD_MARGIN);
  margin-top: var(--SMALL_MARGIN);
  overflow: hidden;
}

@media only screen and (min-width: 624px) {
  .card {
    height: var(--CARD_HEIGHT);
  }
}
`;var u;class b extends HTMLElement{constructor(t,r,a){super();p(this,u,this.attachShadow({mode:"open"}));n(this,"title");n(this,"description");n(this,"imgUrl");this.title=t,this.description=r,this.imgUrl=a,this.connectedCallBack()}connectedCallBack(){o(this,u).innerHTML=`
      <style>
        ${M}
      </style>
      <div class="card">
        <div class="h2-wrapper">
          <h2>${this.title}</h2>
        </div>
        <figure>
          <figcaption>${this.title}</figcaption>
          <img src="${this.imgUrl}" alt="${this.title} Poster" height="212px" width="150px"/>
        </figure>
        <p>${this.description}</p>
      </div>
    `}}u=new WeakMap;customElements.define("media-card",b);const B=`
.nav-bar-wrapper {
  display: flex;
  justify-content: center;
  gap: var(--SMALL_PADDING);
}
.nav-bar-button {
  background-color: transparent;
  border:none;
  color: var(--LIGHT_COLOR);
  font-size: 1.1rem;
}
.nav-bar-button:disabled {
  color: var(--DISABLED_COLOR);
}
`;var g,d;class D extends HTMLElement{constructor(t){super();p(this,g,this.attachShadow({mode:"open"}));p(this,d,[]);o(this,g).innerHTML=`
      <style>
        ${B}
      </style>
    `;const r=document.createElement("div");r.classList.add("nav-bar-wrapper"),I.forEach(({id:a,text:s},l)=>{o(this,d).push(C(a,s,t[l]))}),o(this,d).forEach(a=>{r.appendChild(a)}),o(this,g).appendChild(r)}disableButtons(){o(this,d).forEach(t=>{t.disabled=!0})}enableButtons(t,r){t?o(this,d).forEach((a,s)=>{a.disabled=s<2}):r?o(this,d).forEach((a,s)=>{a.disabled=s>1}):o(this,d).forEach(a=>{a.disabled=!1})}}g=new WeakMap,d=new WeakMap;customElements.define("nav-bar",D);var h,c;const f=class f{constructor(e=y){p(this,h);p(this,c);n(this,"render",()=>{o(this,h).innerHTML="",this._appData._dataList.forEach(e=>{const{title:t,description:r,imgUrl:a}=e,s=new b(t,r,a);o(this,h).appendChild(s)}),window.scrollTo(0,0)});n(this,"load",e=>{o(this,c).disableButtons(),N(e).then(t=>{this._appData={...t},this.render(),o(this,c).enableButtons(this.onFirstPage,this.onLastPage)})});n(this,"goToFirstPage",()=>{this.load(this._appData._firstPage)});n(this,"goToLastPage",()=>{this.load(this._appData._lastPage)});n(this,"goToNextPage",()=>{this._appData._nextPage!==""&&this.load(this._appData._nextPage)});n(this,"goToPrevPage",()=>{this._appData._prevPage!==""&&this.load(this._appData._prevPage)});this._appData=e,m(this,h,document.getElementById("main"));const t=document.getElementById("footer");m(this,c,new D([this.goToFirstPage,this.goToPrevPage,this.goToNextPage,this.goToLastPage])),t.appendChild(o(this,c))}get dataList(){return this._appData._dataList}get onFirstPage(){return this._appData._prevPage===""}get onLastPage(){return this._appData._nextPage===""}};h=new WeakMap,c=new WeakMap,n(f,"instance",new f);let _=f;const G=()=>{_.instance.load()};document.addEventListener("DOMContentLoaded",G);
