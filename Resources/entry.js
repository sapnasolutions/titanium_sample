var win = Titanium.UI.currentWindow;
var db = Titanium.Database.open('bike_mileage');
var currentReading = '';
var fuelFilled = '';


var controlsView = Ti.UI.createView({
  width:270,
  height:'auto'
});
 

var cr = Titanium.UI.createTextField({
	width:250,
	height:35,
	left:0,
        top:20,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText:'Current meter reading...'
});

var fuel = Titanium.UI.createTextField({
	width:250,
	height:35,
	left:0,
	top:70,
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText:'Fuel...'
});

var save = Titanium.UI.createButton({
	title:'Save',
	width:60,
	height:35,
	top:120,
	left:100,
});

var l = Titanium.UI.createLabel({
	top:190,
	left:10,
	width:300,
	height:'auto',
	color:'#777',
	font:{fontSize:13},
	text:'Your activity will be shown here...'
});

cr.addEventListener("change", function(e) {
	currentReading = e.value;
});

fuel.addEventListener("change", function(e) {
	fuelFilled = e.value;
});

save.addEventListener("click", function(e) {
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  var dt = day + "/" + month + "/" + year;
  l.text = "To Save Reading: " + currentReading + " And fuel filled: " + fuelFilled + " on date: " + dt + " to database.";
  db.execute('INSERT INTO bike_mileage (current_reading, fuel_filled, created_at) VALUES(?, ?, ?)',currentReading, fuelFilled, dt);
  l.text = "Succesfully entered record.";
});

controlsView.add(cr);
controlsView.add(fuel);
controlsView.add(save);
controlsView.add(l);
win.add(controlsView);
