export function fetchCountry(countryName){
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=capital,name,population,languages,flags`).then((response) => {
        return response.json();
    })
}