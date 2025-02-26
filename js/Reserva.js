//definición de constantes
const btnAbrirDialog = document.getElementById("abrirDialog")
const btnCerrarDialog = document.getElementById("cerrarDialog")
const dialogNuevaMesa= document.getElementById("dialogo") 
const selectHorarios = document.getElementById("horaReserva");
const fecha_reserva = document.getElementById("fechaReserva");
const numComensales = document.getElementById("numComensales");
const cajaMesas = document.getElementById("cajaMesas");
const token = localStorage.getItem("token");
const user = localStorage.getItem('user');
const main = document.querySelector("main");
const cuerpoTabla = document.getElementById('cuerpoTabla');
const btnReservar = document.getElementById('btnReservar');


//definicion de variables
let objCliente;
let idMesa;


document.getElementById("aLogout").addEventListener("click", ()=>{

    let mensajeLogout = document.getElementById("mensajeLogout")
    let mensajeLogoutText = document.createElement("div");

    mensajeLogoutText.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
    <div>Se ha cerrado sesión. Cierre esta notificación para volver al login</div>
   <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>`

   mensajeLogout.appendChild(mensajeLogoutText);
   document.getElementById("btnCloseOk").addEventListener("click", ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    location.href = "index.html"



   })

})

btnAbrirDialog.addEventListener("click", ()=>{
    dialogNuevaMesa.showModal();
})

btnCerrarDialog.addEventListener("click", ()=>{
    dialogNuevaMesa.close();
})

dialogNuevaMesa.addEventListener("close", ()=>{
    fecha_reserva.value = ""
    selectHorarios.value = ""
    numComensales.value = ""
    cajaMesas.innerHTML = ""
})


selectHorarios.addEventListener("change", ()=>{

    cajaMesas.innerHTML = ""
    cargarMesasDisponibles(fecha_reserva.value, selectHorarios.value);


})

btnReservar.addEventListener("click", nuevaReserva )

window.addEventListener("load", ()=>{

    const today = new Date().toISOString().split('T')[0];
    document.getElementById("usuarioLogeado").innerHTML = "Usuario conectado: "+user;
    fecha_reserva.setAttribute('min', today);
    cargarCliente();
    cargarHorarios();
    cargarReservasCliente();

})


async function cargarCliente(){

try {

    const response = await fetch('http://localhost:8080/cliente/username/'+user,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    if(!response.ok){

        throw new Error("Ha ocurrido un error al intentar obtener el cliente");

    }else{
        objCliente = await response.json()
    }

    
} catch (error) {
    console.error(error)
}


}


async function cargarHorarios(){

    try {


        const response = await fetch("http://localhost:8080/horarios", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if(!response.ok){

            throw new Error("Ha ocurrido un error al intentar obtener los tramos horarios");


        }else{

            const datos = await response.json();

            for(let hora of datos){

                let option = document.createElement("option");
                option.value = hora.id
                option.textContent = hora.tramoHorario
                selectHorarios.appendChild(option)

            }

        }
        
    } catch (error) {
        
        console.error(error);


    }



}

async function cargarReservasCliente(){

    try {
        
        const response = await fetch('http://localhost:8080/ReservasUsername/'+user, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        if(!response.ok){
            throw new Error("Ha ocurrido un error al intentar obtener las reservas");

        }else{

            const reservas = await response.json()

            for(let reserva of reservas){

                let fila = document.createElement('tr');

                fila.id = reserva.id_reserva
                fila.innerHTML = `
                <td>${reserva.fecha_reserva}</td>
                <td>${reserva.nombre}</td>
                <td>${reserva.hora_reserva}</td>
                <td>${reserva.numero_mesa}</td>
                <td>${reserva.numero_personas_reserva}</td>

                <td>
                  <div class="mb-3 d-flex justify-content-center">
                      <button id="btnEditarReserva" class="btn btn-success m-1">Editar</button>
                      <button id="btnCancelaReserva" onclick="eliminarReserva(${fila.id})" class="btn btn-danger m-1">Cancelar</button>
                  </div>
                
                </td>`


                cuerpoTabla.appendChild(fila);



            }


        }
        




    } catch (error) {
        console.error(error);
    }



}

async function cargarMesasDisponibles(fecha_reserva, id_horario) {



    try {




        const response = await fetch(`http://localhost:8080/mesa/${fecha_reserva}/${id_horario}`,{

            method:'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
    
        })

        if(!response.ok){


            throw new Error("Ha ocurrido un error al intentar obtener las mesas");


        }else{


            const mesas = await response.json()

            for(let mesa of mesas){

                let btnMesa = document.createElement("button");
                btnMesa.id = mesa.id;
                btnMesa.textContent = "Mesa Nº: "+mesa.numeroMesa;
                btnMesa.className = "btn btn-secondary m-1"
                cajaMesas.appendChild(btnMesa)

                btnMesa.addEventListener("click",() => {

                    //recorro todos los botones y voy replazando la clase a la clase del boton por defecto. De esta manera evito tener seleccionado mas de uno
                    document.querySelectorAll("button").forEach(button => button.classList.replace("btn-success", "btn-secondary"));

                    let infoMesa = document.createElement("div")
                        infoMesa.innerHTML = `<div class="position-absolute top-50 start-50 translate-middle alert alert-info alert-dismissible fade show" role="alert">
                        <strong>Descripción de la mesa:</strong><br>
                        <span>${mesa.descripcion}</span> .
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
                        idMesa = btnMesa.id
                        cajaMesas.appendChild(infoMesa)
                        btnMesa.className = "btn btn-success m-1"


                })

            }

        }
    

        
    } catch (error) {
        console.error(error);
    }



    
}

async function nuevaReserva(){

    try {

        let fechaFormateada = formatearFecha(fecha_reserva.value);
        const reserva = {

            "fechaReserva": fechaFormateada,
            "numeroPesonaras": numComensales.value,
            "cliente":{"id":objCliente.id},
            "horario":{"id":selectHorarios.value},
            "mesa":{"id":idMesa},
            "numeroPersonas":numComensales.value

        }


        const response = await fetch("http://localhost:8080/reserva", {
            
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify(reserva)

        });

        if (!response.ok) {

        throw new Error("Error en la autenticación");
        }

        const nuevaReserva = await response.json();

        let fila = document.createElement('tr');


        fila.innerHTML = `
        <td>${nuevaReserva.fechaReserva}</td>
        <td>${nuevaReserva.cliente.nombre}</td>
        <td>${nuevaReserva.tramoHorario}</td>
        <td>${nuevaReserva.mesa.numeroMesa}</td>
        <td>${nuevaReserva.numeroPersonas}</td>

        <td>
          <div class="mb-3 d-flex justify-content-center">
              <button id="btnEditarReserva" class="btn btn-success m-1">Editar</button>
              <button id="btnCancelaReserva" class="btn btn-danger m-1">Cancelar</button>
          </div>
        
        </td>`

        fila.id = nuevaReserva.id
        cuerpoTabla.appendChild(fila);
        dialogNuevaMesa.close();




  

    } catch (error) {
        console.error("Error:", error);
    }

}

async function eliminarReserva(id_reserva){

    try {

        const response = await fetch('http://localhost:8080/reserva/'+id_reserva, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if(!response.ok){

            throw new Error("Ha ocurrido un error al intentar eliminar la reserva");

        }

        let filaEliminada = document.getElementById(id_reserva)
        filaEliminada.remove();
        
        
    } catch (error) {
        console.error(error)
    }


}

function formatearFecha(fecha) {
    let input = fecha;  // Obtener valor del input (en formato YYYY-MM-DD)
    
    // Dividir el valor en partes (año, mes, día)
    let partes = input.split("-");

    // Obtener el día, mes y año
    let dia = partes[2];  // Día
    let mes = partes[1];  // Mes
    let año = partes[0];  // Año

    // Formatear como DD-MM-YYYY
    let fechaFormateada = `${dia}-${mes}-${año}`;

    // Mostrar la fecha formateada
    return fechaFormateada;
  }