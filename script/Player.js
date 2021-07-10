"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Player extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position, _startPosition, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            this.radius = 15;
            this.perceptionRadius = 100;
            this.startPosition = _startPosition;
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
        }
        draw() {
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
            /*//Radius zum testen
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.perceptionRadius, 0, 2 * Math.PI, false);
            crc2.lineWidth = 1;
            crc2.strokeStyle = "#6D6D6D";
            crc2.stroke();*/
        }
        move() {
            //move
            //check if ball is in his perception radius (difference between player position and ball position smaller than perception radius)
            //1. Distanz zum Ball ausrechnen
            let vectorToBall = new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.ball.position.x - this.position.x, EIA2_Endaufgabe_HannahDuerr.ball.position.y - this.position.y); //differenzvektor
            let distanceToBall = vectorToBall.length; //länge des differenzvektors
            let vectorToStartposition = new EIA2_Endaufgabe_HannahDuerr.Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); //differenzvektor
            let distanceToStartposition = vectorToStartposition.length; //länge des differenzvektors
            //2. Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Spielers
            if (distanceToBall < this.perceptionRadius) {
                //move towards ball
                //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                //speed / direction.length = skalierungsfaktor. Speed wäre 1px --> 50px/sekunde
                let scale = 1 / distanceToBall;
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
                //if difference between ball and player is smaller than 25, animation = false
                //wenn spieler am Ball ankommt, stoppt animation
                if (distanceToBall > 24 && distanceToBall < 26) {
                    EIA2_Endaufgabe_HannahDuerr.animation = false;
                    EIA2_Endaufgabe_HannahDuerr.playerAtBall = this;
                }
            }
            else if (distanceToStartposition > 0) {
                //spieler läuft zurück zu seiner startposition
                let scale = 1 / distanceToStartposition;
                vectorToStartposition.scale(scale);
                this.position.add(vectorToStartposition);
            }
        }
        // Wenn Player geklickt wurde:
        isClicked(_clickPosition) {
            let difference = new EIA2_Endaufgabe_HannahDuerr.Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            return (difference.length < this.radius);
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Player = Player;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Player.js.map