import * as request from 'supertest';
import { app } from './app';

describe('App tests ->', () => {
  it('should response OK with request method', async () => {
    expect(app).toBeTruthy();
  });
});
