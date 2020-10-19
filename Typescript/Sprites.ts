class Start {
    public static generateSprites(spriteAmount: number, containerId: string, addShadow: boolean, spriteGeneratorFunction: (() => CELLSTATE[][])) {
        let spritesContainer = document.getElementById(containerId);
        spritesContainer.innerHTML = '';

        let rowColor = Drawing.getRandomColor();
        // Create the canvas' that holds the sprites
        for (let index = 0; index < spriteAmount; index++) {
            let spriteContainer = Drawing.generateCanvas();            
            spritesContainer.appendChild(spriteContainer); 
            
             // Generate the sprite     
            let sprite = spriteGeneratorFunction();

            // Draw the sprite
            Drawing.drawSprite(sprite, spriteContainer, addShadow, rowColor);
        }               
    } 

    public static generateAndRenderSprites() {
        let spriteSize = 8;
        let addShadow = false;

        // Just noise
        Start.generateSprites(10, "just-noise-sprites-50p", addShadow, () => NoiseGenerator.generateSprite(spriteSize));
        Start.generateSprites(10, "just-noise-sprites-25p", addShadow, () => NoiseGenerator.generateSprite(spriteSize, 25));
    
        // Noise with outline
        Start.generateSprites(10, "noise-with-outline-sprites-50p", addShadow, () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize)));
        Start.generateSprites(10, "noise-with-outline-sprites-25p", addShadow, () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
        Start.generateSprites(10, "noise-with-outline-sprites-10p", addShadow, () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 10)));
    
        // Cellular Automata 1
        Start.generateSprites(10, "cellular-automata-1-2gen-50p", addShadow, () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize)));
        Start.generateSprites(10, "cellular-automata-1-5gen-50p", addShadow, () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize), 5));
    
        Start.generateSprites(10, "cellular-automata-1-2gen-25p", addShadow, () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
        Start.generateSprites(10, "cellular-automata-1-5gen-25p", addShadow, () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5));
    
        // Cellular Automata 1 with outline
        Start.generateSprites(10, "cellular-automata-1-2gen-25p-outline", addShadow, () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
            () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25))));
        Start.generateSprites(10, "cellular-automata-1-5gen-25p-outline", addShadow, () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
            () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5)));
    
        // Cellular Automata 2
        Start.generateSprites(10, "cellular-automata-2-2gen-50p", addShadow, () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
        Start.generateSprites(10, "cellular-automata-2-5gen-50p", addShadow, () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5));
    
        Start.generateSprites(10, "cellular-automata-2-2gen-25p", addShadow, () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
        Start.generateSprites(10, "cellular-automata-2-5gen-25p", addShadow, () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5));
    
        // Cellular Automata 2 with outline
        Start.generateSprites(10, "cellular-automata-2-2gen-25p-outline", addShadow, () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
            () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25))));
        Start.generateSprites(10, "cellular-automata-2-5gen-25p-outline", addShadow, () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
            () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5)));
    
        // Random cellular automata
        let randomAliveChange = Math.floor(Math.random() * 100);
        let randomGenerations = Math.floor(Math.random() * 50);
        Start.generateSprites(10, "cellular-automata-1-random", addShadow, () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, randomAliveChange), randomGenerations));
        Start.generateSprites(10, "cellular-automata-2-random", addShadow, () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, randomAliveChange), randomGenerations));
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    Start.generateAndRenderSprites()
});