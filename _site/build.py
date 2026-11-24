"""Builds every page of the Akaththi Research site, plus sitemap.xml and robots.txt, into the repository root.
Usage: python3 _site/build.py   (Python 3.9+, no dependencies)
Styles and scripts live in assets/site/. Copy lives in this file."""
import os,math
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE='https://akaththi-research.github.io/akaththi-research'
REPO='https://github.com/akaththi-research/akaththi-research'
NAV=[('projects','Research'),('collaborate','Collaborate'),('about','About')]
AREAS=[
 ('mushroom','Mushroom','Mushroom research','Strains, cultivation and spawn efficiency, studied on a working farm in Chennai heat and humidity.','running'),
 ('cooling','Cooling','Cooling technology and HVAC','Keeping a growing room cool where the weather is hot, with air and humidity handled as one system.','exploring'),
 ('automation','Automation','Automation','Sensing, control and data logging that make every run repeatable and easy to compare.','exploring'),
 ('energy','Energy','Energy','What a run costs in energy, measured next to the climate, and where that energy can come from.','exploring'),
]
def page(slug,title,desc,body,active=''):
    depth=0 if slug=='' else 1
    r='./' if depth==0 else '../'
    if slug=='404':r='/akaththi-research/'
    url=BASE+('/' if slug=='' else '/404.html' if slug=='404' else f'/{slug}/')
    nav=''.join(f'<a href="{r}{s}/index.html"{" aria-current=\"page\"" if active==s else ""}>{l}</a>' for s,l in NAV)
    full='Akaththi Research | Science for living systems' if slug=='' else f'{title} | Akaththi Research | Science for living systems'
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{full}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#f4f4f4">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="Akaththi Research"><meta property="og:title" content="{full}"><meta property="og:description" content="{desc}"><meta property="og:url" content="{url}"><meta property="og:image" content="{BASE}/assets/og-image.png"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{r}favicon.ico" sizes="any"><link rel="icon" href="{r}assets/favicon.svg" type="image/svg+xml"><link rel="icon" href="{r}assets/favicon-32.png" sizes="32x32" type="image/png"><link rel="apple-touch-icon" href="{r}assets/apple-touch-icon.png"><link rel="manifest" href="{r}site.webmanifest">
<link rel="preload" href="{r}assets/fonts/martian-mono-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="{r}assets/fonts/instrument-sans-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{r}assets/site/site.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="nav"><div class="wrap">
  <a class="brand" href="{r}index.html"><img src="{r}assets/mark.svg" alt="" width="28" height="28"><span>Akaththi Research</span><i class="cur" aria-hidden="true"></i><small>Science for living systems</small></a>
  <nav aria-label="Main">{nav}</nav>
  <a class="btn" href="{r}collaborate/index.html#enquire">Collaborate</a>
</div></header>
<main id="main">
{body}
</main>
<footer><div class="wrap">
  <span>&copy; 2026 Akaththi Research, a unit of Akaththi Farms Private Limited. Chennai, India.</span>
  <span class="fam">Akaththi: <a href="https://akaththifarms.com/">Farms</a> &middot; <a href="https://akaththi-labs.github.io/akaththi-labs/">Labs</a> &middot; Research &middot; <a href="https://github.com/akaththi-research">GitHub</a></span>
