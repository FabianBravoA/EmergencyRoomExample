import { getEmergencyWaitingQueue, addPatientToWaitingQueue, popPatientFromWaitingQueue } from '../src/queue';

describe('Sistema de colas', () => {
  it('Entrega un arreglo como cola', () => {
    expect(Array.isArray(getEmergencyWaitingQueue())).toBe(true);
  });
  it('Si se agrega un paciente no grave, debería quedar último en la cola', () => {
    addPatientToWaitingQueue({
      name: 'the patient',
      age: 66,
      description: 'a description',
      emergencyLevel: 5,
    });

    addPatientToWaitingQueue({
      name: 'the bad patient',
      age: 66,
      description: 'a description',
      emergencyLevel: 1,
    });

    expect(popPatientFromWaitingQueue().name).toBe('the bad patient');
  });
  it('Debería quedar solo un paciente en la cola', () => {
    expect(getEmergencyWaitingQueue()).toHaveLength(1);
  });
});
