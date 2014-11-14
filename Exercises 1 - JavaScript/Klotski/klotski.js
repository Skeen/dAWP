// TODO: Row and column is badly confused
// Selected color
var selected_color   = "#ffff00";
var unselected_color = "#ff0000";

// Generate game board array
var game_width  = 4;
var game_height = 5;

var game_board = [];
for(column = 0; column < game_width; column++) {
    var row_array = [];
    for(row = 0; row < game_height; row++) {
        var div_name = 'd' + row + column;
        row_array.push(div_name);
    }
    game_board.push(row_array);
}

// Generate game board html
var size = 100;
var margin = 10;
var start_x = window.innerWidth/2 - (game_width * (size + margin))/2;

var div = document.getElementById('game_field');
for(row = 0; row < game_board.length; row++) {
    for (column = 0; column < game_board[row].length; column++) {
        var div_name = game_board[row][column];
        var child_div = document.createElement('div');
        child_div.id = div_name;
        child_div.style.width  = size + 'px';
        child_div.style.height = size + 'px';
        child_div.style.backgroundColor = unselected_color; 
        child_div.style.left = (start_x + row * (size + margin)) + "px";
        child_div.style.top  = (margin + column * (size + margin)) + "px";
        child_div.style.position = "absolute";
        child_div.style.textAlign="center";

        var content = document.createTextNode(div_name);
        child_div.appendChild(content);

        div.appendChild(child_div);
    }
}

// Generate game board logic
var game_logic = [['1', '0', '0', '2'],
                  ['1', '0', '0', '2'],
                  ['3', '4', '4', '5'],
                  ['3', '6', '7', '5'],
                  ['8', ' ', ' ', '9']];
/*
var game_logic = [['1', '2', '3', '4'],
                  ['1', '2', '3', '4'],
                  ['0', '0', '5', '6'],
                  ['0', '0', ' ', ' '],
                  ['7', '8', '9', '9']];
*/

for(row = 0; row < game_board.length; row++) {
    for (column = 0; column < game_board[row].length; column++) {
        var div_name = game_board[row][column];
        var child_div = document.getElementById(div_name);

        child_div.innerHTML = game_logic[column][row];
    }
}

// Highlight the selected block-number
function mark_selected(block_number) {
    if (block_number === " ") return;

    // Change color for selection of a new block
    for(row = 0; row < game_board.length; row++) {
        for (column = 0; column < game_board[row].length; column++) {
            var div_name = game_board[row][column];
            var child_div = document.getElementById(div_name);
            if(child_div.innerHTML == String(block_number)) {
                child_div.style.backgroundColor = selected_color; 
            } else {
                child_div.style.backgroundColor = unselected_color;
            }
        }
    }
    // Write out the collected to our div
    var selected_span = document.getElementById('selected');
    selected_span.innerHTML = String(block_number);
}

// Default select 0
mark_selected('0');

// Register selection handler for each div
for(row = 0; row < game_board.length; row++) {
    for (column = 0; column < game_board[row].length; column++) {
        var div_name = game_board[row][column];
        var child_div = document.getElementById(div_name);
        
        // When a div is clicked, select it
        child_div.addEventListener('click',
				   function() {
				       mark_selected(this.innerHTML);
				   },
				   false);
    }
}

var check_for_victory = function() {
    var d41 = document.getElementById('d41');
    var d42 = document.getElementById('d42');

    if (d41.innerHTML === "0" && d42.innerHTML === "0")
	alert("Victory");
}

