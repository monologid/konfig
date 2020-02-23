import { MockRepository } from '../repository/_base';
import NamespaceService from './namespace';
import Error from '../const/error';

class MockNamespaceRepository extends MockRepository {
  constructor() {
    super();
  }

  async findById(id) {
    if (id == '12345') return { variable: { host: '1.1.1.1' } };
    return { variable: { port: 9000 } };
  }
}

test('create should return error if applicationId is undefined', async () => {
  let mockNamespaceRepo = new MockNamespaceRepository();
  let svc = new NamespaceService({ namespaceRepository: mockNamespaceRepo });
  
  let [err] = await svc.create({});
  expect(err).toBe(Error.NamespaceAppIdIsMandatory);
});

test('create should return error if namespace name is undefined', async () => {
  let mockNamespaceRepo = new MockNamespaceRepository();
  let svc = new NamespaceService({ namespaceRepository: mockNamespaceRepo });
  
  let [err] = await svc.create({ applicationId: '12345' });
  expect(err).toBe(Error.NamespaceNameMinLength);
});

test('create should return success', async () => { 
  let mockNamespaceRepo = new MockNamespaceRepository();
  let svc = new NamespaceService({ namespaceRepository: mockNamespaceRepo });
  
  let [err] = await svc.create({ applicationId: '12345', name: 'staging' });
  expect(err).toBeUndefined();
});

test('updateVariable should return success', async () => {
  let mockNamespaceRepo = new MockNamespaceRepository();
  let svc = new NamespaceService({ namespaceRepository: mockNamespaceRepo });

  let [err] = await svc.updateVariable({ namespaceId: '12345', variable: {} });
  expect(err).toBeUndefined();
});

test('mergeVariable should return success', async () => {
  let mockNamespaceRepo = new MockNamespaceRepository();
  let svc = new NamespaceService({ namespaceRepository: mockNamespaceRepo });
  
  let [err, finalVariable] = await svc.mergeVariable({ sourceNamespaceId: '12345', targetNamespaceId: '67890' });
  expect(err).toBeUndefined();
  expect(finalVariable).toEqual({ host: '1.1.1.1', port: 9000 })
});

test('mergeVariable should return error if source namespace id is undefined', async () => {
  let mockNamespaceRepo = new MockNamespaceRepository();
  let svc = new NamespaceService({ namespaceRepository: mockNamespaceRepo });

  let [err] = await svc.mergeVariable({ targetNamespaceId: '1234' });
  expect(err).toBe(Error.NamespaceSourceIdIsMandatory);
});

test('mergeVariable should return error if target namespace id is undefined', async () => {
  let mockNamespaceRepo = new MockNamespaceRepository();
  let svc = new NamespaceService({ namespaceRepository: mockNamespaceRepo });

  let [err] = await svc.mergeVariable({ sourceNamespaceId: '1234' });
  expect(err).toBe(Error.NamespaceTargetIdIsMandatory);
});