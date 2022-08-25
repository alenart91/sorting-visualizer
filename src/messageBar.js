function messageBar(message) {

  let bar = document.createElement("div");
  bar.setAttribute("id", "messageBar");
  bar.innerHTML = `<p>${message}</p>`;
  bar.className = "show";

  document.body.appendChild(bar);
  // add x button

  setTimeout(function() {
    bar.remove(); }, 4000);
};

export default messageBar;
