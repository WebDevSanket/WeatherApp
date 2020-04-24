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
          const { main, name, sys, weather } = data;
          timezone.textContent = name + ", " + sys.country;
          tmpDegree.textContent = main.temp;
          tmpDescMain.textContent = weather[0].main.toUpperCase();
          convertUnits(main.temp);
          tmpIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        }
      })
      .catch((err) => {
        console.log("Error! ", err);
      });
  }

  function convertUnits(temp) {
    let celsius = (temp - 32) * (5 / 9);
    tmpSection.addEventListener("click", function (e) {
      if (tmpUnit.textContent === "F") {
        tmpDegree.textContent = Math.floor(celsius);
        tmpUnit.textContent = "C";
      } else {
        tmpDegree.textContent = temp;
        tmpUnit.textContent = "F";
      }
    });
  }

  /** Caching with Service Worker API Start */
  //STEP 1 REGISTER
  // Checck the SW support
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw_cache_site.js");
  }
  /** Caching with Service Worker API End */
});
