//Para login con alert
const go = () => { //solo funciona con este nombre y contraseña
  if (document.form.password.value ==='laboratoria' &&  document.form.login.value ==='Valentina'){ 
    window.open('menu.html') //abre página index si se pone correcto
    } 
    else{ 
      alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
    } 
  }