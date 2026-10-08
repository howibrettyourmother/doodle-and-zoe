// ================= UI: map, sticker book, closet, HUD, controls, render + loop =================
let UI=[],HUDB=[];const ICONM=/[?&]icon=1/.test(Q);
function btn(id,x,y,w,h,fn){const b={id,x,y,w,h,fn};UI.push(b);return b}
function uiTap(p){for(const b of UI)if(inR(p,b)){AUD.SFX.click();b.fn();return}}
function uiKey(){if(overlay){overlay=null;AUD.setTheme(pl.th);return}if(state==='title'){let i=PLACES.findIndex(q=>!pdata(q.k).sticker);enterPlace(i<0?0:i)}else goMap()}
function pill(x,y,w,h,label,c,size,o){o=o||{};X.fillStyle='rgba(120,60,140,0.18)';rrect(x,y+4,w,h,h/2);X.fill();X.fillStyle=c;rrect(x,y,w,h,h/2);X.fill();X.fillStyle='rgba(255,255,255,0.35)';rrect(x+6,y+3,w-12,h*0.36,h*0.18);X.fill();txt(label,x+w/2,y+h/2+1,size||20,o.fc||'#fff')}
function wrap(s,maxW,size){X.font='800 '+size+'px '+FONT;const out=[];let line='';for(const w of s.split(' ')){const t=line?line+' '+w:w;if(X.measureText(t).width>maxW&&line){out.push(line);line=w}else line=t}out.push(line);return out}
function softBg(top,bot){const g=X.createLinearGradient(0,0,0,H);g.addColorStop(0,top);g.addColorStop(1,bot);X.fillStyle=g;X.fillRect(0,0,W,H);
  for(let i=0;i<26;i++){const x=(i*137.5)%W,y=(i*91.3+T*8*(1+i%3))%H,a=0.35+0.35*Math.sin(T*2+i);X.globalAlpha=a;if(i%3)star5(x,y,4+(i%4),'#fff');else heartP(x,y,6,'#ffc1e3')}X.globalAlpha=1}
function muteBtn(list){const b={id:'mute',x:W-INR-58,y:TOP+10,w:48,h:48,fn:()=>{AUD.setMuted(!AUD.muted)}};list.push(b);X.fillStyle='rgba(255,255,255,0.75)';rrect(b.x,b.y,48,48,16);X.fill();txt(AUD.muted?'🔇':'🔊',b.x+24,b.y+25,22,'#7b3fa0')}
function catAcc(){return SAVE.wear}
// ---------- place icons for the map + stickers ----------
function placeIcon(k,x,y,s){X.save();X.translate(x,y);X.scale(s,s);
  if(k==='dad'){X.fillStyle='#9fd8ff';X.fillRect(-18,-6,36,26);poly([-24,-4,0,-24,24,-4],'#7aa7e8');X.fillStyle='#fff59d';X.fillRect(-6,6,12,14);X.fillStyle='#fff';X.fillRect(-15,0,8,8);X.fillRect(7,0,8,8)}
  else if(k==='mom'){X.fillStyle='#c39bef';X.fillRect(-14,-24,28,44);X.fillStyle='#fff';for(let r=0;r<4;r++)for(let c=0;c<2;c++)X.fillRect(-9+c*11,-19+r*10,7,6);heartP(0,-28,6,'#ff5c9e')}
  else if(k==='klub'){X.fillStyle='#ffd27f';X.fillRect(-20,-6,40,26);poly([-24,-4,0,-20,24,-4],'#ff8a80');txt('ABC',0,6,10,'#7b3fa0');X.fillStyle='#fff';X.fillRect(-2,-30,2,12);poly([0,-30,10,-27,0,-24],'#ff5c9e')}
  else if(k==='park'){X.fillStyle='#8d6e63';X.fillRect(-3,-2,6,22);circ(0,-12,15,'#81c784');circ(-9,-6,10,'#a5d6a7');circ(9,-6,10,'#66bb6a');circ(-5,-15,2.5,'#ff8fc8');circ(6,-9,2.5,'#fff59d')}
  else if(k==='gma'){X.fillStyle='#f8bbd0';X.fillRect(-16,-22,32,42);X.fillStyle='#fff';for(let r=0;r<3;r++){X.fillRect(-11,-16+r*11,8,7);X.fillRect(3,-16+r*11,8,7)}circ(0,-30,6,'#f48fb1');X.fillStyle='#fff';txt('♥',0,-30,8,'#fff')}
  X.restore()}
