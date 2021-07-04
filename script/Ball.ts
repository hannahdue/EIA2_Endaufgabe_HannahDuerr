namespace EIA2_Endaufgabe_HannahDuerr {
    export class Ball extends Moveable {

        public radius: number = 10;

        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            //draw
            crc2.save();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.restore();
        }

        move(): void {
            //move
            this.position.x += 4;
            this.position.y += 2;

            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }
    }
}