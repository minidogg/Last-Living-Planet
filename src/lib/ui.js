import {engine} from '../js/_main.js'
import { tileTypes, tileImages, TileTypeCategories, TileTypeCategory } from '../js/tiles.js'
import { isDev } from './utils.js';

let UIBack;
export function StartUIRender(){
    UIBack = engine.LoadSprite(`../assets/img/uiback.png`)

    engine.onRender.push(TileSelectUI)
    engine.onRender.push(UIVarUpdater)
}

let SquareSize = 0;
let SquareSizeInner = 0;
function UIVarUpdater(){
    SquareSize = (window.innerWidth+window.innerHeight)/2*0.05
    SquareSizeInner = SquareSize*0.75
}

function IsPointInRect(px, py, rx1, ry1, rx2, ry2){
    return (
        px >= Math.min(rx1, rx2) &&
        px <= Math.max(rx1, rx2) &&
        py >= Math.min(ry1, ry2) &&
        py <= Math.max(ry1, ry2)

    )
}

function drawOutlineSquare(ctx, x, y, width, height, fill = "#282828", outline = "#8a8a8a", outlineWidth = 2){
    ctx.fillStyle = outline
    ctx.fillRect(x-outlineWidth, y-outlineWidth, width+outlineWidth, height+outlineWidth)
    ctx.fillStyle = fill
    ctx.fillRect(x, y, width, height)
}

let selectedTileCategory = 0;
let FilteredCategories = TileTypeCategories.filter(e=>e.visible==true||isDev==true) 
function TileSelectUI({ctx}){
    let hoverTileCategory = -1;
    // Render the category select Ui
    for(let i = 0;i<FilteredCategories.length;i++){
        let tileCategory = FilteredCategories[i]

        let x = 10+(SquareSize+10)*i;
        let y = engine.canvas.height-SquareSize-10

        ctx.drawImage(UIBack, x, y, SquareSize,SquareSize)
        ctx.drawImage(tileCategory.image, x+SquareSize/8.5, y+SquareSize/8.5, SquareSizeInner, SquareSizeInner)

        if(IsPointInRect(engine.mouse.x, engine.mouse.y, x, y, x+SquareSize, y+SquareSize)){
            selectedTileCategory = i;
            hoverTileCategory = i;
        }
    }

    // TODO: Render the tiles from the selected category.
    

    // Render the category tooltips.
    if(hoverTileCategory!=-1){
        let tileCategory = FilteredCategories[hoverTileCategory]

        drawOutlineSquare(ctx, engine.mouse.x, engine.mouse.y, SquareSize*4, SquareSize/2)

        ctx.fillStyle = "white";
        ctx.font = (SquareSize/2.5)+"px Arial"
        ctx.fillText(tileCategory.name, engine.mouse.x, engine.mouse.y+SquareSize/2.4, SquareSize*4)
    }
}