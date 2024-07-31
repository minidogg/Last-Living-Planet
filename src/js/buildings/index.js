import fs from 'fs';
import path from 'path';

const buildingsDir = path.resolve(__dirname);

/**
 * Scans the buildings directory and dynamically imports building modules.
 * @returns {Promise<Object[]>} Array of building info objects.
 */
async function getAllBuildings() {
    const buildings = [];
    
    const directories = fs.readdirSync(buildingsDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name !== 'index.js')
        .map(dirent => dirent.name);
    
    for (const dir of directories) {
        const buildingPath = path.join(buildingsDir, dir, 'index.js');
        if (fs.existsSync(buildingPath)) {
            const { info } = await import(buildingPath);
            buildings.push(info);
        }
    }

    return buildings;
}

// Example
(async () => {
    const buildings = await getAllBuildings();
    console.log(buildings);
})();

export { getAllBuildings };
