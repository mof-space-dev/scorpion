let t = 0;
let grainImg;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  createFilmGrainTexture();
}

function createFilmGrainTexture() {
  grainImg = createGraphics(256, 256);
  grainImg.loadPixels();
  for (let i = 0; i < grainImg.width * grainImg.height * 4; i += 4) {
    let val = random(255);
    grainImg.pixels[i] = val;
    grainImg.pixels[i+1] = val;
    grainImg.pixels[i+2] = val;
    grainImg.pixels[i+3] = random(30, 80);
  }
  grainImg.updatePixels();
}

function draw() {
  // --- 0. カラー反転（ネガポジ）の計算 ---
  let flipProgress = (sin(t * 0.05) + 1) / 2;

  // 切り替え時の判定
  let isSwitching = Math.abs(flipProgress - 0.5) < 0.15;
  let switchIntensity = isSwitching ? map(Math.abs(flipProgress - 0.5), 0, 0.15, 1, 0) : 0;

  let ochreBg = color(155, 115, 40);          
  let blackBase = color(20, 20, 25);          
  let particleOchre = color(105, 75, 20, 75); 

  let currentBg = lerpColor(ochreBg, blackBase, flipProgress);
  let currentScorpion = lerpColor(blackBase, ochreBg, flipProgress);
  let currentParticle = lerpColor(particleOchre, color(200, 160, 80, 75), flipProgress);

  // --- 1. 背景 ---
  background(currentBg);

  // --- 2. 下地 ---
  push();
  stroke(currentParticle);
  strokeWeight(1.5);
  for (let i = 0; i < 600; i++) {
    point(random(width), random(height));
  }
  pop();

  // --- 3. 『スコーピオン』壁画 ---
  push();
  translate(width * 0.5, height * 0.48);
  
  // 反転時の版ズレ（印刷・フィルムのズレ感）
  if (switchIntensity > 0) {
    translate(random(-20, 20) * switchIntensity, random(-8, 8) * switchIntensity);
  }

  rotate(0.18);

  stroke(currentScorpion);
  strokeWeight(5.5);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  fill(currentScorpion);

  // ジッター（揺らぎ）
  if (random(100) < 1.5) {
    translate(random(-4, 4), random(-2, 2));
  }

  let h = constrain(height * 0.35, 150, 300);

  // A. 脚
  drawHandDrawnLine(-h*0.12, -h*0.1, -h*0.38, -h*0.22);
  drawHandDrawnLine(-h*0.38, -h*0.22, -h*0.52, -h*0.12);
  drawHandDrawnLine(h*0.12, -h*0.1, h*0.38, -h*0.22);
  drawHandDrawnLine(h*0.38, -h*0.22, h*0.52, -h*0.12);

  drawHandDrawnLine(-h*0.15, 0, -h*0.44, -h*0.08);
  drawHandDrawnLine(-h*0.44, -h*0.08, -h*0.58, h*0.05);
  drawHandDrawnLine(h*0.15, 0, h*0.44, -h*0.08);
  drawHandDrawnLine(h*0.44, -h*0.08, h*0.58, h*0.05);

  drawHandDrawnLine(-h*0.14, h*0.1, -h*0.42, h*0.08);
  drawHandDrawnLine(-h*0.42, h*0.08, -h*0.55, h*0.22);
  drawHandDrawnLine(h*0.14, h*0.1, h*0.42, h*0.08);
  drawHandDrawnLine(h*0.42, h*0.08, h*0.55, h*0.22);

  drawHandDrawnLine(-h*0.1, h*0.2, -h*0.36, h*0.25);
  drawHandDrawnLine(-h*0.36, h*0.25, -h*0.46, h*0.38);
  drawHandDrawnLine(h*0.1, h*0.2, h*0.36, h*0.25);
  drawHandDrawnLine(h*0.36, h*0.25, h*0.46, h*0.38);

  // B. 胴体
  beginShape();
  vertex(-h*0.02, -h*0.21);
  vertex(h*0.19, -h*0.04);
  vertex(h*0.23, h*0.20);
  vertex(0, h*0.32);
  vertex(-h*0.20, h*0.20);
  vertex(-h*0.14, -h*0.06);
  endShape(CLOSE);

  // C. 巨大なハサミ
  beginShape();
  vertex(-h*0.12, h*0.22);
  quadraticVertex(-h*0.42, h*0.28, -h*0.52, h*0.46);
  quadraticVertex(-h*0.58, h*0.58, -h*0.43, h*0.73);
  endShape(CLOSE);
  
  beginShape();
  vertex(h*0.12, h*0.22);
  quadraticVertex(h*0.38, h*0.42, h*0.28, h*0.68); 
  quadraticVertex(h*0.62, h*0.58, h*0.42, h*0.36);
  endShape(CLOSE);
  drawHandDrawnLine(h*0.28, h*0.68, h*0.21, h*0.53);

  // D. 節を重ねた極太の尾と毒針
  push();
  push();
  translate(h*0.06, -h*0.35);
  rotate(0.2);
  ellipse(0, 0, h*0.24, h*0.16);
  pop();

  push();
  translate(h*0.18, -h*0.52);
  rotate(0.5);
  ellipse(0, 0, h*0.22, h*0.15);
  pop();

  push();
  translate(h*0.20, -h*0.70);
  rotate(1.1);
  ellipse(0, 0, h*0.20, h*0.14);
  pop();

  push();
  translate(h*0.08, -h*0.86);
  rotate(1.8);
  ellipse(0, 0, h*0.18, h*0.13);
  pop();

  push();
  translate(-h*0.08, -h*0.92);
  rotate(2.3);
  ellipse(0, 0, h*0.16, h*0.12);
  pop();

  push();
  translate(-h*0.15, -h*0.95);
  rotate(-PI * 0.55);
  beginShape();
  vertex(-12, 8);
  quadraticVertex(-4, -15, 0, -32);
  quadraticVertex(8, -12, 12, 8);
  endShape(CLOSE);
  pop();
  pop();

  pop();

  // --- 4. CRT・スキャンライン ---
  drawDynamicCRTFilters();

  // --- 5. 「SCORPION」ロゴ ---
  drawRetroRoundText(currentScorpion, currentBg);

  // --- 5.5 アナログ調のノイズ・版ズレ演出 ---
  if (switchIntensity > 0) {
    drawAnalogGlitchAndFlash(switchIntensity, ochreBg, blackBase);
  }

  // --- 6. フィルムノイズ ---
  drawRealFilmGrain();

  t++;
}

