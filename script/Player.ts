namespace EIA2_Endaufgabe_HannahDuerr {
    export class Player extends Moveable {
        
        public position: Vector;
        public radius: number = 15;
        team: string;
        color: string;
        speed: number;
        precision: number;
        jerseyNumber: number;


        constructor(_team: string, _color: string, _speed: number, _precision: number) {
            super();
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
        }

        draw(): void {
            //draw
        }

        move(): void {
            //move
        }
    }
}