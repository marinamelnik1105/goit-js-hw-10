import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const div = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const countryName = e.target.value.trim();
  if (!countryName) {
    clearCountry();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        clearCountry();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            position: 'center-top',
          }
        );
      } else if (data.length === 1) {
        clearCountry();
        createMarkupEl(data);
      } else {
        clearCountry();
        createMarkup(data);
      }
      if (data === []) {
        clearCountry();
        return;
      }
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name.', {
        position: 'center-top',
      });
    });

  function clearCountry() {
    list.innerHTML = '';
    div.innerHTML = '';
  }
  function createMarkup(arr) {
    const markup = arr
      .map(
        ({ name, flags }) => `
<li class="country-item">
        <img class="country-flag" src="${flags.svg}" alt="flag ${name.official}">
        <h2>${name.official}</h2>
      </li>`
      )
      .join('');
    list.insertAdjacentHTML('beforeend', markup);
  }
}
function createMarkupEl(el) {
  const markup = el
    .map(
      ({ flags, name, capital, population, languages }) => `
   <div class="mini-container">
        <img class="country-flg" src="${flags.svg}"
             alt="flag">
        <h2 class="country-name">${name.official}</h2>
      </div>
      <ul>
        <li>
          <p class="title-info">Capital: <span class="info">${capital}
            </span >
          </p>
        </li>
        <li>
          <p class="title-info">Population:
            <span class="info">${population}
            </span>
          </p>
        </li>
        <li>
          <p class="title-info">Languages:
            <span class="info">${Object.values(languages)}
            </span>
          </p>
        </li>
      </ul>`
    )
    .join('');
  div.insertAdjacentHTML('beforeend', markup);
}
