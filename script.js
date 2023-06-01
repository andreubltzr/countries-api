"use strict";
const countryList = document.querySelector(".country-list");

const getCountryList = () => {
  fetch("https://restcountries.com/v3.1/all").then((res) =>
    res.json().then((data) => {
      data.forEach((country) => {
        countryList.innerHTML += `
            <div>
                <p>${country.name.common}</p>
                <img src="${country.flags.png}" alt="${country.flags.alt}" width="80" height="50">
            </div>
        `;
      });
    })
  );
};

const renderContent = () => {
  getCountryList();
};

renderContent();
