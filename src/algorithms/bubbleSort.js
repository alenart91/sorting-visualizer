
let bubbleSort = (myArray, speed, continueSort, callback) => {

  // create worker when function is invoked
  const worker = new Worker(new URL('bubbleWorker.js', import.meta.url));

  worker.postMessage(myArray);

  worker.onmessage = (e) => {

    try {

      // stop the function when stop button is clicked
      if(continueSort.continue === false) {
        worker.terminate();
        return callback();
      }

      if(e.data.method === 'color') {
        addColor(e.data.array, e.data.itemOne, e.data.itemTwo, e.data.i, e.data.j, e.data.length, e.data.swapped);
      }

      if(e.data.method === 'swap') {
        swap(e.data.itemOne, e.data.itemTwo);
      }

      if(e.data.method === 'sorted') {
        sorted(e.data.length, e.data.i);
      }

      if(e.data.message === 'finished') {

        // kill worker thread
        worker.terminate();
        return callback();
      }

    } catch(err) {
        worker.terminate();
        return callback(err);
    }

  };


  // adds color for sorted items
  async function sorted(length, i) {

    // target last sorted item
    let item = document.getElementById(length - i);
    item.setAttribute('data-sorted', 'true');


    // specific edge case for smallest item in array
    if(i === (length - 2)) {
      let prevItem = document.getElementById(length - i - 1);
      prevItem.setAttribute('data-sorted', 'true');

      // remove attributes to prevent any styling errors
      item.removeAttribute('data-current');
      prevItem.removeAttribute('data-compare');
    }


    return worker.postMessage({message: 'sortedFinished'});
  }



  // adds and removes colors for comparison
  async function addColor(array, itemOne, itemTwo, i, j, length, swapped) {

    let firstChild = document.getElementById(itemOne);
    let secondChild = document.getElementById(itemTwo);
    let previousChild = document.getElementById(array[j - 1]);

    // add 1 to nullify array indexing
    let lastChild = document.getElementById(length - i + 1);
    let lastCompareChild = document.getElementById(array[length - i - 1]);
    let start;

    async function animateColor(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      // get the most recent sorted item and remove the current attribute
      if(i !== 0) {
         if(lastChild.hasAttribute('data-current')) {
          lastChild.removeAttribute('data-current');
        }

         // remove compare from the previous iteration
         if(lastCompareChild.hasAttribute('data-compare')) {
          lastCompareChild.removeAttribute('data-compare');
         }
      };


      // remove compare color only after it has been swapped
      if(swapped === true && j !== 0) {
        previousChild.removeAttribute('data-compare');
      }


      // set the color for both items being compared
      firstChild.setAttribute('data-current', 'true');
      secondChild.setAttribute('data-compare', 'true');

      if(elapsed > speed) {

        // if the first item is less than the second item it is not getting swapped
        // so we remove both color attributes
        if(itemOne < itemTwo) {
          firstChild.removeAttribute('data-current');
          secondChild.removeAttribute('data-compare');
        }

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

    // add previous translate amount to current
    xBase = (Math.round(y.x * 100) / 100) - (Math.round(x.x * 100) / 100) + Math.round(styleFirst * 100) / 100;
    yBase = (Math.round(x.x * 100) / 100) - (Math.round(y.x * 100) / 100) + Math.round(styleSecond * 100) / 100;


    function swapItems(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      const progress = elapsed / speed;

      let pixelsToMoveX = xBase - styleFirst;
      let pixelsToMoveY = yBase - styleSecond;

      moveX = pixelsToMoveX * Math.min(progress, 1);
      moveY = pixelsToMoveY * Math.min(progress, 1);

      transX = moveX.toFixed(2) + 'px';
      transY = moveY.toFixed(2) + 'px';

      firstChild.style.transform = `translateX(${transX})`;
      secondChild.style.transform = `translateX(${transY})`;


      if(elapsed < speed) {
         window.requestAnimationFrame(swapItems);
      } else {

         // changes actual element order in the DOM
         secondChild.after(firstChild);

         firstChild.style.transform = `translateX(0px)`;
         secondChild.style.transform = `translateX(0px)`;

         return worker.postMessage({message:'animationFinished'});
     }

   };

   window.requestAnimationFrame(swapItems);

 };

};



export default bubbleSort;
