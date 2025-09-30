/**
 * Simulador de Cajero - Entrega 2
 * Variables, funciones y clases en español
 * Sin window, sin DOMContentLoaded
 */

class Movimiento {
  constructor(tipo, monto, fecha = new Date()) {
    this.tipo = tipo;          // "deposito" | "retiro"
    this.monto = Number(monto);
    this.fecha = new Date(fecha);
  }

  mostrarTexto() {
    const fechaTexto = this.fecha.toLocaleString('es-AR');
    const montoTexto = this.monto.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const etiqueta = this.tipo === 'deposito' ? 'Depósito' : 'Retiro';
    return `${fechaTexto} · ${etiqueta} · $${montoTexto}`;
  }
}

/* --------------------
   Constantes de storage
   -------------------- */
const CLAVE_SALDO = 'cajero_saldo';
const CLAVE_MOVIMIENTOS = 'cajero_movimientos';

/* --------------------
   Estado
   -------------------- */
let saldo = 0;
let listaMovimientos = [];

/* --------------------
   Referencias al DOM
   -------------------- */
const saldoTexto = document.getElementById('saldoTexto');
const montoIngresado = document.getElementById('montoIngresado');
const botonDepositar = document.getElementById('botonDepositar');
const botonRetirar = document.getElementById('botonRetirar');
const listaHistorial = document.getElementById('listaHistorial');
const selectorFiltro = document.getElementById('selectorFiltro');
const botonLimpiarHistorial = document.getElementById('botonLimpiarHistorial');
const mensaje = document.getElementById('mensaje');

/* --------------------
   Cargar y guardar estado
   -------------------- */
function cargarDesdeStorage() {
  const saldoGuardado = localStorage.getItem(CLAVE_SALDO);
  const movimientosGuardados = localStorage.getItem(CLAVE_MOVIMIENTOS);

  saldo = saldoGuardado ? parseFloat(saldoGuardado) : 10000;

  if (movimientosGuardados) {
    try {
      const array = JSON.parse(movimientosGuardados);
      listaMovimientos = array.map(obj => new Movimiento(obj.tipo, obj.monto, obj.fecha));
    } catch {
      listaMovimientos = [];
    }
  } else {
    listaMovimientos = [];
  }
}

function guardarEnStorage() {
  localStorage.setItem(CLAVE_SALDO, saldo.toString());
  const objetos = listaMovimientos.map(m => ({ tipo: m.tipo, monto: m.monto, fecha: m.fecha.toISOString() }));
  localStorage.setItem(CLAVE_MOVIMIENTOS, JSON.stringify(objetos));
}

/* --------------------
   Renderizado
   -------------------- */
function mostrarSaldo() {
  saldoTexto.innerText = `$${saldo.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function limpiarHistorial() {
  listaHistorial.innerHTML = '';
}

function mostrarHistorial() {
  limpiarHistorial();
  const filtro = selectorFiltro.value; // "todos" | "deposito" | "retiro"

  const movimientosFiltrados = listaMovimientos.filter(m => {
    if (filtro === 'todos') return true;
    return m.tipo === filtro;
  });

  if (movimientosFiltrados.length === 0) {
    const li = document.createElement('li');
    li.className = 'item-historial';
    li.textContent = 'No hay movimientos para mostrar.';
    listaHistorial.appendChild(li);
    return;
  }

  movimientosFiltrados.forEach(mov => {
    const li = document.createElement('li');
    li.className = 'item-historial';

    const divIzq = document.createElement('div');
    divIzq.className = 'izquierda';
    const tipoSpan = document.createElement('div');
    tipoSpan.className = 'tipo';
    tipoSpan.innerText = mov.tipo === 'deposito' ? 'Depósito' : 'Retiro';
    const fechaSpan = document.createElement('div');
    fechaSpan.className = 'fecha';
    fechaSpan.innerText = mov.fecha.toLocaleString('es-AR');
    divIzq.appendChild(tipoSpan);
    divIzq.appendChild(fechaSpan);

    const divDer = document.createElement('div');
    divDer.className = 'monto';
    divDer.innerText = `$${mov.monto.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    li.appendChild(divIzq);
    li.appendChild(divDer);
    listaHistorial.appendChild(li);
  });
}

/* --------------------
   Mensajes de interfaz
   -------------------- */
function mostrarMensaje(texto, tipo = 'error') {
  mensaje.innerText = texto;
  mensaje.style.color = tipo === 'error' ? 'var(--rojo)' : 'var(--verde)';
  setTimeout(() => { if (mensaje.innerText === texto) mensaje.innerText = ''; }, 3000);
}

/* --------------------
   Operaciones
   -------------------- */
function depositar(monto) {
  const valor = Number(monto);
  if (isNaN(valor) || valor <= 0) {
    mostrarMensaje('Ingrese un monto válido', 'error');
    return;
  }
  saldo += valor;
  listaMovimientos.push(new Movimiento('deposito', valor));
  guardarEnStorage();
  mostrarSaldo();
  mostrarHistorial();
  mostrarMensaje('Depósito realizado', 'exito');
}

function retirar(monto) {
  const valor = Number(monto);
  if (isNaN(valor) || valor <= 0) {
    mostrarMensaje('Ingrese un monto válido', 'error');
    return;
  }
  if (valor > saldo) {
    mostrarMensaje('Fondos insuficientes', 'error');
    return;
  }
  saldo -= valor;
  listaMovimientos.push(new Movimiento('retiro', valor));
  guardarEnStorage();
  mostrarSaldo();
  mostrarHistorial();
  mostrarMensaje('Retiro realizado', 'exito');
}

/* --------------------
   Eventos
   -------------------- */
botonDepositar.addEventListener('click', () => {
  depositar(montoIngresado.value);
  montoIngresado.value = '';
});

botonRetirar.addEventListener('click', () => {
  retirar(montoIngresado.value);
  montoIngresado.value = '';
});

selectorFiltro.addEventListener('change', mostrarHistorial);

botonLimpiarHistorial.addEventListener('click', () => {
  listaMovimientos = [];
  guardarEnStorage();
  mostrarHistorial();
  mostrarMensaje('Historial borrado', 'exito');
});

/* --------------------
   Inicialización
   -------------------- */
cargarDesdeStorage();
mostrarSaldo();
mostrarHistorial();
