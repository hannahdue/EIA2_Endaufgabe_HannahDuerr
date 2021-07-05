namespace EIA2_Endaufgabe_HannahDuerr {
    export class Referee extends Moveable {
        
        public position: Vector;
        public radius: number;

        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
           //draw
           crc2.save();

           // draw linesman center
           crc2.beginPath();
           crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
           crc2.closePath();
           crc2.fillStyle = "#FFFF00";
           crc2.fill();
           crc2.lineWidth = 1;
           crc2.strokeStyle = "black";
           crc2.stroke();

           crc2.restore();
        }

        move(): void {
            //move
        }

    }
}