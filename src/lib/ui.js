import { engine } from '../js/_main.js';
import { tileTypes, tileImages } from '../js/tiles.js';
import { TileTypeCategories } from '../js/tiletype.js';
import { isDev } from './utils.js';
import { resources } from '../js/resources.js';

// TODO: Split this up into different files just like engine.js

// Set the default font
export const defaultFont = "Pixel"

// Init the image variable used for UI Boxes.
let UIBack;

// Load things in that are needed for UI rendering.
export function StartUIRender() {
    // Load the sprite UIBack sprite into the UIBack variable.
    UIBack = engine.LoadSprite(`../assets/img/uiback.png`);

    // Push the UI rendering functions into the render loop
    engine.onRender.push(UIVarUpdater); // This should always be first.
    engine.onRender.push(MenuUI);
    engine.onRender.push(TileSelectUI);
    engine.onRender.push(ResourceDisplayUI);
}

// Init variables used for proportional scaling in the UI.
let SquareSize = 0;
let SquareSizeInner = 0;
function UIVarUpdater() {
    // Update the variables used for proportional UI scaling.
    SquareSize = (window.innerWidth + window.innerHeight) / 2 * 0.05;
    SquareSizeInner = SquareSize * 0.75;

    // Reset the inUI variable.
    engine.inUI = false;
}

// Check if a point is in a rectangle.
function IsPointInRect(px, py, rx1, ry1, rx2, ry2) {
    return (
        px >= Math.min(rx1, rx2) &&
        px <= Math.max(rx1, rx2) &&
        py >= Math.min(ry1, ry2) &&
        py <= Math.max(ry1, ry2)
    );
}

// Draw an outlined rectangle.
function drawOutlineRect(ctx, x, y, width, height, fill = "#282828", outline = "#8a8a8a", outlineWidth = 2) {
    ctx.fillStyle = outline;
    ctx.fillRect(x - outlineWidth, y - outlineWidth, width + outlineWidth * 2, height + outlineWidth * 2);
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, width, height);
}

