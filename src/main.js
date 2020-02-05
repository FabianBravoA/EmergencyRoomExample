import * as Queue from './queue';
import * as Boxes from './boxes';

/*
 * Guardamos las referencias a todos los nodos HTML de interés. Recordar también
 * que al trabajar con módulos no podemos hacer referencia a funciones de estos
 * archivos JS desde el HTML, solo puede ser desde JS a HTML para trabajar con
 * el DOM.
 */
const boxesNode = document.getElementById('boxes');
const queueNode = document.getElementById('queue');
const dateNode = document.getElementById('date');

// Formulario de ingreso de pacientes
const nameNode = document.getElementById('name');
const ageNode = document.getElementById('age');
const emergencyLevelNode = document.getElementById('emergencyLevel');
const descriptionNode = document.getElementById('description');
const toggleAdmissionButton = document.getElementById('toggleAdmissionButton');
const admissionEnterButton = document.getElementById('admissionEnterButton');
const admissionForm = document.getElementById('admissionForm');

const toggleAdmissionAction = (event) => {
  if (event) event.preventDefault();

  if (toggleAdmissionButton.classList.contains('fa-arrow-down')) {
    toggleAdmissionButton.classList.remove('fa-arrow-down');
    toggleAdmissionButton.classList.add('fa-arrow-up');

    admissionForm.classList.remove('open');
    admissionForm.classList.add('closed');
  } else {
    toggleAdmissionButton.classList.remove('fa-arrow-up');
    toggleAdmissionButton.classList.add('fa-arrow-down');

    admissionForm.classList.remove('closed');
    admissionForm.classList.add('open');
  }
};

toggleAdmissionButton.addEventListener('click', toggleAdmissionAction);

const admissionEnterAction = (event) => {
  if (event) event.preventDefault();

  const name = nameNode.value;
  const age = parseInt(ageNode.value, 10);
  const emergencyLevel = parseInt(emergencyLevelNode.value, 10);
  const description = descriptionNode.value;

  Queue.addPatientToWaitingQueue({
    name,
    age,
    emergencyLevel,
    description,
    enqueueDate: new Date(),
  });

  nameNode.value = '';
  ageNode.value = 20;
  emergencyLevelNode.value = 1;
  descriptionNode.value = '';

  toggleAdmissionAction();
};

admissionEnterButton.addEventListener('click', admissionEnterAction);

const drawBoxes = () => {
  const boxes = Boxes.getBoxes();

  /*
   * Limpieza del nodo HTML para volver a escribir sobre el. Más o menos la
   * misma lógica que sigue react para hacer render, pero esta vez estará
   * haciendo esto constantemente para mostrar que el tiempo avanza.
   *
   * El flujo de datos es unidireccional, va desde los arreglos que mantienen
   * el estado de la aplicación hacia los nodos.
   */
  boxesNode.innerHTML = '';

  boxes.forEach((box) => {
    boxesNode.innerHTML += `
    <div class="boxWrapper">
      <div class="box">
        <h3>Box ${box.id}</h3>
        <h4>${box.patient ? box.patient.name : ''}</h4>
        <button id="boxAction${box.id}" class="boxActionButton">
          <i class="fas ${box.patient ? 'fa-window-close' : 'fa-notes-medical'}"></i>
        </button>

        <div class="status emergency_level_${box.patient ? box.patient.emergencyLevel : 'empty'}">
          <p>${box.patient ? 'ATENDIENDO' : 'LIBRE'}</p>
        </div>
      </div>
    <div class="boxWrapper">
    `;
  });

  boxesNode.querySelectorAll('button').forEach(
    (boxActionButton) => boxActionButton.addEventListener('click', () => {
      const boxId = parseInt(boxActionButton.id.replace('boxAction', ''), 10);
      const box = Boxes.getBox(boxId);
      if (box.patient) {
        Boxes.freeBox(boxId);
      } else {
        Boxes.assignPatientToBox(boxId, Queue.popPatientFromWaitingQueue());
      }
    }),
  );
};

const drawQueue = () => {
  const queue = Queue.getEmergencyWaitingQueue();

  queueNode.innerHTML = '';

  queue.forEach((patient) => {
    queueNode.innerHTML += `
      <div class="queuedItem">
        <p class="patientName">${patient.name}</p>
        <div class="patientStatus emergency_level_${patient.emergencyLevel}">
          <p>ESI-${patient.emergencyLevel}</p>
          <p>${(new Date((new Date()).getTime() - patient.enqueueDate.getTime())).toISOString().slice(11, 19)}</p>
        </div>
      </div>
    `;
  });
};

const drawDate = () => {
  dateNode.innerHTML = (new Date()).toLocaleTimeString();
};

setInterval(drawBoxes, 900);
setInterval(drawDate, 300);
setInterval(drawQueue, 300);
