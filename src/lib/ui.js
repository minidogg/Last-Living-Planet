import {engine} from '../js/_main.js'
import { tileTypes, tileImages } from '../js/tiles.js'

let TileSelectBack;
export function StartUIRender(){
    TileSelectBack = engine.LoadSprite(`../assets/img/tiles/placeholder2.png`)

    engine.onRender.push(TileSelectUI)
    engine.onRender.push(UIVarUpdater)
}

let SquareSize = 0;
let SquareSizeInner = 0;
function UIVarUpdater(){
    SquareSize = (window.innerWidth+window.innerHeight)/2*0.05
    SquareSizeInner = SquareSize*0.75
}

function TileSelectUI({ctx}){
    for(let i = 0;i<tileTypes.length;i++){
        let tileType = tileTypes[i]

        let x = 10+(SquareSize+10)*i;
        let y = engine.canvas.height-SquareSize-10

        ctx.drawImage(TileSelectBack, x, y, SquareSize,SquareSize)
        ctx.drawImage(tileImages[tileType.id], x+SquareSize/8.5, y+SquareSize/8.5, SquareSizeInner, SquareSizeInner)
    }

}