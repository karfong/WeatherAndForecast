const city = document.getElementById('city');
const sendCity = document.getElementById('send');
const optionWeather = document.getElementById('current_weather');
const optionForecast = document.getElementById('weather_forecast');
const weatherContainer = document.querySelector("#weather-container");
const forecastContainer = document.querySelector("#forecast-container");

console.log(optionForecast);
optionWeather.addEventListener("click",weatherView);
optionForecast.addEventListener("click",forecastView);
sendCity.addEventListener("click",postCity);

function postCity(){
    if(city.value){
        weatherContainer.classList.remove("d-none");
        optionWeather.checked = true;
    }else{
        weatherContainer.classList ="card mt-4 d-none";
        optionWeather.checked = false;
    }

    let api = "https://api.openweathermap.org/data/2.5/";
    let key = "500b2d399383c8663e45c2302460f8be";

    fetch(api + 'weather?q=' + city.value + '&appid=' + key + '&units=metric')
        .then(response => response.json())
        .then(response => {
        
            //console.log(response);

            let icon = response.weather[0].icon;

            weatherContainer.innerHTML = `
            <div class="card-body mx-auto">
                <h2 class="text-title">City,${city.value}</h2>
                <p>
                    Current Temperature: ${response.main.temp}°C
                    <br />
                    Feels Like: ${response.main.feels_like} °C<br><br>
                    Max: ${response.main.temp_max}°C,Min: ${response.main.temp_min}°C
                </p> <br />
                ${response.weather[0].main}:<br>${response.weather[0].description}<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather">
            </div>
            `;
            
        });

    fetch(api + 'forecast?q=' + city.value + '&appid=' + key + '&units=metric')
        .then(response => response.json())
        .then(response =>{
          if(response.cod == "200"){
            let h2 = document.querySelector('#forecast-container h2');
            let container = document.getElementById('body');
            let cards = '';

            for(let i = 0; i < response.list.length; i++){
                let w = response.list[i];

                let d = new Date(w.dt_txt);
                let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

                let dt = d.getUTCDate() +' '+ months[d.getUTCMonth()]+' '+d.getFullYear();

                cards += `
                <tr>
                    <td><img src="https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png" alt=""></td>
                    
                    <td>
                        <i class="fa fa-calender-chec-o" aria-hidden="true"></i> ${dt}<br>
                        <i class="fa fa-clock-o" aria-hidden="true">${w.dt_txt.substring(11,16)}</i>
                    </td>
                    <td>
                        <h3 class="text-info">${w.main.temp}°C</h3>
                        <small>Min: ${w.main.temp_min}°C<br>Max: ${w.main.temp_max}°C</small>
                    </td>
                   
                    <td>
                        ${w.weather[0].main}<br>
                        ${w.weather[0].description}
                    </td>
                   
                </tr>
                `;
            }

            h2.innerHTML = "City," + city.value;
            container.innerHTML = cards;
          }else{
              alert("City not found !");
          }
        });
}

function weatherView(){
    if(optionWeather.checked == true){
        if(city.value){
            weatherContainer.classList.remove("d-none");
        }else{
            weatherContainer.classList = "card mt-4 d-none";
        }
    }
}

function forecastView(){
    if(optionForecast.checked == true){
        if(city.value){
            forecastContainer.classList.remove("d-none");
        }else{
            forecastContainer.classList = "card mt-4 d-none";
        }
    }
}