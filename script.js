let coins = 1000;
let currentShip = "Galleon";
let inventory = [];
let currentLocation = "Portugal";

const goodsPrices = {
    "Portugal": { 
        "Textiles": { buy: 10, sell: 30 }, 
        "Spices": { buy: null, sell: 60 }, 
        "Gold": { buy: null, sell: 85 }, 
        "Ivory": { buy: null, sell: 80 }, 
        "Nutmeg": { buy: null, sell: null }, 
        "Silver": { buy: null, sell: 90 }, 
        "Gunpowder": { buy: 15, sell: 45 }, 
        "Sugar": { buy: null, sell: null }
    },
    "West Africa": { 
        "Textiles": { buy: 15, sell: 50 }, 
        "Spices": { buy: null, sell: 50 }, 
        "Gold": { buy: 30, sell: 70 }, 
        "Ivory": { buy: 25, sell: 70 }, 
        "Nutmeg": { buy: null, sell: null }, 
        "Silver": { buy: null, sell: null }, 
        "Gunpowder": { buy: null, sell: 50 }, 
        "Sugar": { buy: null, sell: null }
    },
    "India": { 
        "Textiles": { buy: 20, sell: 55 }, 
        "Spices": { buy: 30, sell: 85 }, 
        "Gold": { buy: null, sell: null }, 
        "Ivory": { buy: null, sell: null }, 
        "Nutmeg": { buy: null, sell: 70 }, 
        "Silver": { buy: 45, sell: 110 }, 
        "Gunpowder": { buy: 25, sell: 65 }, 
        "Sugar": { buy: null, sell: 60 }
    },
    "Southeast Asia": { 
        "Textiles": { buy: null, sell: null }, 
        "Spices": { buy: 25, sell: 100 }, 
        "Gold": { buy: null, sell: null }, 
        "Ivory": { buy: null, sell: null }, 
        "Nutmeg": { buy: 35, sell: 95 }, 
        "Silver": { buy: 40, sell: 115 }, 
        "Gunpowder": { buy: 20, sell: 75 }, 
        "Sugar": { buy: null, sell: 65 }
    },
    "Ottoman Empire": { 
        "Textiles": { buy: 25, sell: 60 }, 
        "Spices": { buy: 40, sell: 110 }, 
        "Gold": { buy: null, sell: null }, 
        "Ivory": { buy: null, sell: 90 }, 
        "Nutmeg": { buy: null, sell: 110 }, 
        "Silver": { buy: null, sell: 115 }, 
        "Gunpowder": { buy: 30, sell: 85 }, 
        "Sugar": { buy: null, sell: 75 }
    },
    "Americas": { 
        "Textiles": { buy: 20, sell: 55 }, 
        "Spices": { buy: null, sell: 120 }, 
        "Gold": { buy: null, sell: null }, 
        "Ivory": { buy: null, sell: null }, 
        "Nutmeg": { buy: null, sell: 120 }, 
        "Silver": { buy: null, sell: 115 }, 
        "Gunpowder": { buy: null, sell: 100 }, 
        "Sugar": { buy: 20, sell: 80 }
    },
    "Swahili Coast": { 
        "Textiles": { buy: 15, sell: 50 }, 
        "Spices": { buy: null, sell: 95 }, 
        "Gold": { buy: 35, sell: 90 }, 
        "Ivory": { buy: null, sell: 85 }, 
        "Nutmeg": { buy: null, sell: 105 }, 
        "Silver": { buy: null, sell: null }, 
        "Gunpowder": { buy: 35, sell: 80 }, 
        "Sugar": { buy: null, sell: 85 }
    }
};

const travelCosts = {
    "Portugal": {
        "West Africa": 10,
        "India": 30,
        "Southeast Asia": 35,
        "Ottoman Empire": 20,
        "Americas": 25,
        "Swahili Coast": 15
    },
    "West Africa": {
        "Portugal": 10,
        "India": 20,
        "Southeast Asia": 25,
        "Ottoman Empire": 15,
        "Americas": 30,
        "Swahili Coast": 5
    },
    "India": {
        "Portugal": 30,
        "West Africa": 20,
        "Southeast Asia": 15,
        "Ottoman Empire": 25,
        "Americas": 35,
        "Swahili Coast": 30
    },
    "Southeast Asia": {
        "Portugal": 35,
        "West Africa": 25,
        "India": 15,
        "Ottoman Empire": 20,
        "Americas": 30,
        "Swahili Coast": 10
    },
    "Ottoman Empire": {
        "Portugal": 20,
        "West Africa": 15,
        "India": 25,
        "Southeast Asia": 20,
        "Americas": 30,
        "Swahili Coast": 15
    },
    "Americas": {
        "Portugal": 25,
        "West Africa": 30,
        "India": 35,
        "Southeast Asia": 30,
        "Ottoman Empire": 30,
        "Swahili Coast": 20
    },
    "Swahili Coast": {
        "Portugal": 15,
        "West Africa": 5,
        "India": 30,
        "Southeast Asia": 10,
        "Ottoman Empire": 15,
        "Americas": 20
    }
};