</div></footer>
<script src="{r}assets/site/site.js"></script>
</body>
</html>
'''
tag=lambda s:f'<span class="st st-{s}">{s}</span>'
# ---------- research map ----------
def research_map():
    cx,cy,R=320,260,150
    o=f'<svg id="rmap" viewBox="0 0 640 520" role="group" aria-label="Research areas around a working farm, with open space beyond the boundary.">'
    o+=f'<circle cx="{cx}" cy="{cy}" r="236" class="ring-out"/>'
    for k in range(4):
        a=k*math.pi/2+.4;o+=f'<rect x="{cx+236*math.cos(a)-5:.1f}" y="{cy+236*math.sin(a)-5:.1f}" width="10" height="10" class="dia" transform="rotate(45 {cx+236*math.cos(a):.1f} {cy+236*math.sin(a):.1f})"/>'
    o+=f'<text x="{cx}" y="{cy-246}" text-anchor="middle" class="m">Beyond the boundary</text>'
    o+=f'<circle cx="{cx}" cy="{cy}" r="{R}" class="ring-in"/>'
    for i,(k,short,name,txt,st) in enumerate(AREAS):
        a=-math.pi/2+i*math.pi/3;x=cx+R*math.cos(a);y=cy+R*math.sin(a)
        o+=f'<line x1="{cx}" y1="{cy}" x2="{x:.1f}" y2="{y:.1f}" class="spoke"/>'
        o+=f'<g class="node" tabindex="0" role="button" data-k="{k}" aria-label="{name}"><circle cx="{x:.1f}" cy="{y:.1f}" r="42"/><text x="{x:.1f}" y="{y+4:.1f}" text-anchor="middle">{short}</text></g>'
    o+=f'<circle cx="{cx}" cy="{cy}" r="62" class="core"/><text x="{cx}" y="{cy-3}" text-anchor="middle" class="core-t">Working</text><text x="{cx}" y="{cy+15}" text-anchor="middle" class="core-t">farm</text></svg>'
    o+='<div class="rcap" id="rcap" aria-live="polite"><b>Choose an area.</b><span>Each one is tested on a working farm, not only in a lab.</span></div>'
    return o
data=','.join(f'"{k}":["{name}","{txt}","{st}"]' for k,short,name,txt,st in AREAS)
# ---------- pipeline ----------
steps=[('01','Question','Something we want to know, written down before we start.'),('02','Experiment','A small, controlled test with the readings logged.'),('03','Proof of concept','Does the idea work at all? We show it on a bench or a single run.'),('04','Working research','Repeated runs on a working farm, in real heat and humidity.'),('05','Shared','Protocols and data, published once they are checked.')]
pipe='<ol class="pipe">'+''.join(f'<li><span class="n">{n}</span><b>{t}</b><p>{d}</p></li>' for n,t,d in steps)+'</ol>'
# ---------- home ----------
home=f'''<section class="hero2"><div class="wrap">
  <div class="hcopy">
    <span class="eyebrow">Akaththi Research &middot; Chennai, India</span>
    <h1>Whatever sparks <br>our <em>curiosity.</em></h1>
    <p class="lead">There are no boundaries to what we research. If something can be measured and made to work better, we ask the question, build a proof of concept and test it on a working farm.</p>
    <p class="prompt" aria-hidden="true"><span class="ps">$</span>research --ask anything<span class="cursor"></span></p>
    <div class="cta"><a class="btn solid" href="projects/index.html">See the research</a><a class="btn" href="collaborate/index.html">Work with us</a></div>
  </div>
</div></section>
'''+f'''
<section class="band"><div class="wrap">
  <span class="eyebrow">How a question becomes research</span>
  <h2>From idea to <em>working research.</em></h2>
  <p class="s">We start small, prove an idea can work, and then test it again and again on a working farm. Nothing is published until it has been checked.</p>
  {pipe}
</div></section>
<section class="band alt"><div class="wrap">
  <span class="eyebrow">Current interests</span>
  <h2>What we are on right now.</h2>
  <div class="cards">'''+''.join(f'<a class="card" href="projects/index.html#{k}"><div class="ch"><span class="no">0{i+1}</span>{tag(st)}</div><h3>{name}</h3><p>{txt}</p></a>' for i,(k,short,name,txt,st) in enumerate(AREAS))+f'''
  <a class="card open" href="projects/index.html#beyond"><div class="ch"><span class="no">+</span><span class="st st-direction">direction</span></div><h3>And anything else that makes us curious</h3><p>No boundaries. Any field, any question that can be measured. Each one starts as a proof of concept.</p></a>
  </div>
  <p class="legend"><b>running</b> means experiments are underway. <b>exploring</b> means we are reading and testing ideas. <b>direction</b> means an open area with no fixed limit. Nothing is published yet.</p>
</div></section>
<section class="band"><div class="wrap">
  <span class="eyebrow">How we work</span>
  <div class="trio">
    <div><h3>Measure first</h3><p>Every claim comes from logged data from a real run, repeated before we conclude anything.</p></div>
    <div><h3>Say what we do not know</h3><p>Failed runs and negative results are recorded with the successful ones.</p></div>
    <div><h3>Test on a working farm</h3><p>Results have to hold up outside a lab, in the heat and humidity of a real farm.</p></div>
  </div>
