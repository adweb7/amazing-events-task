let fechaActual = new Date(data.currentDate);

const eventosPasados = data.events.filter(evento => {
    const eventDate = new Date(evento.date);
    return eventDate < fechaActual;
});


console.log("Eventos pasados:", eventosPasados);


function createUpcomingEventCards(eventList, containerSelector) {
    let contenedorUpcoming = document.querySelector("#contenedor-card-past");
    let tarjetasUpcoming = "";

    for (const Events of eventList) {
        tarjetasUpcoming += `
            <div class="card" style="width: 20rem;">
                <img src="${Events.image}" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${Events.name}</h5>
                    <p class="card-text">${Events.description}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `;
    }

    contenedorUpcoming.innerHTML = tarjetasUpcoming;
}


const containerSelector = "#contenedor-card-past";
createUpcomingEventCards(eventosPasados, containerSelector);