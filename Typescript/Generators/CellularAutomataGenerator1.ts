class CellularAutomataGenerator1 {
    public static generateSprite(spriteSize: number, spriteGenerator:((spritesize: number) => CELLSTATE[][]), generations: number = 2): CELLSTATE[][] {
        let sprite = spriteGenerator(spriteSize);

        for (let g = 0; g < generations; g++) { 
            for (let i = 0; i < sprite.length; i++) {   
                for (let j = 0; j < sprite.length; j++) {   
                    let neighbours = CellularAutomataUtilty.getNeighbours(sprite, i, j); 
                    let liveNeighbours = CellularAutomataUtilty.countNeighboursWithState(neighbours, CELLSTATE.ALIVE); 

                    // Any live cell with two or three neighbors survives.
                    if(sprite[i][j] == CELLSTATE.ALIVE && (neighbours.length == 2 || neighbours.length == 3))
                        continue;

                    // Any dead cell with one or less live neighbors becomes a live cell.
                    if(sprite[i][j] == CELLSTATE.DEAD && liveNeighbours < 2) {
                        sprite[i][j] = CELLSTATE.ALIVE;
                        continue;
                    }

                    // All other live cells die in the next generation. Similarly, all other dead cells stay dead.
                    if(sprite[i][j] == CELLSTATE.ALIVE)
                        sprite[i][j] = CELLSTATE.DEAD;
                } 
            }
        }

        return sprite;
    }
}