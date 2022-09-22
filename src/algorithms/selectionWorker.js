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

    try {
      let nextIt = sorter.next();
      if(nextIt.done === true) {

        postMessage({message: 'finished'});
      }
  } catch(err) {
      console.log(err);
    }
  }



  if(e.data.message === 'animationFinished') {

    try {
      let nextIt = sorter.next();
      if(nextIt.done === true) {

        postMessage({message: 'finished'});
      }
  } catch(err) {
      console.log(err);
    }
  }


  if(e.data.message === 'sortedFinished') {

    try {
      let nextIt = sorter.next();
      if(nextIt.done === true) {
        postMessage({message: 'finished'});
      }
  } catch(err) {
      console.log(err);
    }
  }

}




function* sort(myArray) {

  for(let i = 0; i < myArray.length - 1; i++) {
    // variable for j value outside of j loop
    let jVar;
    indexMin = i;

    // i and indexMin = 0
    // j = i because the minimum value will be put at the beginning of each full iteration
    for(let j = i; j < myArray.length; j++) {

      jVar = j;
      // first iteration always compares the same element
      // indexMin stays the same until if statement executes
      // j iterates over all the items
      // sets indexMin to j which updates immediately after the if statement
      // so indexMin is always one behind

      yield addColor('compare', j, myArray[j - 1], myArray[i], myArray[j], indexMin);

      if(myArray[indexMin] > myArray[j]) {

        // sets index min to the last number it was bigger than
        // making it the current minimum number
        indexMin = j;
      }
    };

    yield addColor('before swap', jVar, myArray[jVar - 1], myArray[i], myArray[jVar], myArray[indexMin]);
    yield swap(myArray[i], myArray[indexMin]);
    yield addColor('after swap', jVar, myArray[jVar - 1], myArray[i], myArray[jVar], myArray[indexMin]);

    yield sorted(myArray[indexMin], i, myArray.length);

    // swap
    let aux = myArray[i];
    myArray[i] = myArray[indexMin];
    myArray[indexMin] = aux;

    }
};



function swap(x, y) {
  postMessage({method: 'swap', itemOne: x, itemTwo: y});
};

function addColor(status, j, previousItem, itemOne, itemTwo, indexMin) {
    postMessage({method: 'color', status: status, j: j, previousItem: previousItem, itemOne: itemOne, itemTwo: itemTwo, indexMin: indexMin});
};

function sorted(indexMin, i, length) {
  postMessage({method: 'sorted', indexMin: indexMin, i: i, length: length});
};
