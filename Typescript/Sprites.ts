class Start {
    public static generateSprites(
        renderOptions: 
            { 
                spriteAmount: number, 
                spriteSize: number,                 
                addShadow: boolean,
                addGradient: boolean,
                drawAsDots: boolean
            }, 
            containerId: string,
            spriteGeneratorFunction: (() => CELLSTATE[][])) {

        let spritesContainer = document.getElementById(containerId);
        spritesContainer.innerHTML = '';

        let rowColor = Drawing.getRandomColor();
        // Create the canvas' that holds the sprites
        for (let index = 0; index < renderOptions.spriteAmount; index++) {
            let spriteContainer = Drawing.generateCanvas(renderOptions.spriteSize);            
            spritesContainer.appendChild(spriteContainer); 
            
             // Generate the sprite     
            let sprite = spriteGeneratorFunction();

            // Draw the sprite
            Drawing.drawSprite(sprite, spriteContainer, renderOptions.addShadow, renderOptions.addGradient, renderOptions.drawAsDots, renderOptions.spriteSize, rowColor);
        }               
    } 

    public static renderWithOptions() {
        let addShadowCheckbox = <HTMLInputElement> document.getElementById('add-shadow-checkbox');
        let addGradientCheckbox = <HTMLInputElement> document.getElementById('add-gradient-checkbox');
        let drawAsDotsCheckbox = <HTMLInputElement> document.getElementById('draw-as-dots-checkbox');
        Start.generateAndRenderSprites(addShadowCheckbox.checked, addGradientCheckbox.checked, drawAsDotsCheckbox.checked)
    }

    public static generateAndRenderSprites(addShadow: boolean, addGradient: boolean, drawAsDots: boolean) {
        let spriteSize = 8;
        let spriteAmount = 10
        let renderOptions = {
            spriteAmount,
            spriteSize,
            addShadow,
            addGradient,
            drawAsDots
        }

        // Just noise
        Start.generateSprites(renderOptions, "just-noise-sprites-50p", () => NoiseGenerator.generateSprite(spriteSize));
        Start.generateSprites(renderOptions, "just-noise-sprites-25p", () => NoiseGenerator.generateSprite(spriteSize, 25));
    
        // Noise with outline
        Start.generateSprites(renderOptions, "noise-with-outline-sprites-50p", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize)));
        Start.generateSprites(renderOptions, "noise-with-outline-sprites-25p", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
        Start.generateSprites(renderOptions, "noise-with-outline-sprites-10p", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 10)));
    
        // Cellular Automata 1
        Start.generateSprites(renderOptions, "cellular-automata-1-2gen-50p", () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize)));
        Start.generateSprites(renderOptions, "cellular-automata-1-5gen-50p", () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize), 5));

        Start.generateSprites(renderOptions, "cellular-automata-1-2gen-25p", () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
        Start.generateSprites(renderOptions, "cellular-automata-1-5gen-25p", () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5));
    
        // Cellular Automata 1 with outline
        Start.generateSprites(renderOptions, "cellular-automata-1-2gen-25p-outline", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
            () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25))));
        Start.generateSprites(renderOptions, "cellular-automata-1-5gen-25p-outline", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
            () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5)));
    
        // Cellular Automata 2
        Start.generateSprites(renderOptions, "cellular-automata-2-2gen-50p", () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
        Start.generateSprites(renderOptions, "cellular-automata-2-5gen-50p", () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5));
    
        Start.generateSprites(renderOptions, "cellular-automata-2-2gen-25p", () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25)));
        Start.generateSprites(renderOptions, "cellular-automata-2-5gen-25p", () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5));
    
        // Cellular Automata 2 with outline
        Start.generateSprites(renderOptions, "cellular-automata-2-2gen-25p-outline", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
            () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25))));
        Start.generateSprites(renderOptions, "cellular-automata-2-5gen-25p-outline", () => NoiseWithOutlineGenerator.generateSprite(spriteSize, 
            () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, 25), 5)));
    
        // Random cellular automata
        let randomAliveChange = Math.floor(Math.random() * 100);
        let randomGenerations = Math.floor(Math.random() * 50);
        Start.generateSprites(renderOptions, "cellular-automata-1-random", () => CellularAutomataGenerator1.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, randomAliveChange), randomGenerations));
        Start.generateSprites(renderOptions, "cellular-automata-2-random", () => CellularAutomataGenerator2.generateSprite(spriteSize, () => NoiseGenerator.generateSprite(spriteSize, randomAliveChange), randomGenerations));
    }
}

document.addEventListener("DOMContentLoaded", function(event) {   
    Start.generateAndRenderSprites(false, false, false)
});