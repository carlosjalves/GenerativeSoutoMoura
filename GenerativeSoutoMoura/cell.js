//grid cells -> if filled + position in grid (3x3) (0-2)
//module index -> module to be placed in cell
class Cell {
    constructor(x,y,z) {
      this.filled = false;
      this.x = x;
      this.y = y;
      this.z = z;

      this.module_index;
    }
  }
  