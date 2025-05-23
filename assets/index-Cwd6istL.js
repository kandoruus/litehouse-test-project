var _=Object.defineProperty;var P=(r,e,t)=>e in r?_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var a=(r,e,t)=>P(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const d of n.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function t(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=t(i);fetch(i.href,n)}})();const l={title:"",description:"",imgUrl:""},v={Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json"},c=12,w=`https://kitsu.io/api/edge/anime?page%5Blimit%5D=${c}&page%5Boffset%5D=`,o=(r,e)=>{r.classList.toggle("hidden",e)};function L(r,e,t){return r>0&&r<=t&&r!==e}const x=`
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
  background-color: var(--MID_DARK_COLOR);
  border: 3px solid var(--MID_DARK_COLOR);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--DARK_COLOR);
  box-shadow: 5px 5px 15px black;
  overflow: hidden;
  width: 288px
}

.h2-wrapper {
  background-color: var(--MID_DARK_COLOR);
  width: 100%;
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
  text-align: center;
  width: 100%;
  padding: var(--STANDARD_PADDING);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

h2:hover {
  white-space: wrap;
  z-index: 1;
  cursor: default;
}

.details-wrapper {
  padding-top: var(--SMALL_PADDING);
  background-color: var(--LIGHT_COLOR);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

figure {
  background-color: var(--LIGHT_COLOR);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
}

figcaption {
  position: absolute;
  left: -10000px;
}

.card-description {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: var(--STANDARD_PADDING);
  padding-top: var(--SMALL_PADDING);

}

.card-description-p {
  line-height: 1.125rem;
  height: calc(5*1.125rem);
  background-color: var(--LIGHT_COLOR);
  overflow: hidden;
  text-align: center
}

.details-btn, .mobile-details-btn {
  line-height: 1.125rem;
  height: 1.125rem;
  width: 100%;
  white-space: nowrap;
  background-color: transparent;
  border:none;
  color: var(--DARK_COLOR);
  font-size: 1rem;
  margin-top: var(--SMALL_MARGIN);
}

.mobile-details-btn {
    display: none;
}

.full-height {
  height: auto;
  min-height: calc(5*1.125rem);
}

@media (max-width: 591px){
  .details-btn {
    display: none;
  }

  .mobile-details-btn {
    display: inline-block;
  }
}
`;class m extends HTMLElement{constructor(t,s=l){super();a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"_openModal");a(this,"data");a(this,"render",()=>{o(this,this.data===l),this.shadow.innerHTML=`
      <style>
        ${x}
      </style>
      <div class="card">
        <div class="h2-wrapper">
          <h2>${this.data.title}</h2>
        </div>
        <div class="details-wrapper">
          <figure>
            <figcaption>${this.data.title}</figcaption>
            <img src="${this.data.imgUrl}" alt="${this.data.title} Poster" height="212px" width="150px"/>
          </figure>
          <div class="card-description">
            <p class="card-description-p">${this.data.description}</p>
            <button class="details-btn">...more details</button>
            <button class="mobile-details-btn">...more details</button>
          </div>
        </div>
      </div>
    `;const t=this.shadow.querySelector(".details-btn");t.onclick=()=>{this._openModal(this.data)};const s=this.shadow.querySelector(".mobile-details-btn");s.onclick=()=>{this.applyFullHeight()}});a(this,"updateCardData",t=>{this.data=t,this.render()});a(this,"applyFullHeight",()=>{const t=this.shadow.querySelector(".card-description-p"),s=this.shadow.querySelector(".mobile-details-btn");t.classList.toggle("full-height"),s.innerHTML==="...more details"?s.innerHTML="...less details":s.innerHTML="...more details"});this.data=s,this._openModal=t}connectedCallback(){this.render()}}customElements.define("media-card",m);const N=`
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

:host {
  display: block;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1000;
}

.backdrop {
  position: absolute;
  display: flex;
  justify-content: center;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal {
  position: relative;
  margin: auto;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  background-color: var(--MID_DARK_COLOR);
  border: 3px solid var(--MID_DARK_COLOR);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--DARK_COLOR);
  box-shadow: 5px 5px 15px black;
  overflow: hidden;
  width: clamp(288px, 80%, 650px);
}

.h2-wrapper {
  background-color: var(--MID_DARK_COLOR);
  width: 100%;
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
  text-align: center;
  width: 100%;
  padding: var(--STANDARD_PADDING);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

h2:hover {
  white-space: wrap;
  z-index: 1;
  cursor: default;
}

.details-wrapper {
  background-color: var(--LIGHT_COLOR);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

figure {
  background-color: var(--LIGHT_COLOR);
  padding: var(--STANDARD_PADDING);
}

figcaption {
  position: absolute;
  left: -10000px;
}

p {
  display: flex;
  padding: var(--STANDARD_PADDING);
  flex-flow: row nowrap;
  justify-content: space-between;
  padding-top: var(--SMALL_PADDING);
}`;class b extends HTMLElement{constructor(){super();a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"data",l);a(this,"render",()=>{o(this,this.data===l),this.shadow.innerHTML=`
      <style>${N}</style>
      <div class="backdrop">
        <div class="modal">
          <div class="h2-wrapper">
            <h2>${this.data.title}</h2>
          </div>
          <div class="details-wrapper">
            <figure>
              <figcaption>${this.data.title}</figcaption>
              <img src="${this.data.imgUrl}" alt="${this.data.title} Poster" height="402px" width="284px"/>
            </figure>
            <p>${this.data.description}</p>
          </div>
        </div>
      </div>
    `;const t=this.shadow.querySelector(".backdrop");t&&!t.hasAttribute("data-listener")&&(t.addEventListener("click",()=>this.close()),t.setAttribute("data-listener","true"))});a(this,"show",t=>{this.data=t,this.render()});a(this,"close",()=>{this.data=l,this.render()})}connectedCallback(){this.render()}}customElements.define("media-modal",b);const y=`
:host {
  flex-grow: 1;
  display: flex;
}

.media-card-list-wrapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: var(--STANDARD_PADDING);
  width: clamp(320px, 100%, 1300px);
  align-self: center;
  padding: var(--STANDARD_PADDING) 0;
  margin: 0 auto;
}

.hidden {
  display: none;
}
`;class D extends HTMLElement{constructor(t){super();a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"mediaCards",[]);a(this,"mediaModal",new b);a(this,"maxLength");a(this,"render",()=>{this.shadow.innerHTML=`
      <style>
        ${y}
      </style>
    `;const t=document.createElement("div");t.classList.add("media-card-list-wrapper"),t.appendChild(this.mediaModal);for(let s=0;s<this.maxLength;s++){const i=new m(this.mediaModal.show);t.appendChild(i),this.mediaCards.push(i)}this.shadow.appendChild(t)});a(this,"updateMediaCardList",t=>{this.mediaCards.forEach((s,i)=>{i<t.length?s.updateCardData(t[i]):s.updateCardData(l)})});this.maxLength=t}connectedCallback(){this.render()}}customElements.define("media-card-list",D);const A=`
.nav-bar-wrapper {
  display: flex;
  justify-content: center;
  gap: var(--SMALL_PADDING);
}
.nav-bar-button {
  background-color: transparent;
  border: none;
  color: var(--LIGHT_COLOR);
  font-size: 1.1rem;
}
.nav-bar-button:disabled {
  color: var(--DISABLED_COLOR);
}

.nav-bar-page-number {
  font-size: 1.5rem;
  text-decoration: underline;
}

.hidden {
  display: none;
}
`,C=["first-btn","prev-btn","next-btn","last-btn"];class f extends HTMLElement{constructor(t){super();a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"handlePageChange");a(this,"buttonsData",[]);a(this,"currentPage");a(this,"firstEllipsis");a(this,"lastEllipsis");this.handlePageChange=t,this.shadow.innerHTML=`<style>${A}</style>`;const s=document.createElement("div");s.classList.add("nav-bar-wrapper"),C.forEach(i=>{const n=this.createNavBarBtn(i,"1");this.buttonsData.push({button:n,pageNumber:1})}),this.firstEllipsis=this.createEllipsis("first-ellipsis"),this.lastEllipsis=this.createEllipsis("last-ellipsis"),this.currentPage=this.createCurrentPageNumber(),s.append(this.buttonsData[0].button,this.firstEllipsis,this.buttonsData[1].button,this.currentPage.element,this.buttonsData[2].button,this.lastEllipsis,this.buttonsData[3].button),this.shadow.appendChild(s)}set lastPageNum(t){this.buttonsData[3].pageNumber=t,this.buttonsData[3].button.innerText=t.toString(),this.updateDisplay(1)}createNavBarBtn(t,s=""){const i=document.createElement("button");return i.classList.add("nav-bar-button","hidden"),i.id=t,i.innerHTML=s,i.onclick=()=>this.handleButtonClick(i.id),i}createEllipsis(t){const s=document.createElement("div");return s.classList.add("nav-bar-ellipsis","hidden"),s.id=t,s.innerHTML="...",s}createCurrentPageNumber(){const t=document.createElement("div");return t.classList.add("nav-bar-page-number"),t.innerText="1",{pageNumber:1,element:t}}handleButtonClick(t){const s=this.buttonsData.find(({button:n})=>t===n.id);if(!s)return;const i=s.pageNumber;this.disableButtons(),this.handlePageChange(i).then(()=>{this.updateDisplay(i),this.enableButtons()})}updateDisplay(t){this.updateCurrentPage(t),this.updateBtns(t),this.updateEllipsis()}updateCurrentPage(t){this.currentPage.pageNumber=t,this.currentPage.element.innerText=t.toString()}updateBtns(t){const[s,i,n,d]=this.buttonsData;i.pageNumber=t-1,i.button.innerText=(t-1).toString(),n.pageNumber=t+1,n.button.innerText=(t+1).toString(),o(s.button,!(t-1>1)),o(i.button,!(t-1>0)),o(d.button,!(d.pageNumber-t>1)),o(n.button,!(d.pageNumber-t>0))}updateEllipsis(){o(this.firstEllipsis,this.currentPage.pageNumber-1<=2),o(this.lastEllipsis,this.buttonsData[3].pageNumber-this.currentPage.pageNumber<=2)}disableButtons(){this.buttonsData.forEach(({button:t})=>t.disabled=!0)}enableButtons(){this.buttonsData.forEach(({button:t})=>t.disabled=!1)}}customElements.define("pagination-control-bar",f);async function u(r,e,t,s){const i=(e-1)*t;return await(await fetch(`${r}${i}`,{headers:s})).json()}function g(r){return r.data.map(({attributes:e})=>({title:e.canonicalTitle,description:e.description,imgUrl:e.posterImage.small}))}function T(r,e){return Math.ceil(r/e)}const h=class h{constructor(){a(this,"_currentPageNum",1);a(this,"_lastPageNum",1);a(this,"_cardsPerPage",c);a(this,"_baseUrl","");a(this,"_headers",{});a(this,"_currentPageData",[]);a(this,"_firstPageData",[]);a(this,"_prevPageData",[]);a(this,"_nextPageData",[]);a(this,"_lastPageData",[]);a(this,"_updateMediaCardList",e=>{});a(this,"init",async(e,t,s,i)=>{this._cardsPerPage=e,this._baseUrl=t,this._headers=s,this._updateMediaCardList=i;const n=await u(t,1,e,s);this._currentPageData=g(n),this._firstPageData=this._currentPageData,this._updateMediaCardList(this._currentPageData),this._lastPageNum=T(n.meta.count,e),this._lastPageData=await this.getPageData(this._lastPageNum),await this.updateNextPageData()});a(this,"getPageData",async e=>{const t=await u(this._baseUrl,e,this._cardsPerPage,this._headers);return g(t)});a(this,"updatePrevPageData",async()=>{this._prevPageData=await this.getPageData(Math.max(this._currentPageNum-1,1))});a(this,"updateNextPageData",async()=>{this._nextPageData=await this.getPageData(Math.min(this._currentPageNum+1,this._lastPageNum))});a(this,"handlePageChange",async e=>{L(e,this._currentPageNum,this._lastPageNum)&&(e===1?await this.goToFirstPage():e===this._lastPageNum?await this.goToLastPage():e===this._currentPageNum+1?await this.goToNextPage():e===this._currentPageNum-1?await this.goToPrevPage():await this.goToPage(e))});a(this,"goToFirstPage",async()=>{this._updateMediaCardList(this._firstPageData),this._currentPageData=this._firstPageData,this._prevPageData=this._firstPageData,this._currentPageNum=1,await this.updateNextPageData()});a(this,"goToLastPage",async()=>{this._updateMediaCardList(this._lastPageData),this._currentPageData=this._lastPageData,this._nextPageData=this._lastPageData,this._currentPageNum=this._lastPageNum,await this.updatePrevPageData()});a(this,"goToNextPage",async()=>{this._updateMediaCardList(this._nextPageData),this._prevPageData=this._currentPageData,this._currentPageData=this._nextPageData,this._currentPageNum+=1,await this.updateNextPageData()});a(this,"goToPrevPage",async()=>{this._updateMediaCardList(this._prevPageData),this._nextPageData=this._currentPageData,this._currentPageData=this._prevPageData,this._currentPageNum-=1,await this.updatePrevPageData()});a(this,"goToPage",async e=>{this._currentPageData=await this.getPageData(e),this._updateMediaCardList(this._currentPageData),this._currentPageNum=e,await this.updatePrevPageData(),await this.updateNextPageData()})}get lastPageNum(){return this._lastPageNum}};a(h,"instance",new h);let p=h;const M=async()=>{const r=p.instance,e=document.getElementById("main"),t=new D(c);e.appendChild(t);const s=document.getElementById("footer"),i=new f(r.handlePageChange);s.appendChild(i),await r.init(c,w,v,t.updateMediaCardList),i.lastPageNum=r.lastPageNum};document.addEventListener("DOMContentLoaded",M);
