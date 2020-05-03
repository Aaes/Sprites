var Drawing = (function () {
    function Drawing() {
    }
    Drawing.drawSprite = function (sprite, canvas, color) {
        var ctx = canvas.getContext("2d");
        var aliveColor;
        if (color) {
            aliveColor = color;
        }
        else {
            aliveColor = Drawing.getRandomColor();
        }
        var outlineColor = this.adjust(aliveColor, -70);
        var outlineColorTop = this.adjust(outlineColor, -50);
        var outlineColorLeft = this.adjust(outlineColor, -30);
        var aliveColorTop = this.adjust(aliveColor, -50);
        var aliveColorLeft = this.adjust(aliveColor, -30);
        for (var i = 0; i < sprite.length; i++) {
            for (var j = 0; j < sprite.length; j++) {
                if (sprite[i][j] == CELLSTATE.ALIVE) {
                    ctx.fillStyle = aliveColor;
                    ctx.fillRect(i * 8, j * 8, 8, 8);
                    ctx.fillStyle = aliveColorTop;
                    ctx.beginPath();
                    ctx.moveTo(i * 8, j * 8);
                    ctx.lineTo(i * 8 + 1, j * 8 + 2);
                    ctx.lineTo(i * 8 + 6, j * 8 + 2);
                    ctx.lineTo(i * 8 + 8, j * 8);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = aliveColorLeft;
                    ctx.beginPath();
                    ctx.moveTo(i * 8, j * 8);
                    ctx.lineTo(i * 8 + 2, j * 8 + 1);
                    ctx.lineTo(i * 8 + 2, j * 8 + 6);
                    ctx.lineTo(i * 8, j * 8 + 8);
                    ctx.closePath();
                    ctx.fill();
                }
                if (sprite[i][j] == CELLSTATE.OUTLINE) {
                    ctx.fillStyle = outlineColor;
                    ctx.fillRect(i * 8, j * 8, 8, 8);
                    ctx.fillStyle = outlineColorTop;
                    ctx.beginPath();
                    ctx.moveTo(i * 8, j * 8);
                    ctx.lineTo(i * 8 + 1, j * 8 + 2);
                    ctx.lineTo(i * 8 + 6, j * 8 + 2);
                    ctx.lineTo(i * 8 + 8, j * 8);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = outlineColorLeft;
                    ctx.beginPath();
                    ctx.moveTo(i * 8, j * 8);
                    ctx.lineTo(i * 8 + 2, j * 8 + 1);
                    ctx.lineTo(i * 8 + 2, j * 8 + 6);
                    ctx.lineTo(i * 8, j * 8 + 8);
                    ctx.closePath();
                    ctx.fill();
                }
            }
        }
    };
    Drawing.generateCanvas = function () {
        var spriteContainer = document.createElement("canvas");
        spriteContainer.classList.add("sprite");
        spriteContainer.width = 64;
        spriteContainer.height = 64;
        return spriteContainer;
    };
    Drawing.getRandomColor = function () {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    };
    Drawing.adjust = function (color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, function (color) { return ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2); });
    };
    return Drawing;
}());
var Start = (function () {
    function Start() {
    }
    Start.generateSprites = function (spriteAmount, containerId, spriteGeneratorFunction) {
        var spritesContainer = document.getElementById(containerId);
        var rowColor = Drawing.getRandomColor();
        for (var index = 0; index < spriteAmount; index++) {
            var spriteContainer = Drawing.generateCanvas();
            spritesContainer.appendChild(spriteContainer);
            var sprite = spriteGeneratorFunction();
            Drawing.drawSprite(sprite, spriteContainer, rowColor);
        }
    };
    return Start;
}());
document.addEventListener("DOMContentLoaded", function (event) {
    var spriteSize = 8;
    Start.generateSprites(10, "just-noise-sprites-50p", function () { return NoiseGenerator.generateSprite(spriteSize); });
    Start.generateSprites(10, "just-noise-sprites-25p", function () { return NoiseGenerator.generateSprite(spriteSize, 25); });
    Start.generateSprites(10, "noise-with-outline-sprites-50p", function () { return NoiseWithOutlineGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize); }); });
    Start.generateSprites(10, "noise-with-outline-sprites-25p", function () { return NoiseWithOutlineGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize, 25); }); });
    Start.generateSprites(10, "noise-with-outline-sprites-10p", function () { return NoiseWithOutlineGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize, 10); }); });
    Start.generateSprites(10, "cellular-automata-2-50p", function () { return CellularAutomataGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize); }); });
    Start.generateSprites(10, "cellular-automata-5-50p", function () { return CellularAutomataGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize); }, 5); });
    Start.generateSprites(10, "cellular-automata-2-25p", function () { return CellularAutomataGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize, 25); }); });
    Start.generateSprites(10, "cellular-automata-5-25p", function () { return CellularAutomataGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize, 25); }, 5); });
    Start.generateSprites(10, "cellular-automata-2-25p-outline", function () { return NoiseWithOutlineGenerator.generateSprite(spriteSize, function () { return CellularAutomataGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize, 25); }); }); });
    Start.generateSprites(10, "cellular-automata-5-25p-outline", function () { return NoiseWithOutlineGenerator.generateSprite(spriteSize, function () { return CellularAutomataGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize, 25); }, 5); }); });
    var randomAliveChange = Math.floor(Math.random() * 100);
    var randomGenerations = Math.floor(Math.random() * 50);
    console.log(randomAliveChange);
    console.log(randomGenerations);
    Start.generateSprites(10, "cellular-automata-random", function () { return CellularAutomataGenerator.generateSprite(spriteSize, function () { return NoiseGenerator.generateSprite(spriteSize, randomAliveChange); }, randomGenerations); });
});
var Utility = (function () {
    function Utility() {
    }
    Utility.printSprite = function (sprite) {
        for (var i = 0; i < sprite.length; i++) {
            var printString = "";
            for (var j = 0; j < sprite.length; j++) {
                printString += " " + this.getSpriteLetter(sprite[j][i]) + " ";
            }
            console.log(printString);
        }
        console.log('=======================');
    };
    Utility.getSpriteLetter = function (state) {
        switch (state) {
            case CELLSTATE.ALIVE: return "A";
            case CELLSTATE.DEAD: return "-";
            case CELLSTATE.OUTLINE: return "O";
        }
    };
    return Utility;
}());
var CellularAutomataGenerator = (function () {
    function CellularAutomataGenerator() {
    }
    CellularAutomataGenerator.generateSprite = function (spriteSize, spriteGenerator, generations) {
        if (generations === void 0) { generations = 2; }
        var sprite = spriteGenerator(spriteSize);
        for (var g = 0; g < generations; g++) {
            for (var i = 0; i < sprite.length; i++) {
                for (var j = 0; j < sprite.length; j++) {
                    var neighbours = this.getNeighbours(sprite, i, j);
                    var liveNeighbours = this.countNeighboursWithState(neighbours, CELLSTATE.ALIVE);
                    if (sprite[i][j] == CELLSTATE.ALIVE && (neighbours.length == 2 || neighbours.length == 3))
                        continue;
                    if (sprite[i][j] == CELLSTATE.DEAD && liveNeighbours < 2) {
                        sprite[i][j] = CELLSTATE.ALIVE;
                        continue;
                    }
                    if (sprite[i][j] == CELLSTATE.ALIVE)
                        sprite[i][j] = CELLSTATE.DEAD;
                }
            }
        }
        return sprite;
    };
    CellularAutomataGenerator.countNeighboursWithState = function (neighbours, state) {
        var numberOfNeighboursWithState = 0;
        for (var i = 0; i < neighbours.length; i++) {
            if (neighbours[i] == state)
                numberOfNeighboursWithState++;
        }
        return numberOfNeighboursWithState;
    };
    CellularAutomataGenerator.getNeighbours = function (sprite, i, j) {
        var neighbours = [];
        if (i > 0)
            neighbours.push(sprite[i - 1][j]);
        if (i < sprite.length - 1)
            neighbours.push(sprite[i + 1][j]);
        if (j > 0)
            neighbours.push(sprite[i][j - 1]);
        if (j < sprite.length - 1)
            neighbours.push(sprite[i][j + 1]);
        return neighbours;
    };
    return CellularAutomataGenerator;
}());
var NoiseGenerator = (function () {
    function NoiseGenerator() {
    }
    NoiseGenerator.generateSprite = function (spriteSize, chanceForAliveCell) {
        if (chanceForAliveCell === void 0) { chanceForAliveCell = 50; }
        var halfSprite = new Array(spriteSize / 2);
        for (var i = 0; i < halfSprite.length; i++) {
            halfSprite[i] = [];
            for (var j = 0; j < spriteSize; j++) {
                halfSprite[i][j] = Math.floor(Math.random() * 100) > (100 - chanceForAliveCell - 1) ? CELLSTATE.ALIVE : CELLSTATE.DEAD;
            }
        }
        var sprite = new Array(8);
        for (var i = 0; i < halfSprite.length; i++) {
            sprite[i] = halfSprite[i];
        }
        for (var i = 0; i < halfSprite.length; i++) {
            sprite[sprite.length - i - 1] = halfSprite[i];
        }
        return sprite;
    };
    return NoiseGenerator;
}());
var NoiseWithOutlineGenerator = (function () {
    function NoiseWithOutlineGenerator() {
    }
    NoiseWithOutlineGenerator.generateSprite = function (spriteSize, spriteGenerator) {
        var sprite = spriteGenerator(spriteSize);
        for (var i = 0; i < spriteSize; i++) {
            for (var j = 0; j < spriteSize; j++) {
                if (sprite[i][j] == CELLSTATE.ALIVE)
                    continue;
                if (i > 0 && sprite[i - 1][j] == CELLSTATE.ALIVE) {
                    sprite[i][j] = CELLSTATE.OUTLINE;
                    continue;
                }
                if (i < spriteSize - 1 && sprite[i + 1][j] == CELLSTATE.ALIVE) {
                    sprite[i][j] = CELLSTATE.OUTLINE;
                    continue;
                }
                if (j > 0 && sprite[i][j - 1] == CELLSTATE.ALIVE) {
                    sprite[i][j] = CELLSTATE.OUTLINE;
                    continue;
                }
                if (j < spriteSize - 1 && sprite[i][j + 1] == CELLSTATE.ALIVE) {
                    sprite[i][j] = CELLSTATE.OUTLINE;
                    continue;
                }
            }
        }
        return sprite;
    };
    return NoiseWithOutlineGenerator;
}());
var TestData = (function () {
    function TestData() {
    }
    TestData.createSpriteArray = function () {
        var sprite = new Array(8);
        for (var i = 0; i < sprite.length; i++) {
            sprite[i] = [];
            for (var j = 0; j < sprite.length; j++) {
                sprite[i][j] = CELLSTATE.DEAD;
            }
        }
        return sprite;
    };
    TestData.getDiagonalLineSprite = function () {
        var sprite = this.createSpriteArray();
        sprite[0][0] = CELLSTATE.ALIVE;
        sprite[1][1] = CELLSTATE.ALIVE;
        sprite[2][2] = CELLSTATE.ALIVE;
        sprite[3][3] = CELLSTATE.ALIVE;
        sprite[4][4] = CELLSTATE.ALIVE;
        sprite[5][5] = CELLSTATE.ALIVE;
        sprite[6][6] = CELLSTATE.ALIVE;
        sprite[7][7] = CELLSTATE.ALIVE;
        return sprite;
    };
    TestData.getXSprite = function () {
        var sprite = this.createSpriteArray();
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
    };
    TestData.getMiddleSquareSprite = function () {
        var sprite = this.createSpriteArray();
        sprite[4][3] = CELLSTATE.ALIVE;
        sprite[3][4] = CELLSTATE.ALIVE;
        sprite[3][3] = CELLSTATE.ALIVE;
        sprite[4][4] = CELLSTATE.ALIVE;
        return sprite;
    };
    return TestData;
}());
var CELLSTATE;
(function (CELLSTATE) {
    CELLSTATE[CELLSTATE["ALIVE"] = 0] = "ALIVE";
    CELLSTATE[CELLSTATE["DEAD"] = 1] = "DEAD";
    CELLSTATE[CELLSTATE["OUTLINE"] = 2] = "OUTLINE";
})(CELLSTATE || (CELLSTATE = {}));
//# sourceMappingURL=sprites.js.map