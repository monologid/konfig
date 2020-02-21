import NamespaceModel from './namespace';

test('validateApplicationId should return error if application id is undefined', () => {
  let model = new NamespaceModel({});
  expect(model.validateApplicationId()).not.toBeUndefined();
});

test('validateApplicationId should return undefined if application id is exist', () => {
  let model = new NamespaceModel({ applicationId: '12345' });
  expect(model.validateApplicationId()).toBeUndefined();
});

test('validateName should return error if name char length is less than 1', () => {
  let model = new NamespaceModel({});
  expect(model.validateName()).not.toBeUndefined();
});

test('validateName should return undefined if name char length is more than 1', () => {
  let model = new NamespaceModel({ name: 'staging' });
  expect(model.validateName()).toBeUndefined();
});

test('toJSON should return correct json', () => {
  let model = new NamespaceModel({ applicationId: '12345', name: 'staging' });
  expect(model.toJSON()).not.toBeUndefined();
});