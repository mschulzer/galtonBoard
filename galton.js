// variable parametre
let kugler = [];
let grid = 10
let antal = [];
let max = 2000;
let ude = [];

function setup() {
    let myCanvas = createCanvas(200, 400);
    myCanvas.parent("container");

    for (i = 0; i < width / grid - 1 ; i++) {
        antal[i] = 0;
    }  
}

function draw() {
  background(229, 231, 234);
  displayBoard();
  
  // lav nogle kugler
  if (frameCount < max * 2 && frameCount % 2 == 0) {
    kugler.push(new Kugle());
  }
  
  for (let kugle of kugler) {
    kugle.move();
    kugle.display();
  }
  
  displayBars();
  
    for (let kugle of ude) {
        kugler.splice(kugler.indexOf(kugle), 1);
    }
    ude = [];
}

function displayBoard() {
    push();
    noStroke();
    fill(100);
    for (let x = 0; x <= width ; x += grid) {
        for (let y = grid ; y < width; y += grid) {
            let xo = (y % (grid * 2) == 0) ? x - grid/2 : x;
            circle(xo, y, 2);
        }
    }
    
    stroke(100);
    for (let x = grid / 2; x < width; x += grid) {
        line(x, width, x, height);
    }
    pop();
}

function displayBars() {
    push();
    strokeCap(ROUND);
    stroke('blue');
    strokeWeight(grid/3+1);
    for (let i = 0; i < antal.length; i++) {
        let x = (i + 1) * grid
        let y = height - (antal[i] / 2) + (grid / 4)
        line(x , height + grid / 4, x, y);
    }
    pop();
}

// model for kugle
class Kugle {
    constructor() {
        this.x = width / 2 ;
        this.y = 0;
        this.jig = true;
    }

    move() {
        this.y += grid / 2;
        if (this.jig) {
            if (this.y % grid == 0) {
                this.x += random([-grid / 2, grid / 2]);
            }
        } 
        let column = int((this.x - grid / 2) / grid);
        if (this.y > width) {
            this.jig = false;
            if (this.y >= height - antal[column] / 2) {
                ude.push(this);
                antal[column] += 1;
            }
        }
    }
  
    display() {
        push()
        noStroke();
        fill("blue");
        circle(this.x, this.y, grid/3 +1);
        pop();
    }
}
