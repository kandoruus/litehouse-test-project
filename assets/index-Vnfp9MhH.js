var A=Object.defineProperty;var v=a=>{throw TypeError(a)};var T=(a,t,e)=>t in a?A(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var n=(a,t,e)=>T(a,typeof t!="symbol"?t+"":t,e),L=(a,t,e)=>t.has(a)||v("Cannot "+e);var o=(a,t,e)=>(L(a,t,"read from private field"),e?e.call(a):t.get(a)),p=(a,t,e)=>t.has(a)?v("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,e),m=(a,t,e,r)=>(L(a,t,"write to private field"),r?r.call(a,e):t.set(a,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();const O={_dataList:[],_currentPage:"",_firstPage:"",_lastPage:"",_nextPage:"",_prevPage:""},y={Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json"},R="https://kitsu.io/api/edge/anime?page[limit]=10",E=[{id:"first-btn",text:"First"},{id:"prev-btn",text:"&lt;&lt; Prev"},{id:"next-btn",text:"Next &gt;&gt;"},{id:"last-btn",text:"Last"}],I=async(a=R)=>{const t=await fetch(a,{headers:y}),{data:e,links:r}=await t.json();return{_dataList:e.map(c=>{const{canonicalTitle:P,description:x,posterImage:w}=c.attributes;return{title:P,description:x,imgUrl:w.small}}),_currentPage:a,_firstPage:r.first,_lastPage:r.last,_nextPage:r.next||"",_prevPage:r.prev||""}},N=(a,t,e)=>{const r=document.createElement("button");return r.classList.add("nav-bar-button"),r.id=a,r.innerHTML=t,r.addEventListener("click",e),r},C=`
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
}

.card figure {
  background-color: var(--LIGHT_COLOR);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  position: relative;
}

.card figcaption {
  position: absolute;
  top: 0;
  z-index: -1;
}

.card p {
  line-height: 1.125rem;
  background-color: var(--LIGHT_COLOR);
  margin: var(--STANDARD_MARGIN);
  margin-top: var(--SMALL_MARGIN);
  overflow: hidden;
}

@media only screen and (min-width: 639px) {

  h2 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  h2:hover {
    white-space: wrap;
    z-index: 10;
    cursor: default;
  }
  .card {
    height: var(--CARD_HEIGHT);
  }

}
`;var u;class b extends HTMLElement{constructor(e,r,i){super();p(this,u,this.attachShadow({mode:"open"}));n(this,"title");n(this,"description");n(this,"imgUrl");this.title=e,this.description=r,this.imgUrl=i,this.connectedCallBack()}connectedCallBack(){o(this,u).innerHTML=`
      <style>
        ${C}
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
    `}}u=new WeakMap;customElements.define("media-card",b);const M=`
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
`;var g,d;class D extends HTMLElement{constructor(e){super();p(this,g,this.attachShadow({mode:"open"}));p(this,d,[]);o(this,g).innerHTML=`
      <style>
        ${M}
      </style>
    `;const r=document.createElement("div");r.classList.add("nav-bar-wrapper"),E.forEach(({id:i,text:s},c)=>{o(this,d).push(N(i,s,e[c]))}),o(this,d).forEach(i=>{r.appendChild(i)}),o(this,g).appendChild(r)}disableButtons(){o(this,d).forEach(e=>{e.disabled=!0})}enableButtons(e,r){e?o(this,d).forEach((i,s)=>{i.disabled=s<2}):r?o(this,d).forEach((i,s)=>{i.disabled=s>1}):o(this,d).forEach(i=>{i.disabled=!1})}}g=new WeakMap,d=new WeakMap;customElements.define("nav-bar",D);var h,l;const f=class f{constructor(t=O){p(this,h);p(this,l);n(this,"render",()=>{o(this,h).innerHTML="",this._appData._dataList.forEach(t=>{const{title:e,description:r,imgUrl:i}=t,s=new b(e,r,i);o(this,h).appendChild(s)}),window.scrollTo(0,0)});n(this,"load",t=>{o(this,l).disableButtons(),I(t).then(e=>{this._appData={...e},this.render(),o(this,l).enableButtons(this.onFirstPage,this.onLastPage)})});n(this,"goToFirstPage",()=>{this.load(this._appData._firstPage)});n(this,"goToLastPage",()=>{this.load(this._appData._lastPage)});n(this,"goToNextPage",()=>{this._appData._nextPage!==""&&this.load(this._appData._nextPage)});n(this,"goToPrevPage",()=>{this._appData._prevPage!==""&&this.load(this._appData._prevPage)});this._appData=t,m(this,h,document.getElementById("main"));const e=document.getElementById("footer");m(this,l,new D([this.goToFirstPage,this.goToPrevPage,this.goToNextPage,this.goToLastPage])),e.appendChild(o(this,l))}get dataList(){return this._appData._dataList}get onFirstPage(){return this._appData._prevPage===""}get onLastPage(){return this._appData._nextPage===""}};h=new WeakMap,l=new WeakMap,n(f,"instance",new f);let _=f;const B=()=>{_.instance.load()};document.addEventListener("DOMContentLoaded",B);
