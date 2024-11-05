let fact = document.getElementById("fact");
let genBtn = document.getElementById("gen-btn");
let apiKey = "tyxyyQ0fB2x/RHZmqIXBRA==0gmMcVTLf9SzZW41";

let options = {
  method: "GET",
  headers: {
    "x-api-key": apiKey,
  },
};

// Removed limit parameter to simplify the request
let url = "https://api.api-ninjas.com/v1/facts";

let generateFact = () => {
  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.length > 0) {
        fact.innerText = data[0].fact; // Handle the data received
      } else {
        fact.innerText = "No fact found."; // Handle case where no data is returned
      }
    })
    .catch((error) => {
      console.error('Error fetching fact:', error);
      fact.innerText = "Error fetching fact. Please try again."; // Display error message
    });
};

window.addEventListener("load", generateFact);
genBtn.addEventListener("click", generateFact);
