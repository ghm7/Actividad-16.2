// Se puede probar el envío de la validación colocando una API
const URL = 'https://crudcrud.com/api/ec90d4a544be45fbb518f86dcc839c54/user';

const form = document.querySelector('form');
const inputsDOM = form.querySelectorAll('input');
const term = document.querySelector('#terminos');

const showFeedback = (inputElement) => {
  const inputGroup = inputElement.parentElement;
  const feedback = inputGroup.querySelector('.invalid-feedback');
  const termLabel = term.parentElement;
  const termMessage = document.querySelector('#desplegable-modal-terminos');

  !inputElement.checkValidity()
    ? feedback.classList.add('visible')
    : feedback.classList.remove('visible');

  if (!term.checked) {
    termMessage.classList.add('invalid-term');
    termLabel.classList.add('invalid-term');
    termMessage
      .querySelector('.invalid-feedback')
      .classList.add('visible-inline');
  } else {
    termMessage.classList.remove('invalid-term');
    termMessage.classList.add('valid-term');
    termMessage
      .querySelector('.invalid-feedback')
      .classList.remove('visible-inline');

    termLabel.classList.remove('invalid-term');
    termLabel.classList.add('valid-term');
  }
};

const isFormCompleted = () => {
  const inputs = Array.from(inputsDOM);
  return inputs.every((input) => input.checkValidity()) && term.checked;
};

const getForm = (form) => {
  const elements = Array.from(form.querySelectorAll('input'));
  const inputs = elements.filter((input) => input.id !== 'password1');
  const formData = new Object();

  if (isFormCompleted()) {
    inputs.forEach((input) => {
      formData[`${input.id}`] = `${input.value}`;
    });
  }
  return formData;
};

const checkValidation = () => {
  let password = new String();

  inputsDOM.forEach((input) => {
    input.setAttribute('required', '');
    showFeedback(input);

    form.addEventListener('input', (e) => {
      e.stopPropagation();
      e.preventDefault();

      inputsDOM.forEach((input) => {
        if (input.id === 'password') password = input.value;
        if (input.id === 'password1') input.setAttribute('pattern', password);
        showFeedback(input);
      });
    });
  });
};

const isDataEmpty = () => JSON.stringify(getForm(form)) === '{}';

const sendForm = () => {
  if (!isDataEmpty()) {
    const data = getForm(form);

    fetch(URL, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
};

form.addEventListener('submit', (e) => {
  e.stopPropagation();
  e.preventDefault();
  checkValidation();
  sendForm();
});

term.addEventListener('click', (e) => {
  e.stopPropagation();

  inputsDOM.forEach((input) => showFeedback(input));
});