const ships = {
    "Galleon": {
        "cost": 0,
        "capacity": 5
    },
    "Carrack": {
        "cost": 150,
        "capacity": 10
    },
    "Caravel": {
        "cost": 300,
        "capacity": 15
    },
    "Fluyt": {
        "cost": 500,
        "capacity": 25
    }
};

function displayShipUpgrades() {
    const shipUpgradesList = document.getElementById("shipUpgradesList");
    shipUpgradesList.innerHTML = '';
    
    for (let ship in ships) {
        if (ship !== currentShip) {
            const li = document.createElement("li");
            li.textContent = `${ship} - Cost: ${ships[ship].cost} coins, Capacity: ${ships[ship].capacity} goods`;
            shipUpgradesList.appendChild(li);
        }
    }
}

function handleShipUpgrade() {
    const upgradeMessage = document.getElementById("upgradeMessage");
    const upgradeCost = ships[currentShip].cost;
    const upgradeButton = document.getElementById("upgradeButton");

    const shipNames = Object.keys(ships);
    const currentShipIndex = shipNames.indexOf(currentShip);

    if (currentShipIndex < shipNames.length - 1) {
        const nextShip = shipNames[currentShipIndex + 1];
        const nextShipCost = ships[nextShip].cost;

        if (currentCoins >= nextShipCost) {
            currentCoins -= nextShipCost;
            currentShip = nextShip;
            document.getElementById("currentShipName").textContent = currentShip;
            document.getElementById("currentShipCapacity").textContent = ships[currentShip].capacity;

            upgradeMessage.textContent = `Successfully upgraded to a ${currentShip}!`;
            displayShipUpgrades();
        } else {
            upgradeMessage.textContent = `You don't have enough coins to upgrade to ${nextShip}.`;
        }
    } else {
        upgradeMessage.textContent = "You already have the best ship!";
    }
}

function logAction(action) {
    const feed = document.getElementById('action-feed');
    const newAction = document.createElement('li');
    newAction.innerText = action;
    feed.insertBefore(newAction, feed.firstChild); // add at top
}


// update the UI status
function updateStatus() {
    document.getElementById('coins').innerText = `Coins: ${coins}`;
    document.getElementById('current-location').innerText = `Current Location: ${currentLocation}`;
    document.getElementById('inventory').innerText = `Inventory: ${inventory.length ? inventory.join(', ') : 'Empty'}`;
}

// Show buy options based on location and available prices
function updateBuyOptions() {
    const buyItemSelect = document.getElementById('buy-item');
    const availableItems = Object.keys(goodsPrices[currentLocation]);

    buyItemSelect.innerHTML = ''; // Clear existing options

    availableItems.forEach(item => {
        const price = goodsPrices[currentLocation][item].buy;
        if (price !== null && price > 0) { // Only show items with a valid buy price
            const option = document.createElement('option');
            option.value = item;
            option.innerText = `${item} (Buy: ${price} coins)`;
            buyItemSelect.appendChild(option);
        }
    });

    if (buyItemSelect.options.length === 0) {
        buyItemSelect.innerHTML = `<option disabled>No goods available to buy</option>`;
    }
}

// Show sell options based on inventory
function updateSellOptions() {
    const sellItemSelect = document.getElementById('sell-item');
    sellItemSelect.innerHTML = ''; // Clear existing options

    // set of distinct items from the inventory
    const distinctItems = [...new Set(inventory)];

    distinctItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.innerText = `${item}`;
        sellItemSelect.appendChild(option);
    });
    
    if (sellItemSelect.options.length === 0) {
        sellItemSelect.innerHTML = `<option disabled>No items in inventory to sell</option>`;
    }
}