// TODO: Make this code more readable and understandable.
let FilteredCategories = TileTypeCategories.filter(e => e.visible == true || isDev == true);
let selectedCategoryI = 0;
let selectedCategory = FilteredCategories[selectedCategoryI];
export let selectedBuildTile = undefined;
function TileSelectUI({ ctx }) {
    if(engine.inMenu)return;
    let hoverTileCategory = -1;
    let hoverTile = -1;

    // Render the category select Ui
    for (let i = 0; i < FilteredCategories.length; i++) {
        let tileCategory = FilteredCategories[i];

        let x = 10 + (SquareSize + 10) * i;
        let y = engine.canvas.height - SquareSize - 10;

        ctx.drawImage(UIBack, x, y, SquareSize, SquareSize);
        ctx.drawImage(tileCategory.image, x + SquareSize / 8.5, y + SquareSize / 8.5, SquareSizeInner, SquareSizeInner);

        if (IsPointInRect(engine.mouse.x, engine.mouse.y, x, y, x + SquareSize, y + SquareSize)) {
            selectedCategoryI = i;
            selectedCategory = FilteredCategories[selectedCategoryI];
            hoverTileCategory = i;
        }
    }

    // Tile Pick UI
    let selectedX = 10 + (SquareSize + 10) * selectedCategoryI;
    let selectedY = engine.canvas.height - SquareSize - 10;
    for (let i = 0; i < selectedCategory.tiles.length; i++) {
        let tileType = selectedCategory.tiles[i];
        let y = selectedY - SquareSize * (i + 1) - 10;

        drawOutlineRect(ctx, selectedX, y, SquareSize, SquareSize);
        ctx.drawImage(tileImages[tileType.id], selectedX + SquareSize / 8.5, y + SquareSize / 8.5, SquareSizeInner, SquareSizeInner);
        if (IsPointInRect(engine.mouse.x, engine.mouse.y, selectedX, y, selectedX + SquareSize, y + SquareSize)) {
            engine.inUI = true;
            hoverTile = i;
        }
    }

    // Tile Hover
    if (hoverTile != -1) {
        let tileType = selectedCategory.tiles[hoverTile];

        ctx.font = (SquareSize / 2.5) + `px ${defaultFont}`;
        let nameWidth = ctx.measureText(tileType.name).width;

        ctx.font = (SquareSize / 3) + `px ${defaultFont}`;
        let descriptionWidth = ctx.measureText(tileType.description).width;

        let maxWidth = Math.max(nameWidth, descriptionWidth);
        let tooltipHeight = SquareSize / 2.5 + SquareSize / 3 + SquareSize / 3;

        if (tileType.cost != undefined) {
            for (let i = 0; i < Object.keys(tileType.cost).length; i++) {
                let id = Object.keys(tileType.cost)[i];
                let name = resources[id].name + " x" + tileType.cost[id];
                let costWidth = ctx.measureText(name).width;
                maxWidth = Math.max(maxWidth, costWidth);
                tooltipHeight += SquareSize / 3;
            }
        }

        drawOutlineRect(ctx, engine.mouse.x, engine.mouse.y - tooltipHeight, maxWidth + 20, tooltipHeight + 10);

        ctx.fillStyle = "white";
        let x = engine.mouse.x + 10;
        let y = engine.mouse.y - tooltipHeight + (SquareSize / 2.5);

        ctx.font = (SquareSize / 2.5) + `px ${defaultFont}`;
        ctx.fillText(tileType.name, x, y);

        ctx.font = (SquareSize / 3) + `px ${defaultFont}`;
        ctx.fillText(tileType.description, x, y + SquareSize / 2.5);

        if (tileType.cost != undefined) {
            for (let i = 0; i < Object.keys(tileType.cost).length; i++) {
                let id = Object.keys(tileType.cost)[i];
                let name = resources[id].name + " x" + tileType.cost[id];
                ctx.fillText(name, x, y + (SquareSize / 1.2) + (SquareSize / 3) * i);
            }
        }

        if (engine.mouse.down == true && engine.mouse.button == 0) {
            selectedBuildTile = tileType;
        }
    }

    // Render the category tooltips.
    if (hoverTileCategory != -1) {
        engine.inUI = true;
        let tileCategory = FilteredCategories[hoverTileCategory];

        ctx.font = (SquareSize / 2.5) + `px ${defaultFont}`;
        let categoryWidth = ctx.measureText(tileCategory.name).width;
        let categoryHeight = SquareSize / 2.5;

        drawOutlineRect(ctx, engine.mouse.x, engine.mouse.y, categoryWidth + 20, categoryHeight + 10);

        ctx.fillStyle = "white";
        ctx.fillText(tileCategory.name, engine.mouse.x + 10, engine.mouse.y + categoryHeight / 1.5);
    }
}

function ResourceDisplayUI({ ctx }) {
    if(engine.inMenu)return;
    let width = SquareSize * 4;
    let height = engine.canvas.height / 2.2;
    let x = engine.canvas.width - width;
    let y = engine.canvas.height - height;

    ctx.globalAlpha = 0.4;
    drawOutlineRect(ctx, x, y, width, height, "#282828");
    ctx.globalAlpha = 1;
    if (IsPointInRect(engine.mouse.x, engine.mouse.y, x, y, x + width, y + height)) {
        engine.inUI = true;
    }

    for (let i = 0; i < Object.keys(resources).length; i++) {
        let resource = resources[Object.keys(resources)[i]];
        let resourceY = y + SquareSize * 0.6 * i + 10;

        drawOutlineRect(ctx, x + 10, resourceY, width - 20, SquareSize * 0.5);

        ctx.drawImage(resource.image, x + 20, resourceY + 5, SquareSize * 0.4, SquareSize * 0.4);
        ctx.fillStyle = "white";
        ctx.font = (SquareSize / 3) + `px ${defaultFont}`;
        ctx.fillText(resource.name + " x" + resource.value, x + 30 + SquareSize * 0.4, resourceY + SquareSize * 0.35);
    }

}

function MenuUI({ ctx, canvas }){

}