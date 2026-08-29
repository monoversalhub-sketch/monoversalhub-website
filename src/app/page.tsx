import { HomepageSchema } from "@/components/structured-data";
import Nav from '@/components/Nav.client'
import LegacyLoader from '@/components/LegacyLoader.client'

export default function HomePage() {
  return (
    <>
      <HomepageSchema tailorCount={500} ratingValue={4.8} ratingCount={500} />
      <Nav />
      <LegacyLoader html={websiteHtml} />
    </>
  );
}

// NOTE (2026-08-29): The original legacy HTML/CSS this component used to
// render was not actually present in the repository — it had been replaced
// with placeholder comments (see CLAUDE.md for details). Everything below
// was rebuilt from scratch using verified facts pulled from elsewhere in
// this codebase (admin dashboard, structured-data.tsx, README) rather than
// invented copy. Treat the marketing copy as a functional placeholder —
// swap in the real copy whenever you have it. Base layout styles (nav,
// container, buttons) live in globals.css and are loaded once via
// layout.tsx; the <style> block below only adds section-specific styles.
//
// UPDATE (2026-08-29, part 2): "SOVR" product replaced with a Web
// Development service offering per request — this includes its own landing
// page (id="webdev") with services, a portfolio grid, and a testimonials
// section. Portfolio entries below are placeholders (clearly marked) —
// swap in real client projects when ready.