function sticker(k,x,y,r,got){X.save();if(got){X.fillStyle='rgba(120,60,140,0.2)';X.beginPath();X.arc(x+2,y+4,r,0,TAU);X.fill();circ(x,y,r,'#fff');circ(x,y,r-5,['#ffe0f0','#efe0ff','#fff3c4','#dff7e6','#ffe4ec'][PLACES.findIndex(p=>p.k===k)]);placeIcon(k,x,y-4,r/30);star5(x+r*0.62,y-r*0.62,r*0.25,'#ffd54f')}
  else{X.setLineDash([6,6]);X.beginPath();X.arc(x,y,r,0,TAU);strokeC('rgba(150,90,170,0.5)',3);X.setLineDash([]);txt('?',x,y+2,r*0.8,'rgba(150,90,170,0.5)')}X.restore()}
// ---------- map / title ----------
function mapNodes(){const land=W>H*1.15,n=[];for(let i=0;i<5;i++)n.push(land?{x:W*(0.12+0.19*i),y:H*(0.5+(i%2?0.13:-0.02))}:{x:W*(i%2?0.7:0.3),y:H*(0.27+0.125*i)});return n}
function drawTitle(){UI=[];softBg('#ffd6ec','#e4d4ff');const land=W>H*1.15,ty=TOP+(land?50:62),bob=Math.sin(T*2)*3;
  txt("Doodle & Zoe's",W/2,ty+bob,land?40:34,'#c2185b',{});txt('Sparkle Adventure',W/2,ty+(land?42:38)+bob,land?32:28,'#7b3fa0');
  const N=mapNodes();X.setLineDash([2,14]);X.beginPath();N.forEach((p,i)=>i?X.lineTo(p.x,p.y):X.moveTo(p.x,p.y));strokeC('rgba(255,255,255,0.95)',8);X.setLineDash([]);
  N.forEach((p,i)=>{const P=PLACES[i],d=pdata(P.k),r=land?52:46,s=1+Math.sin(T*2.5+i)*0.03;X.fillStyle='rgba(120,60,140,0.18)';X.beginPath();X.arc(p.x+2,p.y+6,r,0,TAU);X.fill();circ(p.x,p.y,r*s,'#fff');circ(p.x,p.y,(r-6)*s,['#ffe0f0','#efe0ff','#fff3c4','#dff7e6','#ffe4ec'][i]);placeIcon(P.k,p.x,p.y-2,r/30);
    if(d.sticker){circ(p.x+r*0.7,p.y-r*0.7,13,'#81c784');txt('✓',p.x+r*0.7,p.y-r*0.7+1,16,'#fff')}
    txt(P.n,p.x,p.y+r+16,land?17:16,'#6a1b9a');txt('★ '+d.stars.length+'/5'+(d.task?'  ♥':''),p.x,p.y+r+35,14,'#c2185b');
    btn('place'+i,p.x-r,p.y-r,r*2,r*2+44,()=>enterPlace(i))});
  // Doodle & Zoe on the map
  X.save();X.translate(land?W*0.88:W*0.5,land?H-BOT-120:N[4].y+120);X.scale(0.8,0.8);X.translate(0,0);drawZoe(-56,{t:T,face:1,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow,happy:Math.sin(T)>0.6?1:0});drawCat(20,0,{t:T,st:'idle',acc:catAcc()});X.restore();
  const bw=land?170:150,by=H-Math.max(BOT,8)-72,gx=land?W*0.08:W/2-bw-8;pill(gx,by,bw,56,'📖 Stickers','#ba68c8',20);btn('book',gx,by,bw,56,()=>{state='book';stT=0;say('book',2)});
  pill(gx+bw+16,by,bw,56,'👗 Closet','#f06292',20);btn('closet',gx+bw+16,by,bw,56,()=>{state='closet';stT=0;say('closet',2)});
  muteBtn(UI);if(stT>0.4&&stT<0.45&&AUD.unlocked)say('map',1)}
