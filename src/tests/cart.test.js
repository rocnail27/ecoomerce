const app = require("../app")
const supertest = require("supertest")
const Product = require("../models/Product")
require("../models")

const urlLoging = "/api/v1/users/logging"
const url = "/api/v1/cart"
let product;
let token;
let cartId;

beforeAll(async() => {

    const user = {
        email: "jdanielrojas@gmail.com",
        password: "123456"
    }
    const res = await supertest(app)
    .post(urlLoging)
    .send(user)
    token = res.body.token
})


test("GET -> '{url}', should return status 200, and length of 0",async() => {

    const res = await supertest(app)
    .get(url)
    .set("Authorization",`Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(0)

})

test("POST -> '{url}', should return status 201 and cuantity == bodyCart.cuantity and res.body.productId = product.id", async() => {

    const bodyProduct = {
        title: "xiaomi",
        description: "lorem20",
        price: "999.99",
        categoryId: null
    }

     product = await Product.create(bodyProduct)

    const bodyCart = {
        quantity:3,
        productId: product.id
    }

    const res = await supertest(app)
    .post(url)
    .send(bodyCart)
    .set("Authorization", `Bearer ${token}`)

    cartId = res.body.id
    
    expect(res.body.quantity).toBe(bodyCart.quantity)
    expect(res.body.productId).toBe(product.id)
    expect(res.status).toBe(201)

})


test("PUT -> '{url}/:id', should return status 200",async() => {

    const body = {
        quantity : 1
    }

   const res = await supertest(app)
   .put(`${url}/${cartId}`)
   .send(body)
   .set("Authorization", `Bearer ${token}`)

   expect(res.status).toBe(200)
   expect(res.body.quantity).toBe(body.quantity)


})


test("DELETE -> '${url}/:id' should return status 204", async() => {

    const res = await supertest(app)
    .delete(`${url}/${cartId}`)
    .set("Authorization",`Bearer ${token}`)

    expect(res.status).toBe(204)
    product.destroy()


})