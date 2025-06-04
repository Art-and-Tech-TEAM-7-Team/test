export function makeCompanySketch(){
    return function(p){
        let companyIMG;
        p.preload=function(){
            companyIMG = p.loadImage("assets/company.jpg")
        } 
        p.setup=function(){
            p.createCanvas(p.windowWidth, p.windowHeight);
        }
        p.draw=function(){
            p.background(220);
            p.image(companyIMG, 0, 0, p.windowWidth, p.windowHeight);
            drawText()
        }
        p.mousePressed=function(){
            window.dispatchEvent(new Event("goToEndingcredit"));
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