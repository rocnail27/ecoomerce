const supertest = require("supertest");
const Category = require("../models/Category");
require("../models")
const app = require("../app");
const ProductImg = require("../models/ProductImg");

const urlUserlogin = "/api/v1/users/logging"
const url = "/api/v1/products"
let token;
let category;
let productId;


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


test("POST ->  'URL', should return status 200", async() => {

    const category1 = {
        name:"refrigeration"
    }

    category = await Category.create(category1)
    
    const product = {
        title: "xiaomi",
        description: "lorem20",
        price: "999.99",
        categoryId: category.id

    }

    const res = await supertest(app)
    .post(url)
    .send(product)
    .set("Authorization",`Bearer ${token}`)

    productId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.title).toBe(product.title)
    
})

test("GET -> '{url}' , shoul return status 200 and length = 1",async() => {

    const res = await supertest(app)
    .get(url)

    console.log(res.body)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

})

test("GET -> '{url}/:id', should return status 200 and res.body.title = xiaomi", async() => {

    const res = await supertest(app)
    .get(`${url}/${productId}`)
    console.log(res.body)
    expect(res.body.title).toBe("xiaomi")
    expect(res.status).toBe(200)
    expect(res.body.category).toBeDefined()
    
})


test("PUT -> {url}/:id -> should return status 200 and res.body.title = product.title", async() => {

    const product = {
        title: "sansung"
    }

    const resData = await supertest(app)
    .put(`${url}/${productId}`)
    .send(product)
    .set("Authorization",`Bearer ${token}`)

    expect(resData.status).toBe(200)
    expect(resData.body.title).toBe(product.title)

})

test("GET -> '{url}?category=1' shoudld be category.id an status = 200", async() => {

    const res = await supertest(app)
    .get(`${url}?category=${category.id}`)


    expect(res.status).toBe(200)
    expect(res.body[0].categoryId).toBe(category.id)

})

test("POST -> '{URL}/:id/product_image' should return status 201", async() => {

    const productimgBody = {
        url: "http/link/bortua.jpg",
        filename: "bortua.jpg"
    }

    const {id} = await ProductImg.create(productimgBody)

    const res = await supertest(app)
    .post(`${url}/${productId}/product_image`)
    .send([id])
    .set("Authorization",`Bearer ${token}`)


    expect(res.status).toBe(200)
    expect(res.body.msg).toBe("imagen agregada")

})


test("DELETE -> '{url}/:id'm should return status 200 and res.body = 1", async() => {
  
    const res = await supertest(app)
    .delete(`${url}/${productId}`)
    .set("Authorization", `Bearer ${token}`)


    expect(res.status).toBe(204)  
    category.destroy()

})
