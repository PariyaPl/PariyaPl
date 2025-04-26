const buttons = document.querySelectorAll(".inner");

buttons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle("open")
    const info = button.nextElementSibling;
    if (info) info.classList.toggle("invisible");
  });
});
