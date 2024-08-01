export class TileTypeCategory {
    constructor({
        id,
        name = id,
        image = "tiles/placeholder1.png",
        visible = true
    }) {
        this.id = id;
        this.name = name;
        this.image = new Image(20, 20)
        this.image.src = `../assets/img/${image}`;
        this.visible = visible;

        this.tiles = []
    }
}
export const TileTypeCategories = [
    new TileTypeCategory({
        id: "none",
        name: "None",
        visible: false
    }),
    new TileTypeCategory({
        id: "housing",
        name: "Housing",
        visible: true,
        image: "category/housing.png"
    }),
]

export class TileType {
    constructor({
        id,
        name = id,
        description = name,
        category = "none",
        tickFunc = undefined
    }) {
        this.id = id;
        this.name = name;
        this.description = description;

        this.tickFunc = tickFunc;

        this.category = TileTypeCategories.find(e => e.id == category)
        this.category.tiles.push(this)
    }
}