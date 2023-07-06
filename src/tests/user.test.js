const supertest = require("supertest")
const app = require("../app");
const { post } = require("../routes");


const url = "/api/v1/users"
let token;

beforeAll(async() => {

    const user = {
        email: "jdanielrojas@gmail.com",
        password: "123456"
    }
    const res = await supertest(app)
    .post(`${url}/logging`)
    .send(user)
    token = res.body.token

})


test("GET -> {url}, should return status 200 and length of 1",async() => {

  const res = await  supertest(app)
    .get(`${url}`)
    .set("Authorization", `Bearer ${token}`)
    console.log(res.body)
    expect(res.status).toBe(200) 
    expect(res.body).toHaveLength(1) 

})


test("PUT -> {url}/users/:id, should return status 200",async() => {
    const user = {
        firstName: "pepe"
    }
    const res = await supertest(app)
    .put(`${url}/1`)
    .send(user)
    .set("Authorization",`Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(user.firstName)

})

test("POST -> {url} , should return status 201", async() => {

    const user = {
        firstName: "jose",
        lastName: "rojas",
        email: "jdanielrojas16@gmail.com",
        password: "123456",
        phone: "04165825668"
    }

   const res = await  supertest(app)
    .post(url)
    .send(user)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(user.firstName)

})

test("POST '{url}/loggin', should return status 201", async() => {

    const user = {
        email: "jdanielrojas@gmail.com",
        password: "123456"
    }

    const res = await supertest(app)
    .post(`${url}/logging`)
    .send(user)

    expect(res.status).toBe(200)
    expect(res.body.user.email).toBe(user.email)
    expect(res.body.token).toBeDefined()
    
})




test("DELETE -> '{URL}' should return status 200", async() => {

    const res = await supertest(app)
    .delete(`${url}/2`)
    .set("Authorization",`Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toBe(1)
})