const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const uuid = require("uuid/v4");
const stripe = require("stripe")(
    // eslint-disable-next-line max-len
    "sk_test_51JPqwMSCpDbJSRKiKgwro0p1u3DORA29rV1sxYrxYdyXhyxdR4q4xHDfFPzFfIY9Uc66roohdIBnTLAq1oyJ0DDJ003kMx3q6m"
);
// - API

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved!! for this amount >>> ", total);
  stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "inr",
  }).then((paymentIntent) => {
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });
  // OK- created
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/clone-8d46b/us-central1/api
