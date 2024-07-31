// Imports
import { LivingEngine } from '../lib/engine.js'
import { BackgroundRender } from './background.js'
import * as TileSystem from './tiles.js'
// import * as BuildingSystem from './buildings/index.js'

// Constant Elements
const canvas = document.getElementById("gameCanvas")

// Code
export const engine = new LivingEngine(canvas, TileSystem.tiles)
engine.Render() // Starts render loop.


// Background 
engine.onRender.push( BackgroundRender )

// Buildings
// const buildings = await BuildingSystem.getAllBuildings();
// console.log(buildings);

// Tiles
TileSystem.GenerateTiles()
engine.onRender.push( TileSystem.RenderTiles )