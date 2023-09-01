'use strict';

const countryInfo = document.querySelector('.country-info');

const getCountryList = () => {
  const countryList = document.querySelector('.country-list');

  fetch('https://restcountries.com/v3.1/all').then((res) =>
    res.json().then((data) => {
      data.forEach((country) => {
        countryList.innerHTML += `
            <div class="country">
                <a href="" class="country-name">${country.name.common}</a>
                <img src="${country.flags.png}" alt="${country.flags.alt}" width="80" height="50">
            </div>
        `;
      });
    })
  );
};

const getNeighbours = (countryCode) => {
  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.geodatasource.com/v2/neighboring-countries?key=KFHDLBTYYUAUPTKRC7JHMWTGQBTLJ7L0&country_code=${countryCode}`
  )
    .then((res) => res.json())
    .then((data) =>
      data.forEach((neighbour) => {
        console.log(neighbour.country_name);
        countryInfo.innerHTML += `
          <p>${neighbour.country_name}</p>
        `;
      })
    );
};

const renderNeighbours = () => {
  document.addEventListener('click', (e) => {
    e.preventDefault();

    const countryName = e.target.textContent;
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((res) => res.json())
      .then((data) => {
        const countryCode = data[0].cca2;
        getNeighbours(countryCode);
      });
  });
};

const app = () => {
  getCountryList();
  renderNeighbours();
};

app();
