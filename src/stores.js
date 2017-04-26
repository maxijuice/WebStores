/**
 * Created by maksim.bulakhau on 4/19/2017.
 */
import { fs, citiesKey, brandsKey, streetsKey, countriesKey, zipsKey, storesKey } from "./consts";

let service = (function() {

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
        const resultArray = [];

        filters.forEach(function(filter) {
            let temp = sourceArray.filter( sourceItem => filter[filterProp] == sourceItem[sourceItemProp]);
            temp.forEach(filtered => resultArray.push(filtered));
        });
        
        return resultArray;
    }

    // This method works for occasions, when filter is a string already
    function getByName(filter, sourceArray) {
        return sourceArray.filter(sourceItem => sourceItem.name.search(filter) != -1);
    }

    // Public methods for different purposes, which are wrappers on resolveJson calls
    function getStoresByCity(cityName) {
        return resolveJson(citiesKey, getByName, cityName)
            .then(resolveJson.bind(null, zipsKey, getByProp.bind(null, "name", "city")))
            .then(resolveJson.bind(null, storesKey, getByProp.bind(null, "zip", "zip")));

    }

    function getStoresByCountry(countryName) {
        return resolveJson(countriesKey, getByName, countryName)
            .then(resolveJson.bind(null, citiesKey, getByProp.bind(null, "name", "country")))
            .then(resolveJson.bind(null, zipsKey, getByProp.bind(null, "name", "city")))
            .then(resolveJson.bind(null, storesKey, getByProp.bind(null, "zip", "zip")));
    }

    function getCitiesByCountry(countryName) {
        return resolveJson(countriesKey, getByName, countryName)
            .then(resolveJson.bind(null, citiesKey, getByProp.bind(null, "name", "country")));
    }

    function getCountryByCity(cityName) {
        return resolveJson(citiesKey, getByName, cityName)
            .then(resolveJson.bind(null, countriesKey, getByProp.bind(null, "country", "name")));
    }

    function getTable(path) {
        return resolveJson(path, getByName, "");
    }

    return {
        cities: getTable(citiesKey),
        countries: getTable(countriesKey),
        getCitiesByCountry,
        getCountryByCity,
        getStoresByCity,
        getStoresByCountry
    };
})();

export { service };