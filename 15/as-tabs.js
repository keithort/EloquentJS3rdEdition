function asTabs(node) {
  let activeTab = 0;
  const buttons = document.createElement("div");
  const tabs = Array.from(node.children, child => {
    let button = document.createElement("button");
    button.textContent = child.getAttribute("data-tabname");
    button.addEventListener("click", handleButtons);
    child.style.display = "none";
    buttons.appendChild(button);
    return child;
  });
  node.insertBefore(buttons, node.firstChild);

  function handleButtons(event) {
    event.preventDefault();
    const id = event.target.textContent;
    for (let tab of tabs) {
      tab.style.display = tab.dataset.tabname == id ? "block" : "none";
    }
    for (let button of buttons.childNodes) {
      button.style.color = button.textContent == id ? "blue" : "black";
    }
  }
  tabs[activeTab].style.display = "block";
}
asTabs(document.querySelector("tab-panel"));
