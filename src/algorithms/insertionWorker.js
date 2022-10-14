// Data passed between the main page and workers is copied, not shared

let init = false;
let sorter;

onmessage = (e) => {

  if(init === false) {
    init = true;
    let array = e.data;
    sorter = sort(array);
    sorter.next();
  }


  if(e.data.message === 'colorFinished') {

    if(sorter.next().done === true) {
      postMessage({message: 'finished'});
    }
  }



  if(e.data.message === 'animationFinished') {

    if(sorter.next().done === true) {
      postMessage({message: 'finished'});
    }
  }


  if(e.data.message === 'sortedFinished') {

    if(sorter.next().done === true) {
      postMessage({message: 'finished'});
    }
  }

};




function* sort(myArray) {

  for(let i = 1; i < myArray.length; i++) {

    j = i;
    temp = myArray[i];

    yield addColor('initial compare', myArray, j, temp, myArray[j], myArray[j - 1]);

    // temp is the value of i; the item that needs to be inserted
    while(j > 0 && myArray[j - 1] > temp) {

      yield addColor('compare', myArray, j, temp, myArray[j], myArray[j - 1]);

      // if the previous element is bigger than the current element then switch
      // set the value of the position of the insertion element to the number that was bigger than it
      myArray[j] = myArray[j - 1];

      yield swap(temp, myArray[j - 1]);

      j--;
      yield addColor('after swap', myArray, j, temp, myArray[j], myArray[j - 1]);
    }

  // insert the value myArray[i] wherever it is the biggest value or when there is no other items to compare
  // which makes it the smallest by default

  // j decrements so temp is inserted to where it lays in the array.

  myArray[j] = temp;

  yield sorted(myArray, i, temp, myArray[j - 1]);
  }

};



function swap(x, y) {
  postMessage({method: 'swap', itemOne: x, itemTwo: y});
};

function addColor(status, array, j, temp, itemOne, itemTwo) {
    postMessage({method: 'color', status: status, array: array, j: j, temp: temp, itemOne: itemOne, itemTwo: itemTwo});
};

function sorted(array, i, temp, itemTwo) {
  postMessage({method: 'sorted', array: array, i: i, temp: temp, itemTwo: itemTwo});
};
