namespace EIA2_Endaufgabe_HannahDuerr {

    export let crc2: CanvasRenderingContext2D;
    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let restartbutton: HTMLSpanElement;
    let pausebutton: HTMLSpanElement;

    let minimumSpeed: number = 1;
    let maximumSpeed: number = 6;
    let minimumPrecision: number = 0;
    let maximumPrecision: number = 5;
    let teamAColor: string = "66b2ff";
    let teamBColor: string = "ff3333";
    let goalsA: number = 0;
    let goalsB: number = 0;
    let animationInterval: number;
    let field: Playingfield;
    let draggedPlayer: Player | undefined;
    export let ball: Ball;
    export let playerAtBall: Player | null;
    export let animation: boolean = false;
    let listenToMouseMove: boolean = false;

    export enum SOCCER_EVENT {
        RIGHTGOAL_HIT = "rightGoalHit",
        LEFTGOAL_HIT = "leftGoalHit"
    }

    interface PlayerInformation {
        x: number;
        y: number;
        team: string;
    }
    let playerInformation: PlayerInformation[] = [
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
    let moveables: Moveable[] = [];
    let allPlayers: Player[] = [];
    let sparePlayers: Player[] = [];

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        //get the canvas and the rendering context
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        //find html elements and install listeners on buttons to toggle between settings and simulation
        landingPage = <HTMLDivElement>document.querySelector("div#settingsContainer");
        startbutton = <HTMLDivElement>document.querySelector("div#startbutton");
        restartbutton = <HTMLSpanElement>document.querySelector("span#restart");
        pausebutton = <HTMLSpanElement>document.querySelector("span#pause");

        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);
        pausebutton.addEventListener("click", pauseSimulation);

        canvas.addEventListener("mousedown", handleCanvasClick);
        canvas.addEventListener("mousemove", dragPlayer);
        canvas.addEventListener("mouseup", switchPlayer);

