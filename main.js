class Movimiento {
  constructor(tipo, monto, fecha = new Date()) {
    this.tipo = tipo; // "deposito" o "retiro"
    this.monto = Number(monto);
    this.fecha = new Date(fecha);
  }

 mostrarTexto() {
  const fechaTexto = this.fecha.toLocaleString("es-AR");
  const montoTexto = this.monto.toFixed(2);

  let etiqueta;
  if (this.tipo === "deposito") {
    etiqueta = "Depósito";
  } else {
    etiqueta = "Retiro";
  }

  return fechaTexto + " " + etiqueta + " $" + montoTexto;
  }
}

/* Constantes de storage */
const CLAVE_CUENTAS = "cajero_cuentas";

let cuentas = {
  pesos: {
    saldo: 10000,
    movimientos: [],
  },
  dolares: {
    saldo: 500,
    movimientos: [],
  },
};

// Variable para saber en qué divisa está operando el usuario
let divisaSeleccionada = "pesos";


/* Cargar y guardar estado */
function cargarDesdeStorage() {
  const datosGuardados = localStorage.getItem(CLAVE_CUENTAS);
  if (datosGuardados) {
    try {
      cuentas = JSON.parse(datosGuardados);
    } catch {
      cuentas = {
        pesos: { saldo: 10000, movimientos: [] },
        dolares: { saldo: 500, movimientos: [] },
      };
    }
  }
}

function guardarEnStorage() {
  localStorage.setItem(CLAVE_CUENTAS, JSON.stringify(cuentas));
}
