let mascotas = [];

const especies = [
    "Perro",
    "Gato",
    "Conejo",
    "Hámster",
    "Cuyo",
    "Cobaya",
    "Hurón",
    "Perico",
    "Canario",
    "Cotorro",
    "Pez",
    "Tortuga",
    "Gecko",
    "Iguana",
    "Otro",
]

let resgistro = null;

function cargarEspecies() {
    const select = document.getElementById("especie");

    for (const especie of especies) {
        const option = document.createElement("option");
        option.value = especie.toLowerCase();
        option.textContent = especie;

        select.appendChild(option);
    }
}

function crearTarjeta(nombre, edad, especie, vacunado, descripcion) {
    const tarjetero = document.getElementById("tarjetero")
    const tarjeta = `<article class="tarjeta contenedor"> <div class="contenido"> <h2> ${nombre} </h2> <p> Edad: ${edad} </p> <p> Especie: ${especie} </p> <p> Vacunado: ${vacunado} </p> <p> Descripción: ${descripcion} </p> </div> </article> `
    tarjetero.insertAdjacentHTML("beforeend", tarjeta);
}

async function validarForm() {
    let valido = true;
    let mensajes = [];

    if (!resgistro) {
        alert("No se encontró el formulario de registro.");
        return false;
    }

    // Validar inputs de texto y número
    const inputsText = resgistro.querySelectorAll("input[type='text'], input[type='number']");
    inputsText.forEach(input => {
        if (!input.value.trim()) {
            valido = false;
            mensajes.push(`El campo "${input.name}" no puede estar vacío.`);
        }
    });

    // Validar select de especie
    const especieSelect = resgistro.querySelector("select[name='especie']");
    if (!especieSelect || !especieSelect.value || especieSelect.value === "null") {
        valido = false;
        mensajes.push(`Por favor selecciona una especie.`);
    }

    // Validar radio vacunado
    const radioGroup = resgistro.querySelector("input[name='vacunado']:checked");
    if (!radioGroup) {
        valido = false;
        mensajes.push(`Debes seleccionar una opción para "vacunado".`);
    }

    const textArea = document.getElementById("descripcion");
    if (!textArea.value) {
        valido = false;
        mensajes.push('Debes escribir una descripción de tu mascota');
    }

    if (!valido) {
        alert("El formulario no es válido: \n" + mensajes.join("\n"));

        return false;
    }

    return true;
}

async function registrarMascota() {
    const formValido = await validarForm();

    if (formValido) {
        const radioChecked = document.querySelector("input[name='vacunado']:checked");
        const mascota = {
            nombre: document.getElementById("nombre").value,
            edad: document.getElementById("edad").value,
            especie: document.getElementById("especie").value,
            vacunado: radioChecked ? radioChecked.value : "",
            descripcion: document.getElementById("descripcion").value,
        }

        alert("Mascota registrada: " + JSON.stringify(mascota));
        console.log("Mascota registrada: ", mascota);

        mascotas.push(mascota);

        crearTarjeta(mascota.nombre, mascota.edad, mascota.especie, mascota.vacunado, mascota.descripcion);

        // Actualizar el número de mascotas en el HTML
        const numMascotasSpan = document.getElementById("numMascotas");
        if (numMascotasSpan) {
            numMascotasSpan.textContent = mascotas.length;
        }
        resgistro.reset();
    } else {
        return;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    resgistro = document.getElementById("registro");
    document.getElementById("registrar").addEventListener("click", registrarMascota);
    cargarEspecies();
});