function buyGoods() {
    const buyItem = document.getElementById('buy-item').value;
    const buyAmount = parseInt(document.getElementById('buy-amount').value, 10);
    const previewDiv = document.getElementById('buy-preview');

    const itemPrice = goodsPrices[currentLocation][buyItem].buy;
    const totalCost = itemPrice * buyAmount;

    if (itemPrice !== null && coins >= totalCost) {
        previewDiv.innerHTML = `Preview: You are about to buy ${buyAmount} ${buyItem}(s) for a total of ${totalCost} coins.`;
        document.getElementById('buy-button').onclick = function() {
            coins -= totalCost;
            for (let i = 0; i < buyAmount; i++) {
                inventory.push(buyItem);
            }
            logAction(`Bought ${buyAmount} ${buyItem}(s) for ${totalCost} coins.`);
            previewDiv.innerHTML = ``;
            document.getElementById('buy-item').value = ``;
            document.getElementById('buy-amount').value = ``;
            updateSellOptions();
            updateStatus();
        };
    } else {
        previewDiv.innerHTML = `Not enough coins to buy ${buyAmount} ${buyItem}(s).`;
    }
}

function sellGoods() {
    const sellItem = document.getElementById('sell-item').value;
    const sellAmount = parseInt(document.getElementById('sell-amount').value, 10);
    const previewDiv = document.getElementById('sell-preview');

    const itemPrice = goodsPrices[currentLocation][sellItem].sell;
    if (itemPrice !== null && inventory.includes(sellItem)) {
        const itemCount = inventory.filter(item => item === sellItem).length;

        if (itemCount >= sellAmount) {
            const totalSell = itemPrice * sellAmount;
            previewDiv.innerHTML = `Preview: You are about to sell ${sellAmount} ${sellItem}(s) for a total of ${totalSell} coins.`;
            document.getElementById('sell-button').onclick = function() {
                for (let i = 0; i < sellAmount; i++) {
                    inventory.splice(inventory.indexOf(sellItem), 1); // remove sold items from inventory
                }
                coins += totalSell;
                logAction(`Sold ${sellAmount} ${sellItem}(s) for ${totalSell} coins.`);
                previewDiv.innerHTML = ``;
                document.getElementById('sell-item').value = ``;
                document.getElementById('sell-amount').value = ``;
                updateStatus();
            };
        } else {
            previewDiv.innerHTML = `Not enough ${sellItem}(s) to sell.`;
        }
    } else {
        previewDiv.innerHTML = `Cannot sell ${sellItem} at this location.`;
    }
}


// Tab switching functionality
document.getElementById("buy-tab").addEventListener('click', function() {
    switchTab("buy");
});

document.getElementById("sell-tab").addEventListener('click', function() {
    switchTab("sell");
});

document.getElementById("travel-tab").addEventListener('click', function() {
    switchTab("travel");
});

document.getElementById("ship-upgrade-tab").addEventListener('click', function() {
    switchTab("shipUpgrade");
});

function switchTab(tab) {
    // hide all sections
    document.getElementById("buy-section").style.display = "none";
    document.getElementById("sell-section").style.display = "none";
    document.getElementById("travel-section").style.display = "none";
    document.getElementById("shipUpgrade-section").style.display = "none";
    
    // remove active class from all tabs
    document.getElementById("buy-tab").classList.remove('active');
    document.getElementById("sell-tab").classList.remove('active');
    document.getElementById("travel-tab").classList.remove('active');
    document.getElementById("ship-upgrade-tab").classList.remove('active');
    
    // show the selected section and add active class to the selected tab
    if (tab === "buy") {
        document.getElementById("buy-section").style.display = "block";
        document.getElementById("buy-tab").classList.add('active');
    } else if (tab === "sell") {
        document.getElementById("sell-section").style.display = "block";
        document.getElementById("sell-tab").classList.add('active');
    } else if (tab === "travel") {
        document.getElementById("travel-section").style.display = "block";
        document.getElementById("travel-tab").classList.add('active');
    } else if (tab === "shipUpgrade") {
        document.getElementById("shipUpgrade-section").style.display = "block";
        document.getElementById("ship-upgrade-tab").classList.add('active');
    }
}

document.getElementById("upgradeButton").addEventListener("click", handleShipUpgrade);

document.getElementById("buy-button").addEventListener('click', function() {
    buyGoods();
});

