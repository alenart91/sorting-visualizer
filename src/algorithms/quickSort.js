let quickSort = (myArray, speed, continueSort, callback) => {

  // create worker when function is invoked
  const worker = new Worker(new URL('quickWorker.js', import.meta.url));
  worker.postMessage(myArray);

  worker.onmessage = (e) => {

    try {

      // stop the function when stop button is clicked
      if(continueSort.continue === false) {
        worker.terminate();
        return callback();
      }

      if(e.data.method === 'color') {

        addColor(e.data.status, e.data.pivot, e.data.itemOne, e.data.itemTwo, e.data.prevItemOne, e.data.prevItemTwo);
      }

      if(e.data.method === 'swap') {

        swap(e.data.itemOne, e.data.itemTwo);
      }

      if(e.data.method === 'sorted') {
        sorted(e.data.array);
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



  function sorted(array) {

    for(let i = 0; i < array.length; i++) {
      let item = document.getElementById(array[i]);
      item.setAttribute('data-sorted', 'true');
    }

    return worker.postMessage({message: 'sortedFinished'});
  }



  function addColor(status, pivot, itemOne, itemTwo, prevItemOne, prevItemTwo) {

    let firstChild = document.getElementById(itemOne);
    let secondChild = document.getElementById(itemTwo);
    let pivotItem = document.getElementById(pivot);

    let prevFirstChild = document.getElementById(prevItemOne);
    let prevSecondChild = document.getElementById(prevItemTwo);

    let start;


    function animateColor(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;


      if(status === 'initiate') {

        if(prevFirstChild === null || prevSecondChild === null) {

        } else {

            prevFirstChild.removeAttribute('data-current');
            prevSecondChild.removeAttribute('data-compare');
        }

        firstChild.setAttribute('data-current', 'true');
        secondChild.setAttribute('data-compare', 'true');
      }


      if(status === 'iColor') {

        if(prevFirstChild !== null) {

          if(prevFirstChild.hasAttribute('data-mixed')) {
            prevFirstChild.removeAttribute('data-mixed');
          }

          prevFirstChild.removeAttribute('data-current');
          firstChild.setAttribute('data-current', 'true');

          if(firstChild.hasAttribute('data-compare')) {
            firstChild.setAttribute('data-mixed', 'true');
          }
        }
      }


      if(status === 'jColor') {

        if(prevSecondChild !== null) {

          if(prevSecondChild.hasAttribute('data-mixed')) {
            prevSecondChild.removeAttribute('data-mixed');
          }

          prevSecondChild.removeAttribute('data-compare');
          secondChild.setAttribute('data-compare', 'true');

          if(secondChild.hasAttribute('data-current')) {
            secondChild.setAttribute('data-mixed', 'true');
          }

        }
      }


      if(status === 'after swap') {
        // they are swapped so the attributes have changed
        prevFirstChild.removeAttribute('data-compare');
        prevSecondChild.removeAttribute('data-current');

        // if both prev children are equal then we remove mixed attribute
        if(prevFirstChild === prevSecondChild) {
          prevFirstChild.removeAttribute('data-mixed');
        }

        // incrementing and decrementing after swapping means potentially one of them will be null
        if(firstChild !== null) {
          firstChild.setAttribute('data-current', 'true');
        }

        if(secondChild !== null) {
          secondChild.setAttribute('data-compare', 'true');
       }

       // if both items are the same give it the mixed attribute
       if(firstChild === secondChild) {
         firstChild.setAttribute('data-mixed', 'true');
       }

      }


      if(status === 'after loop') {
        // debugger;
        if(firstChild.hasAttribute('data-current')) {
          firstChild.removeAttribute('data-current');
        }

        // edge case where j decrements to negative number needs to check if it exists
        if(secondChild !== null) {

          if(secondChild.hasAttribute('data-compare')) {
            secondChild.removeAttribute('data-compare');
          }
        }
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

export default quickSort;
