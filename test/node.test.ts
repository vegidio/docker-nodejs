import axios from 'axios'

beforeAll(() => {
    expect.assertions(3)
})

describe('Test Node.js', () =>
{
    test('Check Node app 1', () => {
        return axios.get('http://localhost/app/helloworld1')
            .then((res) => {
                expect(res.status).toBe(200)
                expect(res.headers).toHaveProperty('content-type', 'text/plain')
                expect(res.data).toEqual(expect.stringContaining('Hello world with npm start!'))
            })
    })

    test('Check Node app 2', () => {
        return axios.get('http://localhost/world')
            .then((res) => {
                expect(res.status).toBe(200)
                expect(res.headers).toHaveProperty('content-type', 'text/plain')
                expect(res.data).toEqual(expect.stringContaining('Hello World with direct script call!'))
            })
    })
})