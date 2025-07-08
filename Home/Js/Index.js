function calculateAge(birthDate) {
    const now = new Date();
    const diff = now - birthDate;
    const ageInYears = diff / (1000 * 60 * 60 * 24 * 365.2425);
    return ageInYears.toFixed(1);
  }
  
  const birthDate = new Date(2008, 7, 19);
  const ageElement = document.querySelector('.age');
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
    document.body.appendChild(confettiContainer);
  
    for (let i = 0; i < 200; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '8px';
      confetti.style.height = '8px';
      confetti.style.background = getRandomColor();
      confetti.style.top = `${Math.random() * window.innerHeight}px`;
      confetti.style.left = `${Math.random() * window.innerWidth}px`;
      confetti.style.opacity = 1;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.borderRadius = '2px';
      confettiContainer.appendChild(confetti);
  
      setTimeout(() => {
        confetti.style.transition = 'transform 4.5s ease, opacity 4.5s ease';
        confetti.style.transform += ` translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = 0;
      }, 50);
    }
  
    setTimeout(() => {
      confettiContainer.remove();
    }, 5000);
  }
  
  function getRandomColor() {
    const colors = ['#ff2c9c', '#ff6f61', '#ffaa00', '#3cffa7', '#2cfaff', '#fffb3c', '#ffffff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
