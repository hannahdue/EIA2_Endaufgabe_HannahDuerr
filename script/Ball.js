"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Ball extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 10;
            this.startMoving = false;
            this.hitGoalA = false;
            this.hitGoalB = false;
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
            //wenn eine destination gesetzt wurde, ball dorthin bewegen
            if (this.destination) {
                let direction = new EIA2_Endaufgabe_HannahDuerr.Vector(this.destination.x - this.position.x, this.destination.y - this.position.y);
                //je weiter destination vom Ball weg ist, desto ungenauer ist der Schuss
                if (this.startMoving == true) {
                    let distance = (Math.random() - 0.5) * (0.15 * direction.length);
                    this.destination.x += distance;
                    this.destination.y += distance;
                    this.startMoving = false;
                }
                direction.scale(1 / 50);
                this.position.add(direction);
                this.checkGoals();
            }
        }
        checkGoals() {
            //check, if ball hit goals:
            if (this.position.x < 100 && this.position.y > 250 && this.position.y < 300) {
                if (this.hitGoalA == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team B");
                    let event = new CustomEvent(EIA2_Endaufgabe_HannahDuerr.SOCCER_EVENT.LEFTGOAL_HIT);
                    EIA2_Endaufgabe_HannahDuerr.crc2.canvas.dispatchEvent(event);
                    this.hitGoalA = true;
                }
            }
            if (this.position.x > 900 && this.position.y > 250 && this.position.y < 300) {
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