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
export function GenerateTiles(width = 100, height = 100) {
    tiles = [];
    for (let i1 = 0; i1 < height; i1++) {
        tiles.push([]);
        for (let i2 = 0; i2 < width; i2++) {
            const type = Math.random() > 0.5 ? 'stone' : 'grass';
            tiles[i1].push({
                type: type
            });
        }
    }
    console.log("Tiles generated:", tiles);
}

export function RenderTiles({ ctx }) {
    const start = Date.now();
    const tileZoomedSize = 20 * engine.zoom;

    for (let i1 = 0; i1 < tiles.length; i1++) {
        for (let i2 = 0; i2 < tiles[i1].length; i2++) {
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

            if (engine.selectedTile.x === i2 && engine.selectedTile.y === i1) {
                ctx.strokeStyle = "red";
                ctx.lineWidth = 3;
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
    //console.log(`Rendering time: ${end - start} ms`);
}

loadTileImages();
