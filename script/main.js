"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    let landingPage;
    let startbutton;
    let restartbutton;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EIA2_Endaufgabe_HannahDuerr.crc2 = canvas.getContext("2d");
        landingPage = document.querySelector("div#container");
        startbutton = document.querySelector("div#startbutton");
        restartbutton = document.querySelector("span#restart");
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
    }
    function startSimulation() {
        landingPage.style.display = "none";
        let field = new EIA2_Endaufgabe_HannahDuerr.Playingfield();
        field.draw();
        //initializeSimulation();
    }
    function restartSimulation() {
        landingPage.style.display = "";
    }
    /*function initializeSimulation(): void {
        let field: Playingfield = new Playingfield();
        field.draw();
    }*/
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=main.js.map