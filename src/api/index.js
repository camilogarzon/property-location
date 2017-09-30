import config from './config.js'
import axios from 'axios';

const apiUrl = config.apiUrl;

export default {
    propertiesWithMarket: [],
    markets: [],
    getProperties: function () {
        const url = `${apiUrl}properties`;
        return axios.get(url)
            .then(function (response) {
                return response.data;
            }).catch(function (error) { console.log(error.message); });
    },
    postProperty: function (data) {
        const url = `${apiUrl}properties`;
        return axios.post(url, data)
            .then(function (response) {
                return response.data;
            }).catch(function (error) { console.log(error.message); });
    },
    putProperty: function (data) {
        const url = `${apiUrl}properties/${data.id}`;
        return axios.put(url, data)
            .then(function (response) {
                return response.data;
            }).catch(function (error) { console.log(error.message); });
    },
    getMarkets: function () {
        const url = `${apiUrl}markets`;
        return axios.get(url)
            .then(function (response) {
                return response.data;
            }).catch(function (error) { console.log(error.message); });
    },
    getMarket: function (marketId) {
        const url = `${apiUrl}markets/${marketId}`;
        return axios.get(url)
            .then(function (response) {
                return response.data;
            }).catch(function (error) { console.log(error.message); });
    },
    getCountries: function () {
        const url = `${apiUrl}countries`;
        return axios.get(url)
            .then(function (response) {
                return response.data;
            }).catch(function (error) { console.log(error.message); });
    },
    getPropertiesWithMarkets: function() {
        let self = this;
        return this.getMarkets()
            .then(function (markets) {
                self.markets = markets;
                return self.getProperties()
                    .then(function (properties) {
                        self.propertiesWithMarket = [];
                        properties.forEach(function(property){
                            let marketName ='';
                            for(let i in self.markets) {
                                if(self.markets[i].id == property.marketId) {
                                    marketName = self.markets[i].name;
                                    break;
                                }
                            }
                            let p = property;
                            p.marketName = marketName;
                            self.propertiesWithMarket.push(p);
                        });
                        return self.propertiesWithMarket;
                    });
            });
    }
}
