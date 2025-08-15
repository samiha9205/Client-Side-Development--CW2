// gallery.js - Gallery features

// Lightbox
function initLightbox() {
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  Object.assign(lightbox.style, {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    display: 'none', alignItems: 'center', justifyContent: 'center',
    background: 'rgba(0,0,0,0.75)', zIndex: 1050
  });
  document.body.appendChild(lightbox);
  lightbox.addEventListener('click', () => lightbox.style.display = 'none');
  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const copy = img.cloneNode();
      copy.style.maxWidth = '90%';
      copy.style.maxHeight = '90%';
      lightbox.innerHTML = '';
      lightbox.appendChild(copy);
      lightbox.style.display = 'flex';
    });
  });
}

// Slideshow
function initSlideshow() {
  const images = document.querySelectorAll('.slideshow img');
  if (!images.length) return;
  let index = 0;
  setInterval(() => {
    images.forEach(img => img.style.display = 'none');
    images[index].style.display = 'block';
    index = (index + 1) % images.length;
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initSlideshow();
});
