let datosEventosAPI = 'https://mindhub-xj03.onrender.com/api/amazing'
let data = {}
let evento;

getData(datosEventosAPI)

//=> OTRA FORMA DE HACERLO: const categoriasRepetidasEliminadas = categoriasFiltradas.filter((categoria, index, categoriasFiltradas) => categoriasFiltradas.indexOf(categoria) === index)




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

// FUNCION PARA CATEGORIAS 
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

// FUNCION PARA DETAILS DE CADA EVENTO
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

// FUNCION PARA ESTADISTICAS

let maximoPorcentajeDeAsistencia = 0
let nombreMaxAsistencia = ""

let minimoPorcentajeDeAsistencia = 100
let nombreMinAsistencia = ""

let gananciasCategoria = 0;
let asistenciaTotal = 0;
let capacidadTotal = 0;

let eventosProximos = {}
let eventosPasados = {}

function crearTablaEstadisticas() {
    let contenedorStats = document.getElementById("tableStats");
    let tablaEstadisticas = `
    <tbody>
    <tr class="table-info text-center text-uppercase">
      <th colspan="3"> Event Statistics</th>
    </tr>
    <tr>
      <td class="table-secondary">Events with highest % of assistance</td>
      <td class="table-secondary">Events with lowest % of assistance</td>
      <td class="table-secondary" >Events with larger capacity</td>
    </tr>
    <tr>
      <td>${nombreMaxAsistencia}</td>
      <td>${nombreMinAsistencia}</td>
      <td>*</td>
    </tr>
    <tr class="table-info text-center">
      <th colspan="3">Upcoming events statistics by category</th>
    </tr>
    <tr>
      <td class="table-secondary">Categories</td>
      <td class="table-secondary">Revenues</td>
      <td class="table-secondary">Percentage of assitance</td>
    </tr>
    ${rellenarFilas(eventosProximos)}
    <tr class="table-info text-center">
      <th colspan="3">Past events statistics by category</th>
    </tr>
    <tr>
      <td class="table-secondary">Categories</td>
      <td class="table-secondary">Revenues</td>
      <td class="table-secondary">Percentage of assitance</td>
    </tr>
    ${rellenarFilas(eventosPasados)}
  </tbody>
    `


    contenedorStats.innerHTML = tablaEstadisticas
}

function rellenarFilas (evento){
    let html = ''
    eventsStatistics(evento).forEach((fila) => {
        html += `
        <tr >               
          <td>${fila.category}</td>
          <td>$${fila.revenues.toLocaleString("en-US")}</td>
          <td>${fila.attendance}%</td>
        </tr>  
        `
    }
    
    )
    return html;

}
// FUNCIONES FILTRO


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

function filtrarPorCategoriasYTexto(arrayDeEventos) {
    let filtro1 = filtrarCategoriasClickeadas(arrayDeEventos)
    let filtro2 = filtrarPorTexto(filtro1)
    crearEventos(filtro2)

}

function eventsStatistics(events) {
    let categories = new Set(events.map((event) => event.category));
    let categoriesStatistics = [];
  
    categories.forEach((category) => {
      let eventOfThisCategory = events.filter(
        (event) => category == event.category
      );
      console.log(eventOfThisCategory);
  
      let revenues = eventOfThisCategory.reduce(
        (acum, event) =>
          acum + event.price * (event.estimate || event.assistance),
        0
      );
      let attendance = eventOfThisCategory.reduce(
        (acum, event) =>
          acum +
          (((event.assistance||  event.estimate) / event.capacity) * 100) /
            eventOfThisCategory.length,
        0
      );
  
        //   //Condition to avoid whole numbers to decimals
        //   if (!Number.isInteger(attendance)) {
        //     attendance = attendance.toFixed(2);
        //   }

      categoriesStatistics.push({
        category,
        revenues,
        attendance,
      });
    });
    return categoriesStatistics;
    // console.log(categoriesStatistics);
  }

// FUNCION API

