"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Player extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position, _startPosition, _team, _color, _speed, _precision, _jerseyNumber) {
            super(_position);
            this.active = true;
            this.radius = 15;
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
            //write his jersey number on the player
            EIA2_Endaufgabe_HannahDuerr.crc2.textBaseline = "middle";
            EIA2_Endaufgabe_HannahDuerr.crc2.textAlign = "center";
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);
        }
        move() {
            //move player only if he has a perception radius and tehrefore is a field player
            if (this.perceptionRadius > 0) {
                //just let him move if he didn't just shoot to prevent the ball from "sticking" to him
                if (this.active == true) {
                    //calculate distance to ball and to startposition
                    let vectorToBall = new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.ball.position.x - this.position.x, EIA2_Endaufgabe_HannahDuerr.ball.position.y - this.position.y); //differenzvektor
                    let distanceToBall = vectorToBall.length;
                    let vectorToStartposition = new EIA2_Endaufgabe_HannahDuerr.Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); //differenzvektor
                    let distanceToStartposition = vectorToStartposition.length;
                    //check if ball is in his perception radius (difference between player position and ball position smaller than perception radius)
                    if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {
                        //move towards ball in even speed
                        let scale = (1 + this.speed * 0.2) / distanceToBall;
                        vectorToBall.scale(scale);
                        this.position.add(vectorToBall);
                        //if player arrived at the ball, stop the animation
                        if (distanceToBall > 24 && distanceToBall < 26) {
                            EIA2_Endaufgabe_HannahDuerr.animation = false;
                            EIA2_Endaufgabe_HannahDuerr.playerAtBall = this;
                            this.active = false; //deactivate player shortly when he just shot
                            setTimeout(() => {
                                this.activate();
                            }, 3000);
                        }
                    }
                    else if (distanceToStartposition > 5) { //something bigger than 0 to prevent player from shivering weirdly
                        //player returns to its startposition
                        let scale = (1 + this.speed * 0.2) / distanceToStartposition;
                        vectorToStartposition.scale(scale);
                        this.position.add(vectorToStartposition);
                    }
                } //close second if condition
            } //close first if condition
        }
        //check if a player has been clicked by calculating the difference of the click and the position of the player
        isClicked(_clickPosition) {
            let difference = new EIA2_Endaufgabe_HannahDuerr.Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            //return true when the click overlapped with the player
            return (difference.length < this.radius);
        }
        checkState() {
            //if players startposition is not on the playing field, he has no erception radius and therefore doesn't react to the ball
            if (this.position.x < 75 || this.position.x > 925) {
                this.perceptionRadius = 0;
            }
            else if (this.startPosition.x < 75 || this.startPosition.x > 925) {
                this.perceptionRadius = 0;
            }
            else {
                //if he is on the field, he has a perception radius and therefore plays actively
                this.perceptionRadius = 160;
            }
        }
        activate() {
            this.active = true;
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Player = Player;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Player.js.map