</div></section>
<section class="band cta-band"><div class="wrap">
  <h2>Have a question that needs <em>a real growing space?</em></h2>
  <p class="s">We work with universities, institutes, research firms and growers.</p>
  <a class="btn solid" href="collaborate/index.html#enquire">Collaborate with us</a>
</div></section>'''
# ---------- projects ----------
detail={
 'mushroom':('Our first and main area. Exotic oyster is being grown in Chennai with every run logged, and king oyster is next.',['Strains: which ones cope with tropical heat and humidity, compared under the same logged conditions','Cultivation: runs repeated on a working farm, so results are not one-off','Spawn efficiency: how much spawn a run needs, and what quality and handling change']),
 'cooling':('Keeping a growing room cool at low effort, where the weather is hot.',['Ways to lower cooling effort in hot weather','Advanced HVAC: how airflow and humidity interact inside a growing room','Control approaches compared under the same conditions']),
 'automation':('Sensing, control and data logging that make runs repeatable.',['Sensor and logging methods that someone else can repeat','Control approaches tested on a working farm','Data kept in a form that makes runs easy to compare']),
 'energy':('How much energy a run uses, and how that changes with the weather.',['Energy measured next to climate, run by run','Where the biggest loads are, and what could lower them','Other sources of energy for a growing room']),
}
rows=''.join(f'''<article class="proj" id="{k}"><div class="pn">0{i+1}</div><div class="pb"><div class="ph"><h2>{name}</h2>{tag(st)}</div><p>{detail[k][0]}</p><ul class="ul2">{''.join(f"<li>{x}</li>" for x in detail[k][1])}</ul></div></article>''' for i,(k,short,name,txt,st) in enumerate(AREAS))
projects=f'''<section class="pagehero"><div class="wrap"><span class="eyebrow">Research</span><h1>What we study, <em>and how far it has got.</em></h1><p>Work is organised as projects. Each one moves from a question to a proof of concept, and then to working research on a farm.</p></div></section>
<div class="wrap">{pipe}</div>
<section class="band"><div class="wrap projs">{rows}
<article class="proj" id="beyond"><div class="pn">+</div><div class="pb"><div class="ph"><h2>Beyond the boundaries</h2><span class="st st-direction">direction</span></div><p>We set no boundary on the questions. When something can be measured and made to work better, we explore it as a proof of concept first, and say so on this page when work starts.</p></div></article>
<p class="legend"><b>running</b>: experiments are underway. <b>exploring</b>: we are reading and testing ideas. <b>direction</b>: an open area with no fixed limit. Nothing is published yet. Results will be added here once they are checked.</p>
</div></section>
<section class="band cta-band"><div class="wrap"><h2>Want to test something <em>with us?</em></h2><p class="s">Tell us the question. We will tell you honestly if a working farm can answer it.</p><a class="btn solid" href="../collaborate/index.html#enquire">Collaborate with us</a></div></section>'''
# ---------- collaborate ----------
def row(h,b): return f'<section class="rowsec"><div class="wrap split2"><h2>{h}</h2><div>{b}</div></div></section>'
ul=lambda l:'<ul class="ul2">'+''.join(f'<li>{i}</li>' for i in l)+'</ul>'
collab=f'''<section class="pagehero"><div class="wrap"><span class="eyebrow">Collaborate</span><h1>Bring the question. <em>We bring the farm.</em></h1><p>We work with universities, institutes, research firms and growers on questions that need a real, measured growing space.</p></div></section>
<div class="wrap"><dl class="spec2"><dt>status</dt><dd><span class="st st-running">open</span> Open to enquiries.</dd><dt>for</dt><dd>Researchers, institutes, firms and growers, in India and abroad.</dd></dl></div>
{row("What we bring",ul(["A working farm in Chennai to test on, in real heat and humidity.","Logged climate and growth data from each run.","Written protocols, so a run can be repeated by someone else.","Automation and cooling know-how from our sister unit, Akaththi Labs."]))}
{row("What we look for",ul(["Co-investigators on a shared question.","Methods we do not have, such as genetics, microbiology or analysis.","Students and visiting researchers who want data from a working farm.","Growers with problems worth measuring."]))}
{row("Before work starts","<p>We agree in writing what is being studied, who owns the data, who may publish, and who holds any rights that come out of it.</p><p>Findings that lead to a product may be published after they are protected.</p>")}
<section class="band alt" id="enquire"><div class="wrap enq"><div><span class="eyebrow">Enquire</span><h2>Tell us what you want <em>to learn.</em></h2><p class="s">Who you are, what you want to learn and what you can bring. We read every enquiry.</p><p class="addr">Akaththi Research<br>Chennai, Tamil Nadu, India</p></div>
<form id="f" novalidate><label for="fn">Your name<input id="fn" autocomplete="name"></label><label for="fo">Organisation<input id="fo" autocomplete="organization"></label><label for="fi">Area<select id="fi"><option>Mushroom research</option><option>Cooling technology and HVAC</option><option>Automation</option><option>Energy</option><option>Something else</option></select></label><label for="fm">The question<textarea id="fm" placeholder="What do you want to find out?"></textarea></label><button class="btn solid" type="submit">Send enquiry</button><p class="note" id="note" role="status">Sending opens a public GitHub issue, so your message will be public. Leave out anything private.</p></form></div></section>'''
# ---------- about ----------
about=f'''<section class="pagehero"><div class="wrap"><span class="eyebrow">About</span><h1>Akaththi Research studies <em>anything that can be measured.</em></h1><p>We are based in Chennai, Tamil Nadu. Our focus now is mushroom cultivation in tropical climates, and the technology around it.</p></div></section>
{row("How we work",ul(["Measure before we claim.","Record failed runs as carefully as good ones.","Test on a working farm, not only in a lab.","Say what exists, what is running and what is only planned."]))}
{row("Where things stand","<p>Our current interests are mushrooms, cooling technology, automation and energy. Other fields are open to questions, and nothing is published yet. This site will carry protocols, datasets and papers as they are checked, and will say plainly when something is still a question.</p>")}
<section class="rowsec"><div class="wrap split2"><h2>One Akaththi</h2><div><div class="fam3"><a href="https://akaththifarms.com/"><b>Farms</b><p>Grows mushrooms and microgreens, and makes value-added products.</p><span class="go">Visit Farms &rarr;</span></a><a href="https://akaththi-labs.github.io/akaththi-labs/"><b>Labs</b><p>Automation and technology for agriculture, and managed farms.</p><span class="go">Visit Labs &rarr;</span></a><div class="on"><b>Research</b><p>All research, from cultivation to technology. You are here.</p></div></div></div></div></section>'''
nf='<section class="pagehero"><div class="wrap"><span class="eyebrow">404</span><h1>Page <em>not found.</em></h1><p class="prompt"><span class="ps">$</span>research open this-page<span class="cursor"></span></p><p>That address does not lead anywhere. Start from the <a href="/akaththi-research/index.html">home page</a>, or choose an area from the menu.</p></div></section>'
PAGES=[('',"Science for living systems","Akaththi Research studies anything that can be measured: mushrooms, cooling technology, automation and energy, and anything else that makes us curious.",home,''),
 ('projects','Research',"Akaththi Research areas: mushrooms, cooling technology, automation and energy, from proof of concept to working research.",projects,'projects'),
 ('collaborate','Collaborate',"Akaththi Research works with universities, institutes, research firms and growers on questions that need a real, measured growing space.",collab,'collaborate'),
 ('about','About',"Akaththi Research studies anything that can be measured, starting with mushroom cultivation in tropical climates. Based in Chennai, India.",about,'about'),
 ('404','Page not found','This page does not exist.',nf,'')]
sitemap=[]
for slug,t,d,b,act in PAGES:
    out='index.html' if slug=='' else '404.html' if slug=='404' else f'{slug}/index.html'
    os.makedirs(os.path.dirname(os.path.join(root,out)) or root,exist_ok=True)
    open(os.path.join(root,out),'w',encoding='utf-8').write(page(slug,t,d,b,act));print('wrote',out)
    if slug!='404':sitemap.append(BASE+('/' if slug=='' else f'/{slug}/'))
open(os.path.join(root,'sitemap.xml'),'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{u}</loc></url>\n' for u in sitemap)+'</urlset>\n')
open(os.path.join(root,'robots.txt'),'w').write(f'User-agent: *\nAllow: /\n\nSitemap: {BASE}/sitemap.xml\n')
open(os.path.join(root,'assets/site/areas.json'),'w').write('{'+data+'}')
