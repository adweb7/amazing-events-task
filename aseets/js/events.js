
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

// CONDICION DE CARD EVENTOS SEGUN PAGINA
const buscador = document.getElementById("buscador");
const inputDeCategorias = document.getElementById("contenedor-categorias")


if (document.title === "Home") {
    crearEventos(data.events);
    createCategoryCards(categoriasRepetidasEliminadas);
    buscador.addEventListener("keydown", function () {
        filtrarPorCategoriasYTexto(data.events)
    
    });
    inputDeCategorias.addEventListener("click", ()=> {
        filtrarPorCategoriasYTexto(data.events)
    })
    
} else if (document.title === "Upcoming Events") {
    crearEventos(eventosProximos)
    createCategoryCards(categoriasRepetidasEliminadas);
    buscador.addEventListener("keydown", function () {
        filtrarPorCategoriasYTexto(eventosProximos)
    
    });
    inputDeCategorias.addEventListener("click", ()=> {
        filtrarPorCategoriasYTexto(eventosProximos)
    })
} else if (document.title === "Past Events") {
    crearEventos(eventosPasados)
    createCategoryCards(categoriasRepetidasEliminadas);
    buscador.addEventListener("keydown", function () {
        filtrarPorCategoriasYTexto(eventosPasados)
    
    });
    inputDeCategorias.addEventListener("click", ()=> {
        filtrarPorCategoriasYTexto(eventosPasados)
    })
} else if (document.title === "Details") {
    const consultaString = location.search
    const paramentros = new URLSearchParams(consultaString)
    const id = paramentros.get("_id")
    let arregloFiltradoDeDetalles = data.events.find((evento) => evento._id == id)
    crearTarjetaDetalles(arregloFiltradoDeDetalles)
    
}

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
            <a href="/aseets/pages/details.html?_id=${events._id}" class="btn btn-primary">Details</a>
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
                <input type="checkbox" id="${category}" name="${category}" value="${category}">
                <label for="${category}">${category}</label>
           
        `;
    }

    cardsDataCategories.innerHTML = tarjetasCategorias;
}

// FUNCION PARA DETAILS TARJETA


function crearTarjetaDetalles(event) {
    let dataDetalles = document.getElementById("contenedorDetalles")
    let tarjetaDetalles = `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                <div class="col-md-4">
                    <img src="${event.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                    <h3 class="card-title">${event.name}</h5>
                    <p class="card-text">Date: ${event.date}</p>
                    <p class="card-text">Category: ${event.category}</p>
                    <p class="card-text">Place: ${event.place}</p>
                    <p class="card-text">Price: ${event.price}</p>
                    </div>

                    </div>
                </div>
                </div>
            </div>`

    dataDetalles.innerHTML = tarjetaDetalles

}

// EVENTOS


function filtrarPorTexto(arrayDeEventos) {
    let datosIngresadosEnElBuscador = buscador.value;
    let arregloFiltrado = arrayDeEventos.filter(arrayDeEventos => arrayDeEventos.name.toLowerCase().includes(datosIngresadosEnElBuscador.trim().toLowerCase()))
    if (!arregloFiltrado.length) {
        arregloFiltrado = arrayDeEventos
       
    }
    console.log(arregloFiltrado);
    return arregloFiltrado
}

function filtrarCategoriasClickeadas(arrayDeEventos) {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]')
    let arrayCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked)
    let arrayValueChecked = arrayCheckboxes.map(entrada => entrada.value)
    let arregloFiltrados = []
    arrayDeEventos.filter(evento => {
        arrayValueChecked.forEach(categoria => {
            if (categoria === evento.category) {
                arregloFiltrados.push(evento)
            }
        })
    })
    if (!arregloFiltrados.length) {
        arregloFiltrados = arrayDeEventos
        
    }
    console.log(arregloFiltrados);
    return arregloFiltrados
}

function filtrarPorCategoriasYTexto(arrayDeEventos){
    let filtro1 = filtrarCategoriasClickeadas (arrayDeEventos)
    let filtro2 = filtrarPorTexto(filtro1)
    crearEventos(filtro2)

}
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
