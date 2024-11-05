let quote = document.getElementById("quote");
let author = document.getElementById('author');
let genBtn = document.getElementById("gen-btn");
let url = "https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/random"; // Use the proxy

let generateQuote = () => {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            quote.innerText = data[0].q; // Quote text
            author.innerText = data[0].a || "Unknown"; // Author name
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
        });
};

window.addEventListener("load", generateQuote);
genBtn.addEventListener("click", generateQuote);