        crc2.canvas.addEventListener(SOCCER_EVENT.RIGHTGOAL_HIT, handleRightGoal);
        crc2.canvas.addEventListener(SOCCER_EVENT.LEFTGOAL_HIT, handleLeftGoal);
    }

    export function randomBetween(_min: number, _max: number): number {
        return _min + Math.random() * (_max - _min);
    }

    function startSimulation(): void {
        //hide settings container
        landingPage.style.display = "none";

        getUserPreferences();

        //create the background and the ball
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
        //animate only when animation is on
        animationInterval = window.setInterval(function (): void {
            if (animation == true)
                animationUpdate();
        },                                     20);

        console.log("Simulation started.");
    }

    function restartSimulation(): void {
        //extra function in case we need the initialisation somewhere else
        initialisation();
    }

    function pauseSimulation(): void {
        if (animation == true) {
            animation = false;
        } else {
            animation = true;
        }
    }

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
        //Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee: Referee = new Referee(new Vector(510, 310));
        const linesmanTop: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, 15));
        const linesmanBottom: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, crc2.canvas.height - 15));

        //alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);

        // Spieler:
        for (let i: number = 0; i < 32; i++) {

            let position: Vector = new Vector(playerInformation[i].x, playerInformation[i].y);
            let startPosition: Vector = new Vector(playerInformation[i].x, playerInformation[i].y);
            let team: string = playerInformation[i].team; // from array;
            let speed: number = randomBetween(minimumSpeed, maximumSpeed);
            let precision: number = randomBetween(minimumPrecision, maximumPrecision);
            let jerseyNumber: number = i + 1;
            let color: string = "000000"; //default value just in case
            if (team == "A") {
                color = teamAColor;
            } else if (team == "B") {
                color = teamBColor;
            }

            const player: Player = new Player(position, startPosition, team, color, speed, precision, jerseyNumber); // keine Ahnung wie man sie verteilt
            // bekommen noch Geschwindigkeit und Präzision

            //Feldspieler in moveables, alle Spieler in allPlayers, Ersatzspieler in sparePlayers
            allPlayers.push(player);
            if (jerseyNumber <= 22) {
                moveables.push(player);
            } else if (jerseyNumber > 22) {
                sparePlayers.push(player);
            }
        }
    }

    function handleCanvasClick(_event: MouseEvent): void {
        if (_event.shiftKey || _event.altKey) {
            getPlayer(_event);
        } else if (animation == false) { // nur wenn jemand am Ball ist kann man klicken
            shootBall(_event);
        }
    }

    function shootBall(_event: MouseEvent): void {

        //to be able to check goals, set hitGoalA & hitGoalsB from ball to true
        ball.hitGoalA = false;
        ball.hitGoalB = false;

        //get the position of the click and move the ball to this position
        //Mouseposition:
        let xpos: number = 0;
        let ypos: number = 0;

        if (_event.offsetX > 75 && _event.offsetX < 925) {
            xpos = _event.offsetX;
        }
        if (_event.offsetY > 0 && _event.offsetY < 550) {
            ypos = _event.offsetY;
        }

        //wenn position gesetzt wurde, dem ball als ziel mitgeben:
        if (xpos > 0 && ypos > 0) {
            //move ball
            ball.destination = new Vector(xpos, ypos);
            ball.startMoving = true;
            animation = true;
        }
    }

    function handleLeftGoal(): void {
        goalsB++;
    }

    function handleRightGoal(): void {
        goalsA++;
    }

    // Spielerinformation bekommen
    function getPlayer(_event: MouseEvent): void {

        // Aktuelle Mouseposition
        let clickPosition: Vector = new Vector(_event.offsetX, _event.offsetY);

        // getPlayerClick von der aktuellen Klickposition
        let playerClicked: Player | null = getPlayerClick(clickPosition);

        // wenn unter der Mouseposition ein Spieler ist, werden die Informationen angezeigt
        if (playerClicked) {
            if (_event.shiftKey) {
                showPlayerInformation(playerClicked);
            } else if (_event.altKey) {
                listenToMouseMove = true;
                draggedPlayer = playerClicked;
                console.log("draggedPlayer: " + draggedPlayer);
            }
        }
    }

    function dragPlayer(_event: MouseEvent): void {
        //get mouse position all the time while mouse is moving
        //set position of draggedPlayer to mouseposition
        if (_event.altKey && listenToMouseMove == true) {
            let mousePosition: Vector = new Vector(_event.offsetX, _event.offsetY);
            if (draggedPlayer)
                draggedPlayer.position = mousePosition;
        }
    }

    function switchPlayer(_event: MouseEvent): void {
        //check if draggedPlayer is overlapping with a player on the field, if yes, exchange their positions
        //switch only if player are from the same team
        
         //draggedPlayer entfernen
        draggedPlayer = undefined;
    }

    // den geklickten Spieler bekommen
    function getPlayerClick(_clickPosition: Vector): Player | null {

        for (let player of allPlayers) {
            if (player.isClicked(_clickPosition))
                return player;
        }

        return null; // Rückgabewert null, wenn kein Spieler unter der Mouseposition ist
    }

    // Player Display
    function showPlayerInformation(_playerClicked: Player): void {
        let playerDisplay: HTMLDivElement = <HTMLDivElement>document.querySelector("div#playerInformation");
        playerDisplay.innerHTML = "<b>Number: </b>" + _playerClicked.jerseyNumber + " | <b>Speed: </b> " + Math.round(_playerClicked.speed) + " | <b>Precision: </b>" + Math.round(_playerClicked.precision);
    }

    function animationUpdate(): void {
        //update animation
        for (let moveable of moveables) {
            moveable.move();
            //moveable.draw();
        }

        let scoreDisplay: HTMLDivElement = <HTMLDivElement>document.querySelector("div#score");

        if (playerAtBall) {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No " + playerAtBall.jerseyNumber; //add jerseyNumber of player in possesion of the ball 
        } else {
            scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?";
        }
    }

    function drawUpdate(): void {
        field.draw();

        for (let moveable of moveables) {
            moveable.draw();
        }

        for (let sparePlayer of sparePlayers) {
            sparePlayer.draw();
        }
    }

    function initialisation(): void {
        //show setings container again
        landingPage.style.display = "";

        //stop animation and reset values to default
        animation = false;
        minimumSpeed = 1;
        maximumSpeed = 5;
        minimumPrecision = 1;
        maximumPrecision = 5;
        teamAColor = "66b2ff";
        teamBColor = "ff3333";

        //empty arrays of current objects in the simulation
        moveables = [];
        allPlayers = [];
        sparePlayers = [];

        //animationsintervall beenden
        window.clearInterval(animationInterval);

    }

} //close namespace