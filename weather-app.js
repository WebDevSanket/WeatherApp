window.addEventListener("load", function () {
  let long;
  let lat;
  let timezone = document.getElementById("timezone");
  let tmpDegree = document.getElementById("tmp-degree");
  let tmpDescMain = document.getElementById("tmp-desc-main");
  let tmpDesc = document.getElementById("tmp-desc");
  let tmpSection = document.getElementById("tmp");
  let tmpUnit = document.getElementById("tmp-unit");
  let tmpIcon = document.getElementById("icon");
  let windSpeed = document.getElementById("wind-speed");
  let tmpMin = document.getElementById("tmp-min");
  let tmpMax = document.getElementById("tmp-max");
  let sunRise = document.getElementById("sun-rise");
  let sunSet = document.getElementById("sun-set");
  let humidity = document.getElementById("humidity");
  let rain = document.getElementById("rain");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      getWeatherData(long, lat);
    });
  }

  async function getWeatherData(long, lat) {
    // const proxy = "https://cors-anywhere.herokuapp.com/";
    const apiKey = "e4f94b90e8bfeb88b9e4c0be67527208";
    const units = "&units=imperial";
    const apiUrl = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}${units}`;
    await fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          // console.log(data);
          const { main, name, sys, weather, wind } = data;
          timezone.textContent = name + ", " + sys.country;
          tmpDegree.textContent = main.temp;
          tmpMin.textContent = `Min: ${main.temp_min} F`;
          tmpMax.textContent = `Max: ${main.temp_max} F`;
          tmpDescMain.textContent = weather[0].main.toUpperCase();
          tmpDesc.textContent = weather[0].description.toUpperCase();
          windSpeed.textContent = `Wind Speed: ${wind.speed} m/sec ${wind.deg} Deg`;
          humidity.textContent = `Humidity: ${main.humidity} %`;      
          sunRise.textContent = `Sun Rise: ${ new Date(sys.sunrise * 1000).toLocaleTimeString()}`;
          sunSet.textContent = `Sun Set: ${ new Date(sys.sunset * 1000).toLocaleTimeString()}`;
          convertUnits([main.temp, main.temp_max, main.temp_min]);
          tmpIcon.src = `//openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        } else {
          console.log("No Data Received");
        }
      })
      .catch((err) => {
        console.log("Error! ", err);
      });
  }

  function convertUnits(temp) {
    for(let i=0; i < temp.length; i++){
    let celsius = (temp[i] - 32) * (5 / 9);
      tmpSection.addEventListener("click", function (e) {
        if (tmpUnit.textContent === "F") {
          tmpDegree.textContent = Math.floor(celsius);
          tmpUnit.textContent = "C";
          tmpMin.textContent = `Min: ${Math.floor(celsius)} C`;
          tmpMax.textContent = `Max: ${Math.floor(celsius)} C`;
        } else {
          tmpDegree.textContent = temp[i];
          tmpUnit.textContent = "F";
          tmpMin.textContent = `Min: ${temp[i]} F`;
          tmpMax.textContent = `Max: ${temp[i]} F`;
        }
      });
    }
  }
});
