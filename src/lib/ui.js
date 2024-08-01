import {engine} from '../js/_main.js'
import { tileTypes, tileImages } from '../js/tiles.js'
import { TileTypeCategories } from '../js/tiletype.js';
import { isDev } from './utils.js';
import { resources } from '../js/resources.js';

let UIBack;
export function StartUIRender(){
    UIBack = engine.LoadSprite(`../assets/img/uiback.png`)

    engine.onRender.push(UIVarUpdater) // This should always be first.
    engine.onRender.push(TileSelectUI)
    engine.onRender.push(ResourceDisplayUI)
}

let SquareSize = 0;
let SquareSizeInner = 0;
function UIVarUpdater(){
    SquareSize = (window.innerWidth+window.innerHeight)/2*0.05
    SquareSizeInner = SquareSize*0.75
    engine.inUI = false;
}

// Is Point
function IsPointInRect(px, py, rx1, ry1, rx2, ry2){
    return (
        px >= Math.min(rx1, rx2) &&
        px <= Math.max(rx1, rx2) &&
        py >= Math.min(ry1, ry2) &&
        py <= Math.max(ry1, ry2)

    )
}

function drawOutlineRect(ctx, x, y, width, height, fill = "#282828", outline = "#8a8a8a", outlineWidth = 2){
    ctx.fillStyle = outline
    ctx.fillRect(x-outlineWidth, y-outlineWidth, width+outlineWidth*2, height+outlineWidth*2)
    ctx.fillStyle = fill
    ctx.fillRect(x, y, width, height)
}


let FilteredCategories = TileTypeCategories.filter(e=>e.visible==true||isDev==true) 
let selectedCategoryI = 0;
let selectedCategory = FilteredCategories[selectedCategoryI]
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
            selectedCategoryI = i;
            FilteredCategories[selectedCategoryI]
            hoverTileCategory = i;
        }
    }

    // TODO: Render the tiles from the selected category.
    for(let i = 0;i<selectedCategoryI;i++){

    }

    // Render the category tooltips.
    if(hoverTileCategory!=-1){
        engine.inUI = true;
        let tileCategory = FilteredCategories[hoverTileCategory]

        drawOutlineRect(ctx, engine.mouse.x, engine.mouse.y, SquareSize*4, SquareSize/2)

        ctx.fillStyle = "white";
        ctx.font = (SquareSize/2.5)+"px Arial"
        ctx.fillText(tileCategory.name, engine.mouse.x, engine.mouse.y+SquareSize/2.4, SquareSize*4)
    }
}

function ResourceDisplayUI({ctx}){
    let width = SquareSize*4;
    let height = engine.canvas.height/2.2
    let x = engine.canvas.width-width;
    let y = engine.canvas.height-height;

    drawOutlineRect(ctx, x, y, width, height)
    if(IsPointInRect(engine.mouse.x,engine.mouse.y,x,y,x+width,y+width)){
        engine.inUI = true;
    }

    for(let i = 0;i<Object.keys(resources).length;i++){
        let resource = resources[Object.keys(resources)[i]]
        ctx.fillStyle = "white";
        ctx.font = (SquareSize/3)+"px Arial"
        ctx.fillText(resource.name+" x"+resource.value, x+SquareSizeInner/2+5, y+SquareSize/1.4*(i+1), SquareSize*4)
        ctx.drawImage(resource.image, x, y+SquareSize/2.4*(i+1), SquareSizeInner/2, SquareSizeInner/2)

    }
}