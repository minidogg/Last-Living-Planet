import { TileType } from "../../tiletype.js"
// TODO: Switch this to use the TileType class from tiles.js

export const tile = new TileType({
    id: "house",
    name: "Basic House",
    description: "Just a basic 4 people house. Nothing fancy.",
    category: "housing"
})

export default tile;