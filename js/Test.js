document.getElementById("btnAbrirDocumentacion").addEventListener("click", ()=>{

    window.location.href = 'http://localhost:8080/swagger-ui/index.html';


})

document.getElementById("btnAddHorarios").addEventListener("click",  insertarHorariosTest)

document.getElementById("btnAddMesas").addEventListener("click", insertarMesasTest)


async function insertarHorariosTest(){

    try {

        let mensajeTest = document.getElementById("panelNotificacion")
        let mensajeTestText = document.createElement("div");

        const response = await fetch("http://localhost:8080/horario/test", {
            method:'POST'
        })
        if(!response.ok){


        mensajeTestText.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
        <div>Ha ocurrido un error al intentar crear los horarios de prueba. Intentelo más tarde o pongase en contacto con el administrador</div>
        <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

        mensajeTest.appendChild(mensajeTestText);

        setTimeout(()=>mensajeTest.innerHTML="", 3000);

        }else{

     

        mensajeTestText.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
        <div>Se han creado los horarios para realizar pruebas correctamente</div>
        <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

        mensajeTest.appendChild(mensajeTestText);

        setTimeout(()=>mensajeTest.innerHTML="", 3000);

        }
    } catch (error) {
        console.error(error)
    }
}

async function insertarMesasTest(){

    try {

        let mensajeTest = document.getElementById("panelNotificacion")
        let mensajeTestText = document.createElement("div");

        const response = await fetch("http://localhost:8080/mesa/test", {
            method:'POST'
      
        })
        if(!response.ok){


        mensajeTestText.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
        <div>Ha ocurrido un error al intentar crear las mesas de prueba. Intentelo más tarde o pongase en contacto con el administrador</div>
        <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

        mensajeTest.appendChild(mensajeTestText);

        setTimeout(()=>mensajeTest.innerHTML="", 3000);

        }else{

     

        mensajeTestText.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
        <div>Se han creado las mesas para realizar pruebas correctamente</div>
        <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

        mensajeTest.appendChild(mensajeTestText);

        setTimeout(()=>mensajeTest.innerHTML="", 3000);

        }
    } catch (error) {
        console.error(error)
    }
}