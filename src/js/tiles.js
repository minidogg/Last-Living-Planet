import { engine } from "./_main.js";

export let tiles = [];
export const tileImages = {};

export class TileTypeCategory{
    constructor({id, name=id, image="placeholder1.png", visible = true}) {
        this.id = id;
        this.name = name; 
        this.image = new Image(20,20)
        this.image.src = `../assets/img/tiles/${image}`;
        this.visible = visible;
    }
}
export const TileTypeCategories = [
    new TileTypeCategory({id:"none", name:"None", visible:false}),
    new TileTypeCategory({id:"housing", name:"Housing", visible:true}),
]

export class TileType{
    constructor({id, name=id, description=name, category="none"}){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

/**
 * @type {Array<TileType>}
 */
export const tileTypes = [
    new TileType({id: "grass"}),
    new TileType({id: "stone"}),
    new TileType({id:"house", name:"Basic House", category:"housing"})
];

// Load tile images
function loadTileImages() {
    // List your tile images here
    tileTypes.forEach(type => {
        const img = new Image();
        img.src = `../assets/img/tiles/${type.id}.png`;
        tileImages[type.id] = img;
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
            const tile = tiles[i1][i2];
            if(tile.type=="void")continue;
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
}


loadTileImages();
