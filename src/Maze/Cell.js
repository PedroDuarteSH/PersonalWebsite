
class Cell{
    constructor(x, y) {
        // 0 = no_border, 1 = border, 2 = Exit, -1 = Start 3 = end
        this.border = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        }
        this.color = "white"
        this.visited = false;
        this.id =  x.toString() + (y).toString();
    }


}

export default Cell;