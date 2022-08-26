import sleep from "./time.js";

// always switches the greatest value for the smallest value in each iteration

let selectionSort = async (myArray, time, continueSort) => {
  let parent = document.querySelector('.sort');
  let indexMin;

  let firstChild,
  secondChild;

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

  let finalX,
  finalY;

  for(let i = 0; i < myArray.length - 1; i++) {

    // stop sorting
    if(continueSort.continue === false) {
      return;
    }

    indexMin = i;

    if(i > 0) {
    firstChild.removeAttribute('data-current');
  }

    // i and indexMin = 0
    // j = i because the minimum value will be put at the beginning of each full iteration
    for(let j = i; j < myArray.length; j++) {

      // stop sorting
      if(continueSort.continue === false) {
        return;
      }

      await sleep(time);
      firstChild = document.getElementById(myArray[i]);
      secondChild = document.getElementById(myArray[j]);

      // first iteration always compares the same element
      if(j !== i) {

        await sleep(time);
        secondChild.setAttribute('data-compare', 'true');
      }

      firstChild.setAttribute('data-current', 'true');

      // indexMin stays the same until if statement executes
      // j iterates over all the items



      // sets indexMin to j which updates immediately after the if statement
      // so indexMin is always one behind
      await sleep(time);


      if(myArray[indexMin] > myArray[j]) {

        // stop sorting
        if(continueSort.continue === false) {
          return;
        }

        // sets index min to the last number it was bigger than
        // making it the current minimum number
        indexMin = j;
      }

      if(j === (myArray.length - 1) && j === indexMin) {

      // break out of loop before attribute is removed
      break;
     }

     secondChild.removeAttribute('data-compare');

    };

    // ran after full j loop iteration
    if(i !== indexMin) {

      // stop sorting
      if(continueSort.continue === false) {
        return;
      }

      await sleep(time);
      // have to reassign values to make sure they match before they are swapped
      firstChild = document.getElementById(myArray[i]);
      secondChild = document.getElementById(myArray[indexMin]);

      // if(j !== indexMin)
      secondChild.setAttribute('data-compare', 'true');
      await sleep(time);

      // swap
      let aux = myArray[i];
      myArray[i] = myArray[indexMin];
      myArray[indexMin] = aux;

      // swap animation
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

      firstChild.style.zIndex = '2';
      secondChild.style.zIndex = '2';

      firstChild.style.transform = `translateX(${finalX})`;
      secondChild.style.transform = `translateX(${finalY})`;

      firstChild.style.zIndex = '0';
      secondChild.style.zIndex = '0';

      firstChild.removeAttribute('data-current');
      secondChild.removeAttribute('data-compare');

      await sleep(time);

      // items may move multiple places. They need to trade exact positions in the DOM.
      let temp = document.createElement('div');
      parent.prepend(temp);

      secondChild.after(temp);
      firstChild.after(secondChild); // elem.after(p) == p is after elem
      temp.after(firstChild);

      temp.remove();

      firstChild.style.transform = `translateX(0px)`;
      secondChild.style.transform = `translateX(0px)`;


    }
  }

  firstChild.removeAttribute('data-current');


};

export default selectionSort;
