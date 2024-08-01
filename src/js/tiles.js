import { engine } from "./_main.js";
import { buildings } from "./buildings/buildings.js";
import { tile } from "./buildings/house/index.js";
import { TileType } from "./tiletype.js";

export let tiles = [];
export const tileImages = {};




/**
 * @type {Array<TileType>}
 */
export const tileTypes = [
    new TileType({id: "grass"}),
    new TileType({id: "stone"})
].concat(buildings);

// Load tile images
function loadTileImages() {
    // List your tile images here
    tileTypes.forEach(type => {
        const img = new Image();
        img.src = `../assets/img/tiles/${type.id}.png`;
        tileImages[type.id] = img;
    });
}
loadTileImages();


// Generate tiles with image types
const homePos = {x:51, y:65}
export function GenerateTiles(width = 100, height = 10, grassLayer = 1) {
    tiles = [];
    for (let i1 = 0; i1 < height; i1++) {
        tiles.push([]);
        for (let i2 = 0; i2 < width; i2++) {
            const type = i2>65||35>i2?"void":(
                    i1==60?"grass":(
                    i1==61||i1==62?"stone":(
                        (i1==63||i1==64)&&Math.random()>0.8?"stone":"void"
                    )
                )
            );

            tiles[i1].push({
                type: type
            });
        }
    }
    console.log("Tiles generated:", tiles);
}


// Render tiles with images
export function RenderTiles({ ctx }) {
    const tileZoomedSize = 20 * engine.camZoom;

    const visibleTilesX = Math.ceil(ctx.canvas.width / tileZoomedSize);
    const visibleTilesY = Math.ceil(ctx.canvas.height / tileZoomedSize);

    const startX = Math.max(0, Math.floor(-engine.camX / tileZoomedSize));
    const startY = Math.max(0, Math.floor(-engine.camY / tileZoomedSize));

    const endX = Math.min(tiles[0].length, startX + visibleTilesX);
    const endY = Math.min(tiles.length, startY + visibleTilesY);

    for (let i1 = startY; i1 < endY; i1++) {
        for (let i2 = startX; i2 < endX; i2++) {
            // Get the tile
            const tile = tiles[i1][i2];

            
            // If the tile type is void all other rendering steps are skipped to optimize rendering speeds.
            if(tile.type=="void")continue;
            const img = tileImages[tile.type];


            // If the tile has an image, draw it
            if (img) {
                ctx.drawImage(
                    img,
                    i2 * tileZoomedSize + engine.camX,
                    i1 * tileZoomedSize + engine.camY,
                    tileZoomedSize,
                    tileZoomedSize
                );
            // If the tile doesn't have an image, draw a white box.
            } else {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(
                    i2 * tileZoomedSize + engine.camX,
                    i1 * tileZoomedSize + engine.camY,
                    tileZoomedSize,
                    tileZoomedSize
                );
            }

            // ? This code serves no purpose because its the same as the already existing tile rendering, just with some fancy extras.
            // if (tile.building) {
            //     const buildingImg = engine.sprite[tile.building.sprite];
            //     if (buildingImg) {
            //         ctx.drawImage(
            //             buildingImg,
            //             i2 * tileZoomedSize + engine.camX,
            //             i1 * tileZoomedSize + engine.camY,
            //             tileZoomedSize,
            //             tileZoomedSize
            //         );
            //     }
            // }


        }
    }

    // Render the selected tile outline
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(
        engine.selectedTile.x * tileZoomedSize + engine.camX,
        engine.selectedTile.y * tileZoomedSize + engine.camY,
        tileZoomedSize,
        tileZoomedSize
    );
}



export function PositionCameraAtHome(){
    const tileZoomedSize = -20 * engine.camZoom;

    engine.camX = (homePos.x-20)*tileZoomedSize;
    engine.camY = (homePos.y-15)*tileZoomedSize;
    
}