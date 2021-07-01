namespace EIA2_Endaufgabe_HannahDuerr {
    
    export let crc2: CanvasRenderingContext2D;
    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let restartbutton: HTMLSpanElement;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        landingPage = <HTMLDivElement>document.querySelector("div#container");
        startbutton = <HTMLDivElement>document.querySelector("div#startbutton");
        restartbutton = <HTMLSpanElement>document.querySelector("span#restart");

        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);

    }

    function startSimulation(): void {
        landingPage.style.display = "none";
        let field: Playingfield = new Playingfield();
        field.draw();
        //initializeSimulation();
    }

    function restartSimulation(): void {
        landingPage.style.display = "";
    }

    /*function initializeSimulation(): void {
        let field: Playingfield = new Playingfield();
        field.draw();
    }*/
    
}