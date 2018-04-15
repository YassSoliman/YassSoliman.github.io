var url;
var weather;
var Unit = "C";

$(document).ready(function(){
    $.getJSON('https://ipinfo.io', getData);
    $("#tempSign").click(function(){
        console.log("clicked");
        changeSettings();
    });
});

function getData(data){
    if(Unit === "C"){
        url = 'https://api.openweathermap.org/data/2.5/weather?q=' + data.city + '&appid=59bff5d9fc12770d8371984fa921faf9&units=metric';
    }else if(Unit === "F"){
        url = 'https://api.openweathermap.org/data/2.5/weather?q=' + data.city + '&appid=59bff5d9fc12770d8371984fa921faf9&units=imperial';
    }
    $("#location").html(data.city + ", " + data.country);
    $.getJSON(url, getInfo);
}

function getInfo(info){
    $("#temperature").html(info.main.temp);
    $("#weatherStatus").html(info.weather[0].description);
    $("#icon").attr("src","https://openweathermap.org/img/w/" + info.weather[0].icon + ".png");
};

function changeLetter() {
    if (Unit === "C") {
        Unit = "F";
        $("#tempSign").html("&deg;F");
    } else if (Unit === "F") {
        Unit = "C";
        $("#tempSign").html("&deg;C");
    }
}

function changeSettings(){
    changeLetter();
    $.getJSON('https://ipinfo.io', getData);
}



