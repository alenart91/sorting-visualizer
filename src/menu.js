function initMenu(start, algo, algoDisplay, callback) {

  let menu = document.querySelector('.menu');

  Array.from(menu.children).forEach( (item) => {
    item.setAttribute('id', `${item.innerText}`);
    item.addEventListener('click', menuSelection);
  });

  let initializedMenuItem = document.getElementById(`${start}`);
  initializedMenuItem.setAttribute('data-selected', 'true');

  function menuSelection(e) {

  if(initializedMenuItem !== e.target) {
    initializedMenuItem.removeAttribute('data-selected');
    initializedMenuItem = document.getElementById(`${e.target.innerText}`);
    initializedMenuItem.setAttribute('data-selected', 'true');
    algo = e.target.innerText;
    console.log(algo);
    algoDisplay.innerHTML = `<p>Current Algorithm: ${algo}</p>`;
    return callback(algo);
  } else {
    // error
  }


};

};


export default initMenu;
