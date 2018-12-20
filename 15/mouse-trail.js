let dots = [];
let dot = 0;
for (let i = 0; i < 12; i++) {
  let div = document.createElement("div");
  div.classList.add("trail");
  document.body.appendChild(div);
  dots.push(div);
}

function handleMouse(event) {
  dots[dot].style.top = event.pageY + "px";
  dots[dot].style.left = event.pageX + "px";
  dot++;
  if (dot == 12) {
    dot = 0;
  }
}
window.addEventListener("mousemove", handleMouse);
