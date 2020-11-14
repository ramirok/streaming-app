(()=>{"use strict";const e=e=>document.getElementById(e),t={player:e("player"),playBtn:e("play"),prevBtn:e("prev"),nextBtn:e("next"),audio:e("audio"),progress:e("progress"),progressContainer:e("progress-bar"),title:e("title"),artist:e("artist"),cover:e("cover"),songsList:e("songs-list"),currentTime:e("current-time"),totalTiem:e("total-time"),colorPalette:e("color-palette"),likePlayList:e("fav-play-list"),likeBtn:e("toggle-like"),genreBtn:e("genre"),googleBtn:e("my-signin2"),logoutBtn:e("logout"),playlistSpinner:e("playlist-spinner")},a={checkLikeStatus:new CustomEvent("checkLikeStatus",{detail:"for stylyng like button"}),checkActiveSongStatus:new CustomEvent("checkActiveSongStatus",{detail:"for styling playing song"})},n={scheme1:{"main-color":getComputedStyle(document.documentElement).getPropertyValue("--blue-1"),"secondary-color":getComputedStyle(document.documentElement).getPropertyValue("--white-1")},scheme2:{"main-color":getComputedStyle(document.documentElement).getPropertyValue("--orange-1"),"secondary-color":getComputedStyle(document.documentElement).getPropertyValue("--white-1")},scheme3:{"main-color":getComputedStyle(document.documentElement).getPropertyValue("--blue-1"),"secondary-color":getComputedStyle(document.documentElement).getPropertyValue("--grey-1")},scheme4:{"main-color":getComputedStyle(document.documentElement).getPropertyValue("--orange-1"),"secondary-color":getComputedStyle(document.documentElement).getPropertyValue("--grey-1")}},s=["electro","relaxing","rock"];let o;var i=function(){o=gapi.auth2.init({client_id:"397804942588-e4lg1b6sk340v0hj10it0cvc97te2sk8.apps.googleusercontent.com"}),o.isSignedIn.listen(l),1==o.isSignedIn.get()&&o.signIn()};const l=function(e){e?(t.googleBtn.style.display="none",t.logoutBtn.style.display="block"):(t.logoutBtn.style.display="none",t.googleBtn.style.display="block")};let r;const c=()=>{t.googleBtn.style.borderRadius="15px",t.googleBtn.style.width="12.5rem",t.googleBtn.style.background="white",clearTimeout(r),r=setTimeout((()=>{t.googleBtn.style.width="4rem",t.googleBtn.style.borderRadius="50%"}),2e3)},d=()=>{t.googleBtn.innerHTML=y;const e=document.createElement("script");e.src="https://apis.google.com/js/platform.js",document.head.append(e),e.onload=async()=>{await void gapi.load("auth2",i),await void gapi.signin2.render("my-signin2",{onsuccess:async e=>{if(!localStorage.getItem("sesion")){const t=await fetch("/api/users",{method:"POST",headers:{Authorization:"Bearer "+e.getAuthResponse().id_token}}),a=await t.json();localStorage.setItem("sesion",JSON.stringify(a)),window.location.reload()}},onfailure:()=>{localStorage.removeItem("sesion")}})}},g=e=>e.charAt(0).toUpperCase().concat(e.substring(1)).replace(/-/g," "),u=()=>{if(navigator.onLine)return m(window.location.origin).then((function(e){e?(d(),document.getElementById("offline")&&document.getElementById("offline").remove(),t.googleBtn.style.display="block"):console.log("no connectivity")}));t.googleBtn.style.display="none",document.querySelector(".upper-buttons").insertAdjacentHTML("afterbegin",'<button id="offline" class="button button-medium" style="position: absolute; left: 0; border-radius:15px; animation-name: longButton; animation-duration: 0.3s; animation-fill-mode: forwards;"><i class="fas fa-exclamation"></i>&nbsp;Offline</button>')},m=e=>fetch(e,{method:"HEAD",mode:"no-cors"}).then((function(e){return e&&(e.ok||"opaque"===e.type)})).catch((function(e){console.warn("[conn test failure]:",e)})),y='<div class="loader">Loading...</div>',p=e=>{e.insertAdjacentHTML("afterbegin",y),e.lastChild.style.display="none"},v=e=>{e.lastChild.style.display="block",e.firstChild.remove()},h=()=>{const e={lastPlayed:null,playing:!1,liked:[],inFavs:!1};return Object.assign(e,(e=>({load(n){if(n!==e.lastPlayed){const s=t.songsList.querySelector(`[data-id="${n}"]`);t.title.innerText=g(s.dataset.name),t.artist.innerHTML=s.dataset.artist,t.audio.src="/api/track/"+s.dataset.name,t.cover.src=`assets/images/${s.dataset.name}.webp`,e.lastPlayed=parseInt(n),localStorage.setItem("lastPlayed",JSON.stringify(e.lastPlayed)),document.dispatchEvent(a.checkLikeStatus)}}}))(e),(e=>({play(){e.playing=!0,t.audio.play(),document.dispatchEvent(a.checkActiveSongStatus)}}))(e),(e=>({pause(){e.playing=!1,t.audio.pause(),document.dispatchEvent(a.checkActiveSongStatus)}}))(e),(e=>({prev:()=>(t.songsList.querySelector(`[data-id="${e.lastPlayed}"]`).previousSibling||t.songsList.lastChild).dataset.id}))(e),(e=>({next:()=>(t.songsList.querySelector(`[data-id="${e.lastPlayed}"]`).nextSibling||t.songsList.firstChild).dataset.id}))(e),(e=>({saveLikes(t){e.liked=t}}))(e))},f=e=>{if(!e)return"00:00";const t=Math.round(e);let a=Math.floor(t/60),n=t%60;return a=a<10?"0"+a:a,n=n<10?"0"+n:n,a+":"+n},L=()=>{const e=[];return Object.assign(e,(t=e,{async get(e){try{const a=await fetch("/api/"+e,{headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("sesion"))}}),n=await a.json();t.list=[...n]}catch(e){t.list=null}}}));var t},S=()=>{const e=JSON.parse(localStorage.getItem("config"))||{genre:"electro",colorScheme:"scheme1"};return Object.assign(e,(e=>({saveColorScheme(t){e.colorScheme=t,localStorage.setItem("config",JSON.stringify(e))}}))(e),(e=>({saveGenre(t){e.genre=t,localStorage.setItem("config",JSON.stringify(e))}}))(e))};"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then((e=>console.log("service worker registered"))).catch((e=>console.log("service worker not registered",e)));const k=h(),E=L(),B=S(),w=async e=>{t.songsList.innerHTML="",t.songsList.insertAdjacentElement("beforeend",t.playlistSpinner),await E.get(e),(e=>{if(t.songsList.innerHTML="",e)if(e.length<1){const e='<li class="songs-list song"><h5>No songs...</h5></li>';t.songsList.insertAdjacentHTML("beforeend",e)}else e.forEach(((e,a)=>{const n=`<li class="songs-list song" id="song" data-name="${e.track_name}"data-id="${e.id}" data-artist="${e.artist}">\n    <span class="button button-small">${a+1}</span><span>\n    <h5>${g(e.track_name)}</h5><h6>${e.artist}</h6>\n    </span><button class="button button-medium"><i class="fas fa-play"></i></button>\n    </li>`;t.songsList.insertAdjacentHTML("beforeend",n)}));else{const e='<li class="songs-list song"><h5>No connection...</h5></li>';t.songsList.insertAdjacentHTML("beforeend",e)}})(E.list),k.playing&&document.dispatchEvent(a.checkActiveSongStatus),document.querySelectorAll(".song").forEach((e=>{e.addEventListener("click",(()=>{k.playing&&k.lastPlayed===parseInt(e.dataset.id)?k.pause():(k.load(e.dataset.id),k.play())}))}))},b=()=>{k.playing?k.pause():(k.load(k.lastPlayed||t.songsList.children[0].dataset.id),k.play())},P=()=>{const e=k.prev();k.load(e),k.play()},I=()=>{const e=k.next();k.load(e),k.play()},C=async()=>{if(k.lastPlayed){const e=await fetch("/api/users/like",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+JSON.parse(localStorage.getItem("sesion"))},body:JSON.stringify({trackId:k.lastPlayed})}),t=await e.json();k.saveLikes(t.map((e=>e.track_id))),k.inFavs&&w("users/favs"),document.dispatchEvent(a.checkLikeStatus)}},A=()=>{const e=document.getElementById("menu-palette");e?(e.parentNode.removeChild(e),t.colorPalette.classList.remove("active")):((()=>{const e=[];for(const t in n)e.push(`<li id="${t}">\n        <div class="button button-small"></div>\n      </li>`);const a=`<div class="dropDownMenu" id="menu-palette"><ul>\n  ${e.join("")}</ul></div>`;t.colorPalette.insertAdjacentHTML("afterend",a),t.colorPalette.classList.add("active"),document.getElementById("menu-palette").querySelectorAll("li").forEach((e=>{getComputedStyle(document.documentElement).getPropertyValue("--secondary-bg-color"),e.firstElementChild.style.background=`linear-gradient(to right, ${n[e.id]["main-color"]}, ${n[e.id]["main-color"]} 50%, ${n[e.id]["secondary-color"]} 50%, ${n[e.id]["secondary-color"]})`}))})(),document.getElementById(B.colorScheme).classList.add("active"),document.getElementById("menu-palette").querySelectorAll("li").forEach((e=>{e.addEventListener("click",(a=>{a.stopPropagation(),document.querySelector(":root").classList="",document.querySelector(":root").classList.add(e.id);const n=document.getElementById("menu-palette");n.parentNode.removeChild(n),t.colorPalette.classList.remove("active"),B.saveColorScheme(e.id)}))})))},T=()=>{const e=document.getElementById("menu-genre");e?(e.parentNode.removeChild(e),t.genreBtn.classList.remove("active")):((()=>{const e=[];for(const t of s)e.push(`<li id="${t}"><span>${t}</span><div class="button button-small"></div></li>`);const a=`<div class="dropDownMenu" id="menu-genre"><ul>\n${e.join("")}</ul></div>`;t.genreBtn.insertAdjacentHTML("afterend",a),t.genreBtn.classList.add("active")})(),document.getElementById(B.genre).classList.add("active"),document.getElementById("menu-genre").querySelectorAll("li").forEach((e=>{e.addEventListener("click",(a=>{a.stopPropagation(),k.inFavs=!1,t.likePlayList.classList.remove("active"),w("playlist/"+e.id);const n=document.getElementById("menu-genre");n.parentNode.removeChild(n),t.genreBtn.classList.remove("active"),B.saveGenre(e.id)}))})))};window.addEventListener("online",(async()=>{if(await u(),await w("playlist/"+B.genre),localStorage.getItem("sesion")){const e=await fetch("/api/users/like",{headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("sesion"))}}),t=await e.json();k.saveLikes(t.map((e=>e.track_id)))}const e=localStorage.getItem("lastPlayed");if(e){const t=JSON.parse(e);k.load(t)}})),window.addEventListener("offline",(async()=>{await u(),await w("playlist/"+B.genre)})),window.addEventListener("load",(async()=>{if(await u(),await w("playlist/"+B.genre),localStorage.getItem("sesion")&&!document.getElementById("offline")){const e=await fetch("/api/users/like",{headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("sesion"))}}),t=await e.json();k.saveLikes(t.map((e=>e.track_id)))}const e=localStorage.getItem("lastPlayed");if(e){const t=JSON.parse(e);k.load(t)}})),t.playBtn.addEventListener("click",(()=>{b()})),t.prevBtn.addEventListener("click",(()=>{P()})),t.nextBtn.addEventListener("click",(()=>{I()})),t.audio.addEventListener("ended",(()=>{I()})),t.likeBtn.addEventListener("click",(async()=>{localStorage.getItem("sesion")?(p(t.likeBtn),t.likeBtn.classList.contains("active")&&t.likeBtn.firstChild.classList.add("inverted"),await C(),v(t.likeBtn)):c()})),t.audio.addEventListener("timeupdate",(e=>{(e=>{const{currentTime:a,duration:n}=e.srcElement,s=a/n*100;t.progress.style.width=s+"%"})(e),t.currentTime.innerText=f(t.audio.currentTime),t.totalTiem.innerText=f(t.audio.duration)})),t.progressContainer.addEventListener("click",(e=>{const a=t.progressContainer.clientWidth,n=e.offsetX,s=t.audio.duration;t.audio.currentTime=n/a*s})),document.addEventListener("checkLikeStatus",(async()=>{localStorage.getItem("sesion")&&(k.liked.includes(k.lastPlayed)?t.likeBtn.classList.add("active"):t.likeBtn.classList.remove("active"))})),document.addEventListener("checkActiveSongStatus",(()=>{(e=>{const a=t.songsList.querySelector(`[data-id="${e}"]`),n=t.songsList.querySelector(".active");n&&(n.classList.remove("active"),n.querySelector("i.fas").classList.add("fa-play"),n.querySelector("i.fas").classList.remove("fa-pause")),a!==n&&(a.classList.add("active"),a.querySelector("i.fas").classList.remove("fa-play"),a.querySelector("i.fas").classList.add("fa-pause"))})(k.lastPlayed),k.playing?(t.player.classList.add("play"),t.playBtn.querySelector("i.fas").classList.remove("fa-play"),t.playBtn.querySelector("i.fas").classList.add("fa-pause")):(t.player.classList.remove("play"),t.playBtn.querySelector("i.fas").classList.add("fa-play"),t.playBtn.querySelector("i.fas").classList.remove("fa-pause"))})),t.colorPalette.addEventListener("click",(e=>{e.stopPropagation(),A()})),t.genreBtn.addEventListener("click",(e=>{e.stopPropagation(),T()})),t.logoutBtn.addEventListener("click",(()=>{o.signOut().then((()=>{localStorage.removeItem("sesion"),window.location.reload()}))})),t.likePlayList.addEventListener("click",(async()=>{localStorage.getItem("sesion")?(p(t.likePlayList),k.inFavs?(t.likePlayList.classList.remove("active"),await w("playlist/"+B.genre),k.inFavs=!1,v(t.likePlayList)):(await w("users/favs"),t.likePlayList.classList.add("active"),k.inFavs=!0,v(t.likePlayList))):c()})),window.addEventListener("click",(()=>{const e=document.querySelector(".dropDownMenu");e&&("menu-palette"===e.id&&A(),"menu-genre"===e.id&&T())}))})();