function getData(datosEventosAPI) {
    fetch(datosEventosAPI)
        .then(respuestaDelServidor => respuestaDelServidor.json())
        .then(datosDeInternet => {
            console.log(datosDeInternet.events)
            data = datosDeInternet
            evento = data.events

            console.log(data);

            // VARIABLES CLASIFICACION EVENTOS

            let fechaActual = new Date(data.currentDate);

            eventosProximos = evento.filter(evento => {
                const eventDate = new Date(evento.date);
                return eventDate >= fechaActual;

            });

            eventosPasados = evento.filter(evento => {
                const eventDate = new Date(evento.date);
                return eventDate < fechaActual;
            });

            // ARRAY DE CATEGORIAS
            const categoriasFiltradas = evento.map(objetoEventoDentroDelArrayEvents => objetoEventoDentroDelArrayEvents.category)

            const categoriasRepetidasEliminadas = []
            // FILTRADO DEL ARRAY CATEGORIAS
            categoriasFiltradas.forEach(elemento => {
                let contieneCategoria = categoriasRepetidasEliminadas.some(categoria => categoria == elemento)
                // SI NO LO CONTIENE 
                if (!contieneCategoria) {
                    categoriasRepetidasEliminadas.push(elemento)
                }
            });


            // BUCLES PARA ESTADISTICAS - TABLA

            for (even of evento) {
                if (even.capacity != null && even.assistance != null) {
                    let porcentaje = (even.assistance * 100) / even.capacity
                    if (porcentaje > maximoPorcentajeDeAsistencia) {
                        maximoPorcentajeDeAsistencia = porcentaje
                        nombreMaxAsistencia = even.name
                    }
                }

            }
            console.log(nombreMaxAsistencia);
            console.log(maximoPorcentajeDeAsistencia);

            for (even of evento) {
                if (even.capacity != null && even.assistance != null) {
                    let porcentaje = (even.assistance * 100) / even.capacity
                    if (porcentaje < minimoPorcentajeDeAsistencia) {
                        minimoPorcentajeDeAsistencia = porcentaje
                        nombreMinAsistencia = even.name
                    }
                }

            }

            console.log(nombreMinAsistencia);
            console.log(minimoPorcentajeDeAsistencia);


            // calculaEventos(data)
            // console.log(calculaEventos);

            //
            


            // CONDICION DE CARD EVENTOS SEGUN PAGINA
            const buscador = document.getElementById("buscador");
            const inputDeCategorias = document.getElementById("contenedor-categorias")


            if (document.title === "Home") {
                crearEventos(evento);
                createCategoryCards(categoriasRepetidasEliminadas);
                buscador.addEventListener("keydown", function () {
                    filtrarPorCategoriasYTexto(evento)

                });
                inputDeCategorias.addEventListener("click", () => {
                    filtrarPorCategoriasYTexto(evento)
                })

            } else if (document.title === "Upcoming Events") {
                crearEventos(eventosProximos)
                createCategoryCards(categoriasRepetidasEliminadas);
                buscador.addEventListener("keydown", function () {
                    filtrarPorCategoriasYTexto(eventosProximos)

                });
                inputDeCategorias.addEventListener("click", () => {
                    filtrarPorCategoriasYTexto(eventosProximos)
                })
            } else if (document.title === "Past Events") {
                crearEventos(eventosPasados)
                createCategoryCards(categoriasRepetidasEliminadas);
                buscador.addEventListener("keydown", function () {
                    filtrarPorCategoriasYTexto(eventosPasados)

                });
                inputDeCategorias.addEventListener("click", () => {
                    filtrarPorCategoriasYTexto(eventosPasados)
                })
            } else if (document.title === "Details") {
                const consultaString = location.search
                const paramentros = new URLSearchParams(consultaString)
                const id = paramentros.get("_id")
                let arregloFiltradoDeDetalles = evento.find((evento) => evento._id == id)
                crearTarjetaDetalles(arregloFiltradoDeDetalles)

            } else if (document.title === "Stats") {
                crearTablaEstadisticas()
            }



        })
        .catch(error => console.log(error))
}


// function calculaEventos(eventos) {
//     const filtroDeEventos = eventosProximos
//     const eventosPorCategoria = agruparLosEventosPorCategoria(filtroDeEventos)
//     const categoriaEstadisticas = []
//     let ganancias

//     for (const categoria in eventosPorCategoria) {
//         let eventos = eventosPorCategoria[categoria]
//         ganancias = eventos.reduce((total, evento) => {
//             let asistencia = evento.assistance ||0
//             let precio = evento.price
//             return total + asistencia * precio
//         }, 0)
//         console.log(ganancias);
//     }

//     let totalPorcentajeAsistencia = eventos.reduce((total, evento)=>{
//         let asistencia = evento.assistance || 0
//         let capacidad = evento.capacity
//         return total + (asistencia/capacidad)*100
//     },0)

//     let total2 = totalPorcentajeAsistencia/eventos.length
//     categoriaEstadisticas.push({categoria,ganancias,total2})

//     console.log(categoriaEstadisticas);

// }

// function agruparLosEventosPorCategoria(events) {
//     const eventsByCategory = {};
//     events.forEach(event => {
//       if (!eventsByCategory[event.category]) {
//         eventsByCategory[event.category] = [];
//       }
//       eventsByCategory[event.category].push(event);
//     });
//     return eventsByCategory;
//   }

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
