// ================= v1.4: Color & Draw (big-tap fill, crayons, free drawing) and the Fridge gallery =================
// pages are made from the game's own art: drawn once into a 512px canvas, then turned into black outlines (edge detect), so every part is a fill region
const ART_N=512,CRAY=['#ff5c9e','#ff8a65','#ffd54f','#81c784','#4fc3f7','#7e57c2','#f48fb1','#a1887f','#ffffff','#90a4ae','#ffb74d','#212121'];
const PAGES=[['Doodle',x=>{x.translate(256,400);x.scale(4.2,4.2);drawCat(0,0,{t:0.3,st:'idle',acc:{bow:1}})}],['Zoe',x=>{x.translate(256,450);x.scale(3,3);drawZoe(0,{t:0,face:1,happy:1})}],
  ['Kitty',x=>{x.translate(256,410);x.scale(4.4,4.4);drawKit(KITTIES[4],'sit',0,{})}],['Doodle and Zoe',x=>{x.translate(256,420);x.scale(2.4,2.4);drawZoe(-50,{t:0,face:1,happy:1});drawCat(40,0,{t:0.3,st:'idle',acc:{}});heartP(0,-160,16,'#ff5c9e')}],
  ['Blank page',null]];
let AR=null;
function artMake(i){const pc=document.createElement('canvas');pc.width=pc.height=ART_N;const px=pc.getContext('2d');px.fillStyle='#fff';px.fillRect(0,0,ART_N,ART_N);
  const lc=document.createElement('canvas');lc.width=lc.height=ART_N;const f=PAGES[i][1];let mask=null;
  if(f){const tc=document.createElement('canvas');tc.width=tc.height=ART_N;const tx=tc.getContext('2d');tx.fillStyle='#fff';tx.fillRect(0,0,ART_N,ART_N);const keep=X;X=tx;try{f(tx)}catch(e){console.error(e)}X=keep;
    const d=tx.getImageData(0,0,ART_N,ART_N).data,N=ART_N,m=new Uint8Array(N*N),thr=60;
    for(let y=0;y<N-1;y++)for(let x=0;x<N-1;x++){const i=(y*N+x)*4,j=i+4,k=i+N*4;const a=Math.abs(d[i]-d[j])+Math.abs(d[i+1]-d[j+1])+Math.abs(d[i+2]-d[j+2]),b=Math.abs(d[i]-d[k])+Math.abs(d[i+1]-d[k+1])+Math.abs(d[i+2]-d[k+2]);if(a>thr||b>thr)m[y*N+x]=1}
    mask=new Uint8Array(N*N);for(let y=1;y<N-1;y++)for(let x=1;x<N-1;x++){const p=y*N+x;if(m[p]||m[p-1]||m[p-N]||m[p-N-1])mask[p]=1}
    const lx=lc.getContext('2d'),im=lx.createImageData(N,N);for(let p=0;p<N*N;p++)if(mask[p]){im.data[p*4]=40;im.data[p*4+1]=30;im.data[p*4+2]=50;im.data[p*4+3]=255}lx.putImageData(im,0,0)}
  return{pc,px,lc,mask,undo:[]}}
function artFill(sx,sy,col){const a=AR.a,N=ART_N;if(!a.mask)return false;sx|=0;sy|=0;if(sx<0||sy<0||sx>=N||sy>=N||a.mask[sy*N+sx])return false;
  const img=a.px.getImageData(0,0,N,N),d=img.data,p0=(sy*N+sx)*4,tr=d[p0],tg=d[p0+1],tb=d[p0+2];const c=parseInt(col.slice(1),16),cr=c>>16&255,cg=c>>8&255,cb=c&255;if(tr===cr&&tg===cg&&tb===cb)return false;
  const same=p=>{const q=p*4;return !a.mask[p]&&Math.abs(d[q]-tr)<8&&Math.abs(d[q+1]-tg)<8&&Math.abs(d[q+2]-tb)<8};const seen=new Uint8Array(N*N),st=[sy*N+sx];
  while(st.length){let p=st.pop();let x=p%N;const y=(p/N)|0;while(x>0&&!seen[p-1]&&same(p-1)){p--;x--}let up=false,dn=false;
    while(x<N&&!seen[p]&&same(p)){seen[p]=1;const q=p*4;d[q]=cr;d[q+1]=cg;d[q+2]=cb;
      if(y>0){const u=p-N;if(!seen[u]&&same(u)){if(!up){st.push(u);up=true}}else up=false}
      if(y<N-1){const v=p+N;if(!seen[v]&&same(v)){if(!dn){st.push(v);dn=true}}else dn=false}p++;x++}}
  // also paint the 1px outline neighbours inside the region so there are no white seams under the lines
  a.px.putImageData(img,0,0);return true}
