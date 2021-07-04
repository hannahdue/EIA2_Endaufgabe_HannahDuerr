"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Playingfield {
        constructor() {
            console.log("Playingfield created.");
        }
        draw() {
            console.log("Playingfield drawn.");
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "green";
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(0, 0, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            //leave a border around the field
            EIA2_Endaufgabe_HannahDuerr.crc2.save();
            EIA2_Endaufgabe_HannahDuerr.crc2.translate(10, 10);
            //green stripes
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "darkgreen";
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(0, 0, 100, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height - 20);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(200, 0, 100, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height - 20);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(400, 0, 100, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height - 20);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(600, 0, 100, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height - 20);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            //Außenlinie
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "#FFF";
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(0, 0, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width - 20, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height - 20);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Mittellinie
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "060";
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(800 / 2, 0);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(800 / 2, 518);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Mittelkreis
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800 / 2, 518 / 2, 73, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Mittelpunkt
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "#FFF";
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800 / 2, 518 / 2, 4, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Strafraum links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(0, (518 - 322) / 2, 132, 322);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Torbox links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(0, (518 - 146) / 2, 44, 146);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Tor links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(1, (518 / 2) - 22);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(1, (518 / 2) + 22);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 9;
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            //Strafraumpunkt links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(88, 518 / 2, 2, 0, 2 * Math.PI, true);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Halbkreis links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(88, 518 / 2, 73, 0.29 * Math.PI, 1.71 * Math.PI, true);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Strafraum rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(800 - 132, (518 - 322) / 2, 132, 322);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Torbox rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(800 - 44, (518 - 146) / 2, 44, 146);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Tor rechts 
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(800 - 1, (518 / 2) - 22);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(800 - 1, (518 / 2) + 22);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 9;
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            //Strafraumpunkt rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800 - 88, 518 / 2, 2, 0, 2 * Math.PI, true);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Halbkreis rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800 - 88, 518 / 2, 73, 0.71 * Math.PI, 1.29 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Ecke oben links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(0, 0, 8, 0, 0.5 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Ecke unten links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(0, 518, 8, 1.5 * Math.PI, 0, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Ecke oben rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800, 0, 8, 0.5 * Math.PI, 1 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Ecke unten rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800, 518, 8, 1 * Math.PI, 1.5 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.restore();
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Playingfield = Playingfield;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Playingfield.js.map