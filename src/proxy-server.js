import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-segment", async (req, res) => {
  try {
    const response = await fetch(
      "https://webhook.site/70e876b6-8dc1-42bf-811f-c813c9d17198",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => console.log("Proxy running at http://localhost:4000"));
