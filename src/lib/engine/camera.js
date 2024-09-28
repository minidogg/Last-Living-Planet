export function handleInput() {
    if(this.inUI == true|| this.inMenu==true) return;

    // Normalize the keysPressed keys to lowercase
    const normalizedKeys = Object.keys(this.keysPressed).reduce((acc, key) => {
        acc[key.toLowerCase()] = this.keysPressed[key];
        return acc;
    }, {});

    if (normalizedKeys['w']) {
        this.camY += this.camMoveSpeed;
    }
    if (normalizedKeys['s']) {
        this.camY -= this.camMoveSpeed;
    }
    if (normalizedKeys['a']) {
        this.camX += this.camMoveSpeed;
    }
    if (normalizedKeys['d']) {
        this.camX -= this.camMoveSpeed;
    }
}
