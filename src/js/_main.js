import { LivingEngine } from '../lib/engine.js';
import { BackgroundRender } from './background.js';
import * as TileSystem from './tiles.js';
import { buildings } from './buildings/index.js';
// Constant Elements
const canvas = document.getElementById("gameCanvas");

// Generate initial tiles (1 row of grass at the bottom)
TileSystem.GenerateTiles(100, 100); 

// Initialize Engine
export const engine = new LivingEngine(canvas, TileSystem.tiles);
engine.Render(); // Starts render loop.

// Background 
engine.onRender.push(BackgroundRender);

// Tiles
engine.onRender.push(TileSystem.RenderTiles);

engine.LoadSprite('/assets/img/house.png', 'house');

window.placeBuilding = function (buildingType) {
    engine.placeBuilding(buildingType);
};