// ---------- sticker book ----------
function drawBook(){UI=[];softBg('#f3e5ff','#ffe0f0');txt('My Sticker Book',W/2,TOP+(land?52:88),land?34:30,'#7b3fa0');const land=W>H*1.15,cols=land?5:3,r=land?Math.min(70,W/14):Math.min(50,W/9),cw=land?W/5.6:W/3.2;
  const tot=PLACES.reduce((a,p)=>a+pdata(p.k).stars.length,0);txt('★ '+tot+'/25 stars   🐟 '+SAVE.fish+' fish treats',W/2,TOP+(land?92:122),18,'#c2185b');
  PLACES.forEach((P,i)=>{const c=i%cols,rw=(i/cols)|0,n=Math.min(cols,5-rw*cols),x=W/2+(c-(n-1)/2)*cw,y=TOP+(land?H*0.42:215)+rw*(r*2+76),d=pdata(P.k);sticker(P.k,x,y,r,d.sticker);txt(P.n,x,y+r+18,16,'#6a1b9a');txt('★'+d.stars.length+'/5 '+(d.task?'✓ helped':'○ help'),x,y+r+38,13,'#ab47bc')});
  backBtn()}
function backBtn(){const bx=INL+10,by=TOP+10;pill(bx,by,112,48,'🗺️ Map','#ba68c8',18);btn('back',bx,by,112,48,goMap);muteBtn(UI)}
// ---------- closet ----------
function drawCloset(){UI=[];softBg('#ffe0f0','#efe0ff');const land=W>H*1.15;txt('Dress-Up Closet',W/2,TOP+(land?46:84),land?32:28,'#c2185b');
  const px=land?W*0.27:W/2,py=land?H*0.62:TOP+212,sc=land?Math.min(2,H/330):1;X.save();X.translate(px,py);circ(0,-50*sc,90*sc,'rgba(255,255,255,0.6)');X.scale(sc,sc);drawZoe(-50,{t:T,face:1,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow,happy:1});drawCat(30,0,{t:T,st:'idle',acc:catAcc(),s:1.1});X.restore();
  let x0=land?W*0.5:INL+16,y=land?TOP+92:py+34;const cw=land?W*0.46:W-32,s=Math.min(54,cw/7.6);
  txt('Doodle',x0+cw/2,y,20,'#7b3fa0');y+=18;
  ITEMS.forEach((it,i)=>{const x=x0+(cw-(s+6)*7)/2+i*(s+6),on=SAVE.wear[it.k],un=SAVE.un[it.k];X.fillStyle=on?'#ff8fc8':'rgba(255,255,255,0.85)';rrect(x,y,s,s,14);X.fill();
    if(un){X.save();X.translate(x+s/2,y+s*0.62);const k=s/54;X.scale(k,k);if(it.k==='bow')bow(0,-8,1.3,'#ff5c9e');else if(it.k==='crown')crown(0,-4,1.3);else if(it.k==='tutu'){for(let j=0;j<5;j++)ell(-14+j*7,-6,8,7,j%2?'#ffc1e3':'#e1bee7')}else if(it.k==='cape'){poly([-12,-22,12,-22,18,8,-18,8],'#b388ff');star5(0,-6,5,'#fff59d')}else if(it.k==='glasses'){heartP(-9,-8,9,'#ff5c9e');heartP(9,-8,9,'#ff5c9e')}else if(it.k==='flower'){for(let j=0;j<5;j++){const a=j*TAU/5;circ(Math.cos(a)*7,-8+Math.sin(a)*7,5,'#c5a3ff')}circ(0,-8,4,'#fff59d')}else{X.beginPath();X.arc(0,-14,14,0.5,2.6);strokeC('#ff5c9e',5);circ(0,0,5,'#ffd54f')}X.restore()}
    else txt('🔒',x+s/2,y+s/2,s*0.4,'#999');
    btn('it_'+it.k,x,y,s,s,()=>{if(!un){float('Finish a place to unlock!',cat?cat.x:0,0);AUD.SFX.boing&&AUD.SFX.boing();return}SAVE.wear[it.k]=on?0:1;save();AUD.SFX.sticker();AUD.SFX.meow(1)})});
  y+=s+(land?30:24);txt('Zoe',x0+cw/2,y,20,'#7b3fa0');y+=16;
  const rows=[['Shirt',TOPS,'top',TOPFISH],['Tutu',TUTUS,'tutu'],['Hair Bow',HBOWS,'bow']];const ss=land?Math.min(46,s*0.9):Math.min(40,(cw-90)/5-8);
  for(const [lab,arr,key,need] of rows){txt(lab,x0+38,y+ss/2,15,'#ab47bc');arr.forEach((c,i)=>{const x=x0+80+i*(ss+8),lk=need&&SAVE.fish<need[i],on=SAVE.zoe[key]===c;X.fillStyle=on?'#7b3fa0':'#fff';rrect(x-3,y-3,ss+6,ss+6,14);X.fill();X.fillStyle=c||'#fff';rrect(x,y,ss,ss,11);X.fill();if(!c)txt('✕',x+ss/2,y+ss/2,18,'#bbb');if(lk){X.fillStyle='rgba(255,255,255,0.7)';rrect(x,y,ss,ss,11);X.fill();txt('🐟'+need[i],x+ss/2,y+ss/2,12,'#7b3fa0')}
    btn(key+i,x-3,y-3,ss+6,ss+6,()=>{if(lk){AUD.SFX.boing&&AUD.SFX.boing();return}SAVE.zoe[key]=c;save();AUD.SFX.sticker()})});y+=ss+14}
  backBtn()}
