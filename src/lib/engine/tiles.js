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

    if (this.canPlaceBuilding(x, y)) {
        const building = buildings[buildingType];
        if (building) {
            this.tiles[y][x] = {
                type: buildingType,
                building: building
            };
        }
    }
}

export function PlaceTileAtSelected(buildingType) {
    console.log(this)
    const { x, y } = this.selectedTile;

    this.placeBuilding(buildingType, x, y)
}

export function CanPlaceBuilding(x, y) {
    if (y === 0) return false; // Can't place on the top row
    if (this.tiles[y][x].type !== 'grass') return false; // Can't place on non-grass tiles
    if (this.tiles[y - 1][x].type === 'grass' || (x > 0 && this.tiles[y][x - 1].type === 'grass') || (x < this.tiles[0].length - 1 && this.tiles[y][x + 1].type === 'grass')) {
        return true;
    }
    return false;
}
