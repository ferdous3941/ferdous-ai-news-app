// server.js
// Simple Express server that serves a homepage and one AI-powered feature:
// "Today's Top 10 News" using Hugging Face's FREE Inference Providers router.
//
// NOTE: Hugging Face's free router does NOT do live web search/grounding
// like Gemini did (no google_search tool). So the model answers from its
// own training knowledge, not from today's actual live headlines. For a
// class assignment this is usually fine, but the "news" may not be 100%
// up-to-the-minute or fully accurate. If you need real live news later,
// you'd need to pair this with an actual news API.

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
    const apiKey = process.env.HF_TOKEN;

    if (!apiKey) {
      return res.status(500).json({
        error: 'HF_TOKEN is missing. Add it in Render > Environment.'
      });
    }

    const topic = (req.query.topic || '').trim();

    const promptText = topic
      ? `Give today's top 10 news headlines about "${topic}" based on your knowledge. ` +
        'Reply with ONLY a JSON array (no markdown, no extra text, no code fences) of 10 objects, ' +
        'each shaped like {"title": "...", "summary": "..."} where summary is one short sentence. ' +
        'If fewer than 10 relevant items exist, return as many as you can.'
      : "Give today's top 10 world news headlines based on your knowledge. " +
        'Reply with ONLY a JSON array (no markdown, no extra text, no code fences) of 10 objects, ' +
        'each shaped like {"title": "...", "summary": "..."} where summary is one short sentence.';

    // Hugging Face Inference Providers router — OpenAI-compatible endpoint (free tier available)
    const url = 'https://router.huggingface.co/v1/chat/completions';
    const model = 'meta-llama/Llama-3.1-8B-Instruct';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'user',
            content: promptText
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Hugging Face API error:', data);
      return res.status(500).json({ error: data.error?.message || 'AI request failed' });
    }

    const textBlock = data.choices?.[0]?.message?.content || '';
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