function artSnap(){const a=AR.a;try{a.undo.push(a.px.getImageData(0,0,ART_N,ART_N));if(a.undo.length>3)a.undo.shift()}catch(e){}}
SCR.art={open(){AR={page:-1,col:0,tool:0,last:null,draw:null,saved:0};AUD.setTheme('home');sayT('Color and draw! Pick a picture!',2)},close(){AR=null},
  back(){if(AR&&AR.page>=0){AR.page=-1;AR.a=null;sayT('Pick a picture!',1);return true}return false},
  down(p,id){if(!AR||AR.page<0)return;const r=artRect();if(!inR(p,r))return;const u=(p.x-r.x)/r.w*ART_N,v=(p.y-r.y)/r.h*ART_N;AR.saved=0;
    if(AR.tool===0&&AR.a.mask){artSnap();if(artFill(u,v,CRAY[AR.col])){AUD.SFX.pop();if(R()<0.3)sayT(pick(['Pretty!','Beautiful!','Ooh, nice color!']),1)}else AR.a.undo.pop()}
    else{artSnap();AR.draw={id,u,v};const x=AR.a.px;x.fillStyle=CRAY[AR.col];x.beginPath();x.arc(u,v,9,0,TAU);x.fill()}},
  move(p,id){const d=AR&&AR.draw;if(!d||d.id!==id)return;const r=artRect(),u=(p.x-r.x)/r.w*ART_N,v=(p.y-r.y)/r.h*ART_N,x=AR.a.px;x.strokeStyle=CRAY[AR.col];x.lineWidth=18;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(d.u,d.v);x.lineTo(u,v);x.stroke();d.u=u;d.v=v},
  up(p,id){if(AR&&AR.draw&&AR.draw.id===id)AR.draw=null}};
function artRect(){const L=XL(),side=Math.max(76,PT(60));if(L.land){const top=TOP+L.bb+16,s=Math.min(H-top-Math.max(BOT,8)-12,W-INL-INR-2*side*2-60);return{x:W/2-s/2,y:top,w:s,h:s,side}}
  const top=TOP+L.bb+Math.max(64,PT(46))+36,s=Math.min(W-INL-INR-24,H-top-Math.max(BOT,8)-side*1.5-30);return{x:W/2-s/2,y:top,w:s,h:s,side}}
function fridgeLoad(){try{return JSON.parse(LS.get('fridge','[]'))||[]}catch(e){return[]}}
function fridgeSave(){const a=AR.a,c=document.createElement('canvas');c.width=c.height=300;const x=c.getContext('2d');x.drawImage(a.pc,0,0,300,300);x.drawImage(a.lc,0,0,300,300);
  let url;try{url=c.toDataURL('image/jpeg',0.72)}catch(e){return}let f=fridgeLoad();f.push(url);while(f.length>12)f.shift();
  for(let tries=0;tries<8&&f.length;tries++){try{localStorage.setItem('dz_fridge',JSON.stringify(f));break}catch(e){f.shift()}}FRIMG={}}
