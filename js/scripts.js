document.addEventListener('DOMContentLoaded', function() {
  var menuTrigger = document.querySelector('.js-menu-trigger');
  if (menuTrigger) {
    menuTrigger.addEventListener('click', function() {
      document.body.classList.toggle('show-menu');
    });
  }

  // ─── OVERVIEW SLIDESHOW ──────────────────────────────
  function startSlideshow(id, slides) {
    const img = document.getElementById(id);
    if (!img) return;
    let i = 0;
    setInterval(function () {
      i = (i + 1) % slides.length;
      img.src = slides[i];
    }, 2000);
  }

  startSlideshow('overview-slideshow', [
    'images/CBook/Dayone/Dayone.jpg',
    'images/CBook/DayTwo/Daytwo_front.jpg',
    'images/CBook/DayTwo/Daytwo_back.jpg',
    'images/CBook/DayTwo/Daytwo_open_horizontalonly.png',
    'images/CBook/DayThree/DayThree_white.jpg',
    'images/CBook/DayThree/DayThree_on floor.jpg',
    'images/CBook/DayThree/DayThree_open_horizontialonly.png',
  ]);

  startSlideshow('unbrella-slideshow', [
    'images/Unbrella_and_wood/Dayone/Unbrella_Overview.png',
    'images/Unbrella_and_wood/Day25/Unbrella.jpg',
    'images/Unbrella_and_wood/Day28/Unbrella1.jpg',
    'images/Unbrella_and_wood/Day28/Unbrella2.jpg',
  ]);

  startSlideshow('wood-slideshow', [
    'images/Unbrella_and_wood/Dayone/Wood_Overview.png',
    'images/Unbrella_and_wood/Day28/Wood1.jpg',
    'images/Unbrella_and_wood/Day28/Wood2.jpg',
  ]);

  startSlideshow('smoker-slideshow', [
    'images/Smoker/Day1/1.jpg',
    'images/Smoker/Day1/2.jpg',
  ]);

  startSlideshow('milktea-slideshow', [
    'images/MillkTea/Day1/1.jpg',
    'images/MillkTea/Day2/1.jpg',
    'images/MillkTea/Day2/2.jpg',
    'images/MillkTea/Day3/1.png',
  ]);

  startSlideshow('combination-slideshow', [
    'images/Combination/Day1/1.jpg',
    'images/Combination/Day1/2.jpg',
    'images/Combination/Day2/Far.jpg',
    'images/Combination/Day2/Front.jpg',
    'images/Combination/Day2/Top.jpg',
    'images/Combination/Day4/Front.jpg',
    'images/Combination/Day4/Tissues.jpg',
    'images/Combination/Day4/Question.png',
  ]);
});

function switchTab(index, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.content-panel')[index].classList.add('active');

  const crumb = document.querySelector('.nav_breadcrumb_current');
  if (crumb) crumb.textContent = el.querySelector('p').textContent;
}

// ─── SPOTLIGHT MASK ──────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.createElement('div');
  overlay.id = 'mask-overlay';
  document.body.appendChild(overlay);

  // Start at center
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  // Max offset from center: 20% of viewport
  const MAX_OFFSET = () => Math.min(window.innerWidth, window.innerHeight) * 0.2;

  function clamp(val, center, maxOffset) {
    const offset = Math.max(-maxOffset, Math.min(maxOffset, val - center));
    return center + offset;
  }

  document.addEventListener('mousemove', (e) => {
    const max = MAX_OFFSET();
    targetX = clamp(e.clientX, window.innerWidth / 2, max);
    targetY = clamp(e.clientY, window.innerHeight / 2, max);
  });

  document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const max = MAX_OFFSET();
    targetX = clamp(touch.clientX, window.innerWidth / 2, max);
    targetY = clamp(touch.clientY, window.innerHeight / 2, max);
  }, { passive: true });

  function applyMask() {
    // Lerp for smooth lag
    currentX += (targetX - currentX) * 0.07;
    currentY += (targetY - currentY) * 0.07;

    // Radius ~40% of viewport width = large visible circle
    const w = window.innerWidth;
    const h = window.innerHeight;
    const isMobile = w < 768;
    const rx = isMobile ? w * 0.64 : w * 0.58;
    const ry = isMobile ? rx * 2 : rx * (2 / 3);

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" fill="white"/>
      <ellipse cx="${currentX}" cy="${currentY}" rx="${rx}" ry="${ry}" fill="black"/>
    </svg>`;

    const mask = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    overlay.style.webkitMaskImage = mask;
    overlay.style.maskImage = mask;

    requestAnimationFrame(applyMask);
  }

  applyMask();
})();
