"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    console.log("Start");
    let landingPage;
    let startbutton;
    let restartbutton;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        landingPage = document.querySelector("div#container");
        startbutton = document.querySelector("div#startbutton");
        restartbutton = document.querySelector("span#restart");
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
    }
    function startSimulation() {
        landingPage.style.display = "none";
    }
    function restartSimulation() {
        landingPage.style.display = "";
    }
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {}));
//# sourceMappingURL=main.js.map