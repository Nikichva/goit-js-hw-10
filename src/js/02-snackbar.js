'use strict';

// Opisany w dokumentacji
import iziToast from 'izitoast';
// Kolejny import stylów
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const delay = form.elements.delay;

const makePromise = ({ delay }) => {
  return new Promise((resolve, reject) => {
    const checked = form.elements.state.value;
    setTimeout(() => {
      if (checked === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

form.addEventListener('submit', evt => {
  evt.preventDefault();

  makePromise({ delay: delay.value })
    .then(delay =>
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(delay =>
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
      })
    );

  form.reset();
});
