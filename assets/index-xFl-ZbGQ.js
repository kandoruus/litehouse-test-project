var y=Object.defineProperty;var b=a=>{throw TypeError(a)};var A=(a,t,e)=>t in a?y(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var o=(a,t,e)=>A(a,typeof t!="symbol"?t+"":t,e),P=(a,t,e)=>t.has(a)||b("Cannot "+e);var r=(a,t,e)=>(P(a,t,"read from private field"),e?e.call(a):t.get(a)),p=(a,t,e)=>t.has(a)?b("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(a):t.set(a,e),m=(a,t,e,s)=>(P(a,t,"write to private field"),s?s.call(a,e):t.set(a,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=e(i);fetch(i.href,n)}})();const E={_dataList:[],_currentPage:"",_firstPage:"",_lastPage:"",_nextPage:"",_prevPage:""},w={Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json"},N="https://kitsu.io/api/edge/anime?page[limit]=10",O=[{id:"first-btn",text:"First"},{id:"prev-btn",text:"&lt;&lt; Prev"},{id:"next-btn",text:"Next &gt;&gt;"},{id:"last-btn",text:"Last"}],B=async(a=N)=>{const t=await fetch(a,{headers:w}),{data:e,links:s}=await t.json();return{_dataList:e.map(c=>{const{canonicalTitle:D,description:x,posterImage:T}=c.attributes;return{title:D,description:x,imgUrl:T.medium}}),_currentPage:a,_firstPage:s.first,_lastPage:s.last,_nextPage:s.next||"",_prevPage:s.prev||""}},C=(a,t,e)=>{const s=document.createElement("button");return s.classList.add("nav-bar-button"),s.id=a,s.innerHTML=t,s.addEventListener("click",e),s},R=`
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
`;var u;class L extends HTMLElement{constructor(e,s,i){super();p(this,u,this.attachShadow({mode:"open"}));o(this,"title");o(this,"description");o(this,"imgUrl");this.title=e,this.description=s,this.imgUrl=i,this.connectedCallBack()}connectedCallBack(){r(this,u).innerHTML=`
      <style>
        ${R}
      </style>
      <div class="card">
        <figure>
          <figcaption>${this.title}</figcaption>
          <img src="${this.imgUrl}" alt="${this.title} Poster" height="554px" width="390px"/>
        </figure>
        <p>${this.description}</p>
      </div>
    `}}u=new WeakMap;customElements.define("media-card",L);const I=`
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
`;var g,d;class v extends HTMLElement{constructor(e){super();p(this,g,this.attachShadow({mode:"open"}));p(this,d,[]);r(this,g).innerHTML=`
      <style>
        ${I}
      </style>
    `;const s=document.createElement("div");s.classList.add("nav-bar-wrapper"),O.forEach(({id:i,text:n},c)=>{r(this,d).push(C(i,n,e[c]))}),r(this,d).forEach(i=>{s.appendChild(i)}),r(this,g).appendChild(s)}disableButtons(){r(this,d).forEach(e=>{e.disabled=!0})}enableButtons(e,s){e?r(this,d).forEach((i,n)=>{i.disabled=n<2}):s?r(this,d).forEach((i,n)=>{i.disabled=n>1}):r(this,d).forEach(i=>{i.disabled=!1})}}g=new WeakMap,d=new WeakMap;customElements.define("nav-bar",v);var h,l;const f=class f{constructor(t=E){p(this,h);p(this,l);o(this,"render",()=>{r(this,h).innerHTML="",this._appData._dataList.forEach(t=>{const{title:e,description:s,imgUrl:i}=t,n=new L(e,s,i);r(this,h).appendChild(n)}),window.scrollTo(0,0)});o(this,"load",t=>{r(this,l).disableButtons(),B(t).then(e=>{this._appData={...e},this.render(),r(this,l).enableButtons(this.onFirstPage,this.onLastPage)})});o(this,"goToFirstPage",()=>{this.load(this._appData._firstPage)});o(this,"goToLastPage",()=>{this.load(this._appData._lastPage)});o(this,"goToNextPage",()=>{this._appData._nextPage!==""&&this.load(this._appData._nextPage)});o(this,"goToPrevPage",()=>{this._appData._prevPage!==""&&this.load(this._appData._prevPage)});this._appData=t,m(this,h,document.getElementById("main"));const e=document.getElementById("footer");m(this,l,new v([this.goToFirstPage,this.goToPrevPage,this.goToNextPage,this.goToLastPage])),e.appendChild(r(this,l))}get dataList(){return this._appData._dataList}get onFirstPage(){return this._appData._prevPage===""}get onLastPage(){return this._appData._nextPage===""}};h=new WeakMap,l=new WeakMap,o(f,"instance",new f);let _=f;const M=()=>{_.instance.load()};document.addEventListener("DOMContentLoaded",M);
