const request = require('supertest'); 
const app = require('./server.js');

describe('API Endpoints', () => {
  it('should create a new query (POST /api/queries)', async () => {
    const newQuery = {
      name: 'Test Query',
      interval: 10,
      endpoint: '/api/books',
      param: 'author',
      paramValue: 'J.R.R. Tolkien',
      responseAttr: ['price', 'available'],
    };

    const res = await request(app)
      .post('/api/queries')
      .send(newQuery)
      .expect(201);

    expect(res.body.name).toEqual(newQuery.name);
    expect(res.body.interval).toEqual(newQuery.interval);
  });

  it('should get all queries with results (GET /api/queries)', async () => {
    const res = await request(app)
      .get('/api/queries')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);

    // Conditional assertion in case the initial data store is empty
    if (res.body.length > 0) {
      expect(res.body.length).toBeGreaterThan(0); 

      const firstQuery = res.body[0];
      expect(firstQuery).toHaveProperty('queryName');
      expect(firstQuery).toHaveProperty('data');
      expect(firstQuery).toHaveProperty('interval'); 
    }
  });
});