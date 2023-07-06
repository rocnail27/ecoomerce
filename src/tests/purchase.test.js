const app = require("../app")
const supertest = require("supertest")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
require("../models")

const urlLogin = "/api/v1/users/logging"
const url = "/api/v1/purcharses"
let token;
let productId;
let userId;

beforeAll(async() => {

    const user = {
        email: "jdanielrojas@gmail.com",
        password: "123456"
    }

    const res = await supertest(app)
    .post(urlLogin)
    .send(user)  
    
    userId = res.body.user.id

    token = res.body.token
})


test("POST -> '{url}', shoudl return status = 200 and res.body.productId = productId", async() => {

    const product = {
        title: "xiaomi",
        description: "lorem20",
        price: "999.99",
        categoryId: undefined

    }

    const {id} = await Product.create(product)
   console.log(id)
   productId = id

    const cart = {

        quantity: 2,
        productId,
        userId,
        
    }

    
    const createdCar = await Cart.create(cart) 
    console.log(createdCar)
    const res = await  supertest(app)
    .post(url)
    .send(cart)
    .set("Authorization", `Bearer ${token}`)
    
        console.log(res.body[0])
    expect(res.status).toBe(201)
    expect(res.body[0].userId).toBe(userId)
    expect(res.body[0].productId).toBe(productId)
    
})

test("GET -> '{url}', shoudl return status = 200 and length = 1", async() => {


    const res = await supertest(app)
    .get(url)
    .set("Authorization",`Bearer ${token}`)


    expect(res.status).toBe(200)
    expect(res.body[0].userId).toBe(userId)

    Product.destroy({where:{id:productId}})
    

})