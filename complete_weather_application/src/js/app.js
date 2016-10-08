/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */


var UI = require('ui');

var startUpCard = new UI.Card( {
  subtitle: 'Made by Bhargav',
  body: 'Made in INDIA',
  style: 'small',
  title: 'Welcome to Weather App',
  backgroundColor: 'yellow'
});

startUpCard.show();

startUpCard.on('click','select',function(e) {
  startUp();
});

function startUp() {
var Menu = new UI.Menu({
  backgroundColor: 'black',
  textColor: 'white',
  highlightBackgroundColor: 'green',
  highlightTextColor: 'red',
  sections: [{
    title: 'My City List',
    items: [{
      title: 'Bridgeport',
      subtitle: 'City of fun with killings'
    }, {
      title: 'Dallas',
      subtitle: 'Mini India'
    }, {
      title: 'New York',
      subtitle: 'City that never sleeps'
    }, {
      title: 'Detroit',
      subtitle: 'Automobile capital'
    } , {
      title: 'Miami',
      subtitle: 'Famous for beaches'
    } , {
      title: 'San Francisco',
      subtitle: 'Good for beaches'
    } , {
      title: 'Trumbull',
      subtitle: 'The town I live'
    } , {
      title: 'Washington D C',
      subtitle: 'Capital City'
    } , {
      title: 'Las Vegas',
      subtitle: 'Whatever happens there will stay there'
    }, {
      title: 'Bangalore',
      subtitle: 'Garden City'
    }, {
      title: 'Hyderabad',
      subtitle: 'City of Pearls'
    }, {
      title: 'Chennai',
      subtitle: 'Automobile Capital'
    }, {
      title: 'Delhi',
      subtitle: 'Indian Capital'
    } , {
      title: 'Mumbai',
      subtitle: 'Indian Financial Capital'
    } , {
      title: 'Kolkata',
      subtitle: 'Bengal Tiger'
    } , {
      title: 'Ooty',
      subtitle: 'Honeymoon'
    } , {
      title: 'Guntur',
      subtitle: 'Andhra Pradesh new Capital city'
    } , {
      title: 'Warangal',
      subtitle: 'Shivanath favorite City'
    }]
  }]
});

Menu.show();

Menu.on('select',function(e) {
   weatherReport(e.item.title);
});
  
}
  
var parseFeed = function(data, quantity) {
  var items = [];
  for(var i = 0; i < quantity; i++) {
    var title = data.list[i].weather[0].main;
    var temp = Math.round(data.list[i].main.temp - 273.15) + ' C';
    title = title.charAt(0).toUpperCase() + title.substring(1);
    title = temp + '  ' + title;
    var time = data.list[i].dt_txt;
    time = time.substring(time.indexOf('-')+1, time.indexOf(':') + 3);
    
    items.push({
      title:title,
      subtitle:time
    });
  }
  
  return items;
};

function weatherReport(cityName){
var card = new UI.Card({
  title:'Weather',
  body:'Fetching...',
  style:'large',
  scrollable:true
});

// Display the Card
card.show();
card.on('click','select', function(e) {
    ajax  (
      {
      url: 'http://api.openweathermap.org/data/2.5/forecast?q='+cityName+'&appid=45b059433bebd3ff4885be4bf7e59a7c',
      type: 'json'
      },
      function(data) {
        var menuItems = parseFeed(data, 10);
        var resultsMenu = new UI.Menu({
        sections: [{
        title: cityName,
        items: menuItems
      }]
    });
    resultsMenu.show();
    }
  );
    });
var ajax = require('ajax');
//var cityName = 'Bangalore';
//var myAPIKey = '45b059433bebd3ff4885be4bf7e59a7c';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=45b059433bebd3ff4885be4bf7e59a7c';
ajax(
{
  url:URL,
  type: 'json'
},
 function(data) {
   console.log('Successfully got weather data');
   var location = data.name;
   var temperature = Math.round(data.main.temp - 273.15) + ' C';
   
   var description = data.weather[0].description;
   description = description.charAt(0).toUpperCase() + description.substring(1);
   card.subtitle(location + ', ' + temperature);
   console.log(location + ', ' + temperature);
   card.body(description + ', Humidity: ' + data.main.humidity);
   console.log(description + ', Humidity: ' + data.main.humidity + '%');
   
 },
  function(error) {
    card.subtitle('Not working');
    card.body('Yes');
  }
);
  
   
}
/**var Vector2 = require('vector2');

var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    var card = new UI.Card();
    if(e.itemIndex === 1)
      {
       card.subtitle('Main file with a simple menu and cards in it.'); 
      }
    else
      {
    card.title('Perfect Start');
    card.subtitle('The item is titled "' + e.item.title + '"');
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
      }
    card.show();
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});*/