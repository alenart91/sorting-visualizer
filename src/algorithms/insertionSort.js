let insertionSort = (myArray, speed, continueSort, callback) => {

  // create worker when function is invoked
  const worker = new Worker(new URL('insertionWorker.js', import.meta.url));

  worker.postMessage(myArray);

  worker.onmessage = (e) => {
    try {


      // stop the function when stop button is clicked
      if(continueSort.continue === false) {
        worker.terminate();
        return callback();
      }

      if(e.data.method === 'color') {
        addColor(e.data.status, e.data.array, e.data.j, e.data.temp, e.data.itemOne, e.data.itemTwo);
      }

      if(e.data.method === 'swap') {
        swap(e.data.itemOne, e.data.itemTwo);
      }

      if(e.data.method === 'sorted') {
        sorted(e.data.array, e.data.i, e.data.temp, e.data.itemTwo);
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
  function sorted(array, i, temp, itemTwo) {

    let secondChild = document.getElementById(itemTwo);
    let tempChild = document.getElementById(temp);


     if(i === 1) {

       // on the first iteration set both items to sorted whether or not they're swapped
       if(secondChild === null) {
         tempChild.setAttribute('data-sorted', 'true');

         let jChild = document.getElementById(array[i]);
         jChild.setAttribute('data-sorted', 'true');
       } else {
         tempChild.setAttribute('data-sorted', 'true');
         secondChild.setAttribute('data-sorted', 'true');
         }
     } else {
         tempChild.setAttribute('data-sorted', 'true');
     }

    return worker.postMessage({message: 'sortedFinished'});
  }





  // adds and removes colors for comparison
  function addColor(status, array, j, temp, itemOne, itemTwo) {

    let firstChild = document.getElementById(itemOne);
    let secondChild = document.getElementById(itemTwo);

    let start;

    function animateColor(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;


      if(status === 'initial compare') {

        let thirdChild = document.getElementById(array[j - 2]);
        if(thirdChild !== null && thirdChild.hasAttribute('data-compare')) {

          thirdChild.removeAttribute('data-compare');
          secondChild.removeAttribute('data-current');

        }

        firstChild.setAttribute('data-current', 'true');
        secondChild.setAttribute('data-compare', 'true');
      }



      if(status === 'compare') {
        let thirdChild = document.getElementById(array[j - 2]);

        // remove previous two comparisons
        if(thirdChild !== null && thirdChild.hasAttribute('data-compare')) {

          thirdChild.removeAttribute('data-compare');
          secondChild.removeAttribute('data-current');
        }

        firstChild.setAttribute('data-current', 'true');

        // remove the sorted color temporarily to show it being compared
        if(secondChild.hasAttribute('data-sorted')) {
          secondChild.removeAttribute('data-sorted');
        }

        secondChild.setAttribute('data-compare', 'true');
      }


      if(status === 'after swap') {

        firstChild.removeAttribute('data-compare');

        // set the sorted color back after swapping
        firstChild.setAttribute('data-sorted', 'true');
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

         // changes actual element order in the DOM
         secondChild.before(firstChild);

         // remove translate so element is in correct position after switch
         firstChild.style.transform = `translateX(0px)`;
         secondChild.style.transform = `translateX(0px)`;

         return worker.postMessage({message:'animationFinished'});
     }

   };

   window.requestAnimationFrame(swapItems);

 };


};


  export default insertionSort;
