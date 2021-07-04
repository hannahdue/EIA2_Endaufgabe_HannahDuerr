namespace EIA2_Endaufgabe_HannahDuerr {
    export class Moveable {
        
        public position: Vector;
        public radius: number;
        public color: string;
        public speed: number;
        
        constructor(_position: Vector) {
            this.position = _position;
        }

        move(): void {
            //move
        }

        draw(): void {
            //draw
        }
        
    }
}