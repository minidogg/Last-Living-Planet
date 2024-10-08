import { engine } from "./_main.js";

export const resources = {}
class Resource {
    constructor({
        id,
        name = id,
        description = name,
        startingValue = 0,
        image = "tiles/placeholder1.png"
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.value = startingValue;
        this.image = new Image()
        this.image.src = "/assets/img/" + image
    }
}

resources["wood"] = new Resource({
    id: "wood",
    name: "Wood",
    description: "It's just wood. What did you expect?",
    startingValue: 40
})
resources["stone"] = new Resource({
    id: "stone",
    name: "Stone",
    description: "It's stone. Cavemen liked throwing this at stuff.",
    startingValue: 4
})

if(localStorage.getItem("dev")=="dev")Object.keys(resources).forEach(e=>resources[e].value = 9999)