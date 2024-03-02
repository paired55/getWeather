export async function getWeatherData(query) {
	const weatherData = await fetch(
		`http://api.weatherapi.com/v1/current.json?key=95e4d93b6db54c189bc204447240103&q=${query}`,
		{ mode: 'cors' }
	);
	const response = await weatherData.json();
	return response;
}
