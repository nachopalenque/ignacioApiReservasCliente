//definición de variables
const btnAbrirDialog = document.getElementById("abrirDialog")
const btnCerrarDialog = document.getElementById("cerrarDialog")
const dialogNuevaMesa= document.getElementById("dialogo") 


btnAbrirDialog.addEventListener("click", ()=>{
    dialogNuevaMesa.showModal();
})

btnCerrarDialog.addEventListener("click", ()=>{
    dialogNuevaMesa.close();
})