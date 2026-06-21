(function() {
  function $(id) {
    return document.getElementById(id);
  }

  var card = $('card'),
      openB = $('open'),
      closeB = $('close'),
      timer = null;

  var confettiColors = ['#E11D48', '#FB7185', '#EA580C', '#FECDD3', '#FFFFFF'];

  if (sessionStorage.getItem('gameWon') === '1') {
    $('game-badge').hidden = false;
    $('game-bonus').hidden = false;
  }

  function launchConfetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    for (var i = 0; i < 40; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = (Math.random() * 100) + 'vw';
      piece.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      piece.style.animationDuration = (2 + Math.random() * 1.5) + 's';
      piece.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
      container.appendChild(piece);
    }

    setTimeout(function () {
      container.remove();
    }, 4000);
  }

  openB.addEventListener('click', function () {
    card.setAttribute('class', 'open-half');
    launchConfetti();
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', 'open-fully');
      timer = null;
    }, 1000);
  });

  closeB.addEventListener('click', function () {
    card.setAttribute('class', 'close-half');
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      card.setAttribute('class', '');
      timer = null;
    }, 1000);
  });

}());
