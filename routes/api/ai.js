const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const { GoogleGenAI } = require('@google/genai');
const config = require('config');

// Initialize Gemini SDK
const ai = new GoogleGenAI({ apiKey: config.get('geminiApiKey') });

// @route    POST api/ai/generate-bio
// @desc     Generate a professional bio using Gemini AI
// @access   Private
router.post(
  '/generate-bio',
  [
    auth,
    [
      check('skills', 'Skills are required for context').not().isEmpty(),
      check('status', 'Status is required for context').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { skills, status, company } = req.body;

    try {
      const prompt = `You are a professional profile bio generator for a developer social network called NeoDev. 
      Generate a short, professional, and catchy bio (maximum 2-3 sentences) for a developer with the following details:
      - Current Status/Role: ${status}
      - Skills: ${skills}
      ${company ? `- Company: ${company}` : ''}
      
      The bio should be written in first person ("I am..."). Do not include any quotation marks, greetings, or hashtags. Keep it concise and impactful.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const generatedBio = response.text.trim();
      res.json({ bio: generatedBio });
    } catch (err) {
      console.error("AI ROUTE ERROR:", err);
      res.status(500).send(err.message || 'AI Generation Failed. Please check your API key.');
    }
  }
);

// @route    POST api/ai/enhance-post
// @desc     Enhance user post text using Gemini AI
// @access   Private
router.post(
  '/enhance-post',
  [
    auth,
    [check('text', 'Text is required to enhance').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { text } = req.body;

    try {
      const prompt = `You are an AI assistant helping a software developer write a better post for a developer social network (like LinkedIn/Twitter for devs).
      Take the following raw text and improve its grammar, clarity, and professionalism. 
      If it's a technical post, make it sound confident. Add 2-3 relevant developer hashtags at the very end.
      Do not add any greetings like "Here is the enhanced post" - output ONLY the enhanced post content.
      
      Raw Text:
      "${text}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const enhancedText = response.text.trim();
      res.json({ text: enhancedText });
    } catch (err) {
      console.error("AI ROUTE ERROR:", err);
      res.status(500).send(err.message || 'AI Enhancement Failed. Please check your API key.');
    }
  }
);

module.exports = router;
