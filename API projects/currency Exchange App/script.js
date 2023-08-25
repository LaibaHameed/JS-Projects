// let Amount = document.getElementById("amount");
// let From = document.getElementById("from-currency-select");
// let To = document.getElementById("to-currency-select");
// let Btn = document.getElementById("onvert-button");
// let Result = document.getElementById('result');

// let url = `https://v6.exchangerate-api.com/119f5bf69b8a4e2167a98099/latest/USD`;

// currencies.forEach((currency) => {
//     const option = document.createElement("option");
//     option.value = currency;
//     option.text = currency;
//     From.add(option);
// });

// currencies.forEach((currency) => {
//     const option = document.createElement("option");
//     option.value = currency;
//     option.text = currency;
//     To.add(option);
// });

// From.value = "USD";
// To.value = "PKR";

// let convertCurrency = () => {
//     let amount = Amount.value;
//     const fromCurrency = From.value;
//     const toCurrency = To.value;

//     if (amount.length != 0) {
//         fetch(url)
//         .then((result) => result.json())
//         .then((data) => {
//         let fromExchangeRate = data.conversion_rates[fromCurrency];
//         let toExchangeRate = data.conversion_rates[toCurrency];
//         const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
//         Result.innerHTML = `${amout} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
//         })
//     }else {
//         alert("Please fill in the amount");
//       };
// }

// Btn.addEventListener("click", convertCurrency);
// window.addEventListener("load", convertCurrency);




let Amount = document.getElementById("amount");
let From = document.getElementById("from-currency-select");
let To = document.getElementById("to-currency-select");
let Btn = document.getElementById("convert-button");
let Result = document.getElementById('result');

let url = `https://v6.exchangerate-api.com/119f5bf69b8a4e2167a98099/latest/USD`; // Replace with the actual API key and URL

currencies.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.text = currency;
    From.add(option);
    To.add(option.cloneNode(true)); // Clone the option for the 'To' dropdown
});

From.value = "USD";
To.value = "PKR";

let convertCurrency = () => {
    let amount = Amount.value;
    const fromCurrency = From.value;
    const toCurrency = To.value;

    if (amount.length != 0) {
        fetch(url)
        .then((result) => result.json())
        .then((data) => {
            let fromExchangeRate = data.conversion_rates[fromCurrency];
            let toExchangeRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
            Result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error("Error fetching exchange rates:", error);
        });
    } else {
        alert("Please fill in the amount");
    }
}

Btn.addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
