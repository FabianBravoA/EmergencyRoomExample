/*
 * Un paciente consistirá en un diccionario, con los siguientes campos :
 * {
 *   name: "Nombre del paciente",
 *   emergencyLevel: 1, // Nivel de emergencia que tiene el paciente
 *   age: 25, // Edad del paciente
 *   description: "Corte profundo", // Descripción de la emergencia
 *   enqueueDate: new Date(),
 * }
 */

/*
 * Guardamos todos los pacientes en un arreglo, el que mantendremos ordenado
 * según los niveles de urgencia.
 */
const emergencyWaitingQueue = [];

/*
 * Retorna el arreglo de pacientes tal cual, sirve para esconder la implementación
 * de la cola en caso de que queramos cambiarla en el futuro, siempre manteniendo
 * las mismas funciones y sus parámetros y valores de retorno, de manera que el
 * resto del código sigue funcionando sin que tengamos que hacer modificaciones.
 */
export const getEmergencyWaitingQueue = () => emergencyWaitingQueue;

/*
 * Agrega un nuevo paciente al arreglo, pero manteniendo "el invariante", ¿qué
 * significa esto? Que el arreglo debe seguir ordenado según los niveles de
 * emergencia de cada paciente.
 */
export const addPatientToWaitingQueue = (patient) => {
  emergencyWaitingQueue.push(patient);
  emergencyWaitingQueue.sort(
    (aPatient, bPatient) => aPatient.emergencyLevel - bPatient.emergencyLevel,
  );
};

/*
 * Filtra el arreglo, devolviendo uno nuevo con solo los elementos que cumplen
 * con el nivel de emergencia.
 */
export const filterPatientsByEmergency = (emergencyLevel) => emergencyWaitingQueue.filter(
  (aPatient) => aPatient.emergencyLevel === emergencyLevel,
);

/*
 * Remueve el primer paciente del arreglo retornándolo como resultado de la
 * función. Esto es precisamente lo que hace la función shift de los arreglos.
 *
 * Estado Previo :
 * [{name: "Paciente 1", ...}, {name: "Paciente 2", ...}, {name: "Paciente 3", ...}]
 * Estado Posterior :
 * [{name: "Paciente 2", ...}, {name: "Paciente 3", ...}]
 * Valor de Retorno:
 * {name: "Paciente 1", ...}
 */
export const popPatientFromWaitingQueue = () => emergencyWaitingQueue.shift();
