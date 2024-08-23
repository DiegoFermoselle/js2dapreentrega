// Variables globales
const costosMaterial = {
    PLA: 0.05,
    ABS: 0.07,
    PETG: 0.06
};
const costoPorHora = 10;

// Funciones para calcular costos
function calcularCostoMaterial(material, cantidad) {
    return costosMaterial[material] * cantidad;
}

function calcularCostoTiempo(tiempo) {
    return costoPorHora * tiempo;
}

function calcularCostoTotal(config) {
    let costoMaterial = calcularCostoMaterial(config.material, config.cantidad);
    let costoTiempo = calcularCostoTiempo(config.tiempo);
    let costoOpciones = 0;

    if (config.opciones.soporte) costoOpciones += 5;
    if (config.opciones.acabado) costoOpciones += 7;

    return costoMaterial + costoTiempo + costoOpciones;
}

// Función principal
function simuladorDeCostos() {
    let continuar = true;

    do {
        // Capturar entradas
        let material = prompt("Ingrese el tipo de material (PLA, ABS, PETG):").toUpperCase();
        let cantidad = parseFloat(prompt("Ingrese la cantidad de material (en gramos):"));
        let tiempo = parseFloat(prompt("Ingrese el tiempo de impresión (en horas):"));
        let soporte = prompt("¿Necesita soporte? (si/no):").toLowerCase() === 'si';
        let acabado = prompt("¿Necesita acabado? (si/no):").toLowerCase() === 'si';

        // Validar entradas
        if (!costosMaterial[material]) {
            alert("Material no reconocido.");
            continue; // Reiniciar la iteración si el material no es válido
        }
        if (isNaN(cantidad) || isNaN(tiempo)) {
            alert("Cantidad o tiempo inválido.");
            continue; // Reiniciar la iteración si la cantidad o tiempo son inválidos
        }

        // Crear objeto con las opciones
        let opciones = {
            soporte: soporte,
            acabado: acabado
        };

        // Crear configuración y calcular el costo total
        let configuracion = {
            material: material,
            cantidad: cantidad,
            tiempo: tiempo,
            opciones: opciones
        };

        let costoTotal = calcularCostoTotal(configuracion);

        // Mostrar resultados
        console.log(`Material: ${material}`);
        console.log(`Cantidad: ${cantidad} gramos`);
        console.log(`Tiempo de impresión: ${tiempo} horas`);
        console.log(`Soporte: ${soporte ? "Sí" : "No"}`);
        console.log(`Acabado: ${acabado ? "Sí" : "No"}`);
        console.log(`Costo total: $${costoTotal.toFixed(2)}`);
        alert(`El costo total de la impresión es: $${costoTotal.toFixed(2)}`);

        // Preguntar si el usuario desea solicitar otro presupuesto o terminar
        continuar = prompt("¿Desea solicitar otro presupuesto? (si/no):").toLowerCase() === 'si';

    } while (continuar);

    alert("Gracias por utilizar el simulador de costos. ¡Hasta la próxima!");
}

// Ejecutar el simulador
simuladorDeCostos();
