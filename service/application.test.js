import { MockRepository } from '../repository/_base';
import ApplicationService from './application';
import Error from '../const/error';

class MockApplicationRepository extends MockRepository {
  constructor() {
    super();
  }

  async findBySlug(slug) {
    return {};
  }
}

test('register should return error if application name character length is less than 3', async () => {
  let mockAppRepo = new MockApplicationRepository();
  let svc = new ApplicationService({ applicationRepository: mockAppRepo });

  let params = { name: 'a' };
  let [err] = await svc.register(params);
  expect(err).toBe(Error.AppNameMinLength);
});

test('register should return error if application name is exist', async () => {
  let mockAppRepo = new MockApplicationRepository();
  mockAppRepo.findBySlug = async () => { return { name: 'Dummy App', slug: 'dummy-app', description: 'A dummy application' } };
  
  let svc = new ApplicationService({ applicationRepository: mockAppRepo });

  let params = { name: 'Dummy App' };
  let [err] = await svc.register(params);
  expect(err).toBe(Error.AppNameIsExist);
});

test('register should return success', async () => {
  let mockAppRepo = new MockApplicationRepository();
  mockAppRepo.findBySlug = async function() { return {} };
  let svc = new ApplicationService({ applicationRepository: mockAppRepo });
  expect(svc).toHaveProperty('applicationRepository');

  let params = { name: 'Dummy App' };
  let [err, application] = await svc.register(params);
  expect(err).toBeUndefined()
});

test('getAll should return list of applications', async () => {
  let mockAppRepo = new MockApplicationRepository();
  mockAppRepo.findAll = async (params) => { return [ { name: 'Dummy App', slug: 'dummy-app', description: 'A dummy application' } ] };
  let svc = new ApplicationService({ applicationRepository: mockAppRepo });
  let [err, applications] = await svc.getAll({});
  expect(err).toBeUndefined();
  expect(applications.length).toBeGreaterThan(0);
});