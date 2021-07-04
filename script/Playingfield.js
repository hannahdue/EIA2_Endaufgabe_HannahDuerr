"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    class Playingfield {
        draw() {
            console.log("Playingfield drawn.");
            //mark the area of the canvas
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "silver";
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(0, 0, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height);
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //do the first translation to place field in the middle of the canvas area:
            EIA2_Endaufgabe_HannahDuerr.crc2.save();
            EIA2_Endaufgabe_HannahDuerr.crc2.translate(75, 0);
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(0, 0, 850, 550);
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "green";
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            //in the general translation for the field, leave a border  of 25px around the field
            EIA2_Endaufgabe_HannahDuerr.crc2.save();
            EIA2_Endaufgabe_HannahDuerr.crc2.translate(25, 25);
            //green stripes
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "darkgreen";
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(0, 0, 100, 500);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(200, 0, 100, 500);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(400, 0, 100, 500);
            EIA2_Endaufgabe_HannahDuerr.crc2.fillRect(600, 0, 100, 500);
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Außenlinie
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            EIA2_Endaufgabe_HannahDuerr.crc2.strokeStyle = "#FFF";
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(0, 0, 800, 500);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Mittellinie
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(800 / 2, 0);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(800 / 2, 500);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Mittelkreis
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800 / 2, 500 / 2, 70, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Mittelpunkt
            EIA2_Endaufgabe_HannahDuerr.crc2.fillStyle = "#FFF";
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800 / 2, 500 / 2, 4, 0, 2 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Strafraum links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(0, (500 - 320) / 2, 130, 320);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Torbox links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(0, (500 - 145) / 2, 45, 145);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Tor links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(1, (500 / 2) - 25);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(1, (500 / 2) + 25);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 9;
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            //Strafraumpunkt links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(90, 500 / 2, 2, 0, 2 * Math.PI, true);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Halbkreis links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(90, 500 / 2, 70, 0.29 * Math.PI, 1.71 * Math.PI, true);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Strafraum rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(800 - 130, (500 - 320) / 2, 130, 320);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Torbox rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.rect(800 - 45, (500 - 145) / 2, 45, 145);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Tor rechts 
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.moveTo(800 - 1, (500 / 2) - 25);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineTo(800 - 1, (500 / 2) + 25);
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 9;
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            EIA2_Endaufgabe_HannahDuerr.crc2.lineWidth = 2;
            //Strafraumpunkt rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800 - 90, 500 / 2, 2, 0, 2 * Math.PI, true);
            EIA2_Endaufgabe_HannahDuerr.crc2.fill();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Halbkreis rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800 - 90, 500 / 2, 70, 0.71 * Math.PI, 1.29 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Ecke oben links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(0, 0, 10, 0, 0.5 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Ecke unten links
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(0, 500, 10, 1.5 * Math.PI, 0, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Ecke oben rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800, 0, 10, 0.5 * Math.PI, 1 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //Ecke unten rechts
            EIA2_Endaufgabe_HannahDuerr.crc2.beginPath();
            EIA2_Endaufgabe_HannahDuerr.crc2.arc(800, 500, 10, 1 * Math.PI, 1.5 * Math.PI, false);
            EIA2_Endaufgabe_HannahDuerr.crc2.stroke();
            EIA2_Endaufgabe_HannahDuerr.crc2.closePath();
            //restore the second translation of the inner field for the lines etc
            EIA2_Endaufgabe_HannahDuerr.crc2.restore();
            //restore the first translation of the overall playing field
            EIA2_Endaufgabe_HannahDuerr.crc2.restore();
            /*just to see the dimension of the canvas for testing reasons:
            crc2.beginPath();
            crc2.rect(1, 1, crc2.canvas.width - 2, crc2.canvas.height - 2);
            crc2.closePath();
            crc2.lineWidth = 1;
            crc2.strokeStyle = "black";
            crc2.stroke();*/
        }
    }
    EIA2_Endaufgabe_HannahDuerr.Playingfield = Playingfield;
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=Playingfield.js.map