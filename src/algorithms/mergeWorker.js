// Data passed between the main page and workers is copied, not shared

let init = false;
let sorter;

onmessage = (e) => {

  if(init === false) {
    init = true;
    let array = e.data;
    sorter = mergeMain(array);
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

};



function* mergeMain(myArray) {

  // stopping condition for recursive function
  if(myArray.length === 1) {
    return myArray;
  }

  let middle = Math.floor(myArray.length / 2),
  left = myArray.slice(0, middle),
  right = myArray.slice(middle, myArray.length);

  // have to access value property otherwise it gets wrapped recursively in value object
  // yield* is an expression, not a statement so it evaluates to a value.
  return yield* merge(yield* mergeMain(left), yield* mergeMain(right));

};



function* merge(left, right) {
  let result = [];
  let ir = 0;
  let il = 0;

  // if il or ir isn't less than the length that means every element was pushed to result
  // loops through enough elements to know that the length of one of the arrays has been looped through
  // given that both arrays are seperately sorted this means the rest just need to be pushed into the array

  // if you have 2 arrays with 5 elements each it needs to loop through one of them completely
  // then it can know the rest are in order and push them into the final result


  while(il < left.length && ir < right.length) {

   // has to come before because it increments the count
    if(left[il] < right[ir]) {
      result.push(left[il++]);
    } else {
        result.push(right[ir++]);
    }

  }

  // one of the conditions will break in the first while loop
  // the one that doesn't will be looped through

  while(il < left.length) {
    result.push(left[il++]);
  }

  while(ir < right.length) {
    result.push(right[ir++]);
  }

  yield addColor('add', left, right);
  yield swap(left[0], right[0], left, right, result);
  yield addColor('remove', left, right);

  return result;

};




function addColor(status, leftArray, rightArray) {
  return postMessage({method: 'color', status: status, rightArray: rightArray, leftArray: leftArray});
}


function swap(leftItem, rightItem, leftArray, rightArray, result) {
  return postMessage({method: 'swap', left: leftItem, right: rightItem, leftArray: leftArray, rightArray: rightArray, result: result});
}
