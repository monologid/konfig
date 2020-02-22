import ApplicationModel from './application';

test('validateName should return undefined', () => {
  let model = new ApplicationModel({ name: 'lorem ipsum' });
  expect(model.validateName()).toBeUndefined();
});

test('validateName should return error', () => {
  let model = new ApplicationModel({ name: 'lor' });
  expect(model.validateName).not.toBe(undefined);
});

test('toJSON should include slug', () => {
  let model = new ApplicationModel({ name: 'Lorem IPsum' });
  let err = model.validateName();
  expect(err).toBeUndefined();
  expect(model.toJSON().slug).toBe('lorem-ipsum');
});