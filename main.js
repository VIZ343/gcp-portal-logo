const svg = document.getElementById('logoSvg');
const replayIntroBtn = document.getElementById('replayIntro');
const playLoopBtn = document.getElementById('playLoop');

const INTRO_CLASS = 'intro-play';
const LOOP_CLASS = 'loop-play';
const LOOP_INTERVAL = 30000;
const LOOP_DURATION = 3200;
const INTRO_DURATION = 2400;

let loopIntervalId = null;
let loopTimeoutId = null;
let introTimeoutId = null;

function clearTimers() {
  if (loopIntervalId) clearInterval(loopIntervalId);
  if (loopTimeoutId) clearTimeout(loopTimeoutId);
  if (introTimeoutId) clearTimeout(introTimeoutId);
}

function triggerLoop() {
  svg.classList.remove(LOOP_CLASS);
  // force reflow to restart animation
  void svg.getBoundingClientRect();
  svg.classList.add(LOOP_CLASS);

  if (loopTimeoutId) clearTimeout(loopTimeoutId);
  loopTimeoutId = setTimeout(() => {
    svg.classList.remove(LOOP_CLASS);
  }, LOOP_DURATION);
}

function scheduleLoop() {
  if (loopIntervalId) clearInterval(loopIntervalId);
  loopIntervalId = setInterval(triggerLoop, LOOP_INTERVAL);
}

function replayIntro() {
  clearTimers();
  svg.classList.remove(INTRO_CLASS, LOOP_CLASS);
  void svg.getBoundingClientRect();
  svg.classList.add(INTRO_CLASS);

  introTimeoutId = setTimeout(() => {
    svg.classList.remove(INTRO_CLASS);
    scheduleLoop();
  }, INTRO_DURATION);
}

replayIntroBtn.addEventListener('click', replayIntro);
playLoopBtn.addEventListener('click', triggerLoop);

window.addEventListener('beforeunload', clearTimers);

// Initial flow
window.addEventListener('load', () => {
  // Let the intro finish, then keep the text static and trigger the recurring logo loop.
  introTimeoutId = setTimeout(() => {
    svg.classList.remove(INTRO_CLASS);
    scheduleLoop();
  }, INTRO_DURATION);
});
