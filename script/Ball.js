"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Ball extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position) {
            super(_position);
            this.startMoving = false;
            this.hitGoalA = false;
            this.hitGoalB = false;
            this.radius = 10;
        }
        draw() {
            // draw ball center
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
        }
        move() {
            //wenn eine destination gesetzt wurde, ball dorthin bewegen
            if (this.destination) {
                let direction = new EIA2_Endaufgabe_HannahDuerr.Vector(this.destination.x - this.position.x, this.destination.y - this.position.y);
                let distance = 0;
                //je weiter destination vom Ball weg ist und desto schlechter der Spieler, desto ungenauer ist der Schuss
                if (this.startMoving == true) {
                    //präzision abhängig vom Spieler am Ball
                    if (EIA2_Endaufgabe_HannahDuerr.playerAtBall)
                        distance = (EIA2_Endaufgabe_HannahDuerr.playerAtBall.precision / 2) * (0.1 * direction.length);
                    //console.log("Abstand: " + direction.length + ", Präszisionswert vom Klick: " + distance);
                    //präzision abhängig von der Distanz des Klicks zum Ball
                    distance += (Math.random() - 0.5) * (0.25 * direction.length);
                    this.destination.x += distance;
                    this.destination.y += distance;
                    this.startMoving = false;
                }
                //move ball faster when shot is on very short distance
                direction.scale(1 / 50);
                if (distance < 150) {
                    this.position.add(new EIA2_Endaufgabe_HannahDuerr.Vector(direction.x * 2, direction.y * 2));
                }
                else {
                    this.position.add(direction);
                }
                // wenn der aus dem Spielfeld rausrollt, wird er automatisch zurück in die Mitte gesetzt:
                if (this.position.x < 98 || this.position.x > 902 || this.position.y < 25 || this.position.y > 525) {
                    this.destination = new EIA2_Endaufgabe_HannahDuerr.Vector(500, 275); // sonst ist Destination noch beim letzten Klick
                    this.position = new EIA2_Endaufgabe_HannahDuerr.Vector(500, 275);
                }
                // Sound Jubeln
                if (this.position.x < 180 && this.position.x > 170 || this.position.x > 820 && this.position.x < 830) {
                    EIA2_Endaufgabe_HannahDuerr.playSample(1);
                }
                this.checkGoals();
            }
        }
        checkGoals() {
            //check, if ball hit goals:
            if (this.position.x < 100 && this.position.y > 225 && this.position.y < 325) {
                if (this.hitGoalA == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team B");
                    let event = new CustomEvent(EIA2_Endaufgabe_HannahDuerr.SOCCER_EVENT.LEFTGOAL_HIT);
                    EIA2_Endaufgabe_HannahDuerr.crc2.canvas.dispatchEvent(event);
                    this.hitGoalA = true;
                }
            }
            if (this.position.x > 900 && this.position.y > 225 && this.position.y < 325) {
                if (this.hitGoalB == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team A");
                    let event = new CustomEvent(EIA2_Endaufgabe_HannahDuerr.SOCCER_EVENT.RIGHTGOAL_HIT);
                    EIA2_Endaufgabe_HannahDuerr.crc2.canvas.dispatchEvent(event);
                    this.hitGoalB = true;
                }
            }
        }
    } //class close
    EIA2_Endaufgabe_HannahDuerr.Ball = Ball;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {})); //namespace close
//# sourceMappingURL=Ball.js.map