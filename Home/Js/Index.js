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

  launchConfetti();
}


ageElement.textContent = `Мне ${calculateAge(birthDate)} лет`;

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

function launchConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.className = 'confetti';
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.top = '0';
  confettiContainer.style.left = '0';
  confettiContainer.style.width = '100%';
  confettiContainer.style.height = '100%';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = '9998';
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '8px';
    confetti.style.height = '8px';
    confetti.style.background = getRandomColor();
    confetti.style.top = `-10px`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.opacity = 1;
    confetti.style.borderRadius = '2px';
    confetti.style.animation = `confetti-fall 4s ease-out forwards`;
    confetti.style.animationDelay = `${Math.random() * 2}s`;
    confettiContainer.appendChild(confetti);
  }

  setTimeout(() => {
    confettiContainer.remove();
  }, 5000);
}

launchConfetti();
setInterval(launchConfetti, 10000);


function getRandomColor() {
  const colors = ['#ff2c9c', '#ff6f61', '#ffaa00', '#3cffa7', '#2cfaff', '#fffb3c', '#ffffff'];
  return colors[Math.floor(Math.random() * colors.length)];
}
