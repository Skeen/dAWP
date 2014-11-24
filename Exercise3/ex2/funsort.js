function reset(){
    for(i = 1; i <= 10; i++){
        var value = Math.floor((Math.random() * 10000) + 1);
        var span = "#sp"+i;
        $(span).text(value);
    }
}

$(function() {
    $("#sortable").sortable({
        update: function(event, ui){
            checkVictory();
        }
    });
    $("#sortable").disableSelection();

    reset();

    if(typeof(Storage) !== "undefined"){
        var num_played = 0;
        document.getElementById('playedGames').innerHTML = "Games played: " + num_played;
        localStorage.setItem("played", num_played);
    } else {
        document.getElementById('playedGames').innerHTML = "Sorry, your browser does not support Web Storage...";
    }
});

function checkVictory(){
    var isSorted = true;

    $("#sortable span").each(function(){
        $current = $(this);
        $next = $current.parent().next().find("span");

        if($next.length > 0){
            if(parseInt($current.text(), 10) > parseInt($next.text(), 10)){
                isSorted = false;
            }
        }
       // console.log($current.text() + " > " + $next.text() + " is " + (parseInt($current.text(), 10) > parseInt($next.text(), 10)));
    })
    //console.log(isSorted);
    //console.log("--------------------------------------------");

    if(isSorted){
        alert("VICTORIOUS!!!!!!");
        reset();
        // Up the number of games played
        if(typeof(Storage) != "undefined"){
            var prevPlayed = localStorage.getItem("played");
            var newPlayed = parseInt(prevPlayed)+1;
            document.getElementById('playedGames').innerHTML = "Games played: " + newPlayed;
            localStorage.setItem("played", newPlayed);
        } else {
            document.getElementById('playedGames').innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    }
}
