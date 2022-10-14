# sorting-visualizer
A visual application for sorting algorithms
Live demo: https://sorting-visualizer.surge.sh/

A sorting visualizer using no libraries or dependencies (only webpack dev dependencies). It uses generator functions to step through each algorithm and run the appropriate
animations with the requestAnimationFrame method. It runs the sorting algorithms in a separate web worker thread which is terminated upon the sorting algo finishing or an
error. The web worker allows the algorithm to run without blocking the main thread for user interactions.
