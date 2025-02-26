



document.getElementById("registrar").addEventListener("click", ()=>{

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const password = document.getElementById("password").value;
    const password2 = password;
    let mensajeLogin = document.getElementById("mensajeLogin")
    let mensajeLoginText = document.createElement("div");




    fetch('http://localhost:8080/auth/register', {
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
            },
          body: JSON.stringify({username,email,telefono,password,password2})

        })
        .then(response =>{

            if(!response.ok){


                mensajeLoginText.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
                <div>Usuario o contraseña incorrecta</div>
               <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
               </div>`
    
               mensajeLogin.appendChild(mensajeLoginText);
               document.getElementById("btnCloseOk").addEventListener("click", ()=>{
    
                    document.getElementById("username").value = ""
                    document.getElementById("password").value = ""
                    mensajeLogin.innerHTML = "";
    
    
               })
            throw new Error("Error en la autenticación");





            }else{


                return response.json();


            }
            
        })
        .then(datos =>{
            
            const usuario = datos;
            localStorage.setItem("token",usuario.token);
            localStorage.setItem("user", usuario.username);

            mensajeLoginText.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
            <div>Se ha logeado correctamente. Cierre esta notificación para ir a sus reservas</div>
            <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`
    
            mensajeLogin.appendChild(mensajeLoginText);
    
    
            document.getElementById("btnCloseOk").addEventListener("click", ()=>{
    
                location.href = "reservas.html"
    
            })


        } )

        .catch(error =>{
            console.error(error)
        })
    }
)

async function iniciarSesion(username,password){


    try{

        const response = await fetch('http://localhost:8080/auth/login',

            {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(username,password)
    
            })
    
            if(!response.ok){
                alert("Usuario o contraseña incorrectos")
                throw new Error("Error al logearse")
            }

            const data = await response.json();
            localStorage.setItem("token",data.token);
            location.href = "reservas.html"



    }
    catch(error){
        console.error(error);
    }



}

