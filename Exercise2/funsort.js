function reset()
{
    var numberRow = document.getElementById('numberRow');
    // Loop through all the spans
    for(i = 0; i < numberRow.children.length; i++)
    {
        // Generate a random number between 1-10000
        var value = Math.floor((Math.random() * 10000) + 1);
        // Set the span's innerHTMl to this number
        document.getElementById("drag"+(i+1)).innerHTML = value;
    }
}

function init()
{
    reset();

    if(typeof(Storage) !== "undefined")
    {
        var num_played = 0;
        document.getElementById('test').innerHTML = "Games played: " + num_played;
        localStorage.setItem("played", num_played);
    } 
    else 
    {
        document.getElementById('test').innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function allowDrop(ev)
{
    // Prevent the default browser action
    ev.preventDefault();
}

function drag(ev)
{
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev)
{
    // Prevent the default browser action
    ev.preventDefault();
    // The ID and HTML of the dragged
    var draggedID = ev.dataTransfer.getData("text");
    var draggedHTML = document.getElementById(draggedID).innerHTML;
    // HTML of the 'onto' landing span.
    var ontoHTML = ev.target.innerHTML;
    // Swap their contents
    ev.target.innerHTML = draggedHTML;
    document.getElementById(draggedID).innerHTML = ontoHTML;
    // Check if we're sorted
    checkVictory();
}

function getValue(val)
{
    var tmp = val.match(/\d+/g);
    return tmp[1];
}

function checkVictory()
{
    var numberRow = document.getElementById('numberRow');
    // Start at 1, for us to be able to look back 1 when comparing
    for(i = 1; i < numberRow.children.length; i++)
    {
        // Get i-1 as previous
    	var prev = numberRow.children[i-1];
	    var prevVal = parseInt(getValue(prev.innerHTML));
        // Get i as current
	    var cur = numberRow.children[i];
	    var curVal = parseInt(getValue(cur.innerHTML));
        // If the previous number is larger than the current, then we're not sorted.
        if(prevVal > curVal) 
        {
            // And we return to avoid falling through the for loop
            return;
        }
    }
    // At this point, we know that the spans are indeed in sorted order
    alert("VICTORIOUS!!!!!!");
    // Reset the game, thereby readying for another game
    reset();
    // Up the number of games played
    if(typeof(Storage) != "undefined")
    {
        var prevPlayed = localStorage.getItem("played");
        var newPlayed = parseInt(prevPlayed)+1;
        document.getElementById('test').innerHTML = "Games played: " + newPlayed;
        localStorage.setItem("played", newPlayed);
    } 
    else 
    {
        document.getElementById('test').innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}
