const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Country = function () {
  this.data = null;
};


Country.prototype.getData = function() {
  const request = new RequestHelper('https://restcountries.eu/rest/v2/all');
  request.get((data) => {
    console.log(data);
    this.data = data;
    PubSub.publish('Country:country-loaded', this.data);
  });

Country.prototype.bindEvents = function () {
  PubSub.publish('Country:data-ready', this.data);

  PubSub.subscribe('SelectView:change', (evt) => {
    console.log(evt.detail);
    const selectedIndex = evt.detail;
    this.publishCountryDetail(selectedIndex);
  });
};

Country.prototype.publishCountryDetail = function (selectedIndex) {
  const selectedCountry = this.data[selectedIndex];
  PubSub.publish('Country:selected-country-ready', selectedCountry)
};
}

module.exports = Country;
