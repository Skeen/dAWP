function init(){
    for(i=1; i<11; i++){
	var tmp = Math.floor((Math.random() * 10000) + 1);
	document.getElementById("drag"+i).innerHTML = tmp;
    }

    if(typeof(Storage) !== "undefined"){
	var tmp = 0;
	document.getElementById('test').innerHTML = "Games played: " + tmp;
	localStorage.setItem("played", tmp);
    } else {
	document.getElementById('test').innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

function reset(){
    for(i=1; i<11; i++){
	var tmp = Math.floor((Math.random() * 10000) + 1);
	document.getElementById("drag"+i).innerHTML = tmp;
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    var tmp1 = document.getElementById(data).innerHTML;
    var tmp2 = ev.target.innerHTML;

    //document.getElementById('test1').innerHTML = tmp1;
    //document.getElementById('test2').innerHTML = tmp2;

    ev.target.innerHTML = tmp1;
    document.getElementById(data).innerHTML = tmp2;
    checkVictory();
}

function getValue(val){
    var tmp = val.match(/\d+/g);
    return tmp[1];
}

function div1Val(ev){
    thenum = (ev.target.id).match(/\d+/)[0]; // "3"
    alert("target: " + ev.target.id + "   id: " + thenum);

}

function checkVictory(){
    var numberRow = document.getElementById('numberRow');

    var prevVal, curVal;
    for (i = 0; i < numberRow.children.length; i++) {
	var td = numberRow.children[i];
	curVal = parseInt(getValue(td.innerHTML));
	// Due to first iteration
	if (prevVal) {
	    if (prevVal > curVal) return;
	}
	
	prevVal = curVal;
    }

    alert("VICTORIOUS!!!!!!");
    reset();
    if(typeof(Storage) != "undefined"){
	var tmp = localStorage.getItem("played");
	//alert("tmp: " + tmp);
	var tmp2 = parseInt(tmp)+1;
	//alert("tmp2: " + tmp2)
	document.getElementById('test').innerHTML = "Games played: " + tmp2;
	localStorage.setItem("played", tmp2);
    } else {
	document.getElementById('test').innerHTML = "Sorry, your browser does not support Web Storage...";
    }
    
    /*
    var val1 = parseInt(getValue(document.getElementById('td1').innerHTML));
    var val2 = parseInt(getValue(document.getElementById('td2').innerHTML));
    var val3 = parseInt(getValue(document.getElementById('td3').innerHTML));
    var val4 = parseInt(getValue(document.getElementById('td4').innerHTML));
    var val5 = parseInt(getValue(document.getElementById('td5').innerHTML));
    var val6 = parseInt(getValue(document.getElementById('td6').innerHTML));
    var val7 = parseInt(getValue(document.getElementById('td7').innerHTML));
    var val8 = parseInt(getValue(document.getElementById('td8').innerHTML));
    var val9 = parseInt(getValue(document.getElementById('td9').innerHTML));
    var val10 = parseInt(getValue(document.getElementById('td10').innerHTML));
    

    
    //alert(val1+", "+val2+", "+val3+", "+val4+", "+val5+", "+val6+", "+val7+", "+val8+", "+val9+", "+val10);
    if(val1<val2 && val2<val3){
	//alert("TEST1");
	if(val3<val4 && val4<val5){
	    //	alert("TEST2");
	    if(val5<val6 && val6<val7){
		//		alert("TEST3");
		if(val7<val8 && val8<val9){
		    //			alert("TEST4");
		    if(val9<val10){
			//			alert("TEST5");
			alert("VICTORIOUS!!!!!!");
			reset();
			if(typeof(Storage) != "undefined"){
			    var tmp = localStorage.getItem("played");
			    //alert("tmp: " + tmp);
			    var tmp2 = parseInt(tmp)+1;
			    //alert("tmp2: " + tmp2)
			    document.getElementById('test').innerHTML = "Games played: " + tmp2;
			    localStorage.setItem("played", tmp2);
			} else {
			    document.getElementById('test').innerHTML = "Sorry, your browser does not support Web Storage...";
			}
		    }

		}
	    }
	}
    }

    */
}
