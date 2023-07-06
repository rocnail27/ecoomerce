const supertest = require("supertest")
const Category = require("../models/Category");
const app = require("../app");

const urlUserlogin = "/api/v1/users/logging"
const url = "/api/v1/categories"
let token;
let idCategory;



beforeAll(async() => {

    const user = {
        email: "jdanielrojas@gmail.com",
        password: "123456"
    }
    const res = await supertest(app)
    .post(urlUserlogin)
    .send(user)
    token = res.body.token
    console.log(token)

})


test("GET -> '{url}', should return status 200 and length = 0 ", async() => {

    const res = await  supertest(app)
    .get(url)

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)


})


test("POST -> '{url}' should return status 201", async() => {

    const category = {
        name:"refrigeration"
    }

    const res = await supertest(app)
    .post(url)
    .send(category)
    .set("Authorization", `Bearer ${token}`)

    console.log(res.body)

    idCategory = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(category.name)


})

test("DELETE -> '{url}/:id', should return status 200", async() => {

        const res = await supertest(app)
        .delete(`${url}/${idCategory}`)
        .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(200)
        expect(res.body).toBe(1)

})


