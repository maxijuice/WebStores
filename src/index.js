/**
 * Created by maksim.bulakhau on 4/21/2017.
 */
import { fs, cities, streets, countries, brands, zips, stores,
    citiesKey, streetsKey, countriesKey, brandsKey, zipsKey, storesKey } from "./web-components/constants";
import { citySelectId, countrySelectId } from "./web-components/constants";
import * as dropdowns from "./web-components/dropdowns";
import * as tables from "./web-components/table";
import { service } from "./core/stores";

(function initFs(done) {
    fs.writeFile(citiesKey, JSON.stringify(cities))
        .then(() => fs.writeFile(countriesKey, JSON.stringify(countries)))
        .then(() => fs.writeFile(storesKey, JSON.stringify(stores)))
        .then(() => fs.writeFile(brandsKey, JSON.stringify(brands)))
        .then(() => fs.writeFile(zipsKey, JSON.stringify(zips)))
        .then(() => fs.writeFile(streetsKey, JSON.stringify(streets)))
        .then(() => {done});
})();

(function initPageDropdowns() {
    dropdowns.initDropdown(countrySelectId, service.countries);
    dropdowns.initDropdown(citySelectId, service.cities);
})();

export { tables, dropdowns };