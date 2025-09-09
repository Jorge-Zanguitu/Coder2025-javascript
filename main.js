let saldo = 10000; // saldo inicial en la cuenta
const movimientos = []; // array para guardar historial de operaciones

// Función para mostrar el menú principal
function mostrarMenu() {
  return parseInt(prompt(
    "Bienvenido al Cajero Automático\n\n" +
    "1. Consultar saldo\n" +
    "2. Depositar dinero\n" +
    "3. Retirar dinero\n" +
    "4. Ver historial de movimientos\n" +
    "5. Salir\n\n" +
    "Ingrese una opción:"
  ));
}

// Función para consultar saldo
function consultarSaldo() {
  alert("Su saldo actual es: $" + saldo);
  movimientos.push("Consulta de saldo: $" + saldo);
}

// Función para depositar dinero
function depositar() {
  let monto = parseFloat(prompt("Ingrese el monto a depositar:"));
  if (monto > 0) {
    saldo += monto;
    alert("Depósito exitoso. Nuevo saldo: $" + saldo);
    movimientos.push("Depósito: $" + monto);
  } else {
    alert("Monto inválido.");
  }
}

// Función para retirar dinero
function retirar() {
  let monto = parseFloat(prompt("Ingrese el monto a retirar:"));
  if (monto > 0 && monto <= saldo) {
    saldo -= monto;
    alert("Retiro exitoso. Nuevo saldo: $" + saldo);
    movimientos.push("Retiro: $" + monto);
  } else if (monto > saldo) {
    alert("Fondos insuficientes.");
  } else {
    alert("Monto inválido.");
  }
}

// Función para ver historial
function verHistorial() {
  if (movimientos.length === 0) {
    alert("No se registran movimientos todavía.");
  } else {
    let historialTexto = "Historial de movimientos:\n\n";

    for (let i = 0; i < movimientos.length; i++) {
      historialTexto += (i + 1) + ". " + movimientos[i] + "\n";
    }

    alert(historialTexto); 
    console.log(historialTexto);
  }
}

// Función principal del simulador
function iniciarCajero() {
  let opcion;
  do {
    opcion = mostrarMenu();
    switch (opcion) {
      case 1:
        consultarSaldo();
        break;
      case 2:
        depositar();
        break;
      case 3:
        retirar();
        break;
      case 4:
        verHistorial();
        break;
      case 5:
        alert("Gracias por usar el cajero. ¡Hasta luego!");
        break;
      default:
        alert("Opción inválida. Intente nuevamente.");
    }
  } while (opcion !== 5);
}

// Llamada a la función principal
iniciarCajero();
