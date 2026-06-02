const express = require("express");

const router = express.Router();

router.post("/chat", async (req, res) => {

  try {

    console.log("AI ROUTE HIT");

    const { message } = req.body;

    res.json({
      reply: "AI Reply: " + message
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI Error"
    });

  }

});

module.exports = router;