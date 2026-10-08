// ================= core: canvas, layout, safe area, input, utils, persistence =================
const cv=document.getElementById('c');let X=cv.getContext('2d',{alpha:false});const X0=X;
const Q=location.search,DEBUG=/[?&]debug=1/.test(Q),OGMODE=/[?&]og=1/.test(Q);
const SAFE_DBG=DEBUG&&Q.match(/[?&]safe=(\d+),(\d+)/);
const FONT='"Baloo2Z","Baloo 2","Arial Rounded MT Bold","Trebuchet MS",system-ui,sans-serif';
let SW=0,SH=0,DPR=1,SC=1,RS=1,W=400,H=760,TOP=0,BOT=0,INL=0,INR=0,QUAL=1,genCache=0;
const QUALS=[1,0.8,0.66];let qualI=0;
// in standalone (Home Screen) mode the canvas runs under the status bar / notch / home indicator: measure env(safe-area-inset-*)
const insEl=document.createElement('div');insEl.style.cssText='position:fixed;left:0;top:0;width:0;height:0;padding:env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);visibility:hidden;pointer-events:none';document.body.appendChild(insEl);
function resize(){SW=innerWidth;SH=innerHeight;
  // older iPhones: cap the backing store at 2x and let the adaptive quality step drop it further if frames get slow
  DPR=Math.min(devicePixelRatio||1,2)*QUAL;
  SC=Math.min(SW/400,SH/560);W=SW/SC;H=SH/SC;RS=SC*DPR;
  const cs=getComputedStyle(insEl);let t=parseFloat(cs.paddingTop)||0,b=parseFloat(cs.paddingBottom)||0;
  if(SAFE_DBG){t=+SAFE_DBG[1];b=+SAFE_DBG[2]}
  TOP=t/SC;BOT=b/SC;INL=(parseFloat(cs.paddingLeft)||0)/SC;INR=(parseFloat(cs.paddingRight)||0)/SC;
  cv.width=Math.round(SW*DPR);cv.height=Math.round(SH*DPR);cv.style.width=SW+'px';cv.style.height=SH+'px';genCache++}
addEventListener('resize',resize);addEventListener('orientationchange',()=>setTimeout(resize,250));resize();setTimeout(resize,300);
const R=Math.random,rr=(a,b)=>a+R()*(b-a),pick=a=>a[(R()*a.length)|0],clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,TAU=Math.PI*2;
const ease=t=>t<0?0:t>1?1:1-Math.pow(1-t,3),back=t=>{t=clamp(t,0,1);const c=1.7;return 1+(c+1)*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
let seed=1;const srand=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646},srr=(a,b)=>a+srand()*(b-a);
// ---------- playfield: ground line in screen units; world y is 0 at the floor, negative = up ----------
const GY=()=>H-Math.max(BOT,6)-64;
// ---------- persistence ----------
const LS={get:(k,d)=>{try{const v=localStorage.getItem('dz_'+k);return v==null?d:v}catch(e){return d}},set:(k,v)=>{try{localStorage.setItem('dz_'+k,v)}catch(e){}}};
// ---------- drawing helpers ----------
function txt(s,x,y,size,fill,o){o=o||{};X.font=(o.wt||'800 ')+size+'px '+FONT;X.textAlign=o.a||'center';X.textBaseline='middle';
  if(o.st){X.lineJoin='round';X.lineWidth=o.sw||size*0.22;X.strokeStyle=o.st;X.strokeText(s,x,y)}X.fillStyle=fill;X.fillText(s,x,y)}
function rrect(x,y,w,h,r){r=Math.min(r,w/2,h/2);X.beginPath();X.moveTo(x+r,y);X.arcTo(x+w,y,x+w,y+h,r);X.arcTo(x+w,y+h,x,y+h,r);X.arcTo(x,y+h,x,y,r);X.arcTo(x,y,x+w,y,r);X.closePath()}
function circ(x,y,r,c){X.beginPath();X.arc(x,y,r,0,TAU);X.fillStyle=c;X.fill()}
function ell(x,y,rx,ry,c,rot){X.beginPath();X.ellipse(x,y,rx,ry,rot||0,0,TAU);X.fillStyle=c;X.fill()}
function poly(pts,c){X.beginPath();X.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)X.lineTo(pts[i],pts[i+1]);X.closePath();X.fillStyle=c;X.fill()}
function strokeC(c,w){X.strokeStyle=c;X.lineWidth=w;X.lineCap='round';X.lineJoin='round';X.stroke()}
function star5(x,y,r,fill,rot){X.beginPath();for(let i=0;i<10;i++){const a=(rot||0)-Math.PI/2+i*Math.PI/5,rad=i%2?r*0.48:r;X.lineTo(x+Math.cos(a)*rad,y+Math.sin(a)*rad)}X.closePath();X.fillStyle=fill;X.fill()}
function heartP(x,y,s,c){X.beginPath();X.moveTo(x,y+s*0.35);X.bezierCurveTo(x-s*1.1,y-s*0.35,x-s*0.45,y-s*1.05,x,y-s*0.45);X.bezierCurveTo(x+s*0.45,y-s*1.05,x+s*1.1,y-s*0.35,x,y+s*0.35);X.fillStyle=c;X.fill()}
// ---------- sprite cache: vector art rendered once per resolution, then blitted (fast on older iPhones) ----------
const SPR={};
function spr(key,w,h,fn){let s=SPR[key];if(s&&s.g===genCache)return s;const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w*RS));c.height=Math.max(1,Math.ceil(h*RS));
  const x=c.getContext('2d');x.scale(RS,RS);x.translate(w/2,h/2);const keep=X;X=x;try{fn()}finally{X=keep}s=SPR[key]={c,w,h,g:genCache};return s}
