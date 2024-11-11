let coins = 100;
let currentShip = "galleon";
let inventory = [];
let currentLocation = "Portugal";

const goodsPrices = {
    Portugal: { 
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
    India: { 
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
    Americas: { 
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

// log actions to the feed
function logAction(action) {
    const feed = document.getElementById('action-feed');
    const newAction = document.createElement('li');
    newAction.innerText = action;
    feed.appendChild(newAction);
}

// update the UI status
function updateStatus() {
    document.getElementById('location').innerText = `Location: ${currentLocation}`;
    document.getElementById('coins').innerText = `Coins: ${coins}`;
    document.getElementById('current-ship').innerText = `Current Ship: ${currentShip.charAt(0).toUpperCase() + currentShip.slice(1)}`;
    document.getElementById('inventory').innerText = `Inventory: ${inventory.length ? inventory.join(', ') : 'Empty'}`;
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
                        <td>${buy !== null ? buy : '-'}</td>
                        <td>${sell !== null ? sell : '-'}</td>
                    </tr>`;
            }
        }
        itemTablesHTML += '</tbody></table>';
    });

    return itemTablesHTML;
}

// travel between locations
function travel() {
    const output = document.getElementById('output');
    const previousLocation = currentLocation;
    currentLocation = (currentLocation === "Portugal") ? "West Africa" : "Portugal"; // For simplicity, toggling locations
    output.innerText = `You have traveled to ${currentLocation}.`;
    logAction(`Traveled from ${previousLocation} to ${currentLocation}.`);
    updateStatus();
}

// trade goods
function trade() {
    const output = document.getElementById('output');
    const item = prompt("Enter the item you want to trade:");
    const amount = parseInt(prompt("Enter the amount you want to trade:"));

    if (goodsPrices[currentLocation][item]) {
        const { buy, sell } = goodsPrices[currentLocation][item];

        if (amount < 0) {
            output.innerText = "You cannot trade a negative amount.";
            return;
        }

        const totalCost = buy * amount;

        if (coins >= totalCost) {
            coins -= totalCost;
            inventory.push(item);
            output.innerText = `You bought ${amount} ${item}(s) for ${totalCost} coins.`;
            logAction(`Bought ${amount} ${item}(s) for ${totalCost} coins.`);
        } else {
            output.innerText = "You do not have enough coins.";
        }
    } else {
        output.innerText = "Item not available for trade.";
    }
    updateStatus();
}

// exit the game
function exitGame() {
    const output = document.getElementById('output');
    output.innerText = "Thank you for playing!";
    logAction("Exited the game.");
    // disable buttons or redirect
}

updateStatus(); // initial status update
