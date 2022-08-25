import sleep from "./time.js";



// always switches the greatest value for the smallest value in each iteration

let selectionSort = async (myArray, time) => {
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

  // debugger;

  for(let i = 0; i < myArray.length - 1; i++) {
    indexMin = i;
    console.log('indexmin', indexMin);
    // i and indexMin = 0
    // j = i because the minimum value will be put at the beginning of each full iteration
    for(var j = i; j < myArray.length; j++) {

      firstChild = document.getElementById(myArray[i]);
      firstChild.setAttribute('data-current', 'true');

      secondChild = document.getElementById(myArray[indexMin]);
      secondChild.setAttribute('data-compare', 'true');
      // indexMin stays the same until if statement executes
      // j iterates over all the items
      console.log('indexmin in j', indexMin, 'j', j);
      console.log('array indexmin', myArray[indexMin], 'array j', myArray[j]);

      // first iteration always compares the same element
      // firstChild.setAttribute('data-current', 'true');
      // secondChild.setAttribute('data-compare', 'true');

      // sets indexMin to j which updates immediately after the if statement
      // so indexMin is always one behind

      secondChild.setAttribute('data-compare', 'false');
      if(myArray[indexMin] > myArray[j]) {
        console.log('greater than');

        // sets index min to the last number it was bigger than
        // making it the current minimum number
        indexMin = j;
        secondChild = document.getElementById(myArray[indexMin]);
        secondChild.setAttribute('data-compare', 'true');
      }
    };
        // ran after full j loop iteration
    if(i !== indexMin) {

      // console.log('last if', 'array i', myArray[i], 'array indexmin', myArray[indexMin]);

      // have to reassign values to make sure they match before they are swapped
      firstChild = document.getElementById(myArray[i]);
      secondChild = document.getElementById(myArray[indexMin]);

      // swap
      let aux = myArray[i];
      myArray[i] = myArray[indexMin];
      myArray[indexMin] = aux;

      // debugger;

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

      // console.log(xBase, yBase);

      finalX = xBase.toFixed(2) + 'px';
      finalY = yBase.toFixed(2) + 'px';

      firstChild.style.zIndex = '2';
      secondChild.style.zIndex = '2';

      firstChild.style.transform = `translateX(${finalX})`;
      secondChild.style.transform = `translateX(${finalY})`;

      firstChild.style.zIndex = '0';
      secondChild.style.zIndex = '0';

      firstChild.setAttribute('data-current', 'false');
      secondChild.setAttribute('data-compare', 'false');

      await sleep(600);

      // items may move multiple places. They need to trade exact positions in the DOM.
      // let temp = document.createElement('div');
      // parent.prepend(temp);
      //
      // secondChild.after(temp);
      // firstChild.after(secondChild); // elem.after(p) == p is after elem
      // temp.after(firstChild);
      //
      // temp.remove();

      // debugger;

      console.log(myArray);
    }
  }



};

export default selectionSort;
