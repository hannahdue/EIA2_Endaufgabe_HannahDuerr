namespace EIA2_Endaufgabe_HannahDuerr {
    export abstract class Moveable {
        
        public position: Vector;
        public radius: number;
        public color: string;
        public speed: number;
        
        constructor(_position: Vector) {
            this.position = _position;
        }

        abstract move(): void;

        abstract draw(): void;
        
    }
}