require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");

const authRoutes =
  require("./routes/authRoutes");

const aiRoutes =
  require("./routes/aiRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/ai", aiRoutes);

console.log("MONGO URI:",
  process.env.MONGO_URI
);

// ✅ MongoDB Connect
mongoose.connect(
  process.env.MONGO_URI
)
.then(() =>
  console.log(
    "MongoDB connected ✅"
  )
)
.catch((err) =>
  console.log(
    "Mongo Error ❌",
    err
  )
);

// ✅ Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

// ✅ Razorpay
const razorpay =
  new Razorpay({
    key_id:
      process.env.RAZORPAY_KEY_ID,

    key_secret:
      process.env.RAZORPAY_KEY_SECRET,
  });

// ✅ Create Order
app.post(
  "/create-order",
  async (req, res) => {

    try {

      const options = {
        amount: 29900,
        currency: "INR",
        receipt: "receipt_order_1",
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.json(order);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Order Failed"
      });

    }

  }
);

// ✅ Verify Payment
app.post(
  "/verify-payment",
  (req, res) => {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body =
      razorpay_order_id +
      "|" +
      razorpay_payment_id;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(body.toString())
        .digest("hex");

    if (
      expectedSignature ===
      razorpay_signature
    ) {

      console.log(
        "Payment verified ✅"
      );

      return res.json({
        success: true
      });

    } else {

      return res.status(400).json({
        success: false
      });

    }

  }
);

// ✅ Server Start
app.listen(5000, () => {

  console.log(
    "Server running on port 5000"
  );

});