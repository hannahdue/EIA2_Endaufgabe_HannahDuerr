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
    class Referee extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 14;
            this.perceptionRadius = 400;
        }
        draw() {
            //draw linesman center
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "white";
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2.5;
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            //draw stripes
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x - 13, this.position.y + 6);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x + 13, this.position.y - 6);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x - 9, this.position.y + 12);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x + 15, this.position.y + 1);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x - 15, this.position.y - 1);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x + 10, this.position.y - 12);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x - 12, this.position.y - 8);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x - 1, this.position.y + 14);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x - 6.5, this.position.y - 14);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x + 7, this.position.y + 13);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(this.position.x + 2, this.position.y - 14);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(this.position.x + 13, this.position.y + 9);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
        }
        move() {
            //always run behind the ball but keep a certain distance
            let vectorToBall = new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.ball.position.x - this.position.x, EIA2_Endaufgabe_HannahDuerr.ball.position.y - this.position.y); //differenzvektor
            let distanceToBall = vectorToBall.length;
            //check distance between ball and referee and don't let him run to close to it
            if (distanceToBall < this.perceptionRadius && distanceToBall > 100) {
                //move towards ball evenly just like player
                let scale = 1 / distanceToBall;
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
            }
        }
    } //class close
    EIA2_Endaufgabe_HannahDuerr.Referee = Referee;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {})); //namespace close
//# sourceMappingURL=Referee.js.map