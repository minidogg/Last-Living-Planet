import { setupInputListeners } from './input.js';
import { handleInput } from './camera.js';
import { selectTile, placeBuilding, placeBuildingAtSelected, canPlaceBuilding } from './tiles.js';
import { LoadSprite } from './utils.js';

export class LivingEngine {
    constructor(canvas, tiles) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.camX = 0;
        this.camY = 0;
        this.camMoveSpeed = 10;

        this.camZoom = 2;
        this.camZoomSpeed = 2;

        this.tiles = tiles; // Store the tiles array

        this.onTick = [];
        this.tickSpeed = 20; // tick speed in ms.

        this.onRender = [];
        this.sprite = {};

        this.isDragging = false;
        this.mouse = {
            x: 0,
            y: 0,
            down: false,
            button: 0
        }
        this.lastMouseX = 0;
        this.lastMouseY = 0;

        this.inUI = false;

        this.keysPressed = {};

        this.longestRenderTime = 2;

        this.selectedTile = { x: null, y: null };

        window.addEventListener("resize", () => { this.ResizeCanvas() });
        this.ResizeCanvas();

        setupInputListeners.call(this);
    }

    ResizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    Render() {
        const start = Date.now();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        handleInput.call(this);
        this.onRender.forEach((renderFunction) => {
            renderFunction({
                ctx: this.ctx
            });
        });

        const end = Date.now();
        const timeTaken = end - start 
        if(timeTaken > this.longestRenderTime){
            console.log()
            this.longestRenderTime = timeTaken
            console.warn("New most time taken for render is: "+this.longestRenderTime+" ms")
        }
        // console.log(`Rendering time: ${timeTaken} ms`);

        window.requestAnimationFrame(() => { this.Render() });
    }

    Tick() {
        this.onTick.forEach((tickFunction) => {
            tickFunction({
                ctx: this.ctx
            });
        });

        setTimeout(()=>{this.Tick()}, this.tickSpeed);
    }

    updateMouse(event){
        this.mouse = {
            x: event.clientX,
            y: event.clientY,
            down: event.type == "mousedown",
            button: event.button
        }
    }

    selectTile(clientX, clientY) {
        selectTile.call(this, clientX, clientY);
    }

    placeBuilding(buildingType, x, y) {
        placeBuilding.call(this, buildingType, x, y);
    }

    placeBuildingAtSelected(buildingType) {
        placeBuildingAtSelected.call(this, buildingType);
    }

    canPlaceBuilding(x, y) {
        return canPlaceBuilding.call(this, x, y);
    }

    LoadSprite(url, key = undefined) {
        return LoadSprite.call(this, url, key);
    }
}
