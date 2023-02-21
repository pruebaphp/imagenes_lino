
(function(){
    //variables
    const containerCards = document.querySelector('.contenedor_galeria');
    const footer = document.querySelector('.pie');


    window.onload = ()=>{
        obtenerDatosAPI();
    }
    
    async function obtenerDatosAPI(){
        const url = '/api/mis-publicaciones'
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        cargarCards(data);
    }
    
    function cargarCards(publicaciones){

        if(!publicaciones.length){

            containerCards.classList.remove('contenedor_galeria');
            footer.style.marginTop = '500px';

            let parrafo = document.createElement('p');
            parrafo.textContent = 'No hay publicaciones por mostrar';
            parrafo.style.fontSize = '28px';
            parrafo.style.textAlign = 'center';
            parrafo.style.color = 'white';
            parrafo.style.fontFamily = `'Staatliches', cursive`;

            containerCards.appendChild(parrafo);
            

            return;
            
        }

        publicaciones.forEach((publicacion)=>{

            let div = document.createElement('div');
            div.classList.add('card_imagen');

            let img = document.createElement('img');
            img.classList.add('card_imagen_img');
            img.src = `/uploads/${publicacion.imagen}`
            img.alt = `Publicacion de ${publicacion.imagen}`

            let p1 = document.createElement('p');
            p1.classList.add('card_imagen_titulo');
            p1.textContent = publicacion.titulo;

            let p2 = document.createElement('p');
            p2.classList.add('card_imagen_descri');
            p2.textContent = publicacion.descripcion;

            let btnEditar = document.createElement('button');
            btnEditar.classList.add('card_imagen_editar','btnAction');
            btnEditar.textContent = 'editar';

            let btnEliminar = document.createElement('button');
            btnEliminar.classList.add('card_imagen_eliminar','btnAction');
            btnEliminar.textContent = 'eliminar';

            
            div.appendChild(img)
            div.appendChild(p1)
            div.appendChild(p2)
            div.appendChild(btnEditar)
            div.appendChild(btnEliminar)

            containerCards.appendChild(div);

            console.log(publicacion)
            
        })
    }


})();
