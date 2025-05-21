var D=Object.defineProperty;var h=n=>{throw TypeError(n)};var x=(n,t,e)=>t in n?D(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var o=(n,t,e)=>x(n,typeof t!="symbol"?t+"":t,e),_=(n,t,e)=>t.has(n)||h("Cannot "+e);var l=(n,t,e)=>(_(n,t,"read from private field"),e?e.call(n):t.get(n)),b=(n,t,e)=>t.has(n)?h("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),v=(n,t,e,s)=>(_(n,t,"write to private field"),s?s.call(n,e):t.set(n,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(a){if(a.ep)return;a.ep=!0;const i=e(a);fetch(a.href,i)}})();const y={_dataList:[],_currentPage:"",_firstPage:"",_lastPage:"",_nextPage:"",_prevPage:""},E={Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json"},T="https://kitsu.io/api/edge/anime?page[limit]=10",B=async(n=T)=>{const t=await fetch(n,{headers:E}),{data:e,links:s}=await t.json();return{_dataList:e.map(r=>{const{canonicalTitle:g,description:m,posterImage:f}=r.attributes;return{title:g,description:m,imgUrl:f.medium}}),_currentPage:n,_firstPage:s.first,_lastPage:s.last,_nextPage:s.next||"",_prevPage:s.prev||""}},A=`
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
  min-height: 100px;
  background-color: var(--LIGHT_COLOR);
  border: 2px solid var(--MID_COLOR);
  border-radius: 15px;
  padding: var(--STANDARD_PADDING);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--DARK_COLOR);
  box-shadow: 5px 5px 15px black;
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
`;var p;class L extends HTMLElement{constructor(e,s,a){super();b(this,p,this.attachShadow({mode:"open"}));o(this,"title");o(this,"description");o(this,"imgUrl");this.title=e,this.description=s,this.imgUrl=a,this.connectedCallBack()}connectedCallBack(){l(this,p).innerHTML=`
      <style>
        ${A}
      </style>
      <div class="card">
        <figure>
          <figcaption>${this.title}</figcaption>
          <img src="${this.imgUrl}" alt="${this.title} Poster" height="554px" width="390px"/>
        </figure>
        <p>${this.description}</p>
      </div>
    `}}p=new WeakMap;customElements.define("media-card",L);var d;const u=class u{constructor(t=y){b(this,d);o(this,"disableButtons",()=>{const t=document.getElementById("first-btn"),e=document.getElementById("prev-btn"),s=document.getElementById("next-btn"),a=document.getElementById("last-btn");t.disabled=!0,e.disabled=!0,s.disabled=!0,a.disabled=!0});o(this,"render",()=>{l(this,d).innerHTML="",this._appData._dataList.forEach(i=>{const{title:r,description:g,imgUrl:m}=i,f=new L(r,g,m);l(this,d).appendChild(f)});const t=document.getElementById("first-btn"),e=document.getElementById("prev-btn"),s=document.getElementById("next-btn"),a=document.getElementById("last-btn");this._appData._prevPage===""?(t.disabled=!0,e.disabled=!0,s.disabled=!1,a.disabled=!1):this._appData._nextPage===""?(t.disabled=!1,e.disabled=!1,s.disabled=!0,a.disabled=!0):(t.disabled=!1,e.disabled=!1,s.disabled=!1,a.disabled=!1),window.scrollTo(0,0)});o(this,"load",t=>{this.disableButtons(),B(t).then(e=>{this._appData={...e},this.render()})});o(this,"goToFirstPage",()=>{this.load(this._appData._firstPage)});o(this,"goToLastPage",()=>{this.load(this._appData._lastPage)});o(this,"goToNextPage",()=>{this._appData._nextPage!==""&&this.load(this._appData._nextPage)});o(this,"goToPrevPage",()=>{this._appData._prevPage!==""&&this.load(this._appData._prevPage)});this._appData=t,v(this,d,document.getElementById("main"))}get dataList(){return this._appData._dataList}};d=new WeakMap,o(u,"instance",new u);let c=u;const I=`
.nav-bar-wrapper {
  display: flex;
  justify-content: center;
  gap: var(--STANDARD_PADDING);
}
.nav-bar-button {
  background-color: transparent;
  border:none;
  color: var(--LIGHT_COLOR);
  font-size: 1.2rem;
}
.nav-bar-button:disabled {
  color: var(--DISABLED_COLOR);
}
`;class P extends HTMLElement{constructor(){super(),this.innerHTML=`
      <style>
        ${I}
      </style>
    `;const t=document.createElement("div");t.classList.add("nav-bar-wrapper");const e=document.createElement("button");e.classList.add("nav-bar-button"),e.id="first-btn",e.innerHTML="First";const s=document.createElement("button");s.classList.add("nav-bar-button"),s.id="prev-btn",s.innerHTML="&lt;&lt; Prev";const a=document.createElement("button");a.classList.add("nav-bar-button"),a.id="next-btn",a.innerHTML="Next &gt;&gt;";const i=document.createElement("button");i.classList.add("nav-bar-button"),i.id="last-btn",i.innerHTML="Last",t.appendChild(e),t.appendChild(s),t.appendChild(a),t.appendChild(i),this.appendChild(t);const r=c.instance;e.addEventListener("click",r.goToFirstPage),s.addEventListener("click",r.goToPrevPage),a.addEventListener("click",r.goToNextPage),i.addEventListener("click",r.goToLastPage)}}customElements.define("nav-bar",P);const w=()=>{const n=c.instance;document.getElementById("footer").appendChild(new P),n.load()};document.addEventListener("DOMContentLoaded",w);
