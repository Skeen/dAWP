// The ids' of the possible toppings
var toppings = ['sprinkles', 'choco_chip', 'straw_syrup', 'banana_flakes', 'caramel_sauce'];
// Function checking the constraints
function constraint_check()
{
    // Find the number of toppings currently picked
    var num_checked = 0;
    toppings.forEach(function(topping)
    {
        var checkbox = document.getElementById(topping);
        if(checkbox.checked)
        {
            num_checked++;
        }
    });
    // Max 3 toppings
    if(num_checked > 3)
    {
        // Return warning
        return 'A maximum of three toppings may be selected';
    }

    // var liquid_toppings = [];
    var strawberry_checkbox = document.getElementById('straw_syrup');
    var caramel_checkbox = document.getElementById('caramel_sauce');

    // Check for invaldi topping combinations
    if(strawberry_checkbox.checked && caramel_checkbox.checked)
    {
        // Return warning
        return 'Strawberry syrup and caramel sauce cannot be chosen together';
    }

    // At this point, all is good
    return undefined;
}

// Invokes the constraint checker, and writes the error, if any, to the error-div.
function error_setter()
{
    var error_div = document.getElementById('error');
    error_div.value = "";

    var constraint_error = constraint_check();
    if(constraint_error != undefined)
    {
        error_div.value = constraint_error;
    }
}

// Every change to the topping checkboxes, should rerun the constraint checker
toppings.forEach(function(topping)
{
    document.getElementById(topping).addEventListener('change', error_setter, false);
});

// Invokes the constraint checker, and alerts the error, if any.
function constraint_alerter()
{
    var constraint_error = constraint_check();
    if(constraint_error != undefined)
    {
        alert(constraint_error);
    }
    else
    {
        var form = document.getElementById('submit_action');
        form.click();
    }
}

// Pushing the submit button, should alert with errors
document.getElementById('submit').addEventListener("click", constraint_alerter);

