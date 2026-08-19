const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const amount = document.querySelector(".amount input");
const swapBtn = document.querySelector(".icon");

// Populate dropdowns
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let option = document.createElement("option");
        option.value = currCode;
        option.innerText = currCode;

        if (select.name === "from" && currCode === "USD") {
            option.selected = true;
        } else if (select.name === "to" && currCode === "PKR") {
            option.selected = true;
        }

        select.appendChild(option);
    }

    select.addEventListener("Change", (evt) => {
        updateFlag(evt.target);
    });
}

// Update Country Flag
function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];

    let img = element.parentElement.querySelector("img");

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Get Exchange Rate
async function updateExchangeRate() {

    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const from = fromCurr.value.toLowerCase();
    const to = toCurr.value.toLowerCase();

    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`;

    try {

        const response = await fetch(URL);

        const data = await response.json();

        const rate = data[from][to];

        const finalAmount = (amtVal * rate).toFixed(2);

        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    } catch (error) {

        msg.innerText = "Something went wrong. Please try again.";

        console.log(error);

    }

}

// Button Click
btn.addEventListener("click", (e) => {

    e.preventDefault();

    updateExchangeRate();

});

// Page Load
window.addEventListener("load", () => {

    updateExchangeRate();

});

// Swap Currencies
swapBtn.addEventListener("click", () => {

    let temp = fromCurr.value;

    fromCurr.value = toCurr.value;

    toCurr.value = temp;

    updateFlag(fromCurr);

    updateFlag(toCurr);

    updateExchangeRate();

});
