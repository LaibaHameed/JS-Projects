let a;
let date;
let time;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let myFun = () => {
    a = new Date();
    time = a.toLocaleTimeString();
    date = a.toLocaleDateString(undefined, options);
    document.getElementById('time').innerHTML = `${time} <br> on  ${date}`;
}

setInterval(myFun,1000);

