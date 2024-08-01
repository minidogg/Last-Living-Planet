import { LivingEngine } from '../lib/engine.js';
import { BackgroundRender } from './background.js';
import { buildings } from "./buildings/buildings.js";
import * as TileSystem from './tiles.js';
import { StartUIRender } from '../lib/ui.js';

// Constant Elements
const canvas = document.getElementById("gameCanvas");

// Generate initial tiles (1 row of grass at the bottom)
TileSystem.GenerateTiles(100, 100); 

// Initialize Engine
export const engine = new LivingEngine(canvas, TileSystem.tiles);
engine.Render(); // Starts render loop.
engine.Tick() // Starts tick loop.

// Tiles
engine.LoadSprite('/assets/img/house.jpg', 'house');
TileSystem.PositionCameraAtHome()


// On Render Stuff
engine.onRender.push(BackgroundRender); // Background Rendering
engine.onRender.push(TileSystem.RenderTiles); // Tile Rendering

StartUIRender() // UI Rendering. THIS SHOULD ALWAYS BE LAST, otherwise the UI will be hidden under something.
