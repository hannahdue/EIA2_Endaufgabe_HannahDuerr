"use strict";
var EIA2_Endaufgabe_HannahDuerr;
(function (EIA2_Endaufgabe_HannahDuerr) {
    EIA2_Endaufgabe_HannahDuerr.animation = false;
    let landingPage;
    let startbutton;
    let instructionbutton;
    let instructionBoard;
    let playerDisplay;
    let goalsA = 0;
    let goalsB = 0;
    //default values for the simulation, just in case
    let minimumSpeed = 1;
    let maximumSpeed = 6;
    let minimumPrecision = 0;
    let maximumPrecision = 5;
    let teamAColor = "66b2ff";
    let teamBColor = "ff3333";
    let listenToMouseMove = false;
    let field;
    let draggedPlayer;
    //array to acces the different sounds
    EIA2_Endaufgabe_HannahDuerr.sound = [];
    EIA2_Endaufgabe_HannahDuerr.sound[0] = new Audio("sounds/kickoff.mp3");
    EIA2_Endaufgabe_HannahDuerr.sound[1] = new Audio("sounds/cheering.mp3");
    EIA2_Endaufgabe_HannahDuerr.sound[2] = new Audio("sounds/goal.mp3");
    EIA2_Endaufgabe_HannahDuerr.sound[3] = new Audio("sounds/kick.mp3");
    EIA2_Endaufgabe_HannahDuerr.sound[4] = new Audio("sounds/backgroundmusic.mp3");
    //save custom events in enum to prevent mistakes from typos
    let SOCCER_EVENT;
    (function (SOCCER_EVENT) {
        SOCCER_EVENT["RIGHTGOAL_HIT"] = "rightGoalHit";
        SOCCER_EVENT["LEFTGOAL_HIT"] = "leftGoalHit";
    })(SOCCER_EVENT = EIA2_Endaufgabe_HannahDuerr.SOCCER_EVENT || (EIA2_Endaufgabe_HannahDuerr.SOCCER_EVENT = {}));
    //information for every player to be accessed when player are created
    let playerInformation = [
        //field player team A
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
        //field palyer team B
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
        //spare player team A
        { x: 25, y: 125, team: "A" },
        { x: 25, y: 200, team: "A" },
        { x: 25, y: 275, team: "A" },
        { x: 25, y: 350, team: "A" },
        { x: 25, y: 425, team: "A" },
        //spare player team B
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
        console.log("Soccer simulation application loaded.");
        //get the canvas and the rendering context
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        EIA2_Endaufgabe_HannahDuerr.crc2 = canvas.getContext("2d");
        //find html elements and install listeners on buttons
        landingPage = document.querySelector("div#settingsContainer");
        startbutton = document.querySelector("div#startbutton");
        instructionbutton = document.querySelector("span#instruction");
        instructionBoard = document.querySelector("span#instructionBoard");
        playerDisplay = document.querySelector("div#playerInformation");
        startbutton.addEventListener("click", startSimulation);
        instructionbutton.addEventListener("click", showInstruction); // Spielanleitung
        //install event-listeners on canvas to be able to shoot the ball, switch players or see their details
        canvas.addEventListener("mousedown", handleCanvasClick);
        canvas.addEventListener("mousemove", dragPlayer);
        canvas.addEventListener("mouseup", switchPlayer);
        //install event listeners for the custom events to handle the goals
        canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);
    }
    //create a random number in a given range
    function randomBetween(_min, _max) {
        return _min + Math.random() * (_max - _min);
    }
    EIA2_Endaufgabe_HannahDuerr.randomBetween = randomBetween;
    //play the sounds
    function playSample(_sound) {
        EIA2_Endaufgabe_HannahDuerr.sound[_sound].play();
    }
    EIA2_Endaufgabe_HannahDuerr.playSample = playSample;
    function startSimulation() {
        //hide settings container
        landingPage.style.display = "none";
        //play the whistle sound at kickoff
        playSample(0);
        playSample(4);
        //save data from the user settings for the simulation
        getUserPreferences();
        //create the background
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
        //move animated objects only when animation is on
        window.setInterval(function () {
            if (EIA2_Endaufgabe_HannahDuerr.animation == true)
                animationUpdate();
        }, 20);
        console.log("Simulation started.");
    }
    //Show and hide simulation instructions
    function showInstruction() {
        if (instructionBoard.classList.contains("hidden")) {
            instructionBoard.classList.remove("hidden");
            instructionBoard.classList.add("visible");
        }
        else if (instructionBoard.classList.contains("visible")) {
            instructionBoard.classList.remove("visible");
            instructionBoard.classList.add("hidden");
        }
    }
    //save all the preferences from the settings page for the simulation
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
        //create the referee and two linesmen and push them to moveables
        const referee = new EIA2_Endaufgabe_HannahDuerr.Referee(new EIA2_Endaufgabe_HannahDuerr.Vector(510, 310));
        const linesmanTop = new EIA2_Endaufgabe_HannahDuerr.Linesman(new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width / 2, 15));
        const linesmanBottom = new EIA2_Endaufgabe_HannahDuerr.Linesman(new EIA2_Endaufgabe_HannahDuerr.Vector(EIA2_Endaufgabe_HannahDuerr.crc2.canvas.width / 2, EIA2_Endaufgabe_HannahDuerr.crc2.canvas.height - 15));
        moveables.push(referee, linesmanTop, linesmanBottom);
        //create the player
        for (let i = 0; i < 32; i++) {
            //information for the player from array
            let position = new EIA2_Endaufgabe_HannahDuerr.Vector(playerInformation[i].x, playerInformation[i].y);
            let startPosition = new EIA2_Endaufgabe_HannahDuerr.Vector(playerInformation[i].x, playerInformation[i].y);
            let team = playerInformation[i].team;
            let speed = randomBetween(minimumSpeed, maximumSpeed);
            let precision = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber = i + 1;
            let color = "000000"; //default value just in case something goes wrong
            if (team == "A") {
                color = teamAColor;
            }
            else if (team == "B") {
                color = teamBColor;
            }
            const player = new EIA2_Endaufgabe_HannahDuerr.Player(position, startPosition, team, color, speed, precision, jerseyNumber);
            //push players to moveables but also to allPlayers array
            allPlayer.push(player);
            moveables.push(player);
        }
    }
    //decide what should happen when the user clicks
    function handleCanvasClick(_event) {
        if (_event.shiftKey || _event.altKey) { //if one of the keys is pressed, get the player if there is one
            getPlayer(_event);
        }
        else if (EIA2_Endaufgabe_HannahDuerr.animation == false) { //only possible to shoot the ball if someone is at the ball
            shootBall(_event);
        }
    }
    function shootBall(_event) {
        //to be able to check goals, set hitGoalA & hitGoalsB from ball to true
        EIA2_Endaufgabe_HannahDuerr.ball.hitGoalA = false;
        EIA2_Endaufgabe_HannahDuerr.ball.hitGoalB = false;
        //get the position of the click and move the ball to this position
        let xpos = 0;
        let ypos = 0;
        if (_event.offsetX > 75 && _event.offsetX < 925) {
            xpos = _event.offsetX;
        }
        if (_event.offsetY > 0 && _event.offsetY < 550) {
            ypos = _event.offsetY;
        }
        //when there was a mouseposition given, set it as the balls destination
        if (xpos > 0 && ypos > 0) {
            //play the sound of the kick
            playSample(3);
            //move ball
            EIA2_Endaufgabe_HannahDuerr.ball.destination = new EIA2_Endaufgabe_HannahDuerr.Vector(xpos, ypos);
            EIA2_Endaufgabe_HannahDuerr.ball.startMoving = true;
            EIA2_Endaufgabe_HannahDuerr.animation = true;
        }
    }
    function handleLeftGoal() {
        goalsB++;
        playSample(2); //cheering
    }
    function handleRightGoal() {
        goalsA++;
        playSample(2); //cheering
    }
    //if the click happened on a player, get the player
    function getPlayer(_event) {
        //current mouseposition
        let clickPosition = new EIA2_Endaufgabe_HannahDuerr.Vector(_event.offsetX, _event.offsetY);
        //get the player who was clicked
        let playerClicked = getPlayerAtMousePosition(clickPosition);
        //if there is a player, show his information or be able to drag him
        if (playerClicked) {
            if (_event.shiftKey) {
                showPlayerInformation(playerClicked);
            }
            else if (_event.altKey) {
                listenToMouseMove = true;
                draggedPlayer = playerClicked;
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
        //current mouseposition
        let mousePosition = new EIA2_Endaufgabe_HannahDuerr.Vector(_event.offsetX, _event.offsetY);
        //get the player who is at the current mouseposition
        let playerAtMousePosition = getPlayerAtMousePosition(mousePosition);
        if (playerAtMousePosition && draggedPlayer) {
            //switch only if player are from the same team
            if (draggedPlayer.team == playerAtMousePosition.team) {
                //save startpositions of player to be exchanged
                let draggedPlayerStartposition = draggedPlayer.startPosition;
                let playerStartposition = playerAtMousePosition.startPosition;
                //exchange their start positions
                draggedPlayer.startPosition = playerStartposition;
                playerAtMousePosition.startPosition = draggedPlayerStartposition;
                //set the position of the field player to its new startposition so that he appears outside the field
                playerAtMousePosition.position = draggedPlayerStartposition;
                //remove dragged player, otherwise it will stick to the cursor
                draggedPlayer = undefined;
            }
            else {
                //if the conditions for the switch are not given, set dragged player back to its startposition
                draggedPlayer.position = draggedPlayer.startPosition;
                draggedPlayer = undefined;
            }
        }
    }
    //get the player who was clicked
    function getPlayerAtMousePosition(_clickPosition) {
        //iterate over player array and check for each player if it is at the same position as the mouse
        for (let player of allPlayer) {
            //for use in switchPlayer, ignore the draggedPlayer in this check
            if (player.isClicked(_clickPosition) && player != draggedPlayer)
                return player;
        }
        return null; //returns null when there's no player at the current mouse position
    }
    //display for the player information
    function showPlayerInformation(_playerClicked) {
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision);
    }
    function animationUpdate() {
        //update animation
        for (let moveable of moveables) {
            moveable.move();
        }
        let scoreDisplay = document.querySelector("div#score");
        //show the score and the player who is in possession of the ball and his individual information
        if (EIA2_Endaufgabe_HannahDuerr.playerAtBall) {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No " + EIA2_Endaufgabe_HannahDuerr.playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
            playerDisplay.innerHTML = "<b>Number: </b>" + EIA2_Endaufgabe_HannahDuerr.playerAtBall.jerseyNumber + " | <b>Speed: </b> " + Math.round(EIA2_Endaufgabe_HannahDuerr.playerAtBall.speed) + " | <b>Precision: </b>" + Math.round(EIA2_Endaufgabe_HannahDuerr.playerAtBall.precision);
        }
        else {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?";
        }
    }
    function drawUpdate() {
        //draw the field and all moveables & players
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