var isHolding = {
  s: false, d: false, f: false, ' ': false, j: false, k: false, l: false
};

var hits = { perfect: 0, good: 0, bad: 0, miss: 0 };
var multiplier = {
  perfect: 1, good: 0.8, bad: 0.5, miss: 0, combo40: 1.05, combo80: 1.10
};
var isPlaying = false;
var speed = 0;
var combo = 0;
var maxCombo = 0;
var score = 0;
var animation = 'moveDown';
var startTime;
var trackContainer;
var tracks;
var keypress;
var comboText;

// UI elements
var liveScoreSpan = document.getElementById('liveScore');
var comboMeterFill = document.getElementById('comboMeterFill');
var restoreStateSpan = document.getElementById('restoreState');
var finalGradeSpan = document.getElementById('finalGrade');
var startOverlay = document.getElementById('startOverlay');
var summaryScreen = document.getElementById('summaryScreen');
var summaryTimerDisplay = document.getElementById('summaryTimer');

var initializeNotes = function () {
  var noteElement, trackElement;

  while (trackContainer.hasChildNodes()) {
    trackContainer.removeChild(trackContainer.lastChild);
  }

  song.sheet.forEach(function (key, index) {
    trackElement = document.createElement('div');
    trackElement.classList.add('track');

    key.notes.forEach(function (note) {
      noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.classList.add('note--' + index);
      if (index === 3) noteElement.style.backgroundColor = '#b07cff';
      else if (index === 1 || index === 5) noteElement.style.backgroundColor = '#ff2d75';
      else noteElement.style.backgroundColor = '#00c8ff';
      noteElement.style.boxShadow = '0 0 20px currentColor';
      noteElement.style.animationName = animation;
      noteElement.style.animationTimingFunction = 'linear';
      noteElement.style.animationDuration = note.duration - speed + 's';
      noteElement.style.animationDelay = note.delay + speed + 's';
      noteElement.style.animationPlayState = 'paused';
      trackElement.appendChild(noteElement);
    });

    trackContainer.appendChild(trackElement);
    tracks = document.querySelectorAll('.track');
  });
};

// Speed buttons
document.querySelectorAll('.speed-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');
    speed = parseInt(this.dataset.speed) - 1;
    initializeNotes();
  });
});

// Start button
document.getElementById('startRestoreBtn').addEventListener('click', function() {
  if (isPlaying) return;

  isPlaying = true;
  startTime = Date.now();
  startOverlay.style.opacity = '0';
  setTimeout(function() { startOverlay.style.display = 'none'; }, 500);

  startTimer(song.duration);

  document.querySelectorAll('.note').forEach(function(note) {
    note.style.animationPlayState = 'running';
  });
  restoreStateSpan.textContent = 'RESTORING...';

  var audio = document.querySelector('.song');
  audio.currentTime = 0;
  var playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(function(error) {
      console.warn('Audio play failed (autoplay restriction or missing file). Game continues without sound.');
    });
  }
});

var startTimer = function (duration) {
  var timer = duration;
  var minutes, seconds;

  summaryTimerDisplay.style.display = 'block';
  summaryTimerDisplay.style.opacity = '1';

  var interval = setInterval(function () {
    minutes = Math.floor(timer / 60);
    seconds = timer % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    summaryTimerDisplay.innerHTML = minutes + ':' + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      showResult();
      comboText.style.opacity = 0;
      restoreStateSpan.textContent = 'COMPLETE';
    }
  }, 1000);
};

var showResult = function () {
  summaryTimerDisplay.style.display = 'none';
  
  document.querySelector('.perfect__count').innerHTML = hits.perfect;
  document.querySelector('.good__count').innerHTML = hits.good;
  document.querySelector('.bad__count').innerHTML = hits.bad;
  document.querySelector('.miss__count').innerHTML = hits.miss;
  document.querySelector('.combo__count').innerHTML = maxCombo;
  document.querySelector('.score__count').innerHTML = score;
  
  var total = hits.perfect + hits.good + hits.bad + hits.miss;
  var accuracy = total ? (hits.perfect * 1.0 + hits.good * 0.8 + hits.bad * 0.5) / total * 100 : 0;
  var grade = 'C';
  if (accuracy >= 95) grade = 'SS';
  else if (accuracy >= 90) grade = 'S';
  else if (accuracy >= 80) grade = 'A';
  else if (accuracy >= 70) grade = 'B';
  finalGradeSpan.innerHTML = 'GRADE: ' + grade;
  
  summaryScreen.classList.add('show');
};

document.getElementById('restartBtn').addEventListener('click', function() {
  location.reload();
});

