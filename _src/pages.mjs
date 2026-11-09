import { enquiry } from "./layout.mjs";

// Closing enquiry block shared by the inner pages.
function closing(lead) {
  const e = enquiry();
  return `
    <section class="section section-rule">
      <div class="wrap">
        <div class="prose">
          <h2 class="h2">Ask about this</h2>
          <p>${lead}</p>
          <a class="button" href="${e.href}">Send an enquiry</a>
          ${e.note ? `<p class="note">${e.note}</p>` : ""}
        </div>
      </div>
    </section>`;
}

const home = {
  slug: "",
  path: "/",
  file: "index.html",
  title: "Science for living systems",
  description:
    "Akaththi Research studies anything that can be measured. Our focus now is cultivation.",
  body: (r) => `
    <section class="wrap hero">
      <p class="eyebrow">Akaththi Research &middot; Chennai, India</p>
      <h1 class="display">Science for living systems.</h1>
      <p class="lead">We research anything that can be measured and made to work better. Our focus now is cultivation, tested on a working farm.</p>
      <p class="prompt" aria-hidden="true"><span class="ps">$</span><span class="type">focus: cultivation</span><span class="cursor"></span></p>
    </section>

    <section class="section section-rule" aria-labelledby="areas-title">
      <div class="wrap">
        <h2 id="areas-title" class="h2 band-title">What we are asking</h2>
        <ul class="products">
          <li>
            <a href="${r}cultivation-science/index.html">
              <span class="p-no">01</span>
              <span class="p-name">Cultivation science</span>
              <span class="p-what">How a crop responds to its climate, stage by stage, measured in a real growing space.</span>
              <span class="tag tag-planned">planned</span>
            </a>
          </li>
          <li>
            <a href="${r}collaborate/index.html">
              <span class="p-no">02</span>
              <span class="p-name">Anything else</span>
              <span class="p-what">If a question can be measured, we will look at it. Bring it to us, from any field.</span>
              <span class="tag tag-design">open</span>
            </a>
          </li>
        </ul>
        <p class="legend"><strong>planned</strong> means on our roadmap and not started. <strong>running</strong> means experiments are underway. <strong>published</strong> means results are public. <strong>open</strong> means we take questions now. Nothing is published yet.</p>
      </div>
    </section>

    <section class="section section-rule" aria-labelledby="rules-title">
      <div class="wrap">
        <h2 id="rules-title" class="h2 band-title">How we work</h2>
        <div class="crops">
          <div>
            <h3 class="h3">Measure first</h3>
            <p>Every claim comes from logged data from a real run, repeated before we conclude anything.</p>
          </div>
          <div>
            <h3 class="h3">Say what we do not know</h3>
            <p>Failed runs and negative results are recorded with the successful ones.</p>
          </div>
          <div>
            <h3 class="h3">Test on a working farm</h3>
            <p>Results have to hold up outside a lab, in the heat and humidity of a real farm.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-rule" aria-labelledby="horizon-title">
      <div class="wrap">
        <h2 id="horizon-title" class="h2 band-title">Where we are going</h2>
        <div class="horizon">
          <div>
            <p class="when">Now</p>
            <h3 class="h3">Cultivation</h3>
            <p>Cultivation science, starting with mushrooms and microgreens.</p>
            <p class="tag tag-planned">planned</p>
          </div>
          <div>
            <p class="when">Next</p>
            <h3 class="h3">Any crop, any system</h3>
            <p>Saffron and other crops, then any system that can be grown, built and measured the same way.</p>
            <p class="tag tag-design">exploring</p>
          </div>
          <div>
            <p class="when">Later</p>
            <h3 class="h3">Life science, health and beyond</h3>
            <p>A direction, with no fixed limit. When work starts in a new field, this page will say so.</p>
            <p class="tag tag-planned">direction</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-rule" id="enquire-home">
      <div class="wrap split">
        <h2 class="h2">Who we work with</h2>
        <div>
          <dl class="audiences">
            <div><dt>Universities and institutes</dt><dd>Joint questions that need a real, measured growing space.</dd></div>
            <div><dt>Research firms</dt><dd>Methods we do not have, such as genetics, microbiology or analysis, in exchange for a working farm to test on.</dd></div>
            <div><dt>Growers</dt><dd>Problems worth measuring. Tell us what goes wrong on your farm.</dd></div>
          </dl>
          <a class="button" href="${r}collaborate/index.html">Work with us</a>
        </div>
      </div>
    </section>`,
};

