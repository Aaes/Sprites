class NoiseGenerator {
    public static generateSprite(spriteSize: number, chanceForAliveCell: number = 50): CELLSTATE[][] {
        // Generate spriteSize/2*spriteSize grid of noise
        let halfSprite: Array<Array<CELLSTATE>> = new Array<Array<CELLSTATE>>(spriteSize/2);
        
        for (let i = 0; i < halfSprite.length; i++) {
            halfSprite[i] = [];
            for (let j = 0; j < spriteSize; j++) {
                halfSprite[i][j] = Math.floor(Math.random() * 100) > (100 - chanceForAliveCell-1) ? CELLSTATE.ALIVE : CELLSTATE.DEAD; 
            }            
        }

        // Mirror the output to create an spriteSize*spriteSize grid
        let sprite: Array<Array<CELLSTATE>> = new Array<Array<CELLSTATE>>(spriteSize);

        // Copy the half sprite
        for (let i = 0; i < halfSprite.length; i++) {
            sprite[i] = halfSprite[i];                    
        }

        // Add the mirror
        for (let i = 0; i < halfSprite.length; i++) {
            sprite[sprite.length-i-1] = halfSprite[i];                    
        }
        return sprite;
    }
}