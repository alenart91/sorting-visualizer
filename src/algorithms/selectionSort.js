let selectionSort = (myArray, speed, continueSort, callback) => {

  // create worker when function is invoked
  const worker = new Worker(new URL('selectionWorker.js', import.meta.url));

  worker.postMessage(myArray);

  worker.onmessage = (e) => {

    // stop the function when stop button is clicked
    if(continueSort.continue === false) {
      worker.terminate();
      return callback();
    }

    if(e.data.method === 'color') {
      addColor(e.data.status, e.data.j, e.data.previousItem, e.data.itemOne, e.data.itemTwo, e.data.indexMin);
    }

    if(e.data.method === 'swap') {
      swap(e.data.itemOne, e.data.itemTwo);
    }

    if(e.data.method === 'sorted') {
      sorted(e.data.indexMin, e.data.i, e.data.length);
    }

    if(e.data.message === 'finished') {

      // kill worker thread
      worker.terminate();
      return callback();
    }
  };



  // adds color for sorted items
  async function sorted(indexMin, i, length) {

    let minChild = document.getElementById(indexMin);
    minChild.setAttribute('data-sorted', 'true');

    // sets the last item in array to sorted on the last outer loop iteration
    if(i === (length - 2)) {
      let lastChild = document.getElementById(length);
      lastChild.setAttribute('data-sorted', 'true');
    }

    return worker.postMessage({message: 'sortedFinished'});
  }





  // adds and removes colors for comparison
  async function addColor(status, j, previousItem, itemOne, itemTwo, indexMin) {

    let firstChild = document.getElementById(itemOne);
    let secondChild = document.getElementById(itemTwo);
    let previousChild = document.getElementById(previousItem);

    let start;

    async function animateColor(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;



      if(status === 'compare') {

        // fix issue of comparing the same item for the first iteration of every inner loop
        if(firstChild === secondChild) {
          firstChild.setAttribute('data-current', 'true');
        } else {

          // remove compare color from item from prev iteration
          if(previousChild !== null) {
            previousChild.removeAttribute('data-compare');
          }

            firstChild.setAttribute('data-current', 'true');
            secondChild.setAttribute('data-compare', 'true');
        }
      }



      if(status === 'before swap') {

        // remove the compare attribute from the previous iteration
        secondChild.removeAttribute('data-compare');

        // highlight item to be swapped right before swap
        let minChild = document.getElementById(indexMin);
        minChild.setAttribute('data-compare', 'true');
      }


      if(status === 'after swap') {
        firstChild.removeAttribute('data-current');

        let minChild = document.getElementById(indexMin);
        minChild.removeAttribute('data-compare');

      }




      if(elapsed > speed) {

        return worker.postMessage({message: 'colorFinished'});

       } else {
          window.requestAnimationFrame(animateColor);
      }
  };

    window.requestAnimationFrame(animateColor);
  };




  function swap(itemOne, itemTwo) {

    let moveX,
    moveY;

    let transX,
    transY;

    let styleFirst,
    styleSecond;

    let x,
    y;

    let xBase,
    yBase;

    let start;


    let firstChild = document.getElementById(itemOne);
    let secondChild = document.getElementById(itemTwo);

    // if transform property was assigned before then get it; if not set it to 0
    firstChild.style.transform ? styleFirst = +firstChild.style.transform.replace(/[^-?\d.]/g, '') : styleFirst = 0;
    secondChild.style.transform ? styleSecond = +secondChild.style.transform.replace(/[^-?\d.]/g, '') : styleSecond = 0;

    x = firstChild.getBoundingClientRect();
    y = secondChild.getBoundingClientRect();

    xBase = (Math.round(y.x * 100) / 100) - (Math.round(x.x * 100) / 100);
    yBase = (Math.round(x.x * 100) / 100) - (Math.round(y.x * 100) / 100);


    function swapItems(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      const progress = elapsed / speed;

      moveX = (xBase * Math.min(progress, 1)) + styleFirst;
      moveY = (yBase * Math.min(progress, 1)) + styleSecond;

      transX = moveX.toFixed(2) + 'px';
      transY = moveY.toFixed(2) + 'px';

      firstChild.style.transform = `translateX(${transX})`;
      secondChild.style.transform = `translateX(${transY})`;


      if(elapsed < speed) {
         window.requestAnimationFrame(swapItems);
      } else {

          // items may move multiple places. They need to trade exact positions in the DOM.
          let parent = document.querySelector('.sort');
          let temp = document.createElement('div');
          parent.prepend(temp);

          secondChild.after(temp);
          firstChild.after(secondChild); // elem.after(p) == p is after elem
          temp.after(firstChild);

          temp.remove();

          firstChild.style.transform = `translateX(0px)`;
          secondChild.style.transform = `translateX(0px)`;

         return worker.postMessage({message:'animationFinished'});
     }

   };

   window.requestAnimationFrame(swapItems);

 };


};


  export default selectionSort;
