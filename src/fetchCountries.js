export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(resp.statusText);
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops, there is no country with that name.', {
        position: 'center-top',
      });
    });
}
