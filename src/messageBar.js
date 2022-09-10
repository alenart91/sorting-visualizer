function messageBar(message) {

  // create DOM element and add message
  let bar = document.createElement("div");
  bar.setAttribute("id", "messageBar");
  bar.innerHTML = `<p>${message}</p>`;
  bar.className = "show";

  // append to body
  document.body.appendChild(bar);

  // destroy after 4 seconds
  setTimeout(function() {
    bar.remove(); }, 4000);
};

export default messageBar;
