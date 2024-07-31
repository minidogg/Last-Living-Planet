import { engine } from "./_main.js"

let backgroundImg = undefined;


/** 
 * @param {Object} param0
 * @param {CanvasRenderingContext2D} param0.ctx 
 */
export function BackgroundRender({ctx}){
    if(backgroundImg==undefined)backgroundImg = engine.LoadSprite("/assets/img/space.png", "backgroundPlaceholder")
    ctx.drawImage(backgroundImg, 0, -100, backgroundImg.width*1.8, backgroundImg.height*1.8)
    ctx.drawImage(backgroundImg, 0, -100, backgroundImg.width*1.8, backgroundImg.height*1.8)
}
