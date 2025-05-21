var y=Object.defineProperty;var b=a=>{throw TypeError(a)};var T=(a,t,e)=>t in a?y(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var o=(a,t,e)=>T(a,typeof t!="symbol"?t+"":t,e),L=(a,t,e)=>t.has(a)||b("Cannot "+e);var l=(a,t,e)=>(L(a,t,"read from private field"),e?e.call(a):t.get(a)),_=(a,t,e)=>t.has(a)?b("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,e),v=(a,t,e,s)=>(L(a,t,"write to private field"),s?s.call(a,e):t.set(a,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();const x={_dataList:[],_currentPage:"",_firstPage:"",_lastPage:"",_nextPage:"",_prevPage:""},E={Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json"},A="https://kitsu.io/api/edge/anime?page[limit]=10",B="./src/app/styles.css",c=async(a=A)=>{const t=await fetch(a,{headers:E}),{data:e,links:s}=await t.json();return{_dataList:e.map(r=>{const{canonicalTitle:h,description:f,posterImage:m}=r.attributes;return{title:h,description:f,imgUrl:m.medium}}),_currentPage:a,_firstPage:s.first,_lastPage:s.last,_nextPage:s.next||"",_prevPage:s.prev||""}},C=`
.card {
  min-height: 100px;
  background-color: var(--LIGHT_COLOR);
  border: 2px solid var(--MID_COLOR);
  border-radius: 15px;
  padding: var(--STANDARD_PADDING);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--DARK_COLOR);
}

.card figure {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: var(--STANDARD_MARGIN);
}

.card figcaption {
  font-weight: bolder;
  font-size: var(--LARGE_FONT);
  margin-bottom: var(--STANDARD_MARGIN);
  text-align: center;
}
`;var u;class D extends HTMLElement{constructor(e,s,n){super();_(this,u,this.attachShadow({mode:"open"}));o(this,"title");o(this,"description");o(this,"imgUrl");this.title=e,this.description=s,this.imgUrl=n,this.connectedCallBack()}connectedCallBack(){l(this,u).innerHTML=`
      <link href="${B}" rel="stylesheet" type="text/css">
      <style>
        ${C}
      </style>
      <div class="card">
        <figure>
          <figcaption>${this.title}</figcaption>
          <img src="${this.imgUrl}" alt="${this.title} Poster" height="554px" width="390px"/>
        </figure>
        <p>${this.description}</p>
      </div>
    `}}u=new WeakMap;customElements.define("media-card",D);var d;const g=class g{constructor(t=x){_(this,d);o(this,"render",()=>{l(this,d).innerHTML="",this._appData._dataList.forEach(i=>{const{title:r,description:h,imgUrl:f}=i,m=new D(r,h,f);l(this,d).appendChild(m)});const t=document.getElementById("first-btn"),e=document.getElementById("prev-btn"),s=document.getElementById("next-btn"),n=document.getElementById("last-btn");this._appData._prevPage===""?(t.disabled=!0,e.disabled=!0,s.disabled=!1,n.disabled=!1):this._appData._nextPage===""?(t.disabled=!1,e.disabled=!1,s.disabled=!0,n.disabled=!0):(t.disabled=!1,e.disabled=!1,s.disabled=!1,n.disabled=!1)});o(this,"load",()=>{c().then(t=>{this._appData={...t},this.render()})});o(this,"goToFirstPage",()=>{c(this._appData._firstPage).then(t=>{this._appData={...t},this.render()})});o(this,"goToLastPage",()=>{c(this._appData._lastPage).then(t=>{this._appData={...t},this.render()})});o(this,"goToNextPage",()=>{this._appData._nextPage!==""&&c(this._appData._nextPage).then(t=>{this._appData={...t},this.render()})});o(this,"goToPrevPage",()=>{this._appData._prevPage!==""&&c(this._appData._prevPage).then(t=>{this._appData={...t},this.render()})});this._appData=t,v(this,d,document.getElementById("main"))}get dataList(){return this._appData._dataList}};d=new WeakMap,o(g,"instance",new g);let p=g;const I=`
.nav-bar-wrapper {
  display: flex;
  justify-content: center;
  gap: var(--SMALL_PADDING);
}
.nav-bar-button {
  background-color: transparent;
  border:none;
  color: var(--LIGHT_COLOR);
}
.nav-bar-button:disabled {
  color: var(--DISABLED_COLOR);
}
`;class P extends HTMLElement{constructor(){super(),this.innerHTML=`
      <style>
        ${I}
      </style>
    `;const t=document.createElement("div");t.classList.add("nav-bar-wrapper");const e=document.createElement("button");e.classList.add("nav-bar-button"),e.id="first-btn",e.innerHTML="First";const s=document.createElement("button");s.classList.add("nav-bar-button"),s.id="prev-btn",s.innerHTML="&lt;&lt; Prev";const n=document.createElement("button");n.classList.add("nav-bar-button"),n.id="next-btn",n.innerHTML="Next &gt;&gt;";const i=document.createElement("button");i.classList.add("nav-bar-button"),i.id="last-btn",i.innerHTML="Last",t.appendChild(e),t.appendChild(s),t.appendChild(n),t.appendChild(i),this.appendChild(t);const r=p.instance;e.addEventListener("click",r.goToFirstPage),s.addEventListener("click",r.goToPrevPage),n.addEventListener("click",r.goToNextPage),i.addEventListener("click",r.goToLastPage)}}customElements.define("nav-bar",P);const O=()=>{const a=p.instance;document.getElementById("footer").appendChild(new P),a.load()};document.addEventListener("DOMContentLoaded",O);
