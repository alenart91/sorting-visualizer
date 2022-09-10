
import sleep from "../time.js";


let bubbleSort = async (myArray, time, continueSort) => {

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

  let moveX;
  let moveY;

  let transX,
  transY;

  // bubblesort
  for(let i = 0; i < myArray.length - 1; i++) {
    // stop sorting
    if(continueSort.continue === false) {
      return;
    }

  // set different color for finished elements
  if(i !== 0) {
  firstChild.removeAttribute('data-current');
  }

  // we use 'length - i - 1' because every outer loop increment means one item was sorted
  // so we no longer need to compare them
  // this code works because i starts at 0 so the -1 gives us the proper incrementation

  for(let j = 0; j < myArray.length - i - 1; j++) {

    // stop sorting
    if(continueSort.continue === false) {
      return;
    }

    await sleep(time); // needed

    firstChild = document.getElementById(myArray[j]);
    firstChild.setAttribute('data-current', 'true');

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

      x = firstChild.getBoundingClientRect();
      y = secondChild.getBoundingClientRect();

      xNum = x.x.toFixed(4);
      yNum = y.x.toFixed(4);

      // add previous translate amount to current
      xBase = (+yNum) - (+xNum) + (+finNumOne);
      yBase = (+xNum) - (+yNum) + (+finNumTwo);

      finalX = xBase.toFixed(2) + 'px';
      finalY = yBase.toFixed(2) + 'px';

      firstChild.style.transition = `transform 500ms`;
      secondChild.style.transition = `transform 500ms`;

      firstChild.style.transform = `translateX(${finalX})`;
      secondChild.style.transform = `translateX(${finalY})`;


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



export default bubbleSort;
