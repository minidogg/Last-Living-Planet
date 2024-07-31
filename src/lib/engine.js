export class LivingEngine {
    constructor(canvas, tiles) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.camX = 0;
        this.camY = 0;
        this.zoom = 1;

        this.tiles = tiles; // Store the tiles array

        this.onRender = [];
        this.sprite = {};

        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.keysPressed = {};

        this.selectedTile = { x: null, y: null };

        window.addEventListener("resize", () => { this.ResizeCanvas() });
        this.ResizeCanvas();

        this.setupInputListeners();
    }

    ResizeCanvas() {
        this.canvas.width = window.innerWidth * 0.99;
        this.canvas.height = window.innerHeight * 0.99;
    }

    Render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.handleInput();
        this.onRender.forEach((renderFunction) => {
            renderFunction({
                ctx: this.ctx
            });
        });

        window.requestAnimationFrame(() => { this.Render() });
    }

    setupInputListeners() {
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 2) { // Right mouse button
                this.isDragging = true;
                this.lastMouseX = e.clientX;
                this.lastMouseY = e.clientY;
            } else if (e.button === 0) { // Left mouse button
                this.selectTile(e.clientX, e.clientY);
            }
        });

        window.addEventListener('mousemove', (e) => {
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
    }

    handleInput() {
        const speed = 5;
        if (this.keysPressed['w']) {
            this.camY += speed;
        }
        if (this.keysPressed['s']) {
            this.camY -= speed;
        }
        if (this.keysPressed['a']) {
            this.camX += speed;
        }
        if (this.keysPressed['d']) {
            this.camX -= speed;
        }
    }

    selectTile(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const canvasX = clientX - rect.left;
        const canvasY = clientY - rect.top;

        const tileZoomedSize = 20 * this.zoom;

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