function blit(s,x,y,sc){sc=sc||1;X.drawImage(s.c,x-s.w*sc/2,y-s.h*sc/2,s.w*sc,s.h*sc)}
// ---------- input: floating left-thumb joystick + big JUMP + PAW buttons on the right. Full multi-touch. ----------
const ptrs=new Map(),keys={};let jumpQ=0,jumpHeld=0,pawQ=0,tapQ=null;
const joy={id:null,ox:0,oy:0,dx:0,dy:0},JR=52;
const toG=e=>({x:e.clientX/SC,y:e.clientY/SC});
function jumpBtn(){const r=Math.min(58,H*0.11);return{x:W-INR-r-22,y:H-Math.max(BOT,8)-r-20,r}}
function pawBtn(){const j=jumpBtn();return W<640?{x:j.x-6,y:j.y-j.r-52,r:40}:{x:j.x-j.r-56,y:j.y+j.r*0.3,r:40}}
// big LEFT/RIGHT arrows: primary walking controls (hold to walk), low on screen and clear of the home bar
// ~92pt across on iPad landscape (r in game units = 46pt / SC); hit zone stays a bit larger than the drawn buttons
function arrowBtns(){const r=clamp(46/SC,30,44),y=H-Math.max(BOT,8)-r-24,lx=INL+r+24,rx=lx+r*2+28;return{L:{x:lx,y,r},R:{x:rx,y,r},zx:Math.min(rx+r+26,jumpBtn().x-jumpBtn().r-12),zy:y-r-30}}
function arrowAt(p){const a=arrowBtns();if(p.x<=a.zx&&p.y>=a.zy)return p.x<(a.L.x+a.R.x)/2?-1:1;return 0}
function arrowDir(){let d=0;for(const q of ptrs.values())if(q.role==='arrow')d+=q.dir;return d<0?-1:d>0?1:0}
function inR(p,b){return p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h}
const nearB=(p,b,s)=>Math.hypot(p.x-b.x,p.y-b.y)<b.r+(s||10);
function recount(){jumpHeld=0;for(const q of ptrs.values())if(q.role==='jump')jumpHeld++}
cv.addEventListener('pointerdown',e=>{e.preventDefault();const p=toG(e);
  if(state!=='play'||overlay){uiTap(p);return}
  for(const b of HUDB)if(inR(p,b)){b.fn();return}
  let role='none';
  let ad=0;
  if(nearB(p,pawBtn(),10)){pawQ=1;role='btn'}
  else if(nearB(p,jumpBtn(),24)){role='jump';jumpQ=1}
  else if((ad=arrowAt(p))){role='arrow'}
  else if(p.x<W*0.5&&joy.id==null){role='joy';joy.id=e.pointerId;joy.ox=p.x;joy.oy=p.y;joy.dx=joy.dy=0}
  else{tapQ=p;role='tap'}
  ptrs.set(e.pointerId,{role,dir:ad});recount()},{passive:false});
cv.addEventListener('pointermove',e=>{const q=ptrs.get(e.pointerId);if(q&&q.role==='arrow'){const d=arrowAt(toG(e));if(d)q.dir=d;return}if(e.pointerId!==joy.id)return;const p=toG(e);let dx=p.x-joy.ox,dy=p.y-joy.oy,d=Math.hypot(dx,dy);
  if(d>JR*1.25){const k=(d-JR*1.25)/d;joy.ox+=dx*k;joy.oy+=dy*k;dx=p.x-joy.ox;dy=p.y-joy.oy;d=Math.hypot(dx,dy)}
  const m=Math.min(1,d/JR);joy.dx=d?dx/d*m:0;joy.dy=d?dy/d*m:0},{passive:false});
const endP=e=>{if(e.pointerId===joy.id){joy.id=null;joy.dx=joy.dy=0}ptrs.delete(e.pointerId);recount()};
['pointerup','pointercancel','lostpointercapture'].forEach(n=>cv.addEventListener(n,endP));
function resetInput(){ptrs.clear();joy.id=null;joy.dx=joy.dy=0;jumpHeld=0;jumpQ=0;pawQ=0;tapQ=null}
addEventListener('keydown',e=>{if(!keys[e.code]){if(e.code==='Space'||e.code==='ArrowUp'||e.code==='KeyW')jumpQ=1;if(e.code==='KeyX'||e.code==='KeyE'||e.code==='KeyZ')pawQ=1}keys[e.code]=1;if(e.code==='Space'||e.code.startsWith('Arrow'))e.preventDefault();
  if((state!=='play'||overlay)&&(e.code==='Enter'))uiKey()});
addEventListener('keyup',e=>{keys[e.code]=0});
