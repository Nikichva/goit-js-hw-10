'use strict';

// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const selector = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = Date.now();
    const date = selectedDates[0];
    const elapsedTime = date.getTime() - startTime;

    if (elapsedTime > 0) {
      startBtn.disabled = false;
      userSelectedDate = date.getTime();
      ms = elapsedTime;
    } else {
      window.alert('Please choose a date in the future');
      startBtn.disabled = true;
    }

    // console.log('Date now:', startTime);
    // console.log('Selected date', date.getTime());
    // console.log('elapsedTime:', elapsedTime);
    // console.log(date.getDate());
    // console.log(selectedDates[0]);
  },
};

flatpickr(selector, options);

let userSelectedDate = 0;
let ms = 0;

function convertMs() {
  const intervalId = setInterval(() => {
    const ms = userSelectedDate - Date.now();

    if (ms <= 1000) {
      clearInterval(intervalId);
    }

    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    daysEl.textContent = days.toString().padStart(2, '0');
    hoursEl.textContent = hours.toString().padStart(2, '0');
    minutesEl.textContent = minutes.toString().padStart(2, '0');
    secondsEl.textContent = seconds.toString().padStart(2, '0');
    //   return { days, hours, minutes, seconds };
  }, 1000);
}

// function addLeadingZero(value) {
//   daysEl.textContent = days.toString().padStart(2, '0');
//   hoursEl.textContent = hours.toString().padStart(2, '0');
//   minutesEl.textContent = minutes.toString().padStart(2, '0');
//   secondsEl.textContent = seconds.toString().padStart(2, '0');
// }

startBtn.addEventListener('click', () => {
  convertMs(ms);
});
