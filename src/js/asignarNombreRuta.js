
const inputArchivo = document.querySelector('#archivo');
const labelArchivo = document.querySelector('.labelArchivo');

inputArchivo.addEventListener('change',asignarNombreALabel)

function asignarNombreALabel(){
    labelArchivo.textContent = inputArchivo.files[0].name;
    labelArchivo.style.fontWeight = 'bold';
}