document.getElementById("sell-button").addEventListener('click', function() {
    sellGoods();
});

document.addEventListener('DOMContentLoaded', function() {
    // hide all sections in beginning
    document.getElementById('buy-section').style.display = 'none';
    document.getElementById('sell-section').style.display = 'none';
    document.getElementById('travel-section').style.display = 'none';
    document.getElementById('shipUpgrade-section').style.display = 'none';
    document.getElementById('buy-tab').classList.remove('active');
    document.getElementById('sell-tab').classList.remove('active');
    document.getElementById('travel-tab').classList.remove('active');
    document.getElementById('ship-upgrade-tab').classList.remove('active');
});


// show all market prices in a popup
function showMarketPricesPopup() {
    const modal = document.getElementById("market-prices-modal");
    const allPricesContainer = document.getElementById('all-market-prices');
    
    allPricesContainer.innerHTML = buildMarketPricesTables();
    modal.style.display = "block";
}

// close the market prices popup
function closeMarketPricesPopup() {
    const modal = document.getElementById("market-prices-modal");
    modal.style.display = "none";
}

// build market prices tables grouped by item
function buildMarketPricesTables() {
    let itemTablesHTML = '';
    const items = ["Textiles", "Spices", "Gold", "Ivory", "Nutmeg", "Silver", "Gunpowder", "Sugar"];

    items.forEach(item => {
        itemTablesHTML += `<h3>${item}</h3><table><thead><tr><th>Location</th><th>Buy Price</th><th>Sell Price</th></tr></thead><tbody>`;
        for (const location in goodsPrices) {
            if (goodsPrices[location][item]) { // check if the item exists in the location
                const { buy, sell } = goodsPrices[location][item];
                itemTablesHTML += `
                    <tr>
                        <td>${location}</td>
                        <td>${buy !== null ? buy : 'N/A'}</td>
                        <td>${sell !== null ? sell : 'N/A'}</td>
                    </tr>
                `;
            }
        }
        itemTablesHTML += `</tbody></table>`;
    });

    return itemTablesHTML;
}

// update the travel destinations based on the current location
function updateTravelOptions() {
    const travelDestinationSelect = document.getElementById('travel-destination');
    travelDestinationSelect.innerHTML = ''; // Clear existing options

    const destinations = Object.keys(travelCosts[currentLocation]);

    destinations.forEach(destination => {
        const option = document.createElement('option');
        option.value = destination;
        option.innerText = destination;
        travelDestinationSelect.appendChild(option);
    });
}

// handle traveling to the selected destination
function travelToDestination() {
    const destination = document.getElementById('travel-destination').value;

    if (!destination) {
        alert('Please select a destination');
        return;
    }

    const travelCost = travelCosts[currentLocation][destination];

    if (coins >= travelCost) {
        coins -= travelCost;
        logAction(`Traveled from ${currentLocation} to ${destination} for ${travelCost} coins.`);
        currentLocation = destination;
        updateStatus();
        updateBuyOptions();
        updateTravelOptions()
    } else {
        alert('Invalid location.');
    }
}

// update the UI status
function updateStatus() {
    document.getElementById('coins').innerText = `Coins: ${coins}`;
    document.getElementById('current-location').innerText = `Current Location: ${currentLocation}`;
    document.getElementById('current-location').innerText = `Current Location: ${currentLocation}`;

    // count occurrences of each item in the inventory and create a string to display
    let inventoryDisplay = "Inventory: ";
    const inventoryCounts = {};

    // count items in inventory
    inventory.forEach(item => {
        inventoryCounts[item] = (inventoryCounts[item] || 0) + 1;
    });

    // display string for the inventory
    const distinctItems = Object.keys(inventoryCounts);
    if (distinctItems.length > 0) {
        inventoryDisplay += distinctItems.map(item => `${item} x${inventoryCounts[item]}`).join(', ');
    } else {
        inventoryDisplay += "Empty";
    }

    document.getElementById('inventory').innerText = inventoryDisplay;
}


// log actions to the feed
function logAction(action) {
    const feed = document.getElementById('action-feed');
    const newAction = document.createElement('li');
    newAction.innerText = action;
    feed.insertBefore(newAction, feed.firstChild); // insert at top
}

// init game UI
updateStatus();
updateTravelOptions();
updateBuyOptions();
updateSellOptions();
displayShipUpgrades();
showTab('buy');