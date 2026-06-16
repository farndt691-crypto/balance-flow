/* Balance Flow — Headless-Test aller Spiele.
   Lädt index.html, instanziiert jedes Spiel und spielt es 200 Frames "blind"
   gegen Canvas-/DOM-Stubs durch. Fängt Laufzeitfehler in init/update/render.
   Aufruf:  node test_games.js
   Erwartet: "ERGEBNIS ok=30 fail=0".  (Idee abgeleitet aus GeoQuest smoke_test.js) */
const fs = require('fs');
const html = fs.readFileSync(__dirname + '/index.html', 'utf8');
const blocks = html.match(/<script>([\s\S]*?)<\/script>/g).map(b => b.replace(/<\/?script>/g, ''));
const js = blocks.filter(b => b.indexOf('GAMES=[') >= 0)[0];

function StubEl(){ return new Proxy({style:{},dataset:{},children:[],checked:false,value:"0",textContent:"",innerHTML:""},{ get(t,p){ if(p==='classList') return {add(){},remove(){},toggle(){},contains(){return false}}; if(['appendChild','removeChild','addEventListener','removeEventListener','setAttribute','getAttribute','removeAttribute','focus','blur','click','requestFullscreen','webkitRequestFullscreen'].includes(p)) return ()=>{}; if(p==='querySelectorAll'||p==='querySelector') return ()=>[]; if(p in t) return t[p]; return undefined; }, set(t,p,v){ t[p]=v; return true; } }); }
const __els={}; function EL(id){ if(!__els[id]) __els[id]=StubEl(); return __els[id]; }
function CtxStub(){ return new Proxy({},{ get(t,p){ if(p==='createLinearGradient'||p==='createRadialGradient') return ()=>({addColorStop(){}}); if(p==='measureText') return ()=>({width:10}); return (typeof t[p]!=='undefined')?t[p]:(()=>{}); }, set(t,p,v){ t[p]=v; return true; } }); }
const CTX=CtxStub();
const CANVAS={ getContext:()=>CTX, getBoundingClientRect:()=>({width:1280,height:800,left:0,top:0}), addEventListener:()=>{}, width:0,height:0, style:{} };
global.document={ getElementById:(id)=> id==='game'?CANVAS:EL(id), createElement:()=>StubEl(), addEventListener:()=>{}, querySelectorAll:()=>[], documentElement:{}, fullscreenElement:null, exitFullscreen:()=>{} };
global.window={ addEventListener:()=>{}, innerWidth:1280, innerHeight:800, devicePixelRatio:1, requestAnimationFrame:()=>0 };
global.requestAnimationFrame=()=>0; global.performance={ now:()=>Date.now() };
global.navigator={ bluetooth:undefined, wakeLock:{ request:async()=>({release(){}}) } };
global.localStorage={ getItem:()=>null, setItem(){}, removeItem(){} };
global.alert=()=>{}; global.confirm=()=>true; global.Blob=function(){}; global.URL={createObjectURL:()=>"",revokeObjectURL(){}};

const driver = `
resize(); let _ok=0,_fail=0;
for(let i=0;i<GAMES.length;i++){ const g=GAMES[i]; CUR=g; level=1; session=freshSession(); session.start=Date.now(); let err=null;
  try{ g.init(); for(let f=0;f<200;f++){ state.smoothX=Math.max(-1,Math.min(1,Math.sin(f*0.31)*1.1)); state.smoothY=Math.max(-1,Math.min(1,Math.cos(f*0.19)*1.1)); state.velMag=Math.abs(Math.sin(f))*0.08; if(f%40===39)level=Math.min(12,level+1); g.update(0.016); g.render(); updateParticles(0.016);} }
  catch(e){ err=e; }
  if(err){ _fail++; console.log('FAIL '+(i+1)+'. '+g.name+' :: '+err.message); } else _ok++;
}
console.log('ERGEBNIS ok='+_ok+' fail='+_fail+' total='+GAMES.length);
if(_fail>0) process.exit(1);
`;
try { (0, eval)(js + driver); } catch (e) { console.error('LADEFEHLER:', e.message); process.exit(1); }
