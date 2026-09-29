const express = require("express");
const app = express();
app.use(express.json());

const TARGET = process.env.TARGET_URL;

app.post("/receive", async (req, res) => {
  try {
    const r = await fetch(TARGET, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (err) {
    res.status(502).send("Forward failed: " + err.message);
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Running"));
