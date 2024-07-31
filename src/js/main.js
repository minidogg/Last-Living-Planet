// Imports
import { LivingEngine } from '../lib/engine.js'

// Constant Elements
const canvas = document.getElementById("gameCanvas")

// Code
export const engine = new LivingEngine(canvas)
engine.Render() // Starts render loop.

let background = engine.LoadSprite("/assets/img/space.png", "backgroundPlaceholder")

/** 
 * @param {Object} param0
 * @param {CanvasRenderingContext2D} param0.ctx 
 */
function BackgroundRender({ctx}){
    ctx.fillStyle = "green"
    ctx.fillRect(0,0,10,10)
}
engine.onRender.push(BackgroundRender)
