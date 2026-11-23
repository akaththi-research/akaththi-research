(function(){
var A={};fetch(document.currentScript.src.replace('site.js','areas.json')).then(function(r){return r.json()}).then(function(d){A=d}).catch(function(){});
var cap=document.getElementById('rcap'),nodes=document.querySelectorAll('.node');
function show(n){nodes.forEach(function(x){x.classList.toggle('on',x===n)});var a=A[n.dataset.k];if(!a||!cap)return;
 cap.innerHTML='';var b=document.createElement('b');b.textContent=a[0]+' · '+a[2];var s=document.createElement('span');s.textContent=a[1];cap.appendChild(b);cap.appendChild(s)}
nodes.forEach(function(n,i){n.addEventListener('mouseenter',function(){show(n)});n.addEventListener('focus',function(){show(n)});n.addEventListener('click',function(){location.href=document.querySelector('a[href*="projects"]').href.replace(/index\.html.*/,'index.html')+'#'+n.dataset.k})});
var auto=0;if(nodes.length&&!matchMedia('(prefers-reduced-motion:reduce)').matches){var i=0;auto=setInterval(function(){show(nodes[i++%nodes.length])},2600);var m=document.getElementById('rmap');['mouseenter','focusin','touchstart'].forEach(function(e){m.addEventListener(e,function(){clearInterval(auto)},{once:true})})}
var els=document.querySelectorAll('.card,.pipe li,.trio>div,.proj');if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});els.forEach(function(e){e.classList.add('reveal');io.observe(e)})}
var f=document.getElementById('f');if(f)f.addEventListener('submit',function(e){e.preventDefault();var v=function(i){return document.getElementById(i).value.trim()};
 if(!v('fm')){document.getElementById('note').textContent='Please tell us the question first.';return}
 var body='Name: '+v('fn')+'\nOrganisation: '+v('fo')+'\nArea: '+v('fi')+'\n\n'+v('fm');
 window.open('https://github.com/akaththi-research/akaththi-research/issues/new?title='+encodeURIComponent('Enquiry: '+v('fi'))+'&body='+encodeURIComponent(body),'_blank','noopener')});
})();
