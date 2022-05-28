let positionButton = document.querySelector("#position-button");
  positionButton.addEventListener("click", getCurrentPosition)

  function displayPositionInfos(position)
  {

          let city = document.querySelector(".city-element");
          city.innerHTML = `<span class="capitalize"> ${position.data.name} </span>`;
          let detailsElement = document.querySelector(".details-element");
          detailsElement.innerHTML = position.data.weather[0].main;
          let humidityElement = document.querySelector("#humidity-element");
          humidityElement.innerHTML = `${position.data.main.humidity}%`;
          let windElement = document.querySelector("#wind-element");
          windElement.innerHTML = `${Math.round(position.data.wind.speed)} km/h`;
          let descriptionElement = document.querySelector(".description-element");
          descriptionElement.innerHTML = position.data.weather[0].description;
          let weekDay = document.querySelector("#week-day");
          weekDay.innerHTML = `${day}`;
          let minuteElement = document.querySelector("#minute-element");
          minuteElement.innerHTML = minute;
          let hourElement = document.querySelector("#hour-element");
          hourElement.innerHTML = hour + "h";
          let iconElement = document.querySelector("#icon");
          iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${position.data.weather[0].icon}@2x.png`);
          let temperatureElement = document.querySelector("#temperature-element");
          temperatureElement.innerHTML = Math.round(position.data.main.temp);
  }
  function showPosition(position)
  {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "a4fb4ddbf2b13a9459eb4e9f970296ce";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    

    axios.get(apiUrl).then(displayPositionInfos);
    console.log(latitude);
    console.log(longitude);
  }

  function getCurrentPosition(position)
  {
  navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  function search(event)
  {
      event.preventDefault();
      let searchCityInput = document.querySelector("#search-city-input")
      let city = document.querySelector("#city");

      
        function displayInfos(response)
        {
          console.log(response);

          let city = document.querySelector(".city-element");
          city.innerHTML = `<strong class="capitalize"> ${response.data.name} </strong>`;
          let detailsElement = document.querySelector(".details-element");
          detailsElement.innerHTML = response.data.weather[0].main;
          let humidityElement = document.querySelector("#humidity-element");
          humidityElement.innerHTML = `${response.data.main.humidity}%`;
          let windElement = document.querySelector("#wind-element");
          windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
          let descriptionElement = document.querySelector(".description-element");
          descriptionElement.innerHTML = response.data.weather[0].description;
          let weekDay = document.querySelector("#week-day");
          weekDay.innerHTML = `${day}`;
          let minuteElement = document.querySelector("#minute-element");
          minuteElement.innerHTML = minute;
          let hourElement = document.querySelector("#hour-element");
          hourElement.innerHTML = hour + "h";
          let iconElement = document.querySelector("#icon");
          iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
          iconElement.setAttribute("alt", `${response.data.weather[0].description}`)
          let temperatureElement = document.querySelector("#temperature-element");
          temperatureElement.innerHTML = Math.round(response.data.main.temp);
        }

        let apiKey = "a4fb4ddbf2b13a9459eb4e9f970296ce";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&units=metric&appid=${apiKey}`;

        axios.get(apiUrl).then(displayInfos);
        
        city.innerHTML = searchCityInput.value;
        searchCityInput.value = null;
      
      if (searchCityInput == "")
      {
          alert("You must search for a city to know its temperature.");
          city.innerHTML = null;
          if (temperatureElement)
          {
          let temperatureElement = document.querySelector("#temperature");
          temperatureElement.innerHTML = null;
          }
      }
  }

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", search);

    let currentDate = document.querySelector("#current-date");
    let now = new Date();

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[now.getDay()];

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = months[now.getMonth()];
    let hour = now.getHours();
    if (hour < 10)
    {
      hour = `0${hour}`;
    }
    let minute = now.getMinutes();
    if (minute < 10)
    {
      minute = `0${minute}`;
    }
    let sentence =`${day} ${month} ${now.getDate()}, ${hour}h${minute}, ${now.getFullYear()}`;
    currentDate.innerHTML = sentence;