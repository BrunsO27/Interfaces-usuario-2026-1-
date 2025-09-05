/**
 * URL base de la PokeAPI
 * @constant {string}
 */
const API = "https://pokeapi.co/api/v2";

/**
 * Lista de rivales Pokémon
 * @type {string[]}
 */
const rivales = [
    "Blue",
    "Silver",
    "Wally",
    "Barry",
    "Cheren",
    "Hugh",
    "Calem",
    "Serena",
    "Hau",
    "Hop",
    "Nemona",
];

/**
 * Lista de equipos Pokémon
 * @type {string[]}
 */
const teams = [
    "Team Rocket",
    "Team Magma",
    "Team Aqua",
    "Team Galactic",
    "Team Plasma",
    "Team Skull",
    "Fundación Aether",
    "Macro Cosmos",
    "Team Yell",
    "Team Star"
];

/**
 * Lista de roles dentro del mundo Pokémon
 * @type {string[]}
 */
const roles = [
    "Entrenador Pokémon",
    "Maestro Pokémon",
    "Campeón de Gimnasio",
    "Elite",
    "Investigador Pokémon",
    "Criador Pokémon",
    "Coordinador Pokémon",
    "Ranger Pokémon",
    "Team Leader / Líder de Equipo",
    "Profesor Pokémon",
    "Explorador Pokémon"
];

/**
 * Referencias a los formularios en el DOM
 */
const formData = document.getElementById("data");
const formPkm = document.getElementById("pokemon");

/**
 * Carga los tipos de Pokémon desde la API y los agrega al select correspondiente.
 */
async function cargarTiposPkm() {
    try {
        const response = await fetch(`${API}/type`);
        const data = await response.json();
        const select = document.getElementById("type");

        for (const tipo of data.results) {
            const res = await fetch(tipo.url);
            const detalles = await res.json();

            const nombreEs = detalles.names.find(
                (n) => n.language.name === "es"
            ).name;

            const option = document.createElement("option");
            option.value = tipo.name;
            option.textContent = nombreEs;
            select.appendChild(option);
        }
    } catch (error) {
        alert("Ocurrió un error: " + error);
        console.error("Error al cargar tipos:", error);
    }
}

/**
 * Carga las regiones desde la API y las agrega al select correspondiente.
 */
async function cargarRegiones() {
    try {
        const response = await fetch(`${API}/region`);
        const data = await response.json();
        const select = document.getElementById("region");

        for (const region of data.results) {
            const option = document.createElement("option");
            option.value = region.name;
            option.textContent =
                region.name.charAt(0).toUpperCase() + region.name.slice(1);
            select.appendChild(option);
        }
    } catch (error) {
        alert("Ocurrió un error: " + error);
        console.error("Error al cargar regiones:", error);
    }
}

/**
 * Carga los juegos Pokémon desde la API y los agrega al select correspondiente.
 */
async function cargarJuegos() {
    try {
        const response = await fetch(`${API}/version`);
        const data = await response.json();
        const select = document.getElementById("game");

        for (const version of data.results) {
            const res = await (await fetch(version.url)).json();
            const nombreEs = res.names.find(n => n.language.name === "es").name;

            const option = document.createElement("option");
            option.value = nombreEs;
            option.textContent = nombreEs.charAt(0).toUpperCase() + nombreEs.slice(1);
            select.appendChild(option)
        }
    } catch (error) {
        alert("Ocurrió un error: " + error);
        console.error("Error al cargar juegos:", error);
    }
}

/**
 * Carga los rivales en el select correspondiente.
 */
function cargarRivales() {
    const select = document.getElementById("rival");

    for (const rival of rivales) {
        const option = document.createElement("option");
        option.value = rival.charAt(0).toLowerCase() + rival.slice(1);
        option.textContent = rival;
        select.appendChild(option);
    }
}

/**
 * Carga los equipos en el select correspondiente.
 */
function cargarTeams() {
    const select = document.getElementById("team");

    for (const team of teams) {
        const option = document.createElement("option");
        option.value = team.toLowerCase().replace(/\s+/g, "-");
        option.textContent = team;
        select.appendChild(option);
    }
}

/**
 * Carga los roles en el select correspondiente.
 */
function cargarRoles() {
    const select = document.getElementById("rol");

    for (const rol of roles) {
        const option = document.createElement("option");
        option.value = rol.toLowerCase().replace(/\s+/g, "-");
        option.textContent = rol;
        select.appendChild(option);
    }
}

/**
 * Valida los formularios de datos personales y Pokémon.
 * @returns {boolean} true si los formularios son válidos, false en caso contrario.
 */
