// Imports
import { LivingEngine } from '../lib/engine.js'
import {BackgroundRender} from './background.js'
import * as tileSystem from './tiles.js'

// Constant Elements
const canvas = document.getElementById("gameCanvas")

// Code
export const engine = new LivingEngine(canvas)
engine.Render() // Starts render loop.


// Background 
engine.onRender.push(BackgroundRender)

// Tiles
tileSystem.GenerateTiles()
engine.onRender.push(tileSystem.RenderTiles)