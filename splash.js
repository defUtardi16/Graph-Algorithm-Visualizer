(function(){
const style=document.createElement('style');
style.textContent=`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Rajdhani:wght@300;400&display=swap');*{margin:0;padding:0;box-sizing:border-box}#splash{position:fixed;top:0;left:0;width:100%;height:100%;background:#050505;z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;overflow:hidden}#splash.fade-out{animation:splashFadeOut 1.4s cubic-bezier(.4,0,.2,1) forwards}@keyframes splashFadeOut{0%{opacity:1}100%{opacity:0;pointer-events:none}}#splash canvas{position:absolute;top:0;left:0;width:100%;height:100%;opacity:.55}.sp-wrap{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;gap:14px}.sp-madeby{font-family:'Rajdhani',sans-serif;font-size:11px;font-weight:300;letter-spacing:10px;color:rgba(255,255,255,.22);text-transform:uppercase;animation:spFadeUp 1.2s ease forwards;opacity:0;animation-delay:.5s}.sp-name{font-family:'Orbitron',monospace;font-size:clamp(28px,6vw,72px);font-weight:900;letter-spacing:10px;color:#d8d8d8;position:relative;animation:spFadeUp 1s ease forwards;opacity:0;animation-delay:.9s;text-shadow:0 0 60px rgba(255,255,255,.08),0 0 120px rgba(255,255,255,.04)}.sp-shimmer{position:absolute;inset:0;font-family:'Orbitron',monospace;font-size:clamp(28px,6vw,72px);font-weight:900;letter-spacing:10px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.5) 50%,transparent 70%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;background-size:300% 100%;animation:spShimmer 4s ease-in-out infinite;animation-delay:2s;white-space:nowrap}.sp-line{width:0;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),rgba(180,180,180,.25),transparent);animation:spLineExp 1.2s cubic-bezier(.4,0,.2,1) forwards;animation-delay:1.2s}.sp-sub{font-family:'Rajdhani',sans-serif;font-size:9px;font-weight:300;letter-spacing:7px;color:rgba(255,255,255,.15);text-transform:uppercase;animation:spFadeUp .8s ease forwards;opacity:0;animation-delay:1.4s}.sp-progwrap{display:flex;flex-direction:column;align-items:center;gap:8px;margin-top:6px;animation:spFadeUp .8s ease forwards;opacity:0;animation-delay:1.5s}.sp-progbar{width:180px;height:1px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden}.sp-progfill{height:100%;width:0;background:linear-gradient(90deg,rgba(150,150,150,.6),rgba(255,255,255,.7),rgba(150,150,150,.6));border-radius:4px;animation:spProgFill 2.5s cubic-bezier(.4,0,.2,1) forwards;animation-delay:1.6s}.sp-loadt{font-family:'Rajdhani',sans-serif;font-size:9px;letter-spacing:4px;color:rgba(255,255,255,.12);text-transform:uppercase}@keyframes spFadeUp{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}@keyframes spShimmer{0%{background-position:300% 0}100%{background-position:-300% 0}}@keyframes spLineExp{0%{width:0;opacity:0}100%{width:220px;opacity:1}}@keyframes spProgFill{0%{width:0}60%{width:80%}85%{width:93%}100%{width:100%}}`;
document.head.appendChild(style);
const splash=document.createElement('div');
splash.id='splash';
splash.innerHTML=`<canvas id="sp-canvas"></canvas><div class="sp-wrap"><div class="sp-madeby">Made by</div><div class="sp-name">RadStrix<span class="sp-shimmer">RadStrix</span></div><div class="sp-line"></div><div class="sp-sub">Creative Studio</div><div class="sp-progwrap"><div class="sp-progbar"><div class="sp-progfill"></div></div><div class="sp-loadt" id="sp-lt">Initializing</div></div></div>`;
document.body.insertBefore(splash,document.body.firstChild);
const canvas=document.getElementById('sp-canvas'),ctx=canvas.getContext('2d');
let W,H,nodes=[],animId,mouse={x:-999,y:-999};
const N=85,MAX_DIST=140;
function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
resize();window.addEventListener('resize',resize);
class Node{constructor(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;this.r=Math.random()*1.2+.4;this.pulse=Math.random()*Math.PI*2;this.spd=Math.random()*.012+.006;}}
for(let i=0;i<N;i++)nodes.push(new Node());
window.addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});
function draw(){ctx.clearRect(0,0,W,H);
nodes.forEach((n,i)=>{n.x+=n.vx;n.y+=n.vy;n.pulse+=n.spd;
if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;
const dx=mouse.x-n.x,dy=mouse.y-n.y,md=Math.hypot(dx,dy);
if(md<100&&md>0){n.vx-=dx/md*.008;n.vy-=dy/md*.008;}
const pa=.3+Math.sin(n.pulse)*.2;
ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
ctx.fillStyle=`rgba(210,210,210,${pa})`;ctx.fill();
for(let j=i+1;j<nodes.length;j++){const m=nodes[j],d=Math.hypot(n.x-m.x,n.y-m.y);
if(d<MAX_DIST){const a=(1-d/MAX_DIST)*.45;
ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);
ctx.strokeStyle=`rgba(200,200,200,${a})`;ctx.lineWidth=.6;ctx.stroke();}}});
animId=requestAnimationFrame(draw);}
draw();
let AC;try{AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}
function playSound(){if(!AC)return;
const master=AC.createGain();master.gain.setValueAtTime(0,AC.currentTime);master.gain.linearRampToValueAtTime(.22,AC.currentTime+.15);master.gain.exponentialRampToValueAtTime(.001,AC.currentTime+3.5);master.connect(AC.destination);
const rl=AC.sampleRate*2,rb=AC.createBuffer(2,rl,AC.sampleRate);
for(let c=0;c<2;c++){const d=rb.getChannelData(c);for(let i=0;i<rl;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/rl,2.5);}
const rev=AC.createConvolver();rev.buffer=rb;const revG=AC.createGain();revG.gain.value=.4;rev.connect(revG);revG.connect(master);
function tone(freq,type,start,dur,gain,detune=0){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=freq;o.detune.value=detune;g.gain.setValueAtTime(0,AC.currentTime+start);g.gain.linearRampToValueAtTime(gain,AC.currentTime+start+.08);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+start+dur);o.connect(g);g.connect(master);g.connect(rev);o.start(AC.currentTime+start);o.stop(AC.currentTime+start+dur+.2);}
tone(80,'sine',0,3,.5);tone(160,'sine',0,2.5,.18);tone(240,'sine',.1,2,.08);tone(480,'sine',.15,1.5,.04);tone(82,'sine',.05,2.8,.12,-8);tone(320,'triangle',.5,1.8,.05);tone(640,'sine',.8,1,.025);}
setTimeout(playSound,300);
let dots=0;const lt=document.getElementById('sp-lt');
const di=setInterval(()=>{dots=(dots+1)%4;if(lt)lt.textContent='Initializing'+'.'.repeat(dots);},500);
setTimeout(()=>{clearInterval(di);splash.classList.add('fade-out');setTimeout(()=>{cancelAnimationFrame(animId);splash.remove();},1400);},4200);
})();
