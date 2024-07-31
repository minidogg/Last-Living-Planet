export class LivingEngine{
    constructor(canvas){
        this.canvas = canvas;

        window.addEventListener("resize", this.ResizeCanvas)
        this.ResizeCanvas()
    }

    ResizeCanvas(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}