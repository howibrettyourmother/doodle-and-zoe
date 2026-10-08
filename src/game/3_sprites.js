// ================= sprites: Doodle the cat, Zoe, friendly grown-ups, items =================
const OR='#f5a142',ORD='#dc7f2a',WH='#fffaf3',PN='#ff9fb8';
function sl(w,c){X.lineWidth=w;X.strokeStyle=c;X.lineCap='round';X.lineJoin='round';X.stroke()}
function bow(x,y,s,c){X.save();X.translate(x,y);X.scale(s,s);poly([0,0,-12,-8,-12,8],c);poly([0,0,12,-8,12,8],c);circ(0,0,4,'#fff');X.restore()}
function crown(x,y,s){X.save();X.translate(x,y);X.scale(s,s);poly([-12,4,-12,-8,-6,-2,0,-12,6,-2,12,-8,12,4],'#ffd54f');circ(0,-12,2.4,'#ff8fc8');circ(-12,-8,2,'#b39ddb');circ(12,-8,2,'#80deea');X.restore()}
// Doodle: chubby orange-and-white tabby, white blaze/chest/paws, pink nose. Faces right; (x,y)=feet.
function drawCat(x,y,o){const f=o.face||1,st=o.st||'idle',t=o.t||0,A=o.acc||{};X.save();X.translate(x,y);X.scale(f*(o.s||1),o.s||1);
  ell(0,1,30,5,'rgba(80,40,90,0.15)');
  if(A.cape&&st!=='sleep'&&st!=='flop'){X.fillStyle='#b388ff';X.beginPath();X.moveTo(18,-40);X.quadraticCurveTo(-20,-46-Math.sin(t*6)*4,-40,-14+Math.sin(t*8)*3);X.lineTo(-10,-12);X.closePath();X.fill();star5(-18,-26,4,'#fff59d')}
  if(st==='sleep'){ell(0,-16,30,17,OR);ell(6,-10,18,8,WH);for(let i=0;i<3;i++){X.beginPath();X.arc(-6+i*9,-24,6,Math.PI*1.15,Math.PI*1.85);sl(3,ORD)}
    X.beginPath();X.moveTo(-26,-8);X.quadraticCurveTo(-30,8,8,4);sl(9,OR);circ(9,4,4.6,WH);circ(20,-22,15,OR);ell(24,-18,8,6,WH);poly([10,-32,12,-44,20,-35],OR);poly([24,-36,32,-44,32,-31],OR);
    X.beginPath();X.arc(17,-23,3,0.2,Math.PI-0.2);sl(2,'#4a3a3a');X.beginPath();X.arc(27,-23,3,0.2,Math.PI-0.2);sl(2,'#4a3a3a');poly([22,-18,26,-18,24,-15.5],PN);
    accHead(A,20,-22,1,t);X.restore();return}
  if(st==='flop'){const w=Math.sin(t*10)*4;ell(0,-18,32,16,OR);ell(2,-22,24,10,WH);for(const [lx,ph] of [[-16,0],[-4,1],[10,2],[20,3]]){X.beginPath();X.moveTo(lx,-26);X.lineTo(lx+Math.sin(t*9+ph)*4,-40+w*(ph%2?1:-1));sl(7,OR);circ(lx+Math.sin(t*9+ph)*4,-40+w*(ph%2?1:-1),4.5,WH)}
    X.beginPath();X.moveTo(-30,-14);X.quadraticCurveTo(-46,-20,-44,-36+Math.sin(t*5)*5);sl(8,OR);circ(30,-16,16,OR);ell(34,-12,9,7,WH);poly([40,-4,48,2,38,6],OR);poly([40,-28,48,-30,42,-20],OR);
    circ(28,-14,2.6,'#3a2b2b');circ(36,-18,2.6,'#3a2b2b');poly([36,-9,38,-6,34,-7],PN);X.restore();return}
  const walk=st==='walk',air=st==='air',bisc=st==='bisc',ph=t*12;
  // tail
  const tw=Math.sin(t*(walk?7:2.4))*6;X.beginPath();X.moveTo(-26,-26);X.quadraticCurveTo(-46,-34,-44+tw*0.4,-56+tw);sl(10,OR);X.beginPath();X.moveTo(-40,-42);X.lineTo(-43,-46);sl(10,ORD);circ(-44+tw*0.4,-56+tw,5,WH);
  // legs
  const legs=[[-18,0],[-8,Math.PI],[12,Math.PI*0.5],[20,Math.PI*1.5]];
  for(let i=0;i<4;i++){const [lx,p]=legs[i];let lift=walk?Math.max(0,Math.sin(ph+p))*6:air?3:0,dx=walk?Math.cos(ph+p)*4:0;if(bisc&&i>=2)lift=Math.max(0,Math.sin(t*9+i*Math.PI))*8;
    X.beginPath();X.moveTo(lx,-18);X.lineTo(lx+dx,-4-lift);sl(9,i%2?ORD:OR);ell(lx+dx+1,-3-lift,5.5,4,WH)}
  // body
  ell(0,-24,31,19,OR);ell(8,-16,20,10,WH);for(let i=0;i<4;i++){X.beginPath();X.arc(-16+i*9,-38,8,Math.PI*1.2,Math.PI*1.8);sl(3.2,ORD)}
  if(A.tutu){for(let i=0;i<7;i++)ell(-20+i*7,-18,8,6,i%2?'#ffc1e3':'#e1bee7');}
  if(A.collar){X.beginPath();X.arc(22,-36,13,0.6,2.4);sl(4,'#ff5c9e');circ(22,-23,3.2,'#ffd54f')}
  // head
  const hb=walk?Math.sin(ph*2)*1.2:0,hx=24,hy=-42+hb;
  poly([hx-14,hy-6,hx-12,hy-24,hx-2,hy-14],OR);poly([hx-11,hy-9,hx-10,hy-19,hx-5,hy-13],PN);poly([hx+4,hy-14,hx+14,hy-24,hx+16,hy-6],OR);poly([hx+7,hy-13,hx+13,hy-19,hx+13,hy-9],PN);
  circ(hx,hy,18,OR);ell(hx+2,hy-4,5,11,WH);ell(hx+3,hy+7,12,8,WH);
  const blink=((t*0.8)%4)>3.85||st==='purr';
  if(blink){X.beginPath();X.arc(hx-6,hy-2,3.5,0.2,Math.PI-0.2);sl(2.2,'#3a2b2b');X.beginPath();X.arc(hx+10,hy-2,3.5,0.2,Math.PI-0.2);sl(2.2,'#3a2b2b')}
  else{ell(hx-6,hy-2,4,5,'#3a2b2b');ell(hx+10,hy-2,4,5,'#3a2b2b');circ(hx-4.6,hy-3.8,1.6,'#fff');circ(hx+11.4,hy-3.8,1.6,'#fff')}
  ell(hx-11,hy+5,4,2.4,'rgba(255,140,170,0.55)');ell(hx+15,hy+5,4,2.4,'rgba(255,140,170,0.55)');
  poly([hx+1,hy+3,hx+5,hy+3,hx+3,hy+6],PN);
  if(st==='meow'){ell(hx+3,hy+10,3.4,3.6,'#c2185b')}else{X.beginPath();X.moveTo(hx-1,hy+8);X.quadraticCurveTo(hx+1,hy+10,hx+3,hy+7.5);X.quadraticCurveTo(hx+5,hy+10,hx+7,hy+8);sl(1.4,'#7a4a4a')}
  X.beginPath();X.moveTo(hx+12,hy+5);X.lineTo(hx+24,hy+3);X.moveTo(hx+12,hy+7);X.lineTo(hx+24,hy+8);X.moveTo(hx-6,hy+5);X.lineTo(hx-16,hy+3);sl(0.9,'rgba(90,60,60,0.6)');
  if(st==='bat'){X.beginPath();X.moveTo(18,-26);X.lineTo(36,-34+Math.sin(t*20)*4);sl(8,OR);circ(36,-34+Math.sin(t*20)*4,5,WH)}
  if(A.glasses){heartP(hx-6,hy-1,7,'#ff5c9e');heartP(hx+10,hy-1,7,'#ff5c9e');X.beginPath();X.moveTo(hx-1,hy-3);X.lineTo(hx+5,hy-3);sl(1.6,'#ff5c9e')}
  accHead(A,hx,hy,1,t);X.restore()}
