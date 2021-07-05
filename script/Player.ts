namespace EIA2_Endaufgabe_HannahDuerr {
    export class Player extends Moveable {

        public position: Vector;
        public radius: number = 15;
        team: string;
        color: string;
        speed: number;
        precision: number;
        jerseyNumber: number;


        constructor(_position: Vector, _team: string, _color: string, _speed: number, _precision: number, _jerseyNumber: number) {
            super(_position);
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
        }

        draw(): void {
            //draw
            crc2.save();

            //draw player center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            crc2.textBaseline = "middle";
            crc2.textAlign = "center";
            crc2.fillStyle = "black";
            crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);

            crc2.restore();
        }

        move(): void {
            //move
        }
    }
}