// ---------- world render ----------
function drawEx(e){switch(e.t){
  case 'nap':{const cx=e.x+e.w/2;ell(cx,e.y-4,Math.min(40,e.w/2),8,'#e1bee7');ell(cx,e.y-7,Math.min(30,e.w/2-6),5,'#f3e5ff');X.globalAlpha=0.5+0.3*Math.sin(T*2+e.ph);txt('z',cx+30,e.y-24-Math.sin(T*2)*4,14,'#9575cd');X.globalAlpha=1;break}
  case 'blanket':{X.fillStyle='#ffc1e3';rrect(e.x,e.y-7,e.w,9,4);X.fill();for(let i=0;i<e.w/18;i++)heartP(e.x+9+i*18,e.y-3,4,'#fff');break}
  case 'cup':{X.save();X.translate(e.x,e.y);if(e.st===1)X.rotate(T*14);else if(e.st===2)X.rotate(Math.PI/2);X.fillStyle='#ff8fc8';X.beginPath();X.moveTo(-7,-16);X.lineTo(7,-16);X.lineTo(5,0);X.lineTo(-5,0);X.fill();X.beginPath();X.arc(8,-9,4,-1.4,1.4);strokeC('#ff8fc8',2.5);ell(0,-16,7,2,'#fff');X.restore();break}
  case 'yarn':{X.save();X.translate(e.x,0);X.rotate(e.x/12);circ(0,-12,12,e.c||'#ce93d8');X.strokeStyle='rgba(255,255,255,0.7)';X.lineWidth=1.5;for(let i=-1;i<=1;i++){X.beginPath();X.ellipse(0,-12,11,5,i*0.9,0,TAU);X.stroke()}X.restore();break}
  case 'fly':{if(e.fx==null)break;const fl=Math.abs(Math.sin(T*14+e.ph));X.save();X.translate(e.fx,e.fy);ell(-6*fl,-3,8*fl+1,7,'#ce93d8');ell(6*fl,-3,8*fl+1,7,'#f48fb1');ell(-5*fl,5,5*fl+1,4,'#b39ddb');ell(5*fl,5,5*fl+1,4,'#f8bbd0');ell(0,0,1.6,7,'#6a1b9a');X.restore();break}
  case 'leaves':{const g=e.st>0?Math.max(0.2,1-e.st):1;X.save();X.translate(e.x,0);X.scale(1,g);const C=['#ffb74d','#ff8a65','#ffd54f','#f48fb1','#ffcc80'];for(let i=0;i<14;i++)ell(-40+((i*23)%80),-6-((i*7)%22),12,6,C[i%5],(i*0.7)%3);X.restore();
    if(task&&task.st==='hidden'&&Math.abs(task.x-e.x)<40&&Math.sin(T*3)>0.6)star5(e.x+Math.sin(T)*20,-36,5,'#fff');break}
  case 'ducks':for(let i=0;i<2;i++){const x=e.x+i*70+Math.sin(T*0.8+i)*30;X.save();X.translate(x,-10+Math.sin(T*2+i)*1.5);ell(0,-6,13,8,'#fff');circ(9,-16,6,'#fff');poly([14,-16,20,-15,14,-13],'#ffb74d');circ(10,-17,1.3,'#333');X.restore()}break;
  case 'cookie':{ell(e.x,e.y-3,22,6,'#fff');for(let i=0;i<3;i++){circ(e.x-10+i*10,e.y-8,7,'#d7a86e');circ(e.x-12+i*10,e.y-9,1.4,'#6d4c41');circ(e.x-8+i*10,e.y-6,1.4,'#6d4c41')}break}}}
