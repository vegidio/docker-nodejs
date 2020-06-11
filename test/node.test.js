const axios = require('axios');

beforeAll(() => {
    expect.assertions(3);
});

describe('Test Node.js', () =>
{
    test('Check Node app 1', () => {
        return axios.get('http://localhost:8081')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.headers).toHaveProperty('content-type', 'text/plain');
                expect(res.data).toEqual(expect.stringContaining('Hello world with yarn start!'));
            });
    });

    test('Check Node app 2', () => {
        return axios.get('http://localhost:8082')
            .then((res) => {
                expect(res.status).toBe(200);
                expect(res.headers).toHaveProperty('content-type', 'text/plain');
                expect(res.data).toEqual(expect.stringContaining('Hello World with direct script call!'));
            });
    });
});