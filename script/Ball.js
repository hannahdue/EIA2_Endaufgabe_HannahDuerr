"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Ball extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 10;
        }
        draw() {
            EIA2_Endaufgabe_HannahDuerr.crc2.save();
            // draw player center
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "white";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 1;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Zweiter Kreis
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, this.radius - 2.5, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "white";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 1;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Strich oben
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x, this.position.y - 10);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x, this.position.y - 2);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Linker Strich unten
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x, this.position.y);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x - 6, this.position.y + 8);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Linker Strich oben
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x, this.position.y);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x - 9, this.position.y - 3);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Rechter Strich oben
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x, this.position.y);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x + 9, this.position.y - 3);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Rechter Strich unten
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x, this.position.y - 1);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x + 6, this.position.y + 8);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Mittelpunkt
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Punkt oben
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y - 8, 1.7, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 1;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Linker Punkt oben
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x - 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 1;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Rechter Punkt oben
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x + 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 1;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Rechter Punkt unten
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x + 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 1;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            // Linker Punkt unten
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x - 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 1;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.restore();
        }
        move() {
            if (this.destination) {
                let direction = new EIA2_Endaufgabe_HannahDuerr.Vector(this.destination.x - this.position.x, this.destination.y - this.position.y);
                direction.scale(1 / 50);
                this.position.add(direction);
                this.draw();
            }
            //old move method
            /*this.position.x += 4;
            this.position.y += 2;

            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;*/
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Ball = Ball;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Ball.js.map