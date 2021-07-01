namespace EIA2_Endaufgabe_HannahDuerr {
    console.log("Start");

    let landingPage: HTMLDivElement;
    let startbutton: HTMLDivElement;
    let restartbutton: HTMLSpanElement;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        landingPage = <HTMLDivElement>document.querySelector("div#container");
        startbutton = <HTMLDivElement>document.querySelector("div#startbutton");
        restartbutton = <HTMLSpanElement>document.querySelector("span#restart");

        startbutton.addEventListener("click", startSimulation);
        restartbutton.addEventListener("click", restartSimulation);

    }

    function startSimulation(): void {
        landingPage.style.display = "none";
    }

    function restartSimulation(): void {
        landingPage.style.display = "";
    }
    
}