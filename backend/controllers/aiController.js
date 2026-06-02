const {
  GoogleGenerativeAI
} = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const chatWithAI = async (req, res) => {

  try {

    const { message } = req.body;

    const model =
      genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
      });

    const result =
      await model.generateContent(
        message
      );

    const response =
      await result.response;

    const text =
      response.text();

    res.json({
      reply: text
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "AI Failed"
    });

  }

};

module.exports = {
  chatWithAI
};