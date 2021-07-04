namespace EIA2_Endaufgabe_HannahDuerr {

    export let crc2: CanvasRenderingContext2D;
    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let restartbutton: HTMLSpanElement;
    let pausebutton: HTMLSpanElement;

    let minimumSpeed: number = 1;
    let maximumSpeed: number = 5;
    let minimumPrecision: number = 1;
    let maximumPrecision: number = 5;
    let teamAColor: string = "66b2ff";
    let teamBColor: string = "ff3333";
    let goalsA: number = 0;
    let goalsB: number = 0;
    let field: Playingfield;
    let animation: boolean = false;
    export let ball: Ball;

    interface PlayerInformation {
        x: number;
        y: number;
        team: string;
    }
    let playerInformation: PlayerInformation[] = [
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
        canvas.addEventListener("click", moveBall);

        //install change-listener to all fieldset elements to get the data from the user preferences
        let fieldsets: NodeListOf<HTMLFieldSetElement> = document.querySelectorAll("fieldset");
        for (let i: number = 0; i < fieldsets.length; i++) {
            let fieldset: HTMLFieldSetElement = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
        }
    }

    export function randomBetween(_min: number, _max: number): number {
        return _min + Math.random() * (_max - _min);
    }

    function startSimulation(): void {
        //hide settings container
        landingPage.style.display = "none";

        console.log(minimumSpeed, maximumSpeed, minimumPrecision, maximumPrecision, teamAColor, teamBColor);

        //create the background and the ball
        field = new Playingfield();
        ball = new Ball(new Vector(500, 275));
        moveables.push(ball);
        //create people
        createPeopleOnField();
        //start animation
        animation = true;
        window.setInterval(function (): void {
            if (animation == true)
                update();
        }, 20);
    }

    function restartSimulation(): void {
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
    }

    function pauseSimulation(): void {
        if (animation == true) {
            animation = false;
        } else {
            animation = true;
        }
    }

    function handleChange(): void {
        let formData: FormData = new FormData(document.forms[0]);

        minimumSpeed = Number(formData.get("MinimumSpeedSlider"));
        maximumSpeed = Number(formData.get("MaximumSpeedSlider"));
        minimumPrecision = Number(formData.get("MinimumPrecisionSlider"));
        maximumPrecision = Number(formData.get("MaximumPrecisionSlider"));

        teamAColor = <string>formData.get("TeamAColorPicker");
        teamBColor = <string>formData.get("TeamBColorPicker");
    }

    function createPeopleOnField(): void {
        // Spieler:
        for (let i: number = 0; i < 32; i++) {

            let position: Vector = new Vector(playerInformation[i].x, playerInformation[i].y);
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

            const player: Player = new Player(position, team, color, speed, precision, jerseyNumber); // keine Ahnung wie man sie verteilt
            // bekommen noch Geschwindigkeit und Präzision

            //Feldspieler in moveables, alle Spieler in allPlayers, Ersatzspieler in sparePlayers
            allPlayers.push(player);
            if (jerseyNumber <= 22) {
                moveables.push(player);
            } else if (jerseyNumber > 22) {
                sparePlayers.push(player);
            }
        }

        //Schiedsrichter und zwei Linienmänner werden kreiert:
        const referee: Referee = new Referee(new Vector(20, 20 + 800));
        const linesmanTop: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, 15));
        const linesmanBottom: Linesman = new Linesman(new Vector(crc2.canvas.width / 2, crc2.canvas.height - 15));

        //alle in moveables pushen
        moveables.push(referee, linesmanTop, linesmanBottom);
    }

    function moveBall(_event: MouseEvent): void {
        //get the position of the click and move the ball to this position
    }

    function update(): void {
        //draw the background
        field.draw();
        //update animation
        for (let moveable of moveables) {
            moveable.move();
            moveable.draw();
        }
        for (let sparePlayer of sparePlayers) {
            sparePlayer.draw();
        }

        let scoreDisplay: HTMLDivElement = <HTMLDivElement>document.querySelector("div#score");
        scoreDisplay.innerHTML = "<b>Score </b>" + goalsA + " : " + goalsB + " | <b>In possesion of the ball: </b>Player No ?"; //add jerseyNumber of player in possesion of the ball 
    }

} //close namespace