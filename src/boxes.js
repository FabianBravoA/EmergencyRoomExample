/*
 * Representamos un box como un diccionario con los siguientes campos :
 * {
 *   id: 1, // Identificador con número
 *   patient: {name: "Un Paciente", ...}, // Datos del paciente
 *   startTimestamp: new Date(), // Fecha y hora de ingreso
 * }
 */

const totalBoxes = 6;
const boxes = [];
for(let i = 0; i < totalBoxes; ++i) 
  boxes.push({
    id: (i+1),
    patient: null,
    startTimestamp: null
  });

/*
 * Entregamos el arreglo de boxes sin ninguna modificación
 */
export const getBoxes = () => {
  return boxes;
};

export const getBox = (boxId) => {
  return boxes.find(box => box.id === boxId);
};

/*
 * Al asignar un paciente no creamos un nuevo box, si no que llenamos sus campos
 * para mantener los datos del paciente guardados.
 */
export const assignPatientToBox = (boxId, patient) => {
  const box = boxes.find(box => box.id === boxId);

  //Verificamos que el box exista
  if(!box) return;

  //Verificamos que no esté ocupado
  if(box.patient) return;


  //Si no está ocupado asignamos el paciente y anotamos la fecha de entrada
  box.patient = patient;
  box.startTimestamp = new Date();
};

export const freeBox = (boxId) => {
  const box = boxes.find(box => box.id === boxId);
  //Verificamos que el box exista
  if(!box) return;

  box.patient = null;
  box.startTimestamp = null;
};