// const bubbleWorker = new Worker(new URL('bubbleWorker.js', import.meta.url));
// import sleep from "./time.js";

let bubbleSortAnimation = (myArray, callback) => {
  // debugger;
  // create worker when function is invoked
  const bubbleWorker = new Worker(new URL('bubbleWorker.js', import.meta.url));
  let speed = 0;

  bubbleWorker.postMessage(myArray);

  // function returns control here

  bubbleWorker.onmessage = (e) => {

    console.log('message received');
    console.log(e.data);

    if(e.data.method === 'color') {
      console.log('adding color');
      addColor(e.data.itemOne, e.data.itemTwo, e.data.i, e.data.length);
    }

    if(e.data.method === 'swap') {
      console.log('swapping...');
      // debugger;
      swap(e.data.itemOne, e.data.itemTwo);
    }

    if(e.data.message === 'finished') {
      console.log('you have been terminated');
      // kill worker thread
      bubbleWorker.terminate();
      return callback();
    }
  };


  async function addColor(itemOne, itemTwo, i, length) {

    let firstChild = document.getElementById(itemOne);
    let secondChild = document.getElementById(itemTwo);

    // add 1 to nullify array indexing schema
    let lastChild = document.getElementById(length - i + 1);
    let start;

    async function animateColor(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      if(i !== 0) {
        lastChild.removeAttribute('data-current');
        lastChild.setAttribute('data-sorted', 'true');
      }

      // if(i === array.length - 1)

      firstChild.setAttribute('data-current', 'true');
      secondChild.setAttribute('data-compare', 'true');

      if(elapsed > speed) {

        if(itemOne < itemTwo) {
          firstChild.removeAttribute('data-current');
          secondChild.removeAttribute('data-compare');
        } else {
          secondChild.removeAttribute('data-compare');
        }

        return bubbleWorker.postMessage({message: 'colorFinished'});
    } else {
      window.requestAnimationFrame(animateColor);
    }
  };

    window.requestAnimationFrame(animateColor);
  };




  function swap(itemOne, itemTwo) {

    let accumulatorX = 0;
    let accumulatorY = 0;

    let moveX,
    moveY;

    let transX,
    transY;

    let numFirst,
    numSecond;

    let styleFirst,
    styleSecond;

    let finNumOne,
    finNumTwo;

    let x,
    y;

    let xNum,
    yNum;

    let xBase,
    yBase;

    let start;

    let finalX,
    finalY;

    let firstChild = document.getElementById(itemOne);
    let secondChild = document.getElementById(itemTwo);

    // firstChild.setAttribute('data-current', 'true');
    // secondChild.setAttribute('data-compare', 'true');

    firstChild.style.transform ? styleFirst = firstChild.style.transform.replace(/[^-?\d.]/g, '') : styleFirst = 0;
    secondChild.style.transform ? styleSecond = secondChild.style.transform.replace(/[^-?\d.]/g, '') : styleSecond = 0;


    numFirst = +styleFirst;
    numSecond = +styleSecond;

    finNumOne = numFirst.toFixed(4);
    finNumTwo = numSecond.toFixed(4);

    x = firstChild.getBoundingClientRect();
    y = secondChild.getBoundingClientRect();

    xNum = x.x.toFixed(4);
    yNum = y.x.toFixed(4);

    // add previous translate amount to current
    // integer
    xBase = (+yNum) - (+xNum) + (+finNumOne);
    yBase = (+xNum) - (+yNum) + (+finNumTwo);

    // back to string
    finalX = xBase.toFixed(2) + 'px';
    finalY = yBase.toFixed(2) + 'px';


    function swapItems(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      // debugger;

      // console.log('in frame');

      // moveX = Math.min(numFirst + accumulatorX, xBase); // take the smaller number
      // moveY = Math.max(numSecond + accumulatorY, yBase); // take the bigger number
      //
      // transX = moveX.toFixed(2) + 'px';
      // transY = moveY.toFixed(2) + 'px';

      firstChild.style.transform = `translateX(${finalX})`;
      secondChild.style.transform = `translateX(${finalY})`;

       // set these for speed
       // accumulatorX += 150;
       // accumulatorY -= 150;

       // console.log(moveX);
       // console.log(xBase);

       // add in logic to replace actual position in DOM

       // if(moveX !== xBase) {
       if(elapsed > speed) {
         window.requestAnimationFrame(swapItems);
     } else {
         return bubbleWorker.postMessage({message:'next'});
     }

   };

   // console.log('animation called');
   window.requestAnimationFrame(swapItems);

 };

};



export default bubbleSortAnimation;
