import time from "./time.js";



function addOffset(myArray, parent) {
// debugger;
let child = parent.getElementsByTagName('div');

//   let render = function (template, node) {
// 	if (!node) return;
// 	node.style.left = template + 'px';
// 	return node;
// };

// function request(el) {
//
// if(position !== 'absolute') {
//   el.style.position = 'absolute';
//   return;
// }
//
//
//   window.requestAnimationFrame(request);
// }


   console.log(myArray);
  // loop through and add left positioning for every element
  for(let i = 0; i < myArray.length; i++) {

    let el = document.getElementById(myArray[i]);
    console.log(el);
    let leftPositioning = parent.children[i].offsetLeft;
    el.style.left = leftPositioning + 'px';
    // render(leftPositioning, el);
    // request(el);
    // time(300);
    // adding absolute to an element breaks the layout flow and changes left positioning of other elements
    // el.style.position = 'absolute';
  //   child[i].style.position = 'absolute';
  }

  // debugger;

  for(let i = 0; i < myArray.length; i++) {
    child[i].style.position = 'absolute';
  };

};

export default addOffset;
