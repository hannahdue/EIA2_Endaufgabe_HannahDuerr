"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    EIA2_Endaufgabe_HannahDuerr.animation = false;
    let landingPage;
    let startbutton;
    let restartbutton;
    let pausebutton;
    let instructionbutton;
    let instructionBoard;
    let goalsA = 0;
    let goalsB = 0;
    let minimumSpeed = 1;
    let maximumSpeed = 6;
    let minimumPrecision = 0;
    let maximumPrecision = 5;
    let teamAColor = "66b2ff";
    let teamBColor = "ff3333";
    let animationInterval;
    let listenToMouseMove = false;
    let field;
    let draggedPlayer;
    let SOCCER_EVENT;
    (function (SOCCER_EVENT) {
        SOCCER_EVENT["RIGHTGOAL_HIT"] = "rightGoalHit";
        SOCCER_EVENT["LEFTGOAL_HIT"] = "leftGoalHit";
    })(SOCCER_EVENT = EIA2_Endaufgabe_HannahDuerr.SOCCER_EVENT || (EIA2_Endaufgabe_HannahDuerr.SOCCER_EVENT = {}));
    let playerInformation = [
        // Team A
        { x: 135, y: 275, team: "A" },
        { x: 180, y: 100, team: "A" },
        { x: 820, y: 450, team: "A" },
        { x: 700, y: 475, team: "A" },
        { x: 700, y: 325, team: "A" },
        { x: 300, y: 325, team: "A" },
        { x: 700, y: 75, team: "A" },
        { x: 600, y: 150, team: "A" },
        { x: 400, y: 400, team: "A" },
        { x: 450, y: 275, team: "A" },
        { x: 500, y: 75, team: "A" },
        // Team B
        { x: 500, y: 475, team: "B" },
        { x: 550, y: 275, team: "B" },
        { x: 400, y: 150, team: "B" },
        { x: 600, y: 400, team: "B" },
        { x: 300, y: 475, team: "B" },
        { x: 700, y: 225, team: "B" },
        { x: 300, y: 225, team: "B" },
        { x: 300, y: 75, team: "B" },
        { x: 820, y: 100, team: "B" },
        { x: 180, y: 450, team: "B" },
        { x: 865, y: 275, team: "B" },
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
    let allPlayer = [];
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
        instructionbutton = document.querySelector("span#instruction");
        instructionBoard = document.querySelector("span#instructionBoard");
        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
        pausebutton.addEventListener("click", pauseSimulation);
        instructionbutton.addEventListener("click", showInstruction); // Spielanleitung
        canvas.addEventListener("mousedown", handleCanvasClick);
        canvas.addEventListener("mousemove", dragPlayer);
        canvas.addEventListener("mouseup", switchPlayer);
        EIA2_Endaufgabe_HannahDuerr.crc2.canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        EIA2_Endaufgabe_HannahDuerr.crc2.canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);
    }
    function randomBetween(_min, _max) {
        return _min + Math.random() * (_max - _min);
    }
    EIA2_Endaufgabe_HannahDuerr.randomBetween = randomBetween;
    function startSimulation() {
        //hide settings container
        landingPage.style.display = "none";
        getUserPreferences();
        //create the background and the ball
        field = new EIA2_Endaufgabe_HannahDuerr.Playingfield();
        //create people
        createPeopleOnField();
        //create ball
        EIA2_Endaufgabe_HannahDuerr.ball = new EIA2_Endaufgabe_HannahDuerr.Ball(new EIA2_Endaufgabe_HannahDuerr.Vector(500, 275));
        moveables.push(EIA2_Endaufgabe_HannahDuerr.ball);
        //start animation
        EIA2_Endaufgabe_HannahDuerr.animation = true;
        //update draw methods all the time
        window.setInterval(drawUpdate, 20);
        //animate only when animation is on
        animationInterval = window.setInterval(function () {
            if (EIA2_Endaufgabe_HannahDuerr.animation == true)
                animationUpdate();
        }, 20);
        console.log("Simulation started.");
    }
    function restartSimulation() {
        //show setings container again
        landingPage.style.display = "";
        //stop animation and reset values to default
        EIA2_Endaufgabe_HannahDuerr.animation = false;
        minimumSpeed = 1;
        maximumSpeed = 5;
        minimumPrecision = 1;
        maximumPrecision = 5;
        teamAColor = "66b2ff";
        teamBColor = "ff3333";
        //empty arrays of current objects in the simulation
        moveables = [];
        allPlayer = [];
        //animationsintervall beenden
        window.clearInterval(animationInterval);
    }
    function pauseSimulation() {
        if (EIA2_Endaufgabe_HannahDuerr.animation == true) {
            EIA2_Endaufgabe_HannahDuerr.animation = false;
        }
        else {
            EIA2_Endaufgabe_HannahDuerr.animation = true;
        }
    }
    //Show and hide simulation instructions
    function showInstruction() {
        if (instructionBoard.classList.contains("is-hidden")) {
            instructionBoard.classList.remove("is-hidden");
            instructionBoard.classList.add("visible");
        }
        else if (instructionBoard.classList.contains("visible")) {
            instructionBoard.classList.remove("visible");
            instructionBoard.classList.add("is-hidden");
        }
    }
    function getUserPreferences() {
        let formData = new FormData(document.forms[0]);
        minimumSpeed = Number(formData.get("MinimumSpeedSlider"));
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));
        teamAColor = formData.get("TeamAColorPicker");
        teamBColor = formData.get("TeamBColorPicker");
    }
    function createPeopleOnField() {
        //Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee = new EIA2_Endaufgabe_HannahDuerr.Referee(new EIA2_Endaufgabe_HannahDuerr.Vector(510, 310));
        const linesmanTop = new EIA2_Endaufgabe_HannahDuerr.Linesman(new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width / 2, 15));
        const linesmanBottom = new EIA2_Endaufgabe_HannahDuerr.Linesman(new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width / 2, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height - 15));
        //alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);
        // Spieler:
        for (let i = 0; i < 32; i++) {
            let position = new EIA2_Endaufgabe_HannahDuerr.Vector(playerInformation[i].x, playerInformation[i].y);
            let startPosition = new EIA2_Endaufgabe_HannahDuerr.Vector(playerInformation[i].x, playerInformation[i].y);
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
            const player = new EIA2_Endaufgabe_HannahDuerr.Player(position, startPosition, team, color, speed, precision, jerseyNumber); // keine Ahnung wie man sie verteilt
            // bekommen noch Geschwindigkeit und Präzision
            //Feldspieler in moveables, alle Spieler in allPlayers, Ersatzspieler in sparePlayers
            allPlayer.push(player);
            moveables.push(player);
        }
    }
    function handleCanvasClick(_event) {
        if (_event.shiftKey || _event.altKey) {
            getPlayer(_event);
        }
        else if (EIA2_Endaufgabe_HannahDuerr.animation == false) { // nur wenn jemand am Ball ist kann man klicken
            shootBall(_event);
        }
    }
    function shootBall(_event) {
        //to be able to check goals, set hitGoalA & hitGoalsB from ball to true
        EIA2_Endaufgabe_HannahDuerr.ball.hitGoalA = false;
        EIA2_Endaufgabe_HannahDuerr.ball.hitGoalB = false;
        //get the position of the click and move the ball to this position
        //Mouseposition:
        let xpos = 0;
        let ypos = 0;
        if (_event.offsetX > 75 && _event.offsetX < 925) {
            xpos = _event.offsetX;
        }
        if (_event.offsetY > 0 && _event.offsetY < 550) {
            ypos = _event.offsetY;
        }
        //wenn position gesetzt wurde, dem ball als ziel mitgeben:
        if (xpos > 0 && ypos > 0) {
            //move ball
            EIA2_Endaufgabe_HannahDuerr.ball.destination = new EIA2_Endaufgabe_HannahDuerr.Vector(xpos, ypos);
            EIA2_Endaufgabe_HannahDuerr.ball.startMoving = true;
            EIA2_Endaufgabe_HannahDuerr.animation = true;
        }
    }
    function handleLeftGoal() {
        goalsB++;
    }
    function handleRightGoal() {
        goalsA++;
    }
    // Spielerinformation bekommen
    function getPlayer(_event) {
        // Aktuelle Mouseposition
        let clickPosition = new EIA2_Endaufgabe_HannahDuerr.Vector(_event.offsetX, _event.offsetY);
        // getPlayerClick von der aktuellen Klickposition
        let playerClicked = getPlayerClick(clickPosition);
        // wenn unter der Mouseposition ein Spieler ist, werden die Informationen angezeigt
        if (playerClicked) {
            if (_event.shiftKey) {
                showPlayerInformation(playerClicked);
            }
            else if (_event.altKey) {
                listenToMouseMove = true;
                draggedPlayer = playerClicked;
                //console.log("draggedPlayer: " + draggedPlayer);
            }
        }
    }
    function dragPlayer(_event) {
        //get mouse position all the time while mouse is moving
        if (_event.altKey && listenToMouseMove == true) {
            let mousePosition = new EIA2_Endaufgabe_HannahDuerr.Vector(_event.offsetX, _event.offsetY);
            //set position of draggedPlayer to mouseposition
            if (draggedPlayer)
                draggedPlayer.position = mousePosition;
        }
    }
    //check if draggedPlayer is overlapping with a player on the field, if yes, exchange their positions
    function switchPlayer(_event) {
        // Aktuelle Mouseposition
        let mousePosition = new EIA2_Endaufgabe_HannahDuerr.Vector(_event.offsetX, _event.offsetY);
        // getPlayerClick von der aktuellen Mausposition
        let playerAtMousePosition = getPlayerClick(mousePosition);
        if (playerAtMousePosition && draggedPlayer) {
            //console.log("Player at Mouseposition: " + playerAtMousePosition.jerseyNumber);
            //console.log("Dragged Player: " + draggedPlayer.jerseyNumber);
            //switch only if player are from the same team
            if (draggedPlayer.team == playerAtMousePosition.team) {
                //save startpositions of player to be exchanged
                let draggedPlayerStartposition = draggedPlayer.startPosition;
                let playerStartposition = playerAtMousePosition.startPosition;
                //exchange their start positions
                draggedPlayer.startPosition = playerStartposition;
                playerAtMousePosition.startPosition = draggedPlayerStartposition;
                playerAtMousePosition.position = draggedPlayerStartposition;
                //die Zuweisung von draggedPlayer entfernen
                draggedPlayer = undefined;
            }
            else {
                draggedPlayer.position = draggedPlayer.startPosition;
                draggedPlayer = undefined;
            }
        }
        //draggedPlayer absetzen
        /*if (draggedPlayer) {
            let newX: number = draggedPlayer.position.x;
            let newY: number = draggedPlayer.position.y;
            draggedPlayer.startPosition = new Vector(newX, newY); //neue position auf dem Spielfeld festlegen
        }*/
    }
    // den geklickten Spieler bekommen
    function getPlayerClick(_clickPosition) {
        for (let player of allPlayer) {
            if (player.isClicked(_clickPosition) && player != draggedPlayer) //funktion mehr funktion als vorher gedacht?
                return player;
        }
        return null; // Rückgabewert null, wenn kein Spieler unter der Mouseposition ist
    }
    // Player Display
    function showPlayerInformation(_playerClicked) {
        let playerDisplay = document.querySelector("div#playerInformation");
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision);
    }
    function animationUpdate() {
        //update animation
        for (let moveable of moveables) {
            moveable.move();
        }
        let scoreDisplay = document.querySelector("div#score");
        //show the score and the player who is in possession of the ball
        if (EIA2_Endaufgabe_HannahDuerr.playerAtBall) {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No " + EIA2_Endaufgabe_HannahDuerr.playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
        }
        else {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?";
        }
    }
    function drawUpdate() {
        field.draw();
        for (let moveable of moveables) {
            moveable.draw();
        }
        for (let player of allPlayer) {
            player.checkState();
        }
    }
})(EIA2_Endaufgabe_HannahDuerr || (EIA2_Endaufgabe_HannahDuerr = {})); //close namespace
//# sourceMappingURL=main.js.map