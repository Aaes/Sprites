class Drawing {
    public static drawSprite(
        sprite: Array<Array<CELLSTATE>>, 
        canvas: HTMLCanvasElement, 
        addShadow: boolean, 
        addGradient: boolean,
        spriteSize: number, 
        color?: string): void {
        
        let ctx = canvas.getContext("2d");
        let aliveColor: string;       

        if(color) {
            aliveColor = color;
        }
        else {
            aliveColor = Drawing.getRandomColor();
        }

        let outlineColor = this.adjust(aliveColor, -70);
        let outlineColorTop = this.adjust(outlineColor, -50);
        let outlineColorLeft = this.adjust(outlineColor, -30);

        let aliveColorTop = this.adjust(aliveColor, -50);
        let aliveColorLeft = this.adjust(aliveColor, -30);

        for (let i = 0; i < sprite.length; i++) {
            for (let j = 0; j < sprite.length; j++) {
                if(sprite[i][j] == CELLSTATE.ALIVE) {
                    Drawing.drawNormalSquare(ctx, i, j, spriteSize, aliveColor, aliveColorTop, aliveColorLeft, addShadow, addGradient)
                }
                if(sprite[i][j] == CELLSTATE.OUTLINE) {
                    Drawing.drawOutlineSquare(ctx, i, j, spriteSize, outlineColor, outlineColorTop, outlineColorLeft, addGradient)
                }
            }
        }
    }

    public static drawNormalSquare( 
        ctx: CanvasRenderingContext2D, 
        i: number, 
        j: number, 
        spriteSize: number,
        aliveColor: string,
        aliveColorTop: string,
        aliveColorLeft: string,
        addShadow: boolean,
        addGradient: boolean){

        if(addGradient)
            ctx.fillStyle = this.adjust(aliveColor, i*-20);
        else  
            ctx.fillStyle = aliveColor;

        let inset = spriteSize * 0.2

        // Fill color
        ctx.fillRect(i*spriteSize, j*spriteSize, spriteSize, spriteSize); 

        // Fill top
        ctx.fillStyle = aliveColorTop;
        ctx.beginPath();
        ctx.moveTo(i*spriteSize, j*spriteSize);
        ctx.lineTo(i*spriteSize+(inset/2), j*spriteSize+inset);
        ctx.lineTo(i*spriteSize+(spriteSize-inset), j*spriteSize+inset);
        ctx.lineTo(i*spriteSize+spriteSize, j*spriteSize);
        ctx.closePath();
        ctx.fill();

        // Fill left
        ctx.fillStyle = aliveColorLeft;
        ctx.beginPath();
        ctx.moveTo(i*spriteSize, j*spriteSize);
        ctx.lineTo(i*spriteSize+inset, j*spriteSize+(inset/2));
        ctx.lineTo(i*spriteSize+inset, j*spriteSize+(spriteSize-inset));
        ctx.lineTo(i*spriteSize, j*spriteSize+spriteSize);
        ctx.closePath();
        ctx.fill();

        if(addShadow) {
            // Fill shadow top        
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.moveTo(i*spriteSize, j*spriteSize);
            ctx.lineTo(i*spriteSize-inset, j*spriteSize-inset);
            ctx.lineTo(i*spriteSize+(spriteSize-inset), j*spriteSize-inset);
            ctx.lineTo(i*spriteSize+spriteSize, j*spriteSize);
            ctx.closePath();
            ctx.fill();        

            // Fill shadow left        
            ctx.fillStyle = '#666666';
            ctx.beginPath();
            ctx.moveTo(i*spriteSize, j*spriteSize);
            ctx.lineTo(i*spriteSize-inset, j*spriteSize-inset);
            ctx.lineTo(i*spriteSize-inset, j*spriteSize+(spriteSize-inset));
            ctx.lineTo(i*spriteSize, j*spriteSize+spriteSize);
            ctx.closePath();
            ctx.fill();
        }
    }

    public static drawOutlineSquare(
        ctx: CanvasRenderingContext2D, 
        i: number, 
        j: number, 
        spriteSize: number,
        outlineColor: string, 
        outlineColorTop: string, 
        outlineColorLeft: string,
        addGradient: boolean) {

        let inset = spriteSize * 0.2
        if(addGradient)        
            ctx.fillStyle = this.adjust(outlineColor, i*-20);
        else 
            ctx.fillStyle = outlineColor;

        // Fill color
        ctx.fillRect(i*spriteSize, j*spriteSize, spriteSize, spriteSize); 

        // Fill top        
        ctx.fillStyle = outlineColorTop;
        ctx.beginPath();
        ctx.moveTo(i*spriteSize, j*spriteSize);
        ctx.lineTo(i*spriteSize+(inset/2), j*spriteSize+inset);
        ctx.lineTo(i*spriteSize+(spriteSize-inset), j*spriteSize+inset);
        ctx.lineTo(i*spriteSize+spriteSize, j*spriteSize);
        ctx.closePath();
        ctx.fill();

        // Fill left
        ctx.fillStyle = outlineColorLeft;
        ctx.beginPath();
        ctx.moveTo(i*spriteSize, j*spriteSize);
        ctx.lineTo(i*spriteSize+inset, j*spriteSize+(inset/2));
        ctx.lineTo(i*spriteSize+inset, j*spriteSize+(spriteSize-inset));
        ctx.lineTo(i*spriteSize, j*spriteSize+spriteSize);
        ctx.closePath();
        ctx.fill();
    }

    public static generateCanvas(spriteSize: number): HTMLCanvasElement {
        let spriteContainer = document.createElement("canvas");
        spriteContainer.classList.add("sprite");
        spriteContainer.width = spriteSize*spriteSize;
        spriteContainer.height = spriteSize*spriteSize;
        return spriteContainer;
    }

    public static getRandomColor(): string {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

    // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    private static adjust(color: string, amount: number) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }
}