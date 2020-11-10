(()=>{"use strict";const e=e=>document.getElementById(e),t={player:e("player"),playBtn:e("play"),prevBtn:e("prev"),nextBtn:e("next"),audio:e("audio"),progress:e("progress"),progressContainer:e("progress-bar"),title:e("title"),artist:e("artist"),cover:e("cover"),songsList:e("songs-list"),currentTime:e("current-time"),totalTiem:e("total-time"),colorPalette:e("color-palette"),likePlayList:e("fav-play-list"),likeBtn:e("toggle-like"),genreBtn:e("genre"),googleBtn:e("my-signin2"),logoutBtn:e("logout")},a={checkLikeStatus:new CustomEvent("checkLikeStatus",{detail:"for stylyng like button"}),checkActiveSongStatus:new CustomEvent("checkActiveSongStatus",{detail:"for styling playing song"})},n={scheme1:{"--main-bg-color":"#5785ff","--main-bg-gradient":"linear-gradient(145deg, #5d8eff, #4e78e6)","--main-bg-gradient-inverted":"linear-gradient(145deg, #4e78e6, #5d8eff)","--secondary-bg-color":"#e7eaef","--secondary-bg-gradient":"linear-gradient(145deg, #f7faff, #d0d3d7)","--box-shadow":"8px 8px 16px #b9bbbf, -8px -8px 16px #ffffff","--text-color":"#515c71","--border-color":"#ddd","--active-song-bg":"#d0dcf4"},scheme2:{"--main-bg-color":"#C93309","--main-bg-gradient":"linear-gradient(145deg, #ea520b, #c54509)","--main-bg-gradient-inverted":"linear-gradient(145deg, #c54509, #ea520b)","--secondary-bg-color":"#e7eaef","--secondary-bg-gradient":"linear-gradient(145deg, #f7faff, #d0d3d7)","--box-shadow":"8px 8px 16px #b9bbbf, -8px -8px 16px #ffffff","--text-color":"#515c71","--border-color":"#ddd","--active-song-bg":"#E9C3AD"},scheme3:{"--main-bg-color":"#5785ff","--main-bg-gradient":"linear-gradient(145deg, #5d8eff, #4e78e6)","--main-bg-gradient-inverted":"linear-gradient(145deg, #4e78e6, #5d8eff)","--secondary-bg-color":"#30353A","--secondary-bg-gradient":"linear-gradient(145deg, #33393e, #2b3034)","--box-shadow":" 9px 9px 26px #1e2125,-5px -5px 26px #42494f","--text-color":"#eee","--border-color":"#333","--active-song-bg":"#4164c1"},scheme4:{"--main-bg-color":"#C93309","--main-bg-gradient":"linear-gradient(145deg, #ea520b, #c54509)","--main-bg-gradient-inverted":"linear-gradient(145deg, #c54509, #ea520b)","--secondary-bg-color":"#30353A","--secondary-bg-gradient":"linear-gradient(145deg, #33393e, #2b3034)","--box-shadow":" 9px 9px 26px #1e2125,-5px -5px 26px #42494f","--text-color":"#eee","--border-color":"#333","--active-song-bg":"#a53e05"}},s=["electro","relaxing","rock"];let o;var i=function(){o=gapi.auth2.init({client_id:"397804942588-e4lg1b6sk340v0hj10it0cvc97te2sk8.apps.googleusercontent.com"}),o.isSignedIn.listen(r),1==o.isSignedIn.get()&&o.signIn()};const r=function(e){e?(t.googleBtn.style.display="none",t.logoutBtn.style.display="block"):(t.logoutBtn.style.display="none",t.googleBtn.style.display="block")};let l;const c=()=>{t.googleBtn.style.borderRadius="15px",t.googleBtn.style.width="12.5rem",t.googleBtn.style.background="white",clearTimeout(l),l=setTimeout((()=>{t.googleBtn.style.width="4rem",t.googleBtn.style.borderRadius="50%"}),2e3)},d=()=>{const e=document.createElement("script");e.src="https://apis.google.com/js/platform.js",document.head.append(e),e.onload=()=>{gapi.signin2.render("my-signin2",{onsuccess:async e=>{if(!localStorage.getItem("sesion")){const t=await fetch("/api/users",{method:"POST",headers:{Authorization:"Bearer "+e.getAuthResponse().id_token}}),a=await t.json();localStorage.setItem("sesion",JSON.stringify(a)),window.location.reload()}},onfailure:()=>{localStorage.removeItem("sesion")}}),gapi.load("auth2",i)}},g=e=>e.charAt(0).toUpperCase().concat(e.substring(1)).replace(/-/g," "),u=()=>{if(console.log("checking connection"),navigator.onLine)return p(window.location.origin).then((function(e){e?(d(),document.getElementById("offline").remove(),t.googleBtn.style.display="block"):console.log("no connectivity")}));t.googleBtn.style.display="none",document.querySelector(".upper-buttons").insertAdjacentHTML("afterbegin",'<button id="offline" class="button button-medium" style="position: absolute; left: 0; border-radius:15px; animation-name: longButton; animation-duration: 0.3s; animation-fill-mode: forwards;"><i class="fas fa-exclamation"></i>&nbsp;Offline</button>')},p=e=>fetch(e,{method:"HEAD",mode:"no-cors"}).then((function(e){return e&&(e.ok||"opaque"===e.type)})).catch((function(e){console.warn("[conn test failure]:",e)})),m=()=>{const e={lastPlayed:null,playing:!1,liked:[],inFavs:!1};return Object.assign(e,(e=>({load(n){if(n!==e.lastPlayed){const s=t.songsList.querySelector(`[data-id="${n}"]`);t.title.innerText=g(s.dataset.name),t.artist.innerHTML=s.dataset.artist,t.audio.src="/api/track/"+s.dataset.name,t.cover.src=`assets/images/${s.dataset.name}.jpg`,e.lastPlayed=parseInt(n),localStorage.setItem("lastPlayed",JSON.stringify(e.lastPlayed)),document.dispatchEvent(a.checkLikeStatus)}}}))(e),(e=>({play(){e.playing=!0,t.audio.play(),document.dispatchEvent(a.checkActiveSongStatus)}}))(e),(e=>({pause(){e.playing=!1,t.audio.pause(),document.dispatchEvent(a.checkActiveSongStatus)}}))(e),(e=>({prev:()=>(t.songsList.querySelector(`[data-id="${e.lastPlayed}"]`).previousSibling||t.songsList.lastChild).dataset.id}))(e),(e=>({next:()=>(t.songsList.querySelector(`[data-id="${e.lastPlayed}"]`).nextSibling||t.songsList.firstChild).dataset.id}))(e),(e=>({saveLikes(t){e.liked=t}}))(e))},y=e=>{if(!e)return"00:00";const t=Math.round(e);let a=Math.floor(t/60),n=t%60;return a=a<10?"0"+a:a,n=n<10?"0"+n:n,a+":"+n},f=()=>{const e=[];return Object.assign(e,(t=e,{async get(e){try{const a=await fetch("/api/"+e,{headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("sesion"))}}),n=await a.json();t.list=[...n]}catch(e){t.list=[]}}}));var t},v=()=>{const e=JSON.parse(localStorage.getItem("config"))||{genre:"electro",colorScheme:"scheme1"};return Object.assign(e,(e=>({saveColorScheme(t){e.colorScheme=t,localStorage.setItem("config",JSON.stringify(e))}}))(e),(e=>({saveGenre(t){e.genre=t,localStorage.setItem("config",JSON.stringify(e))}}))(e))};"serviceWorker"in navigator&&navigator.serviceWorker.register("/service-worker.js").then((e=>console.log("service worker registered"))).catch((e=>console.log("service worker not registered",e)));const h=m(),b=f(),L=v(),S=async e=>{if(await b.get(e),b.list.length<1){t.songsList.innerHTML="";const e='<li class="songs-list song">No songs...</li>';t.songsList.insertAdjacentHTML("beforeend",e)}else{var n;n=b.list,t.songsList.innerHTML="",n.forEach(((e,a)=>{const n=`<li class="songs-list song" id="song" data-name="${e.track_name}" data-id="${e.id}" data-artist="${e.artist}">\n    <span class="button button-small">${a+1}</span><span>\n    <h5>${g(e.track_name)}</h5><h6>${e.artist}</h6>\n    </span><button class="button button-medium"><i class="fas fa-play"></i></button></li>`;t.songsList.insertAdjacentHTML("beforeend",n)})),h.playing&&document.dispatchEvent(a.checkActiveSongStatus),document.querySelectorAll(".song").forEach((e=>{e.addEventListener("click",(()=>{h.playing&&h.lastPlayed===parseInt(e.dataset.id)?h.pause():(h.load(e.dataset.id),h.play())}))}))}},k=()=>{h.playing?h.pause():(h.load(h.lastPlayed||t.songsList.children[0].dataset.id),h.play())},B=()=>{const e=h.prev();h.load(e),h.play()},E=()=>{const e=h.next();h.load(e),h.play()},w=async()=>{if(h.lastPlayed){const e=await fetch("/api/users/like",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+JSON.parse(localStorage.getItem("sesion"))},body:JSON.stringify({trackId:h.lastPlayed})}),t=await e.json();h.saveLikes(t.map((e=>e.track_id))),h.inFavs&&S("users/favs"),document.dispatchEvent(a.checkLikeStatus)}},x=()=>{const e=document.getElementById("menu-palette");e?(e.parentNode.removeChild(e),t.colorPalette.classList.remove("active")):((()=>{const e=[];for(const t in n)e.push(`<li id="${t}">\n        <div class="button button-small"></div>\n      </li>`);const a=`<div class="dropDownMenu" id="menu-palette"><ul>\n  ${e.join("")}</ul></div>`;t.colorPalette.insertAdjacentHTML("afterend",a),t.colorPalette.classList.add("active"),document.getElementById("menu-palette").querySelectorAll("li").forEach((e=>{e.firstElementChild.style.background=`linear-gradient(to right, ${n[e.id]["--main-bg-color"]}, ${n[e.id]["--main-bg-color"]} 50%, ${n[e.id]["--secondary-bg-color"]} 50%, ${n[e.id]["--secondary-bg-color"]})`}))})(),document.getElementById(L.colorScheme).classList.add("active"),document.getElementById("menu-palette").querySelectorAll("li").forEach((e=>{e.addEventListener("click",(a=>{a.stopPropagation();for(const t in n[e.id])document.documentElement.style.setProperty(t,n[e.id][t]);const s=document.getElementById("menu-palette");s.parentNode.removeChild(s),t.colorPalette.classList.remove("active"),L.saveColorScheme(e.id)}))})))},I=()=>{const e=document.getElementById("menu-genre");e?(e.parentNode.removeChild(e),t.genreBtn.classList.remove("active")):((()=>{const e=[];for(const t of s)e.push(`<li id="${t}"><span>${t}</span><div class="button button-small"></div></li>`);const a=`<div class="dropDownMenu" id="menu-genre"><ul>\n${e.join("")}</ul></div>`;t.genreBtn.insertAdjacentHTML("afterend",a),t.genreBtn.classList.add("active")})(),document.getElementById(L.genre).classList.add("active"),document.getElementById("menu-genre").querySelectorAll("li").forEach((e=>{e.addEventListener("click",(a=>{a.stopPropagation(),h.inFavs=!1,t.likePlayList.classList.remove("active"),S("playlist/"+e.id);const n=document.getElementById("menu-genre");n.parentNode.removeChild(n),t.genreBtn.classList.remove("active"),L.saveGenre(e.id)}))})))};window.addEventListener("online",(async()=>{if(u(),console.log("rendering lists"),await S("playlist/"+L.genre),localStorage.getItem("sesion")){const e=await fetch("/api/users/like",{headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("sesion"))}}),t=await e.json();h.saveLikes(t.map((e=>e.track_id)))}const e=localStorage.getItem("lastPlayed");if(e){const t=JSON.parse(e);h.load(t)}})),window.addEventListener("offline",(()=>{u(),t.songsList.innerHTML="";t.songsList.insertAdjacentHTML("beforeend",'<li class="songs-list song">No Intenet...</li>')})),window.addEventListener("load",(async()=>{if(u(),await S("playlist/"+L.genre),localStorage.getItem("sesion")){const e=await fetch("/api/users/like",{headers:{Authorization:"Bearer "+JSON.parse(localStorage.getItem("sesion"))}}),t=await e.json();h.saveLikes(t.map((e=>e.track_id)))}const e=localStorage.getItem("lastPlayed");if(e){const t=JSON.parse(e);h.load(t)}})),t.playBtn.addEventListener("click",(()=>{k()})),t.prevBtn.addEventListener("click",(()=>{B()})),t.nextBtn.addEventListener("click",(()=>{E()})),t.audio.addEventListener("ended",(()=>{E()})),t.likeBtn.addEventListener("click",(()=>{localStorage.getItem("sesion")?w():c()})),t.audio.addEventListener("timeupdate",(e=>{(e=>{const{currentTime:a,duration:n}=e.srcElement,s=a/n*100;t.progress.style.width=s+"%"})(e),t.currentTime.innerText=y(t.audio.currentTime),t.totalTiem.innerText=y(t.audio.duration)})),t.progressContainer.addEventListener("click",(e=>{const a=t.progressContainer.clientWidth,n=e.offsetX,s=t.audio.duration;t.audio.currentTime=n/a*s})),document.addEventListener("checkLikeStatus",(async()=>{localStorage.getItem("sesion")&&(h.liked.includes(h.lastPlayed)?t.likeBtn.classList.add("active"):t.likeBtn.classList.remove("active"))})),document.addEventListener("checkActiveSongStatus",(()=>{(e=>{const a=t.songsList.querySelector(`[data-id="${e}"]`),n=t.songsList.querySelector(".active");n&&(n.classList.remove("active"),n.querySelector("i.fas").classList.add("fa-play"),n.querySelector("i.fas").classList.remove("fa-pause")),a!==n&&(a.classList.add("active"),a.querySelector("i.fas").classList.remove("fa-play"),a.querySelector("i.fas").classList.add("fa-pause"))})(h.lastPlayed),h.playing?(t.player.classList.add("play"),t.playBtn.querySelector("i.fas").classList.remove("fa-play"),t.playBtn.querySelector("i.fas").classList.add("fa-pause")):(t.player.classList.remove("play"),t.playBtn.querySelector("i.fas").classList.add("fa-play"),t.playBtn.querySelector("i.fas").classList.remove("fa-pause"))})),t.colorPalette.addEventListener("click",(e=>{e.stopPropagation(),x()})),t.genreBtn.addEventListener("click",(e=>{e.stopPropagation(),I()})),t.logoutBtn.addEventListener("click",(()=>{o.signOut().then((()=>{localStorage.removeItem("sesion"),window.location.reload()}))})),t.likePlayList.addEventListener("click",(async()=>{localStorage.getItem("sesion")?h.inFavs?(t.likePlayList.classList.remove("active"),await S("playlist/"+L.genre),h.inFavs=!1):(t.likePlayList.classList.add("active"),await S("users/favs"),h.inFavs=!0):c()})),window.addEventListener("click",(()=>{const e=document.querySelector(".dropDownMenu");e&&("menu-palette"===e.id&&x(),"menu-genre"===e.id&&I())}))})();