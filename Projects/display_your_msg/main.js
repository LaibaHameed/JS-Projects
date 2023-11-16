document.addEventListener('DOMContentLoaded', () => {
    const msg = document.querySelector(".msg");
    const btn = document.querySelector(".btn");
    const invalidInput = document.querySelector(".invalid");
    const textMsg = document.querySelector(".textMsg");

    const myFun = () => {
        if (msg.value === "") {
            invalidInput.classList.add('show');
            setTimeout(function () {
                invalidInput.classList.remove('show');
            }, 4000);
        } else {
            textMsg.textContent = msg.value;
            msg.value = '';
        }
    }

    btn.addEventListener('click', myFun);
});
