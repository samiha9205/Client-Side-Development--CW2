
// main.js - interactivity for TastyBites
document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      let target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Menu filter
  const filterBtns = document.querySelectorAll('[data-filter]');
  if(filterBtns.length){
    filterBtns.forEach(btn=> btn.addEventListener('click', function(){
      const cat = this.getAttribute('data-filter');
      document.querySelectorAll('.menu-card').forEach(card=>{
        if(cat==='all' || card.dataset.category===cat) card.style.display='block';
        else card.style.display='none';
      });
      filterBtns.forEach(b=>b.classList.remove('active'));
      this.classList.add('active');
    }));
  }

  // Simple lightbox for gallery
  const lightbox = document.createElement('div');
  lightbox.id='lightbox';
  Object.assign(lightbox.style,{position:'fixed', top:0,left:0,width:'100%',height:'100%',display:'none',alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.75)',zIndex:1050});
  document.body.appendChild(lightbox);
  lightbox.addEventListener('click', ()=> lightbox.style.display='none');

  document.querySelectorAll('.gallery-grid img').forEach(img=>{
    img.style.cursor='zoom-in';
    img.addEventListener('click', ()=>{
      const copy = img.cloneNode();
      copy.style.maxWidth='90%';
      copy.style.maxHeight='90%';
      lightbox.innerHTML='';
      lightbox.appendChild(copy);
      lightbox.style.display='flex';
    });
  });

  // Reservation form validation & storage
  const resForm = document.getElementById('reservationForm');
  if(resForm){
    resForm.addEventListener('submit', function(e){
      e.preventDefault();
      // simple HTML5 validation complement
      if(!resForm.checkValidity()){
        resForm.classList.add('was-validated');
        return;
      }
      const data = {
        name: this.name.value,
        email: this.email.value,
        date: this.date.value,
        time: this.time.value,
        people: this.people.value,
        phone: this.phone.value
      };
      // Save to localStorage for demo purposes
      let bookings = JSON.parse(localStorage.getItem('tastybites_bookings')||'[]');
      bookings.push(data);
      localStorage.setItem('tastybites_bookings', JSON.stringify(bookings));
      // show success
      const alertBox = document.getElementById('resAlert');
      alertBox.innerHTML = `<div class="alert alert-success" role="alert">Thanks ${data.name}. Your reservation for ${data.people} on ${data.date} at ${data.time} is received. We'll confirm via ${data.email}.</div>`;
      resForm.reset();
      resForm.classList.remove('was-validated');
    });
  }

  // Display opening hours live status
  const statusEl = document.getElementById('openStatus');
  if(statusEl){
    const now = new Date();
    const hour = now.getHours();
    const open = (hour>=11 && hour<22);
    statusEl.textContent = open ? 'Open now' : 'Closed';
    statusEl.classList.add(open ? 'text-success' : 'text-muted');
  }

  // Menu item animation (reveal on scroll)
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, {threshold:0.12});
  reveals.forEach(r=>obs.observe(r));
});
