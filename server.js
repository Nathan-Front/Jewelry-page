import "dotenv/config";
import express from "express";
import cors from "cors";

import {
    ApiError,
    Client,
    Environment,
    LogLevel,
    OrdersController
} from "@paypal/paypal-server-sdk";

const pendingOrders = new Map();
const app = express();

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const {
    PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET,
    PORT = 8080
} = process.env;

const client = new Client({
    clientCredentialsAuthCredentials: {
        oAuthClientId: PAYPAL_CLIENT_ID,
        oAuthClientSecret: PAYPAL_CLIENT_SECRET
    },
    environment: Environment.Sandbox,
    logging: {
        logLevel: LogLevel.Info
    }
});

const ordersController = new OrdersController(client);

async function ordersCreate(orderRef, cart) {
    
    const subtotal = cart.reduce((sum, item) => {
        return sum + Number(item.price) * Number(item.quantity);
    }, 0);

    const tax = subtotal * 0.10;
    const grandTotal = subtotal + tax;
    const collect = {
   body: {
      intent: "CAPTURE",
      purchaseUnits: [{
         customId: orderRef,

         amount: {
            currencyCode: "USD",
            value: grandTotal.toFixed(2),
            breakdown: {
                itemTotal: {
                  currencyCode: "USD",
                  value: subtotal.toFixed(2)
                },
                taxTotal: {
                    currencyCode: "USD",
                    value: tax.toFixed(2)
                }
            }
         },

         items: cart.map(item => ({
            name: item.name,
            quantity: String(item.quantity),
            unitAmount: {
               currencyCode: "USD",
               value: Number(item.price).toFixed(2)
            }
         }))
      }]
   }
};
    


    const { body, ...httpResponse } =
        await ordersController.ordersCreate(collect);
    return {
        jsonResponse: JSON.parse(body),
        httpStatusCode: httpResponse.statusCode
    };
}

app.post("/api/orders", async (req, res) => {

    try {
         const { orderRef, cart } = req.body;

    const { jsonResponse, httpStatusCode } =
      await ordersCreate(orderRef, cart);

    // PayPal order id
    const paypalOrderId = jsonResponse.id;

    // store original data for later capture
    pendingOrders.set(paypalOrderId, {
      orderRef,
      cart
    });
    res.status(httpStatusCode).json(jsonResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to create order"
        });
    }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
         const { orderID } = req.params;

    const { body, ...httpResponse } =
      await ordersController.ordersCapture({
        id: orderID
      });

    const captureData = JSON.parse(body);

    const savedOrder = pendingOrders.get(orderID);
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       // orderRef: savedOrder.orderRef,
        paypalId: orderID,
        name: captureData.payer.name.given_name,
        surname: captureData.payer.name.surname,
        email: captureData.payer.email_address, 
        items: savedOrder.cart
          .map(item => `${item.name}`),
        quantity: savedOrder.cart
          .map(item => `${item.quantity}`),
        subTotal: savedOrder.cart
            .reduce((sum, item) => {
            return sum + Number(item.price) * Number(item.quantity);
            }, 0)
        .toFixed(2),
        grandTotal: captureData.purchase_units[0]
          .payments.captures[0].amount.value,
        address1: captureData.purchase_units[0]
          .shipping.address.address_line_1,
        area1: captureData.purchase_units[0]
          .shipping.address.admin_area_1,
        area2: captureData.purchase_units[0]
          .shipping.address.admin_area_2,
        country: captureData.purchase_units[0]
          .shipping.address.country_code,
        postal: captureData.purchase_units[0]
          .shipping.address.postal_code,
        status: "PAID"
      })
    });

    const sheetResult = await response.json();
    pendingOrders.delete(orderID);
    //res.status(httpResponse.statusCode).json(captureData);
    
    res.json({
        paypal: captureData,
        orderId: sheetResult
    });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Failed to capture order"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});