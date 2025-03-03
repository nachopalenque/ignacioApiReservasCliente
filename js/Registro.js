



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
            localStorage.setItem("user", usuario.username);

            //primer inicio de sesión tras registrarse para almacenar el token 
    
                
                fetch('http://localhost:8080/auth/login',

                    {
                        method:"POST",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify({username,password})
            
                    })
                    .then(response =>{

                        //no se ha podido iniciar sesion
                        if(!response.ok){


                            mensajeLoginText.innerHTML = `<div class="alert alert-danger alert-dismissible" role="alert">
                            <div>No se ha podido iniciar sesión</div>
                           <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                           </div>`
                
                           mensajeLogin.appendChild(mensajeLoginText);
                           document.getElementById("btnCloseOk").addEventListener("click", ()=>{
                
                                document.getElementById("username").value = ""
                                document.getElementById("password").value = ""
                                mensajeLogin.innerHTML = "";
                
                
                           })

                           setTimeout(mensajeLogin.innerHTML = "", 2000);

                        }

                        //se ha podido iniciar sesion, guardamos el token y redirigimos al panel de reservas del usuario.

                        else {

                            return response.json()

                        }





                    })

                    .then(datos =>{


                        const sesion = datos
                        localStorage.setItem("token",sesion.token);

                        mensajeLoginText.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
                        <div>Se ha logeado correctamente. Redirigiendo al panel de reservas...</div>
                        <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`
                
                        mensajeLogin.appendChild(mensajeLoginText);
                
                
                        document.getElementById("btnCloseOk").addEventListener("click", ()=>{
                
                            location.href = "reservas.html"
                
                        })
        
                        setTimeout(()=>{
                            mensajeLoginText.innerHTML = "";
                            location.href = "reservas.html"
                        }, 2000)




                    })

                    .catch(error =>{
                        console.error(error)
                    })

                
                
            


        } )

        .catch(error =>{
            console.error(error)
        })
    }
)

