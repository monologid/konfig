import StringUtil from './string';

test('generateSlug should return correct slug', () => {
  let stringUtil = new StringUtil('Lorem ipsum');
  let slug = stringUtil.generateSlug();
  expect(slug).toBe('lorem-ipsum');
});