function drawBubble(b){const a=Math.min(1,b.t*6,(2.8-b.t)*3);if(a<=0)return;X.globalAlpha=a;const ls=wrap(b.s,180,15),w=Math.max(...ls.map(l=>X.measureText(l).width))+24,h=ls.length*19+14,x=clamp(b.x,camX+w/2+6,camX+W-w/2-6),y=b.y-h;
  X.fillStyle='#fff';rrect(x-w/2,y,w,h,12);X.fill();poly([b.x-8,y+h-1,b.x+8,y+h-1,b.x,y+h+10],'#fff');ls.forEach((l,i)=>txt(l,x,y+16+i*19,15,'#7b3fa0'));X.globalAlpha=1}
function drawWorld(){drawScene(pl);const gy=GY();X.save();X.translate(-camX,gy);
  for(const e of ex)drawEx(e);
  for(const f of fish)if(!f.got&&Math.abs(f.x-camX-W/2)<W)drawItem('fish',f.x,f.y+Math.sin(T*3+f.x)*3,T);
  for(const s of stars)if(!s.got&&Math.abs(s.x-camX-W/2)<W)drawItem('star',s.x,s.y+Math.sin(T*2.4+s.x)*4,T);
  drawNPC(giver.k,giver.x,{t:T,wave:giver.wave>0});if(task.st!=='done'){const bx=giver.x,by=-(giver.k==='duck'?62:178)+Math.sin(T*4)*3;circ(bx,by,13,'#fff');txt(task.st==='carried'?'♥':'!',bx,by+1,17,'#ff5c9e')}
  if(task.st==='done'&&task.k==='duckling')drawItem('duckling',giver.x-34+Math.sin(T*1.5)*6,0,T);
  const zh=zoe.happy>0;drawZoe(zoe.x,{t:zoe.t,face:zoe.face,walk:zoe.walk,pet:zoe.pet,happy:zh?1:0,top:SAVE.zoe.top,tutu:SAVE.zoe.tutu,bow:SAVE.zoe.bow});
  if(task.st==='free')drawItem(task.k,task.x,task.y+(task.k==='duckling'?0:Math.sin(T*3)*3),T);
  drawCat(cat.x,cat.y,{t:cat.t,face:cat.face,st:cat.st,acc:catAcc()});
  if(task.st==='carried')drawItem(task.k,task.x,task.y,T);
  for(const p of parts){const a=1-p.t/p.life;X.globalAlpha=Math.max(0,a);if(p.heart)heartP(p.x,p.y,p.r,p.c);else if(p.star)star5(p.x,p.y,p.r*(0.6+a*0.4),p.c,p.t*4);else if(p.conf){X.save();X.translate(p.x,p.y);X.rotate(p.rot);X.fillStyle=p.c;X.fillRect(-p.r,-p.r*0.4,p.r*2,p.r*0.8);X.restore()}else circ(p.x,p.y,p.r,p.c)}X.globalAlpha=1;
  for(const f of floats){X.globalAlpha=Math.max(0,1-f.t/1.4);txt(f.s,f.x,f.y,f.z?18:18,f.c);X.globalAlpha=1}
  for(const b of bubbles){const bx=b.who==='zoe'?zoe.x:b.who==='npc'?giver.x:b.x;drawBubble(Object.assign({},b,{x:bx}))}
  X.restore();
  // helper arrow toward the grown-up when carrying their item
  if(task.st==='carried'){const sx=giver.x-camX;if(sx<0||sx>W){const l=sx<0,ax=l?INL+30:W-INR-30,ay=gy-90+Math.sin(T*5)*4;circ(ax,ay,22,'rgba(255,255,255,0.9)');poly(l?[ax-12,ay,ax+6,ay-10,ax+6,ay+10]:[ax+12,ay,ax-6,ay-10,ax-6,ay+10],'#ff5c9e')}}}
