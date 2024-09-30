import { engine } from "./_main.js"

let backgroundImg = undefined;
let saturnImg = undefined;


/** 
 * @param {Object} param0
 * @param {CanvasRenderingContext2D} param0.ctx 
 */
export function BackgroundRender({ctx}){
    if(saturnImg==undefined)saturnImg = engine.LoadSprite("/assets/img/saturn.png", "saturnImg")
    if(backgroundImg==undefined)backgroundImg = engine.LoadSprite("/assets/img/space.png", "backgroundPlaceholder")
    ctx.drawImage(backgroundImg, 0, -100, backgroundImg.width*1.8, backgroundImg.height*1.8)
    ctx.drawImage(backgroundImg, backgroundImg.width*1.8, -100, backgroundImg.width*1.8, backgroundImg.height*1.8)

    let rot = 50 * Math.PI / 180
    // ctx.rotate(rot)
    ctx.globalAlpha = 0.8;
    ctx.drawImage(saturnImg, 0+engine.camX, 0+engine.camY, saturnImg.width*engine.camZoom, saturnImg.height*engine.camZoom)
    ctx.globalAlpha = 1;
    // ctx.rotate(-rot)
}
