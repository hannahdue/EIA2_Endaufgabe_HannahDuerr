namespace EIA2_Endaufgabe_HannahDuerr {
    export abstract class Moveable {
        
        public position: Vector;
        
        constructor(_position: Vector) {
            this.position = _position;
        }

        public abstract move(): void;

        public abstract draw(): void;
    }
}