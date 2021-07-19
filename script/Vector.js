"use strict";
/*
Endaufgabe: Fußball Trainings Simulation
Name: Hannah Dürr
Matrikel: 263217
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Mona Stingl entstanden
*/
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Vector {
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        get length() {
            return Math.hypot(this.x, this.y);
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Vector = Vector;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Vector.js.map