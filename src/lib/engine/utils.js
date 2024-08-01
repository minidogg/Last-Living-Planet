export function LoadSprite(url, key = undefined) {
    let image = new Image();
    image.src = url;

    image.onload = () => {
        console.log(`Image from URL: "${url}" finished loading.`);
    };

    if (key != undefined) this.sprite[key] = image;
    return image;
}