const websiteHtml = `
<style>
/* PAGE SYSTEM */
.page{display:none;min-height:100vh;padding-top:var(--nav-h);animation:fadeIn .3s ease}
.page.active{display:block}
@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}

/* HERO */
.hero{padding:96px 0 64px;text-align:center}
.hero .h1{font-size:44px;line-height:1.1;margin:0 0 16px}
.hero p{color:var(--sub, #9ca3af);font-size:17px;max-width:560px;margin:0 auto 28px}
.hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn-outline{display:inline-block;padding:12px 18px;border-radius:8px;border:1px solid var(--border2, rgba(255,255,255,.12));color:var(--text);text-decoration:none;font-weight:600}

/* SMALLER SUB-HERO (used on webdev page) */
.sub-hero{padding:72px 0 48px;text-align:center}
.sub-hero .h1{font-size:36px;line-height:1.15;margin:0 0 14px}
.sub-hero p{color:var(--sub, #9ca3af);font-size:16px;max-width:560px;margin:0 auto 24px}

/* GENERIC SECTION HEADERS */
.sec-head{text-align:center;max-width:620px;margin:0 auto 40px}
.sec-head h2{font-family:var(--font-d);font-size:30px;margin:0 0 10px}
.sec-head p{color:var(--sub, #9ca3af);margin:0}
.sec-block{padding:56px 0}
.sec-block:first-of-type{padding-top:8px}

/* PRODUCT CARDS */
.grid-products{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:900px;margin:0 auto}
.card{background:var(--surface, #111118);border:1px solid var(--border, rgba(255,255,255,.07));border-radius:var(--r, 14px);padding:28px;text-align:left}
.card h3{font-family:var(--font-d);font-size:20px;margin:0 0 8px}
.card p{color:var(--sub, #9ca3af);font-size:14px;line-height:1.6;margin:0 0 16px}
.tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;padding:4px 10px;border-radius:999px;background:rgba(245,166,35,.12);color:var(--accent, #f5a623);margin-bottom:12px}

/* ABOUT */
.about-body{max-width:640px;margin:0 auto;text-align:center;color:var(--sub, #9ca3af);line-height:1.8}

/* SERVICES GRID (web dev page) */
.grid-services{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px;max-width:960px;margin:0 auto}
.service-card{background:var(--surface, #111118);border:1px solid var(--border, rgba(255,255,255,.07));border-radius:var(--r, 14px);padding:24px}
.service-card .icon{font-size:22px;margin-bottom:10px}
.service-card h3{font-family:var(--font-d);font-size:17px;margin:0 0 8px}
.service-card p{color:var(--sub, #9ca3af);font-size:13px;line-height:1.6;margin:0}

/* PORTFOLIO GRID (web dev page) */
.grid-portfolio{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;max-width:960px;margin:0 auto}
.portfolio-card{background:var(--surface, #111118);border:1px solid var(--border, rgba(255,255,255,.07));border-radius:var(--r, 14px);overflow:hidden;text-align:left}
.portfolio-thumb{height:140px;background:linear-gradient(135deg, rgba(245,166,35,.18), rgba(45,212,191,.14));display:flex;align-items:center;justify-content:center;font-family:var(--font-d);font-weight:700;color:var(--sub, #9ca3af);font-size:13px}
.portfolio-body{padding:18px 20px}
.portfolio-body h3{font-family:var(--font-d);font-size:16px;margin:0 0 6px}
.portfolio-body p{color:var(--sub, #9ca3af);font-size:13px;line-height:1.6;margin:0 0 10px}
.portfolio-tag{font-size:11px;color:var(--muted, #6b7280)}
.portfolio-note{max-width:960px;margin:24px auto 0;text-align:center;color:var(--muted, #6b7280);font-size:12px}

/* TESTIMONIALS */
.grid-testimonials{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;max-width:900px;margin:0 auto}
.t-card{background:var(--surface, #111118);border:1px solid var(--border, rgba(255,255,255,.07));border-radius:var(--r, 14px);padding:22px}
.t-card p{font-size:14px;line-height:1.6;margin:0 0 12px}
.t-name{font-weight:700;font-size:13px}
.t-role{color:var(--muted, #6b7280);font-size:12px}
.t-empty{color:var(--muted, #6b7280);text-align:center;grid-column:1/-1}

/* FORMS */
.form-wrap{max-width:480px;margin:0 auto}
.form-row{margin-bottom:14px}
.form-row label{display:block;font-size:13px;color:var(--sub, #9ca3af);margin-bottom:6px}
.form-row input,.form-row select,.form-row textarea{
  width:100%;padding:11px 12px;border-radius:8px;border:1px solid var(--border2, rgba(255,255,255,.12));
  background:var(--surface2, #18181f);color:var(--text);font-family:inherit;font-size:14px;
}
.form-row textarea{min-height:110px;resize:vertical}
.form-submit{width:100%;padding:12px;border-radius:8px;border:none;background:var(--accent, #f5a623);color:#000;font-weight:700;font-size:14px;cursor:pointer}
.form-submit:disabled{opacity:.6;cursor:not-allowed}
.form-note{font-size:13px;margin-top:12px;text-align:center;min-height:18px}
.form-note.ok{color:var(--green, #4ade80)}
.form-note.err{color:var(--red, #f87171)}

/* FAQ */
.faq-list{max-width:640px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.faq-item{background:var(--surface, #111118);border:1px solid var(--border, rgba(255,255,255,.07));border-radius:var(--r-sm, 8px);padding:16px 18px}
.faq-item summary{cursor:pointer;font-weight:600;list-style:none}
.faq-item summary::-webkit-details-marker{display:none}
.faq-item[open] summary{margin-bottom:8px}
.faq-item p{color:var(--sub, #9ca3af);font-size:14px;line-height:1.6;margin:0}

/* SUPPORT */
.support-links{max-width:480px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.support-link{display:flex;align-items:center;gap:12px;padding:16px;border-radius:var(--r-sm, 8px);background:var(--surface, #111118);border:1px solid var(--border, rgba(255,255,255,.07));color:var(--text);text-decoration:none}

.footer{padding:48px 0;border-top:1px solid var(--border, rgba(255,255,255,.07));font-size:13px;color:var(--muted, #6b7280);text-align:center}
</style>

<div id="legacy-root">

  <section class="page active" id="home">
    <div class="container hero">
      <h1 class="h1">Build Trust. Grow Faster.</h1>
      <p>Monoversal Hub is home to BOSS — our live trust-building product for
        businesses — and our web development studio, where we design and
        build websites and web apps for clients.</p>
      <div class="hero-ctas">
        <a class="btn" href="#" onclick="event.preventDefault(); window.show('webdev')">Get a website built →</a>
        <a class="btn-outline" href="#" onclick="event.preventDefault(); window.show('products')">See our products</a>
      </div>
    </div>
  </section>

  <section class="page" id="products">
    <div class="container">
      <div class="sec-head">
        <h2>Products &amp; Services</h2>
        <p>What we're building — and building for you — at Monoversal Hub.</p>
      </div>
      <div class="grid-products">
        <div class="card">
          <span class="tag">Live</span>
          <h3>BOSS</h3>
          <p>Helps businesses build customer trust and track reputation.
            Currently live — try the app to see it in action.</p>
          <a class="btn-outline" href="https://boss-app-nine.vercel.app" target="_blank" rel="noopener noreferrer">Try BOSS →</a>
        </div>
        <div class="card">
          <span class="tag">Service</span>
          <h3>Web Development</h3>
          <p>We design and build websites and web applications for clients —
            from marketing sites to full products. See our work and services.</p>
          <a class="btn-outline" href="#" onclick="event.preventDefault(); window.show('webdev')">View our work →</a>
        </div>
      </div>
    </div>
  </section>

  <section class="page" id="about">
    <div class="container">
      <div class="sec-head">
        <h2>About Monoversal Hub</h2>
      </div>
      <div class="about-body">
        <p>Monoversal Hub builds products that help businesses build trust
          and grow faster — starting with BOSS, now live — and we also run a
          web development studio building websites and web apps for clients.
          We're a registered business (CAC BN 9319562) focused on shipping
          useful work, not just ideas.</p>
      </div>
    </div>
  </section>

  <!-- WEB DEVELOPMENT — services, portfolio, and testimonials landing page -->
  <section class="page" id="webdev">
    <div class="container sub-hero">
      <h1 class="h1">Web Development, done right</h1>
      <p>We design and build fast, modern websites and web applications for
        businesses — from landing pages to full products, backed by our own
        engineering standards.</p>
      <div class="hero-ctas">
        <a class="btn" href="#" onclick="event.preventDefault(); window.show('care')">Start a project →</a>
      </div>
    </div>

    <div class="container sec-block">
      <div class="sec-head">
        <h2>Services</h2>
        <p>What we offer, end to end.</p>
      </div>
      <div class="grid-services">
        <div class="service-card">
          <div class="icon">🖥️</div>
          <h3>Marketing &amp; landing sites</h3>
          <p>Fast, conversion-focused websites for businesses and product launches.</p>
        </div>
        <div class="service-card">
          <div class="icon">⚙️</div>
          <h3>Web applications</h3>
          <p>Custom-built web apps and dashboards, from MVP to production.</p>
        </div>
        <div class="service-card">
          <div class="icon">🛒</div>
          <h3>E-commerce</h3>
          <p>Online stores built to convert, with payments and inventory handled.</p>
        </div>
        <div class="service-card">
          <div class="icon">🔧</div>
          <h3>Maintenance &amp; support</h3>
          <p>Ongoing updates, hosting, and support for existing sites and apps.</p>
        </div>
      </div>
    </div>

    <div class="container sec-block">
      <div class="sec-head">
        <h2>Our work</h2>
        <p>A few projects we've delivered for clients.</p>
      </div>
      <div class="grid-portfolio" id="portfolio-grid">
        <div class="portfolio-card">
          <div class="portfolio-thumb">Project One</div>
          <div class="portfolio-body">
            <h3>Client Project — Marketing Site</h3>
            <p>Placeholder — replace with a real client project name, a short
              description of what was built, and a link.</p>
            <div class="portfolio-tag">Website · Placeholder</div>
          </div>
        </div>
        <div class="portfolio-card">
          <div class="portfolio-thumb">Project Two</div>
          <div class="portfolio-body">
            <h3>Client Project — Web App</h3>
            <p>Placeholder — replace with a real client project name, a short
              description of what was built, and a link.</p>
            <div class="portfolio-tag">Web App · Placeholder</div>
          </div>
        </div>
        <div class="portfolio-card">
          <div class="portfolio-thumb">Project Three</div>
          <div class="portfolio-body">
            <h3>Client Project — E-commerce</h3>
            <p>Placeholder — replace with a real client project name, a short
              description of what was built, and a link.</p>
            <div class="portfolio-tag">E-commerce · Placeholder</div>
          </div>
        </div>
      </div>
      <p class="portfolio-note">Portfolio entries above are placeholders — swap
        in your real client projects (name, description, link, screenshot).</p>
    </div>

    <div class="container sec-block">
      <div class="sec-head">
        <h2>What clients say</h2>
        <p>Feedback from people we've worked with.</p>
      </div>
      <div class="grid-testimonials" id="webdev-testimonials-grid">
        <div class="t-empty">Loading testimonials…</div>
      </div>
    </div>
  </section>

  <section class="page" id="testimonials">
    <div class="container">
      <div class="sec-head">
        <h2>What people are saying</h2>
        <p>Real feedback from people using our products and services.</p>
      </div>
      <div class="grid-testimonials" id="testimonials-grid">
        <div class="t-empty">Loading testimonials…</div>
      </div>
    </div>
  </section>

  <section class="page" id="support">
    <div class="container">
      <div class="sec-head">
        <h2>Support</h2>
        <p>Need help with a Monoversal product or an ongoing project? Reach out below.</p>
      </div>
      <div class="support-links">
        <a class="support-link" href="mailto:monoversalhub@gmail.com">✉️ monoversalhub@gmail.com</a>
        <a class="support-link" href="#" onclick="event.preventDefault(); window.show('care')">📞 Contact us directly →</a>
        <a class="support-link" href="#" onclick="event.preventDefault(); window.show('faq')">❓ Check the FAQ →</a>
      </div>
    </div>
  </section>

  <section class="page" id="care">
    <div class="container">
      <div class="sec-head">
        <h2>Contact us</h2>
        <p>Send us a message — whether it's about BOSS or a web development project — and we'll get back to you by email.</p>
      </div>
      <form class="form-wrap" id="contact-form">
        <div class="form-row"><label>First name</label><input type="text" name="fname" required /></div>
        <div class="form-row"><label>Last name</label><input type="text" name="lname" /></div>
        <div class="form-row"><label>Email</label><input type="email" name="email" required /></div>
        <div class="form-row"><label>Subject</label><input type="text" name="subject" /></div>
        <div class="form-row"><label>Message</label><textarea name="message" required></textarea></div>
        <button class="form-submit" type="submit">Send message</button>
        <div class="form-note" id="contact-note"></div>
      </form>
    </div>
  </section>

  <section class="page" id="faq">
    <div class="container">
      <div class="sec-head">
        <h2>Frequently asked questions</h2>
      </div>
      <div class="faq-list">
        <details class="faq-item">
          <summary>What is Monoversal Hub?</summary>
          <p>Monoversal Hub builds BOSS (live now) and also runs a web
            development studio, building websites and web apps for clients.</p>
        </details>
        <details class="faq-item">
          <summary>What is BOSS?</summary>
          <p>BOSS is Monoversal's live product, built to help businesses
            build trust with customers. Try it at the link in the Products
            section.</p>
        </details>
        <details class="faq-item">
          <summary>Do you build custom websites for clients?</summary>
          <p>Yes — see the Web Development page for our services and recent
            work, or contact us to start a project.</p>
        </details>
        <details class="faq-item">
          <summary>How can I contact Monoversal Hub?</summary>
          <p>Use the contact form on this site, or email
            monoversalhub@gmail.com directly.</p>
        </details>
      </div>
    </div>
  </section>

  <section class="page" id="waitlist">
    <div class="container">
      <div class="sec-head">
        <h2>Join the waitlist</h2>
        <p>Be first to know as BOSS grows, or get in touch about a web
          development project.</p>
      </div>
      <form class="form-wrap" id="waitlist-form">
        <div class="form-row"><label>Name</label><input type="text" name="name" required /></div>
        <div class="form-row"><label>Email</label><input type="email" name="email" required /></div>
        <div class="form-row">
          <label>Interested in</label>
          <select name="interest">
            <option value="boss">BOSS</option>
            <option value="webdev">Web Development</option>
            <option value="both">Both</option>
          </select>
        </div>
        <button class="form-submit" type="submit">Join waitlist</button>
        <div class="form-note" id="waitlist-note"></div>
      </form>
    </div>
  </section>

  <div class="footer container">
    © ${new Date().getFullYear()} Monoversal Hub. Build Trust. Grow Faster.
  </div>
</div>

<script>
(function () {
  window.show = function (id) {
    var pages = document.querySelectorAll('#legacy-root .page');
    pages.forEach(function (p) { p.classList.remove('active'); });
    var target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (id === 'testimonials') loadTestimonials('testimonials-grid');
      if (id === 'webdev') loadTestimonials('webdev-testimonials-grid');
    }
  };

  function loadTestimonials(gridId) {
    var grid = document.getElementById(gridId);
    if (!grid || grid.dataset.loaded === '1') return;
    fetch('/api/db/testimonials')
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        grid.dataset.loaded = '1';
        if (!rows || !rows.length) {
          grid.innerHTML = '<div class="t-empty">No testimonials yet — be the first to leave one.</div>';
          return;
        }
        grid.innerHTML = rows.map(function (t) {
          var name = (t.name || '').replace(/</g, '&lt;');
          var role = (t.role || '').replace(/</g, '&lt;');
          var text = (t.text || '').replace(/</g, '&lt;');
          return '<div class="t-card"><p>"' + text + '"</p>' +
            '<div class="t-name">' + name + '</div>' +
            (role ? '<div class="t-role">' + role + '</div>' : '') +
            '</div>';
        }).join('');
      })
      .catch(function () {
        grid.innerHTML = '<div class="t-empty">Could not load testimonials right now.</div>';
      });
  }

  var waitlistForm = document.getElementById('waitlist-form');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('waitlist-note');
      var btn = waitlistForm.querySelector('.form-submit');
      var data = Object.fromEntries(new FormData(waitlistForm).entries());
      btn.disabled = true;
      note.className = 'form-note';
      note.textContent = 'Submitting…';
      fetch('/api/db/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          btn.disabled = false;
          if (res.ok) {
            note.className = 'form-note ok';
            note.textContent = "You're on the list!";
            waitlistForm.reset();
          } else {
            note.className = 'form-note err';
            note.textContent = res.error || 'Something went wrong. Please try again.';
          }
        })
        .catch(function () {
          btn.disabled = false;
          note.className = 'form-note err';
          note.textContent = 'Network error. Please try again.';
        });
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = document.getElementById('contact-note');
      var btn = contactForm.querySelector('.form-submit');
      var data = Object.fromEntries(new FormData(contactForm).entries());
      btn.disabled = true;
      note.className = 'form-note';
      note.textContent = 'Sending…';
      fetch('/api/db/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          btn.disabled = false;
          if (res.ok) {
            note.className = 'form-note ok';
            note.textContent = 'Message sent — thanks!';
            contactForm.reset();
          } else {
            note.className = 'form-note err';
            note.textContent = res.error || 'Something went wrong. Please try again.';
          }
        })
        .catch(function () {
          btn.disabled = false;
          note.className = 'form-note err';
          note.textContent = 'Network error. Please try again.';
        });
    });
  }
})();
</script>
`;
