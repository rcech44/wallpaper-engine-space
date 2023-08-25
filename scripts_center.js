var pendingIndexChange = false;
var currentPlanetNumber = 0;
var randomNumber = 0;
var settings = false;
const PlanetLocation = {
    Centered: 'center',
    RightBottom: 'right bottom'
};
var currentPlanetLocation = PlanetLocation.Centered;
const planets = ["earth", "jupiter", "neptune", "mercury", "mars", "black-hole", "alien"];
const planetsCzech = ["Země", "Jupiter", "Neptun", "Merkur", "Mars", "Černá díra", "Mimozemšťané"];
const planetColors = ["rgba(0,54,181,1)", "rgba(181, 116, 38, 1)", "rgba(9, 127, 181, 1)", "rgba(130, 130, 130, 1)", "rgba(171, 54, 48, 1)", "rgba(106, 43, 173, 1)", "rgba(47, 194, 86, 1)"];

function randomizeIndex()
{
    if (pendingIndexChange) return;

    // Initial stuff
    var fadeSpeed = 1000;
    var transitionLength = 1200;
    randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
    while (randomNumber == currentPlanetNumber)
    {
        randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
    }
    currentPlanetNumber = randomNumber;
    pendingIndexChange = true;
    setTimeout(function() {
        $("#background_elements").fadeIn(fadeSpeed);
        $("#page_transition_div").fadeOut(fadeSpeed);
        pendingIndexChange = false;
    }, transitionLength);

    // Fade out everything
    $("#background_elements").fadeOut(fadeSpeed);
    $("#page_transition_div").fadeIn(fadeSpeed);
    $("#easteregg_text").fadeOut(fadeSpeed);
    setTimeout(function() {
        document.getElementById("moon_planet_2").style.display = "block";
        if (planets[randomNumber] != "mercury" && planets[randomNumber] != "black-hole") document.getElementById("moon_planet").style.display = "block";
        else document.getElementById("moon_planet").style.display = "none";
        if (planets[randomNumber] == "alien") {
            document.getElementById("moon_planet_2").style.display = "none";
            document.getElementById("moon_planet").style.backgroundImage = "url(ufo.png)";
        }
        else document.getElementById("moon_planet").style.backgroundImage = "url(moon.png)";
        document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
        document.getElementById("main_planet").style.backgroundImage = "url(" + planets[randomNumber] + ".png)";
        document.getElementById("randomize_button").innerHTML = "změnit pozadí (právě " + planetsCzech[randomNumber] + ")";
    }, fadeSpeed);
}

function randomizeIndexStartup()
{
    randomNumber = Math.floor(Math.random() * (planets.length - 0) + 0);
    currentPlanetNumber = randomNumber;
    document.getElementById("moon_planet_2").style.display = "block";
    if (planets[randomNumber] != "mercury" && planets[randomNumber] != "black-hole") document.getElementById("moon_planet").style.display = "block";
    else document.getElementById("moon_planet").style.display = "none";
    if (planets[randomNumber] == "alien") {
        document.getElementById("moon_planet_2").style.display = "none";
        document.getElementById("moon_planet").style.backgroundImage = "url(ufo.png)";
    }
    else document.getElementById("moon_planet").style.backgroundImage = "url(moon.png)";
    document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
    document.getElementById("main_planet").style.backgroundImage = "url(" + planets[randomNumber] + ".png)";
    document.getElementById("randomize_button").innerHTML = "změnit pozadí (právě " + planetsCzech[randomNumber] + ")";
}

function changeLocation()
{
    if (pendingIndexChange) return;

    // Initial stuff
    var fadeSpeed = 1000;
    var transitionLength = 1200;
    pendingIndexChange = true;
    setTimeout(function() {
        $("#background_elements").fadeIn(fadeSpeed);
        $("#page_transition_div").fadeOut(fadeSpeed);
        pendingIndexChange = false;
    }, transitionLength);

    // Fade out everything
    $("#background_elements").fadeOut(fadeSpeed);
    $("#page_transition_div").fadeIn(fadeSpeed);
    if (currentPlanetLocation == PlanetLocation.Centered)
    {
        currentPlanetLocation = PlanetLocation.RightBottom;
        setTimeout(function() {
            document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
            document.getElementById("main_planet").classList.remove("bg-planet-1");
            document.getElementById("moon_planet").classList.remove("bg-planet-2");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3");
            document.getElementById("main_planet").classList.add("bg-planet-1-right-bottom");
            document.getElementById("moon_planet").classList.add("bg-planet-2-right-bottom");
            document.getElementById("moon_planet_2").classList.add("bg-planet-3-right-bottom");
        }, fadeSpeed);
    }
    else if (currentPlanetLocation == PlanetLocation.RightBottom)
    {
        currentPlanetLocation = PlanetLocation.Centered;
        setTimeout(function() {
            document.getElementById("page-top").style.background = "radial-gradient(at " + currentPlanetLocation  + ", " + planetColors[randomNumber] + " 10%, rgba(0,0,0,1) 100%)";
            document.getElementById("main_planet").classList.remove("bg-planet-1-right-bottom");
            document.getElementById("moon_planet").classList.remove("bg-planet-2-right-bottom");
            document.getElementById("moon_planet_2").classList.remove("bg-planet-3-right-bottom");
            document.getElementById("main_planet").classList.add("bg-planet-1");
            document.getElementById("moon_planet").classList.add("bg-planet-2");
            document.getElementById("moon_planet_2").classList.add("bg-planet-3");
        }, fadeSpeed);
    }

}

function toggleSettings()
{
    if (!settings)
    {
        $("#randomize_button").fadeIn("slow");
        $("#change_location").fadeIn("slow");
        settings = true;
    }
    else
    {
        $("#randomize_button").fadeOut("slow");
        $("#change_location").fadeOut("slow");
        settings = false;
    }
}