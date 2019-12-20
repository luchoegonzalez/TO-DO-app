const input = document.querySelector('.input');
const agregar = document.querySelector('.boton');
const lista = document.querySelector('.lista');
var newItem;
const hecho = document.querySelector('.hecho');
var vacio = false;
const add = document.querySelector('.add');
var texto;
var tareas;
var completadas;
if (localStorage.getItem('tareas') == null) {
    tareas = [];
} else {
    tareas = JSON.parse(localStorage.getItem('tareas'));
};
if (localStorage.getItem('completado') == null) {
    completadas = [];
} else {
    completadas = JSON.parse(localStorage.getItem('completado'));
};

agregar.addEventListener('click', addTarea);

function addTarea () {
    texto = input.value;
    
    if (!texto) {
        agregar.classList.add('error-boton');
        add.classList.add('error-boton');
        input.placeholder = "Por favor añade una tarea...";
        vacio = true;
        return false;
    } else {
        dibujar(texto, 'null');
        lista.insertBefore(newItem, lista.childNodes[0]);
        input.value = "";
        tareas.push(texto);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}

//var i
window.addEventListener('load', cargar);
function cargar () {
    tareas.forEach((tarea) => {
        console.log(tarea);
        dibujar(tarea, 'null');
        lista.insertBefore(newItem, lista.childNodes[0]);
    })

    completadas.forEach((completa) => {
        dibujar(completa, 'tickeado');
        console.log(completa);
        hecho.insertBefore(newItem, hecho.childNodes[0]);
        newItem.classList.add('marcado');
    })

}

function dibujar(txt, classTick) {
        let div = document.createElement('div');
        div.classList.add('div');

        newItem = document.createElement("li");
        let contenido = document.createTextNode(txt);

        let btnMarcar = document.createElement("button");
        btnMarcar.classList.add('marcar');
        btnMarcar.classList.add(`${classTick}`);

        let btnBorrar = document.createElement("button");
        btnBorrar.classList.add('borrar');

        let tick = document.createElement('i');
        tick.classList.add('icon-ok');
        let equis = document.createElement('i');
        equis.classList.add('icon-cancel');

        btnMarcar.appendChild(tick);
        btnBorrar.appendChild(equis);

        newItem.appendChild(contenido);
        div.appendChild(btnBorrar);
        div.appendChild(btnMarcar);
        newItem.appendChild(div);

        btnMarcar.addEventListener("click", marcarTarea);
        btnBorrar.addEventListener("click", borrarTarea);
}

//     datos.todo.forEach ((_tarea) => 
//         console.log(_tarea)
//     );

//     for(i = 0; i < datos.todo.length; i++) {
//         let tarea = JSON.stringify(datos.todo[i]);

//         let div = document.createElement('div');
//         div.classList.add('div');

//         newItem = document.createElement("li");
//         let localtxt = document.createTextNode(tarea);

//         let btnMarcar = document.createElement("button");
//         btnMarcar.classList.add('marcar');

//         let btnBorrar = document.createElement("button");
//         btnBorrar.classList.add('borrar');

//         let tick = document.createElement('i');
//         tick.classList.add('icon-ok');
//         let equis = document.createElement('i');
//         equis.classList.add('icon-cancel');

//         newItem.appendChild(localtxt);
//         div.appendChild(btnBorrar);
//         div.appendChild(btnMarcar);
//         newItem.appendChild(div);
//         lista.appendChild(newItem);
//         btnMarcar.appendChild(tick);
//         btnBorrar.appendChild(equis);

//         btnMarcar.addEventListener("click", marcarTarea);
//         btnBorrar.addEventListener("click", borrarTarea);
//     }
//     }

input.addEventListener("click", check);
function check () {
    if (vacio) {
        input.classList.remove('error');
        agregar.classList.remove('error-boton');
        input.placeholder = 'Añade una tarea...';
        add.classList.remove('error-boton');
        vacio = false;
    }
}

input.addEventListener('keyup', enter);
function enter (e) {
    if (e.keyCode == 13) {
        addTarea();
    } else {
        check();
    }
}

function borrarTarea () {
    var hijo = this.parentNode.parentNode;
    let lista = hijo.parentNode;
    lista.removeChild(hijo);
    
    let cont = hijo.innerText;
    if (hijo.className == 'marcado') {
        completadas.splice(completadas.indexOf(cont), 1);
        localStorage.setItem('completado', JSON.stringify(completadas));
    } else {
        tareas.splice(tareas.indexOf(cont), 1);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
}

function marcarTarea () {
    var hijo = this.parentNode.parentNode;

    if (hijo.className == 'marcado') {
        lista.insertBefore(hijo, lista.childNodes[0]);
        hijo.classList.remove('marcado');
        this.classList.remove('tickeado');

        let cont = hijo.innerText;
        completadas.splice(completadas.indexOf(cont), 1);
        localStorage.setItem('completado', JSON.stringify(completadas));

        tareas.push(cont);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    } else {
        hecho.insertBefore(hijo, hecho.childNodes[0]);
        hijo.classList.add('marcado');
        this.classList.add('tickeado');

        
        let cont = hijo.innerText;
        tareas.splice(tareas.indexOf(cont), 1);
        localStorage.setItem('tareas', JSON.stringify(tareas));


        completadas.push(cont);
        localStorage.setItem('completado', JSON.stringify(completadas));
    }
}