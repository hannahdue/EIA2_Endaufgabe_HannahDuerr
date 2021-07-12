"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Player extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position, _startPosition, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            this.active = true;
            this.radius = 15;
            this.startPosition = _startPosition;
            //this.team = _team;
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
            //Perception radius anzeigen lassen zum testen
            /*crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.perceptionRadius, 0, 2 * Math.PI, false);
            crc2.lineWidth = 1;
            crc2.strokeStyle = "#6D6D6D";
            crc2.stroke();*/
        }
        move() {
            //move
            //check if ball is in his perception radius (difference between player position and ball position smaller than perception radius)
            //nur Spieler bewegen, die auf dem Spielfeld sind
            if (this.perceptionRadius > 0) {
                //nur aktiv bewegen, wenn er nicht gerade geschossen hat
                if (this.active == true) { //--> needed to shoot ball away from player easily, caused problems
                    //1. Distanz zum Ball ausrechnen
                    let vectorToBall = new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.ball.position.x - this.position.x, EIA2_Endaufgabe_HannahDuerr.ball.position.y - this.position.y); //differenzvektor
                    let distanceToBall = vectorToBall.length; //länge des differenzvektors
                    let vectorToStartposition = new EIA2_Endaufgabe_HannahDuerr.Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); //differenzvektor
                    let distanceToStartposition = vectorToStartposition.length; //länge des differenzvektors
                    //2. Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Spielers
                    if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {
                        //move towards ball
                        //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                        //speed / direction.length = skalierungsfaktor. Speed wäre 1px --> 50px/sekunde
                        let scale = (1 + this.speed * 0.2) / distanceToBall;
                        vectorToBall.scale(scale);
                        this.position.add(vectorToBall);
                        //if difference between ball and player is smaller than 25, animation = false
                        //wenn spieler am Ball ankommt, stoppt animation
                        if (distanceToBall > 24 && distanceToBall < 26) {
                            EIA2_Endaufgabe_HannahDuerr.animation = false;
                            EIA2_Endaufgabe_HannahDuerr.playerAtBall = this;
                            this.active = false; //damit er nicht zum Ball rennen kann, wenn er grade geschossen hat
                            setTimeout(() => {
                                this.toggleActivity();
                            }, 3000);
                        }
                    }
                    else if (distanceToStartposition > 5) {
                        //spieler läuft zurück zu seiner startposition
                        let scale = (1 + this.speed * 0.2) / distanceToStartposition;
                        vectorToStartposition.scale(scale);
                        this.position.add(vectorToStartposition);
                    }
                } //close second if condition
            } //close first if condition
        }
        // Schauen, ob Player angeklickt wurde:
        isClicked(_clickPosition) {
            let difference = new EIA2_Endaufgabe_HannahDuerr.Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            return (difference.length < this.radius);
        }
        checkState() {
            if (this.position.x < 75 || this.position.x > 925) {
                this.perceptionRadius = 0;
            }
            else if (this.startPosition.x < 75 || this.startPosition.x > 925) {
                this.perceptionRadius = 0;
            }
            else {
                this.perceptionRadius = 160;
            }
        }
        //damit er nach 3s wieder auf den Ball zugreifen kann
        toggleActivity() {
            this.active = true;
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Player = Player;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Player.js.map