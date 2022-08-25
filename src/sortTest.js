import sleep from "./time.js";


let sortTest = async (myArray, time, continueSort) => {

  // addOffset();

  let firstChild,
  secondChild,
  x,
  y;

  let xBase,
  yBase;

  let styleFirst,
  styleSecond;

  let numFirst,
  numSecond;

  let finNumOne,
  finNumTwo;

  let xNum,
  yNum;

  let finalX,
  finalY;

  let anim;

  let accumulatorX = 5;
  let accumulatorY = 5;
  let moveX;
  let moveY;

  let transX,
  transY;
  // bubblesort

  // function test() {

  debugger;

  for(let i = 0; i < myArray.length - 1; i++) {
    // stop sorting
    if(continueSort.continue === false) {
      return;
    }

  // set different color for finished elements
  if(i !== 0) {
  firstChild.removeAttribute('data-current');
  }

  // no DOM manipulation in outer loop

  // we use 'length - i - 1' because every outer loop increment means one item was sorted
  // so we no longer need to compare them
  // this code works because i starts at 0 so the -1 gives us the proper incrementation

  for(let j = 0; j < myArray.length - i - 1; j++) {

    // stop sorting
    if(continueSort.continue === false) {
      return;
    }

    await sleep(time); // needed


  //  if(myArray[j + 1] != null) {

    firstChild = document.getElementById(myArray[j]);
    firstChild.setAttribute('data-current', 'true');
  // } else {

    // firstChild.removeAttribute('data-current');
  //  break;
//  }


    secondChild = document.getElementById(myArray[j + 1]);
    secondChild.setAttribute('data-compare', 'true');


    await sleep(time); // helps with smoother animation

    // display compare
    // let compare = document.getElementById('displayData');
    // compare.innerHTML = `<p>compare ${myArray[j]} and ${myArray[j + 1]}</p>`;

    // display current sort as well so the user knows

    if(myArray[j] > myArray[j + 1]) {

      // stop sorting
      if(continueSort.continue === false) {
        return;
      }
     // debugger;
      await sleep(time);

      let tmp = myArray[j]; // 59
      myArray[j] = myArray[j + 1]; // 59 = 56
      myArray[j + 1] = tmp; // 56 = 59

      firstChild.style.transform ? styleFirst = firstChild.style.transform.replace(/[^-?\d.]/g, '') : styleFirst = 0;
      secondChild.style.transform ? styleSecond = secondChild.style.transform.replace(/[^-?\d.]/g, '') : styleSecond = 0;

      numFirst = +styleFirst;
      numSecond = +styleSecond;

      finNumOne = numFirst.toFixed(4);
      finNumTwo = numSecond.toFixed(4);

      // console.log('firstchild', firstChild, 'secondChild', secondChild);
      // console.log('styleFirst', styleFirst, 'styleSecond', styleSecond);
      // console.log('numfirst', numFirst, 'numSecond', numSecond);
      // console.log('finOne', finNumOne, 'finTwo', finNumTwo);

      x = firstChild.getBoundingClientRect();
      y = secondChild.getBoundingClientRect();

      xNum = x.x.toFixed(4);
      yNum = y.x.toFixed(4);

      // console.log(x, y);

      // console.log("x", x.x, "y", y.x);
      // console.log("xNum", xNum, "yNum", yNum);

      // add previous translate amount to current
      xBase = (+yNum) - (+xNum) + (+finNumOne);
      yBase = (+xNum) - (+yNum) + (+finNumTwo);

      // console.log(xBase, yBase);

      finalX = xBase.toFixed(2) + 'px';
      finalY = yBase.toFixed(2) + 'px';


      // moveX = Math.min(accumulatorX, xBase); // take the smaller number
      // moveY = Math.max(accumulatorY, yBase); // take the bigger number
      //
      // transX = moveX + 'px';
      // transY = moveY + 'px';
      firstChild.style.transition = `transform 500ms`;
      secondChild.style.transition = `transform 500ms`;

      firstChild.style.transform = `translateX(${finalX})`;
      secondChild.style.transform = `translateX(${finalY})`;

      // console.log('in loop', j);
      // debugger;
      // await swap(firstChild, secondChild, xBase, yBase, finalX, finalY, j);
      //
      // console.log('after await');

      // firstChild.style.transform = `translateX(${transX})`;
      // secondChild.style.transform = `translateX(${transY})`;

      // accumulatorX += 5;
      // accumulatorY += 5;

      await sleep(time);

      // swap actual items in the dom after the transition and set translate property
      // back to 0
      // this keeps the layout fluid

      secondChild.after(firstChild);

      // CSS makes this part jumpy
      firstChild.style.transition = `none`;
      secondChild.style.transition = `none`;

      firstChild.style.transform = `translateX(0px)`;
      secondChild.style.transform = `translateX(0px)`;

      // firstChild.style.transition = `transform 500ms`;
      // secondChild.style.transition = `transform 500ms`;

      secondChild.removeAttribute('data-compare');

    } else {
    await sleep(time);

    firstChild.removeAttribute('data-current');
     // secondChild.setAttribute('data-current', 'true');
    secondChild.removeAttribute('data-compare');

   }

 }


 };

   firstChild.removeAttribute('data-current');

};


const swapAnim = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};



async function swap(firstChild, secondChild, xBase, yBase, finalX, finalY, j) {

  let accumulatorX = 0;
  let accumulatorY = 0;
  // debugger;
  let moveX;
  let moveY;

  let transX,
  transY;



  // console.log('accX', accumulatorX, 'accY', accumulatorY);
  // console.log('xBase', xBase, 'yBase', yBase);
  // console.log('moveX', moveX, 'moveY', moveY);
  console.log('in swap', j);

  async function swapItems(timestamp) {
    console.log('in frame', j);
    console.log(xBase, yBase);
    moveX = Math.min(accumulatorX, xBase); // take the smaller number
    moveY = Math.max(accumulatorY, yBase); // take the bigger number

    transX = moveX + 'px';
    transY = moveY + 'px';

    firstChild.style.transform = `translateX(${transX})`;
    secondChild.style.transform = `translateX(${transY})`;


     accumulatorX += 5;
     accumulatorY -= 5;

     // console.log(accumulatorX);

     // console.log('in swapitems', moveX, moveY);
     // console.log('xbase', xBase, 'ybase', yBase);
     // console.log(accumulatorX, accumulatorY);


     console.log(moveX, xBase);

     if(moveX !== xBase) {

       window.requestAnimationFrame(swapItems);
   } else {
      // debugger;
       return;
   }

 };

 // window.requestAnimationFrame(swapItems);

 // return await swapItems();

// return new Promise( function(resolve, reject) {
//    window.requestAnimationFrame(swapItems);
//    console.log('after animation');
//  })
//  .then(console.log('hit'));

// let anim = new Promise(window.requestAnimationFrame);

// return new Promise( window.requestAnimationFrame(swapItems));

// .then(console.log('hi'));



   // let anim = window.requestAnimationFrame(swapItems);
   // await anim;
   // return;

   // await window.requestAnimationFrame(swapItems);

};



export default sortTest;
