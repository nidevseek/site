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

function updateAgeText() {
  ageElement.textContent = `Мне ${calculateAge(birthDate)} лет`;
}

updateAgeText();

/* ===================== ВРЕМЯ ===================== */

let showingTime = false;

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

ageElement.addEventListener('click', () => {
  showingTime = !showingTime;

  if (showingTime) {
    updateTimeText();
    ageElement._interval = setInterval(updateTimeText, 1000);
  } else {
    clearInterval(ageElement._interval);
    updateAgeText();
  }
});

/* ===================== ДР ===================== */

const now = new Date();
const birthdayStart = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
const birthdayEnd = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate() + 1);
const isBirthday = now >= birthdayStart && now < birthdayEnd;

if (isBirthday) {
  const msg = document.createElement('div');
  msg.textContent = 'С днём рождения';
  Object.assign(msg.style, {
    position: 'fixed',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    fontSize: '24px',
    fontWeight: 'bold',
    zIndex: 9999,
    color: '#fff'
  });
  document.body.appendChild(msg);

  launchParticles(true);
  setInterval(() => launchParticles(true), 10000);
}

/* ===================== АВАТАР ===================== */

let clickCount = 0;
let hideTimeout;
const avatar = document.querySelector('.avatar');

const counter = document.createElement('div');
counter.className = 'click-counter';
counter.style.opacity = '0';
document.body.appendChild(counter);

avatar.addEventListener('click', () => {
  clickCount++;
  counter.style.opacity = '1';
  counter.textContent = `${clickCount} / 10`;

  if (clickCount === 10) {
    launchParticles();
    clickCount = 0;
  }

  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => counter.style.opacity = '0', 5000);
});

/* ===================== ЧАСТИЦЫ ===================== */

function launchParticles(fromTop = false) {
  if (isNY) launchSnow(fromTop);
  else launchConfetti(fromTop);
}

/* ===================== КОНФЕТТИ ===================== */

function launchConfetti(fromTop = false) {
  const c = document.createElement('div');
  document.body.appendChild(c);

  for (let i = 0; i < 150; i++) {
    const e = document.createElement('div');
    const size = Math.random() * 8 + 4;

    e.style.position = 'absolute';
    e.style.width = `${size}px`;
    e.style.height = `${size}px`;
    e.style.background = getRandomColor();
    e.style.left = `${Math.random() * innerWidth}px`;
    e.style.top = fromTop ? '-10px' : `${Math.random() * innerHeight}px`;

    c.appendChild(e);

    setTimeout(() => {
      e.style.transition = 'transform 4s linear, opacity 4s linear';
      e.style.transform = `translateY(${innerHeight + 200}px)`;
      e.style.opacity = 0;
    }, 50);
  }

  setTimeout(() => c.remove(), 6000);
}

/* ===================== СНЕГ ===================== */

function launchSnow(fromTop = false) {
  const c = document.createElement('div');
  document.body.appendChild(c);

  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    const size = Math.random() * 6 + 4;

    s.style.position = 'absolute';
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.borderRadius = '50%';
    s.style.background = '#fff';
    s.style.left = `${Math.random() * innerWidth}px`;
    s.style.top = fromTop ? '-10px' : `${Math.random() * innerHeight}px`;

    c.appendChild(s);

    setTimeout(() => {
      s.style.transition = 'transform 6s linear, opacity 6s linear';
      s.style.transform = `translateY(${innerHeight + 100}px)`;
      s.style.opacity = 0;
    }, 50);
  }

  setTimeout(() => c.remove(), 9000);
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
    const count = Math.floor(innerWidth / 40);

    for (let i = 0; i < count; i++) {
      const l = document.createElement('div');
      l.className = 'light';
      l.style.left = `${(i / count) * 100}%`;
      l.style.background = colors[Math.floor(Math.random() * colors.length)];
      l.style.animationDuration = `${1 + Math.random() * 2}s`;
      garland.appendChild(l);
    }
  }
}
