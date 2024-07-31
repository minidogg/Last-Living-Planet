// Imports
import { LivingEngine } from '../lib/engine.js'
import { BackgroundRender } from './background.js'
import * as TileSystem from './tiles.js'

// Constant Elements
const canvas = document.getElementById("gameCanvas")

// Code

// Render tiles for passing
TileSystem.GenerateTiles() 

// Do stuff
export const engine = new LivingEngine(canvas, TileSystem.tiles)
engine.Render() // Starts render loop.

// Background 
engine.onRender.push(BackgroundRender)

// Tiles
engine.onRender.push(TileSystem.RenderTiles)
