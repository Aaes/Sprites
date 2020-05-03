class NoiseWithOutlineGenerator {
    public static generateSprite(spriteSize: number, spriteGenerator:((spritesize: number) => CELLSTATE[][])): CELLSTATE[][] {
        let sprite = spriteGenerator(spriteSize);

        for (let i = 0; i < spriteSize; i++) {
            for (let j = 0; j < spriteSize; j++) {
                // check if cell have alive neighbours (not diagonal)

                if(sprite[i][j] == CELLSTATE.ALIVE)
                    continue;

                // Check left cell
                if(i > 0 && sprite[i-1][j] == CELLSTATE.ALIVE) {
                    sprite[i][j] = CELLSTATE.OUTLINE;
                    continue;
                }

                // Check right cell
                if(i < spriteSize-1 && sprite[i+1][j] == CELLSTATE.ALIVE) {
                    sprite[i][j] = CELLSTATE.OUTLINE;
                    continue;
                }

                // Check top cell
                if(j > 0 && sprite[i][j-1] == CELLSTATE.ALIVE) {
                    sprite[i][j] = CELLSTATE.OUTLINE;
                    continue;
                }

                // Check down cell
                if(j < spriteSize-1 && sprite[i][j+1] == CELLSTATE.ALIVE) {
                    sprite[i][j] = CELLSTATE.OUTLINE;
                    continue;
                }
            }
        }
        return sprite;
    }
}