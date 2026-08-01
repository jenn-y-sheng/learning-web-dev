let calculation = localStorage.getItem('calc') || '';
document.querySelector('.js-calculation').innerHTML = calculation;

function updateCalculation(el) {
  let message = '';
  if (el === 'clear') {
    calculation = '';
    message = 'Cleared.'
  } else if (el === '=') {
    calculation = eval(calculation);
    message = calculation;
  } else {
    calculation += el;
    message = calculation;
  }
  localStorage.setItem('calc', calculation);
  console.log(message);
  document.querySelector('.js-calculation').innerHTML = calculation;
}