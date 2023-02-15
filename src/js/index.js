import Notiflix from 'notiflix';
import '../css/styles.css';
import { fetchCountry } from './fetchCountries';
import {debounce} from 'lodash';

const DEBOUNCE_DELAY = 300;

const countryListDOM = document.querySelector('.country-list')
const countryInfoDOM = document.querySelector('.country-info')

let input = document.querySelector('input')

console.log(213123123);

input.addEventListener('input', debounce((event)=>{
    let countryInfo ='', countryList ='';
    if(event.target.value === ''){
        countryListDOM.innerHTML =''
        countryInfoDOM.innerHTML =''
    }
    else{
    fetchCountry(event.target.value)
        .then((data) => {
            if(data.message != undefined){
                countryInfoDOM.innerHTML = '';
                countryListDOM.innerHTML = ''
                Notiflix.Notify.failure('Oops, there is no country with that name.')
            }
            if(data.length === 1){
                countryListDOM.innerHTML = ''
                const langKey = Object.keys(data[0].languages)
                let languagesStr = ''
                langKey.forEach((e)=>{languagesStr+=data[0].languages[e]+', '})
                countryInfo = `<div class='flag-name-wrap'><img class = 'country-flag' src = '${data[0].flags.svg}' alt='country falg'></img>
                                <h1 class ='country-name'>${data[0].name.official}</h1></div>
                                <p class='capital info-item'><b>Capital:</b> ${data[0].capital.join(', ')}</p>
                                <p class='population info-item'><b>Population:</b> ${data[0].population}</p>
                                <p class ='languages info-item'><b>Languages:</b> ${languagesStr}</p>`;
                countryInfoDOM.innerHTML = countryInfo
            }
            if(data.length > 1 && data.length <= 10){
                countryInfoDOM.innerHTML = '';
                const countrysNames =  data.flatMap((country) => country.name.official)
                countrysNames.forEach((el, index) => {
                    countryList+=`<li class = 'svg-name-wraper-list'>
                                <img class = 'country-flag' src = '${data[index].flags.svg}' alt='country falg' width='50'></img>
                                <p class ='country-name'>${el}</p></li>`
                })
                countryListDOM.innerHTML = countryList
            }
            if(data.length > 15){
                countryInfoDOM.innerHTML = '';
                countryListDOM.innerHTML = ''
                Notiflix.Notify.info('Too many matchese found. Please enter a more specific name.')
            }
            
        })
    }
}, DEBOUNCE_DELAY))