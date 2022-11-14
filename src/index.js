import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


searchBox.addEventListener('input', debounce(searchCountryName, DEBOUNCE_DELAY));

function markupCountryList(countries) {
	const markup = countries
		.map(({ name, flags }) => {
			return `<li class="country-item">
               	<img src="${flags.svg}" width="35" height="25" alt="Flag of ${name.official}">
                	<h1>${name.official}</h1>
                </li>`;
		})
		.join('');
	countryList.insertAdjacentHTML('afterbegin', markup);
};
function markupCountryInfo(countries) {
	const { name, capital, population, flags, languages } = countries;
	const markup = `<ul class="country-list info-list">
                		<li class="country-item">
                		<img src="${flags.svg}" width="30" height="20" alt="Flag of ${name.official}">
							<h1>${name.official}</h1>
							</li>
							<li class="country-item"><p><span>Capital: </span>${capital[0]}</p></li>
							<li class="country-item"><p><span>Population: </span>${population}</p></li>
							<li class="country-item"><p><span>Languages: </span>${Object.values(languages)}</p></li>
            		</ul>`;
	countryInfo.insertAdjacentHTML('afterbegin', markup);
};

function searchCountryName() {
	let name = searchBox.value.trim();
	clearInput();
	if (name === '') return;
	fetchCountries(name)
		.then(countries => {
			if (countries.length > 10) {
				Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
				return;
			} else if (countries.length >= 2 && countries.length <= 10) {
				markupCountryList(countries);
			} else if (countries.length === 1) {
				markupCountryInfo(...countries);
			}
		})
		.catch(error => {
			Notiflix.Notify.failure("Oops, there is no country with that name");
		});
};
function clearInput() {
	countryList.innerHTML = '';
	countryInfo.innerHTML = '';
};
