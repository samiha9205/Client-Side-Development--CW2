// contact.js - Contact/Reservation page features

// Live validation
function initLiveValidation() {
  const form = document.getElementById('reservationForm');
  if (!form) return;
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      if (input.checkValidity()) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
      } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
      }
    });
  });
}

// Character counter
function initCharCounter() {
  const notes = document.getElementById('notes');
  const counter = document.getElementById('charCount');
  if (!notes || !counter) return;
  notes.addEventListener('input', () => {
    counter.textContent = `${notes.value.length}/200`;
  });
}

// Save draft in localStorage
function initSaveDraft() {
  const form = document.getElementById('reservationForm');
  if (!form) return;
  form.addEventListener('input', () => {
    const data = {};
    form.querySelectorAll('input, textarea').forEach(input => {
      data[input.name] = input.value;
    });
    localStorage.setItem('reservationDraft', JSON.stringify(data));
  });
  const saved = JSON.parse(localStorage.getItem('reservationDraft') || '{}');
  Object.keys(saved).forEach(key => {
    if (form[key]) form[key].value = saved[key];
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLiveValidation();
  initCharCounter();
  initSaveDraft();
});
