
$(document).ready(function(){
    $("#search").keypress(function(evt){
        var searchQuery = $("#search").val();
        $("#livesearch").empty();
        $("#livesearch").css("border", "0px");
        if(evt.key == 'Enter'){
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
                '<a href="https://en.wikipedia.org/wiki/' + i[j].title + ' target="_blank">' + 
                  '<article id="result">' + 
                   '<h2>' + i[j].title + '</h2>' +
                   '<p>' + i[j].extract + '</p>' + 
                  '</article>' + 
                  '</a>'
                );
              }
            }
          }); //End of ajax
        }
    });

    /* // In progress, trying to make a suggestion search bar
    // TODO: remove the suggestion box when user clicks away/presses search
    $("#search").keyup(function(){
        var searchQuery = $("#search").val();
        if(searchQuery != ''){            
            $.ajax({
                url: 'https://en.wikipedia.org/w/api.php',
                dataType: 'jsonp',
                data: {
                    action: 'opensearch',
                    format: 'json',
                    search: searchQuery,
                    namespace: '0',
                    limit: 5
                },
                success: function(data) {
                    $("#livesearch").empty();
                    var i = data[1];
                    for(var j in i){
                        $("#livesearch").append(
                            '<a href="https://en.wikipedia.org/wiki/' + i[j] + '" target="_blank">' +
                                i[j] +
                            '</a><br>'
                        );
                    }
                    $("#livesearch").css("border", "1px solid black");
                }
            });
        } else {
            $("#livesearch").empty();
            $("#livesearch").css("border", "0px");
        }
        
    });*/
});