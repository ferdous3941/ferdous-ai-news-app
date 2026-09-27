// server.js
// Simple Express server that serves a homepage and one AI-powered feature:
// "Today's Top 10 News" using the Google Gemini API with Google Search grounding.

require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the homepage (public/index.html) and any static files
app.use(express.static(path.join(__dirname, 'public')));

// AI feature endpoint
app.get('/api/news', async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is missing. Add it in Render > Environment.'
      });
    }

    const topic = (req.query.topic || '').trim();

    const promptText = topic
      ? `Search the web and find today's top 10 news headlines about "${topic}". ` +
        'Reply with ONLY a JSON array (no markdown, no extra text) of 10 objects, ' +
        'each shaped like {"title": "...", "summary": "..."} where summary is one short sentence. ' +
        'If fewer than 10 relevant results exist, return as many as you found.'
      : 'Search the web and find today\'s top 10 world news headlines. ' +
        'Reply with ONLY a JSON array (no markdown, no extra text) of 10 objects, ' +
        'each shaped like {"title": "...", "summary": "..."} where summary is one short sentence.';

    const model = 'gemini-3-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }]
          }
        ],
        tools: [{ google_search: {} }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return res.status(500).json({ error: data.error?.message || 'AI request failed' });
    }

    const parts = data.candidates?.[0]?.content?.parts || [];
    const textBlock = parts.map((p) => p.text || '').join('\n');

    const cleaned = textBlock.replace(/```json|```/g, '').trim();

    let news;
    try {
      news = JSON.parse(cleaned);
    } catch (parseErr) {
      news = [{ title: 'Could not parse news', summary: textBlock.slice(0, 300) }];
    }

    res.json({ news });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
