const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const fileChooser = document.querySelector('.ad-form__field');
const preview = document.querySelector('.ad-form-header__preview');
const fileChooserApartments = document.querySelector('.ad-form__upload');
const previewApartments = document.querySelector('.ad-form__photo');

const getImagLoad = (where, here, examination)=>{
  const file = where.firstElementChild.files[0];
  const fileName = file.name.toLowerCase();
  const matches = examination.some((it)=>fileName.endsWith(it));
  if (matches) {
    here.firstElementChild.src = URL.createObjectURL(file);
  }
};
fileChooser.addEventListener('change',()=>{
  getImagLoad(fileChooser, preview, FILE_TYPES );
});

fileChooserApartments.addEventListener('change', ()=>{
  getImagLoad(fileChooserApartments, previewApartments, FILE_TYPES);
});
