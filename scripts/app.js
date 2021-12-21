//╔════════════════════════════════════════════════╗
//║             MAIN JAVASCRIPT SCRIPT             ║
//╚════════════════════════════════════════════════╝
//
// *********************************************
// ***           BEGIN MAIN MODULE           ***
// *********************************************
//
const API_URL = 'https://rickandmortyapi.com/api/character'
const IMG_PATH = ''
const SEARCH_URL = 'https://rickandmortyapi.com/api/character/?name='

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')
const h2 = document.querySelector('h2')

h2.addEventListener('click', () => {
    getTarjetas(API_URL)
})

const getTarjetas = (url) => {
    const peticion = fetch(url)
    peticion.then(resp => resp.json())
    .then(data => showTarjetas(data.results))
    .catch(error =>
            swal.fire({
                title: 'Hubo un error con el servidor',
                text: 'Intente de nuevo más tarde',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }))
}

getTarjetas(API_URL)

const showTarjetas = (tarjetas) => {
    console.log(tarjetas);
    if (tarjetas.length == 0) {
        swal.fire({
            title: 'Pelicula no encontrada',
            text: 'Intenta con otro nombre',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        })
    } else {
        main.innerHTML = ''
        tarjetas.forEach(elemento => {
         const { name, image, status, species, origin, location } = elemento
         console.log(origin.name)
            const divTarjeta = document.createElement('div')
            divTarjeta.classList.add('tarjeta')
            divTarjeta.innerHTML = `
                                    <img src="${IMG_PATH + image}" alt="">
                                    <div class="tarjeta-info">
                                        <h3>${name}</h3>
                                        <span class=${getClassByRate(status)}>${status}</span>
                                    </div>
                                    <div class="overview">
                                        <h3>Información:</h3>
                                        <div>
                                            <span>Especie: </span>
                                            <span class="fw-bold">${species}</span>
                                        </div>
                                        <div>
                                            <span>Origen: </span>
                                            <span class="fw-bold text-center">${origin.name}</span>
                                        </div>
                                        <div>
                                            <span>Localización: </span>
                                            <span class="fw-bold">${location.name}</span>
                                        </div>
                                    </div>
        `
            main.appendChild(divTarjeta)
        })
    }
}

const getClassByRate = (status) => {
    if (status == 'Dead') {
        return "red"
    } else if (status == 'Alive') {
        return "green"
    } else {
        return "orange"
    }
}

form.addEventListener('submit', e => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getTarjetas(SEARCH_URL + searchTerm)
        search.value = ""
    } else {
        window.location.reload()
    }
})
//
// *********************************************
// ***            END MAIN MODULE            ***
// *********************************************
function al(aa) { alert("Aquí voy... ", aa); }
function cl(aa) { console.log("Aquí voy... ", aa); }
//╔════════════════════════════════════════════════╗
//║             FUNCTION DEFINITION                ║
//╚════════════════════════════════════════════════╝
