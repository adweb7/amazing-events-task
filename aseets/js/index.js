
let fechaActual = new Date(data.currentDate);

const eventosPasados = data.events.filter(evento => {
    const eventDate = new Date(evento.date);
    return eventDate < fechaActual;
});

const eventosProximos = data.events.filter(evento => {
    const eventDate = new Date(evento.date);
    return eventDate >= fechaActual;
});

console.log("Eventos pasados:", eventosPasados);
console.log("Eventos próximos:", eventosProximos);


//INDEX 

let contenedorIndex = document.querySelector("#contenedor-card-index")

let tarjetasIndex = ""

for (eventos of data.events) {
    tarjetasIndex += `   
        <div class="card" style="width: 18rem;">
            <img src="${eventos.image}" alt="...">
            <div class="card-body">
                <h5 class="card-title">${eventos.name}</h5>
                <p class="card-text">${eventos.description}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
`
}

contenedorIndex.innerHTML = tarjetasIndex