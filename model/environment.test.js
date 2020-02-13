import EnvironmentModel from './environment';

test('validateApplicationId should return error if application id is undefined', () => {
  let model = new EnvironmentModel({});
  expect(model.validateApplicationId()).not.toBeUndefined();
});

test('validateApplicationId should return undefined if application id is exist', () => {
  let model = new EnvironmentModel({ applicationId: '12345' });
  expect(model.validateApplicationId()).toBeUndefined();
});

test('validateName should return error if name char length is less than 1', () => {
  let model = new EnvironmentModel({});
  expect(model.validateName()).not.toBeUndefined();
});

test('validateName should return undefined if name char length is more than 1', () => {
  let model = new EnvironmentModel({ name: 'staging' });
  expect(model.validateName()).toBeUndefined();
});