"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Linesman extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 15;
        }
        draw() {
            //draw
            EIA2_Endaufgabe_HannahDuerr.crc2.save();
            // draw linesman center
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "#FFFF00";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.restore();
        }
        move() {
            //move
            this.position.x = EIA2_Endaufgabe_HannahDuerr.ball.position.x;
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Linesman = Linesman;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Linesman.js.map