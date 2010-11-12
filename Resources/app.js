// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

var db = Titanium.Database.open('bike_mileage');
db.execute('CREATE TABLE IF NOT EXISTS bike_mileage (id INTEGER PRIMARY KEY, current_reading char(50), fuel_filled char(5), created_at datetime)');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var currentMileageWindow = Titanium.UI.createWindow({  
    url:'mileage.js',
    title:'Bike Mileage',
    backgroundColor:'#fff'
});

var addEntryWindow = Titanium.UI.createWindow({  
    url:'entry.js',
    title:'Add Entry',
    backgroundColor:'#fff'
});

var listingWindow = Titanium.UI.createWindow({  
    url:'listing.js',
    title:'Mileage Listing',
    backgroundColor:'#fff'
});

var currentMilageTab = Titanium.UI.createTab({  
    title:'Current Mileage',
    window:currentMileageWindow
});

var addEntryTab = Titanium.UI.createTab({  
    title:'Add Entry',
    window:addEntryWindow
});

var listingTab = Titanium.UI.createTab({  
    title:'Mileage Listing',
    window:listingWindow
});

//
//  add tabs
// 
tabGroup.addTab(currentMilageTab);
tabGroup.addTab(addEntryTab);
tabGroup.addTab(listingTab);

/*tabGroup.addEventListener('focus', function(e)
{
  setTimeout(function()
    {       
        Ti.API.info('tab changed to ' + tabGroup.activeTab);        
    },100);

  if(tabGroup.activeTab==0) {
    Ti.API.info('Opening win1');
    var win1 = Titanium.UI.createWindow({  
      url:'mileage.js',
      title:'Bike Mileage',
      backgroundColor:'#fff'
    });
    tabGroup.tabs[tabGroup.activeTab].show;
    Ti.API.info('Opened win1');
  } else if(tabGroup.activeTab==2) {
    Ti.API.info('Opening win1');
    var win2 = Titanium.UI.createWindow({  
      url:'listing.js',
      title:'Mileage Listing',
      backgroundColor:'#fff'
    });
    tabGroup.tabs[tabGroup.activeTab].show;
    Ti.API.info('Opened win2');
  }

});*/

// open tab group
tabGroup.open();
