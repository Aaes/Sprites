class Drawing {
    public static drawSprite(sprite: Array<Array<CELLSTATE>>, canvas: HTMLCanvasElement, addShadow: boolean, color?: string): void {
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
                    Drawing.drawNormalSquare(ctx, i, j, aliveColor, aliveColorTop, aliveColorLeft, addShadow)
                }
                if(sprite[i][j] == CELLSTATE.OUTLINE) {
                    Drawing.drawOutlineSquare(ctx, i, j, outlineColor, outlineColorTop, outlineColorLeft)
                }
            }
        }
    }

    public static drawNormalSquare( 
        ctx: CanvasRenderingContext2D, 
        i: number, 
        j: number, 
        aliveColor: string,
        aliveColorTop: string,
        aliveColorLeft: string,
        addShadow: boolean){
        ctx.fillStyle = aliveColor;

        // Fill color
        ctx.fillRect(i*8, j*8, 8, 8); 

        // Fill top
        ctx.fillStyle = aliveColorTop;
        ctx.beginPath();
        ctx.moveTo(i*8, j*8);
        ctx.lineTo(i*8+1, j*8+2);
        ctx.lineTo(i*8+6, j*8+2);
        ctx.lineTo(i*8+8, j*8);
        ctx.closePath();
        ctx.fill();

        // Fill left
        ctx.fillStyle = aliveColorLeft;
        ctx.beginPath();
        ctx.moveTo(i*8, j*8);
        ctx.lineTo(i*8+2, j*8+1);
        ctx.lineTo(i*8+2, j*8+6);
        ctx.lineTo(i*8, j*8+8);
        ctx.closePath();
        ctx.fill();

        if(addShadow) {
            // Fill shadow top        
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.moveTo(i*8, j*8);
            ctx.lineTo(i*8-3, j*8-2);
            ctx.lineTo(i*8+5, j*8-2);
            ctx.lineTo(i*8+8, j*8);
            ctx.closePath();
            ctx.fill();        

            // Fill shadow left        
            ctx.fillStyle = '#666666';
            ctx.beginPath();
            ctx.moveTo(i*8, j*8);
            ctx.lineTo(i*8-3, j*8-2);
            ctx.lineTo(i*8-3, j*8+6);
            ctx.lineTo(i*8, j*8+8);
            ctx.closePath();
            ctx.fill();
        }
    }

    public static drawOutlineSquare(
        ctx: CanvasRenderingContext2D, 
        i: number, 
        j: number, 
        outlineColor: string, 
        outlineColorTop: string, 
        outlineColorLeft: string) {

        ctx.fillStyle = outlineColor;
        // Fill color
        ctx.fillRect(i*8, j*8, 8, 8); 

        // Fill top        
        ctx.fillStyle = outlineColorTop;
        ctx.beginPath();
        ctx.moveTo(i*8, j*8);
        ctx.lineTo(i*8+1, j*8+2);
        ctx.lineTo(i*8+6, j*8+2);
        ctx.lineTo(i*8+8, j*8);
        ctx.closePath();
        ctx.fill();

        // Fill left
        ctx.fillStyle = outlineColorLeft;
        ctx.beginPath();
        ctx.moveTo(i*8, j*8);
        ctx.lineTo(i*8+2, j*8+1);
        ctx.lineTo(i*8+2, j*8+6);
        ctx.lineTo(i*8, j*8+8);
        ctx.closePath();
        ctx.fill();
    }

    public static generateCanvas(): HTMLCanvasElement {
        let spriteContainer = document.createElement("canvas");
        spriteContainer.classList.add("sprite");
        spriteContainer.width = 64;
        spriteContainer.height = 64;
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