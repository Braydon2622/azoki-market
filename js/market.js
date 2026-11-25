/* Azoki Market: storefront behaviour for index.html and product.html */
(function () {
  const M = window.MARKET;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === 'file:';
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const byId = (id) => M.products.find((p) => p.id === id);
  const catOf = (p) => M.categories.find((c) => c.id === p.cat);
  const money = (n) => M.currency + (Number.isInteger(n) ? n : n.toFixed(2));
  const KIND = { print: 'Print', tapestry: 'Tapestry', glow: 'Glow box', crew: 'Crewneck' };
  /* While MARKET.open is false nothing is for sale: prices are hidden and the cart becomes a
     shortlist that is sent along with the email sign-up. */
  const OPEN = M.open !== false;

  function defaults(p) { const o = {}; for (const k in p.options) o[k] = p.options[k][0]; return o; }
  function priceOf(p, o) {
    if (p.prices && p.options.Size && o && o.Size) return p.prices[Math.max(0, p.options.Size.indexOf(o.Size))];
    let n = p.price;
    if (p.step && p.options.Size && o && o.Size) n += p.step * Math.max(0, p.options.Size.indexOf(o.Size));
    return n;
  }

  /* ---------- product pictures, drawn from the artwork ---------- */
  function skyline(city) {
    let s = 7; for (let i = 0; i < city.length; i++) s = (s * 31 + city.charCodeAt(i)) >>> 0;
    const r = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
    let x = 8, out = '';
    while (x < 106) {
      const w = 5 + Math.floor(r() * 9), h = 9 + Math.floor(r() * 30), top = 44 - h, k = r();
      out += '<rect x="' + x + '" y="' + top + '" width="' + w + '" height="' + h + '"/>';
      if (k < 0.28) out += '<line x1="' + (x + w / 2) + '" y1="' + top + '" x2="' + (x + w / 2) + '" y2="' + (top - 7) + '"/>';
      else if (k < 0.5) out += '<path d="M' + x + ' ' + top + ' L' + (x + w / 2) + ' ' + (top - 5) + ' L' + (x + w) + ' ' + top + '"/>';
      else if (k < 0.62) out += '<path d="M' + x + ' ' + top + ' A' + w / 2 + ' ' + w / 2 + ' 0 0 1 ' + (x + w) + ' ' + top + '"/>';
      for (let y = top + 4; y < 42; y += 4.5) out += '<line x1="' + (x + 1.4) + '" y1="' + y + '" x2="' + (x + w - 1.4) + '" y2="' + y + '" stroke-width=".45"/>';
      x += w + 1.2;
    }
    return out;
  }
  function crewSVG(city, colour) {
    const dark = colour === 'Black';
    const body = dark ? '#1f1e1c' : '#efe6d3', shade = dark ? '#2b2a27' : '#e0d5bf', thread = dark ? '#efe6d3' : '#191815';
    return '<svg viewBox="0 0 400 400" role="img" aria-label="' + esc(colour + ' crewneck embroidered with the ' + city + ' skyline') + '">' +
      '<path d="M150 58 Q200 88 250 58 L300 74 L366 290 L326 304 L296 170 L296 338 Q200 350 104 338 L104 170 L74 304 L34 290 L100 74 Z" fill="' + body + '"/>' +
      '<path d="M104 320 Q200 332 296 320 L296 338 Q200 350 104 338 Z M366 290 L326 304 L322 290 L361 276 Z M34 290 L74 304 L78 290 L39 276 Z" fill="' + shade + '"/>' +
      '<path d="M150 58 Q200 88 250 58 L241 55 Q200 76 159 55 Z" fill="' + shade + '"/>' +
      '<path d="M104 170 L109 122 M296 170 L291 122" stroke="' + shade + '" stroke-width="2" fill="none"/>' +
      '<g transform="translate(140 138)" fill="none" stroke="' + thread + '" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round">' +
      '<rect x="2" y="6" width="116" height="62" stroke-width="2.2"/>' + skyline(city) +
      '<line x1="6" y1="44" x2="114" y2="44" stroke-width="1.6"/>' +
      '<text x="60" y="60.5" text-anchor="middle" textLength="' + Math.min(100, 20 + city.length * 7) + '" lengthAdjust="spacingAndGlyphs" fill="' + thread + '" stroke="none" font-family="Bricolage Grotesque, Arial Black, sans-serif" font-weight="800" font-size="13">' + esc(city.toUpperCase()) + '</text>' +
      '</g></svg>';
  }
  function mock(p, o, flags) {
    o = o || defaults(p); flags = flags || {};
    const alt = esc(p.name + ', ' + KIND[p.type].toLowerCase());
    if (p.photo) return '<div class="mk photo"><img src="' + p.photo + '" alt="' + alt + '" loading="lazy"></div>';
    const img = '<img src="' + p.art + '" alt="' + alt + '" loading="lazy">';
    if (p.type === 'print') return '<div class="mk print" style="--wall:' + p.wall + ';--frame:' + (p.frame || '#15130f') + '"><div class="frame' + (p.land ? ' land' : p.lens ? ' tall' : '') + '">' + img + '</div></div>';
    if (p.type === 'tapestry') return '<div class="mk tap" style="--wall:' + p.wall + '"><div class="cloth' + (p.wide ? ' wide' : '') + '">' + img + '</div></div>';
    if (p.type === 'glow') return '<div class="mk glow' + (flags.off ? '' : ' lit') + '" style="--wall:' + p.wall + ';--tint:' + p.tint + '"><div class="box">' + img + '</div></div>';
    return '<div class="mk crew" style="--wall:' + (o.Colour === 'Black' ? '#cfc6b3' : p.wall) + '">' + crewSVG(o.City, o.Colour) + '</div>';
  }

  /* ---------- cart ---------- */
  const KEY = 'azoki-cart';
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(KEY) || '[]').filter((l) => byId(l.id)); } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const sig = (id, o) => id + '|' + Object.keys(o).sort().map((k) => k + ':' + o[k]).join('|');
  const count = () => cart.reduce((n, l) => n + l.qty, 0);
  const total = () => cart.reduce((n, l) => n + priceOf(byId(l.id), l.opts) * l.qty, 0);

  function add(id, opts, qty) {
    const p = byId(id); opts = Object.assign(defaults(p), opts || {});
    const s = sig(id, opts), line = cart.find((l) => sig(l.id, l.opts) === s);
    if (line) { if (OPEN) line.qty += qty || 1; } else cart.push({ id, opts, qty: OPEN ? qty || 1 : 1 });
    save(); paintCart(); openCart();
  }
  function paintCart() {
    $$('[data-cart-count]').forEach((e) => { e.textContent = count(); });
    const body = $('#cartBody'); if (!body) return;
    if (!cart.length) {
      body.innerHTML = '<div class="cart-empty"><p class="big">' + (OPEN ? 'Nothing in here yet.' : 'Nothing saved yet.') + '</p><p>' +
        (OPEN ? 'Your walls are still bare and it shows.' : 'The shop is not open yet. Shortlist what you like and you will hear when it is.') +
        '</p><a class="btn ink" href="index.html#shop" data-close>Go and look</a></div>';
    } else {
      body.innerHTML = cart.map((l, i) => {
        const p = byId(l.id);
        return '<div class="line"><a class="line-pic" href="product.html?id=' + p.id + '">' + mock(p, l.opts) + '</a><div class="line-info">' +
          '<a href="product.html?id=' + p.id + '"><b>' + esc(p.name) + '</b></a>' +
          '<span>' + esc(Object.values(l.opts).join(' / ')) + '</span>' +
          (OPEN ? '<div class="line-row"><div class="qty" role="group" aria-label="Quantity"><button data-q="-1" data-i="' + i + '" aria-label="One fewer">-</button><output>' + l.qty + '</output><button data-q="1" data-i="' + i + '" aria-label="One more">+</button></div>' +
          '<span class="line-price">' + money(priceOf(p, l.opts) * l.qty) + '</span></div>' : '') +
          '<button class="line-x" data-rm="' + i + '">[ remove ]</button></div></div>';
      }).join('');
    }
    $('#cartTotal').textContent = money(total());
    $('#cartFoot').hidden = !cart.length;
    $('#cartNote').textContent = OPEN ? '' : 'Nothing is for sale yet. Leave your email and you will hear when the shop opens.';
    const want = $('#wantNote');
    if (want) { want.hidden = OPEN || !cart.length; want.textContent = 'Your shortlist (' + count() + ') goes with it, so I know what to make first.'; }
  }
  /* what gets sent with a sign-up while the shop is closed */
  const shortlist = () => cart.map((l) => byId(l.id).name + ' (' + Object.values(l.opts).join(', ') + ')').join('; ');
  function openCart() { const d = $('#cart'); if (d && !d.open) d.showModal(); }
  function cartEvents() {
    const d = $('#cart'); if (!d) return;
    $$('[data-open-cart]').forEach((b) => b.addEventListener('click', openCart));
    d.addEventListener('click', (e) => {
      const t = e.target;
      if (t === d || t.closest('[data-close]')) { d.close(); return; }
      const q = t.closest('[data-q]'), rm = t.closest('[data-rm]');
      if (q) { const l = cart[+q.dataset.i]; l.qty += +q.dataset.q; if (l.qty < 1) cart.splice(+q.dataset.i, 1); save(); paintCart(); }
      if (rm) { cart.splice(+rm.dataset.rm, 1); save(); paintCart(); }
      if (t.closest('#checkout')) {
        if (!OPEN) {
          d.close();
          const news = $('#news');
          if (!news) { location.href = 'index.html#news'; return; }
          news.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
          const em = $('input[type=email]', news); if (em) em.focus({ preventScroll: true });
        }
        else if (M.checkoutUrl) location.href = M.checkoutUrl;
        else $('#cartNote').textContent = 'Checkout is not connected yet. Nothing has been charged.';
      }
    });
  }

  /* ---------- home ---------- */
  function featured() {
    $$('[data-cards]').forEach((el) => { el.innerHTML = el.dataset.cards.split(',').map(byId).filter(Boolean).map(card).join(''); });
  }
  function fillMocks() {
    $$('[data-mock]').forEach((el) => { const p = byId(el.dataset.mock); if (p) el.innerHTML = mock(p, null, { off: el.dataset.off === '1' }); });
  }
  function cats() {
    const el = $('#cats'); if (!el) return;
    el.innerHTML = M.categories.map((c, i) => {
      const n = M.products.filter((p) => p.cat === c.id).length;
      const no = String(i + 1).padStart(2, '0');
      if (c.soon) return '<li class="cat soon"><span class="no">' + no + '</span><span class="nm">' + esc(c.name) + '</span><span class="ct">soon</span></li>';
      return '<li class="cat"><a href="#shop" data-filter="' + c.id + '"><span class="no">' + no + '</span><span class="nm">' + esc(c.name) + '</span><span class="nt">' + esc(c.note) + '</span><span class="ct">(' + n + ')</span></a></li>';
    }).join('');
  }
  function card(p) {
    const multi = (p.step || p.prices) && p.options.Size && p.options.Size.length > 1;
    return '<article class="card reveal" data-cat="' + p.cat + '"' + (p.lens ? ' data-lens="1"' : '') + '>' +
      '<a class="card-pic" style="view-transition-name:pic-' + p.id + '" href="product.html?id=' + p.id + '" aria-label="' + esc(p.name) + '">' + mock(p) + '</a>' +
      '<div class="card-top"><span>No. ' + p.no + '</span><span>' + (p.custom ? 'made by you' : p.lens ? 'Coded Lens' : p.from ? 'from ' + esc(p.from) : 'Azoki original') + '</span></div>' +
      '<h3><a href="product.html?id=' + p.id + '">' + esc(p.name) + '</a></h3>' +
      '<div class="card-bot"><span>' + KIND[p.type] + '</span><span class="price">' + (OPEN ? (multi ? 'from ' : '') + money(p.price) : 'opening soon') + '</span></div>' +
      '<button class="quick" data-add="' + p.id + '">' + (OPEN ? '[ + add to cart ]' : '[ + shortlist ]') + '</button></article>';
  }
  function grid() {
    const g = $('#grid'); if (!g) return;
    g.innerHTML = M.products.map(card).join('');
    const chips = $('#chips');
    const live = M.categories.filter((c) => !c.soon);
    chips.innerHTML = '<button aria-pressed="true" data-f="all">All (' + M.products.length + ')</button>' +
      '<button aria-pressed="false" data-f="lens">Coded Lens</button>' + live.map((c) => '<button aria-pressed="false" data-f="' + c.id + '">' + esc(c.name) + '</button>').join('');
    const apply = (f) => {
      $$('button', chips).forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === f ? 'true' : 'false'));
      $$('.card', g).forEach((c) => { c.hidden = !(f === 'all' || c.dataset.cat === f || (f === 'lens' && c.dataset.lens)); c.classList.add('in'); });
    };
    chips.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) apply(b.dataset.f); });
    document.addEventListener('click', (e) => { const a = e.target.closest('[data-filter]'); if (a) apply(a.dataset.filter); });
  }
  function quickAdd() {
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-add]'); if (!b) return;
      let opts = null; try { opts = b.dataset.opts ? JSON.parse(b.dataset.opts) : null; } catch (err) {}
      add(b.dataset.add, opts, 1);
    });
  }
  function lights() {
    const sec = $('#glow'), sw = $('#lightSwitch'); if (!sec || !sw) return;
    const set = (off) => {
      sec.classList.toggle('dark', off); sw.setAttribute('aria-checked', off ? 'false' : 'true');
      $('.sw-state', sw).textContent = off ? 'off' : 'on';
      $$('.mk.glow', sec).forEach((m) => m.classList.toggle('lit', off));
      $('#glowLine').textContent = off ? 'There it is.' : 'Go on. Turn the lights off.';
    };
    sw.addEventListener('click', () => set(sw.getAttribute('aria-checked') === 'true'));
    set(false);
  }
  function stitch() {
    const st = $('#stitchStage'); if (!st) return;
    const p = byId('city-crew'), o = defaults(p);
    const paint = () => {
      st.innerHTML = mock(p, o);
      $('#stitchAdd').dataset.opts = JSON.stringify(o);
      $('#stitchCity').textContent = o.City;
      $$('#stitchCities button').forEach((b) => b.setAttribute('aria-pressed', b.textContent === o.City ? 'true' : 'false'));
      $$('#stitchColours button').forEach((b) => b.setAttribute('aria-pressed', b.dataset.c === o.Colour ? 'true' : 'false'));
    };
    $('#stitchCities').innerHTML = p.options.City.map((c) => '<button aria-pressed="false">' + esc(c) + '</button>').join('');
    $('#stitchColours').innerHTML = p.options.Colour.map((c) => '<button aria-pressed="false" data-c="' + c + '" class="sw-' + c.toLowerCase() + '" aria-label="' + c + '"></button>').join('');
    $('#stitchCities').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { o.City = b.textContent; paint(); } });
    $('#stitchColours').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { o.Colour = b.dataset.c; paint(); } });
    paint();
  }
  function parallax() {
    const h = $('.stack'); if (!h || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const host = h.closest('.hero');
    host.addEventListener('pointermove', (e) => {
      const r = host.getBoundingClientRect();
      h.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      h.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  }

  /* ---------- product page ---------- */
  function pdp() {
    const root = $('#pdp'); if (!root) return;
    const p = byId(new URLSearchParams(location.search).get('id')) || M.products[0];
    const o = defaults(p); let qty = 1, off = false;
    document.title = p.name + ' | Azoki Market';
    const head = (sel, make, attr, val) => { let e = $(sel); if (!e) { e = document.createElement(make[0]); e.setAttribute(make[1], make[2]); document.head.appendChild(e); } e.setAttribute(attr, val); };
    const url = 'https://azokimarket.com/product.html?id=' + p.id;
    head('meta[name=description]', ['meta', 'name', 'description'], 'content', p.blurb);
    head('link[rel=canonical]', ['link', 'rel', 'canonical'], 'href', url);
    head('meta[property="og:title"]', ['meta', 'property', 'og:title'], 'content', p.name + ', from Azoki Market');
    head('meta[property="og:description"]', ['meta', 'property', 'og:description'], 'content', p.blurb);
    head('meta[property="og:url"]', ['meta', 'property', 'og:url'], 'content', url);
    if (p.art) head('meta[property="og:image"]', ['meta', 'property', 'og:image'], 'content', 'https://azokimarket.com/' + p.art);
    const optHtml = Object.keys(p.options).map((k) =>
      '<fieldset class="opt"><legend>' + k + ' <b data-cur="' + k + '"></b></legend><div class="chips">' +
      p.options[k].map((v, i) => '<label><input type="radio" name="' + k + '" value="' + esc(v) + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(v) + '</span></label>').join('') +
      '</div></fieldset>').join('');
    const others = M.products.filter((x) => x.id !== p.id && (x.cat === p.cat || x.fromId === p.fromId)).slice(0, 4);
    root.innerHTML =
      '<div class="pd"><div class="pd-stage"><div class="pd-pic" id="pdPic" style="view-transition-name:pic-' + p.id + '"></div>' +
      (p.type === 'glow' ? '<button class="lightsw" id="pdLight" role="switch" aria-checked="true">room lights: <b class="sw-state">on</b></button>' : '') +
      (p.art ? '<div class="pd-thumbs"><button aria-pressed="true" data-v="mock">' + (p.type === 'tapestry' ? 'Hung' : p.type === 'glow' ? 'The box' : 'Framed') + '</button><button aria-pressed="false" data-v="art">The artwork</button>' + (p.zoom ? '<button aria-pressed="false" data-v="zoom">Close up</button>' : '') + '</div>' : '') +
      '</div><div class="pd-info">' +
      '<p class="crumb"><a href="index.html#shop">Shop</a> / ' + esc(catOf(p).name) + ' / No. ' + p.no + '</p>' +
      '<h1>' + esc(p.name) + '</h1>' +
      '<p class="pd-price"><span id="pdPrice"></span> <small>' + KIND[p.type] + '</small></p>' +
      '<p class="pd-blurb">' + esc(p.blurb) + '</p>' + optHtml +
      '<div class="pd-buy"><div class="qty" role="group" aria-label="Quantity"' + (OPEN ? '' : ' hidden') + '><button id="qm" aria-label="One fewer">-</button><output id="qv">1</output><button id="qp" aria-label="One more">+</button></div>' +
      '<button class="btn red grow" id="pdAdd">' + (OPEN ? 'Add to cart' : 'Add to shortlist') + ' <span id="pdAddPrice"></span></button></div>' +
      (OPEN ? '' : '<p class="pd-soon">The shop is not open yet. Shortlist this and leave your email, and you will hear the day it is.</p>') +
      '<details open><summary>Details</summary><ul>' + p.details.concat(OPEN || p.prices ? [] : ['Sizes, materials and prices are still being settled']).map((d) => '<li>' + esc(d) + '</li>').join('') + '</ul></details>' +
      (p.custom ? '<details open><summary>How it works</summary><ol class="how">' +
        '<li>Open <a href="' + M.codedLens + '" target="_blank" rel="noopener">Coded Lens</a> and drop in a photo or a clip. It runs in your browser, so the picture stays on your device.</li>' +
        '<li>Pick a look and tune it until you like it.</li>' +
        '<li>Under Export, choose Print. It saves a poster-sized picture, up to 24 x 36 inches.</li>' +
        '<li>Email that file to <a href="mailto:' + M.signupTo + '?subject=My%20own%20print">' + M.signupTo + '</a> with the size you want.</li>' +
        '</ol><p><a class="btn ink" href="' + M.codedLens + '" target="_blank" rel="noopener">Open Coded Lens -&gt;</a></p></details>' : '') +
      (p.from ? '<details><summary>Where it comes from</summary><p>This picture is a moment from <b>' + esc(p.from) + '</b>, a live wallpaper by Azoki Studios. On a desktop it never stops moving. <a data-sibling="studios" data-path="' + p.fromId + '/" href="' + M.studios + '/' + p.fromId + '/">See it alive -&gt;</a></p></details>' : '') +
      '</div></div>' +
      (others.length ? '<section class="more"><p class="label">[ goes well with ]</p><div class="grid">' + others.map(card).join('') + '</div></section>' : '') +
      '<div class="buybar"><div><b>' + esc(p.name) + '</b><span id="bbPrice"></span></div><button class="btn red" id="bbAdd">' + (OPEN ? 'Add to cart' : 'Shortlist') + '</button></div>';

    let view = 'mock';
    const paint = () => {
      const pic = $('#pdPic');
      pic.innerHTML = view === 'zoom' ? '<div class="mk flat"><img src="' + p.zoom + '" alt="' + esc(p.name) + ', close up showing the letters"></div>' : view === 'art' ? '<div class="mk flat"><img src="' + p.art + '" alt="' + esc(p.name) + ', the artwork"></div>' : mock(p, o, { off: !off });
      const pr = OPEN ? money(priceOf(p, o)) : 'Opening soon';
      $('#pdPrice').textContent = pr; $('#pdAddPrice').textContent = OPEN ? '· ' + money(priceOf(p, o) * qty) : ''; $('#bbPrice').textContent = pr;
      $('#qv').textContent = qty;
      $$('[data-cur]', root).forEach((b) => { b.textContent = o[b.dataset.cur]; });
      root.classList.toggle('room-dark', off && view === 'mock');
    };
    root.addEventListener('change', (e) => { if (e.target.name in o) { o[e.target.name] = e.target.value; paint(); } });
    $('#qm').addEventListener('click', () => { qty = Math.max(1, qty - 1); paint(); });
    $('#qp').addEventListener('click', () => { qty = Math.min(20, qty + 1); paint(); });
    $('#pdAdd').addEventListener('click', () => add(p.id, Object.assign({}, o), qty));
    $('#bbAdd').addEventListener('click', () => add(p.id, Object.assign({}, o), qty));
    $$('.pd-thumbs button', root).forEach((b) => b.addEventListener('click', () => {
      view = b.dataset.v; $$('.pd-thumbs button', root).forEach((x) => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); paint();
    }));
    const ls = $('#pdLight');
    if (ls) ls.addEventListener('click', () => { off = !off; ls.setAttribute('aria-checked', off ? 'false' : 'true'); $('.sw-state', ls).textContent = off ? 'off' : 'on'; paint(); });
    paint();
  }

  /* ---------- shared chrome ---------- */
  function siblings() {
    $$('a[data-sibling]').forEach((a) => {
      const path = a.dataset.path || 'index.html';
      if (local) a.href = '../' + a.dataset.sibling + '/' + path;
      else if (/^\/azoki-(studios|market)\//.test(location.pathname)) a.href = '/azoki-' + a.dataset.sibling + '/' + (path === 'index.html' ? '' : path);
    });
  }
  function nav() {
    const n = $('#nav'); if (!n) return;
    const f = () => n.classList.toggle('stuck', scrollY > 20);
    f(); addEventListener('scroll', f, { passive: true });
  }
  function reveals() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    els.forEach((e) => io.observe(e));
  }
  /* Email sign-up. Each one is forwarded to MARKET.signupTo by formsubmit.co. */
  function signup() {
    $$('form.signup').forEach((f) => f.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = $('.form-msg', f), btn = $('button[type=submit]', f);
      if (f.elements._honey.value) return;
      if (local) { msg.textContent = 'Preview only: nothing was sent.'; return; }
      if (!M.signupTo) { msg.textContent = 'Sign-ups are not switched on yet. Nothing was sent.'; return; }
      const data = { email: f.elements.email.value, list: 'Azoki Market', _subject: 'Azoki Market sign-up', _template: 'table' };
      if (!OPEN && cart.length) data.shortlist = shortlist();
      btn.disabled = true; msg.textContent = 'Sending...';
      fetch('https://formsubmit.co/ajax/' + M.signupTo, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        .then((r) => r.json())
        .then((d) => { if (String(d.success) !== 'true') throw 0; msg.textContent = OPEN ? 'Got it. You will hear about the next drop.' : 'Got it. You will hear the day the shop opens.'; f.reset(); })
        .catch(() => { msg.textContent = 'That did not send. Please try again in a bit, or write to ' + M.signupTo + '.'; })
        .finally(() => { btn.disabled = false; });
    }));
  }
  /* the words that change while the shop is closed */
  function soon() {
    if (OPEN) return;
    document.body.classList.add('is-soon');
    const label = 'Shortlist (<span data-cart-count>0</span>)';
    $$('.cartbtn, #cart header h2').forEach((b) => { b.innerHTML = label; });
    const d = $('#cart'); if (d) d.setAttribute('aria-label', 'Your shortlist');
    const co = $('#checkout'); if (co) co.textContent = 'Tell me when these open';
    $$('.sum').forEach((s) => { s.hidden = true; });
    const sa = $('#stitchAdd'); if (sa) sa.textContent = 'Add to shortlist';
    $$('.custom [data-add]').forEach((b) => { b.textContent = '[ + shortlist one ]'; });
    $$('.custom-soon').forEach((n) => { n.hidden = false; });
    $$('.glow-buy [data-add]').forEach((b) => { b.textContent = '[ + shortlist ]'; });
    const h = $('.news h2'); if (h) h.innerHTML = 'Be first when the shop <em>opens.</em>';
    $$('.soon-note').forEach((n) => { n.hidden = false; });
    $$('.bar-track span').forEach((s) => { if (s.textContent === 'Small batches') s.textContent = 'Opening soon'; });
  }

  pdp(); fillMocks(); cats(); featured(); grid(); lights(); stitch(); parallax(); quickAdd(); soon();
  cartEvents(); paintCart(); siblings(); nav(); reveals(); signup();
  window.__market = { add, count, total, cart: () => cart, clear: () => { cart = []; save(); paintCart(); } };
})();
