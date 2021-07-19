/*
Endaufgabe: Fußball Trainings Simulation
Name: Hannah Dürr
Matrikel: 263217
Datum: 19.07.21
Quellen: Lektionen aus dem Unterricht (insbesondere Asteroids), MDN und W3School
Diese Abgabe ist in Zusammmenarbeit mit Mona Stingl entstanden
*/

namespace EIA2_Endaufgabe_HannahDuerr {

    //export variables that need to be accessed from classes
    export let crc2: CanvasRenderingContext2D;
    export let ball: Ball;
    export let playerAtBall: Player | null;
    export let animation: boolean = false;

    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let instructionbutton: HTMLSpanElement;
    let instructionBoard: HTMLSpanElement;
    let playerDisplay: HTMLDivElement;

    let goalsA: number = 0;
    let goalsB: number = 0;
    //default values for the simulation, just in case
    let minimumSpeed: number = 1;
    let maximumSpeed: number = 6;
    let minimumPrecision: number = 0;
    let maximumPrecision: number = 5;
    let teamAColor: string = "66b2ff";
    let teamBColor: string = "ff3333";
    let listenToMouseMove: boolean = false;
    let field: Playingfield;
    let draggedPlayer: Player | undefined;

    //array to acces the different sounds
    export let sound: HTMLAudioElement[] = [];
    sound[0] = new Audio("sounds/kickoff.mp3");
    sound[1] = new Audio("sounds/cheering.mp3");
    sound[2] = new Audio("sounds/goal.mp3");
    sound[3] = new Audio("sounds/kick.mp3");
    sound[4] = new Audio("sounds/backgroundmusic.mp3");

    //save custom events in enum to prevent mistakes from typos
    export enum SOCCER_EVENT {
        RIGHTGOAL_HIT = "rightGoalHit",
        LEFTGOAL_HIT = "leftGoalHit"
    }

    interface PlayerInformation {
        x: number;
        y: number;
        team: string;
    }

    //information for every player to be accessed when player are created
    let playerInformation: PlayerInformation[] = [
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

    let moveables: Moveable[] = [];
    let allPlayer: Player[] = [];

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {

        console.log("Soccer simulation application loaded.");
        //get the canvas and the rendering context
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        //find html elements and install listeners on buttons
        landingPage = <HTMLDivElement>document.querySelector("div#settingsContainer");
        startbutton = <HTMLDivElement>document.querySelector("div#startbutton");
        instructionbutton = <HTMLSpanElement>document.querySelector("span#instruction");
        instructionBoard = <HTMLSpanElement>document.querySelector("span#instructionBoard");
        playerDisplay = <HTMLDivElement>document.querySelector("div#playerInformation");

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
    export function randomBetween(_min: number, _max: number): number {
        return _min + Math.random() * (_max - _min);
    }

    //play the sounds
    export function playSample(_sound: number): void {
        sound[_sound].play();
    }

    function startSimulation(): void {
        //hide settings container
        landingPage.style.display = "none";

        //play the whistle sound at kickoff
        playSample(0);
        playSample(4);

        //save data from the user settings for the simulation
        getUserPreferences();

        //create the background
        field = new Playingfield();
        
        //create people
        createPeopleOnField();

        //create ball
        ball = new Ball(new Vector(500, 275));
        moveables.push(ball);

        //start animation
        animation = true;

        //update draw methods all the time
        window.setInterval(drawUpdate, 20);

        //move animated objects only when animation is on
        window.setInterval(function (): void {
            if (animation == true)
                animationUpdate();
        },                 20);

        console.log("Simulation started.");
    }

    //Show and hide simulation instructions
    function showInstruction(): void {
        if (instructionBoard.classList.contains("hidden")) {
            instructionBoard.classList.remove("hidden");
            instructionBoard.classList.add("visible");
        } else if (instructionBoard.classList.contains("visible")) {
            instructionBoard.classList.remove("visible");
            instructionBoard.classList.add("hidden");
        }
    }

    //save all the preferences from the settings page for the simulation
    function getUserPreferences(): void {
        let formData: FormData = new FormData(document.forms[0]);

        minimumSpeed = Number(formData.get("MinimumSpeedSlider"));
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));

        teamAColor = <string>formData.get("TeamAColorPicker");
        teamBColor = <string>formData.get("TeamBColorPicker");
    }

