export function makeCarInsideSketch(){
    return function(p){
        let carInsideIMG, starupIMG;
        p.preload=function(){
            carInsideIMG = p.loadImage("assets/carInside.jpg")
            starupIMG= p.loadImage("assets/startup.jpg")
        } 

        p.setup=function(){
            p.createCanvas(p.windowWidth, p.windowHeight);
            p.startupX= p.windowWidth/2 - starupIMG.width/2;
            p.startupY= p.windowHeight/2 - starupIMG.height/2;
        }
        p.draw=function()
        {
            p.background(220);
            p.image(carInsideIMG, 0, 0, p.windowWidth, p.windowHeight);
            drawText();
        }

        p.mousePressed=function(){
            window.dispatchEvent(new Event("goToContrast"));
        }
        p.windowResized = function() {
         p.resizeCanvas(p.windowWidth, p.windowHeight);
        };

        function drawText() {
            p.push();
            p.textAlign(p.CENTER, p.BOTTOM);
            p.textSize(50);
            p.stroke(255); p.strokeWeight(7);
            p.fill(255, 0, 0);
            p.text("화면을 클릭해 다음 장면으로 넘어가 주세요!", p.width/2, p.height/2);
            p.pop();
        }

    }
   


    
}