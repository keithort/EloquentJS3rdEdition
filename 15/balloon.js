const p = document.querySelector("p");
let size = 20;

function handleKeys(event) {
  event.preventDefault();
  if (event.key == "ArrowUp") {
    size = size * 1.1;
    if (size > 100) {
      p.textContent = "💥";
      document.body.removeEventListener("keydown", handleKeys);
    }
  } else if (event.key == "ArrowDown") {
    size = size * 0.9;
  }
  p.style.fontSize = size + "px";
}

document.body.addEventListener("keydown", handleKeys);
