window.onload = function () {
 const form = document.querySelector(".ad-form");

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: '.error__message',
  successClass: 'success__message',
  errorTextParent: 'ad-form__span',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error',
});
function getValidationTitle (value) {
  return value.length >=30 && value.length <= 100;
};
pristine.addValidator(
  form.querySelector('#title'),
  getValidationTitle,
  'От 30 до 100 символов',
);

const buttonSubmit = document.querySelector('.ad-form__submit');
  form.addEventListener('submit', (evt)=>{
    evt.preventDefault();
    pristine.validate();
  });
  console.log(buttonSubmit)
  console.log(form)
}


// 3.6. Поле «Количество комнат» синхронизировано с
// полем «Количество мест» таким образом, что при
// выборе количества комнат вводятся ограничения на
// допустимые варианты выбора количества гостей:
// 1 комната — «для 1 гостя»;
// 2 комнаты — «для 2 гостей» или «для 1 гостя»;
// 3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
// 100 комнат — «не для гостей».

// Обратите внимание, под ограничениями подразумевается валидация.

// Ограничение путём удаления из разметки лишних <option> или
// добавления им состояния disabled приведёт к плохому UX (опыту взаимодействия).
// Даже если уже выбранное значение не попадает под новые ограничения, не стоит
// без ведома пользователя изменять значение поля. Пусть ошибку отловит валидация
// формы.
