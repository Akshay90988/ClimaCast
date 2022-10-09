const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temptemp_real_val = document.getElementById('temp_real_val');

const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');



const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if (cityVal === "") {
        city_name.innerText = 'Plz write the name before search';
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=469d506c2222eafe82e4a0dbac9992f1`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            // console.log(response);

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = Math.floor((arrData[0].main.temp) - 273.15);
            // temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;

            // condition to check sunny or cloudy
            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fa-solid fa-sun' style = 'color:#eccc68;'></i>"
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud' style = 'color:#f1f2f6;'></i>"
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fa-solid fa-cloud-rain' style = 'color:#a4b0be;''></i>"
            } else {
                temp_status.innerHTML = "<i class='fa-solid fa-sun' style = 'color:#eccc68;'></i>"
            }
            // datahide.innerHTML = "<i class='fa-solid fa-cloud' style = 'color:#f1f2f6;'></i>";
            datahide.classList.remove('data_hide');
            cityVal = "";

        } catch {
            cityVal = "";
            datahide.classList.add('data_hide');
            city_name.innerText = 'Plz enter the city name properly';
            console.log('Please enter the proper city name');
        }


    }

}


submitBtn.addEventListener('click', getInfo);