function nearHint(){return nearEx('cup',70)||nearEx('leaves',60)||nearEx('yarn',60)||nearEx('blanket',40)||nearEx('nap',40)||nearEx('cookie',70)||(Math.abs(zoe.x-cat.x)<80&&cat.y>-80)}
function drawHUD(){HUDB=[];const y=TOP+10,x=INL+10;
  const hb={id:'home',x,y,w:52,h:48,fn:goMap};HUDB.push(hb);X.fillStyle='rgba(255,255,255,0.8)';rrect(x,y,52,48,16);X.fill();txt('🗺️',x+26,y+25,24,'#7b3fa0');
  const d=pdata(pl.k),SP=W<500?22:26,FW=W<500?74:96;X.fillStyle='rgba(255,255,255,0.8)';rrect(x+62,y,5*SP+16,48,16);X.fill();for(let i=0;i<5;i++)star5(x+62+8+SP/2+i*SP,y+24,SP<26?10:11,i<d.stars.length?'#ffd54f':'rgba(170,130,190,0.35)');
  const fx=x+62+5*SP+26;X.fillStyle='rgba(255,255,255,0.8)';rrect(fx,y,FW,48,16);X.fill();drawItem('fish',fx+24,y+24,0);txt(''+SAVE.fish,fx+FW-28,y+25,20,'#c2185b');
  const tx=fx+FW+(W<500?6:10);X.fillStyle='rgba(255,255,255,0.8)';rrect(tx,y,60,48,16);X.fill();X.save();X.translate(tx+30,y+24+(task.k==='bunny'||task.k==='duckling'||task.k==='yarn'?12:0));const k=task.k==='remote'?0.8:0.9;X.scale(k,k);drawItem(task.k,0,0,0);X.restore();if(task.st==='done'){circ(tx+50,y+10,10,'#81c784');txt('✓',tx+50,y+11,13,'#fff')}
  muteBtn(HUDB);
  // controls
  X.globalAlpha=0.9;if(joy.id!=null){circ(joy.ox,joy.oy,JR+8,'rgba(255,255,255,0.35)');circ(joy.ox+joy.dx*JR,joy.oy+joy.dy*JR,28,'rgba(255,143,200,0.85)')}
  const A=arrowBtns(),ad=arrowDir();for(const [b,dr] of [[A.L,-1],[A.R,1]]){const on=ad===dr,yy=b.y+(on?3:0);circ(b.x,b.y+5,b.r,'rgba(120,60,140,0.28)');circ(b.x,yy,b.r,on?'#ff5c9e':'rgba(255,255,255,0.92)');X.beginPath();X.arc(b.x,yy,b.r-3,0,TAU);strokeC(on?'#fff':'#ff8fc8',5);
    const k=b.r*0.42;poly([b.x+dr*k*1.1,yy,b.x-dr*k*0.6,yy-k,b.x-dr*k*0.6,yy+k],on?'#fff':'#ff5c9e')}
  const j=jumpBtn(),pr=jumpHeld>0;circ(j.x,j.y+4,j.r,'rgba(120,60,140,0.25)');circ(j.x,j.y+(pr?3:0),j.r,pr?'#ff5c9e':'#ff8fc8');poly([j.x,j.y-j.r*0.45,j.x-j.r*0.32,j.y-j.r*0.05,j.x+j.r*0.32,j.y-j.r*0.05],'#fff');txt('JUMP',j.x,j.y+j.r*0.32,Math.max(14,j.r*0.3),'#fff');
  const pb=pawBtn(),hint=nearHint(),pg=hint?1+Math.sin(T*6)*0.06:1;if(hint)circ(pb.x,pb.y,pb.r*pg+8,'rgba(255,245,157,0.6)');circ(pb.x,pb.y,pb.r*pg,'#b388ff');circ(pb.x,pb.y+5,11,'#fff');for(let i=0;i<4;i++)circ(pb.x-13+i*8.6,pb.y-9-(i===1||i===2?4:0),4.6,'#fff');X.globalAlpha=1;
  if(banner){const a=Math.min(1,banner.t*4,(2.6-banner.t)*3);X.globalAlpha=Math.max(0,a);const w=Math.min(W-40,360);X.fillStyle='#fff';rrect(W/2-w/2,TOP+70,w,54,27);X.fill();txt('✨ '+banner.s+' ✨',W/2,TOP+98,24,'#c2185b');X.globalAlpha=1}}
