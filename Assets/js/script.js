var setAPI = 'b49c190a93d17e0d31cab295a04d7160';
var cityLocation = "Austin, Texas"

var today = dayjs().format('MM/DD/YYYY');

var searchButton = document.querySelector('.search');
var preconfigButton = document.querySelector('.cityButton');
var searchBox = document.querySelector('#searchInput');

var forcastBox = document.querySelector('#forCard');

async function fetchData(cityLocation) {
    for (i = 0; i < 5; i++) {
      var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityLocation + '&appid=' + setAPI + '&units=imperial&cnt=' + i;
      const response = await fetch(url);
      const data = await response.json();
      var futureDate = (dayjs().add(i, 'day') );
      var futureDate = futureDate.format('MM/DD/YYYY');
  
      var temp = Math.round(data.main.temp);
      var weatherCondition = data.weather[0].description;
      var iconDetail = data.weather[0].id;
      var windSpeed = data.wind.speed;
  
      var weatherInfo = {
        Tempurature: temp,
        Condition: weatherCondition,
        Wind: windSpeed,
        Symbol: iconDetail
      };
  
      localStorage.setItem(futureDate, JSON.stringify(weatherInfo));

      addForcast(futureDate);


    }
  }

function getStorageData(key, data){
    var storedArray = JSON.parse(localStorage.getItem(key));
  
    if (data === "temp"){
      return storedArray.Tempurature;
    } else if (data === "cond"){
      return storedArray.Condition;
    } else if (data === "wind"){
      return storedArray.Wind
    } else if (data === "icon"){
      return symbolReturn(storedArray.Symbol);
    } else {
      console.log("Error! Bad data format!")
    }
  };
  
function symbolReturn(id){
    if (200 <= id && id <= 232) {
      return '⛈';
    } else if (300 <= id && id <= 321) {
      return '🌧';
    } else if (500 <= id && id <= 531) {
      return '🌦';
    } else if (600 <= id && id <= 622) {
      return '❄';
    } else if (700 <= id && id <= 781) {
      return '🌫';
    } else if (801 <= id && id <= 804) {
      return '⛅';
    } else if (id === 800) {
      return '☀';
    } else {
      return '🚫';
    }
  };
  
function addForcast(date){
  var forcastEl = document.querySelector('#forCard');

  var cardEl = document.createElement('div');
  cardEl.setAttribute('class', 'card fiveCard');
  cardEl.setAttribute('style', 'width: 12rem;');

  var cardBody = document.createElement('div');
  cardBody.setAttribute('class', 'card-body');

  var dateEl = document.createElement('h5');
  dateEl.setAttribute('class', 'card-title');
  dateEl.textContent = date;

  var iconEl = document.createElement('h6');
  iconEl.setAttribute('class', 'card-subtitle mb-2');
  iconEl.textContent = getStorageData(date,"icon");

  var tempEl = document.createElement('p');
  tempEl.setAttribute('class', 'card-text');
  tempEl.textContent = "Temp:" + getStorageData(date, "temp");

  var windEl = document.createElement('p');
  windEl.setAttribute('class', 'card-text');
  windEl.textContent = "Wind:" + getStorageData(date, "wind");

  var condEl = document.createElement('p');
  condEl.setAttribute('class', 'card-text');
  condEl.textContent = "Conditons:" + getStorageData(date, "cond");

  cardBody.appendChild(dateEl);
  cardBody.appendChild(iconEl);
  cardBody.appendChild(tempEl);
  cardBody.appendChild(windEl);
  cardBody.appendChild(condEl);

  cardEl.appendChild(cardBody);

  forcastEl.appendChild(cardEl);

}


  
searchButton.addEventListener('click', function() {
    console.log('The search button was clicked!');
    forcastBox.innerHTML = "";
    
    fetchData(searchBox.value);
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('cityButton')) {
    console.log('A city button was clicked!');
    forcastBox.innerHTML = "";
    var cityId = event.target.id;

    console.log(cityId);

    if (cityId === "atlanta"){
      fetchData("Atlanta, Georgia");
    } else if (cityId === "denver"){
      fetchData("Denver, Colorado");
    } else if (cityId === "seattle"){
      fetchData("Seattle, Washington");
    } else if (cityId === "sanfran"){
      fetchData("San Francisco, California");
    } else if (cityId === "orlando"){
      fetchData("Orlando, Florida");
    } else if (cityId === "newyork"){
      fetchData("New York City, New York");
    } else if (cityId === "chicago"){
      fetchData("Chicago, Illinois");
    } else if (cityId === "austin"){
      fetchData("Austin, Texas");
    } else{
      console.log("Bad button value!");
    }
  }
});



var cityButtons = document.querySelectorAll(".cityButton");
cityButtons.forEach(function(button) {
  button.addEventListener("click", function(event) {
    var cityName = event.target.value;
    fetchData(cityName);
  });
});




fetchData("Austin, Texas");