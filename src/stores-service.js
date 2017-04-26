/**
 * Created by maksim.bulakhau on 4/19/2017.
 */
let fs = require("fs-web");
let cities = require("../data/cities.json");
let countries = require("../data/countries.json");
let stores = require("../data/stores.json");
let streets = require("../data/streets.json");
let zips = require("../data/zips.json");
let brands = require("../data/brands.json");

(function initFs() {
    fs.writeFile("cities.json", JSON.stringify(cities))
        .then(() => fs.writeFile("countries.json", JSON.stringify(countries)))
        .then(() => fs.writeFile("stores.json", JSON.stringify(stores)))
        .then(() => fs.writeFile("brands.json", JSON.stringify(brands)))
        .then(() => fs.writeFile("zips.json", JSON.stringify(zips)))
        .then(() => fs.writeFile("streets.json", JSON.stringify(streets)));
})();

var storesService = (function () {

    function resolveJson(path, onDone, filters) {
        return new Promise(function resolver(resolve, reject) {
            fs.readString(path)
                .then(data => resolve(onDone(filters, JSON.parse(data)))
                    , error => reject(error));
        });
    }

    // This method requires to be pre-binded with first two arguments,
    // each for property names of filter and readed json correspondinly
    function getByProp(filterProp, sourceItemProp, filters, sourceArray) {
        let resultArray = [];
        filters.forEach(function (filter) {
            let temp = sourceArray.filter(sourceItem => filter[filterProp] === sourceItem[sourceItemProp]);
            temp.forEach(filtered => resultArray.push(filtered));
        });
        return resultArray;
    }

    // This method works for occasions, when filter is a string already
    function getByName(filter, sourceArray) {
        return sourceArray.filter(sourceItem => sourceItem.name.search(filter) !== -1);
    }

    // Public methods for different purposes, which are wrappers on resolveJson calls
    function getStoresByCity(cityName) {
        return resolveJson("cities.json", getByName, cityName)
            .then(resolveJson.bind(null, "zips.json", getByProp.bind(null, "name", "city")))
            .then(resolveJson.bind(null, "stores.json", getByProp.bind(null, "zip", "zip")));

    }

    function getStoresByCountry(countryName) {
        return resolveJson("countries.json", getByName, countryName)
            .then(resolveJson.bind(null, "cities.json", getByProp.bind(null, "name", "country")))
            .then(resolveJson.bind(null, "zips.json", getByProp.bind(null, "name", "city")))
            .then(resolveJson.bind(null, "stores.json", getByProp.bind(null, "zip", "zip")));
    }

    function getCitiesByCountry(countryName) {
        return resolveJson("countries.json", getByName, countryName)
            .then(resolveJson.bind(null, "cities.json", getByProp.bind(null, "name", "country")));
    }

    function getCountryByCity(cityName) {
        return resolveJson("cities.json", getByName, cityName)
            .then(resolveJson.bind(null, "countries.json", getByProp.bind(null, "country", "name")));
    }

    function getTable(path) {
        return resolveJson(path, getByName, "");
    }

    return {
        cities: getTable("cities.json"),
        countries: getTable("countries.json"),
        getCitiesByCountry,
        getCountryByCity,
        getStoresByCity,
        getStoresByCountry
    };
})();

export {storesService};