function drawDone(){UI=[];X.fillStyle='rgba(90,40,110,0.45)';X.fillRect(0,0,W,H);const s=back(overlay.t*2.2),w=Math.min(W-40,420),h=380,x=W/2-w/2,y=H/2-h/2;X.save();X.translate(W/2,H/2);X.scale(s,s);X.translate(-W/2,-H/2);
  X.fillStyle='#fff';rrect(x,y,w,h,28);X.fill();txt('You earned a sticker!',W/2,y+40,26,'#c2185b');sticker(pl.k,W/2-70,y+120,52,1);
  X.save();X.translate(W/2+70,y+160);drawCat(0,0,{t:T,st:'idle',acc:{[overlay.item]:1}});X.restore();const it=ITEMS.find(i=>i.k===overlay.item);txt('New for Doodle: '+it.n+'!',W/2,y+210,18,'#7b3fa0');
  pill(x+24,y+250,w-48,52,'Keep exploring','#ba68c8',20);pill(x+24,y+312,w-48,52,'🗺️ Map','#f06292',20);X.restore();
  btn('keep',x+24,y+250,w-48,52,()=>{overlay=null;AUD.setTheme(pl.th)});btn('map',x+24,y+312,w-48,52,goMap)}
function render(){X.setTransform(RS,0,0,RS,0,0);
  if(ICONM){const g=X.createRadialGradient(W/2,H*0.45,20,W/2,H/2,W*0.75);g.addColorStop(0,'#ffe3f3');g.addColorStop(1,'#d9b8ff');X.fillStyle=g;X.fillRect(0,0,W,H);
    [[0.14,0.16,30],[0.86,0.2,24],[0.12,0.8,20],[0.88,0.84,30],[0.5,0.08,16],[0.78,0.55,14],[0.22,0.5,12]].forEach(([a,b,r])=>star5(W*a,H*b,r,'#fff'));heartP(W*0.84,H*0.38,16,'#ff8fc8');heartP(W*0.17,H*0.33,12,'#ff8fc8');
    X.save();X.translate(W/2,H/2);X.scale(6.4,6.4);drawCat(-24,50,{t:0.3,st:'idle',acc:{bow:1}});X.restore();return}
  if(state==='play'){drawWorld();drawHUD();if(overlay&&overlay.k==='done')drawDone();else UI=[];
    for(const p of parts)if(p.conf&&overlay){}}
  else if(state==='book')drawBook();else if(state==='closet')drawCloset();else drawTitle();
  if(state!=='play')HUDB=[]}