// Handle keyboard input.
// direction can be; left, up, right or down.
function handle_movement(direction) {
    var selected_string = document.getElementById('selected').innerHTML;
    if(selected == ' ') {
        return;
    }
    var selected = Number(selected_string);
    
    // Decide if we're able to do the requested move
    var move_valid = true;
    // Check for invalid moves, and set move_valid false if we hit such one
    for(row = 0; row < game_board.length; row++) {
        if (!move_valid) break;
        for (column = 0; column < game_board[row].length; column++) {
            if (!move_valid) break;
            var div_name = game_board[row][column];
            var child_div = document.getElementById(div_name);
            if(child_div.innerHTML == String(selected)) {
                // This is the one we're looking for, assert that
                // we're able to move in the requested direction.
                // 
                // We can move, if we;
                // * Keep inside the game board.
                // * Don't hit a number which isn't ours
                // TODO: Handle the case were the above/below, whatever is outside the board
                // TODO: Remove huge code duplication below
                switch(direction) {
                case 'left':
                    console.log(column);
                    if (row === 0) {
                        move_valid = false;
                    } else {
                        // Get the div to left
                        var div_left_name = game_board[row-1][column];
                        var left_div = document.getElementById(div_left_name);
			
                        // If the below is not empty, or ourselfs, we cannot move there
                        if(!(left_div.innerHTML == " " || left_div.innerHTML == selected))
                        {
                            move_valid = false;
                        }
                        break;
                    }
                case 'up':
                    if (column === 0) {
                        move_valid = false;
                    } else {
                        // Get the div above
                        var div_above_name = game_board[row][column-1];
                        var above_div = document.getElementById(div_above_name);
			
                        // If the below is not empty, or ourselfs, we cannot move there
                        if(!(above_div.innerHTML == " " || above_div.innerHTML == selected))
                        {
                            move_valid = false;
                        }
                        break;
                    }
                case 'right':
                    if (row === game_board.length-1) {
                        move_valid = false;
                    } else {
                        // Get the div to right
                        var div_right_name = game_board[row+1][column];
                        var right_div = document.getElementById(div_right_name);
			
                        // If the below is not empty, or ourselfs, we cannot move there
                        if(!(right_div.innerHTML == " " || right_div.innerHTML == selected)) {
                            move_valid = false;
                        }
                        break;
                    }
                case 'down':
                    if (column === game_board[row].length-1) {
                        move_valid = false;
                    } else {
                        // Get the div below
                        var div_below_name = game_board[row][column+1];
                        var below_div = document.getElementById(div_below_name);
			
                        // If the below is not empty, or ourselfs, we cannot move there
                        if(!(below_div.innerHTML == " " || below_div.innerHTML == selected)) {
                            move_valid = false;
                        }
                        break;
                    }
                }
            }
        }
    }
    
    if(move_valid) {
	var target_divs = [];
	var child_divs = [];

        // Do the requested move
        for(row = 0; row < game_board.length; row++) {
            for (column = 0; column < game_board[row].length; column++) {
                var div_name = game_board[row][column];
                var child_div = document.getElementById(div_name);
                if(child_div.innerHTML == String(selected)) {
                    var target_div;
                    switch(direction) {
                    case 'left':
                        // Get the div to left
                        var div_left_name = game_board[row-1][column];
                        target_div = document.getElementById(div_left_name);
                        break;
                    case 'up':
                        // Get the div above
                        var div_above_name = game_board[row][column-1];
                        target_div = document.getElementById(div_above_name);
                        break;
                    case 'right':
                        // Get the div to right
                        var div_right_name = game_board[row+1][column];
                        target_div = document.getElementById(div_right_name);
                        break;
                    case 'down':
                        // Get the div below
                        var div_below_name = game_board[row][column+1];
                        target_div = document.getElementById(div_below_name);
                        break;

                    }
                    child_divs.push(child_div);
		    target_divs.push(target_div);
                }
            }
        }
	for (i = 0; i<child_divs.length; i++)
	    child_divs[i].innerHTML = " ";
	for (i = 0; i<target_divs.length; i++)
	    target_divs[i].innerHTML = String(selected);
        // Refresh selection
        mark_selected(selected);
	check_for_victory();
    }
}

// Handle key presses
function handle_key_input(e) {
    // Get the pressed key
    var pressed_key = window.event ? event.keyCode: e.keyCode;
    if(pressed_key && pressed_key > 36 && pressed_key < 41) {
        // An arrow key was pressed
        var arrow_keys = {'37':'left', '38':'up', '39':'right', '40':'down'};
        handle_movement(arrow_keys[pressed_key]);
    }
}
// Register handler for key presses
document.onkeydown = handle_key_input;
