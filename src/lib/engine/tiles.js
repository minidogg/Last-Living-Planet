import { buildings } from "../../js/buildings/buildings.js";
import { resources } from "../../js/resources.js";
import { tileTypes  } from "../../js/tiles.js";

export function selectTile(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const canvasX = clientX - rect.left;
    const canvasY = clientY - rect.top;

    const tileZoomedSize = 20 * this.camZoom;

    const tileX = Math.floor((canvasX - this.camX) / tileZoomedSize);
    const tileY = Math.floor((canvasY - this.camY) / tileZoomedSize);

    if (tileX >= 0 && tileX < this.tiles[0].length && tileY >= 0 && tileY < this.tiles.length) {
        this.selectedTile.x = tileX;
        this.selectedTile.y = tileY;
    } else {
        this.selectedTile.x = null;
        this.selectedTile.y = null;
    }

    console.log(`Selected tile: (${this.selectedTile.x}, ${this.selectedTile.y})`);
}

export function PlaceTile(tileType, x, y) {
    if (x === null || y === null) return false;

    if (this.CanPlaceTile(x, y)) {
        this.tiles[y][x] = {
            type: tileType,
        };
        return true;
    }
    return false;
}

export function PlaceTileAtSelected(tileType, spendResources = true) {
    const { x, y } = this.selectedTile;
    let tile = tileTypes.find(e=>e.id==tileType)
    if(spendResources){
        let canAfford = true;

        Object.keys(tile.cost).forEach(e=>{
            if(canAfford==false)return;
            if(resources[e].value<tile.cost[e])canAfford = false;
        })

        if(canAfford==false){
            return;
        }


    }

    let success = this.PlaceTile(tileType, x, y);
    console.log(success)
    if(success==true&&spendResources==true){
        Object.keys(tile.cost).forEach(e=>{
            resources[e].value -= tile.cost[e]
        })
    }

    return true;
}

export function CanPlaceTile(x, y) {
    if (y === 0) return false; // Can't place on the top row
    if (this.tiles[y][x].type != 'void') return false; // Can't place on existing building
    if (this.tiles[y+1][x].type == 'void' && (this.tiles[y][x+1].type == 'void' || this.tiles[y][x-1].type == 'void')) return false; // Can't place on top of nothing without 2 supports.
 
    return true;
}
