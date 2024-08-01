export class LivingEngine {
    constructor(canvas, tiles) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.camX = 0;
        this.camY = 0;
        this.camMoveSpeed = 10;

        this.camZoom = 2;
        this.camZoomSpeed = 2

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

        this.setupInputListeners();
    }

    ResizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    Render() {
        const start = Date.now();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.handleInput();
        this.onRender.forEach((renderFunction) => {
            renderFunction({
                ctx: this.ctx
            });
        });

        const end = Date.now();
        const timeTaken = end - start 
        if(timeTaken>this.longestRenderTime){
            console.log()
            this.longestRenderTime = timeTaken
            console.warn("New most time taken for render is: "+this.longestRenderTime+" ms")
            // ? Do note that the render times can sometime be influenced by outside factors like the tick functions.
        }
        // console.log(`Rendering time: ${timeTaken} ms`);

        window.requestAnimationFrame(() => { this.Render() });
    }

    Tick() {
        this.onTick.forEach((tickFunction) => {
            renderFunction({
                ctx: this.ctx
            });
        });

        setTimeout(()=>{this.Tick()}, this.tickSpeed)
    }

    updateMouse(event){
        this.mouse = {
            x: event.clientX,
            y: event.clientY,
            down: event.type=="mousedown",
            button: event.button
        }
    }
    setupInputListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.updateMouse(e)

            if(this.inUI==true)return;
            if (e.button === 2) { // Right mouse button
                this.isDragging = true;
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            } else if (e.button === 0) { // Left mouse button
                this.selectTile(e.clientX, e.clientY);
            }
        });

        window.addEventListener('mousemove', (e) => {
            this.updateMouse(e)

            if(this.inUI==true)return;
            if (this.isDragging) {
                const dx = e.clientX - this.lastMouseX;
                const dy = e.clientY - this.lastMouseY;

                this.camX += dx;
                this.camY += dy;

                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            }
        });

        window.addEventListener('mouseup', (e) => {
            this.updateMouse(e)
            
            if(this.inUI==true)return;
            if (e.button === 2) { // Right mouse button
                this.isDragging = false;
            }
        });

        window.addEventListener('keydown', (e) => {
            this.keysPressed[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keysPressed[e.key] = false;
        });

        window.addEventListener("wheel", (e)=>{
            if(this.inUI==true)return;
            this.camZoom += e.deltaY*-0.001*this.camZoomSpeed;
            this.camX += e.deltaY*0.25*this.camZoomSpeed
            this.camY += e.deltaY*0.25*this.camZoomSpeed
        })
    }

    handleInput() {
        if(this.inUI==true)return;

        // Normalize the keysPressed keys to lowercase
        const normalizedKeys = Object.keys(this.keysPressed).reduce((acc, key) => {
            acc[key.toLowerCase()] = this.keysPressed[key];
            return acc;
        }, {});
    
        if (normalizedKeys['w']) {
            this.camY += this.camMoveSpeed;
        }
        if (normalizedKeys['s']) {
            this.camY -= this.camMoveSpeed;
        }
        if (normalizedKeys['a']) {
            this.camX += this.camMoveSpeed;
        }
        if (normalizedKeys['d']) {
            this.camX -= this.camMoveSpeed;
        }
    }    

    selectTile(clientX, clientY) {
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


    placeBuilding(buildingType, x, y ) {
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

    placeBuildingAtSelected(buildingType) {
        const { x, y } = this.selectedTile;

        this.placeBuilding(buildingType, x, y)
    }

    canPlaceBuilding(x, y) {
        if (y === 0) return false; // Can't place on the top row
        if (this.tiles[y][x].type !== 'grass') return false; // Can't place on non-grass tiles
        if (this.tiles[y - 1][x].type === 'grass' || (x > 0 && this.tiles[y][x - 1].type === 'grass') || (x < this.tiles[0].length - 1 && this.tiles[y][x + 1].type === 'grass')) {
            return true;
        }
        return false;
    }

    /**
     * Utility for loading an image with a specific src into the sprites object.
     * @param {*} url 
     * @param {*} key The name the sprite should be stored under. Not providing this param simply causes the sprite to not be saved.
     * @returns {Image} 
     */
    LoadSprite(url, key = undefined) {
        let image = new Image();
        image.src = url;

        image.onload = () => {
            console.log(`Image from URL: "${url}" finished loading.`);
        };

        if (key != undefined) this.sprite[key] = image;
        return image;
    }
}
