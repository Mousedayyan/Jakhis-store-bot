const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const ID_INSTANCE = process.env.ID_INSTANCE;
const API_TOKEN = process.env.API_TOKEN;

async function sendMessage(chatId, text) {
  await axios.post(
    `https://api.green-api.com/waInstance${ID_INSTANCE}/sendMessage/${API_TOKEN}`,
    {
      chatId,
      message: text
    }
  );
}

app.post("/", async (req, res) => {
  try {
    const body = req.body;

    const msg =
      body.messageData?.textMessageData?.textMessage?.toLowerCase();

    const chatId = body.senderData?.chatId;

    if (!msg || !chatId) {
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
5. CapCut Pro
6. Disney+ Hotstar
7. Vidio Premier
8. Microsoft 365
9. ChatGPT Plus
10. Grok AI

Ketik ORDER untuk pesan.`
      );
    }

    if (msg.includes("order")) {
      await sendMessage(
        chatId,
`Format Order 🛒

Nama:
Produk:
Durasi:
Jumlah:
Metode pembayaran:`
      );
    }

    if (msg.includes("bayar")) {
      await sendMessage(
        chatId,
`Metode Pembayaran 💳

DANA:
OVO:
GoPay:
Bank:

Kirim bukti transfer ya kak.`
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.log(err.message);
    res.sendStatus(200);
  }
});

app.get("/", (req, res) => {
  res.send("Jakhis Store Bot aktif");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Bot jalan");
});