// ---------- loop + adaptive quality ----------
let last=performance.now(),acc=0;const rafA=[],workA=[];let qWin=[];const FIXQ=/[?&]q=fixed/.test(Q);
function perfStats(){const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0,s=[...rafA].sort((a,b)=>a-b);return{fps:1000/(avg(rafA)||16.7),work:avg(workA),p95:s[(s.length*0.95)|0]||0,qual:QUAL,W,H,RS}}
function frame(now){const dt=Math.min(0.05,Math.max(0,(now-last)/1000));rafA.push(now-last);if(rafA.length>600)rafA.shift();last=now;acc+=dt*TS;const STEP=1/120;let n=0;const t0=performance.now();
  try{while(acc>=STEP&&n<120){update(STEP);acc-=STEP;n++}if(n>=120)acc=0;render()}catch(e){console.error(e&&e.stack||e)}
  const wt=performance.now()-t0;if(TS===1){workA.push(wt);if(workA.length>600)workA.shift()}
  if(!FIXQ&&TS===1&&state==='play'){qWin.push([wt,dt*1000]);if(qWin.length>=150){const a=qWin.reduce((x,y)=>x+y[0],0)/qWin.length,f=qWin.reduce((x,y)=>x+y[1],0)/qWin.length;qWin=[];
    if((a>10||f>21)&&qualI<QUALS.length-1){qualI++;QUAL=QUALS[qualI];resize()}}}
  requestAnimationFrame(frame)}
if(OGMODE){enterPlace(0);cat.x=420;zoe.x=330;camX=120;banner=null;AUD.setTheme('none')}else AUD.setTheme('title');
requestAnimationFrame(frame);
if(DEBUG)window.__D={get state(){return state},get overlay(){return overlay},get cat(){return cat},get zoe(){return zoe},get stars(){return stars},get task(){return task},get giver(){return giver},get place(){return pl.k},get save(){return SAVE},get camX(){return camX},
  enterPlace,goMap,tp(x,y){cat.x=x;cat.y=y||0;cat.vy=0;cat.ground=null},perf:perfStats,get qual(){return QUAL},audio:AUD,set TS(v){TS=v},
  get ui(){return UI.map(b=>({id:b.id,x:b.x+b.w/2,y:b.y+b.h/2}))},get hud(){return HUDB.map(b=>({id:b.id,x:b.x+b.w/2,y:b.y+b.h/2}))},toClient:(x,y)=>({x:x*SC,y:y*SC}),get jumpBtn(){return jumpBtn()},get arrows(){return arrowBtns()},get pawBtn(){return pawBtn()},get W(){return W},get H(){return H},GY};
