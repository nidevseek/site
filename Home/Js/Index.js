function calculateAge(birthDate) {
  const now = new Date();
  const diff = now - birthDate;
  const ageInYears = diff / (1000 * 60 * 60 * 24 * 365.2425);
  return ageInYears.toFixed(1);
}

const birthDate = new Date(2008, 6, 19);
const ageElement = document.querySelector('.age');
const now = new Date();

const birthdayStart = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate(), 0, 0, 0);
const birthdayEnd = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate() + 1, 0, 0, 0);
const isBirthday = now >= birthdayStart && now < birthdayEnd;

if (isBirthday) {
  const birthdayMessage = document.createElement('div');
  birthdayMessage.textContent = 'С днём рождения 🎉';
  birthdayMessage.style.position = 'fixed';
  birthdayMessage.style.top = '20px';
  birthdayMessage.style.left = '50%';
  birthdayMessage.style.transform = 'translateX(-50%)';
  birthdayMessage.style.padding = '10px 20px';
  birthdayMessage.style.borderRadius = '12px';
  birthdayMessage.style.fontSize = '24px';
  birthdayMessage.style.fontWeight = 'bold';
  birthdayMessage.style.zIndex = '9999';
  birthdayMessage.style.color = '#fff';
  birthdayMessage.style.animation = 'pulse 2s infinite ease-in-out';
  document.body.appendChild(birthdayMessage);

  launchConfetti(true);

  setInterval(() => {
    launchConfetti(true);
  }, 10000);
}

let showingTime = false;

function updateAgeText() {
  ageElement.textContent = `Мне ${calculateAge(birthDate)} лет`;
}

updateAgeText();

function updateTimeText() {
  const now = new Date();
  const mskTime = new Date(now.getTime() + 3*60*60*1000);
  let hours = mskTime.getUTCHours();
  const minutes = String(mskTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(mskTime.getUTCSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  ageElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

updateAgeText();

ageElement.addEventListener('click', () => {
  showingTime = !showingTime;
  if (showingTime) {
    updateTimeText();
    ageElement.timeInterval = setInterval(updateTimeText, 1000);
  } else {
    clearInterval(ageElement.timeInterval);
    updateAgeText();
  }
});

let clickCount = 0;
let hideTimeout;
const avatar = document.querySelector('.avatar');

const counterEl = document.createElement('div');
counterEl.className = 'click-counter';
document.body.appendChild(counterEl);
counterEl.style.opacity = '0';

avatar.addEventListener('click', () => {
  clickCount++;
  counterEl.style.transition = 'opacity 0.5s ease';
  counterEl.style.opacity = '1';
  counterEl.textContent = `${clickCount} / 10`;

  if (clickCount === 10) {
    launchConfetti();
    clickCount = 0;
    counterEl.textContent = `0 / 10`;

    setTimeout(() => {
      counterEl.style.opacity = '0';
    }, 1500);
  }

  clearTimeout(hideTimeout);

  hideTimeout = setTimeout(() => {
    counterEl.style.opacity = '0';
  }, 5000);
});

function launchConfetti(fromTop = false) {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti';
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const shape = Math.random() > 0.5 ? 'circle' : 'stripe';

    confetti.style.position = 'absolute';
    confetti.style.width = shape === 'circle' ? `${size}px` : `${size * 2}px`;
    confetti.style.height = shape === 'circle' ? `${size}px` : `${size / 2}px`;
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.opacity = 1;
    confetti.style.borderRadius = shape === 'circle' ? '50%' : '2px';

    if (fromTop) {
      confetti.style.top = `-10px`;
      confetti.style.left = `${Math.random() * window.innerWidth}px`;
    } else {
      confetti.style.top = `${Math.random() * window.innerHeight}px`;
      confetti.style.left = `${Math.random() * window.innerWidth}px`;
    }

    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(confetti);

    const duration = 3000 + Math.random() * 2500;
    const rotate = 360 + Math.random() * 720;
    const xDrift = (Math.random() - 0.5) * 200;

    setTimeout(() => {
      confetti.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
      confetti.style.transform += ` translate(${xDrift}px, ${window.innerHeight + 100}px) rotate(${rotate}deg)`;
      confetti.style.opacity = 0;
    }, 50);
  }

  setTimeout(() => {
    confettiContainer.remove();
  }, 6000);
}

function getRandomColor() {
  const colors = [
    '#ff2c9c', '#ff6f61', '#ffaa00', '#3cffa7', '#2cfaff', '#fffb3c', '#ffffff',
    '#00c3ff', '#8aff00', '#ff3c3c', '#b300ff', '#ff8ecb', '#00ffd0', '#ffb347',
    '#c1ff72', '#72b2ff', '#ff6767', '#ffe066', '#fdff8f', '#e3e3e3'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function showMessage() {
  alert("Сайт временно закрыт, у автора произошёл срыв, может будет открыт, а может и удалён вовсе.");
  alert("Харо прости...");
}
