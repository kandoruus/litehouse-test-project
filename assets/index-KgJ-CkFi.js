var D=Object.defineProperty;var b=(n,s,t)=>s in n?D(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t;var a=(n,s,t)=>b(n,typeof s!="symbol"?s+"":s,t);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();const d={title:"",description:"",imgUrl:""},f={Accept:"application/vnd.api+json","Content-Type":"application/vnd.api+json"},c=12,_=`https://kitsu.io/api/edge/anime?page%5Blimit%5D=${c}&page%5Boffset%5D=`,P=`
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
  height: 320px;
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
  padding: 
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: var(--STANDARD_PADDING);
  padding-top: var(--SMALL_PADDING);
}

p {
  line-height: 1.125rem;
  height: 1.125rem;
  background-color: var(--LIGHT_COLOR);
  overflow: hidden;
  width: 80%;
  word-break: break-all;
}

.details-btn {
  line-height: 1.125rem;
  height: 1.125rem;
  width: fit-content;
  white-space: nowrap;
  background-color: transparent;
  border:none;
  color: var(--DARK_COLOR);
  font-size: 1rem;
}

@media (max-width: 591px){
  .details-btn {
    display: none;
  }
  p {
    width: 100%;
    line-height: 1.125rem;
    height: auto;
    background-color: var(--LIGHT_COLOR);
    overflow: hidden;
    word-break: normal;
  }
  
  .card {
    height: auto;
  }
}
`;class p extends HTMLElement{constructor(t,e=d){super();a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"_openModal");a(this,"data");a(this,"connectedCallback",()=>{if(this.data===d){this.shadow.innerHTML="",this.style.display="none";return}this.style.display="flex",this.shadow.innerHTML=`
      <style>
        ${P}
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
            <p>${this.data.description}</p>
            <button class="details-btn">...more details</button>
          </div>
        </div>
      </div>
    `;const t=this.shadow.querySelector(".details-btn");t.onclick=()=>{this._openModal(this.data)}});a(this,"updateCardData",t=>{this.data=t,this.connectedCallback()});this.data=e,this._openModal=t}}customElements.define("media-card",p);const v=`
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
  display: none;
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
  width: clamp(288px, 80%, 650px)
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
  width:100%;
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
  padding: var(--STANDARD_PADDING);
  padding-top: var(--SMALL_PADDING);
}
`;class u extends HTMLElement{constructor(){super();a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"data",d);a(this,"connectedCallback",()=>{this.shadow.innerHTML=`
      <style>
        ${v}
      </style>

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
    `,this.shadow.querySelector(".backdrop").addEventListener("click",()=>this.close())});a(this,"show",t=>{this.data=t,this.connectedCallback(),this.style.display="block"});a(this,"close",()=>{this.style.display="none",this.connectedCallback(),this.data=d});this.connectedCallback()}}customElements.define("media-modal",u);const w=`
:host {
  flex-grow: 1;
  display: flex;
}

.media-card-list {
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
`;class g extends HTMLElement{constructor(t){super();a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"mediaCards");a(this,"mediaModal");a(this,"updateMediaCardList",t=>{this.mediaCards.forEach((e,i)=>{i<t.length?e.updateCardData(t[i]):e.updateCardData(d)})});this.mediaCards=[],this.shadow.innerHTML=`
      <style>
        ${w}
      </style>
    `;const e=document.createElement("div");e.classList.add("media-card-list"),this.mediaModal=new u,e.appendChild(this.mediaModal);for(let i=0;i<t;i++){const r=new p(this.mediaModal.show);e.appendChild(r),this.mediaCards.push(r)}this.shadow.appendChild(e)}}customElements.define("media-card-list",g);const L=`
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

.nav-bar-page-number {
  font-size: 1.5rem;
  text-decoration: underline;
}

.hidden {
display: none;
}
`,x=["first-btn","prev-btn","next-btn","last-btn"];class m extends HTMLElement{constructor(t){super();a(this,"shadow",this.attachShadow({mode:"open"}));a(this,"handlePageChange");a(this,"buttonsData",[]);a(this,"currentPage");a(this,"firstEllipsis");a(this,"lastEllipsis");a(this,"createNavBarBtn",(t,e="")=>{const i=document.createElement("button");return i.classList.add("nav-bar-button","hidden"),i.id=t,i.innerHTML=e,i.onclick=()=>{this.handleButtonClick(i.id)},i});a(this,"createEllipsis",t=>{const e=document.createElement("div");return e.classList.add("nav-bar-ellipsis","hidden"),e.id=t,e.innerHTML="...",e});a(this,"createCurrentPageNumber",()=>{const t=document.createElement("div");return t.classList.add("nav-bar-page-number"),t.innerText="1",{pageNumber:1,element:t}});a(this,"handleButtonClick",t=>{const e=this.buttonsData.find(({button:r})=>t===r.id);if(e===void 0)return;const i=e.pageNumber;this.disableButtons(),this.handlePageChange(e.pageNumber).then(()=>{this.updateDisplay(i),this.enableButtons()})});a(this,"updateDisplay",t=>{this.updateCurrentPage(t),this.updateBtns(t),this.updateEllipsis()});a(this,"updateCurrentPage",t=>{this.currentPage.pageNumber=t,this.currentPage.element.innerText=t+""});a(this,"updateBtns",t=>{const e=this.buttonsData[0],i=this.buttonsData[1],r=this.buttonsData[2],o=this.buttonsData[3];i.pageNumber=t-1,i.button.innerText=`${t-1}`,r.pageNumber=t+1,r.button.innerText=`${t+1}`,t-1>1?(e.button.classList.remove("hidden"),i.button.classList.remove("hidden")):t-1>0?(e.button.classList.add("hidden"),i.button.classList.remove("hidden")):(e.button.classList.add("hidden"),i.button.classList.add("hidden")),o.pageNumber-t>1?(o.button.classList.remove("hidden"),r.button.classList.remove("hidden")):o.pageNumber-t>0?(o.button.classList.add("hidden"),r.button.classList.remove("hidden")):(o.button.classList.add("hidden"),r.button.classList.add("hidden"))});a(this,"updateEllipsis",()=>{this.currentPage.pageNumber-1<=2?this.firstEllipsis.classList.add("hidden"):this.firstEllipsis.classList.remove("hidden"),this.buttonsData[3].pageNumber-this.currentPage.pageNumber<=2?this.lastEllipsis.classList.add("hidden"):this.lastEllipsis.classList.remove("hidden")});a(this,"disableButtons",()=>{this.buttonsData.forEach(({button:t})=>{t.disabled=!0})});a(this,"enableButtons",()=>{this.buttonsData.forEach(({button:t})=>{t.disabled=!1})});this.handlePageChange=t,this.shadow.innerHTML=`
      <style>
        ${L}
      </style>
    `;const e=document.createElement("div");e.classList.add("nav-bar-wrapper"),x.forEach(i=>{const r=this.createNavBarBtn(i,"1");this.buttonsData.push({button:r,pageNumber:1})}),this.firstEllipsis=this.createEllipsis("first-ellipsis"),this.lastEllipsis=this.createEllipsis("last-ellipsis"),this.currentPage=this.createCurrentPageNumber(),e.appendChild(this.buttonsData[0].button),e.appendChild(this.firstEllipsis),e.appendChild(this.buttonsData[1].button),e.appendChild(this.currentPage.element),e.appendChild(this.buttonsData[2].button),e.appendChild(this.lastEllipsis),e.appendChild(this.buttonsData[3].button),this.shadow.appendChild(e)}set lastPageNum(t){this.buttonsData[3].pageNumber=t,this.buttonsData[3].button.innerText=t+"",this.updateDisplay(1)}}customElements.define("pagination-control-bar",m);const l=class l{constructor(){a(this,"_currentPageNum",1);a(this,"_lastPageNum",1);a(this,"_cardsPerPage",10);a(this,"_baseUrl","");a(this,"_headers",{});a(this,"_currentPageData",[]);a(this,"_firstPageData",[]);a(this,"_prevPageData",[]);a(this,"_nextPageData",[]);a(this,"_lastPageData",[]);a(this,"_updateMediaCardList",s=>{});a(this,"init",async(s,t,e,i)=>{this._cardsPerPage=s,this._baseUrl=t,this._headers=e,this._updateMediaCardList=i;const r=await this.callAPI(1);this._currentPageData=this.getPageDataFromResponse(r),this._firstPageData=this._currentPageData,this._updateMediaCardList(this._currentPageData),this._lastPageNum=Math.ceil(r.meta.count/this._cardsPerPage),this._lastPageData=await this.getPageData(this._lastPageNum),await this.updateNextPageData()});a(this,"getPageUrl",s=>{const t=(s-1)*this._cardsPerPage;return this._baseUrl+t});a(this,"callAPI",async s=>await(await fetch(this.getPageUrl(s),{headers:this._headers})).json());a(this,"getPageDataFromResponse",s=>s.data.map(t=>{const{canonicalTitle:e,description:i,posterImage:r}=t.attributes;return{title:e,description:i,imgUrl:r.small}}));a(this,"getPageData",async s=>this.getPageDataFromResponse(await this.callAPI(s)));a(this,"updatePrevPageData",async()=>{this._prevPageData=await this.getPageData(Math.max(this._currentPageNum-1,1))});a(this,"updateNextPageData",async()=>{this._nextPageData=await this.getPageData(Math.min(this._currentPageNum+1,this._lastPageNum))});a(this,"handlePageChange",async s=>{s<1||s>this._lastPageNum||s===this._currentPageNum||(s===1?await this.goToFirstPage():s===this._lastPageNum?await this.goToLastPage():s===this._currentPageNum+1?await this.goToNextPage():s===this._currentPageNum-1?await this.goToPrevPage():await this.goToPage(s))});a(this,"goToFirstPage",async()=>{this._updateMediaCardList(this._firstPageData),this._currentPageData=this._firstPageData,this._prevPageData=this._firstPageData,this._currentPageNum=1,await this.updateNextPageData()});a(this,"goToLastPage",async()=>{this._updateMediaCardList(this._lastPageData),this._currentPageData=this._lastPageData,this._nextPageData=this._lastPageData,this._currentPageNum=this._lastPageNum,await this.updatePrevPageData()});a(this,"goToNextPage",async()=>{this._updateMediaCardList(this._nextPageData),this._prevPageData=this._currentPageData,this._currentPageData=this._nextPageData,this._currentPageNum=this._currentPageNum+1,await this.updateNextPageData()});a(this,"goToPrevPage",async()=>{this._updateMediaCardList(this._prevPageData),this._nextPageData=this._currentPageData,this._currentPageData=this._prevPageData,this._currentPageNum=this._currentPageNum-1,await this.updatePrevPageData()});a(this,"goToPage",async s=>{this._currentPageData=await this.getPageData(s),this._updateMediaCardList(this._currentPageData),this._currentPageNum=s,await this.updatePrevPageData(),await this.updateNextPageData()})}get lastPageNum(){return this._lastPageNum}};a(l,"instance",new l);let h=l;const N=async()=>{const n=new g(c),s=h.instance,t=new m(s.handlePageChange);document.getElementById("footer").appendChild(t),await s.init(c,_,f,n.updateMediaCardList),t.lastPageNum=s.lastPageNum,document.getElementById("main").appendChild(n)};document.addEventListener("DOMContentLoaded",N);
