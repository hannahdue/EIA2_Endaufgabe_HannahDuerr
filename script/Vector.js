"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        /*public static getDifference(_v0: Vector, _v1: Vector): Vector {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }*/
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
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Vector = Vector;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Vector.js.map