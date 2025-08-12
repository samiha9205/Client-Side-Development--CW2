// menu.js - Menu page features

// Filter
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (!filterBtns.length) return;
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    const cat = btn.dataset.filter;
    document.querySelectorAll('.menu-card').forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.category === cat) ? 'block' : 'none';
    });
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }));
}

// Favourites
function initFavourites() {
  document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
      if (!favs.includes(item)) favs.push(item);
      localStorage.setItem('favourites', JSON.stringify(favs));
      alert(`${item} added to favourites!`);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenuFilter();
  initFavourites();
});
