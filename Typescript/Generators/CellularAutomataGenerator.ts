class CellularAutomataGenerator {
    public static generateSprite(spriteSize: number, spriteGenerator:((spritesize: number) => CELLSTATE[][]), generations: number = 2): CELLSTATE[][] {
        let sprite = spriteGenerator(spriteSize);

        for (let g = 0; g < generations; g++) { 
            for (let i = 0; i < sprite.length; i++) {   
                for (let j = 0; j < sprite.length; j++) {   
                    let neighbours = this.getNeighbours(sprite, i, j); 
                    let liveNeighbours = this.countNeighboursWithState(neighbours, CELLSTATE.ALIVE); 

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

    private static countNeighboursWithState(neighbours: CELLSTATE[], state: CELLSTATE) : number {
        let numberOfNeighboursWithState = 0;
        for (let i = 0; i < neighbours.length; i++) { 
            if(neighbours[i] == state)
                numberOfNeighboursWithState++;
        }
        return numberOfNeighboursWithState;
    }

    private static getNeighbours(sprite: CELLSTATE[][], i: number, j: number) : CELLSTATE[]{
        let neighbours: CELLSTATE[] = [];

         // Add left cell
         if(i > 0)
            neighbours.push (sprite[i-1][j]);

        // Add right cell
        if(i < sprite.length-1)
            neighbours.push(sprite[i+1][j]);

        // Add top cell
        if(j > 0) 
            neighbours.push(sprite[i][j-1]);

        // Add down cell
        if(j < sprite.length-1) 
            neighbours.push(sprite[i][j+1]);

        return neighbours;
    }
}