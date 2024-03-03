export async function getFlagData(query) {
	const flagData = await fetch(`https://restcountries.com/v3.1/name/${query}`, {
		mode: 'cors',
	});
	const response = await flagData.json();
	return response;
}
