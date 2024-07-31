export class LivingEngine{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")

        this.camX = 0;
        this.camY = 0;
        this.zoom = 1;

        this.onRender = [

        ]
        this.sprite = {}


        window.addEventListener("resize", ()=>{this.ResizeCanvas})
        this.ResizeCanvas()
    }

    ResizeCanvas(){
        this.canvas.width = window.innerWidth*0.99;
        this.canvas.height = window.innerHeight*0.99;
    }

    Render(){
        this.onRender.forEach((renderFunction)=>{
            renderFunction({
                ctx: this.ctx
            })
        })

        window.requestAnimationFrame(()=>{this.Render()})
    }

    /**
     * Utility for loading an image with a specific src into the sprites object.
     * @param {*} url 
     * @param {*} key The name the sprite should be stored under. Not providing this param simply causes the sprite to not be saved.
     * @returns {Image} 
     */
    LoadSprite(url, key=undefined){
        let image = new Image()
        image.src = url
        
        image.onload = ()=>{
            console.log(`Image from URL: "${url}" finished loading.`)
        }

        if(key!=undefined)this.sprite[key] = image
        return image;
    }
}