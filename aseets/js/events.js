function createEventCards(arrayEvents) {

    let cardsData = document.getElementById("contenedor-card");
    let tarjetasEventos = "";

    for (events of arrayEvents){
        tarjetasEventos += `
        <div class="card" style="width: 20rem;">
        <img src="${events.image}" alt="...">
        <div class="card-body">
            <h5 class="card-title">${events.name}</h5>
            <p class="card-text">${events.description}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
        `; 
    }

    cardsData.innerHTML = tarjetasEventos;
}

createEventCards(data.events);

let fechaActual = new Date(data.currentDate);

const eventosProximos = data.events.filter(evento => {
    const eventDate = new Date(evento.date);
    return eventDate >= fechaActual;
});

const eventosPasados = data.events.filter(evento => {
    const eventDate = new Date(evento.date);
    return eventDate < fechaActual;
});



if (document.title === "Home"){
    createEventCards(data.events);
} else if(document.title === "Upcoming Events"){
    createEventCards (eventosProximos)
}   else if (document.title === "Past Events"){
    createEventCards(eventosPasados)
}

