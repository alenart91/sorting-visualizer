
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


  if(e.data.message === 'next') {
    console.log('next');
  try {
    let nextIt = sorter.next();
    if(nextIt.done === true) {
      postMessage({message: 'finished'});
    }
} catch(err) {
    console.log(err);
}
  }


  if(e.data.message === 'colorFinished') {
    console.log('color');
  try {
    let nextIt = sorter.next();
    if(nextIt.done === true) {
      postMessage({message: 'finished'});
    }
} catch(err) {
    console.log(err);
}
  }

//   try {
//
//   for(let i = 0; i < array.length - 1; i++) {
//
//     for(let j = 0; j < array.length - i - 1; j++) {
//
//       if(array[j] > array[j + 1]) {
//
//         swap(array[j], array[j + 1]);
//
//         let tmp = array[j];
//         array[j] = array[j + 1];
//         array[j + 1] = tmp;
//
//       }
//
//     }
//
//   }
//
// } catch(err) {
//   console.log(err);
// }

};

function* sort(array) {
  console.log('sort');
  for(let i = 0; i < array.length - 1; i++) {

    for(let j = 0; j < array.length - i - 1; j++) {
      yield addColor(array[j], array[j + 1], i, array.length);

      if(array[j] > array[j + 1]) {

        yield swap(array[j], array[j + 1]);
        console.log('after swap');

        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;

      }

    }

  }

};


function swap(x, y) {
  postMessage({method: 'swap', itemOne: x, itemTwo: y});
};

function addColor(x, y, i, length) {
    postMessage({method: 'color', itemOne: x, itemTwo: y, i: i, length: length});
};
