var win = Titanium.UI.currentWindow;
var db = Titanium.Database.open('bike_mileage');

var data = [];
var rows = db.execute("SELECT * FROM bike_mileage ORDER BY id desc LIMIT 5");
while (rows.isValidRow()) {
  data.push({
    title: "On: " + rows.fieldByName('created_at') + ", Reading was : " + rows.fieldByName('current_reading') + " And you filled: " + rows.fieldByName('fuel_filled'),
    id: rows.fieldByName('id')
  });
  rows.next();
}
rows.close();

var tableview = Titanium.UI.createTableView({
	data:data,
	editable:true,
	top:50
});

win.add(tableview);
