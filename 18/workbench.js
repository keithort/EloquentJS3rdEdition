let button = document.querySelector("#button");
function handleButton() {
  let code = document.querySelector("#code").value;
  let output = document.querySelector("#output");
  try {
    let result = Function(code)();
    output.innerText = String(result);
  } catch (err) {
    output.innerText = `Error: ${err}`;
  }
}
button.addEventListener("click", handleButton);
