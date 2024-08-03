import { buildings } from "../../js/buildings/buildings.js";

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

export function PlaceTile(buildingType, x, y) {
    if (x === null || y === null) return;

    if (this.CanPlaceTile(x, y)) {
        this.tiles[y][x] = {
            type: buildingType,
        };
    }
}

export function PlaceTileAtSelected(buildingType) {
    const { x, y } = this.selectedTile;

    this.PlaceTile(buildingType, x, y)
}

export function CanPlaceTile(x, y) {
    if (y === 0) return false; // Can't place on the top row
    if (this.tiles[y][x].type != 'void') return false; // Can't place on existing building
    if (this.tiles[y+1][x].type == 'void' && (this.tiles[y][x+1].type == 'void' || this.tiles[y][x-1].type == 'void')) return false; // Can't place on top of nothing without 2 supports.
 
    return true;
}
