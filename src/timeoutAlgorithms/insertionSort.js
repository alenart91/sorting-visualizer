import sleep from "../time.js";


let insertionSort = async (myArray, time, continueSort) => {

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

  let j,
  temp;

  for(let i = 1; i < myArray.length; i++) {

  j = i;
  temp = myArray[i];

  firstChild = document.getElementById(temp);
  firstChild.setAttribute('data-current', 'true');
  await sleep(time);


  secondChild = document.getElementById(myArray[j - 1]);
  secondChild.setAttribute('data-compare', 'true');
  await sleep(time);

  // temp is the value of i; the item that needs to be inserted
  while(j > 0 && myArray[j - 1] > temp) {

    // if the previous element is bigger than the current element then switch
    // set the value of the position of the insertion element to the number that was bigger than it
    myArray[j] = myArray[j - 1];

    // swap animation
    secondChild = document.getElementById(myArray[j - 1]);

    if(!secondChild.hasAttribute('data-compare')) {
      secondChild.setAttribute('data-compare', 'true');
      await sleep(time);
    }

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

    // firstChild.style.zIndex = '2';
    // secondChild.style.zIndex = '2';

    firstChild.style.transition = `transform 500ms`;
    secondChild.style.transition = `transform 500ms`;

    firstChild.style.transform = `translateX(${finalX})`;
    secondChild.style.transform = `translateX(${finalY})`;

    await sleep(time);

    secondChild.before(firstChild);

    firstChild.style.transition = `none`;
    secondChild.style.transition = `none`;

    firstChild.style.transform = `translateX(0px)`;
    secondChild.style.transform = `translateX(0px)`;

    // await sleep(time);

    secondChild.removeAttribute('data-compare');

    j--;
  }

  console.log(myArray[j], temp);

  // insert the value myArray[i] wherever it is the biggest value or when there is no other items to compare
  // which makes it the smallest by default
  myArray[j] = temp;

  if(myArray[j] === temp) {
    // don't swap anything
    firstChild.removeAttribute('data-current');
    secondChild.removeAttribute('data-compare');
    continue;
  }

  firstChild.removeAttribute('data-current');

  }

};

export default insertionSort;
