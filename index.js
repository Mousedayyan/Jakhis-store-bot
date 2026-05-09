const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const ID_INSTANCE = process.env.ID_INSTANCE;
const API_TOKEN = process.env.API_TOKEN;

app.get("/", (req, res) => {
  res.send("Bot aktif");
});

app.post("/", async (req, res) => {
  try {
    console.log("WEBHOOK:", JSON.stringify(req.body));

    const sender = req.body.senderData?.chatId;

    const message =
      req.body.messageData?.textMessageData?.textMessage || "";

    if (!sender) {
      return res.sendStatus(200);
    }

    let reply = "Perintah tidak dikenal";

    if (message.toLowerCase() === "produk") {
      reply =
        "📦 LIST PRODUK JAKHIS STORE\n\n" +
        "1. Panel Pterodactyl\n" +
        "2. VPS Digital Ocean\n" +
        "3. Bot WhatsApp\n" +
        "4. Script Bot\n\n" +
        "Ketik *admin* untuk hubungi admin.";
    }

    if (message.toLowerCase() === "admin") {
      reply = "👤 Admin Jakhis Store\n📞 081287192976";
    }

    const response = await axios.post(
      `https://7107.api.greenapi.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`,
      {
        chatId: sender,
        message: reply,
      }
    );

    console.log("Pesan terkirim:", response.data);

    res.sendStatus(200);
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Bot jalan di port", PORT);
});
