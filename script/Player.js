"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Player extends EIA2_Endaufgabe_HannahDuerr.Moveable {
        constructor(_team, _color, _speed, _precision) {
            super();
            this.radius = 15;
            this.team = _team;
            this.color = _color;
            this.speed = _speed;
            this.precision = _precision;
        }
        draw() {
            //draw
        }
        move() {
            //move
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Player = Player;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Player.js.map