// Data passed between the main page and workers is copied, not shared

let init = false;
let sorter;

onmessage = (e) => {

  // once the array is initialized set init to true
  if(init === false) {
    init = true;
    let array = e.data;
    sorter = sort(array);
    sorter.next();
}


  if(e.data.message === 'animationFinished') {

    if(sorter.next().done === true) {
      postMessage({message: 'finished'});
    }
  }


  if(e.data.message === 'colorFinished') {

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



function* sort(array) {
  let swapped;

  for(let i = 0; i < array.length - 1; i++) {

    for(let j = 0; j < array.length - i - 1; j++) {

      yield addColor(array, array[j], array[j + 1], i, j, array.length, swapped);
      swapped = false;

      if(array[j] > array[j + 1]) {

        yield swap(array[j], array[j + 1]);

        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;

        swapped = true;

      }

    }

    yield sorted(array.length, i);
  }

};


function swap(x, y) {
  postMessage({method: 'swap', itemOne: x, itemTwo: y});
};

function addColor(array, x, y, i, j, length, swapped) {
    postMessage({method: 'color', array: array, itemOne: x, itemTwo: y, i: i, j: j, length: length, swapped: swapped});
};

function sorted(length, i) {
  postMessage({method: 'sorted', length: length, i: i});
};
