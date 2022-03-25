const addSlider = (createSliderElement, price,typeHousOptions, typeHous )=>{
  noUiSlider.create(createSliderElement, {
    range: {
      min: 1000,
      max: 100000
    },
    start: 1000,
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

  typeHous.addEventListener('change', ()=>{
    createSliderElement.noUiSlider.updateOptions({
      range: {
        min: typeHousOptions[typeHous.value],
        max: 100000
      },
      start: typeHousOptions[typeHous.value],
    });

  });

  createSliderElement.noUiSlider.on('update', ()=>{
    price.value = createSliderElement.noUiSlider.get();
  });
};
export{addSlider};
