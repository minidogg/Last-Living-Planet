// Imports
import { LivingEngine } from '../lib/engine.js'

// Constant Elements
const canvas = document.getElementById("gameCanvas")

// Code
const engine = new LivingEngine(canvas)
engine.Render() // Starts render loop.