    function createPeopleOnField(): void {
        //create the referee and two linesmen and push them to moveables
        const referee: Referee = new Referee(new Vector(510, 310));
        const linesmanTop: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, 15));
        const linesmanBottom: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, crc2.canvas.height - 15));
        moveables.push(referee, linesmanTop, linesmanBottom);

        //create the player
        for (let i: number = 0; i < 32; i++) {

            //information for the player from array
            let position: Vector = new Vector(playerInformation[i].x, playerInformation[i].y);
            let startPosition: Vector = new Vector(playerInformation[i].x, playerInformation[i].y);
            let team: string = playerInformation[i].team;
            let speed: number = randomBetween(minimumSpeed, maximumSpeed);
            let precision: number = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber: number = i + 1;
            let color: string = "000000"; //default value just in case something goes wrong
            if (team == "A") {
                color = teamAColor;
            } else if (team == "B") {
                color = teamBColor;
            }

            const player: Player = new Player(position, startPosition, team, color, speed, precision, jerseyNumber);

            //push players to moveables but also to allPlayers array
            allPlayer.push(player);
            moveables.push(player);
        }
    }

    //decide what should happen when the user clicks
    function handleCanvasClick(_event: MouseEvent): void {
        if (_event.shiftKey || _event.altKey) { //if one of the keys is pressed, get the player if there is one
            getPlayer(_event);
        } else if (animation == false) { //only possible to shoot the ball if someone is at the ball
            shootBall(_event);
        }
    }

    function shootBall(_event: MouseEvent): void {

        //to be able to check goals, set hitGoalA & hitGoalsB from ball to true
        ball.hitGoalA = false;
        ball.hitGoalB = false;

        //get the position of the click and move the ball to this position
        let xpos: number = 0;
        let ypos: number = 0;

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
            ball.destination = new Vector(xpos, ypos);
            ball.startMoving = true;
            animation = true;
        }
    }

    function handleLeftGoal(): void {
        goalsB++;
        playSample(2); //cheering
    }

    function handleRightGoal(): void {
        goalsA++;
        playSample(2); //cheering
    }

    //if the click happened on a player, get the player
    function getPlayer(_event: MouseEvent): void {

        //current mouseposition
        let clickPosition: Vector = new Vector(_event.offsetX, _event.offsetY);

        //get the player who was clicked
        let playerClicked: Player | null = getPlayerAtMousePosition(clickPosition);

        //if there is a player, show his information or be able to drag him
        if (playerClicked) {
            if (_event.shiftKey) {
                showPlayerInformation(playerClicked);
            } else if (_event.altKey) {
                listenToMouseMove = true;
                draggedPlayer = playerClicked;
            }
        }
    }

    function dragPlayer(_event: MouseEvent): void {
        //get mouse position all the time while mouse is moving
        if (_event.altKey && listenToMouseMove == true) {
            let mousePosition: Vector = new Vector(_event.offsetX, _event.offsetY);
            //set position of draggedPlayer to mouseposition
            if (draggedPlayer)
                draggedPlayer.position = mousePosition;
        }
    }

    //check if draggedPlayer is overlapping with a player on the field, if yes, exchange their positions
    function switchPlayer(_event: MouseEvent): void {
        //current mouseposition
        let mousePosition: Vector = new Vector(_event.offsetX, _event.offsetY);
        //get the player who is at the current mouseposition
        let playerAtMousePosition: Player | null = getPlayerAtMousePosition(mousePosition);

        if (playerAtMousePosition && draggedPlayer) {
            //switch only if player are from the same team
            if (draggedPlayer.team == playerAtMousePosition.team) {
                //save startpositions of player to be exchanged
                let draggedPlayerStartposition: Vector = draggedPlayer.startPosition;
                let playerStartposition: Vector = playerAtMousePosition.startPosition;
                //exchange their start positions
                draggedPlayer.startPosition = playerStartposition;
                playerAtMousePosition.startPosition = draggedPlayerStartposition;
                //set the position of the field player to its new startposition so that he appears outside the field
                playerAtMousePosition.position = draggedPlayerStartposition;

                //remove dragged player, otherwise it will stick to the cursor
                draggedPlayer = undefined;
            } else {
                //if the conditions for the switch are not given, set dragged player back to its startposition
                draggedPlayer.position = draggedPlayer.startPosition;
                draggedPlayer = undefined;
            }
        }
    }

    //get the player who was clicked
    function getPlayerAtMousePosition(_clickPosition: Vector): Player | null {

        //iterate over player array and check for each player if it is at the same position as the mouse
        for (let player of allPlayer) {
            //for use in switchPlayer, ignore the draggedPlayer in this check
            if (player.isClicked(_clickPosition) && player != draggedPlayer) 
                return player;
        }

        return null; //returns null when there's no player at the current mouse position
    }

    //display for the player information
    function showPlayerInformation(_playerClicked: Player): void {
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision);
    }

    function animationUpdate(): void {
        //update animation
        for (let moveable of moveables) {
            moveable.move();
        }

        let scoreDisplay: HTMLDivElement = <HTMLDivElement>document.querySelector("div#score");
        //show the score and the player who is in possession of the ball and his individual information
        if (playerAtBall) {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No " + playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
            playerDisplay.innerHTML = "<b>Number: </b>" + playerAtBall.jerseyNumber + " | <b>Speed: </b> " + Math.round(playerAtBall.speed) + " | <b>Precision: </b>" + Math.round(playerAtBall.precision);
        } else {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?";
        }
    }

    function drawUpdate(): void {
        //draw the field and all moveables & players
        field.draw();

        for (let moveable of moveables) {
            moveable.draw();
        }

        for (let player of allPlayer) {
            player.checkState();
        }
    }

} //close namespace