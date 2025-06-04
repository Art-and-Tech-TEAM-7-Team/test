export function makeHouseSketch() {
return function(p) {


let houseImg;
let deskImg;
let drawDeskX=0;
let doorImg=['', '']; // 0-> 닫힌 문, 1 -> 열린 문
let doorOpen = false;
let drawDoorX = 0, drawDoorY = 0; //문의 위치

let characterImg = ['', ''];
let characterX = 100; // 캐릭터의 초기 X 위치
let cameraX = 0; // 카메라의 초기 X 위치
let speed = 5; // 캐릭터의 속도도
let viewWidth;

let showWarningText = false;
let warningStartTime = 0;
let showClosed = false;
let a = 0;
let startTime = 0;
const WARNING_DURATION = 2000; // 2초 동안 경고 메시지 띄움움

p.preload = function() {
    houseImg = p.loadImage("assets/house/집 배경.png");
    deskImg = p.loadImage("assets/house/책상-외부.png");
    doorImg[0] = p.loadImage("assets/house/닫힌 문.png");
    doorImg[1] = p.loadImage("assets/house/열린 문.png");
    characterImg[0] = p.loadImage("assets/character/캐릭터1.png");
    characterImg[1] = p.loadImage("assets/character/캐릭터3.png");
};

p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight); 

    // window를 사용해서 전역(파일 전체)에서 공유하는 변수들 설정정
    characterX = window.state.characterX !== undefined ? window.state.characterX : 100;
    cameraX = window.state.cameraX !== undefined ? window.state.cameraX : 0;
    startTime = p.millis();
};

p.draw = function() {
    p.background(220);

    viewWidth = Math.min(p.windowWidth, houseImg.width);

    // 화면에서 캐릭터가 중앙을 벗어나면 카메라가 따라감
    let screenCenter = viewWidth / 2;
    // (1) characterX - cameraX : 화면 상의 캐릭터 위치
    if (characterX - cameraX > screenCenter + 100) cameraX = characterX - (screenCenter + 100);
    if (characterX - cameraX < screenCenter - 100) cameraX = characterX - (screenCenter - 100);
    
    // 이미지 범위 밖으로 나가지 않게 만들기
    cameraX = p.constrain(cameraX, 0, houseImg.width - viewWidth);

    
    // 배경
    p.image(houseImg, 0, 0, viewWidth, p.height, cameraX, 0, viewWidth, p.height);
    
    drawDoor(); // 문 이미지 그리는 함수 
    drawDesk(); // 책상을 그리는 함수
    drawCharacter(); // 캐릭터를 그리는 함수

    if (p.millis() - startTime < WARNING_DURATION) {
        drawText("좌우 화살표를 이용해서 캐릭터를 움직이세요!");
    }
    
    if (showClosed) {
        if (p.millis() - a < WARNING_DURATION) {
            drawText("문을 클릭해서 열어야 다음 장면으로 넘어가요!");
        } else {
            showClosed = false;
        }  
    } else if (showWarningText) {
        if (p.millis() - warningStartTime < WARNING_DURATION) {
            drawText("책상에서 교통카드나 운전면허증을 가져와야 해요!");
        } else {
            showWarningText = false;
        }  
    } 
};

// 화면 상에서 문, 책상 클릭 판정(책상 클릭 시 desk.js파일로 이동)
p.mousePressed = function() {
    // 실제 화면상 좌표에 클릭했는지 확인
    if (p.mouseX >= drawDoorX && p.mouseX <= drawDoorX + doorImg[0].width) {
        doorOpen = true;
    }

    let deskX = houseImg.width/2 + 100;
    drawDeskX = deskX - cameraX;
    if (p.mouseX >= drawDeskX && p.mouseX <= drawDeskX + deskImg.width) {
        window.state.characterX = characterX;
        window.state.cameraX = cameraX;
        
        window.dispatchEvent(new Event("goToDesk"));
    }
}

