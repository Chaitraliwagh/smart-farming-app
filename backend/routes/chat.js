const express = require("express");
const axios = require("axios");
const router = express.Router();

console.log("✅ Chat routes loaded");
console.log("GEMINI KEY EXISTS:", !!process.env.GEMINI_API_KEY);

router.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    // Use v1 instead of v1beta for better stability with 1.5-flash
    const model = "gemini-2.5-flash"; 
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await axios.post(
      url,
      {
        contents: [
          {
          
parts: [
  {
    text: `SYSTEM INSTRUCTIONS:
    1. Role: You are a professional Smart Farming Assistant.
    2. LANGUAGE MATCHING: Respond in the EXACT same language the user uses. If they ask in English, answer in English. 
    3. BREVITY: Never write more than 150 words. 
    4. FORMATTING: Use Markdown. Use bullet points for steps. Avoid long paragraphs.
    5. No "Essays": Provide direct, practical advice only.

    USER QUESTION: ${message}`,
  },
],

          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({ error: "Empty AI response from Google" });
    }

    res.json({ reply });
  } catch (error) {
    // Log the specific error details from Google to your console
    console.error("AI ERROR DETAILS:", error.response?.data || error.message);
    
    res.status(500).json({ 
      error: "AI failed", 
      details: error.response?.data?.error?.message || "Internal Server Error" 
    });
  }
});

module.exports = router;