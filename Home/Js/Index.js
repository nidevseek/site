/* ===================== ДАТЫ ===================== */

function isNewYearPeriod() {
  const now = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 11, 20); // 20 декабря
  const end = new Date(year + 1, 0, 10); // 10 января
  return now >= start || now <= end;
}

const isNY = isNewYearPeriod();

/* ===================== ВОЗРАСТ ===================== */

function calculateAge(birthDate) {
  const now = new Date();
  const diff = now - birthDate;
  const ageInYears = diff / (1000 * 60 * 60 * 24 * 365.2425);
  return ageInYears.toFixed(1);
}

const birthDate = new Date(2008, 6, 19);
const ageElement = document.querySelector('.age');

/* ===================== ВРЕМЯ ===================== */

let showingTime = false;

function updateAgeText() {
  ageElement.textContent = `Мне ${calculateAge(birthDate)} лет`;
}

function updateTimeText() {
  const now = new Date();
  const msk = new Date(now.getTime() + 3 * 60 * 60 * 1000);
  let h = msk.getUTCHours();
  const m = String(msk.getUTCMinutes()).padStart(2, '0');
  const s = String(msk.getUTCSeconds()).padStart(2, '0');
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  ageElement.textContent = `${h}:${m}:${s} ${ampm}`;
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

/* ===================== ДР ===================== */

const now = new Date();
const birthdayStart = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
const birthdayEnd = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate() + 1);
const isBirthday = now >= birthdayStart && now < birthdayEnd;

if (isBirthday) {
  const birthdayMessage = document.createElement('div');
  birthdayMessage.textContent = 'С днём рождения 🎉';
  Object.assign(birthdayMessage.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    borderRadius: '12px',
    fontSize: '24px',
    fontWeight: 'bold',
    zIndex: '9999',
    color: '#fff',
    animation: 'pulse 2s infinite ease-in-out'
  });
  document.body.appendChild(birthdayMessage);
  launchConfetti(true);
  setInterval(() => launchConfetti(true), 10000);
});

/* ===================== АВАТАР ===================== */

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
    setTimeout(() => { counterEl.style.opacity = '0'; }, 1500);
  }

  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => { counterEl.style.opacity = '0'; }, 5000);
});

/* ===================== ЧАСТИЦЫ ===================== */

function launchParticles(fromTop = false) {
  if (isNY) startSnow();
  else launchConfetti(fromTop);
}

/* ===================== КОНФЕТТИ ===================== */

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

    if (fromTop) confetti.style.top = `-10px`;
    else confetti.style.top = `${Math.random() * window.innerHeight}px`;
    confetti.style.left = `${Math.random() * window.innerWidth}px`;
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

  setTimeout(() => confettiContainer.remove(), 6000);
}

/* ===================== СНЕГ НА ВСЁЙ ЭКРАНЕ ===================== */

function startSnow() {
  if (document.getElementById('snow-container')) return; // чтобы не дублировать

  const container = document.createElement('div');
  container.id = 'snow-container';
  Object.assign(container.style, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 9999
  });
  document.body.appendChild(container);

  const snowflakes = [];
  const COUNT = 80;

  for (let i = 0; i < COUNT; i++) {
    const snow = document.createElement('div');
    const size = Math.random() * 4 + 2;
    snow.style.position = 'absolute';
    snow.style.width = `${size}px`;
    snow.style.height = `${size}px`;
    snow.style.background = '#fff';
    snow.style.borderRadius = '50%';
    snow.style.opacity = Math.random() * 0.8 + 0.2;

    resetSnowflake(snow, true);
    container.appendChild(snow);
    snowflakes.push(snow);
  }

  function animate() {
    for (const snow of snowflakes) {
      let y = parseFloat(snow.dataset.y) + parseFloat(snow.dataset.speed);
      let x = parseFloat(snow.dataset.x) + parseFloat(snow.dataset.drift);

      snow.dataset.y = y;
      snow.dataset.x = x;

      if (y > window.innerHeight) resetSnowflake(snow);
      snow.style.transform = `translate(${x}px, ${y}px)`;
    }
    requestAnimationFrame(animate);
  }

  animate();
}

function resetSnowflake(snow, randomY = false) {
  snow.dataset.x = Math.random() * window.innerWidth;
  snow.dataset.y = randomY ? Math.random() * window.innerHeight : -10;
  snow.dataset.speed = Math.random() * 0.5 + 0.3;
  snow.dataset.drift = (Math.random() - 0.5) * 0.2;
}

/* ===================== ЦВЕТА ===================== */

function getRandomColor() {
  const colors = ['#ff2c9c', '#ffaa00', '#3cffa7', '#2cfaff', '#ffffff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

/* ===================== ГИРЛЯНДА ===================== */

if (isNY) {
  const garland = document.querySelector('.garland');
  if (garland) {
    const colors = ['red', 'yellow', 'green', 'blue', 'purple'];
    const count = Math.floor(window.innerWidth / 40);

    for (let i = 0; i < count; i++) {
      const light = document.createElement('div');
      light.className = 'light';
      light.style.left = `${(i / count) * 100}%`;
      light.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      light.style.width = '12px';
      light.style.height = '12px';
      light.style.borderRadius = '50%';
      light.style.position = 'absolute';
      light.style.top = '20px';
      light.style.animation = `blink ${1.5 + Math.random()}s infinite alternate`;
      garland.appendChild(light);
    }
  }
}

/* ===================== CSS для мигалки гирлянды ===================== */

const style = document.createElement('style');
style.innerHTML = `
@keyframes blink {
  from { opacity: 0.3; }
  to { opacity: 1; }
}`;
document.head.appendChild(style);
