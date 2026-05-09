const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

const ID_INSTANCE = process.env.ID_INSTANCE;
const API_TOKEN = process.env.API_TOKEN;

async function sendMessage(chatId, text) {
  return axios.post(
    `https://7107.api.green-api.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`,
    {
      chatId: chatId,
      message: text
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}

app.get("/", (req, res) => {
  res.send("Jakhis Store Bot aktif");
});

app.post("/", async (req, res) => {
  try {
    console.log("WEBHOOK:", JSON.stringify(req.body));

    const body = req.body;

    const chatId = body.senderData?.chatId;

    const msg =
      body.messageData?.textMessageData?.textMessage?.toLowerCase() ||
      body.messageData?.extendedTextMessageData?.text?.toLowerCase() ||
      "";

    if (!chatId || !msg) {
      return res.sendStatus(200);
    }

    if (msg.includes("produk")) {
      await sendMessage(
        chatId,
`Daftar Produk Premium 🔥

1. Netflix Premium
2. Spotify Premium
3. Canva Pro
4. YouTube Premium
5. Grok AI

Ketik ORDER untuk pesan.`
      );
    } else if (msg.includes("order")) {
      await sendMessage(
        chatId,
`Format Order 🛒

Nama:
Produk:
Durasi:
Pembayaran:`
      );
    } else if (msg.includes("bayar")) {
      await sendMessage(
        chatId,
`Metode Pembayaran 💳

DANA:
OVO:
GoPay:

Kirim bukti transfer ya kak.`
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Bot jalan");
});
