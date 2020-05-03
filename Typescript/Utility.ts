class Utility {
    public static printSprite(sprite: Array<Array<CELLSTATE>>): void {        
        for (let i = 0; i < sprite.length; i++) {
            let printString = "";

            for (let j = 0; j < sprite.length; j++) {
                printString += " " + this.getSpriteLetter(sprite[j][i]) + " ";
            }
            console.log(printString);
        }            
        console.log('=======================');
    }

    private static getSpriteLetter(state: CELLSTATE) {
        switch (state) {
            case CELLSTATE.ALIVE:   return "A";
            case CELLSTATE.DEAD:    return "-";
            case CELLSTATE.OUTLINE: return "O";      
        }
    }
}