function initializeGameState() {
    return {
        entities: [],
        resources: [],
        buildings: [],
        isPaused: false,
    };
}


function updateGameState(state, deltaTime) {
    if (state.isPaused) return;
    
    state.entities.forEach(entity => {
        entity.update(deltaTime);
    });
}


function renderGameState(state, context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    
    state.entities.forEach(entity => {
        entity.render(context);
    });

}
