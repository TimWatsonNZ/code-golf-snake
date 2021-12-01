

/// Create context
let d = document;

let canvas = d.createElement('canvas');

let w = canvas.height = canvas.width = 600;

const c = canvas.getContext('2d');

if (!c) {
  throw Error();
}

d.body.appendChild(canvas);

enum Direction {
  UP, DOWN, LEFT, RIGHT
}

let food: {x: number, y: number}[] = [];
let running = true;

class Snake {
  b: { x: number, y: number}[] = [
    { x: w/2, y: w/2 },
    { x: w/2, y: w/2 -10 },
    { x: w/2, y: w/2 -20 },
  ];

  direction = Direction.DOWN;

  draw(c) {
    c.fillStyle = "rgb(255, 0, 0)";

    this.b.forEach(b => {
      c.fillRect(b.x, b.y, 10, 10);
    });
  }

  update() {
    let h = this.b[0];

    let t = this.b[this.b.length-1];
    let tPosition = { x: t.x, y: t.y };

    for (let i = this.b.length-1;i> 0;i--) {
      this.b[i].x = this.b[i-1].x;
      this.b[i].y = this.b[i-1].y;
    }

    switch(this.direction) {
      case Direction.UP:
        h.y -= 10;
        break;
      case Direction.DOWN:
        h.y += 10;
        break;
      case Direction.LEFT:
        h.x -= 10;
        break;
      case Direction.RIGHT:
        h.x += 10;
        break;
    }

    if (h.x < 0) {
      h.x = w-10;
    }

    if (h.x > w) {
      h.x = 0;
    }

    if (h.y < 0) {
      h.y = w-10;
    }

    if (h.y > w) {
      h.y = 0;
    }

    food.forEach(f => {
      if (f.x === h.x && f.y === h.y) {
        this.b.push(tPosition);
        f.x = 10000;
        f.y = 10000;
      }
    });

    this.b.forEach((a, i) => {
      if (i === 0) {
        return;
      }
      if (a.x === h.x && a.y === h.y) {
        running = false;
      }
    });
  }
}

let snake = new Snake();

d.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      snake.direction = Direction.UP;
      break;
    case 'ArrowDown':
      snake.direction = Direction.DOWN;
      break;
    case 'ArrowLeft':
      snake.direction = Direction.LEFT;
      break;
    case 'ArrowRight':
      snake.direction = Direction.RIGHT;
      break;
  }
});

setInterval(() => {
  if (!running) {
    return;
  }
  c.fillStyle = '#FFFFFF';
  c.fillRect(0,0,w, w);

  if (Math.random() > 0.95) {
    let rx =  Math.floor(Math.random() * w/10);
    let ry = Math.floor(Math.random() * w/10);
    food.push({ x: rx * 10, y: ry * 10});
  }

  c.fillStyle = "#00FF00";
  food.forEach(f => c.fillRect(f.x, f.y, 10, 10));
  snake.update();
  snake.draw(c);
}, 250);