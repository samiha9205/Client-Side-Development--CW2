// about.js - About page features

// Timeline reveal
function initTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });
  items.forEach(item => observer.observe(item));
}

// Facts counter
function initFactsCounter() {
  document.querySelectorAll('.fact-counter').forEach(counter => {
    let count = 0;
    const target = +counter.dataset.target;
    const interval = setInterval(() => {
      if (count < target) {
        count++;
        counter.textContent = count;
      } else {
        clearInterval(interval);
      }
    }, 30);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initFactsCounter();
});
