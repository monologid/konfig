import CryptoUtil from './crypto';

test('encrypt should encrypt a text', () => {
  let text = 'hello world';
  let cryptoUtil = new CryptoUtil(text);
  let encryptedText = cryptoUtil.encrypt();
  expect(encryptedText).not.toBe(text);
});

test('decrypt should decrypt an encrypted text', () => {
  let text = 'hello world';
  let cryptoUtil = new CryptoUtil(text);
  let encryptedText = cryptoUtil.encrypt();
  let decryptedText = (new CryptoUtil(encryptedText)).decrypt();
  expect(decryptedText).toBe(text);
});