"use strict";
/*
Endaufgabe: Fußball Trainings Simulation
Name: Hannah Dürr
Matrikel: 263217
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Mona Stingl entstanden
*/
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Linesman extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 14;
        }
        draw() {
            //draw linesman center
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "#FFFF00"; // gelb
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            //pattern
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x + 9, this.position.y, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x - 9, this.position.y, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y + 9, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y - 9, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x + 5, this.position.y - 5, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x - 5, this.position.y + 5, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x - 4.5, this.position.y - 4.5, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x + 4.5, this.position.y + 4.5, 2, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
        }
        move() {
            //move
            this.position.x = EIA2_Endaufgabe_HannahDuerr.ball.position.x;
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Linesman = Linesman;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Linesman.js.map