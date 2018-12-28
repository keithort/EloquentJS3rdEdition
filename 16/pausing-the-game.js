function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let running = 1;

  return new Promise(resolve => {
    function escapeHandler(event) {
      if (event.key !== "Escape") {
        return;
      }
      event.preventDefault();
      switch (running) {
        case 0:
          running = 1;
          runAnimation(frame);
          break;
        case 1:
          running = 0;
          break;
        default:
          running = 1;
          break;
      }
    }
    window.addEventListener("keydown", escapeHandler);

    runAnimation(time => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        window.removeEventListener("keydown", escapeHandler);
        resolve(state.status);
        return false;
      }
    });
  });
}
runGame(GAME_LEVELS, DOMDisplay);
