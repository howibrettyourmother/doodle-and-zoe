/* Hub arcade intro, 20261127arcade.
   Full (~11.7s) on the first open each Eastern-time day, short (~4.2s) after that.
   Tap anywhere skips, except the first gesture that unlocks iOS audio.
   Query: ?intro=off|full|short|birthday
   No specific games — arcade energy, hub logo, Doodle, and a brief Dad cameo. */
(function(){
  var q=(location.search.match(/[?&]intro=(\w+)/)||[])[1];
  if(q==='off'||self!==top)return;
  var kid=(typeof KID==='string'&&KID)?KID:(document.body.classList.contains('zoe')?'zoe':'alex');
  var zoe=kid==='zoe';
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function etDate(){
    try{
      if(typeof etNow==='function'){var t=etNow();return t.y+'-'+t.mo+'-'+t.d}
      var p={};new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});
      return (+p.year)+'-'+(+p.month)+'-'+(+p.day);
    }catch(e){var d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}
  }
  function etMD(){
    try{if(typeof etNow==='function'){var t=etNow();return {mo:t.mo,d:t.d}}}catch(e){}
    var p={};
    try{new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric'}).formatToParts(new Date()).forEach(function(x){p[x.type]=x.value});return {mo:+p.month,d:+p.day}}catch(e){var n=new Date();return {mo:n.getMonth()+1,d:n.getDate()}}
  }
  var day=etDate(), KEY=kid+'IntroDay', seen=false;
  try{seen=localStorage[KEY]===day}catch(e){}
  if(q==='full')seen=false;
  if(q==='short')seen=true;
  var md=etMD();
  var bday=zoe&&(q==='birthday'||(md.mo===5&&md.d===16));
  var short=!!(rm||(seen&&q!=='birthday'&&q!=='full'));
  try{localStorage[KEY]=day}catch(e){}

  var word1=zoe?(bday?'HAPPY':'DOODLE &'):"ALEX'S";
  var word2=zoe?(bday?'BIRTHDAY':'ZOE'):'GAMES';

  var o=document.createElement('div');
  o.id='intro';
  o.className='hx '+(zoe?'zoe':'alex')+(bday?' bday':'')+(short?' short':'')+(rm?' hx-rm':'');
  o.setAttribute('role','dialog');
  o.setAttribute('aria-label',zoe?(bday?"Zoe's birthday intro":'Doodle and Zoe intro'):"Alex's Games intro");

  function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  var H='',i,cols=zoe?['#fff','#ffe9a8','#ff9ad5']:['#fff','#ffd24a','#7fd0ff'];
  H+='<div class="hx-scan" aria-hidden="true"></div>';
  H+='<div class="hx-grid" aria-hidden="true"></div>';
  if(!zoe)H+='<div class="hx-city" aria-hidden="true"></div>';
  H+='<div class="hx-spark" aria-hidden="true">';
  for(i=0;i<18;i++)H+='<i style="left:'+(4+i*5.3)+'%;top:'+(8+(i*37)%80)+'%;--d:'+(i*.17)+'s;background:'+cols[i%3]+'"></i>';
  H+='</div>';
  H+='<div class="hx-coins" aria-hidden="true">';
  var kinds=['','star','pix'];
  for(i=0;i<(short?10:18);i++){
    var ang=(i/18)*Math.PI*2, dist=18+ (i%5)*7;
    var x=(Math.cos(ang)*dist).toFixed(1)+'vmin', y=(Math.sin(ang)*dist-8).toFixed(1)+'vmin';
    H+='<i class="'+kinds[i%3]+'" style="left:50%;top:48%;--x:'+x+';--y:'+y+';--d:'+(short?(.15+i*.04):(.85+i*.07))+'s"></i>';
  }
  H+='</div>';
  if(!rm){
    H+='<div class="hx-pad" aria-hidden="true"><i class="d"></i><i class="ba"></i><i class="bb"></i></div>';
    H+='<div class="hx-stick" aria-hidden="true"><i class="base"></i><i class="shaft"></i><i class="ball"></i></div>';
    H+='<div class="hx-badge power">POWER UP</div><div class="hx-badge level">LEVEL UP</div>';
    H+='<div class="hx-press">PRESS START</div><div class="hx-gt">GAME TIME!</div>';
    H+='<img class="hx-cat" src="hub/intro/doodle.webp" alt="">';
    if(!short)H+='<img class="hx-dad" src="hub/intro/dad.webp" alt="">';
  }
  if(bday&&!rm){
    var bits=zoe?['#ff4fa3','#ffd93b','#fff','#a66bff','#7cf27c']:['#ffd24a','#ff4fa3','#5fd4ff','#fff'];
    H+='<div class="hx-confetti" aria-hidden="true">';
    for(i=0;i<16;i++)H+='<i style="left:'+(2+i*6.2)+'%;background:'+bits[i%bits.length]+';--dur:'+(2.6+(i%5)*.4)+'s;--d:'+(-i*.3)+'s"></i>';
    H+='</div>';
  }
  H+='<div class="hx-doodle" style="background-image:url(hub/cgi-doodle-boy.jpg)"></div>';
  H+='<div class="hx-logo"><div class="hx-word">'+esc(word1)+'</div><div class="hx-word2">'+esc(word2)+'</div></div>';
  H+='<div class="hx-tap">tap to skip ⏭</div>';
  o.innerHTML=H;
  document.body.appendChild(o);

  var src;
  if(bday)src=short?'hub/intro-bday-short.mp3':'hub/intro-bday.mp3';
  else src=short?'hub/intro-short.mp3':'hub/intro-full.mp3';
  try{if(window.WA&&WA.load)WA.load(typeof HICLIP==='string'?HICLIP:(zoe?'hub/z_hi.mp3':'hub/a_hi.mp3'))}catch(e){}

  var done=false,st=0,au=null,TM=[],t0=0;
  var FULL=rm?2200:(short?4200:11700);
  function end(){
    if(done)return;done=true;TM.forEach(clearTimeout);if(au&&au.stop)au.stop();
    o.style.opacity=0;
    setTimeout(function(){
      if(o.parentNode)o.parentNode.removeChild(o);
      try{if(window.HT&&HT.due){if(HT.due())HT.start(Date.now())}}catch(e){}
    },420);
  }
  function start(){
    if(st)return;st=1;t0=Date.now();
    o.className+=' play';
    try{if(typeof introAudio==='function')au=introAudio(src,t0)}catch(e){}
    TM.push(setTimeout(end,FULL));
  }
  o.addEventListener('pointerdown',function(e){e.stopPropagation()});
  var last=0;
  o.addEventListener('click',function(){
    var t=Date.now();if(t-last<350)return;last=t;
    if(au&&t-au.kickT<700)return;
    end();
  });
  start();
  window.__hxStart=start;window.__hxEnd=end;
})();
