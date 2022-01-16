
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors');
const stripe = require('stripe')('sk_test_51KIFrdL9oEF5ovuXEdgG1AE9jGuXAE1WZCe2LWxaE2GJQeCBbD4rrYhZqvSfzN8fpjVDhxkIWgqJoRrBSh5nDeZW00ZNhUq1hM')

//APi

//APP config

const app = express()

//Middleware
app.use(cors({origin:true}))
app.use(express.json())
//API routes
app.get('/',(request,response)=> response.status(200).send
('hello World'))

app.get('/adi',(request,response)=> response.status(200).send
('hello Adi'))

app.post
('/payments/create',async(request,response) => {
    const total = request.query.total

    console.log('Payment request received buddy',total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount:total,
        currency:'usd'
    })
    response.status(201).send({
        clientSecret:paymentIntent.client_secret
    })
})
//Listen
exports.api = functions.https.onRequest(app)