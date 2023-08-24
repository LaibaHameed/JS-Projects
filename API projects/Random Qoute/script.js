let quote = document.getElementById("quote"); // Corrected variable name
let author = document.getElementById('author');
let genBtn = document.getElementById("gen-btn");

let url = "https://api.quotable.io/random";

let generateQuote = () => {
    fetch(url)
    .then((response) => response.json()) // Changed variable name from value to response
    .then((data) => {
      quote.innerText = data.content; // Corrected variable name
      author.innerText = data.author;
    });
};

window.addEventListener("load", generateQuote);
genBtn.addEventListener("click", generateQuote);
