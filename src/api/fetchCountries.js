const BASE_URL = 'https://restcountries.com/v3.1/name';

async function fetchCountries(name) {
	const response = await fetch(
		`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
	);
	if (response.ok) {
		return response.json();
	}
	throw new Error(`HTTP error ${response.status}`);
};

export { fetchCountries };