// 古文書・アナログフィルム調に色調整した閃光・ノイズ
function drawAnalogGlitchAndFlash(intensity, ochre, black) {
  push();
  
  // A. 閃光：ピカッとした青白さではなく「羊皮紙のような温かい生成り色」で発光
  let flashAlpha = map(intensity, 0, 1, 0, 160) * random(0.6, 1.0);
  fill(240, 220, 180, flashAlpha);
  noStroke();
  rect(0, 0, width, height);

  // B. ノイズ：電子グリッチではなく、黄土色や黒の「帯（ノイズライン）」による画像の横ズレ
  let numSlices = int(random(3, 7));
  for (let i = 0; i < numSlices; i++) {
    let sy = random(height);
    let sh = random(6, 25);
    let offsetX = random(-35, 35) * intensity;
    
    // 画面の横スライス移動
    copy(0, sy, width, sh, offsetX, sy, width, sh);
    
    // 電子カラーではなく、作品内部のカラー（黄土色・黒・生成り）を使ったライン
    if (random(100) < 60) {
      let bandColor = random([ochre, black, color(230, 210, 160)]);
      fill(red(bandColor), green(bandColor), blue(bandColor), random(100, 180));
      rect(0, sy, width, random(1, 4));
    }
  }
  pop();
}

function drawHandDrawnLine(x1, y1, x2, y2) {
  let midX = (x1 + x2) / 2 + random(-1.5, 1.5);
  let midY = (y1 + y2) / 2 + random(-1.5, 1.5);
  beginShape();
  vertex(x1, y1);
  quadraticVertex(midX, midY, x2, y2);
  endShape();
}

function drawRetroRoundText(col, bgCol) {
  push();
  let size = constrain(width * 0.04, 22, 42);
  
  let logoCenterX = width - size * 6.5;
  let logoCenterY = size * 3.0;

  push();
  translate(logoCenterX, logoCenterY);

  if (random(100) < 2) {
    translate(random(-2, 2), random(-1, 1));
  }

  strokeCap(ROUND);
  strokeJoin(ROUND);

  let w = size * 0.78;
  let h = size * 1.15;

  translate(-w * 3.8, -h * 0.5);

  drawLogoShapes(w, h, bgCol, size * 0.38);
  drawLogoShapes(w, h, col, size * 0.28);

  pop();
  pop();
}

