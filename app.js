var YTU="https://www.youtube.com/watch?v=3SCUOap0LYQ",TOTAL=6989;
var NAMES={S:"Pedro Sánchez",F:"Alberto Núñez Feijóo",A:"Santiago Abascal",C:"Ada Colau"};
var PARTY={S:"PSOE",F:"Partido Popular",A:"Vox",C:"Frente Amplio"};
var INI={S:"PS",F:"AN",A:"SA",C:"AC"},IMG={S:"sanchez",F:"feijoo",A:"abascal",C:"colau"},LOGO={S:"psoe",F:"pp",A:"vox",C:"frente-amplio"};
var VN={V:"Verdad",M:"A medias",F:"Falso",N:"Sin comprobar"},VC={V:"var(--V)",M:"var(--M)",F:"var(--F)",N:"var(--N)"},VO=["V","M","F","N"];
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!==undefined)e.innerHTML=h;return e}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function sec(t){var p=t.split(":").map(Number);return p.length==3?p[0]*3600+p[1]*60+p[2]:p[0]*60+p[1]}
function blockOf(s){for(var i=0;i<BLQ.length;i++){if(s>=BLQ[i][1]&&s<BLQ[i][2])return i}return s<BLQ[1][1]?0:BLQ.length-1}
function who(x){return x.w.map(function(c){return NAMES[c]}).join(" y ")}
var items=D.map(function(r){return {tc:r[0],t:sec(r[0]),w:r[1].split(""),v:r[2],q:r[3],d:r[4],o:r[5]||[],n:r[6]||"",pr:r[7]||[],bs:r[8]||"-",b:blockOf(sec(r[0]))}}).sort(function(a,b){return a.t-b.t});
items.forEach(function(x,k){x.k=k});
var cand="",vf="",sel=0,ytp=null;
function vis(x){return (!cand||x.w.indexOf(cand)>=0)&&(!vf||x.v===vf)}
function candItems(){return items.filter(function(x){return !cand||x.w.indexOf(cand)>=0})}
/* pestañas */
var tabs=document.getElementById("tabs");
[["","Todos"],["S","Sánchez"],["F","Feijóo"],["A","Abascal"],["C","Colau"],["m","Método"]].forEach(function(t){var b=el("button","",t[1]);b.type="button";b.dataset.c=t[0];b.setAttribute("aria-selected",t[0]===""?"true":"false");
 b.onclick=function(){if(t[0]==="m"){document.getElementById("metodo").scrollIntoView();return}setCand(t[0])};tabs.appendChild(b)});
function setCand(c){cand=c;vf="";tabs.querySelectorAll("button").forEach(function(b){b.setAttribute("aria-selected",b.dataset.c===c?"true":"false")});hero();renderPanel();ticks();var f=items.filter(vis);if(f.length&&!vis(items[sel]))select(f[0].k,false)}
function logoBox(c){var b=document.getElementById("logo");b.innerHTML="";if(!c){b.textContent="26N";return}b.textContent=INI[c];var i=new Image();i.alt="";i.src="img/"+IMG[c]+".jpg";i.onload=function(){b.textContent="";b.appendChild(i)};i.onerror=function(){var j=new Image();j.alt="";j.src="img/"+IMG[c]+".png";j.onload=function(){b.textContent="";b.appendChild(j)}}}
function hero(){var L=candItems(),n={V:0,M:0,F:0,N:0};L.forEach(function(x){n[x.v]++});var ok=L.length-n.N,pp=L.filter(function(x){return x.bs==="P"}).length,oo=ok-pp;
 document.getElementById("name").textContent=cand?NAMES[cand]:"Los cuatro candidatos";
 document.getElementById("party").textContent=cand?PARTY[cand]:"Debate a cuatro, 26 de noviembre de 2026";logoBox(cand);
 document.getElementById("sum").innerHTML="Comprobamos <b>"+L.length+" afirmaciones</b>"+(cand?" de "+NAMES[cand]:"")+" <b>"+ok+"</b> con veredicto ("+n.V+" verdad, "+n.M+" a medias, "+n.F+" falso): "+oo+" con fuente oficial y "+pp+" por contraste de varios medios. <b>"+n.N+"</b> quedan sin comprobar. Las opiniones y promesas no se puntúan."}
