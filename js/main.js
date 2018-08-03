

function validar() {
  var exampleInputEmail1 = document.getElementById('exampleInputEmail1').value;
  var exampleInputPassword1 = document.getElementById('exampleInputPassword1').value;
  if (exampleInputEmail1.length == 0) {
    alert('Debe ingresar un email');
    document.getElementById("exampleInputEmail1").focus();
    return false;
  }
  if (isValidEmail(exampleInputEmail1) == false) {
    alert('Debe ingresar un email válido');
    document.getElementById("exampleInputEmail1").focus();
    return false;
  }
  if (exampleInputPassword1.length == 0) {
    alert('Debe ingresar una password');
    document.getElementById("exampleInputPassword1").focus();
    return false;
  }
  if (exampleInputPassword1.length > 8) {
    alert('La password no debe superar el tamaño 8');
    document.getElementById('exampleInputPassword1').value = '';
    document.getElementById("exampleInputPassword1").focus();
    return false;
  }
  var jnUsuario = {
    email: exampleInputEmail1,
    pass: exampleInputPassword1
  };
  localStorage.setItem("jnUsuario", JSON.stringify(jnUsuario));
  return true;
}

function isValidEmail(mail) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail);
}


function cargar_usuario() {
  var jnUsuario = JSON.parse(localStorage.getItem('jnUsuario'));
  document.getElementById('exampleFormControlInput1').value = jnUsuario.email;
}

var arrTarjetas = [];
function agregar_tarjeta() {
  var tarjeta = document.getElementById('tarjeta').value;
  if (tarjeta.length == 0) {
    alert('Debe ingresar una tarjeta');
    document.getElementById("tarjeta").focus();
  }
  var no_repite = true;
  for (var i = 0; i < arrTarjetas.length; i++) {
    var tarjeta_temp = arrTarjetas[i];
    if (tarjeta_temp == tarjeta) {
      no_repite = false;
    }
  }

  document.getElementById('tarjeta').value = '';

  if (!no_repite) {
    alert('Debe ingresar una tarjeta que no se repita');
    document.getElementById("tarjeta").focus();
  } else {
    arrTarjetas.push(tarjeta);
    dibuja_listado();
    localStorage.setItem("arrTarjetas", JSON.stringify(arrTarjetas));

  }
}

function dibuja_listado() {
  var txtListado = '';
  for (var i = 0; i < arrTarjetas.length; i++) {
    var tarjeta_temp = arrTarjetas[i];
    txtListado += '<li class="list-group-item">' + tarjeta_temp + '</li>';
  }
  document.getElementById('tarjetas').innerHTML = txtListado;

}

function cargar_tarjetas() {
  arrTarjetas = JSON.parse(localStorage.getItem('arrTarjetas'));
  var txtCombo = '<option value="0" selected>Seleccionar una tarjeta...</option>';
  for (var i = 0; i < arrTarjetas.length; i++) {
    var tarjeta_temp = arrTarjetas[i];
    txtCombo += '<option value="' + tarjeta_temp + '">' + tarjeta_temp + '</option>';
  }
  console.log(txtCombo)
  document.getElementById('inputGroupSelect01').innerHTML = txtCombo;
}

function ver_saldo() {
  var tarjeta = document.getElementById('tarjeta').value;
  var id = 0;
  if (tarjeta.length == 0) {
    var selector = document.getElementById('inputGroupSelect01');
    id = selector[selector.selectedIndex].value;
  } else {
    id = tarjeta;
  }
  const apiJSON = 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=' + id; // ruta al archivo
  let data = [];
  fetch(apiJSON) // acá le digo de donde va  a tomar los datos
    .then(response => response.json())
    .then(data => {
      document.getElementById('resultado').innerHTML = data.saldoTarjeta;
    });
}

function ver_saldo_menos_tarifa() {
  var selector = document.getElementById('inputGroupSelect00');
  var tarifa = selector[selector.selectedIndex].value;

  var tarjeta = document.getElementById('tarjeta').value;
  var id = 0;
  if (tarjeta.length == 0) {
    selector = document.getElementById('inputGroupSelect01');
    id = selector[selector.selectedIndex].value;
  } else {
    id = tarjeta;
  }


  const apiJSON = 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=' + id; // ruta al archivo
  let data = [];
  fetch(apiJSON) // acá le digo de donde va  a tomar los datos
    .then(response => response.json())
    .then(data => {
      document.getElementById('resultado1').innerHTML = '$' + tarifa;
      var saldo_formateado = data.saldoTarjeta;
      saldo_formateado = saldo_formateado.replace("$", "");
      saldo_formateado = saldo_formateado.replace(".", "");
      
      document.getElementById('resultado2').innerHTML = '$' + (parseInt(saldo_formateado) - tarifa);
    });
}

