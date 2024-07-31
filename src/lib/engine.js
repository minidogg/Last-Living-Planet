export class LivingEngine{
    constructor(canvas){
        this.canvas = canvas;

        window.addEventListener("resize", this.ResizeCanvas)
        this.ResizeCanvas()
    }

    ResizeCanvas(){
        this.canvas.width = window.innerWidth*0.99893;
        this.canvas.height = window.innerHeight*0.99893;
    }
}