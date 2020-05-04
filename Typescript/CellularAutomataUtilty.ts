class CellularAutomataUtilty {
    public static countNeighboursWithState(neighbours: CELLSTATE[], state: CELLSTATE) : number {
        let numberOfNeighboursWithState = 0;
        for (let i = 0; i < neighbours.length; i++) { 
            if(neighbours[i] == state)
                numberOfNeighboursWithState++;
        }
        return numberOfNeighboursWithState;
    }

    public static getNeighbours(sprite: CELLSTATE[][], i: number, j: number) : CELLSTATE[]{
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

    public static getDiagonalNeighbours(sprite: CELLSTATE[][], i: number, j: number) : CELLSTATE[]{
        let neighbours: CELLSTATE[] = [];

         // Add NW cell
         if(i > 0 && j > 0)
            neighbours.push (sprite[i-1][j-1]);

        // Add NE cell
        if(j > 0 && i < sprite.length-1)
            neighbours.push(sprite[i+1][j-1]);

        // Add SW cell
        if(j > 0 && i < sprite.length-1) 
            neighbours.push(sprite[i+1][j-1]);

        // Add SE cell
        if(i < sprite.length-1 && j < sprite.length-1) 
            neighbours.push(sprite[i+1][j+1]);

        return neighbours;
    }
}