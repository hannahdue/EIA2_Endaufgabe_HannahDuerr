"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    let landingPage;
    let startbutton;
    let restartbutton;
    let pausebutton;
    let minimumSpeed = 1;
    let maximumSpeed = 5;
    let minimumPrecision = 1;
    let maximumPrecision = 5;
    let teamAColor = "66b2ff";
    let teamBColor = "ff3333";
    let goalsA = 0;
    let goalsB = 0;
    let field;
    let animation = false;
    let playerInformation = [
        // Team A
        { x: 125, y: 275, team: "A" },
        { x: 200, y: 150, team: "A" },
        { x: 200, y: 400, team: "A" },
        { x: 300, y: 75, team: "A" },
        { x: 300, y: 225, team: "A" },
        { x: 300, y: 325, team: "A" },
        { x: 300, y: 475, team: "A" },
        { x: 400, y: 150, team: "A" },
        { x: 400, y: 400, team: "A" },
        { x: 450, y: 275, team: "A" },
        { x: 500, y: 75, team: "A" },
        // Team B
        { x: 500, y: 475, team: "B" },
        { x: 550, y: 275, team: "B" },
        { x: 600, y: 150, team: "B" },
        { x: 600, y: 400, team: "B" },
        { x: 700, y: 75, team: "B" },
        { x: 700, y: 225, team: "B" },
        { x: 700, y: 325, team: "B" },
        { x: 700, y: 475, team: "B" },
        { x: 800, y: 150, team: "B" },
        { x: 800, y: 400, team: "B" },
        { x: 875, y: 275, team: "B" },
        // Auswechselspieler Team A
        { x: 25, y: 125, team: "A" },
        { x: 25, y: 200, team: "A" },
        { x: 25, y: 275, team: "A" },
        { x: 25, y: 350, team: "A" },
        { x: 25, y: 425, team: "A" },
        // Auswechselspieler Team B
        { x: 975, y: 125, team: "B" },
        { x: 975, y: 200, team: "B" },
        { x: 975, y: 275, team: "B" },
        { x: 975, y: 350, team: "B" },
        { x: 975, y: 425, team: "B" }
    ];
    let moveables = [];
    let allPlayers = [];
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        //get the canvas and the rendering context
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EIA2_Endaufgabe_HannahDuerr.crc2 = canvas.getContext("2d");
        //find html elements and install listeners on buttons to toggle between settings and simulation
        landingPage = document.querySelector("div#settingsContainer");
        startbutton = document.querySelector("div#startbutton");
        restartbutton = document.querySelector("span#restart");
        pausebutton = document.querySelector("span#pause");
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
        pausebutton.addEventListener("click", pauseSimulation);
        //install change-listener to all fieldset elements to get the data from the user preferences
        let fieldsets = document.querySelectorAll("fieldset");
        for (let i = 0; i < fieldsets.length; i++) {
            let fieldset = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
        }
        //create the background and the ball
        field = new EIA2_Endaufgabe_HannahDuerr.Playingfield();
        field.draw();
        EIA2_Endaufgabe_HannahDuerr.ball = new EIA2_Endaufgabe_HannahDuerr.Ball(new EIA2_Endaufgabe_HannahDuerr.Vector(500, 275));
        moveables.push(EIA2_Endaufgabe_HannahDuerr.ball);
    }
    function randomBetween(_min, _max) {
        return _min + Math.random() * (_max - _min);
    }
    EIA2_Endaufgabe_HannahDuerr.randomBetween = randomBetween;
    function startSimulation() {
        //hide settings container
        landingPage.style.display = "none";
        console.log(minimumSpeed, maximumSpeed, minimumPrecision, maximumPrecision, teamAColor, teamBColor);
        createPeopleOnField();
        //start animation
        animation = true;
        window.setInterval(function () {
            if (animation == true)
                update();
        }, 20);
    }
    function restartSimulation() {
        //show setings container again
        landingPage.style.display = "";
        //stop animation
        animation = false;
    }
    function pauseSimulation() {
        if (animation == true) {
            animation = false;
        }
        else {
            animation = true;
        }
    }
    function handleChange() {
        let formData = new FormData(document.forms[0]);
        minimumSpeed = Number(formData.get("MinimumSpeedSlider"));
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));
        teamAColor = formData.get("TeamAColorPicker");
        teamBColor = formData.get("TeamBColorPicker");
    }
    function createPeopleOnField() {
        // Spieler:
        for (let i = 0; i < 32; i++) {
            let position = new EIA2_Endaufgabe_HannahDuerr.Vector(playerInformation[i].x, playerInformation[i].y);
            let team = playerInformation[i].team; // from array;
            let speed = randomBetween(minimumSpeed, maximumSpeed);
            let precision = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber = i + 1;
            let color = "000000"; //default value just in case
            if (team == "A") {
                color = teamAColor;
            }
            else if (team == "B") {
                color = teamBColor;
            }
            const player = new EIA2_Endaufgabe_HannahDuerr.Player(position, team, color, speed, precision, jerseyNumber); // keine Ahnung wie man sie verteilt
            // bekommen noch Geschwindigkeit und Präzision
            //Feldspieler in moveables, alle Spieler in allPlayers
            allPlayers.push(player);
            if (jerseyNumber <= 22) {
                moveables.push(player);
            }
        }
        //Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee = new EIA2_Endaufgabe_HannahDuerr.Referee(new EIA2_Endaufgabe_HannahDuerr.Vector(20, 20 + 800));
        const linesmanTop = new EIA2_Endaufgabe_HannahDuerr.Linesman(new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width / 2, 10));
        const linesmanBottom = new EIA2_Endaufgabe_HannahDuerr.Linesman(new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width / 2, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height - 10));
        //alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);
    }
    function update() {
        //draw the background
        field.draw();
        //update animation
        for (let moveable of moveables) {
            moveable.move();
            moveable.draw();
        }
        let scoreDisplay = document.querySelector("div#score");
        scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?"; //add jerseyNumber of player in possesion of the ball 
    }
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {})); //close namespace
//# sourceMappingURL=main.js.map