const cultivation = {
  slug: "cultivation-science",
  path: "/cultivation-science/",
  file: "cultivation-science/index.html",
  title: "Cultivation science",
  description:
    "Akaththi Research studies how crops respond to climate stage by stage, measured in a real growing space.",
  body: (r) => `
    <section class="wrap head">
      <h1 class="page-title">Cultivation science</h1>
      <p class="lead">How a crop responds to its climate, stage by stage, measured in a real growing space.</p>
      <dl class="spec">
        <dt>status</dt><dd><span class="mono st-planned">planned</span>. Nothing is published yet.</dd>
        <dt>crops</dt><dd>Mushrooms and microgreens first. Saffron is under study.</dd>
        <dt>output</dt><dd>Written protocols and datasets, shared once they are checked.</dd>
      </dl>
    </section>

    <section class="section">
      <div class="wrap split">
        <h2 class="h2">Questions we are asking</h2>
        <ul class="list flush">
          <li>Which temperature, humidity, CO2 and light windows does each stage need, and how far can they drift before quality or yield drops?</li>
          <li>Which routes bring contamination in, and which controls actually reduce it?</li>
          <li>How do locally available substrates and inputs change yield and consistency?</li>
          <li>What does a good record of a grow cycle look like, so one run can be compared with the next?</li>
        </ul>
      </div>
    </section>

    <section class="section section-rule">
      <div class="wrap split">
        <h2 class="h2">How we measure</h2>
        <ul class="list flush">
          <li>Controlled runs with a fixed setup and logged readings.</li>
          <li>Repeats before we conclude anything.</li>
          <li>The same measurements across crops, so results can be compared.</li>
          <li>Failed runs recorded with the successful ones.</li>
        </ul>
      </div>
    </section>
${closing("Want to work on a question here, or share a problem from your farm?")}`,
};

const collaborate = {
  slug: "collaborate",
  path: "/collaborate/",
  file: "collaborate/index.html",
  title: "Collaborate",
  description:
    "Akaththi Research works with universities, institutes and research firms on questions that need a real, measured growing space.",
  body: (r) => `
    <section class="wrap head">
      <h1 class="page-title">Collaborate</h1>
      <p class="lead">We work with universities, institutes and research firms on questions that need a real, measured growing space.</p>
      <dl class="spec">
        <dt>status</dt><dd>Open to enquiries.</dd>
        <dt>for</dt><dd>Researchers, institutes and firms, in India and abroad.</dd>
      </dl>
    </section>

    <section class="section">
      <div class="wrap split">
        <h2 class="h2">What we bring</h2>
        <ul class="list flush">
          <li>A working farm in Chennai to test on, in real heat and humidity.</li>
          <li>Logged climate and growth data from each run. <span class="mono st-building">building</span></li>
          <li>Written protocols, so a run can be repeated by someone else.</li>
        </ul>
      </div>
    </section>

    <section class="section section-rule">
      <div class="wrap split">
        <h2 class="h2">What we look for</h2>
        <ul class="list flush">
          <li>Co-investigators on a shared question.</li>
          <li>Methods we do not have, such as genetics, microbiology or analysis.</li>
          <li>Students and visiting researchers who want data from a working farm.</li>
        </ul>
      </div>
    </section>

    <section class="section section-rule">
      <div class="wrap split">
        <h2 class="h2">Before work starts</h2>
        <div class="prose">
          <p>We agree in writing what is being studied, who owns the data, who may publish, and who holds any rights that come out of it.</p>
          <p>Findings that lead to a product may be published after they are protected.</p>
        </div>
      </div>
    </section>
${closing("Tell us who you are, what you want to learn and what you can bring. We read every enquiry.")}`,
};

const about = {
  slug: "about",
  path: "/about/",
  file: "about/index.html",
  title: "About",
  description:
    "Akaththi Research studies anything that can be measured, in any field, starting with cultivation. Based in Chennai, India.",
  body: (r) => {
    const e = enquiry();
    return `
    <section class="wrap head">
      <h1 class="page-title">About Akaththi Research</h1>
      <p class="lead">Akaththi Research studies anything that can be measured and made to work better. We are based in Chennai, Tamil Nadu, and our focus now is cultivation.</p>
    </section>

    <section class="section">
      <div class="wrap split">
        <h2 class="h2">How we work</h2>
        <ul class="list flush">
          <li>Measure before we claim.</li>
          <li>Record failed runs as carefully as good ones.</li>
          <li>Test on a working farm, not only in a lab.</li>
          <li>Say what exists, what is running and what is only planned.</li>
        </ul>
      </div>
    </section>

    <section class="section section-rule">
      <div class="wrap split">
        <h2 class="h2">Where things stand</h2>
        <div class="prose">
          <p>Our first areas are planned, other fields are open to questions, and nothing is published yet. This site will carry protocols, datasets and papers as they are checked, and will say plainly when something is still a question.</p>
        </div>
      </div>
    </section>

    <section class="section section-rule" id="enquire">
      <div class="wrap split">
        <h2 class="h2">Enquiries</h2>
        <div class="prose">
          <p>Tell us who you are and what you want to learn. We read every enquiry.</p>
          <a class="button" href="${e.href}">Send an enquiry</a>
          ${e.note ? `<p class="note">${e.note}</p>` : ""}
        </div>
      </div>
    </section>`;
  },
};

const notFound = {
  slug: "404",
  path: "/404.html",
  file: "404.html",
  root: "base",
  title: "Page not found",
  description: "This page does not exist.",
  body: (r) => `
    <section class="wrap head head-404">
      <h1 class="page-title">Page not found</h1>
      <p class="error-out" aria-hidden="true">$ research open this-page<br>error: no such page</p>
      <p class="lead">That address does not lead anywhere. Start from the <a href="${r}">home page</a>, or choose an area from the menu.</p>
    </section>`,
};

export const PAGES = [home, cultivation, collaborate, about, notFound];
