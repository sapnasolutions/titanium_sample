var win = Titanium.UI.currentWindow;
var db = Titanium.Database.open('bike_mileage');

var data = [];
function fetch_data() {
	var rows = db.execute("SELECT * FROM bike_mileage ORDER BY id desc LIMIT 5");
	while (rows.isValidRow()) {
	  data.push({
	    title: "On: " + rows.fieldByName('created_at') + ", Reading was : " + rows.fieldByName('current_reading') + " And you filled: " + rows.fieldByName('fuel_filled'),
	    id: rows.fieldByName('id')
	  });
	  rows.next();
	}
	rows.close();
}

fetch_data();
var tableview = Titanium.UI.createTableView({
	data:data,
	editable:true,
	top:70
});

var refreshData = Titanium.UI.createButton({
	title:'Refresh',
	width:'auto',
	height:35,
	top:20,
	left:100,
});

refreshData.addEventListener('click', function(e) {
  fetch_data();
  tableview.setData(data);
});

win.add(refreshData);
win.add(tableview);
