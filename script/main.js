import { getWeatherData } from './weatherData.js';
import { getFlagData } from './flagData.js';
const searchForm = document.querySelector('form');
const countryName = document.querySelector('#countryName');
const cityName = document.querySelector('#cityName');
const localTime = document.querySelector('#localTime');
const temp = document.querySelector('#temp');
const condition = document.querySelector('#condition');
const switchButtonText = document.querySelector('.switchButtonText');
const switcher = document.querySelector('#switcher');
const countryFlag = document.querySelector('.countryFlag');
let userQuery = '';

// Append default city 'cairo' on page load
getWeatherData('cairo').then((data) => {
	countryName.textContent = `${data.location.country},`;
	cityName.textContent = `${data.location.name}`;
	localTime.textContent = `${data.location.localtime}`;
	temp.textContent = `${data.current.temp_c} C°`;
	condition.textContent = `${data.current.condition.text}`;

	getFlagData(`${data.location.country}`).then((data) => {
		countryFlag.src = data['0']['flags']['svg'];
	});
});

// Adjust page content based on user's query
searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	userQuery = document.querySelector('input').value.trim();

	getWeatherData(userQuery)
		.then((data) => {
			countryName.textContent = `${data.location.country},`;
			cityName.textContent = `${data.location.name}`;
			localTime.textContent = `${data.location.localtime}`;
			condition.textContent = `${data.current.condition.text}`;
			getFlagData(`${data.location.country}`).then((data) => {
				countryFlag.src = data['0']['flags']['svg'];
			});
			if (switchButtonText.textContent === 'C°') {
				temp.textContent = `${data.current.temp_c} C°`;
			} else {
				temp.textContent = `${data.current.temp_f} F°`;
			}
		})
		.catch((err) => {
			countryName.textContent = `No match found!`;
			cityName.textContent = `Please adjust query.`;
			localTime.textContent = ``;
			temp.textContent = ``;
			condition.textContent = ``;
			countryFlag.src = './assets/nomatch.svg';
		});
});

// Switch C to F and vise versa
switcher.addEventListener('click', () => {
	if (switchButtonText.textContent === 'C°') {
		getWeatherData(userQuery || 'cairo').then((data) => {
			temp.textContent = `${data.current.temp_f} F°`;
		});
		switchButtonText.textContent = 'F°';
	} else {
		getWeatherData(userQuery || 'cairo').then((data) => {
			temp.textContent = `${data.current.temp_c} C°`;
		});
		switchButtonText.textContent = 'C°';
	}
});
