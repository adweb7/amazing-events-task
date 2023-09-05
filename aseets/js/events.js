
// VARIABLES PARA FILTRO DE EVENTOS Y DATE

let fechaActual = new Date(data.currentDate);

const eventosProximos = data.events.filter(evento => {
    const eventDate = new Date(evento.date);
    return eventDate >= fechaActual;
});

const eventosPasados = data.events.filter(evento => {
    const eventDate = new Date(evento.date);
    return eventDate < fechaActual;
});


// ARRAY DE CATEGORIAS
const categoriasFiltradas = data.events.map(objetoEventoDentroDelArrayEvents => objetoEventoDentroDelArrayEvents.category)


// FILTRADO DEL ARRAY CATEGORIAS

//=> OTRA FORMA DE HACERLO: const categoriasRepetidasEliminadas = categoriasFiltradas.filter((categoria, index, categoriasFiltradas) => categoriasFiltradas.indexOf(categoria) === index)
const categoriasRepetidasEliminadas = []

categoriasFiltradas.forEach(elemento => {
    let contieneCategoria = categoriasRepetidasEliminadas.some(categoria => categoria == elemento)
    // SI NO LO CONTIENE 
    if (!contieneCategoria) {
        categoriasRepetidasEliminadas.push(elemento)
    }
});


//FUNCION PARA TARJETAS DE EVENTOS

function crearEventos(arrayEvents) {

    let cardsData = document.getElementById("contenedor-card");
    let tarjetasEventos = "";

    for (events of arrayEvents) {
        tarjetasEventos += `
        <div class="card" style="width: 20rem;">
        <img src="${events.image}" alt="...">
        <div class="card-body">
            <h5 class="card-title">${events.name}</h5>
            <p class="card-text">${events.description}</p>
            <a href="./aseets/pages/details.html?id=${events._id}" class="btn btn-primary">Details</a>
        </div>
    </div>
        `;
    }


    
    cardsData.innerHTML = tarjetasEventos;
}

// FUNCION PARA TARJETA DE CATEGORIAS INICIO
function createCategoryCards(categoriasRepetidasEliminadas) {
    const cardsDataCategories = document.getElementById("contenedor-categorias");
    let tarjetasCategorias = "";

    for (let category of categoriasRepetidasEliminadas) {
        tarjetasCategorias += `
        <div class="divcategorias  d-inline-block">
            <form class="form-check formcategorias" action="#" method="get">
                <input type="checkbox" id="categoriaInput" name="${category}" value="${category}">
                <label for="${category}">${category}</label>
            </form>
        </div>
        `;
    }

    cardsDataCategories.innerHTML = tarjetasCategorias;
}

createCategoryCards(categoriasRepetidasEliminadas);


// FUNCION PARA DETAILS TARJETA


function crearTarjetaDetalles(events) {
    let dataDetalles = document.getElementById("contenedorDetalles")
    let tarjetaDetalles = ""
    dataDetalles.innerHTML = tarjetaDetalles
    return `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${events.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h5 class="card-title">${events.name}</h5>
                    <p class="card-text">${events.date}</p>
                    <p class="card-text">${events.category}</p>
                    <p class="card-text">${events.place}</p>
                    </div>

                    </div>
                </div>
                </div>
            </div>`

    
}


// CONDICION DE CARD EVENTOS SEGUN PAGINA

if (document.title === "Home") {
    crearEventos(data.events);
} else if (document.title === "Upcoming Events") {
    crearEventos(eventosProximos)
} else if (document.title === "Past Events") {
    crearEventos(eventosPasados)
} else if (document.title === "Details" ){
    const consultaString = location.search
    const paramentros = new URLSearchParams (consultaString)
    const id = paramentros.get("_id")
    let arregloFiltradoDeDetalles = events.filter((evento)=> evento.id)
    crearTarjetaDetalles(arregloFiltradoDeDetalles[0])
}



// EVENTOS


const buscador = document.getElementById("buscador");

buscador.addEventListener("keydown", function() {
    filtrarPorTexto(data.events)
});

function filtrarPorTexto( arrayDeEventos){
    let datosIngresadosEnElBuscador = buscador.value;
    let arregloFiltrado = arrayDeEventos.filter(arrayDeEventos => arrayDeEventos.name.toLowerCase().includes(datosIngresadosEnElBuscador.trim().toLowerCase()) )
    return arregloFiltrado
}


const inputDeCategorias = document.getElementById("categoriaInput")

inputDeCategorias.addEventListener("input", function(){
    let datosClickeadosPorElUsuario = inputDeCategorias.value
    return datosClickeadosPorElUsuario
})




// EVENTOS Y FORMULARIO

// let datosIngresadosEnElFormularioNombres = []
// let datosIngresadosEnElFormularioCorreos = []
// let datosIngresadosEnElFormularioMensajes = []

// const inputNombre = document.getElementById("textoNameingresadoEnFormulario")
// const inputCorreo = document.getElementById("correoIngresadoEnFormulario")
// const inputMensaje = document.getElementById("msgIngresadoEnFormulario")

// const formularioContacto = document.forms[0]
// formularioContacto.addEventListener("submit", (e) => {
//     e.preventDefault()
//     console.log("HOLA HICE CLICK")
//     console.log(inputNombre.value)
//     datosIngresadosEnElFormularioNombres.push(inputNombre.value)
//     datosIngresadosEnElFormularioCorreos.push(inputCorreo.value)
//     datosIngresadosEnElFormularioMensajes.push(inputMensaje.value)


// })



// FUNCION PARA CARD DE CATEGORIAS fin

// const inputCategorias = document.getElementById("inputDeLasCategorias")

// inputCategorias.addEventListener("click", () => { console.log("HOLA HICE CLICK"); })

// FUNCION PARA CARD DE CATEGORIAS FIN
