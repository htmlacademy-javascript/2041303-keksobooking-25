const addSlider = (createSliderElement, price,typeHousOptions, typeHous, form)=>{
  noUiSlider.create(createSliderElement, {
    range: {
      min: 1000,
      max: 100000
    },
    start: typeHousOptions[typeHous.value],
    step: 100,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  form.addEventListener('submit', ()=>{
    createSliderElement.noUiSlider.updateOptions({
      range: {
        min: typeHousOptions[typeHous.value],
        max: 100000
      },
      start: typeHousOptions[typeHous.value],
    });
  });
  typeHous.addEventListener('change', ()=>{
    createSliderElement.noUiSlider.updateOptions({
      range: {
        min: typeHousOptions[typeHous.value],
        max: 100000
      },
      start: typeHousOptions[typeHous.value],
    });

  });

  price.addEventListener('input',()=>{
    createSliderElement.noUiSlider.set(price.value);
  });

  createSliderElement.noUiSlider.on('update', ()=>{
    price.value = createSliderElement.noUiSlider.get();
  });
};

export{addSlider};

