/**
 * Created by maksim.bulakhau on 4/26/2017.
 */
import { optionAll, citySelectId, countrySelectId } from "./constants";
import { service } from "../core/stores";

function initDropdown(dropdownId, dataPromise) {
    const dropdown = document.getElementById(dropdownId);

    dropdown.add(new Option(optionAll));
    return dataPromise.then(dataItems => {
        dataItems.forEach(item => {
            dropdown.add(new Option(item.name, item.name));
        });
    });
}

function clearDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);

    while (dropdown.options.length > 0) {
        dropdown.remove(0);
    }
}

function setSelectedValue(dropdownId, value) {
    const dropdown = document.getElementById(dropdownId);

    for (const item of dropdown.options){
        if (item.value == value) {
            item.selected = true;
            break;
        }
    }
}

function updateCitiesDropdown(countryName) {
    clearDropdown(citySelectId);
    let selector = countryName == optionAll ? service.cities : service.getCitiesByCountry(countryName);

    return initDropdown(citySelectId, selector);
}

function updateCountriesDropdown(cityName) {
    if (document.getElementById(countrySelectId).value != optionAll) {
        return;
    }

    const country = service.getCountryByCity(cityName);

    country.then(countries => {
        const countryName = countries[0].name;
        setSelectedValue(countrySelectId, countryName);
        updateCitiesDropdown(countryName).then(done => setSelectedValue(citySelectId, cityName));
    });
}

export { updateCitiesDropdown, updateCountriesDropdown, initDropdown };
