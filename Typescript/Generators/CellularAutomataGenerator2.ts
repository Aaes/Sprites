class CellularAutomataGenerator2 {
    public static generateSprite(spriteSize: number, spriteGenerator:((spritesize: number) => CELLSTATE[][]), generations: number = 2): CELLSTATE[][] {
        let sprite = spriteGenerator(spriteSize);

        for (let g = 0; g < generations; g++) { 
            for (let i = 0; i < sprite.length; i++) {   
                for (let j = 0; j < sprite.length; j++) {   
                    let neighbours = CellularAutomataUtilty.getNeighbours(sprite, i, j); 
                    let liveNeighbours = CellularAutomataUtilty.countNeighboursWithState(neighbours, CELLSTATE.ALIVE); 

                    let diagonalNeighbours = CellularAutomataUtilty.getDiagonalNeighbours(sprite, i, j);
                    let liveDiagonalNeighbours = CellularAutomataUtilty.countNeighboursWithState(diagonalNeighbours, CELLSTATE.ALIVE); 

                    // Any live cell with two or three diagonal neighbour survives.
                    if(sprite[i][j] == CELLSTATE.ALIVE && (liveDiagonalNeighbours == 2 || liveDiagonalNeighbours == 3))
                        continue;

                    // Any dead cell with diagonal live neighbors becomes a live cell.
                    if(sprite[i][j] == CELLSTATE.DEAD && liveDiagonalNeighbours > 0) {
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