function validarForms() {
    let valido = true;
    let mensajes = [];

    // Validar inputs de texto
    const inputsText = formData.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], input[type='date']");
    inputsText.forEach(input => {
        if (!input.value.trim()) {
            valido = false;
            mensajes.push(`El campo "${input.name}" no puede estar vacío.`);
        }
    });

    // Validar selects
    const selects = formPkm.querySelectorAll("select");
    selects.forEach(select => {
        if (!select.value) {
            valido = false;
            mensajes.push(`Por favor selecciona un valor para "${select.name}".`);
        }
    });

    // Validar grupos de radios
    const radiosGroups = [
        "¿Qué prefieres hacer con tus Pokémon?",
        "¿Intercambias tus Pokémon?",
        "¿Participas en combates?"
    ];
    radiosGroups.forEach(name => {
        const checkedRadio = formPkm.querySelector(`input[name='${name}']:checked`);
        if (!checkedRadio) {
            valido = false;
            mensajes.push(`Debes seleccionar una opción para "${name}".`);
        }
    });

    if (!valido) {
        alert("El formulario no es válido:\n" + mensajes.join("\n"));
    }

    return valido;
}

/**
 * Cambia el fondo principal según el tipo de Pokémon seleccionado.
 * @param {string} tipo - El tipo de Pokémon seleccionado.
 */
function cambiarFondo(tipo) {
    const main = document.querySelector("main");
    
    const colores = {
        null: { prim: "var(--color-5)", sec: "var(--color-4)"},
        steel: { prim: "var(--color-acero)", sec: "var(--color-acero-sec)" },
        water: { prim: "var(--color-agua)", sec: "var(--color-agua-sec)" },
        bug: { prim: "var(--color-bicho)", sec: "var(--color-bicho-sec)" },
        dragon: { prim: "var(--color-dragon)", sec: "var(--color-dragon-sec)" },
        electric: { prim: "var(--color-electrico)", sec: "var(--color-electrico-sec)" },
        ghost: { prim: "var(--color-fantasma)", sec: "var(--color-fantasma-sec)" },
        fire: { prim: "var(--color-fuego)", sec: "var(--color-fuego-sec)" },
        fairy: { prim: "var(--color-hada)", sec: "var(--color-hada-sec)" },
        ice: { prim: "var(--color-hielo)", sec: "var(--color-hielo-sec)" },
        fighting: { prim: "var(--color-lucha)", sec: "var(--color-lucha-sec)" },
        normal: { prim: "var(--color-normal)", sec: "var(--color-normal-sec)" },
        grass: { prim: "var(--color-planta)", sec: "var(--color-planta-sec)" },
        psychic: { prim: "var(--color-psiquico)", sec: "var(--color-psiquico-sec)" },
        rock: { prim: "var(--color-roca)", sec: "var(--color-roca-sec)" },
        dark: { prim: "var(--color-siniestro)", sec: "var(--color-siniestro-sec)" },
        ground: { prim: "var(--color-tierra)", sec: "var(--color-tierra-sec)" },
        poison: { prim: "var(--color-veneno)", sec: "var(--color-veneno-sec)" },
        flying: { prim: "var(--color-volador)", sec: "var(--color-volador-sec)" },
        astral: { prim: "var(--color-astral)", sec: "var(--color-astral-sec)" },
        stellar: { prim: "var(--color-stellar)", sec: "var(--color-stellar-sec)" }
    };

    if (colores[tipo]) {
        main.style.backgroundColor = colores[tipo].prim;
        document.documentElement.style.setProperty('--color-boton-hover', colores[tipo].sec);
    }
}

/**
 * Guarda los datos del formulario si son válidos.
 */
function guardarForm() {
    if (validarForms()) {
        alert("Guardando datos...");

        const datos = {
            nombre: document.getElementById("name").value,
            birth: document.getElementById("birth").value,
            apodo: document.getElementById("apodo").value,
            mail: document.getElementById("mail").value,
            phone: document.getElementById("phone").value,
            juego: document.getElementById("game").value,
            region: document.getElementById("region").value,
            tipo: document.getElementById("type").value,
            rival: document.getElementById("rival").value,
            mote: document.getElementById("mote").value,
            rol: document.getElementById("rol").value,
            team: document.getElementById("team").value,
            treatment: document.querySelector("input[name='¿Qué prefieres hacer con tus Pokémon?']:checked").value,
            exchange: document.querySelector("input[name='¿Intercambias tus Pokémon?']:checked").value,
            duel: document.querySelector("input[name='¿Participas en combates?']:checked").value
        };

        console.log(datos);
    }
}

/**
 * Inicializa los eventos y carga los selects al cargar la página.
 */
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("save").addEventListener("click", guardarForm);
    
    cargarTiposPkm();
    cargarRegiones();
    cargarJuegos();
    cargarRivales();
    cargarTeams();
    cargarRoles();

    const selectTipo = document.getElementById("type");
    selectTipo.addEventListener("change", (e) => {
        const tipo = e.target.value; 
        cambiarFondo(tipo);
    });
});