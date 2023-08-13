function convertSecondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return hours + " hours " + minutes + " minutes " + remainingSeconds + " sec";
};

// Array of image URLs
const imageUrls = [
"https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4974920/pexels-photo-4974920.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1181373/pexels-photo-1181373.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/879109/pexels-photo-879109.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/7988087/pexels-photo-7988087.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/6804604/pexels-photo-6804604.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/5474300/pexels-photo-5474300.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/3987066/pexels-photo-3987066.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1181278/pexels-photo-1181278.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/693859/pexels-photo-693859.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=600",
"https://images.pexels.com/photos/574073/pexels-photo-574073.jpeg?auto=compress&cs=tinysrgb&w=600"
];

function getRandomImageUrl() {
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
} 
console.log(getRandomImageUrl());

let apiUrl = "https://kontests.net/api/v1/all";
let response = fetch(apiUrl);
response.then( (value) => {
    return value.json()
}).then( (contests) => {
    console.log(contests)

    iHTML = ""
    for(items in contests){
        console.log(contests[items]);
        iHTML +=`
        <div class="col">
        <div class="card  h-100">
        <img src="${getRandomImageUrl()}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title mb-0"><b> ${contests[items].name} </b></h5>
          <br>
          <p class="card-text"><b>Starts At:</b> ${contests[items].start_time}</p>
          <p class="card-text"><b>Ends At:</b> ${contests[items].end_time}</p>
        </div>
        <ul class="list-group list-group-flush">
           <li class="list-group-item"><b>Site Name:</b> ${contests[items].site}</li>
           <li class="list-group-item"><b>Status:</b> ${contests[items].status}</li>
           <li class="list-group-item"><b>Duration:</b>${convertSecondsToTime(contests[items].duration)}</li>
         </ul>
        <div class="card-footer">
        <div class="d-grid gap-2 col-8 mx-auto">
          <button class="btn btn-dark" type="button"><a href="${contests[items].url}" class="card-link" target="_blank"  style="text-decoration: none; color:white;">Visit The Codding Site</a></button>   
        </div>
        </div>
      </div>
      </div>
        `
    }
    cardContainer.innerHTML = iHTML;
})


