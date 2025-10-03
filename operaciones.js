function depositar(monto) {
  const valor = Number(monto);
  if (isNaN(valor) || valor <= 0) {
    mostrarMensaje("Ingrese un monto válido", "error");
    return;
  }

  const cuenta = cuentas[divisaSeleccionada];
  cuenta.saldo += valor;
  cuenta.movimientos.push(new Movimiento("deposito", valor));
  guardarEnStorage();
  mostrarSaldo();
  mostrarHistorial();
  mostrarMensaje("Depósito realizado", "exito");
}

function retirar(monto) {
  const valor = Number(monto);
  if (isNaN(valor) || valor <= 0) {
    mostrarMensaje("Ingrese un monto válido", "error");
    return;
  }
  const cuenta = cuentas[divisaSeleccionada];
  if (valor > cuenta.saldo) {
    mostrarMensaje("Fondos insuficientes", "error");
    return;
  }
  cuenta.saldo -= valor;
  cuenta.movimientos.push(new Movimiento("retiro", valor));
  guardarEnStorage();
  mostrarSaldo();
  mostrarHistorial();
  mostrarMensaje("Retiro realizado", "exito");
}

/* Eventos */
botonDepositar.addEventListener("click", () => {
  depositar(montoIngresado.value);
  montoIngresado.value = "";
});

botonRetirar.addEventListener("click", () => {
  retirar(montoIngresado.value);
  montoIngresado.value = "";
});

selectorFiltro.addEventListener("change", mostrarHistorial);

botonLimpiarHistorial.addEventListener("click", () => {
  cuentas[divisaSeleccionada].movimientos = [];
  guardarEnStorage();
  mostrarHistorial();
  mostrarMensaje("Historial borrado", "exito");
});

selectorDivisa.addEventListener('change', () => {
  divisaSeleccionada = selectorDivisa.value;
  mostrarSaldo();
  mostrarHistorial();
});

/* Inicialización */
mostrarSaludo();
cargarDesdeStorage();
mostrarSaldo();
mostrarHistorial();
