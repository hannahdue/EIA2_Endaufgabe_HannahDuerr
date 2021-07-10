"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Referee extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 15;
            this.perceptionRadius = 400;
        }
        draw() {
            //draw linesman center
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "#FF6700";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "red";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
        }
        move() {
            let vectorToBall = new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.ball.position.x - this.position.x, EIA2_Endaufgabe_HannahDuerr.ball.position.y - this.position.y); //differenzvektor
            let distanceToBall = vectorToBall.length; //länge des differenzvektors
            // Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Schiedsrichters und sicherstellen, dass Schiedsrichter nicht an den Ball rankommt
            if (distanceToBall < this.perceptionRadius && distanceToBall > 100) {
                //move towards ball
                //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                //speed / direction.length = skalierungsfaktor. Speed wäre 1px --> 50px/sekunde
                let scale = 1 / distanceToBall;
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
            }
        }
    } //class close
    EIA2_Endaufgabe_HannahDuerr.Referee = Referee;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {})); //namespace close
//# sourceMappingURL=Referee.js.map