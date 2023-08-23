let fact = document.getElementById("fact");
let genBtn = document.getElementById("gen-btn");
let apiKey = "tyxyyQ0fB2x/RHZmqIXBRA==0gmMcVTLf9SzZW41";

let options = {
  method: "Get",
  headers: {
    "x-api-key": apiKey,
  },
};

let url = "https://api.api-ninjas.com/v1/facts?limit=1";
let generateFact = () => {
  fetch(url, options).then((value) => value.json()).then((data) => {
    fact.innerText = data[0].fact;
  });
};

window.addEventListener("load", generateFact);
genBtn.addEventListener("click", generateFact);
