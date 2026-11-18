(function () {
  var D = window.MCAN || {}, PAGE = D.pageSize || 6;
  var b = document.getElementById('mb'), n = document.getElementById('nv');
  if (b && n) {
    b.addEventListener('click', function () { var o = n.classList.toggle('open'); b.setAttribute('aria-expanded', o); });
    n.addEventListener('click', function (e) { if (e.target.tagName === 'A') { n.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); } });
  }
  var ICON = {
    news: '<path d="M3 18l6-9 4 6 3-4 5 7z"/><circle cx="17" cy="6" r="2"/>',
    publications: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h7"/>',
    multimedia: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z"/>'
  };
  var LABEL = { news: 'News & Events', publications: 'Publications', multimedia: 'Multimedia' };
  var postUrl = window.MCAN_POSTURL || function (k, id) { return 'post.html?t=' + k + '&id=' + encodeURIComponent(id); };
  var listUrl = window.MCAN_LISTURL || function (k) { return k + '.html'; };
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text) e.textContent = text; return e; }
  function fmt(d) { if (!d) return ''; var t = new Date(d + 'T00:00:00'); return isNaN(t) ? d : t.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); }
  function metaOf(it) { return [fmt(it.date) || it.year || '', it.tag || ''].filter(Boolean).join(' · '); }

  function card(kind, it) {
    var a = el('article', 'post'), href = postUrl(kind, it.id);
    var th = el('a', 'thumb'); th.href = href; th.setAttribute('aria-hidden', 'true'); th.tabIndex = -1;
    th.innerHTML = '<svg viewBox="0 0 24 24">' + ICON[kind] + '</svg>'; a.appendChild(th);
    var bd = el('div', 'body'), m = metaOf(it);
    if (m) bd.appendChild(el('time', '', m));
    var h = el('h3'), hl = el('a', 'tl', it.title); hl.href = href; h.appendChild(hl); bd.appendChild(h);
    if (it.excerpt) bd.appendChild(el('p', '', it.excerpt));
    var l = el('a', 'more', 'Read more →'); l.href = href; bd.appendChild(l);
    a.appendChild(bd); return a;
  }

  /* ---------- paged lists with search ---------- */
  function initPaged(box, kind) {
    var wrap = box.closest('.listwrap'), input = wrap.querySelector('.search'), pager = wrap.querySelector('.pager'), count = wrap.querySelector('.count');
    var st = { q: '', p: 1 };
    function go() {
      var q = st.q.toLowerCase();
      var all = (D[kind] || []).filter(function (it) { return !q || (it.title + ' ' + (it.excerpt || '') + ' ' + (it.tag || '')).toLowerCase().indexOf(q) > -1; });
      var pages = Math.max(1, Math.ceil(all.length / PAGE)); if (st.p > pages) st.p = pages;
      var from = (st.p - 1) * PAGE, slice = all.slice(from, from + PAGE);
      box.innerHTML = '';
      slice.forEach(function (it) { box.appendChild(card(kind, it)); });
      if (!all.length) box.appendChild(el('p', 'empty', 'No results found. Try a different search.'));
      count.textContent = all.length ? 'Showing ' + (from + 1) + '–' + (from + slice.length) + ' of ' + all.length : '0 results';
      pager.innerHTML = '';
      if (pages > 1) {
        var mk = function (label, p, dis, on) { var x = el('button', 'pg' + (on ? ' on' : ''), label); x.type = 'button'; x.disabled = !!dis; if (on) x.setAttribute('aria-current', 'page'); x.addEventListener('click', function () { st.p = p; go(); wrap.scrollIntoView(); }); pager.appendChild(x); };
        mk('‹ Prev', st.p - 1, st.p === 1);
        for (var i = 1; i <= pages; i++) mk(String(i), i, false, i === st.p);
        mk('Next ›', st.p + 1, st.p === pages);
      }
    }
    if (input) input.addEventListener('input', function () { st.q = input.value.trim(); st.p = 1; go(); });
    go();
  }

  /* ---------- single post page ---------- */
  function renderPost(root, kind, id) {
    var items = D[kind] || [], it = null;
    items.forEach(function (x) { if (x.id === id) it = x; });
    root.innerHTML = '';
    var label = LABEL[kind] || 'Post';
    var hero = el('div', 'page-hero'), hw = el('div', 'wrap');
    var crumb = el('div', 'crumb'), c1 = el('a', '', 'Home'); c1.href = window.MCAN_HOMEURL || 'index.html';
    var c2 = el('a', '', label); c2.href = listUrl(kind);
    crumb.appendChild(c1); crumb.appendChild(document.createTextNode(' / ')); crumb.appendChild(c2);
    hw.appendChild(crumb);
    if (!it) {
      hw.appendChild(el('h1', '', 'Post not found'));
      hw.appendChild(el('p', '', 'This item may have been moved or removed.'));
      hero.appendChild(hw); root.appendChild(hero);
      var s0 = el('section'), w0 = el('div', 'wrap'), bk = el('a', 'btn green', '← Back to ' + label); bk.href = listUrl(kind);
      w0.appendChild(bk); s0.appendChild(w0); root.appendChild(s0); return;
    }
    hw.appendChild(el('h1', '', it.title));
    var m = metaOf(it); if (m) hw.appendChild(el('p', '', m));
    hero.appendChild(hw); root.appendChild(hero);
    document.title = it.title + ' | M-CAN';
    var sec = el('section'), wrap = el('div', 'wrap'), art = el('article', 'article');
    var paras = (it.content && it.content.length) ? it.content : (it.excerpt ? [it.excerpt] : []);
    paras.forEach(function (t) { art.appendChild(el('p', '', t)); });
    var row = el('div', 'btnrow');
    var open = el('a', 'btn green', kind === 'multimedia' ? 'Watch now →' : kind === 'publications' ? 'Open publication →' : 'Read the full story →'); open.href = it.url; open.target = '_blank'; open.rel = 'noopener';
    var back = el('a', 'btn outline', '← All ' + label.toLowerCase()); back.href = listUrl(kind);
    row.appendChild(open); row.appendChild(back); art.appendChild(row);
    wrap.appendChild(art);
    var rel = items.filter(function (x) { return x.id !== id; }).slice(0, 3);
    if (rel.length) {
      wrap.appendChild(el('h2', 'relh', 'More ' + label.toLowerCase()));
      var lst = el('div', 'list'); rel.forEach(function (x) { lst.appendChild(card(kind, x)); }); wrap.appendChild(lst);
    }
    sec.appendChild(wrap); root.appendChild(sec);
  }
  window.mcanRenderPost = renderPost;
  var pr = document.getElementById('post-root');
  if (pr) { var qs = new URLSearchParams(location.search); renderPost(pr, qs.get('t'), qs.get('id')); }

  /* ---------- partners ---------- */
  function initials(s) { return s.split(/\s+/).filter(function (w) { return /^[A-Za-z]/.test(w); }).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join(''); }
  var EXTS = ['png', 'jpg', 'jpeg', 'svg', 'webp'];
  function logoTile(p) {
    var t = el('div', 'ptile'), fb = el('div', 'pl', initials(p.name));
    if (!p.logo) { t.appendChild(fb); return t; }
    var img = new Image(), i = 0; img.alt = p.name + ' logo'; img.loading = 'lazy';
    img.onerror = function () { i++; if (i < EXTS.length) { img.src = p.logo + '.' + EXTS[i]; } else { img.remove(); t.appendChild(fb); } };
    img.src = p.logo + '.' + EXTS[0];
    t.appendChild(img); return t;
  }
  function partner(p) {
    var a = p.url ? el('a', 'partner') : el('div', 'partner');
    if (p.url) { a.href = p.url; a.target = '_blank'; a.rel = 'noopener'; }
    a.appendChild(logoTile(p)); a.appendChild(el('b', '', p.name)); return a;
  }
  function renderPartners(box, q) {
    box.innerHTML = '';
    var list = (D.partners || []).filter(function (p) { return !q || p.name.toLowerCase().indexOf(q.toLowerCase()) > -1; });
    list.forEach(function (p) { box.appendChild(partner(p)); });
    if (!list.length) box.appendChild(el('p', 'empty', 'No partners match your search.'));
    var c = document.getElementById('pcount'); if (c) c.textContent = list.length + ' of ' + (D.partners || []).length + ' partners';
  }

  document.querySelectorAll('[data-list]').forEach(function (box) {
    var kind = box.getAttribute('data-list'), limit = parseInt(box.getAttribute('data-limit') || '0', 10);
    if (kind === 'partners') {
      var hasF = box.hasAttribute('data-filter'), s = hasF ? document.getElementById('psearch') : null;
      if (s) s.addEventListener('input', function () { renderPartners(box, s.value); });
      renderPartners(box, ''); return;
    }
    if (box.hasAttribute('data-paged')) { initPaged(box, kind); return; }
    (D[kind] || []).slice(0, limit || 999).forEach(function (it) { box.appendChild(card(kind, it)); });
  });

  /* ---------- home tabs ---------- */
  var TABS = ['news', 'publications', 'multimedia'];
  function showTab(k, scroll) {
    if (TABS.indexOf(k) < 0) return;
    document.querySelectorAll('.tab').forEach(function (t) { var on = t.getAttribute('data-tab') === k; t.classList.toggle('on', on); t.setAttribute('aria-selected', on ? 'true' : 'false'); });
    document.querySelectorAll('.panel').forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== k; });
    if (scroll) { var u = document.getElementById('updates'); if (u) u.scrollIntoView(); }
  }
  window.mcanTab = showTab;
  document.querySelectorAll('.tab').forEach(function (t) { t.addEventListener('click', function () { showTab(t.getAttribute('data-tab'), false); }); });
  function fromHash() { var h = location.hash.replace('#', ''); if (TABS.indexOf(h) > -1) showTab(h, true); }
  window.addEventListener('hashchange', fromHash);
  fromHash();
})();
