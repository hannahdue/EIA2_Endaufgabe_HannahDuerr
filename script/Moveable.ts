/*
Endaufgabe: Fußball Trainings Simulation
Name: Hannah Dürr
Matrikel: 263217
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Mona Stingl entstanden
*/

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