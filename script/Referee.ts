namespace EIA2_Endaufgabe_HannahDuerr {
    export class Referee extends Moveable {

        private radius: number = 15;
        private perceptionRadius: number = 400;

        constructor(_position: Vector) {
            super(_position);
        }

        draw(): void {
            //draw linesman center
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.fillStyle = "#FF6700";
            crc2.fill();
            crc2.strokeStyle = "red";
            crc2.stroke();
        }

        move(): void {

            let vectorToBall: Vector = new Vector(ball.position.x - this.position.x, ball.position.y - this.position.y); //differenzvektor
            let distanceToBall: number = vectorToBall.length; //länge des differenzvektors

            // Checken, ob Distanz kleiner ist als der Wahnehmungsradius des Schiedsrichters und sicherstellen, dass Schiedsrichter nicht an den Ball rankommt
            if (distanceToBall < this.perceptionRadius && distanceToBall > 100) {
                //move towards ball
                //gleichmäßig bewegen: wie muss der faktor sein, mit dem direction skaliert wird, damit die länge von direction speed entspricht?
                //speed / direction.length = skalierungsfaktor. Speed wäre 1px --> 50px/sekunde
                let scale: number = 1 / distanceToBall;
                vectorToBall.scale(scale);
                this.position.add(vectorToBall);
            }
        }

    } //class close
} //namespace close