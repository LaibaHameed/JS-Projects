
const memeBtn = document.querySelector(".meme-btn");
const memeImg = document.querySelector(".meme-img");
const memeTitle = document.querySelector(".meme-title");
const memeAuthor = document.querySelector(".meme-author");

const updateDetails = (url, title, author) => {
    memeImg.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = `Meme By: ${author}`;
}

const generateMeme = () => {
    fetch("https://meme-api.com/gimme/wholesomememes")
        .then((response) => response.json())
        .then((data) => {
            updateDetails(data.url, data.title, data.author);
        });
};

// alternative way of writing above code
// const generateMeme = () => {
//     fetch("https://meme-api.com/gimme/wholesomememes")
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (data) {
//             return updateDetails(data.url, data.title, data.author)
//         });
// };


memeBtn.addEventListener("click", generateMeme);
generateMeme();

//? 1get all elements to access them easily 
//? 2. write a generateMeme arrow fun which fetch an api link, when data is fetch from api in the form of promise. then() is an inbuilt function with promise , data attach with function which change response(coming data) into json, after the converting data into json, then json data attach with the updateDetails function which get values from data. and call the updateDetails function
//* in console promise return 2 things(elements) promiseState and promiseResult , if we open   promiseResult body we have all info which can we acess with the help of data attribute(parameter) like data.link, data.url , data.title etc.
//* we can this function because when we open browser it will fetch data once without button click

