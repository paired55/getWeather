import { getWeatherData } from './weatherData.js';
const searchForm = document.querySelector('form');
const countryName = document.querySelector('#countryName');
const cityName = document.querySelector('#cityName');
const localTime = document.querySelector('#localTime');
const temp = document.querySelector('#temp');
const currency = document.querySelector('#currency');
const switchButtonText = document.querySelector('.switchButtonText');
const switcher = document.querySelector('#switcher');

switcher.addEventListener('click', () => {
	if (switchButtonText.textContent === 'C°') {
		switchButtonText.textContent = 'F°';
	} else {
		switchButtonText.textContent = 'C°';
	}
});

// Append default city 'cairo' on page load
getWeatherData('cairo').then((data) => {
	countryName.textContent = `${data.location.country},`;
	cityName.textContent = `${data.location.name}`;
	localTime.textContent = `${data.location.localtime}`;
});

// Adjust page content based on user's query
searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const userQuery = document.querySelector('input').value.trim();

	getWeatherData(userQuery)
		.then((data) => {
			countryName.textContent = `${data.location.country},`;
			cityName.textContent = `${data.location.name}`;
			localTime.textContent = `${data.location.localtime}`;
		})
		.catch((err) => {
			countryName.textContent = `No match found!`;
			cityName.textContent = `Make sure of proper spaces`;
			localTime.textContent = `Example: "new york" not "newyork"`;
		});
});
