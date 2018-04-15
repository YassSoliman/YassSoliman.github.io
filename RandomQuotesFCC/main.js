var data = {
    Quotes: ["We know what we are, but know not what we may be.", 
  "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", 
  "Be yourself; everyone else is already taken.", 
  "You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth."],
    Authors: ["William Shakespeare", "Albert Einstein", "Oscar Wilde", "William W. Purkey"]
  };

$(document).ready(function(){
    generateQuote();
    $("#generate").click(function(){
        generateQuote();
        
    });
});

function generateQuote(){
    var random = Math.round(Math.random()*(data.Quotes.length-1));
    console.log(random);
    $("#quote").text(data.Quotes[random]);
    $("#author").text(data.Authors[random]);
    $("#tweet").empty();
        twttr.widgets.createShareButton('', document.getElementById("tweet"), {
            text: '"' + data.Quotes[random] + '"' + " -" + data.Authors[random] 
        });
};