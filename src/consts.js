/**
 * Created by maksim.bulakhau on 4/26/2017.
 */
// HTML ids, classes and string consts
const optionAll = "All";
const citySelectId = "selectCity";
const countrySelectId = "selectCountry";
const pagingClass = "paging";
const pagingUnitClass = "page";
const currentPagingUnitClass = "current-page";
const tableContainerId = "resultTableWrapper";

let itemsPerPage = 10;

// Require all json files
const cities = require("../data/cities.json");
const countries = require("../data/countries.json");
const stores = require("../data/stores.json");
const streets = require("../data/streets.json");
const zips = require("../data/zips.json");
const brands = require("../data/brands.json");
let fs = require("fs-web");

// IndexedDB keys for jsons
const citiesKey = "cities.json";
const countriesKey = "countries.json";
const storesKey = "stores.json";
const streetsKey = "streets.json";
const zipsKey = "zips.json";
const brandsKey = "brands.json";

export { itemsPerPage,
    fs, cities, countries, stores, streets, zips, brands,
    optionAll, citySelectId, countrySelectId,
    citiesKey, countriesKey, storesKey, streetsKey, zipsKey, brandsKey,
    pagingClass, pagingUnitClass, tableContainerId, currentPagingUnitClass };
