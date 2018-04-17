$(document).ready(function(){
    $("#search").keyup(function(){
        var searchQuery = $("#search").val();
        $.ajax({
            url: 'https://en.wikipedia.org/w/api.php',
            dataType: "jsonp",
            data: {
              action: 'query',
              format: 'json',
              prop: 'extracts',
              exchars: '500',
              exlimit: 'max',
              explaintext: '',
              exintro: '',
              rawcontinue: '',
              generator: 'search',
              gsrsearch: searchQuery,
            },
            success: function(data) {
            $("#results").empty();
                var i = data.query.pages;
                for(var j in i){
                $("#results").append(
                '<a href="https://en.wikipedia.org/wiki/' + i[j].title + '" target="_blank">' + 
                  '<article id="result">' + 
                   '<h2>' + i[j].title + '</h2>' +
                   '<p>' + i[j].extract + '</p>' + 
                  '</article>' + 
                  '</a>'
                );
              }
            }
          });
    });
});