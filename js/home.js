// home.js - Homepage features

// Auto slider
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  let index = 0;
  setInterval(() => {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    index = (index + 1) % slides.length;
  }, 4000);
}

// Counters
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const speed = 100;
      if (count < target) {
        counter.innerText = count + 1;
        setTimeout(updateCount, speed);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Event countdown
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;
  const eventDate = new Date(countdownEl.dataset.date).getTime();
  setInterval(() => {
    const now = Date.now();
    const diff = eventDate - now;
    if (diff <= 0) {
      countdownEl.innerText = "Event is live!";
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countdownEl.innerText = `${days} days to go`;
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initCounters();
  initCountdown();
});
