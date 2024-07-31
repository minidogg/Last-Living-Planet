export class LivingEngine{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")

        this.camX = 0;
        this.camY = 0;

        this.onRender = [

        ]

        window.addEventListener("resize", function(){this.ResizeCanvas})
        this.ResizeCanvas()
    }

    ResizeCanvas(){
        this.canvas.width = window.innerWidth*0.99893;
        this.canvas.height = window.innerHeight*0.99893;
    }

    Render(){
        this.onRender.forEach(function(renderFunction){
            renderFunction({ctx, engine: this, camX, camY})
        })

        requestAnimationFrame(render)
    }
}