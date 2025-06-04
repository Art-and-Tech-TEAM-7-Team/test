export function makeParkSketch() {
return function(p) {


let parkImg, coffeeShopImg, carImg;
let stairImg; // 지하철 계단
let coffeeShopX, coffeeShopY, objX, objY;

let characterImg = ['', '']; // 캐릭터 움직임 표현을 위해서 여러새
let characterX = window.state.characterX; // 캐릭터의 초기 X 위치   
let speed = 5;

p.preload = function() {
    parkImg = p.loadImage("assets/park/공원.jpg");
    coffeeShopImg = p.loadImage("assets/park/커피숍-외부.png");
    carImg = p.loadImage("assets/park/자동차.png");
    stairImg = p.loadImage("assets/park/지하철 계단.png");
    characterImg[0] = p.loadImage("assets/character/캐릭터1.png");
    characterImg[1] = p.loadImage("assets/character/캐릭터3.png");
}

p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);

    objY = p.height - 300;
    coffeeShopX = p.width / 2 - 200;
    coffeeShopY = p.height - 350;
    objX = p.width - 350;
}

p.draw = function() {
    p.background(220);
    
    p.image(parkImg, 0, 0, p.width, p.height);
    
    drawElement(coffeeShopImg, coffeeShopX, coffeeShopY, 300);

    if (window.state.selectedItem === "car") {
    drawElement(carImg, objX, objY, 300);
    } else if (window.state.selectedItem === "stair") {
        drawElement(stairImg, objX, objY, 300);
    }

    drawCharacter();
}

p.mousePressed = function() {
    window.state.characterX = characterX;
    if (coffeeShopX <= p.mouseX && p.mouseX <= coffeeShopX + 400) {
        window.dispatchEvent(new Event("goToCoffeeShop"));
    }

    if (objX <= p.mouseX && p.mouseX <= objX + 300) {
        if (window.state.selectedItem === "car") { //임시시
             window.dispatchEvent(new Event("goToCar"));
        } else if (window.state.selectedItem === "stair") {
             window.dispatchEvent(new Event("goToStair"));
        }
    }
};

// 브라우저 창의 크기가 변경되었을 때 캔버스의 크기를 브라우저에 맞추는 함수
p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
};

// 요소를 그리는 함수
// 이미지, x좌표, y좌표, 가로크기
// 이미지의 비율을 유지하기 위해서 세로크기는 가로크기에 의존해서 설정
function drawElement(img, imgX, imgY, imgW) {
    let imgH = imgW*(img.height/img.width);
    if (imgX<=p.mouseX && p.mouseX <= imgX+imgW) {
        imgH = (imgW+20)*(img.height/img.width);
        p.image(img, imgX-10, imgY-10, imgW + 20, imgH);
    } else {
        p.image(img, imgX, imgY, imgW, imgH);
    }
}

//캐릭터 그리는 함수
function drawCharacter() {
    if (p.keyIsPressed) {
        if (p.keyCode === p.RIGHT_ARROW) characterX += speed;
        if (p.keyCode === p.LEFT_ARROW) characterX -= speed;

        // 캐릭터가 이미지 범위 밖으로 못 나가게
        characterX = p.constrain(characterX, 0, parkImg.width);
    }

    // 화면 내에서의 캐릭터 x좌표 = 실제좌표 - 카메라좌표
    let drawX = characterX;
    let drawY = p.height - 300; // y는 예시
    p.image(characterImg[0], drawX, drawY, 200, 280);
}


}
}