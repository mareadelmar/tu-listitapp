// VARIABLES BOTONES

let btnModal = document.getElementById("btn-modal");
let btnAdd = document.getElementById("btn-add");
let btnCerrarModal = document.getElementById("cerrar-modal");
let listaItems = document.getElementById("lista-items");
let btnCerrarDetalle = document.getElementById("btn-cerrardetalle");
let btnBorrarItem = document.getElementById("borrar-items");

let dataStorage = localStorage.getItem("listadoCompras");
let listadoStorage = [];

// VARIABLES SECCIONES

let secInicio = document.getElementById("sec-inicio");
let secModal = document.getElementById("sec-modal");
let secListaItems = document.getElementById("sec-listaitems");
let secDetalles = document.getElementById("sec-detalles");

let formValidarTitulo = document.getElementById("form-titulo");
let formValidarCategoria = document.getElementById("form-categorias");

if (dataStorage) {
    //let guardarListadoStorage = [...dataStorage];

    secInicio.style.display = "none";
    secListaItems.style.display = "block";

    listaItems.innerHTML += dataStorage;

    //para que me siga guardando toda la lista: (si no siempre va quedando solo la última sesión)
    let lis = document.getElementsByTagName("li");
    for (i of lis) {
        listadoStorage.push(i.outerHTML);
        console.log(listadoStorage);
    }
} else {
    secListaItems.style.display = "none";
    secInicio.style.display = "block";
    //listadoStorage = [];
}

const mq = window.matchMedia("(min-width: 992px)");

const handleMQ = (e) => {
    console.log("cambió la mediaquery");
    if (e.matches) {
        //holi
    }
};

mq.addEventListener("change", handleMQ);

// ABRIR MODAL/FORMULARIO

btnModal.addEventListener("click", function () {
    formValidarTitulo.value = "";
    formValidarCategoria.value = "";
    document.getElementById("form-descrip").value = "";

    secModal.style.display = "block";
});

// VALIDAR FORMULARIO

let contenedorForm = document.getElementById("sec-nuevoitem");
contenedorForm.addEventListener("submit", validarFormulario);

function validarFormulario(e) {
    if (formValidarTitulo.value == 0 || formValidarCategoria.value == 0) {
        alert("Ingresa nombre y categoría de tu producto.");
        e.preventDefault();
    }
}

// CERRAR MODAL

btnCerrarModal.addEventListener("click", () => {
    secModal.style.display = "none";
});

// AGREGAR ÍTEM A LA LISTA

btnAdd.addEventListener("click", agregarItem);

function agregarItem() {
    let formTitulo = document.getElementById("form-titulo").value;
    let formCategorias = document.getElementById("form-categorias").value;
    let formDescrip = document.getElementById("form-descrip").value;

    validarFormulario();

    let modelo = `<li class="lista-producto" data-titulo="${formTitulo}" data-icono="${formCategorias}" data-descrip="${formDescrip}"><img class="lista-imagen" src="${formCategorias}">${formTitulo}</li>`;

    listaItems.innerHTML += modelo;
    listadoStorage.push(modelo);
    localStorage.setItem("listadoCompras", listadoStorage);
    console.log(listadoStorage);

    secModal.style.display = "none";
    secInicio.style.display = "none";
    secDetalles.style.display = "none";
    secListaItems.style.display = "block";
}

// VER DETALLE DEL ÍTEM

listaItems.addEventListener("click", function (e) {
    let elementoLI = e.target.closest("li");

    document.getElementById(
        "detalle-titulo"
    ).innerHTML = elementoLI.getAttribute("data-titulo");
    document.getElementById("detalle-icono").src = elementoLI.getAttribute(
        "data-icono"
    );
    document.getElementById(
        "detalle-descrip"
    ).innerHTML = elementoLI.getAttribute("data-descrip");

    if (mq.matches) {
        // seguir mostrando detalles pero agregarle la clase que lo muestra a la derecha
        //secListaItems.style.display = "none";
        console.log("pantalla grande");
        //btnModal.style.display = "none";
        secDetalles.style.display = "block";
    } else {
        secListaItems.style.display = "none";
        btnModal.style.display = "none";
        secDetalles.style.display = "block";
    }
});

// CERRAR DETALLE DEL ÍTEM

btnCerrarDetalle.addEventListener("click", function () {
    secDetalles.style.display = "none";
    secListaItems.style.display = "block";
    btnModal.style.display = "block";
});

// BORRAR TODA LA LISTA

btnBorrarItem.addEventListener("click", function (e) {
    localStorage.clear();
    listadoStorage = [];
    while (listaItems.firstChild) {
        listaItems.removeChild(listaItems.firstChild);
    }
    secListaItems.style.display = "none";
    secInicio.style.display = "block";
    console.log(listadoStorage);
    console.log(localStorage);
});
