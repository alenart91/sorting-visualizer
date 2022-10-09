import sleep from "../time.js";


let mergeSort = (myArray, speed, continueSort, callback) => {

  // create worker when function is invoked
  const worker = new Worker(new URL('mergeWorker.js', import.meta.url));
  worker.postMessage(myArray);

  worker.onmessage = (e) => {

    // stop the function when stop button is clicked
    if(continueSort.continue === false) {
      worker.terminate();
      return callback();
    }

    if(e.data.method === 'color') {

      addColor(e.data.status, e.data.rightArray, e.data.leftArray);
    }

    if(e.data.method === 'swap') {

      swap(e.data.left, e.data.right, e.data.leftArray, e.data.rightArray, e.data.result);
    }


    if(e.data.message === 'finished') {

      // kill worker thread
      worker.terminate();
      return callback();
    }

  }


  function addColor(status, rightArray, leftArray) {

    let start;
    let fullArray = [...leftArray, ...rightArray];


    function animateColor(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;

      if(status === 'add') {

        for(let i = 0; i < fullArray.length; i++) {
          let item = document.getElementById(fullArray[i]);
          item.setAttribute('data-current', 'true');
        }
      }


      if(status === 'remove') {

        for(let i = 0; i < fullArray.length; i++) {
          let item = document.getElementById(fullArray[i]);
          item.removeAttribute('data-current');
        }

        let sort = document.querySelector('.sort');

        if(fullArray.length === sort.children.length) {

          for(let i = 0; i < fullArray.length; i++) {
            let item = document.getElementById(fullArray[i]);
            item.setAttribute('data-sorted', 'true');
          }
        }
      }



      if(elapsed > speed) {
        return worker.postMessage({message: 'colorFinished'});

   } else {
      window.requestAnimationFrame(animateColor);
     }
  };

   window.requestAnimationFrame(animateColor);

};



  async function swap(leftItem, rightItem, leftArray, rightArray, result) {

    let start;
    let sort = document.querySelector('.sort');

    // combine arrays and get first and last item
    let fullArray = [...leftArray, ...rightArray];
    let firstItem = fullArray[0];
    let lastItem = fullArray[fullArray.length - 1];

    // get container width using last item position - first item position
    let beginning = document.getElementById(firstItem);
    let ending = document.getElementById(lastItem);

    let width = ending.getBoundingClientRect().right - beginning.getBoundingClientRect().left;

    // create container
    let container;
    container = document.createElement('div');
    container.setAttribute('data-temp', 'tempContainer');
    beginning.before(container);

    // container styling
    container.style.width = `${width}` + 'px';
    container.style.display = 'flex';
    container.style.justifyContent = 'space-between';
    container.style.alignItems = 'end';
    container.style.height = '100%';


    // put items in the container
    for(let i = 0; i < fullArray.length; i++) {
      let item = document.getElementById(fullArray[i]);

      // set width for bigger arrays with no text in items
      let itemWidth = item.getBoundingClientRect().width;
      item.style.width = `${itemWidth}` + 'px';
      container.append(item);
    }

    // calculate and add translation distance to each item
    for(let i = 0; i < fullArray.length; i++) {
      let item = document.getElementById(fullArray[i]);
      let distance = (ending.getBoundingClientRect().x - item.getBoundingClientRect().x) + 'px';
      item.style.transition = 'transform 500ms';
      item.style.transform = `translateX(${distance})`;
    }

    await sleep(speed);



    async function swapItems(timestamp) {

      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      const progress = elapsed / speed;


      for(let i = 0; i < result.length; i++) {

        let item = document.getElementById(result[i]);

        let itemPosition = item.getBoundingClientRect().x;
        let itemWidth = item.getBoundingClientRect().width;
        let itemDistance = container.getBoundingClientRect().width;

        let partialWidth = itemDistance - (itemWidth * (result.length));
        let finalDistance = Math.round((partialWidth / (result.length - (1))) * 100) / 100;

        let prevTranslate = +item.style.transform.replace(/[^-?\d.]/g, '');
        let nextTranslate = finalDistance - itemPosition;

        // get the distance from the start of the layout to the container
        let layoutStart = sort.children[0].getBoundingClientRect().x;
        let offSet = container.getBoundingClientRect().x - layoutStart;

        let relativePos = ((finalDistance + itemWidth) * i) + offSet;


        let finalTranslate = prevTranslate + nextTranslate + relativePos;
        let trans = finalTranslate.toFixed(2) + 'px';

        item.style.transform = `translateX(${trans})`;

        await sleep(speed);
      }

        // await sleep(speed);

      // if(elapsed < speed) {
      //    window.requestAnimationFrame(swapItems);
      // } else {

      // remove the items from the container and delete it
      // use the array instead of DOM elements
      for(let i = 0; i < result.length; i++) {
        let item = document.getElementById(result[i]);
        item.style.transform = `translateX(0px)`;
        item.style.width = 'auto';
        container.before(item);
      }

      container.remove();


      return worker.postMessage({message:'animationFinished'});
     // }

   };

  window.requestAnimationFrame(swapItems);
};


};

export default mergeSort;
