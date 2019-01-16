const PubSub = require('../helpers/pub_sub.js');

const CountryView = function (container) {
  this.container = container;
};

CountryView.prototype.bindEvents = function () {
  PubSub.subscribe('Country:selected-country-ready', (evt) => {
    const country = evt.detail;
    this.render(country);
  });
};

CountryView.prototype.render = function (country) {
  this.container.innerHTML = '';

  const countryName = this.createElement('h2', country.name);
  this.container.appendChild(countryName);

  const countryRegion = this.createElement('h3', country.region);
  this.container.appendChild(countryRegion);

  const countryFlag = this.createElement('img');
  countryFlag.src = country.flag
  countryFlag.classList.add('flag-image')
  this.container.appendChild(countryFlag);

  const languageList = this.createLanguageList(country.languages);
  this.container.appendChild(languageList);
};

CountryView.prototype.createElement = function (elementType, text) {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

CountryView.prototype.createLanguageList = function (languages) {
  const list = document.createElement('ul');

  languages.forEach((language) => {
    const listItem = document.createElement('li');
    listItem.textContent = language.name;
    list.appendChild(listItem);
  });

  return list;
};

module.exports = CountryView;
