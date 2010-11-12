var win = Titanium.UI.currentWindow;

var db = Titanium.Database.open('bike_mileage');

var average_mileage = 0;
function calculate_mileage() {
	var first_reading = 0;
	var last_reading = 0;

	var sum_fuel_filled = 0;
	var last_fuel_filled = 0;

	var rows = db.execute("SELECT * FROM bike_mileage");
	var first = 0;
	while (rows.isValidRow()) {
	  if(first==0) {
	    first_reading = parseInt(rows.fieldByName('current_reading'));
	    first = 1;
	  }
	  last_reading = parseInt(rows.fieldByName('current_reading'));

	  last_fuel_filled = parseInt(rows.fieldByName('fuel_filled'));
	  sum_fuel_filled += last_fuel_filled;

	  rows.next();
	}
	rows.close();

	if(first_reading>0) {
	  average_mileage = (last_reading - first_reading) / (sum_fuel_filled - last_fuel_filled)
	}
}

calculate_mileage();

var controlsView = Ti.UI.createView({
  width:270,
  height:'auto'
});

var l = Titanium.UI.createLabel({
	top:50,
	left:10,
	width:300,
	height:'auto',
	color:'#777',
	font:{fontSize:13},
	text:'Average mileage : ' + average_mileage.toString()
});

var recalculate = Titanium.UI.createButton({
	title:'Recalculate',
	width:'auto',
	height:35,
	top:120,
	left:50,
});

controlsView.add(l);
controlsView.add(recalculate);
win.add(controlsView);

recalculate.addEventListener('click', function(e) {
  calculate_mileage();
  l.text = 'Average mileage : ' + average_mileage.toString();
});

win.addEventListener('focus', function(e) {
  Ti.App.Info("Window got focus");
});
