class TestData {
    private static createSpriteArray() {
        let sprite: Array<Array<CELLSTATE>> = new Array<Array<CELLSTATE>>(8);

        for (let i = 0; i < sprite.length; i++) {
            sprite[i] = [];
            for (let j = 0; j < sprite.length; j++) {
                sprite[i][j] = CELLSTATE.DEAD;
            }
        }
        return sprite;
    }

    public static getDiagonalLineSprite() {
        let sprite = this.createSpriteArray();

        sprite[0][0] = CELLSTATE.ALIVE;
        sprite[1][1] = CELLSTATE.ALIVE;
        sprite[2][2] = CELLSTATE.ALIVE;
        sprite[3][3] = CELLSTATE.ALIVE;
        sprite[4][4] = CELLSTATE.ALIVE;
        sprite[5][5] = CELLSTATE.ALIVE;
        sprite[6][6] = CELLSTATE.ALIVE;
        sprite[7][7] = CELLSTATE.ALIVE;

        return sprite;
    }

    public static getXSprite() {
        let sprite = this.createSpriteArray();

        sprite[0][0] = CELLSTATE.ALIVE;
        sprite[1][1] = CELLSTATE.ALIVE;
        sprite[2][2] = CELLSTATE.ALIVE;
        sprite[3][3] = CELLSTATE.ALIVE;
        sprite[4][4] = CELLSTATE.ALIVE;
        sprite[5][5] = CELLSTATE.ALIVE;
        sprite[6][6] = CELLSTATE.ALIVE;
        sprite[7][7] = CELLSTATE.ALIVE;

        sprite[0][7] = CELLSTATE.ALIVE;
        sprite[1][6] = CELLSTATE.ALIVE;
        sprite[2][5] = CELLSTATE.ALIVE;
        sprite[3][4] = CELLSTATE.ALIVE;
        sprite[4][3] = CELLSTATE.ALIVE;
        sprite[5][2] = CELLSTATE.ALIVE;
        sprite[6][1] = CELLSTATE.ALIVE;
        sprite[7][0] = CELLSTATE.ALIVE;

        return sprite;
    }

    public static getMiddleSquareSprite() {
        let sprite = this.createSpriteArray();

        sprite[4][3] = CELLSTATE.ALIVE;
        sprite[3][4] = CELLSTATE.ALIVE;
        sprite[3][3] = CELLSTATE.ALIVE;
        sprite[4][4] = CELLSTATE.ALIVE;

        return sprite;
    }    
}