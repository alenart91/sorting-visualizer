// Data passed between the main page and workers is copied, not shared

let init = false;
let sorter;

onmessage = (e) => {

  if(init === false) {
    init = true;
    let array = e.data;
    sorter = quick(array);
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



function* partition(array, start, end) {

  let pivot = array[Math.floor((start + end) / 2)];
  let i = start;
  let j = end;

  yield addColor('initiate', pivot, array[i], array[j], array[i - 1], array[j + 1]);

  // while the starting pointer is less than or equal to the end pointer
  while(i <= j) {

    // while the item is less than the pivot increment the pointer
    // this part is looking for an item greater than the pivot
    while(array[i] < pivot) {

      i++;
      // add color after increment because it already has the item colored
      yield addColor('iColor', pivot, array[i], array[j], array[i - 1], array[j + 1]);
    }

    // while the item is greater than the pivot decrement the pointer
    // this part is looking for an item less than the pivot
    while(array[j] > pivot) {

      j--;
      yield addColor('jColor', pivot, array[i], array[j], array[i - 1], array[j + 1]);
    }

    // if the start pointer is less than or equal to the end pointer
    if(i <= j) {

      yield swap(array[i], array[j]);

      // swap
      let aux = array[i];
      array[i] = array[j];
      array[j] = aux;

      i++;
      j--;

      yield addColor('after swap', pivot, array[i], array[j], array[i - 1], array[j + 1]);
    }
  }
  yield addColor('after loop', pivot, array[i], array[j], array[i - 1], array[j + 1]);
  return i;
};



function* quick(array, start = 0, end = array.length - 1) {

  let index;

  if(array.length > 1) {
    // returns index of left pointer used to create sub-arrays
    index = yield* partition(array, start, end);

    if(start < index - 1) {
      yield* quick(array, start, index - 1);
    }

    if(index < end) {
      yield* quick(array, index, end);
    }
  }

  // last function call to finish will mean the entire array is sorted
  if(start === 0 && end === array.length - 1) {
    yield* sorted(array);
  }
};



function addColor(status, pivot, itemOne, itemTwo, prevItemOne, prevItemTwo) {
  return postMessage({method: 'color', status: status, pivot: pivot, itemOne: itemOne, itemTwo: itemTwo, prevItemOne: prevItemOne, prevItemTwo: prevItemTwo});
}


function swap(itemOne, itemTwo) {
  return postMessage({method: 'swap', itemOne: itemOne, itemTwo: itemTwo});
}

function sorted(array) {
  return postMessage({method: 'sorted', array: array});
};