function accHead(A,hx,hy,s,t){if(A.crown)crown(hx-2,hy-20,0.9);if(A.bow)bow(hx+10,hy-17,0.85,'#ff5c9e');if(A.flower){for(let i=0;i<5;i++){const a=i*TAU/5;circ(hx-10+Math.cos(a)*4,hy-16+Math.sin(a)*4,3.2,'#c5a3ff')}circ(hx-10,hy-16,2.4,'#fff59d')}}
// Zoe: light brown ponytail, pink unicorn sweatshirt, light blue tutu, gray floppy bunny
function drawZoe(x,o){const f=o.face||1,t=o.t||0,walk=o.walk,pet=o.pet>0,top=o.top||'#ff9cc8',tutu=o.tutu||'#bfe3ff',sk='#f7d5bf',hair='#a8754a';X.save();X.translate(x,0);X.scale(f,1);
  ell(0,2,26,5,'rgba(80,40,90,0.15)');const b=walk?Math.abs(Math.sin(t*9))*3:0,cr=pet?14:0;X.translate(0,-b+cr);
  const lg=walk?Math.sin(t*9)*7:0;X.beginPath();X.moveTo(-5,-36);X.lineTo(-5+lg,-4-cr);X.moveTo(5,-36);X.lineTo(5-lg,-4-cr);sl(6,sk);ell(-5+lg+2,-3-cr,6,3.5,'#ff8fc8');ell(5-lg+2,-3-cr,6,3.5,'#ff8fc8');
  for(let i=0;i<6;i++)ell(-18+i*7.2,-38,9,8,i%2?tutu:'rgba(255,255,255,0.85)');ell(0,-42,20,7,tutu);
  X.fillStyle=top;rrect(-15,-76,30,38,10);X.fill();circ(1,-58,7,'#fff');poly([4,-64,9,-74,7,-62],'#ffd54f');circ(-3,-60,3,'#c5a3ff');circ(-4,-55,3,'#80deea');circ(3,-58,1.2,'#333');
  // bunny (gray, floppy ears) hugged on the far arm
  X.save();X.translate(-12,-52);ell(0,6,9,11,'#c9c4c6');circ(0,-8,8,'#d5d0d2');ell(-6,-4,3,9,'#bdb6b8',0.6);ell(6,-6,3,10,'#bdb6b8',-0.4);circ(-2,-9,1.2,'#333');circ(3,-9,1.2,'#333');circ(0.5,-6,1.6,'#a1887f');X.restore();
  X.beginPath();X.moveTo(-12,-70);X.quadraticCurveTo(-20,-56,-8,-48);sl(6,top);
  const ar=pet?0.9:walk?Math.sin(t*9)*0.4:0.15;X.save();X.translate(12,-70);X.rotate(ar);X.beginPath();X.moveTo(0,0);X.lineTo(4,22);sl(6,top);circ(4,25,4,sk);X.restore();
  // head + ponytail
  const pt=Math.sin(t*(walk?9:2))*4;X.beginPath();X.moveTo(-10,-100);X.quadraticCurveTo(-26,-96,-24+pt*0.5,-80);sl(9,hair);circ(-11,-100,3.5,'#ff8fc8');
  circ(0,-94,16,sk);X.fillStyle=hair;X.beginPath();X.arc(0,-96,17,Math.PI*1.02,TAU*1.0);X.fill();X.beginPath();X.ellipse(5,-104,12,6,-0.2,0,TAU);X.fill();
  if(o.happy>0){X.beginPath();X.arc(-2,-94,2.6,Math.PI*1.1,Math.PI*1.9);sl(2,'#4a3030');X.beginPath();X.arc(8,-94,2.6,Math.PI*1.1,Math.PI*1.9);sl(2,'#4a3030')}else{circ(-2,-94,2.4,'#4a3030');circ(8,-94,2.4,'#4a3030');circ(-1.3,-95,0.9,'#fff');circ(8.7,-95,0.9,'#fff')}
  ell(-6,-88,3.4,2,'rgba(255,130,160,0.5)');ell(12,-88,3.4,2,'rgba(255,130,160,0.5)');X.beginPath();X.arc(4,-88,4,0.3,Math.PI-0.3);sl(1.8,'#c2185b');
  if(o.bow)bow(-8,-110,0.7,o.bow);X.restore()}
