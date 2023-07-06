const app = require("../app")
const supertest = require("supertest")
const path = require("path") 

const urlUser = "/api/v1/users"
const url = "/api/v1/product_images"
let token;
let ProductImgId;

beforeAll(async() => {

    const user = {
        email: "jdanielrojas@gmail.com",
        password: "123456"
    }
    const res = await supertest(app)
    .post(`${urlUser}/logging`)
    .send(user)
    token = res.body.token

})

test("POST ->  'url' should return status 201 ", async() => {


    const imgBody = {

        url: "http://localhost:8080/cocina.jpg",
        filename: "cocina.jpg"

    }

    const res  = await supertest(app)
    .post(url)
    .send(imgBody)
    .set("Authorization", `Bearer ${token}`)
   

    ProductImgId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.filename).toBe("cocina.jpg")

})

test("GET -> 'url' should return status 200, res.body.length = 1", async() => {

     const res = await supertest(app)
     .get(url)
     .set("Authorization", `Bearer ${token}`)


     console.log(ProductImgId)
     expect(res.status).toBe(200)
     expect(res.body[0].filename).toBeDefined()

})

test("DELETE -> 'url/:id' should return status 204", async() => {

   
    const urldelete = `${url}/${ProductImgId}`
    console.log(urldelete)

    const res = await supertest(app)
    .delete(urldelete)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)

})


