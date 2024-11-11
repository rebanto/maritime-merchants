let coins = 100;
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

// log actions to the feed
function logAction(action) {
    const feed = document.getElementById('action-feed');
    const newAction = document.createElement('li');
    newAction.innerText = action;
    feed.appendChild(newAction);
}

// update the UI status
function updateStatus() {
    document.getElementById('coins').innerText = `Coins: ${coins}`;
    document.getElementById('inventory').innerText = `Inventory: ${inventory.length ? inventory.join(', ') : 'Empty'}`;
}

// show buy options
function updateBuyOptions() {
    const buyItemSelect = document.getElementById('buy-item');
    const availableItems = Object.keys(goodsPrices[currentLocation]);

    buyItemSelect.innerHTML = ''; // clear existing options

    availableItems.forEach(item => {
        const price = goodsPrices[currentLocation][item].buy;
        if (price !== null) {
            const option = document.createElement('option');
            option.value = item;
            option.innerText = `${item} (Buy: ${price} coins)`;
            buyItemSelect.appendChild(option);
        }
    });

    // If no options are available, notify the player
    if (buyItemSelect.options.length === 0) {
        buyItemSelect.innerHTML = `<option disabled>No goods available to buy</option>`;
    }
}

// show sell options
function updateSellOptions() {
    const sellItemSelect = document.getElementById('sell-item');
    
    sellItemSelect.innerHTML = ''; // clear existing options

    inventory.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.innerText = `${item}`;
        sellItemSelect.appendChild(option);
    });

    // If no items to sell, notify the player
    if (sellItemSelect.options.length === 0) {
        sellItemSelect.innerHTML = `<option disabled>No items in inventory to sell</option>`;
    }
}

// buy goods based on selected item and amount
function buyGoods() {
    const buyItem = document.getElementById('buy-item').value;
    const buyAmount = parseInt(document.getElementById('buy-amount').value, 10);
    
    if (!buyItem || isNaN(buyAmount) || buyAmount <= 0) return;

    const itemPrice = goodsPrices[currentLocation][buyItem].buy;
    if (itemPrice !== null && coins >= itemPrice * buyAmount) {
        // Deduct coins and add to inventory
        coins -= itemPrice * buyAmount;
        for (let i = 0; i < buyAmount; i++) {
            inventory.push(buyItem);
        }
        logAction(`Bought ${buyAmount} ${buyItem}(s) for ${itemPrice * buyAmount} coins.`);
        updateStatus();
    } else {
        logAction(`Not enough coins to buy ${buyAmount} ${buyItem}(s).`);
    }
}

// sell goods based on selected item and amount
function sellGoods() {
    const sellItem = document.getElementById('sell-item').value;
    const sellAmount = parseInt(document.getElementById('sell-amount').value, 10);
    
    if (!sellItem || isNaN(sellAmount) || sellAmount <= 0) return;

    const itemPrice = goodsPrices[currentLocation][sellItem].sell;
    if (itemPrice !== null && inventory.includes(sellItem)) {
        const itemCount = inventory.filter(item => item === sellItem).length;
        
        if (itemCount >= sellAmount) {
            // Remove from inventory and add coins
            for (let i = 0; i < sellAmount; i++) {
                inventory.splice(inventory.indexOf(sellItem), 1);
            }
            coins += itemPrice * sellAmount;
            logAction(`Sold ${sellAmount} ${sellItem}(s) for ${itemPrice * sellAmount} coins.`);
            updateStatus();
        } else {
            logAction(`Not enough ${sellItem}(s) to sell.`);
        }
    } else {
        logAction(`Cannot sell ${sellItem} at this location.`);
    }
}

// event listeners for button clicks
document.getElementById("buy-button").addEventListener('click', buyGoods);
document.getElementById("sell-button").addEventListener('click', sellGoods);

// Tab switching functionality
document.getElementById("buy-tab").addEventListener('click', function() {
    document.getElementById("buy-section").style.display = "block";
    document.getElementById("sell-section").style.display = "none";
    document.getElementById("buy-tab").classList.add('active');
    document.getElementById("sell-tab").classList.remove('active');
});

document.getElementById("sell-tab").addEventListener('click', function() {
    document.getElementById("buy-section").style.display = "none";
    document.getElementById("sell-section").style.display = "block";
    document.getElementById("sell-tab").classList.add('active');
    document.getElementById("buy-tab").classList.remove('active');
});

// travel between locations
function travel() {
    const output = document.getElementById('output');
    const previousLocation = currentLocation;
    currentLocation = (currentLocation === "Portugal") ? "West Africa" : "Portugal"; // For simplicity, toggling locations for now
    output.innerText = `You have traveled to ${currentLocation}.`;
    logAction(`Traveled from ${previousLocation} to ${currentLocation}.`);

    // Update the UI to reflect the new location
    document.getElementById('current-location').innerText = `Current Location: ${currentLocation}`;

    updateStatus();
}


// show all market prices in a popup
function showMarketPricesPopup() {
    const modal = document.getElementById("market-prices-modal");
    const allPricesContainer = document.getElementById('all-market-prices');
    
    // market prices tables grouped by item
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
    const items = ["Textiles", "Spices", "Gold", "Ivory", "Nutmeg", "Silver", "Gunpowder", "Sugar"]; // List of items to display

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

// Update the UI with the travel options based on current location
function updateTravelOptions() {
    const travelSelect = document.getElementById('travel-destination');
    const availableDestinations = Object.keys(travelCosts[currentLocation]);

    travelSelect.innerHTML = ''; // Clear previous options

    availableDestinations.forEach(destination => {
        const cost = travelCosts[currentLocation][destination];
        const option = document.createElement('option');
        option.value = destination;
        option.innerText = `${destination} (Cost: ${cost} coins)`;
        travelSelect.appendChild(option);
    });

    // If no options available, notify the user
    if (travelSelect.options.length === 0) {
        travelSelect.innerHTML = `<option disabled>No destinations available</option>`;
    }
}

// Travel to a selected location
function travel() {
    const travelSelect = document.getElementById('travel-destination');
    const selectedDestination = travelSelect.value;
    
    if (!selectedDestination) return; // Ensure a destination is selected

    const travelCost = travelCosts[currentLocation][selectedDestination];
    
    if (coins >= travelCost) {
        // Deduct travel cost and update location
        coins -= travelCost;
        const previousLocation = currentLocation;
        currentLocation = selectedDestination;

        logAction(`Traveled from ${previousLocation} to ${currentLocation} for ${travelCost} coins.`);
        updateStatus();
        document.getElementById('current-location').innerText = `Current Location: ${currentLocation}`;

        updateTravelOptions(); // Update travel options based on the new location
    } else {
        logAction(`Not enough coins to travel to ${selectedDestination}.`);
    }
}

// Update the status area with current information
function updateStatus() {
    document.getElementById('coins').innerText = `Coins: ${coins}`;
    document.getElementById('current-ship').innerText = `Current Ship: ${currentShip}`;
    document.getElementById('inventory').innerText = `Inventory: ${inventory.join(', ')}`;
}

// Log actions to the feed
function logAction(message) {
    const feed = document.getElementById('action-feed');
    const newAction = document.createElement('li');
    newAction.innerText = message;
    feed.appendChild(newAction);
}

// Event listener for travel button
document.getElementById("travel-button").addEventListener('click', travel);

// Initialize travel options and update UI on page load
updateTravelOptions();

// Initialize game UI
updateStatus();
updateBuyOptions();
updateSellOptions();