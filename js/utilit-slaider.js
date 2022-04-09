const SLAIDER_MAX = 100000;

const SLAIDER_STEP = 1;
const SLAIDER_ONE_HANDLE_CONNECT = 'lower';

const getSlaiderResetOptions = (createSliderElement, typeHousOptions, typeHous) => {
  createSliderElement.noUiSlider.updateOptions({
    range: {
      min: typeHousOptions[typeHous.value],
      max: SLAIDER_MAX
    },
    start: typeHousOptions[typeHous.value],

  });
};

const addSlider = (createSliderElement, price,typeHousOptions, typeHous, form, reset) => {
  noUiSlider.create(createSliderElement, {
    range: {
      min: typeHousOptions[typeHous.value],
      max: SLAIDER_MAX
    },
    start: typeHousOptions [typeHous.value],
    step: SLAIDER_STEP,
    connect: SLAIDER_ONE_HANDLE_CONNECT,
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat (value);
      },
    },
  });
  form.addEventListener('submit', () => {
    getSlaiderResetOptions (createSliderElement, typeHousOptions, typeHous);
  });
  reset.addEventListener('click', ()=>{
    getSlaiderResetOptions (createSliderElement, typeHousOptions, typeHous);
  });
  typeHous.addEventListener('change', () => {
    getSlaiderResetOptions (createSliderElement, typeHousOptions, typeHous);

  });

  price.addEventListener('input', () => {
    createSliderElement.noUiSlider.set(price.value);
  });

  createSliderElement.noUiSlider.on('update', () => {
    price.value = createSliderElement.noUiSlider.get();
  });
};

export{addSlider};

