import { engine } from "./_main.js";

export let tiles = [];
const tileImages = {};

// Load tile images
function loadTileImages() {
    // List your tile images here
    const tileTypes = ['stone', 'grass'];
    tileTypes.forEach(type => {
        const img = new Image();
        img.src = `../assets/img/tiles/${type}.png`; 
        tileImages[type] = img;
    });
}

// Generate tiles with image types
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
            // i2>62||i2<35?"void":(
            //     i1==61||i1==62&&Math.random?"stone":(
            //         i1==60?"grass":(
            //             i1==63||i1==64&&Math.random()>0.8?"stone":"void"
            //         )
            //     )
            // );
            tiles[i1].push({
                type: type
            });
        }
    }
    console.log("Tiles generated:", tiles);
}


// Render tiles with images
let mostTimeTaken = 0;
export function RenderTiles({ ctx }) {
    const start = Date.now();
    const tileZoomedSize = 20 * engine.camZoom;

    const visibleTilesX = Math.ceil(ctx.canvas.width / tileZoomedSize);
    const visibleTilesY = Math.ceil(ctx.canvas.height / tileZoomedSize);

    const startX = Math.max(0, Math.floor(-engine.camX / tileZoomedSize));
    const startY = Math.max(0, Math.floor(-engine.camY / tileZoomedSize));

    const endX = Math.min(tiles[0].length, startX + visibleTilesX);
    const endY = Math.min(tiles.length, startY + visibleTilesY);

    for (let i1 = startY; i1 < endY; i1++) {
        for (let i2 = startX; i2 < endX; i2++) {
            const tile = tiles[i1][i2];
            const img = tileImages[tile.type];
            if (img) {
                ctx.drawImage(
                    img,
                    i2 * tileZoomedSize + engine.camX,
                    i1 * tileZoomedSize + engine.camY,
                    tileZoomedSize,
                    tileZoomedSize
                );
            } else {
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(
                    i2 * tileZoomedSize + engine.camX,
                    i1 * tileZoomedSize + engine.camY,
                    tileZoomedSize,
                    tileZoomedSize
                );
            }

            if (tile.building) {
                const buildingImg = engine.sprite[tile.building.sprite];
                if (buildingImg) {
                    ctx.drawImage(
                        buildingImg,
                        i2 * tileZoomedSize + engine.camX,
                        i1 * tileZoomedSize + engine.camY,
                        tileZoomedSize,
                        tileZoomedSize
                    );
                }
            }

            if (engine.selectedTile.x === i2 && engine.selectedTile.y === i1) {
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2;
                ctx.strokeRect(
                    i2 * tileZoomedSize + engine.camX,
                    i1 * tileZoomedSize + engine.camY,
                    tileZoomedSize,
                    tileZoomedSize
                );
            }
        }
    }

    const end = Date.now();
    const timeTaken = end - start 
    if(timeTaken>mostTimeTaken){
        console.log()
        mostTimeTaken = timeTaken
        console.log("New most time taken for render is: "+mostTimeTaken+" ms")
    }
    // console.log(`Rendering time: ${timeTaken} ms`);
}


loadTileImages();
