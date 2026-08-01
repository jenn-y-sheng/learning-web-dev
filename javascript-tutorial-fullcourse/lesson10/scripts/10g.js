function toggleButton(selector) {
  const button = document.querySelector(selector);
  if (!button.classList.contains('is-toggled')) {
    turnOffPrevious();
    button.classList.add('is-toggled');
  } else {
    button.classList.remove('is-toggled');
  }
}

function turnOffPrevious() {
  const button = document.querySelector('.is-toggled');
  if (button) {
    button.classList.remove('is-toggled');
  }
}