import {
  getBoxes,
  assignPatientToBox,
  getBox,
  freeBox,
} from '../src/boxes';

describe('Sistema de boxes', () => {
  it('Debe entregar los boxes vacíos en un principio', () => {
    expect(getBoxes()).toHaveLength(6);
  });
  it('Debe asignar un paciente a un box', () => {
    assignPatientToBox({
      name: 'the patient',
      age: 66,
      description: 'a description',
      emergencyLevel: 1,
    },
    2);
    expect(getBox(2).patient).toBeDefined();
  });
  it('Debe poder liberar un box', () => {
    freeBox(2);
    expect(getBox(2).patient).toBeNull();
  });
});