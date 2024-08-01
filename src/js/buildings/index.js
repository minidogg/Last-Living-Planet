// TODO: Change this to implement the TileType class from tiles.js that house/index.js and all future tiles will use.

/**
 * Scans the buildings directory and dynamically imports building modules.
 * @returns {Promise<Object[]>} Array of building info objects.
 */
async function getAllBuildings() {
    const buildings = [
        "house",
    ].map(folderName=>`./${folderName}/index.js`)

    for(let i = 0;i<buildings.length;i++){
        buildings[i] = await import(buildings[i])
    }
    

    return buildings;
}

// Example
(async () => {
    const buildings = await getAllBuildings();
    console.log(buildings);
})();

export const buildings = getAllBuildings()
export { getAllBuildings };
