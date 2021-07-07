"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Player extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            this.radius = 15;
            this.perceptionRadius = 160;
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
            this.startPosition = _position;
        }
        draw() {
            //draw
            EIA2_Endaufgabe_HannahDuerr.crc2.save();
            //draw player center
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = this.color;
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 1;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.textBaseline = "middle";
            EIA2_Endaufgabe_HannahDuerr.crc2.textAlign = "center";
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);
            EIA2_Endaufgabe_HannahDuerr.crc2.restore();
        }
        move() {
            //move
            //check if ball is in his perception radius (difference between player position and ball position smaller than perception radius)
            //1. Distanz zum Ball ausrechnen
            let vectorToBall = new EIA2_Endaufgabe_HannahDuerr.Vector(this.position.x - EIA2_Endaufgabe_HannahDuerr.ball.position.x, this.position.y - EIA2_Endaufgabe_HannahDuerr.ball.position.y); //differenzvektor
            let distanceToBall = vectorToBall.length; //länge des differenzvektors
            //2. Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Spielers
            if (distanceToBall < this.perceptionRadius) {
                //move towards ball
                //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                //speed / direction.length = skalierungsfaktor
            }
            //if difference between ball and player is smaller than 25, animation = false
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Player = Player;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Player.js.map