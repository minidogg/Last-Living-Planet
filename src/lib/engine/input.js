import { selectedBuildTile } from "../ui.js";

export function setupInputListeners() {
    this.canvas.addEventListener('mousedown', (e) => {
        this.updateMouse(e)

        if(this.inUI == true) return;
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
        
        if(this.inUI == true) return;
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

    window.addEventListener("wheel", (e) => {
        if(this.inUI == true) return;

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
