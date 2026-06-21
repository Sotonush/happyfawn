(function () {
  var playfield = document.getElementById('playfield');
  var scoreEl = document.getElementById('score');
  var targetEl = document.getElementById('target');
  var messageEl = document.getElementById('game-message');
  var nextButton = document.getElementById('next-button');
  var skipLink = document.getElementById('skip-link');

  var TARGET_SCORE = 12;
  var SPAWN_INTERVAL = 650;
  var ICONS = [
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="12" cy="16.5" rx="6" ry="4.8"/><ellipse cx="4.5" cy="9" rx="2.3" ry="3"/><ellipse cx="9.5" cy="5.2" rx="2.1" ry="2.8"/><ellipse cx="14.5" cy="5.2" rx="2.1" ry="2.8"/><ellipse cx="19.5" cy="9" rx="2.3" ry="3"/></svg>',
    '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,9 9,10 4,2"/><polygon points="19,9 15,10 20,2"/><circle cx="12" cy="13" r="8"/></svg>'
  ];
  var COLORS = ['#E11D48', '#FB7185', '#EA580C', '#881337'];
  var CONFETTI_COLORS = ['#E11D48', '#FB7185', '#EA580C', '#FECDD3', '#FFFFFF'];

  function launchConfetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    for (var i = 0; i < 60; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + 'vw';
      piece.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.animationDuration = 2 + Math.random() * 1.5 + 's';
      piece.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      container.appendChild(piece);
    }

    setTimeout(function () {
      container.remove();
    }, 4000);
  }

  var score = 0;
  var spawnTimer = null;
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  targetEl.textContent = TARGET_SCORE;

  function finish(skipped) {
    if (spawnTimer) {
      clearInterval(spawnTimer);
      spawnTimer = null;
    }
    playfield.innerHTML = '';
    messageEl.textContent = skipped
      ? 'Хорошо, идём дальше! ✨'
      : 'Идеальный улов! Ты заслужила открытку 🏆';
    nextButton.style.visibility = 'visible';
    skipLink.style.display = 'none';
    if (skipped) {
      sessionStorage.removeItem('gameWon');
    } else {
      sessionStorage.setItem('gameWon', '1');
      launchConfetti();
    }
  }

  function updateScore() {
    score++;
    scoreEl.textContent = score;
    if (score >= TARGET_SCORE) finish(false);
  }

  function spawnItem() {
    var item = document.createElement('button');
    item.type = 'button';
    item.className = 'falling-item';
    item.setAttribute('aria-label', 'Поймать');
    item.tabIndex = -1;
    item.innerHTML = ICONS[Math.floor(Math.random() * ICONS.length)];
    item.style.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    item.style.left = Math.random() * 90 + 'vw';
    item.style.animationDuration = 4 + Math.random() * 2.5 + 's';

    item.addEventListener('animationend', function () {
      item.remove();
    });

    item.addEventListener('click', function () {
      if (item.classList.contains('caught')) return;
      item.classList.add('caught');
      updateScore();
    });

    playfield.appendChild(item);
  }

  if (reducedMotion) {
    finish(true);
  } else {
    spawnTimer = setInterval(spawnItem, SPAWN_INTERVAL);
  }

  skipLink.addEventListener('click', function () {
    finish(true);
  });
}());
