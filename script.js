/* Racoon — minimal, dependency-free interactions */

// year (supports #yr on homepage and .yr on inner pages)
const _yr = String(new Date().getFullYear());
document.querySelectorAll('#yr, .yr').forEach(el => el.textContent = _yr);

// mobile nav
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav__toggle');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('.nav__links a').forEach(a =>
  a.addEventListener('click', () => nav.classList.remove('open'))
);

// drifting work-still montage behind hero / page headers
const REEL_POSTERS = [
  "https://m.media-amazon.com/images/M/MV5BYmIzMmQ1ZmMtYmNiNS00Nzc4LTljYmMtNjJjYTBjNTdiMGFjXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/S/pv-target-images/3db30b8d3107592525ff8c6730ad68597cc079e6065384592c5214a9d6435ef3.jpg",
  "https://m.media-amazon.com/images/I/81fnXBogPFL._AC_UF894,1000_QL80_.jpg",
  "https://disney.images.edge.bamgrid.com/ripcut-delivery/v2/variant/disney/323d62f9-1ba9-4d9e-abef-dc6c58aad679/compose?aspectRatio=1.78&format=webp&width=1200",
  "https://deadline.com/wp-content/uploads/2024/05/Cats-Countdown.jpeg",
  "https://m.media-amazon.com/images/M/MV5BMjUxNzhiYWEtMTUzMS00Y2RhLWFhOWUtODNmMDM2OTBkMWZkXkEyXkFqcGc@._V1_.jpg",
  "https://ic.c4assets.com/vps/the-inheritance/DD232954-0CF8-4897-857F342BD5E3BFB1.jpg",
  "https://ichef.bbci.co.uk/images/ic/1920x1080/p0jfhj8g.jpg",
  "https://m.media-amazon.com/images/M/MV5BZDQyYzUyZmEtOGQ4Yy00NTk3LTk2ODAtN2IzN2IxOTFhZmQ4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
  "https://72films.com/wp-content/uploads/2023/11/DSC08256_3-scaled-aspect-ratio-1920-1080-scaled.jpg",
  "https://ichef.bbci.co.uk/images/ic/1200x675/p0ky7bw4.jpg",
  "https://m.media-amazon.com/images/M/MV5BYWVkYjg1YjAtMDFhYS00MjllLThmMWEtNmU3Zjc3YTNkNzI1XkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/S/pv-target-images/162e44d43cf28a694f62cd84c9dce2b22d4026ee4c434364802965a3b4bf35ab.jpg",
  "https://ichef.bbci.co.uk/images/ic/1200x675/p0l8j3dc.jpg",
  "https://ichef.bbci.co.uk/images/ic/1920x1080/p0jtqbrv.jpg",
  "https://ichef.bbci.co.uk/images/ic/1200x675/p0mz65ln.jpg",
  "https://ichef.bbci.co.uk/images/ic/464x261/p0l2dh8c.jpg",
  "https://ichef.bbci.co.uk/images/ic/1200x675/p0fxsbq3.jpg",
  "https://ic.c4assets.com/brands/celeb-cooking-school/de7a85ec-1c8b-4e0f-ad48-3dca8440a1e6.jpg",
  "https://ic.c4assets.com/vps/david-baddiel-cat-man/2B3BD172-09A3-4556-A0BB8D6F26B84581.jpg?imformat=chrome&resize=700px:*",
  "https://i.ytimg.com/vi/DytTK1kpTFI/hqdefault.jpg",
  "https://i.ytimg.com/vi/nD5kBFUuyAY/maxresdefault.jpg",
  "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p27327726_b_v13_ac.jpg",
  "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p25831080_b_v8_ai.jpg",
  "https://api-images.channel5.com/otis/images/show/9226392006527/768x432.jpg",
  "https://m.media-amazon.com/images/M/MV5BOGVhZjIyMjMtODFmNC00NzdhLWI5YzYtYjY0MzcxNjJjZjNkXkEyXkFqcGc@._V1_.jpg",
  "https://m.media-amazon.com/images/M/MV5BNjlhOGEzMjEtN2RlZi00YmIxLTk3MWUtMTdlYzY2MGEzZjA1XkEyXkFqcGc@._V1_.jpg",
  "https://uktv-res.cloudinary.com/image/upload/t_web_30_meta_og_1x_jpg/v1745406083/a4yeizowmxqfhowsopkr.jpg",
  "https://m.media-amazon.com/images/M/MV5BMjhmMzFjYWUtNGNkNS00NGY0LThmYzAtZWUwMzg3N2ZmODgwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
];
function buildReel(el) {
  const cols = 6;
  const pool = REEL_POSTERS.slice();          // de-dupe spread across columns
  let n = 0;
  for (let c = 0; c < cols; c++) {
    const col = document.createElement('div');
    col.className = 'reel-col';
    const track = document.createElement('div');
    track.className = 'reel-col__track';
    const set = [];
    for (let i = 0; i < 5; i++) set.push(pool[n++ % pool.length]);
    [...set, ...set].forEach(src => {           // duplicate for seamless loop
      const im = document.createElement('img');
      im.src = src; im.alt = ''; im.loading = 'lazy';
      track.appendChild(im);
    });
    track.style.animationName = c % 2 ? 'reelDown' : 'reelUp';
    track.style.animationDuration = (44 + c * 9) + 's';   // varied speeds
    col.appendChild(track);
    el.appendChild(col);
  }
}
// DISABLED for now — the drifting work-still montage clashed with the raccoon
// background texture. Kept intact; re-enable by uncommenting the line below.
// document.querySelectorAll('.hero__reel, .phead__reel').forEach(buildReel);

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// hero lines animate in immediately on load (no scroll needed)
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
});

// graceful fallback for broken external poster images
document.querySelectorAll('.card__img img').forEach(img => {
  img.addEventListener('error', () => {
    const card = img.closest('.card');
    img.remove();
    if (card) card.querySelector('.card__img').style.background =
      'repeating-linear-gradient(45deg,#1a1820,#1a1820 12px,#15131a 12px,#15131a 24px)';
  });
});

// work page — filter cards by network
const chips = document.querySelectorAll('.chip');
const grid = document.getElementById('workGrid');
if (chips.length && grid) {
  const cards = [...grid.querySelectorAll('.card')];
  const empty = document.querySelector('.grid-empty');
  chips.forEach(chip => chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-on'));
    chip.classList.add('is-on');
    const f = chip.dataset.filter;
    let shown = 0;
    cards.forEach(card => {
      const match = f === 'all' || card.dataset.net === f;
      card.style.display = match ? '' : 'none';
      if (match) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }));
}

// contact form — prototype only
const cform = document.querySelector('.cform');
if (cform) {
  cform.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = cform.querySelector('.cform__note');
    if (note) note.hidden = false;
  });
}

// parallax drift on the ambient eyeshine glows
const a = document.querySelector('.eyeshine--a');
const b = document.querySelector('.eyeshine--b');
let ticking = false;
window.addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    if (a) a.style.transform = `translateY(${y * 0.08}px)`;
    if (b) b.style.transform = `translateY(${y * -0.05}px)`;
    ticking = false;
  });
}, { passive: true });