function drawLogoShapes(w, h, c, weight) {
  stroke(c);
  fill(c);
  strokeWeight(weight);

  // S
  push();
  noFill();
  beginShape();
  vertex(w*0.8, h*0.25);
  quadraticVertex(w*0.2, 0, w*0.2, h*0.4);
  quadraticVertex(w*0.8, h*0.5, w*0.8, h*0.75);
  quadraticVertex(w*0.2, h, 0, h*0.75);
  endShape();
  pop();

  // C
  push();
  translate(w * 1.1, 0);
  noFill();
  arc(w*0.5, h*0.5, w*0.9, h, HALF_PI * 0.6, TWO_PI - HALF_PI * 0.6);
  pop();

  // O
  push();
  translate(w * 2.2, 0);
  ellipse(w*0.5, h*0.5, w*0.85, h);
  pop();

  // R
  push();
  translate(w * 3.3, 0);
  line(0, 0, 0, h);
  arc(0, h*0.32, w*0.9, h*0.6, -HALF_PI, HALF_PI);
  line(0, h*0.5, w*0.75, h);
  pop();

  // P
  push();
  translate(w * 4.4, 0);
  line(0, 0, 0, h);
  arc(0, h*0.35, w*0.95, h*0.65, -HALF_PI, HALF_PI);
  pop();

  // I
  push();
  translate(w * 5.5, 0);
  line(w*0.2, 0, w*0.2, h);
  pop();

  // O
  push();
  translate(w * 6.1, 0);
  ellipse(w*0.5, h*0.5, w*0.85, h);
  pop();

  // N
  push();
  translate(w * 7.2, 0);
  line(0, 0, 0, h);
  line(0, 0, w*0.8, h);
  line(w*0.8, 0, w*0.8, h);
  pop();
}

function drawDynamicCRTFilters() {
  noStroke();
  fill(0, 0, 0, 38);
  for (let y = 0; y < height; y += 5) {
    rect(0, y, width, 1.5);
  }

  let pulseRadius = height * (0.15 + noise(t * 0.03) * 0.08); 
  let shiftX = (noise(t * 0.02) - 0.5) * 40; 
  let shiftY = (noise(t * 0.025 + 100) - 0.5) * 40; 

  let g = drawingContext.createRadialGradient(
    width/2 + shiftX, height/2 + shiftY, pulseRadius,
    width/2, height/2, height * 0.85
  );
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(0.5, 'rgba(35, 20, 5, 0.3)');
  g.addColorStop(1, 'rgba(5, 5, 8, 0.98)'); 
  
  drawingContext.fillStyle = g;
  drawingContext.fillRect(0, 0, width, height);

  push();
  stroke(255, 255, 255, random(15, 45)); 
  strokeWeight(random(1, 3));
  for (let i = 0; i < 3; i++) {
    if (random(100) < 40) {
      let ny = random(height);
      if (ny < height * 0.25 || ny > height * 0.75) {
        line(0, ny, random(width * 0.3), ny);
        line(width - random(width * 0.3), ny, width, ny);
      }
    }
  }
  pop();
}

function drawRealFilmGrain() {
  push();
  blendMode(OVERLAY);
  let offsetX = random(-grainImg.width, 0);
  let offsetY = random(-grainImg.height, 0);
  for (let x = offsetX; x < width; x += grainImg.width) {
    for (let y = offsetY; y < height; y += grainImg.height) {
      image(grainImg, x, y);
    }
  }
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// --- 録画用の追加処理 ---
let recorder;
let chunks = [];
let isRecording = false;

function keyPressed() {
  // 'r' キーを押すと録画スタート / ストップ
  if (key === 'r' || key === 'R') {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }
}

function startRecording() {
  chunks = [];
  let stream = document.querySelector('canvas').captureStream(60); // 60fpsでキャプチャ
  recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = exportVideo;
  
  recorder.start();
  isRecording = true;
  console.log("録画開始...");
}

function stopRecording() {
  recorder.stop();
  isRecording = false;
  console.log("録画停止！ファイルをダウンロードします...");
}

function exportVideo() {
  let blob = new Blob(chunks, { type: 'video/webm' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'scorpion_glitch.webm'; // WebM形式でダウンロードされます
  a.click();
}