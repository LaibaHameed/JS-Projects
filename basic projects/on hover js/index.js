let openFace = document.querySelector('.open');
let closedFace = document.querySelector('.closed');

let closeFun = () =>{
    if(openFace.classList.contains('open'))
    {
        openFace.classList.add("active");
        closedFace.classList.remove("active");
    }
}

closedFace.addEventListener('mouseenter',closeFun);

let openFun = () =>{
    if(closedFace.classList.contains('closed')){
        closedFace.classList.add("active");
        openFace.classList.remove("active");
    }
}

openFace.addEventListener('mouseleave', openFun);