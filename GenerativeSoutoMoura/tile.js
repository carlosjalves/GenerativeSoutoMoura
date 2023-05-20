// Wave Function Collapse (tiled model)
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/challenges/171-wave-function-collapse
// https://youtu.be/0zac-cDzJwA

// Code from Challenge: https://editor.p5js.org/codingtrain/sketches/pLW3_PNDM
// Corrected and Expanded: https://github.com/CodingTrain/Wave-Function-Collapse

  // Function to compare edge size
  function compareEdge(a, b) {
    return a == b;
  }
  
  // Tile class
  class Tile {
    constructor(obj, x_size, y_size, z_size) {
      // Object
      this.obj = obj;
      // Edges Size
      this.x_size = x_size;
      this.y_size = y_size;
      this.z_size = z_size;
    }
  }
  