// friendly grown-ups (generic, cozy)
function drawNPC(k,x,o){const t=o.t||0,wave=o.wave>0;X.save();X.translate(x,0);ell(0,2,28,5,'rgba(80,40,90,0.15)');
  if(k==='duck'){X.translate(0,Math.sin(t*2)*1.5);ell(0,-16,24,15,'#fff');circ(16,-34,11,'#fff');poly([26,-35,36,-32,26,-29],'#ffb74d');circ(19,-37,2,'#333');ell(-6,-18,12,7,'#eee');poly([-24,-20,-32,-26,-22,-12],'#fff');X.fillStyle='#ffb74d';X.fillRect(-6,-2,3,4);X.fillRect(4,-2,3,4);if(o.bow)bow(10,-44,0.6,'#ff8fc8');X.restore();return}
  const C={dad:{h:'#5d4037',top:'#7aa7e8',leg:'#5c6b8a',sk:'#f2c9a8',tall:150},mom:{h:'#8d5a3b',top:'#c39bef',leg:'#6f7fb5',sk:'#f5d0b5',tall:140},teacher:{h:'#e0794f',top:'#7fd1a8',leg:'#8d7bd1',sk:'#e9b994',tall:138},gma:{h:'#d6d6de',top:'#e7b6f2',leg:'#8f87b3',sk:'#f4d6c4',tall:128}}[k];
  const T0=C.tall;X.beginPath();X.moveTo(-7,-T0*0.42);X.lineTo(-8,-4);X.moveTo(7,-T0*0.42);X.lineTo(8,-4);sl(9,C.leg);ell(-9,-3,8,4,'#6d4c41');ell(10,-3,8,4,'#6d4c41');
  if(k==='mom'||k==='gma'){X.fillStyle=k==='gma'?'#b39ddb':'#9fa8da';X.beginPath();X.moveTo(-18,-T0*0.36);X.lineTo(18,-T0*0.36);X.lineTo(22,-T0*0.12);X.lineTo(-22,-T0*0.12);X.fill()}
  X.fillStyle=C.top;rrect(-18,-T0*0.78,36,T0*0.44,12);X.fill();if(k==='teacher'){X.fillStyle='#fff8e1';rrect(-12,-T0*0.62,24,T0*0.3,6);X.fill();txt('ABC',0,-T0*0.5,9,'#e57373')}if(k==='gma'){for(let i=0;i<3;i++)circ(0,-T0*0.7+i*12,2,'#fff')}
  X.beginPath();X.moveTo(-16,-T0*0.72);X.lineTo(-22,-T0*0.46);sl(8,C.top);const ar=wave?-2.4+Math.sin(t*10)*0.3:0.2;X.save();X.translate(16,-T0*0.72);X.rotate(ar);X.beginPath();X.moveTo(0,0);X.lineTo(4,26);sl(8,C.top);circ(4,30,5,C.sk);X.restore();
  const hy=-T0*0.86;if(k==='mom'){X.fillStyle=C.h;rrect(-18,hy-14,36,48,14);X.fill()}
  circ(0,hy,15,C.sk);X.fillStyle=C.h;X.beginPath();X.arc(0,hy-2,16,Math.PI*1.05,TAU*0.98);X.fill();
  if(k==='gma'){circ(0,hy-18,8,C.h);X.beginPath();X.arc(-5,hy,4.5,0,TAU);X.arc(7,hy,4.5,0,TAU);sl(1.6,'#9575cd')}
  if(k==='teacher'){for(let i=0;i<6;i++)circ(-14+i*5.6,hy-12+Math.sin(i)*2,5,C.h)}
  if(k==='dad'){X.fillStyle=C.h;X.beginPath();X.arc(0,hy+5,13,0.15,Math.PI-0.15);X.fill()}
  circ(-5,hy,2,'#3a2b2b');circ(6,hy,2,'#3a2b2b');X.beginPath();X.arc(0.5,hy+5,4,0.3,Math.PI-0.3);sl(1.6,k==='dad'?'#fff':'#c2185b');ell(-9,hy+5,3,1.8,'rgba(255,130,160,0.45)');ell(10,hy+5,3,1.8,'rgba(255,130,160,0.45)');
  X.restore()}
