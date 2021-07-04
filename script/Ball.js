"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Ball extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_position) {
            super(_position);
            this.radius = 10;
        }
        draw() {
            //draw
            EIA2_Endaufgabe_HannahDuerr.crc2.save();
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "white";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "black";
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.restore();
        }
        move() {
            //move
            this.position.x += 4;
            this.position.y += 2;
            if (this.position.x < 0)
                this.position.x += EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height;
            if (this.position.x > EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width)
                this.position.x -= EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width;
            if (this.position.y > EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height)
                this.position.y -= EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height;
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Ball = Ball;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Ball.js.map