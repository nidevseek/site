const snowContainer = document.getElementById('snow-container');

    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄';

        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = Math.random() * 15 + 5 + 'px'; 
        snowflake.style.animationDuration = Math.random() * 1 + 1 + 's';
        snowflake.style.animationDelay = Math.random() * 1 + 's';

        snowContainer.appendChild(snowflake);
        setTimeout(() => {
            snowflake.remove();
        }, 2000);
    }

    setInterval(createSnowflake, 15);
