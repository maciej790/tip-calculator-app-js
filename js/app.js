const billAmmountInput = document.querySelector('.bill');
const tipAmmountInput = document.querySelector('.percent');
const splitAmmountInput = document.querySelector('.people');
const splitCostsCheckbox = document.querySelector('.check');
const resultSection = document.querySelector('.wrapper__results');
const resultsDiv = document.querySelector('.wrapper__results--div');
const submitButton = document.querySelector('.btn');

let result;
let error;
let inputsData;

const handleSubmitButton = e =>{
    e.preventDefault();
    inputsData = setInputVariables();
    const {billAmmount, tipAmmount, splitAmmount} = inputsData;

    if(Number.isInteger(splitAmmount) && billAmmount && tipAmmount){
        error = '';
        result = calculateTip(inputsData);
    }else if(!Number.isInteger(splitAmmount)){
        error = 'split input must be the integer!';
    }else{
        error = 'fill all the fileds!';
    }

    showResultsInDiv(result, error);
}

const setInputVariables = () =>{
    const inputsData = {
        billAmmount: Number(billAmmountInput.value),
        tipAmmount: Number(tipAmmountInput.value),
        splitAmmount: Number(splitAmmountInput.value),
    }
    return inputsData;
}

const calculateTip = ({billAmmount, tipAmmount, splitAmmount}) =>{
    const tipProcent = billAmmount * (tipAmmount/100);
    const valueWithTip = billAmmount + tipProcent;
    const result = splitAmmount ? Math.round(valueWithTip/splitAmmount) : Math.round(valueWithTip);
    return result;
}

const showResultsInDiv = (result, error = '') =>{
    resultSection.style.display = 'block';
    const resultText = `The total cost is: ${result} zł`;
    error ? resultsDiv.textContent = error : resultsDiv.textContent = resultText;
}

const showSplitInput = () => splitAmmountInput.classList.toggle('show');

submitButton.addEventListener('click', e => handleSubmitButton(e));
splitCostsCheckbox.addEventListener('click', showSplitInput);