var setupNoteMiss = function () {
  trackContainer.addEventListener('animationend', function (event) {
    var target = event.target;
    if (!target.classList.contains('note')) return;
    
    var classList = target.classList;
    var index = -1;
    for (var i = 0; i < classList.length; i++) {
      if (classList[i].startsWith('note--')) {
        index = parseInt(classList[i].split('--')[1]);
        break;
      }
    }
    if (index === -1) return;
    
    displayAccuracy('miss');
    updateHits('miss');
    updateCombo('miss');
    updateMaxCombo();
    removeNoteFromTrack(target.parentNode, target);
    updateNext(index);
  });
};

var setupKeys = function () {
  document.addEventListener('keydown', function (event) {
    var key = event.key;
    var keyIndex = getKeyIndex(key);
    if (keyIndex !== -1 && !isHolding[key]) {
      isHolding[key] = true;
      keypress[keyIndex].style.display = 'block';
      if (isPlaying && tracks[keyIndex].firstChild) {
        judge(keyIndex);
      }
    }
  });

  document.addEventListener('keyup', function (event) {
    var key = event.key;
    if (Object.keys(isHolding).indexOf(key) !== -1) {
      var keyIndex = getKeyIndex(key);
      isHolding[key] = false;
      keypress[keyIndex].style.display = 'none';
    }
  });
};

var getKeyIndex = function (key) {
  if (key === 's') return 0; else if (key === 'd') return 1;
  else if (key === 'f') return 2; else if (key === ' ') return 3;
  else if (key === 'j') return 4; else if (key === 'k') return 5;
  else if (key === 'l') return 6;
  return -1;
};

var judge = function (index) {
  var timeInSecond = (Date.now() - startTime) / 1000;
  var nextNoteIndex = song.sheet[index].next;
  if (nextNoteIndex >= song.sheet[index].notes.length) return;
  
  var nextNote = song.sheet[index].notes[nextNoteIndex];
  var perfectTime = nextNote.duration + nextNote.delay;
  var accuracy = Math.abs(timeInSecond - perfectTime);
  var hitJudgement;

  if (accuracy > (nextNote.duration - speed) / 4) return;

  hitJudgement = getHitJudgement(accuracy);
  displayAccuracy(hitJudgement);
  showHitEffect(index);
  updateHits(hitJudgement);
  updateCombo(hitJudgement);
  updateMaxCombo();
  calculateScore(hitJudgement);
  removeNoteFromTrack(tracks[index], tracks[index].firstChild);
  updateNext(index);
  updateLiveUI();
};

var getHitJudgement = function (accuracy) {
  if (accuracy < 0.1) return 'perfect';
  else if (accuracy < 0.2) return 'good';
  else if (accuracy < 0.3) return 'bad';
  else return 'miss';
};

var displayAccuracy = function (accuracy) {
  var accuracyText = document.createElement('div');
  var old = document.querySelector('.hit__accuracy');
  if (old) old.remove();
  accuracyText.classList.add('hit__accuracy', 'hit__accuracy--' + accuracy);
  accuracyText.innerHTML = accuracy;
  document.querySelector('.hit').appendChild(accuracyText);
};

var showHitEffect = function (index) {
  var key = document.querySelectorAll('.key')[index];
  var hitEffect = document.createElement('div');
  hitEffect.classList.add('key__hit');
  key.appendChild(hitEffect);
};

var updateHits = function (judgement) { hits[judgement]++; };
var updateCombo = function (judgement) {
  if (judgement === 'bad' || judgement === 'miss') { combo = 0; comboText.innerHTML = ''; }
  else { comboText.innerHTML = ++combo; }
  updateComboMeter();
};
var updateMaxCombo = function () { maxCombo = Math.max(maxCombo, combo); };
var calculateScore = function (judgement) {
  var base = 1000 * multiplier[judgement];
  if (combo >= 80) base *= multiplier.combo80;
  else if (combo >= 40) base *= multiplier.combo40;
  score += Math.floor(base);
};

var updateLiveUI = function () {
  if (liveScoreSpan) liveScoreSpan.textContent = String(Math.min(999999, score)).padStart(6, '0');
  updateComboMeter();
};
var updateComboMeter = function () {
  if (comboMeterFill) comboMeterFill.style.width = Math.min(combo / 50 * 100, 100) + '%';
};
var removeNoteFromTrack = function (parent, child) { parent.removeChild(child); };
var updateNext = function (index) { song.sheet[index].next++; };

window.onload = function () {
  trackContainer = document.querySelector('.track-container');
  keypress = document.querySelectorAll('.keypress');
  comboText = document.querySelector('.hit__combo');
  liveScoreSpan = document.getElementById('liveScore');
  comboMeterFill = document.getElementById('comboMeterFill');
  restoreStateSpan = document.getElementById('restoreState');
  finalGradeSpan = document.getElementById('finalGrade');
  startOverlay = document.getElementById('startOverlay');
  summaryScreen = document.getElementById('summaryScreen');
  summaryTimerDisplay = document.getElementById('summaryTimer');

  initializeNotes();
  setupKeys();
  setupNoteMiss();
};