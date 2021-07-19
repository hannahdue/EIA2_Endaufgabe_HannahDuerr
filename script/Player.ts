/*
Endaufgabe: Fußball Trainings Simulation
Name: Hannah Dürr
Matrikel: 263217
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Mona Stingl entstanden
*/

namespace EIA2_Endaufgabe_HannahDuerr {
    export class Player extends Moveable {

        public team: string;
        public startPosition: Vector;
        public speed: number;
        public precision: number;
        public jerseyNumber: number;
        private active: boolean = true;
        private radius: number = 15;
        private perceptionRadius: number;
        private color: string;

        constructor(_position: Vector, _startPosition: Vector, _team: string, _color: string, _speed: number, _precision: number, _jerseyNumber: number) {
            super(_position);
            this.startPosition = _startPosition;
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
            this.jerseyNumber = _jerseyNumber;
        }

        public draw(): void {
            //draw player center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.lineWidth = 1;                
            crc2.strokeStyle = "black";
            crc2.stroke();

            //write his jersey number on the player
            crc2.textBaseline = "middle";
            crc2.textAlign = "center";                
            crc2.fillStyle = "black";
            crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);
        }

        public move(): void {
            //move player only if he has a perception radius and tehrefore is a field player
            if (this.perceptionRadius > 0) {
                //just let him move if he didn't just shoot to prevent the ball from "sticking" to him
                if (this.active == true) {

                    //calculate distance to ball and to startposition
                    let vectorToBall: Vector = new Vector(ball.position.x - this.position.x, ball.position.y - this.position.y); //differenzvektor
                    let distanceToBall: number = vectorToBall.length;

                    let vectorToStartposition: Vector = new Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); //differenzvektor
                    let distanceToStartposition: number = vectorToStartposition.length;

                    //check if ball is in his perception radius (difference between player position and ball position smaller than perception radius)
                    if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {
                        //move towards ball in even speed
                        let scale: number = (1 + this.speed * 0.2) / distanceToBall;
                        vectorToBall.scale(scale);
                        this.position.add(vectorToBall);

                        //if player arrived at the ball, stop the animation
                        if (distanceToBall > 24 && distanceToBall < 26) {
                            animation = false;
                            playerAtBall = this;
                            this.active = false; //deactivate player shortly when he just shot
                            setTimeout(() => {
                                this.activate();
                            },         3000);
                        }
                    } else if (distanceToStartposition > 5) { //something bigger than 0 to prevent player from shivering weirdly
                        //player returns to its startposition
                        let scale: number = (1 + this.speed * 0.2) / distanceToStartposition;
                        vectorToStartposition.scale(scale);
                        this.position.add(vectorToStartposition);
                    }
                } //close second if condition
            } //close first if condition
        }

        //check if a player has been clicked by calculating the difference of the click and the position of the player
        public isClicked(_clickPosition: Vector): Boolean {
            let difference: Vector = new Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            //return true when the click overlapped with the player
            return (difference.length < this.radius);
        }

        public checkState(): void {
            //if players startposition is not on the playing field, he has no erception radius and therefore doesn't react to the ball
            if (this.position.x < 75 || this.position.x > 925) {
                this.perceptionRadius = 0;
            } else if (this.startPosition.x < 75 || this.startPosition.x > 925) {
                this.perceptionRadius = 0;
            } else {
                //if he is on the field, he has a perception radius and therefore plays actively
                this.perceptionRadius = 160;
            }
        }

        private activate(): void {
            this.active = true;
        }
    }
}