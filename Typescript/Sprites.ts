class Start {
    public static generateSprites(spriteAmount: number, containerId: string, spriteGeneratorFunction: (() => CELLSTATE[][])) {
        let spritesContainer = document.getElementById(containerId);

        let rowColor = Drawing.getRandomColor();
        // Create the canvas' that holds the sprites
        for (let index = 0; index < spriteAmount; index++) {
            let spriteContainer = Drawing.generateCanvas();
            spritesContainer.appendChild(spriteContainer); 
            
             // Generate the sprite     
            let sprite = spriteGeneratorFunction();

            // Draw the sprite
            Drawing.drawSprite(sprite, spriteContainer, rowColor);
        }               
    } 
}

document.addEventListener("DOMContentLoaded", function(event) { 
    let spriteSize = 8;

    Start.generateSprites(10, "just-noise-sprites-50p", () => NoiseGenerator.generateSprite(spriteSize));
    Start.generateSprites(10, "just-noise-sprites-25p", () => NoiseGenerator.generateSprite(spriteSize, 25));

    Start.generateSprites(10, "noise-with-outline-sprites-50p", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize)));
    Start.generateSprites(10, "noise-with-outline-sprites-25p", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
    Start.generateSprites(10, "noise-with-outline-sprites-10p", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 10)));

    Start.generateSprites(10, "cellular-automata-2-50p", () => CellularAutomataGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize)));
    Start.generateSprites(10, "cellular-automata-5-50p", () => CellularAutomataGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize), 5));

    Start.generateSprites(10, "cellular-automata-2-25p", () => CellularAutomataGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
    Start.generateSprites(10, "cellular-automata-5-25p", () => CellularAutomataGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5));

    Start.generateSprites(10, "cellular-automata-2-25p-outline", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
        () => CellularAutomataGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25))));
    Start.generateSprites(10, "cellular-automata-5-25p-outline", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
        () => CellularAutomataGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5)));

    let randomAliveChange = Math.floor(Math.random() * 100);
    let randomGenerations = Math.floor(Math.random() * 50);
    console.log(randomAliveChange);
    console.log(randomGenerations);
    Start.generateSprites(10, "cellular-automata-random", () => CellularAutomataGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, randomAliveChange), randomGenerations));
});