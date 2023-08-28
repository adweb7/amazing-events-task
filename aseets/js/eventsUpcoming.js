let fechaActual = new Date(data.currentDate);



const eventosProximos = data.events.filter(evento => {
    const eventDate = new Date(evento.date);
    return eventDate >= fechaActual;
});


console.log("Eventos próximos:", eventosProximos);




// UPCOMING EVENTS

function createUpcomingEventCards(eventList, containerSelector) {
    let contenedorUpcoming = document.querySelector("#contenedor-card-upcoming");
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


const containerSelector = "#contenedor-card-upcoming";
createUpcomingEventCards(eventosProximos, containerSelector);

// OTRA FORMA DE HACERLO SIN FUNCION //

// let contenedorUpcoming = document.querySelector("#contenedor-card-upcoming");

// let tarjetasUpcoming = ""

// for (ProxEvent of eventosProximos) {
   
//     tarjetasUpcoming +=`   
//     <div class="card" style="width: 20rem;">
//         <img src="${ProxEvent.image}" alt="...">
//         <div class="card-body">
//             <h5 class="card-title">${ProxEvent.name}</h5>
//             <p class="card-text">${ProxEvent.description}</p>
//             <a href="#" class="btn btn-primary">Go somewhere</a>
//         </div>
//     </div>
// `

// }

// contenedorUpcoming.innerHTML = tarjetasUpcoming




