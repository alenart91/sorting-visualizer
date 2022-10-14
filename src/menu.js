import messageBar from './messageBar.js'

function initMenu(start, algo, algoDisplay, sorting, callback) {

  try {

    let menu = document.querySelector('.menu');
    menu.addEventListener('click', menuSelection);

    let initializedMenuItem = menu.children[0];

    // if the set starting menu item is different
    if(initializedMenuItem.innerText !== start) {

      initializedMenuItem.setAttribute('data-selected', 'true');
      algo = initializedMenuItem.innerText;
      algoDisplay.innerHTML = `<p>Current Algorithm: ${algo}</p>`;
      return callback(algo);
    }

    initializedMenuItem.setAttribute('data-selected', 'true');

    function menuSelection(e) {

      // if sorting is currently happening prevent user from changing algorithm
      if(sorting.isSorting === true) {
        e.preventDefault();
        return messageBar('click stop or wait for sorting to finish before selecting a new algorithm');
      }

      // prevent parent container from responding to clicks
      if(e.target === e.currentTarget) {
        e.preventDefault();
        return;
      }

      if(initializedMenuItem !== e.target) {
        initializedMenuItem.removeAttribute('data-selected');
        initializedMenuItem = e.target;
        initializedMenuItem.setAttribute('data-selected', 'true');

        algo = e.target.innerText;
        algoDisplay.innerHTML = `<p>Current Algorithm: ${algo}</p>`;
        return callback(algo);
      }
    }
  } catch(err) {
    return messageBar(err.message);
  }
};


export default initMenu;
