namespace EIA2_Endaufgabe_HannahDuerr {
    export class Player extends Moveable {

        //public team: string;
        public speed: number;
        public precision: number;
        public jerseyNumber: number;
        //public active: boolean = true;
        private radius: number = 15;
        private perceptionRadius: number = 100;
        private color: string;
        private startPosition: Vector;

        constructor(_position: Vector, _startPosition: Vector, _team: string, _color: string, _speed: number, _precision: number, _jerseyNumber: number) {
            super(_position);
            this.startPosition = _startPosition;
            //this.team = _team;
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

            crc2.textBaseline = "middle";
            crc2.textAlign = "center";
            crc2.fillStyle = "black";
            crc2.fillText(this.jerseyNumber.toString(), this.position.x, this.position.y);

        }

        public move(): void {
            //move
            //check if ball is in his perception radius (difference between player position and ball position smaller than perception radius)

            //nur aktiv bewegen, wenn er nicht gerade geschossen hat
            //if (this.active == true) { --> needed to shoot ball away from player easily, caused problems

                //1. Distanz zum Ball ausrechnen
                let vectorToBall: Vector = new Vector(ball.position.x - this.position.x, ball.position.y - this.position.y); //differenzvektor
                let distanceToBall: number = vectorToBall.length; //länge des differenzvektors

                let vectorToStartposition: Vector = new Vector(this.startPosition.x - this.position.x, this.startPosition.y - this.position.y); //differenzvektor
                let distanceToStartposition: number = vectorToStartposition.length; //länge des differenzvektors
                    
                //2. Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Spielers
                if (distanceToBall < this.perceptionRadius && distanceToBall > 24) {
                    //move towards ball
                    //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                    //speed / direction.length = skalierungsfaktor. Speed wäre 1px --> 50px/sekunde
                    let scale: number = (1 + this.speed * 0.2) / distanceToBall;
                    vectorToBall.scale(scale);
                    this.position.add(vectorToBall);

                    //if difference between ball and player is smaller than 25, animation = false
                    //wenn spieler am Ball ankommt, stoppt animation
                    if (distanceToBall > 24 && distanceToBall < 26) {
                        animation = false;
                        playerAtBall = this;
                        nobodyIsRunning = true; // damit man ab da wieder klicken kann
                    }
                } else if (distanceToStartposition > 5) {
                    //spieler läuft zurück zu seiner startposition
                    let scale: number = (1 + this.speed * 0.2) / distanceToStartposition;
                    vectorToStartposition.scale(scale);
                    this.position.add(vectorToStartposition);
                }
            //} close of if condition
        }

        // Schauen, ob Player angeklickt wurde:
        public isClicked(_clickPosition: Vector): Boolean {
            let difference: Vector = new Vector(_clickPosition.x - this.position.x, _clickPosition.y - this.position.y);
            return(difference.length < this.radius);
        }

        /*toggleActivity(): void {
            window.setTimeout(this.activate, 1500);
        }

        private activate(): void {
            this.active = true;
        }*/ 
    }
}