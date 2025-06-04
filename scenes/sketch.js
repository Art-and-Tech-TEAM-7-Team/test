export function make교통통Sketch() {
  return function(p) {

    let images = [];
    let currentIndex = 0;
    let imagePaths = [
      'assets/스크린도어.jpg',
      'assets/지하철-내부.jpg',
      'assets/지하철-계단.jpg',
      'assets/버스-정류장.jpg'
    ];

    p.preload = function() {
      for (let path of imagePaths) {
        images.push(p.loadImage(path)); // ← 여기 수정!
      }
    }

    p.setup = function() {
      p.createCanvas(1366, 768); // 이미지 해상도에 맞춰 설정
      p.imageMode(p.CORNER);
    }

    p.draw = function(){
      p.background(255);
      p.image(images[currentIndex], 0, 0, p.width, p.height); // ← 여기도 p. 붙이기!
      drawText();
    }

    p.mousePressed = function() {
      currentIndex++;
      if (currentIndex >= images.length) {
        window.dispatchEvent(new Event("goToEndingcredit"));
      }
    }

    function drawText() {
            p.push();
            p.textAlign(p.CENTER, p.BOTTOM);
            p.textSize(50);
            p.stroke(255); p.strokeWeight(7);
            p.fill(255, 0, 0);
            p.text("화면을 클릭해 다음 장면으로 넘어가 주세요!", p.width/2, p.height*(3/4));

            p.pop();
        }

  }
}