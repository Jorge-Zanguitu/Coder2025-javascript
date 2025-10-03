/* Referencias al DOM */
const saldoTexto = document.getElementById("saldoTexto");
const montoIngresado = document.getElementById("montoIngresado");
const botonDepositar = document.getElementById("botonDepositar");
const botonRetirar = document.getElementById("botonRetirar");
const listaHistorial = document.getElementById("listaHistorial");
const selectorFiltro = document.getElementById("selectorFiltro");
const botonLimpiarHistorial = document.getElementById("botonLimpiarHistorial");
const mensaje = document.getElementById("mensaje");
const selectorDivisa = document.getElementById("divisa");

/* Renderizado */
function mostrarSaldo() {
  const cuenta = cuentas[divisaSeleccionada];

  let simbolo;
  if (divisaSeleccionada === "pesos") {
    simbolo = "$";
  } else {
    simbolo = "US$";
  }

  saldoTexto.innerText = simbolo + cuenta.saldo.toFixed(2);
}

function limpiarHistorial() {
  listaHistorial.innerHTML = "";
}

function mostrarHistorial() {
  limpiarHistorial();
  const cuenta = cuentas[divisaSeleccionada];
  const filtro = selectorFiltro.value; // "todos", "deposito" o "retiro"

  // Filtrar movimientos según el selector
  const movimientosFiltrados = cuenta.movimientos.filter(function(m) {
    if (filtro === "todos") {
      return true;
    }
    if (m.tipo === "deposito") {
      return filtro === "deposito";
    } else {
      return filtro === "retiro";
    }
  });

  if (movimientosFiltrados.length === 0) {
    const li = document.createElement("li");
    li.className = "item-historial";
    li.innerText = "No hay movimientos para mostrar.";
    listaHistorial.appendChild(li);
    return;
  }

  movimientosFiltrados.forEach(function(mov) {
    const li = document.createElement("li");
    li.className = "item-historial";

    const divIzq = document.createElement("div");
    divIzq.className = "izquierda";

    const tipoDiv = document.createElement("div");
    tipoDiv.className = "tipo";
    if (mov.tipo === "deposito") {
      tipoDiv.innerText = "Depósito";
    } else {
      tipoDiv.innerText = "Retiro";
    }

    const fechaDiv = document.createElement("div");
    fechaDiv.className = "fecha";
    fechaDiv.innerText = mov.fecha.toLocaleString("es-AR");

    divIzq.appendChild(tipoDiv);
    divIzq.appendChild(fechaDiv);

    const divDer = document.createElement("div");
    divDer.className = "monto";
    divDer.innerText = "$" + mov.monto.toFixed(2);

    li.appendChild(divIzq);
    li.appendChild(divDer);
    listaHistorial.appendChild(li);
  });
}

/*  Mensajes de interfaz */
function mostrarMensaje(texto, tipo) {
  if (!tipo) {
    tipo = "error";
  }

  mensaje.innerText = texto;

  if (tipo === "error") {
    mensaje.style.color = "var(--rojo)";
  } else {
    mensaje.style.color = "var(--verde)";
  }

  setTimeout(function() {
    if (mensaje.innerText === texto) {
      mensaje.innerText = "";
    }
  }, 3000);
}


function mostrarSaludo() {
  const ahora = new Date();
  let horas = ahora.getHours();
  let minutos = ahora.getMinutes();

  // AM o PM
  let periodo = "AM";
  if (horas >= 12) {
    periodo = "PM";
  }

  // Convertir a formato de 12 horas
  if (horas === 0) {
    horas = 12;
  } else if (horas > 12) {
    horas = horas - 12;
  }

  if (minutos < 10) {
    minutos = "0" + minutos;
  }

  const saludo = "Bienvenido, son las " + horas + ":" + minutos + " " + periodo;
  document.getElementById("saludo").textContent = saludo;
}
