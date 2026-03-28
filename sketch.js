let colors;
let anemones = [];  // 儲存每根海葵的固定屬性

function setup() {
  createCanvas(800, 600);
  noFill();
  colors = [
    color(255, 80,  80,  200),
    color(80,  200, 120, 200),
    color(80,  140, 255, 200),
    color(255, 200, 80,  200)
  ];

  // 預先產生每根海葵的固定屬性（避免每幀 random 造成閃爍）
  for (var j = 0; j < 20; j++) {
    anemones.push({
      xx:  random(width),
      rid: j,
      clr: colors[j % colors.length],
      sw:  random(20, 80),
      hh:  random(200, 600)
    });
  }
}

function draw() {
  translate(0, height);
  background(0);

  anemones.forEach(function(a) {
    anemone(a.xx, a.rid, a.clr, a.sw, a.hh);
  });
}

function anemone(xx, rid, clr, sw, hh) {
  beginShape();
  strokeWeight(sw);
  stroke(clr);
  for (var i = 0; i < hh; i++) {
    let deltaFactor = map(i, 0, 50, 0, 1, true);
    let deltaX = deltaFactor * (noise(i / 400, frameCount / 100, rid) - 0.5) * 200;
    let mouseFactor = map(i, 0, 500, 0, 1) * log(hh) / 10;
    let mouseDelta = map(mouseX, 0, width, -200, 200);
    curveVertex(xx + deltaX + mouseDelta * mouseFactor, -i * 2);
  }
  endShape();
}