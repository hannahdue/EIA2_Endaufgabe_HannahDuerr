/*
Endaufgabe: Fußball Trainings Simulation
Name: Hannah Dürr
Matrikel: 263217
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Mona Stingl entstanden
*/

namespace EIA2_Endaufgabe_HannahDuerr {
    export class Ball extends Moveable {

        public destination: Vector; //position of the click where the ball will roll to
        public startMoving: boolean = false;
        public hitGoalA: boolean = false;
        public hitGoalB: boolean = false;
        private radius: number = 10;

        constructor(_position: Vector) {
            super(_position);
        }

        public draw(): void {
            //draw ball center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            //draw ball pattern
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius - 2.5, 0, 2 * Math.PI, false);
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            //line top
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 10);
            crc2.lineTo(this.position.x, this.position.y - 2);
            crc2.stroke();

            //line bottom
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x - 6, this.position.y + 8);
            crc2.stroke();

            //line left top
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x - 9, this.position.y - 3);
            crc2.stroke();

            //line right top
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y);
            crc2.lineTo(this.position.x + 9, this.position.y - 3);
            crc2.stroke();

            //line right bottom
            crc2.beginPath();
            crc2.moveTo(this.position.x, this.position.y - 1);
            crc2.lineTo(this.position.x + 6, this.position.y + 8);
            crc2.stroke();

            //dot in the middle
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 2;
            crc2.strokeStyle = "black";
            crc2.stroke();

            //dot on top
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y - 8, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            //dot on top left
            crc2.beginPath();
            crc2.arc(this.position.x - 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            //dot on top right
            crc2.beginPath();
            crc2.arc(this.position.x + 8, this.position.y - 2, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            //dot on bottom right
            crc2.beginPath();
            crc2.arc(this.position.x + 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();

            //dot on bottom left
            crc2.beginPath();
            crc2.arc(this.position.x - 5, this.position.y + 7, 1.7, 0, 2 * Math.PI, false);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();
        }

        public move(): void {
            //when a destination was set, move ball there
            if (this.destination) {
                let direction: Vector = new Vector(this.destination.x - this.position.x, this.destination.y - this.position.y);
                let distance: number = 0;
                //the further the destination is from the ball and the the worse the player who kicked, the less precise is the shot
                if (this.startMoving == true) {
                    
                    //precision depeding on player at ball
                    if (playerAtBall)
                        distance = (playerAtBall.precision / 2) * (0.1 * direction.length);
                
                    //precision depeding on distance between ball and click
                    distance += (Math.random() - 0.5) * (0.25 * direction.length);

                    this.destination.x += distance;
                    this.destination.y += distance;
                    this.startMoving = false;
                }

                //move ball faster when shot is on very short distance
                direction.scale(1 / 50);
                if (distance < 150) {
                    this.position.add(new Vector(direction.x * 2, direction.y * 2));
                } else {
                    this.position.add(direction);
                }

                //when ball leaves the playing field, it is placed back in the middle of the field
                if (this.position.x < 98 || this.position.x > 902 || this.position.y < 25 || this.position.y > 525) {
                    this.destination = new Vector(500, 275); //otherwise it will shoot again to the place off the field
                    this.position = new Vector(500, 275);
                }

                //let people cheer if ball gets near the goals
                if (this.position.x < 180 && this.position.x > 170 || this.position.x > 820 && this.position.x < 830) {
                    playSample(1);
                }

                this.checkGoals();
            }
        }

        private checkGoals(): void {
            //check, if ball hit goals:
            if (this.position.x < 100 && this.position.y > 225 && this.position.y < 325) {
                if (this.hitGoalA == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team B");
                    let event: CustomEvent = new CustomEvent(SOCCER_EVENT.LEFTGOAL_HIT);
                    crc2.canvas.dispatchEvent(event);
                    this.hitGoalA = true;
                }
            }
            if (this.position.x > 900 && this.position.y > 225 && this.position.y < 325) {
                if (this.hitGoalB == false) {
                    //create custom event and dispatch it 
                    console.log("Goal for team A");
                    let event: CustomEvent = new CustomEvent(SOCCER_EVENT.RIGHTGOAL_HIT);
                    crc2.canvas.dispatchEvent(event);
                    this.hitGoalB = true;
                }
            }
        }
    } //class close
} //namespace close