function backBtn2(label){bigBack(label);UI[UI.length-1].fn=goBack}
XS.art={draw(){UI=[];softBg('#fffde7','#fce4ec');const L=XL();
    if(AR&&AR.page<0){xHead('Color & Draw','#ef6c00');const n=PAGES.length,cols=L.land?5:3,rows=Math.ceil(n/cols),gap=16,top=TOP+L.bb+30,bot=H-Math.max(BOT,8)-16,ts=Math.min((W-INL-INR-30-gap*(cols-1))/cols,(bot-top-gap*(rows-1))/rows,190);
      PAGES.forEach(([nm,f],i)=>{const r=(i/cols)|0,inRow=Math.min(cols,n-r*cols),x=W/2-(inRow*ts+(inRow-1)*gap)/2+(i%cols)*(ts+gap),y=top+r*(ts+gap);X.fillStyle='rgba(120,60,140,0.15)';rrect(x+2,y+5,ts,ts,20);X.fill();X.fillStyle='#fff';rrect(x,y,ts,ts,20);X.fill();
        if(f){X.save();X.beginPath();rrect(x,y,ts,ts,20);X.clip();X.translate(x,y);X.scale(ts/ART_N,ts/ART_N);X.globalAlpha=0.9;try{f(X)}catch(e){}X.restore();X.globalAlpha=1}else{txt('🖍️',x+ts/2,y+ts*0.45,ts*0.4,'#000')}
        txt(nm,x+ts/2,y+ts-16,Math.min(17,ts/9),'#7b3fa0');btn('page'+i,x,y,ts,ts,()=>{AR.page=i;AR.a=artMake(i);AR.tool=f?0:1;sayT(f?'Tap to fill with color!':'Draw with your finger!',2)})});
      bigBack();return}
    if(!AR){bigBack();return}const r=artRect(),a=AR.a;X.fillStyle='rgba(120,60,140,0.18)';rrect(r.x+3,r.y+6,r.w,r.h,14);X.fill();X.save();rrect(r.x,r.y,r.w,r.h,14);X.clip();X.drawImage(a.pc,r.x,r.y,r.w,r.h);if(a.mask)X.drawImage(a.lc,r.x,r.y,r.w,r.h);X.restore();
    // crayons
    const s=r.side,nc=CRAY.length;let pos;if(L.land){const per=Math.ceil(nc/2),cs=Math.min(s,(H-TOP-L.bb-40)/per-6);pos=i=>({x:i<per?r.x-2*cs-30:r.x+r.w+20+cs+10,y:TOP+L.bb+16+(i%per)*(cs+6),s:cs})}else{const per=Math.ceil(nc/2),cs=Math.min(s*0.8,(W-INL-INR-20)/per-6);pos=i=>({x:W/2-(per*(cs+6))/2+(i%per)*(cs+6),y:(i<per?r.y+r.h+12:r.y+r.h+18+cs),s:cs})}
    CRAY.forEach((c,i)=>{const q=pos(i),on=i===AR.col;X.save();X.translate(q.x+q.s/2,q.y+q.s/2);if(on)X.scale(1.12,1.12);X.fillStyle=on?'#7b3fa0':'rgba(255,255,255,0.9)';rrect(-q.s/2,-q.s/2,q.s,q.s,14);X.fill();
      X.fillStyle=c;rrect(-q.s*0.18,-q.s*0.36,q.s*0.36,q.s*0.62,5);X.fill();poly([-q.s*0.18,-q.s*0.36,q.s*0.18,-q.s*0.36,0,-q.s*0.5],c);X.restore();btn('cray'+i,q.x,q.y,q.s,q.s,()=>{AR.col=i;AUD.SFX.click()})});
    // tools (top row): fill, crayon, undo, fridge
    const tl=[[a.mask?'🪣':null,()=>{AR.tool=0;sayT('Fill!',1)}],['🖍️',()=>{AR.tool=1;sayT('Crayon!',1)}],['↩️',()=>{const u=a.undo.pop();if(u){a.px.putImageData(u,0,0);AUD.SFX.pat()}}],['🧲',()=>{if(AR.saved)return;fridgeSave();AR.saved=1;AUD.SFX.sticker();sConf(40);sayT('Your picture is on the fridge!',2)}]].filter(t=>t[0]);
    const tb=Math.max(64,PT(46));const tY=L.land?TOP+12:TOP+L.bb+22,tX0=L.land?W-INR-12-tl.length*(tb+8):W/2-(tl.length*(tb+8)-8)/2;tl.forEach(([ic,fn],i)=>{const x=tX0+i*(tb+8),y=tY,on=(ic==='🪣'&&AR.tool===0)||(ic==='🖍️'&&AR.tool===1)||(ic==='🧲'&&AR.saved);X.fillStyle=on?'#ff8fc8':'rgba(255,255,255,0.9)';rrect(x,y,tb,tb,16);X.fill();txt(ic,x+tb/2,y+tb/2+1,tb*0.5,'#000');btn('tool_'+i,x,y,tb,tb,fn)});
    backBtn2('◀  Pictures')}};
