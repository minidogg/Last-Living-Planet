import { engine } from "./_main.js";

export let tiles = []

export function GenerateTiles(width=100,height=100){
    tiles = []
    for(let i1 = 0;i1<height;i1++){
        tiles.push([])
        for(let i2 = 0;i2<width;i2++){
            tiles[i1].push({
                color: 
            })
        }
    }
    console.log(tiles)
}

/** 
 * @param {Object} param0
 * @param {CanvasRenderingContext2D} param0.ctx 
 */
export function RenderTiles({ctx}){
    let start = Date.now()
    const tileZoomedSize = 20*engine.zoom
    for(let i1 = 0;i1<tiles.length;i1++){
        for(let i2 = 0;i2<tiles[i1].length;i2++){
            ctx.fillRect(i2*20+engine.camX, i1*20+engine.camY, 20, 20)
        }
    } 
    let end = Date.now()

    console.log(start, end, end-start)
}