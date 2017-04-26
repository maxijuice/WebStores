/**
 * Created by maksim.bulakhau on 4/26/2017.
 */
import { itemsPerPage } from "./consts";
import { citySelectId, countrySelectId, optionAll, 
    tableContainerId, currentPagingUnitClass, pagingClass, pagingUnitClass } from "./consts";
import ArrayLibrary from "./arraylib.es6";
import { service } from "./stores";

var dataSet;

function getDataSet() {
    const selectedCity = document.getElementById(citySelectId).value;
    let stores = [];

    if (selectedCity === optionAll) {
        let selectedCountry = document.getElementById(countrySelectId).value;
        selectedCountry = selectedCountry === optionAll ? "" : selectedCountry;
        stores = service.getStoresByCountry(selectedCountry);
    } else {
        stores = service.getStoresByCity(selectedCity);
    }

    return stores;
}

function initStoresTable(data, page) {

    // Delete previous table.
    const tableWrapperDiv = document.getElementById(tableContainerId);
    while(tableWrapperDiv.firstChild) {
        tableWrapperDiv.removeChild(tableWrapperDiv.firstChild);
    }

    // Create table with proper bootstrap classes.
    const storesTable = document.createElement("table");
    storesTable.classList.add("table", "table-striped", "table-hover");

    data.then(stores => {
        if (stores.length > 0) {

            const data  = ArrayLibrary.chain(stores).skip((page - 1) * itemsPerPage).take(itemsPerPage).value();

            // Table head init.
            const propNames = Object.getOwnPropertyNames(stores[0]);
            const headRow = document.createElement("tr");

            propNames.forEach(propName => {
                const cell = document.createElement("th");
                const cellText = document.createTextNode(propName);
                cell.appendChild(cellText);
                headRow.appendChild(cell);
            });

            storesTable.appendChild(headRow);

            // Table data init.
            data.forEach(store => {
                const row = document.createElement("tr");

                propNames.forEach(property => {
                    const cell = document.createElement("td");
                    const cellText = document.createTextNode(store[property]);
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                });

                storesTable.appendChild(row);
            });
        } else {
            const errorMsg = document.createElement("tr");
            errorMsg.innerHTML = "No results found";
            storesTable.appendChild(errorMsg);
        }

        tableWrapperDiv.appendChild(storesTable);

        // Enable paging if result set is too big
        if (stores.length > itemsPerPage){
            initPaging((stores.length / itemsPerPage).toFixed(), page);
        }
    });
}

function submitStoresSearch() {
    dataSet = getDataSet();
    initStoresTable(dataSet, 1);
}

function goToPage(pageNum) {
    initStoresTable(dataSet, pageNum);
}

function initPaging(pagesAmount, currentPage) {
    let tableContainerDiv = document.getElementById(tableContainerId);
    let paging = document.createElement("div");
    paging.classList.add(pagingClass);

    for (let i = 1; i <= pagesAmount; i++) {
        let page = document.createElement("a");
        page.setAttribute("href", "#");
        page.innerHTML = i;
        page.classList.add(pagingUnitClass);
        page.addEventListener("click", goToPage.bind(null, i));
        if (i == currentPage) {
            page.classList.add(currentPagingUnitClass);
        }

        paging.appendChild(page);
    }

    tableContainerDiv.appendChild(paging);
}

export { submitStoresSearch };