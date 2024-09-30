const iife = (() => {
  const animalsArray = [];

  const obtenerDataJson = async (nombre) => {
    try {
      const response = await fetch("animales.json");
      const data = await response.json();
      return data.animales.find(animal => animal.name === nombre);
    } catch (error) {
      console.error(`Error al obtener la imagen: ${error}`);
    }
  };

  const addAnimal = (animal) => {
    // le asignamos un id para al desplegar el modal muestre el comentario correspondiente y no la primera ocurrencia del mismo animal en el array
    animal.id = animalsArray.length;
    animalsArray.push(animal);
  };

  const cardsAnimal = (animales, id) => {
    const cartas = animales.map(({ Img, Nombre, Sonido, id }) => `
      <div class="card m-2 col-3"> 
        <img src="./assets/imgs/${Img}" alt="${Nombre}" class="card-img m-1" data-id="${id}">
        <div class="card-body text-center">
          <h5 class="card-title">${Nombre}</h5>
          <audio controls class="w-100">
            <source src="./assets/sounds/${Sonido}" type="audio/mpeg">
            Reproducir sonido
          </audio>
        </div>
      </div>`).join('');

    document.getElementById(id).innerHTML = cartas;
    agregarEventosImagenes();
  };

  const limpiar = () => {
    const preview = document.getElementById('preview');
    if (preview.querySelector('img')) preview.innerHTML = '';

    ['animal', 'edad', 'comentarios'].forEach(id => {
      const element = document.getElementById(id);
      element.value = element.defaultValue;
    });
  };

  //abrir modal
  const abrirModal = (animal) => {
    const modalBody = document.querySelector('#exampleModal .modal-body');

    //cargar contenido modal
    modalBody.innerHTML = `
      <h5 class="modal-title">${animal.Nombre}</h5>
      <img src="./assets/imgs/${animal.Img}" alt="${animal.Nombre}" class="img-fluid rounded my-3">
      <p>Comentarios: ${animal.Comentarios}</p>
      <audio controls style="width: 100%">
        <source src="./assets/sounds/${animal.Sonido}" type="audio/mpeg">
        Reproducir sonido
      </audio>
    `;

    //mostrar modal
    const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.show();
  };

  // agregamos event listener a las imgs de las cards para desplegar el modal al dar click en ellas
  const agregarEventosImagenes = () => {
    document.querySelectorAll('.card-img').forEach(img => {
      img.addEventListener('click', event => {
        const idAnimal = event.target.dataset.id; 
        const animal = animalsArray.find(animal => animal.id == idAnimal); 
        
        abrirModal(animal);
      });
    });
  };

  return {
    agregarEventosImagenes,
    abrirModal,
    obtenerDataJson,
    cardsAnimal,
    addAnimal,
    animalsArray,
    limpiar
  };
})();

export { iife };
