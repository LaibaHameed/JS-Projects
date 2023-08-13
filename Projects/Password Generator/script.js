class PasswordGenerator {
    
    constructor() {
        this.length = 8;
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        this.nums = "0123456789";
        this.specials = "!\"$%&/()=?@~`\\.';:+=^*_-";
    }

    generatePass() {
        let generatedPassword = "";

        while (generatedPassword.length < this.length) {
            generatedPassword += this.chars[Math.floor(Math.random() * this.chars.length)];
            generatedPassword += this.nums[Math.floor(Math.random() * this.nums.length)];
            generatedPassword += this.specials[Math.floor(Math.random() * this.specials.length)];
        }

        return generatedPassword;
    }
}

const passwordGenerator = new PasswordGenerator();

const generatePass = () => {
    const length = parseInt(document.getElementById('length').value);
    document.getElementById("length-val").textContent = length;
    passwordGenerator.length = length;

    const randomPassword = passwordGenerator.generatePass();
    document.getElementById("output").value = randomPassword;
}

const copyClipboard = ()=> {
    const output = document.getElementById("output");
    output.select();

    try {
        const successful = document.execCommand("copy");
        if (successful) {
            alert("Password Copied!");
        } else {
            alert("Copying password failed.");
        }
    } catch (err) {
        alert("Copying password failed: " + err);
    }
}