// ---------- Fridge gallery ----------
let FRIMG={},FR=null;
function frImg(i,url){let m=FRIMG[i];if(!m||m.src!==url){m=new Image();m.src=url;FRIMG[i]=m}return m}
SCR.fridge={open(){FR={view:-1};const n=fridgeLoad().length;sayT(n?'Your fridge gallery!':'The fridge is empty. Color a picture and tap the magnet to save it!',2)},close(){FR=null},back(){if(FR&&FR.view>=0){FR.view=-1;return true}return false}};
XS.fridge={draw(){UI=[];const g=X.createLinearGradient(0,0,W,0);g.addColorStop(0,'#eef2f5');g.addColorStop(1,'#ffffff');X.fillStyle=g;X.fillRect(0,0,W,H);X.fillStyle='#cfd8dc';X.fillRect(W-INR-28,H*0.3,10,H*0.3);
    const L=XL(),f=fridgeLoad();xHead('My Fridge','#546e7a');if(!FR){bigBack();return}
    if(FR.view>=0&&f[FR.view]){const s=Math.min(W-INL-INR-40,H-TOP-L.bb-60),x=W/2-s/2,y=TOP+L.bb+30,m=frImg(FR.view,f[FR.view]);X.fillStyle='#fff';rrect(x-10,y-10,s+20,s+20,10);X.fill();if(m.complete)X.drawImage(m,x,y,s,s);circ(W/2,y-6,14,'#ff5c9e');btn('big',x,y,s,s,()=>{FR.view=-1});backBtn2('◀  Fridge');return}
    if(!f.length){txt('🖍️ ➜ 🧲',W/2,H/2,60,'#000');bigBack();return}
    const cols=L.land?4:3,rows=Math.ceil(f.length/cols),gap=22,top=TOP+L.bb+36,ts=Math.min((W-INL-INR-60-gap*(cols-1))/cols,(H-top-Math.max(BOT,8)-20-gap*(Math.max(rows,2)-1))/Math.max(rows,2));
    f.forEach((u,i)=>{const r=(i/cols)|0,x=W/2-(cols*ts+(cols-1)*gap)/2+(i%cols)*(ts+gap),y=top+r*(ts+gap),m=frImg(i,u),rot=Math.sin(i*2.3)*0.05;X.save();X.translate(x+ts/2,y+ts/2);X.rotate(rot);X.fillStyle='rgba(0,0,0,0.12)';X.fillRect(-ts/2+3,-ts/2+5,ts,ts);X.fillStyle='#fff';X.fillRect(-ts/2-5,-ts/2-5,ts+10,ts+10);
      if(m.complete)X.drawImage(m,-ts/2,-ts/2,ts,ts);circ(0,-ts/2-2,11,['#ff5c9e','#4fc3f7','#ffd54f','#81c784'][i%4]);X.restore();btn('pic'+i,x,y,ts,ts,()=>{FR.view=i;AUD.SFX.boing();sayT('Wow! What a pretty picture!',2)})});
    bigBack()}};
