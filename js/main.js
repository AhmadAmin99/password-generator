const resultElement = document.querySelector("#result");
const lengthElement = document.querySelector("#length");
const upperCaseElement = document.querySelector("#uppercase");
const lowerCaseElement = document.querySelector("#lowercase");
const numbersElement = document.querySelector("#numbers");
const symbolsElement = document.querySelector("#symbols");
const generateElement = document.querySelector("#generate");
const clipboardElement = document.querySelector("#clipboard");

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

clipboardElement.addEventListener("click", ()=>{
    const textarea = document.createElement('textarea');
    const password = resultElement.innerText;
    if(!password){
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password copied to clipboard")
})

generateElement.addEventListener("click", ()=>{
    const length = + lengthElement.value;
    const hasLower = lowerCaseElement.checked;
    const hasUpper = upperCaseElement.checked;
    const hasNumber = numbersElement.checked;
    const hasSymbol = symbolsElement.checked;
    resultElement.innerText = generatePassword(hasLower,hasUpper,hasNumber,hasSymbol, length);
})


function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArray = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0){
        return '';
    }
    for(let i = 0; i < length; i+= typesCount){
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;

}


function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 97);
}


function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 65);
}

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10 ) + 48);
}

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]<>.,-+*/';
    return symbols[Math.floor(Math.random() * symbols.length)]

}

