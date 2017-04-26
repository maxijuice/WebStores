/**
 * Created by maksim.bulakhau on 4/21/2017.
 */
import {storesService} from "./stores-service";


(function initPageDropdowns() {
    initDropdown("selectCountry", storesService.countries);
    initDropdown("selectCity", storesService.cities);
})();


function clearDropdown(dropdownId) {
    let dropdown = document.getElementById(dropdownId);
    while (dropdown.options.length > 0) {
        dropdown.remove(0);
    }
}

function initDropdown(dropdownId, dataPromise) {
    let dropdown = document.getElementById(dropdownId);
    dropdown.add(new Option("All"));
    return dataPromise.then(dataItems => {
        dataItems.forEach(item => {
            dropdown.add(new Option(item.name, item.name));
        });
    });
}

function getSelectedValue(dropdownId) {
    let dropdown = document.getElementById(dropdownId);
    return  dropdown.selectedOptions[0].value;
}

function setSelectedValue(dropdownId, value) {
    let dropdown = document.getElementById(dropdownId);
    for (let item of dropdown.options){
        if (item.value == value) {
            item.selected = true;
            break;
        }
    }
}

function updateCitiesDropdown(countryName) {
    clearDropdown("selectCity");
    let selector = countryName == "All" ? storesService.cities : storesService.getCitiesByCountry(countryName);
    return initDropdown("selectCity", selector);
}

function updateCountriesDropdown(cityName) {
   if (getSelectedValue("selectCountry") != "All") {
       return;
   }

   let country = storesService.getCountryByCity(cityName);
   country.then(countries => {
       let countryName = countries[0].name;
       setSelectedValue("selectCountry", countryName);
       updateCitiesDropdown(countryName).then(done => setSelectedValue("selectCity", cityName));
    });
}

function initStoresTable() {

    // Delete previous table.
    let div = document.getElementById("resultTableWrapper");
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }

    let selectedCity = getSelectedValue("selectCity");
    let stores = [];
    if (selectedCity == "All") {
        let selectedCountry = getSelectedValue("selectCountry");
        selectedCountry = selectedCountry == "All" ? "" : selectedCountry;
        stores = storesService.getStoresByCountry(selectedCountry);
    } else {
        stores = storesService.getStoresByCity(selectedCity);
    }

    // Create table with proper bootstrap classes.
    let table = document.createElement("table");
    table.classList.add("table");
    table.classList.add("table-striped");
    table.classList.add("table-hover");

    stores.then(stores => {
        if (stores.length > 0) {

            // Table head init.
            let propNames = Object.getOwnPropertyNames(stores[0]);
            let headRow = document.createElement("tr");
            propNames.forEach(propName => {
                let cell = document.createElement("th");
                let cellText = document.createTextNode(propName);
                cell.appendChild(cellText);
                headRow.appendChild(cell);
            });
            table.appendChild(headRow);

            // Table data init.
            stores.forEach(store => {
                let row = document.createElement("tr");
                propNames.forEach(property => {
                    let cell = document.createElement("td");
                    let cellText = document.createTextNode(store[property]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                })
                table.appendChild(row);
            });
        } else {
            let errorMsg = document.createElement("tr");
            errorMsg.innerHTML = "No results found";
            table.appendChild(errorMsg);
        }
        div.appendChild(table);
    });
}

export { initStoresTable, updateCitiesDropdown, updateCountriesDropdown, getSelectedValue };
