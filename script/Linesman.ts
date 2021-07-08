namespace EIA2_Endaufgabe_HannahDuerr {
    export class Linesman extends Moveable {
        
        public radius: number = 15;

        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void { 
            // draw linesman center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "#FFFF00";
            crc2.fill();
        }

        move(): void {
            //move
            this.position.x = ball.position.x;
        }
    }
}