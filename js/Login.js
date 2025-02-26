




async function login() {

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let mensajeLogin = document.getElementById("mensajeLogin")
    let mensajeLoginText = document.createElement("div");


    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            
            body: JSON.stringify({username,password})

        });

        if (!response.ok) {

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
        }

        const usuario = await response.json();

        localStorage.setItem("token",usuario.token);
        localStorage.setItem("user", usuario.username);

        mensajeLoginText.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">
        <div>Se ha logeado correctamente. Cierre esta notificación para ir a sus reservas</div>
        <button type="button" id="btnCloseOk" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

        mensajeLogin.appendChild(mensajeLoginText);

        document.getElementById("usuarioLogeado").innerHTML = "Usuario conectado: "+usuario.username

        document.getElementById("btnCloseOk").addEventListener("click", ()=>{

            location.href = "reservas.html"

        })

    } catch (error) {
        console.error("Error:", error);
    }
}


document.getElementById("entrar").addEventListener("click", login)