// 브라우저 창의 크기가 변경되었을 때 캔버스의 크기를 브라우저에 맞추는 함수
p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
};

// 문 이미지 그리는 함수 
// doorOpen를 통해 닫힌 문을 그릴 지, 열린 문을 그릴 지 결정
function drawDoor() {
    let doorX = houseImg.width - doorImg[0].width;
    let doorY = houseImg.height - doorImg[0].height;
    drawDoorX = doorX - cameraX;
    drawDoorY = doorY;
    // 화면에 보일 때만 그림
    if (drawDoorX + doorImg[0].width > 0 && drawDoorX < viewWidth) {
        if (doorOpen) {
            drawDoorY = drawDoorY - doorImg[1].height + doorImg[0].height;
            p.image(doorImg[1], drawDoorX-doorImg[1].width/2, drawDoorY, doorImg[1].width, doorImg[1].height);
        } else {
            if (p.mouseX >= drawDoorX && p.mouseX <= drawDoorX + doorImg[0].width) {
                p.image(doorImg[0], drawDoorX-40, drawDoorY-40, doorImg[0].width+40, doorImg[0].height+40);
            } else {
                p.image(doorImg[0], drawDoorX, drawDoorY, doorImg[0].width, doorImg[0].height);
            }
            
        }
    }
}

// 책상을 그리는 함수
// 단순히 그리기만 함. desk.js로의 이동은 mousePressed에서
function drawDesk() {
    let deskX = houseImg.width/2 + 100;
    let deskY = houseImg.height - deskImg.height;
    drawDeskX = deskX - cameraX;
    let drawDeskY = deskY;
    if (drawDeskX + deskImg.width > 0 && drawDeskX < viewWidth) {
        if (p.mouseX >= drawDeskX && p.mouseX <= drawDeskX + deskImg.width) {
            p.image(deskImg, drawDeskX-20, drawDeskY-20, deskImg.width+40, deskImg.height+40);
        } else {
            p.image(deskImg, drawDeskX, drawDeskY, deskImg.width, deskImg.height);
        }
        
    }
}

// 캐릭터를 그리는 함수
// 화살표 키를 이용해서 움직임
// 문이 열린 상태(openDoor가 true인 상태)에서 맵의 끝까지 가면 park.js로 이동동
function drawCharacter() {
    if (p.keyIsPressed) {
        if (p.keyCode === p.RIGHT_ARROW) characterX += speed;
        if (p.keyCode === p.LEFT_ARROW) characterX -= speed;

        // 캐릭터가 이미지 범위 밖으로 못 나가게
        characterX = p.constrain(characterX, 0, houseImg.width);

        if (characterX >= houseImg.width - doorImg[0].width) {
            if (doorOpen) {
                if (window.state.selectedItem === ""){
                    showWarningText = true;
                    warningStartTime = p.millis();
                } else {
                    window.state.characterX = 100;
                    window.state.cameraX = 0;
                    
                    window.dispatchEvent(new Event("goToPark"))
                }
            } else {
                showClosed = true;
                a = p.millis();
            }
        };
    }

    // 화면 내에서의 캐릭터 x좌표 = 실제좌표 - 카메라좌표
    let drawX = characterX - cameraX;
    let drawY = p.height - 450; // y는 예시
    p.image(characterImg[0], drawX, drawY, 250, 250*(characterImg[0].height/characterImg[0].width));
}


// 경고 메시지를 띄우는 함수
// 교통카드나 운전면허증을 챙기지 않고 문을 열고 밖을 나갈 때 작동함.
// showWarningText 으로 메시지를 띄워야 하는 지 조절
// warningStartTime, WARNING_DURATION 으로 시간 조절
function drawText(message) {
    let drawX = characterX - cameraX + 100;
    let drawY = p.height - 530; // 머리 위
    p.push();
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(20);
    p.stroke(255); p.strokeWeight(7);
    p.fill(255, 0, 0);
    p.text(message, drawX, drawY);
    p.pop();
}


};
}