function drawItem(k,x,y,t){X.save();X.translate(x,y);
  if(k==='star'){const s=1+Math.sin(t*5)*0.08;X.rotate(Math.sin(t*2)*0.2);X.scale(s,s);circ(0,0,17,'rgba(255,240,150,0.35)');star5(0,0,13,'#ffd54f');star5(0,0,8,'#fff59d');circ(-3,-3,2,'#fff')}
  else if(k==='fish'){X.rotate(Math.sin(t*3)*0.15);ell(0,0,11,6,'#ff9ec7');poly([8,0,16,-6,16,6],'#ff9ec7');circ(-5,-1,1.5,'#5d3a4a');X.beginPath();X.arc(0,0,4,-1,1);sl(1.2,'#fff')}
  else if(k==='remote'){X.rotate(-0.3);X.fillStyle='#5e5a7a';rrect(-6,-16,12,32,4);X.fill();circ(0,-9,3,'#ff5252');for(let i=0;i<3;i++){circ(-2.5,-1+i*5,1.5,'#cfd8dc');circ(2.5,-1+i*5,1.5,'#cfd8dc')}}
  else if(k==='earring'){X.beginPath();X.arc(0,-8,5,0,TAU);sl(2,'#ffd54f');poly([0,-3,7,6,0,15,-7,6],'#e1bee7');poly([0,0,4,6,0,11,-4,6],'#fff');circ(-2,5,1.2,'#fff')}
  else if(k==='bunny'){ell(0,-10,12,10,'#fff');circ(10,-18,8,'#fff');ell(8,-30,3,9,'#fff',-0.2);ell(14,-29,3,9,'#fff',0.3);ell(8,-30,1.4,6,'#ffc1d6',-0.2);circ(12,-19,1.4,'#333');circ(17,-17,1.3,'#ff8fb3');circ(-11,-8,4,'#fff')}
  else if(k==='duckling'){const b=Math.abs(Math.sin(t*8))*2;X.translate(0,-b);ell(0,-8,9,7,'#fff176');circ(7,-16,6,'#fff176');poly([12,-16,17,-15,12,-13],'#ffb74d');circ(8,-17,1.3,'#333')}
  else if(k==='yarn'){X.rotate(t*0);circ(0,-12,12,'#f48fb1');X.strokeStyle='#ec407a';X.lineWidth=1.5;for(let i=-1;i<=1;i++){X.beginPath();X.ellipse(0,-12,11,5,i*0.9,0,TAU);X.stroke()}}
  X.restore()}
