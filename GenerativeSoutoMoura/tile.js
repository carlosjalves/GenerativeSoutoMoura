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
      // Edges
      this.x_size = x_size;
      this.y_size = y_size;
      this.z_size = z_size;
      // Valid neighbors
      this.up = [];
      this.right = [];
      this.down = [];
      this.left = [];
      this.front = [];
      this.back = [];
    }
    
    // Find the valid neighbors
    analyze(tiles) {
      for (let i = 0; i < tiles.length-1; i++) {
        let tile = tiles[i+1];
        // UP / DOWN
        if (compareEdge(tile.z_size, this.z_size)) {
          this.up.push(i);
          this.down.push(i);
        }
        // RIGHT / LEFT
        if (compareEdge(tile.x_size, this.x_size)) {
          this.right.push(i);
          this.left.push(i);
        }
        // FRONT / BACK
        if (compareEdge(tile.y_size, this.y_size)) {
          this.front.push(i);
          this.back.push(i);
        }
      }
    }
  }
  