/* línea temporal */
var chart=document.getElementById("chart"),ph=document.getElementById("ph");
BLQ.forEach(function(b){var s=el("span","",esc(b[0]));s.style.left=(b[1]/TOTAL*100)+"%";s.style.width=((b[2]-b[1])/TOTAL*100)+"%";document.getElementById("blocks").appendChild(s)});
items.forEach(function(x){var b=el("button","tick");b.type="button";b.dataset.v=x.v;b.dataset.k=x.k;b.style.left=(x.t/TOTAL*100)+"%";
 b.setAttribute("aria-label",x.tc+", "+VN[x.v]+", "+who(x));b.title=x.tc+" · "+VN[x.v];b.addEventListener("click",function(e){e.stopPropagation();select(x.k,true)});chart.appendChild(b)});
function ticks(){chart.querySelectorAll(".tick").forEach(function(t){t.style.display=vis(items[+t.dataset.k])?"":"none"})}
chart.addEventListener("click",function(e){var r=chart.getBoundingClientRect(),t=(e.clientX-r.left)/r.width*TOTAL;if(ytp&&ytp.seekTo){ytp.seekTo(t,true);ytp.playVideo()}});
var tt=null;function toast(x){var t=document.getElementById("toast");t.style.borderLeftColor=VC[x.v];t.innerHTML="<b>"+x.tc+"</b> · "+esc(who(x))+" · <b>"+VN[x.v]+"</b><br>"+esc(x.q);t.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("on")},8000)}
/* panel */
function renderPanel(){var base=candItems(),n={V:0,M:0,F:0,N:0};base.forEach(function(x){n[x.v]++});
 var T=document.getElementById("vtabs");T.innerHTML="";
 [["","Todos",base.length]].concat(VO.map(function(v){return [v,VN[v],n[v]]})).forEach(function(t){var b=el("button","",t[1]+" "+t[2]);b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",vf===t[0]?"true":"false");b.onclick=function(){vf=t[0];renderPanel();ticks()};T.appendChild(b)});
 document.getElementById("vbar").innerHTML=VO.map(function(v){return n[v]?"<i style='width:"+(n[v]/base.length*100)+"%;background:"+VC[v]+"'></i>":""}).join("");
 var L=document.getElementById("list");L.innerHTML="";var f=base.filter(function(x){return !vf||x.v===vf});
 document.getElementById("count").textContent=f.length+" afirmaciones comprobables";
 f.forEach(function(x){var b=el("button","it"+(x.k===sel?" sel":""),"<span class='t'>"+x.tc+"</span><span class='d' data-v='"+x.v+"' title='"+VN[x.v]+"'></span><span><span class='q'>"+esc(x.q.length>120?x.q.slice(0,118)+"…":x.q)+"</span><small>"+VN[x.v]+" · "+esc(who(x))+" · "+esc(BLQ[x.b][0])+"</small></span>");b.type="button";b.dataset.k=x.k;b.onclick=function(){select(x.k,true)};L.appendChild(b)});
 if(!f.length)L.innerHTML="<p style='color:var(--ink2)'>No hay afirmaciones con ese veredicto.</p>"}
/* ficha */
function srcHtml(x){if(!x.o.length)return "<p class='none'>No se ha localizado una fuente oficial para esta cifra.</p>";
 return "<ul class='src'>"+x.o.map(function(id){var s=OFFSRC[id];return "<li><a target='_blank' rel='noopener' href='"+s[1]+"'><b>"+esc(s[0])+"</b><small>"+esc(s[2])+" · "+esc(s[3])+(s[4]&&s[4]!=="—"?" · "+esc(s[4]):"")+"</small></a></li>"}).join("")+"</ul>"}
function prHtml(x){if(!x.pr.length)return "";return "<h3>"+(x.bs==="P"?"Compruébalo tú: contraste de varios medios":"Contraste de prensa (no puntúa)")+"</h3><ul class='src'>"+x.pr.map(function(id){var s=PRSRC[id];return "<li><a target='_blank' rel='noopener' href='"+s[1]+"'><b>"+esc(s[0])+"</b><small>"+esc(s[2])+"</small></a></li>"}).join("")+"</ul>"}
function select(k,seek){sel=k;var x=items[k],d=document.getElementById("detail");d.style.borderTopColor=VC[x.v];toast(x);
 d.innerHTML="<div class='dh'><span class='pill "+x.v+"'>"+VN[x.v]+"</span><b style='color:var(--ink)'>"+esc(who(x))+"</b><span>"+esc(BLQ[x.b][0])+"</span><span class='tc'>"+x.tc+"</span></div>"
 +"<h3>Lo que dijo</h3><blockquote>"+esc(x.q)+"</blockquote>"
 +"<h3>Lo que dicen los datos</h3><p>"+esc(x.d)+"</p>"
 +"<h3>Compruébalo tú</h3>"+(x.bs==="P"&&!x.o.length?"<p class='none'>Sin fuente oficial localizada. El veredicto sale del contraste de varios medios independientes (abajo).</p>":srcHtml(x))+prHtml(x)
 +(x.n?"<details class='otras'><summary>Otras fuentes consultadas (no puntúan)</summary><p>"+esc(x.n)+"</p></details>":"")
 +"<div class='row'><button class='btn' id='bs'>Verlo en el vídeo · "+x.tc+"</button><button class='btn g' id='bp'>Anterior</button><button class='btn g' id='bn'>Siguiente</button></div>";
 document.getElementById("bs").onclick=function(){goto(x.t)};document.getElementById("bp").onclick=function(){step(-1)};document.getElementById("bn").onclick=function(){step(1)};
 chart.querySelectorAll(".tick").forEach(function(t){t.classList.toggle("sel",+t.dataset.k===k)});
 document.querySelectorAll(".it").forEach(function(i){var on=+i.dataset.k===k;i.classList.toggle("sel",on);if(on&&seek)i.scrollIntoView({block:"nearest"})});
 if(seek)goto(x.t)}
function step(d){var k=sel;for(var n=0;n<items.length;n++){k=(k+d+items.length)%items.length;if(vis(items[k]))break}select(k,true)}
function goto(t){if(ytp&&ytp.seekTo){ytp.seekTo(t,true);ytp.playVideo();document.getElementById("vwrap").scrollIntoView({block:"center"})}else window.open(YTU+"&t="+t+"s","_blank")}
/* reproductor */
var tg=document.createElement("script");tg.src="https://www.youtube.com/iframe_api";document.head.appendChild(tg);
window.onYouTubeIframeAPIReady=function(){ytp=new YT.Player("yt",{videoId:"3SCUOap0LYQ",width:"100%",height:"100%",playerVars:{rel:0,modestbranding:1,playsinline:1}});
 setInterval(function(){if(!ytp||!ytp.getCurrentTime)return;var t=ytp.getCurrentTime();ph.style.left=(t/TOTAL*100)+"%";
  if(ytp.getPlayerState&&ytp.getPlayerState()===1){var k=-1;for(var i=0;i<items.length;i++){if(items[i].t<=t+1&&vis(items[i]))k=i}if(k>=0&&k!==sel&&t-items[k].t<25)select(k,false)}},500)};
/* capítulos */
var C=document.getElementById("chap");BLQ.forEach(function(b){var m=function(s){return Math.floor(s/3600)+":"+("0"+Math.floor(s%3600/60)).slice(-2)+":"+("0"+s%60).slice(-2)};
 var a=el("a","","<b>"+esc(b[0])+"</b><span>"+m(b[1])+"</span>");a.href=YTU+"&t="+b[1]+"s";a.onclick=function(e){if(ytp){e.preventDefault();goto(b[1])}};C.appendChild(el("li","")).appendChild(a)});
/* datos de referencia */
var KP=[["853.509","pacientes en lista de espera quirúrgica a 31-12-2025","SISLE"],["100,3 %","deuda de las administraciones públicas sobre el PIB, septiembre 2026","BDE_DEUDA"],["10,18 %","tasa de paro, EPA 3T 2026, con 22.852.600 ocupados","INE_EPA26"],["22.624.165","afiliados medios a la Seguridad Social, octubre 2026","SS_AFIL"],["3.699.878","afiliados extranjeros, octubre 2026 (+19,3 %)","SS_EXT"],["1.376,1 €","pensión media del sistema, octubre 2026 (+4,6 %)","SS_PENS"],["15.267 M€","Fondo de Reserva de la Seguridad Social a 31-3-2026","FRSS"],["1.221 €","salario mínimo 2026 al mes en 14 pagas","BOE_SMI"],["+12,2 %","precio de la vivienda, 2.º trimestre 2026 (interanual)","INE_IPV"],["38,1 %","presión fiscal de España en 2025 sobre el PIB (UE: 40,7 %)","EUR_FISC"],["100.980","viviendas terminadas en 2024, mayor cifra en 12 años","OVS"],["25.540","lanzamientos practicados en 2025 (−11 %)","CGPJ"]];
var K=document.getElementById("kpis");KP.forEach(function(r){var s=OFFSRC[r[2]];K.appendChild(el("div","kpi","<b>"+r[0]+"</b><span>"+esc(r[1])+"</span><a target='_blank' rel='noopener' href='"+s[1]+"'>"+esc(s[2])+"</a>"))});
hero();renderPanel();select(0,false);
