/* Hub sizzle intro, 20261127sizzle.
   Full (~11.7s) on the first open each Eastern-time day, short (~4.2s) after that.
   Tap anywhere skips, except the first gesture that unlocks iOS audio.
   Query: ?intro=off|full|short|birthday
   NEW! strip is filled from tiles with t.new (and a jukebox-only extra), not hardcoded shots. */
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

  function pretty(img){
    var id=(/([\w-]+)\.(?:png|jpg|webp)/.exec(img||'')||['',''])[1];
    var map={'toots':'Toots!','toots-zoe':'Toots!','alex-amazing-mazes':'Amazing Mazes','alex-doodle-adventure-v2':'Alex & Doodle','alex-doodle-adventure':'Alex & Doodle','alex-excavator-blowout':'Excavator Blowout','alex-cave-rescue-v2':'Cave Rescue','alex-cave-rescue':'Cave Rescue','alex-floor-is-lava-v2':'Floor Is Lava','alex-floor-is-lava':'Floor Is Lava','dino-stampede-smash-alex-v2':'Dino Smash','dino-stampede-smash-zoe':'Dino Smash','zoe-babysitter':'Babysitter','zoe-bean':'Zoe Bean','doodle-and-zoe-v2':'Doodle & Zoe','doodle-and-zoe':'Doodle & Zoe','zoes-unicorn-adventure-v2':'Unicorn Adventure','zoes-unicorn-adventure':'Unicorn Adventure','zoes-princess-castle':'Princess Castle','zoes-mermaid-lagoon-v2':'Mermaid Lagoon','silly-beat-band':'Silly Beat Band','wilson-water-pirates-v2':'Water Pirates','the-bee-game':'The Bee Game','alex-river-run':'River Run','fry-thief-seagull':'Poopy Seagull','go-alex-go':'Go, Alex, Go!'};
    if(map[id])return map[id];
    return id.replace(/-v\d+$/,'').replace(/-(?:alex|zoe)$/,'').replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase()});
  }
  function learning(t){return /galaxy-math|abc123|abc-123/.test((t&&t.img)||'')}
  function tiles(){return (typeof T!=='undefined'&&T&&T.length)?T.slice():[]}

  /* Montage order prefers the newest / most-played games, then the rest of the hub, skipping learning titles. */
  var PREFER=zoe
    ?[/zoe-bean/,/babysitter/,/toots/,/unicorn/,/princess/,/mermaid/,/doodle-and-zoe/]
    :[/toots(?!-zoe)/,/excavator/,/mazes/,/floor-is-lava/,/cave-rescue/,/dino/,/adventure/];
  function montage(){
    var src=tiles().filter(function(t){return t&&t.img&&!learning(t)});
    if(zoe)src=[{img:'hub/zoe-bean.jpg',title:'Zoe Bean'}].concat(src);
    var out=[],used={};
    PREFER.forEach(function(re){src.forEach(function(t){if(!used[t.img]&&re.test(t.img)){used[t.img]=1;out.push(t)}})});
    src.forEach(function(t){if(!used[t.img])out.push(t)});
    return out.slice(0,4);
  }
  /* Spotlight: every tile flagged new:true, plus Zoe Bean on Zoe's hub when the art is present. */
  function spotlight(){
    var items=[],used={};
    function add(t){
      if(!t||!t.img||used[t.img]||learning(t))return;
      used[t.img]=1;items.push({img:t.img,title:t.title||pretty(t.img)});
    }
    tiles().forEach(function(t){if(t.new)add(t)});
    if(zoe)add({img:'hub/zoe-bean.jpg',title:'Zoe Bean'});
    try{
      var songs=(window.__JB&&(__JB.songs||__JB.list))||[];
      songs.forEach(function(s){if(s&&/^NEW!/i.test(s.title||'')&&s.art)add({img:s.art,title:String(s.title).replace(/^NEW!\s*/i,'')})});
    }catch(e){}
    return items.slice(0,3);
  }

  var shots=short||rm?[]:montage();
  var news=spotlight();
  var word1=zoe?(bday?'HAPPY':'DOODLE &'):"ALEX'S";
  var word2=zoe?(bday?'BIRTHDAY':'ZOE'):'GAMES';
  if(bday){word1='HAPPY';word2='BIRTHDAY'}

  var o=document.createElement('div');
  o.id='intro';
  o.className='hx '+(zoe?'zoe':'alex')+(bday?' bday':'')+(short?' short':'')+(rm?' hx-rm':'');
  o.setAttribute('role','dialog');
  o.setAttribute('aria-label',zoe?(bday?"Zoe's birthday intro":'Doodle and Zoe intro'):"Alex's Games intro");

  function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  var H='',i,bg=(shots[0]&&shots[0].img)||(news[0]&&news[0].img)||(zoe?'hub/doodle-and-zoe-v2.jpg':'hub/toots.jpg');
  H+='<div class="hx-bg" style="background-image:url('+esc(bg)+')"></div>';
  if(!zoe&&!rm)H+='<div class="hx-city" aria-hidden="true"></div>';
  H+='<div class="hx-spark" aria-hidden="true">';
  for(i=0;i<18;i++)H+='<i style="left:'+(4+i*5.3)+'%;top:'+(8+(i*37)%80)+'%;--d:'+(i*.17)+'s;background:'+(zoe?['#fff','#ffe9a8','#ff9ad5'][i%3]:['#fff','#ffd24a','#7fd0ff'][i%3])+'"></i>';
  H+='</div>';
  if(bday&&!rm){
    var bits=['🎉','🎈','🎂','💖','⭐','🎁','🎊'];
    H+='<div class="hx-confetti" aria-hidden="true">';
    for(i=0;i<16;i++)H+='<i style="left:'+(2+i*6.2)+'%;--dur:'+(2.6+(i%5)*.4)+'s;--d:'+(-i*.3)+'s">'+bits[i%bits.length]+'</i>';
    H+='</div>';
  }
  H+='<div class="hx-shots">';
  shots.forEach(function(t,n){
    H+='<div class="hx-shot" style="background-image:url('+esc(t.img)+');--d:'+(0.7+n*1.18)+'s"><b>'+esc(t.title||pretty(t.img))+'</b></div>';
  });
  H+='</div>';
  H+='<div class="hx-logo"><div class="hx-doodle" style="background-image:url(hub/cgi-doodle-boy.jpg)"></div>';
  H+='<div class="hx-word">'+esc(word1)+'</div><div class="hx-word2">'+esc(word2)+'</div></div>';
  H+='<div class="hx-new'+(news.length?'':' empty')+'"><span class="hx-newtag">NEW!</span>';
  news.forEach(function(t){H+='<div class="hx-newcard" title="'+esc(t.title)+'" style="background-image:url('+esc(t.img)+')"></div>'});
  if(news.length)H+='<span class="hx-newname">'+esc(news.map(function(t){return t.title}).join(' · '))+'</span>';
  H+='</div><div class="hx-tap">tap to skip ⏭</div>';
  o.innerHTML=H;
  document.body.appendChild(o);

  /* Warm the first few already-cached tile images; don't fetch giant videos. */
  shots.concat(news).slice(0,6).forEach(function(t){var im=new Image();im.src=t.img});

  var src;
  if(bday)src=short?'hub/intro-bday-short.mp3':'hub/intro-bday.mp3';
  else src=short?'hub/intro-short.mp3':'hub/intro-full.mp3';
  try{if(window.WA&&WA.load)WA.load(typeof HICLIP==='string'?HICLIP: (zoe?'hub/z_hi.mp3':'hub/a_hi.mp3'))}catch(e){}

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
    try{
      if(typeof introAudio==='function')au=introAudio(src,t0);
    }catch(e){}
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
