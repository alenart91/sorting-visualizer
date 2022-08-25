import selectionSort from "./selectionSort.js";
import bubbleSort from "./bubbleSort.js";

import initMenu from "./menu.js";
import messageBar from "./messageBar.js";

import time from "./time.js";
import "./style.css";

// import sortTest from "./sortTest.js";


let sortButton = document.getElementById('sortButton');
let init = document.getElementById('initialize');
let myArray = [];
let randomNum;
let mySet = {};

// freeze the object
const menuEnum = Object.freeze({
  BUBBLE_SORT: "Bubble Sort",
  SELECTION_SORT: "Selection Sort",
  QUICK_SORT: "Quick Sort",
  MERGE_SORT: "Merge Sort",
  INSERTION_SORT: "Insertion Sort"
});


// configurations
const speed = 400;
const limit = 500;
let defaultDisplayAmount = 10;
const start = menuEnum.BUBBLE_SORT;
let algo = start;
let continueSort = {continue: true};


// add event listeners
sortButton.addEventListener('click', startSort);
init.addEventListener('click', setInput);

// display currently selected algorithm
const algoDisplay = document.getElementById('displayAlgo');
algoDisplay.innerHTML = `<p>Current Algorithm: ${algo}</p>`;

// initialize menu
initMenu(start, algo, algoDisplay, function(updateAlgo) {
  // callback to update algo variable
  return algo = updateAlgo;
});


// start with 10 items if no input
function initialize(items = defaultDisplayAmount) {
  let parent = document.querySelector('.sort');
  let child;

  if(myArray.length > 0) {
    // fadeOpacityTwo(parent);
    myArray = [];
    mySet = {};

    // remove previous nodes from last initialization
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }


  // create a unique set for each array
  for(let i = 0; i < items; i++) {
    randomNum = Math.floor((Math.random() * items)) + 1;

    // check if the same number has been added
    if(!mySet.hasOwnProperty(randomNum)) {
      mySet[randomNum] = randomNum;

      myArray.push(randomNum);

      child = document.createElement('div');
      items > 50 ? child.innerHTML = `` : child.innerHTML = `<p>${randomNum}</p>`;
      child.setAttribute('id', `${randomNum}`);
      child.setAttribute('class', 'items');
      parent.appendChild(child);

      // set unique height for each item
      // for bigger numbers use pixels || for smaller numbers use percentage
      let itemHeight = items > 50 ? (randomNum) + 5 : randomNum * 1.5 + 5;
      items > 50 ? child.style.height = `${itemHeight}` + 'px' : child.style.height = `${itemHeight}` + '%';

      items <= 200 ? child.style.minWidth = '0.3%'
      : items <= 300 ? child.style.minWidth = '0.2%'
      : child.style.minWidth = '0.1%';

      // won't get correct left positioning until elements are all created


      // set <p> margin dynamically
    } else {
      i -= 1;
    }
  };

  // reset sort button
  if(sortButton.style.visibility === 'hidden') {
    console.log('sort reactivated');
    sortButton.addEventListener('click', startSort);
    sortButton.style.display = "inline-block";
    sortButton.style.visibility = "visible";
  };

  // fadein new array
  fadeOpacity(parent);

};

// initialize elements to be sorted
initialize();



function fadeOpacity(parent) {
  let accumulatorIn = 0;
  // let accumulatorOut = 1;
  // console.log('in fade');

  function fadeIn() {
  // console.log(accumulatorIn);
   parent.style.opacity = accumulatorIn;
   accumulatorIn += 0.025;

   if(parent.style.opacity < 1) {
     window.requestAnimationFrame(fadeIn);
   } else {
     return;
   }

 };

 window.requestAnimationFrame(fadeIn);


 // function fadeOut() {
 //   parent.style.opacity = accumulatorOut;
 //   accumulatorOut -= 0.5;
 //   console.log(accumulatorOut);
 //
 //   if(parent.style.opacity > 0) {
 //     window.requestAnimationFrame(fadeOut);
 //   } else {
 //     return;
 //   }
 //
 // };



//  console.log('opac', parent.style.opacity);
//
//  if(parent.style.opacity < 1) {
//    console.log('fading in');
//   window.requestAnimationFrame(fadeIn);
// } else if(parent.style.opacity > 0) {
//    console.log('fading out');
//   window.requestAnimationFrame(fadeOut);
// }

};


function fadeOpacityTwo(parent) {
  let accumulatorOut = 1;


  function fadeOut() {
    parent.style.opacity = accumulatorOut;
    accumulatorOut -= 0.025;
    // console.log(accumulatorOut);

    if(parent.style.opacity > 0) {
      window.requestAnimationFrame(fadeOut);
    } else {
      return;
    }

  };

  window.requestAnimationFrame(fadeOut);


}


async function startSort() {
  console.log('start sort');
  // disable buttons before sorting begins
  sortButton.style.visibility = "hidden";
  sortButton.style.display = "none";
  init.style.visibility = "hidden";

  sortButton.removeEventListener('click', startSort);
  init.removeEventListener('click', setInput);


  // remove gradient display off input
  let colorInput = document.querySelector(".style-input");
  colorInput.setAttribute('data-display', 'true');

  // add stop button
  let stopButton = document.createElement('button');
  stopButton.setAttribute('id', 'stopButton');
  stopButton.innerText = 'Stop';
  document.querySelector('.sortInput').append(stopButton);

  stopButton.addEventListener('click', function() {
    // console.log('stop button');
    // sortButton.style.visibility = "hidden";
    continueSort.continue = false;
    return;

  });


  switch(algo) {
      case menuEnum.SELECTION_SORT:
        selectionSort(myArray, speed);
        break;

      case menuEnum.QUICK_SORT:
        return;
        break;

      case menuEnum.MERGE_SORT:
        return;
        break;

     case menuEnum.INSERTION_SORT:
        return;
        break;

     case menuEnum.BUBBLE_SORT:
       await bubbleSort(myArray, speed, continueSort);
       // await sortTest(myArray, speed, continueSort);
       break;
    }

  if(continueSort.continue === false) {
  // add buttons back

  // stopButton.removeEventListener('click');
  stopButton.remove();
  init.style.visibility = "visible";
  init.addEventListener('click', setInput);

  // add gradient display back after sorting is finished
  colorInput.setAttribute('data-display', 'false');

  // reset continue state
  continueSort.continue = true;
  initialize();
} else {

  // memory leak?
  stopButton.remove();
  init.style.visibility = "visible";
  init.addEventListener('click', setInput);
}



};


function setInput() {

  let input = document.querySelector('input');
  let stringInputValue = input.value;
  const reg = /^[1-9](\d{1,2})?$/;
  let inputValue = +stringInputValue;

  if(reg.test(stringInputValue) && inputValue <= limit) {

    defaultDisplayAmount = inputValue;
    return initialize(inputValue);

  } else if(inputValue > 500) {
      return messageBar(`Please enter a number ${limit} or less. You entered ${inputValue}`);
  }

    else {
      return messageBar(`Your entry ${stringInputValue} is not a valid number. Please enter a number ${limit} or less`);
  }
};
