import { selectedBuildTile } from "../ui.js";

export function setupInputListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
        this.updateMouse(e, e.button)

        if(this.inUI == true||this.inMenu == true) return;
        if (e.button === 2) { // Right mouse button
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        } else if (e.button === 0) { // Left mouse button
            this.selectTile(e.clientX, e.clientY);
            if(selectedBuildTile!=undefined){
                this.PlaceTileAtSelected(selectedBuildTile.id)
            }
        }
    });

    window.addEventListener('mousemove', (e) => {
        this.updateMouse(e)

        if(this.inUI == true) return;
        if (this.isDragging) {
            const dx = this.mouse.x - this.lastMouseX;
            const dy = this.mouse.y - this.lastMouseY;

            this.camX += dx;
            this.camY += dy;

            this.lastMouseX = this.mouse.x;
            this.lastMouseY = this.mouse.y;
        }
    });

    window.addEventListener('mouseup', (e) => {
        this.updateMouse(e)
        
        if(this.inUI == true) return;
        if (e.button === 2) { // Right mouse button
            this.isDragging = false;
        }
    });

    window.addEventListener('keydown', (e) => {
        this.keysPressed[e.key] = true;
        if(this.keysPressed["Tab"]==true)this.inMenu = !this.inMenu;
    });

    window.addEventListener('keyup', (e) => {
        this.keysPressed[e.key] = false;
    });

    window.addEventListener("wheel", (e) => {
        // TODO: Add a way to get scroll amount from the "this.mouse" object
        if(this.inUI == true||this.inMenu == true) return;

        const mouseX = this.mouse.x;
        const mouseY = this.mouse.y;
        const zoomFactor = 1 + e.deltaY * -0.001 * this.camZoomSpeed;

        const worldX = (mouseX - this.camX) / this.camZoom;
        const worldY = (mouseY - this.camY) / this.camZoom;

        this.camZoom *= zoomFactor;

        this.camX = mouseX - worldX * this.camZoom;
        this.camY = mouseY - worldY * this.camZoom;
    });
}
