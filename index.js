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
      chatId: chatId,
      message: text
    }
  );
}

app.get("/", (req, res) => {
  res.send("Jakhis Store Bot aktif");
});

app.post("/", async (req, res) => {
  try {
    console.log("WEBHOOK MASUK:", JSON.stringify(req.body));

    const body = req.body;

    const chatId = body.senderData?.chatId;

    const msg =
      body.messageData?.textMessageData?.textMessage?.toLowerCase() ||
      body.messageData?.extendedTextMessageData?.text?.toLowerCase() ||
      body.messageData?.quotedMessage?.textMessage?.toLowerCase() ||
      "";

    console.log("CHAT ID:", chatId);
    console.log("PESAN:", msg);

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
5. CapCut Pro
6. Disney+ Hotstar
7. Vidio Premier
8. Microsoft 365
9. ChatGPT Plus
10. Grok AI

Ketik ORDER untuk pesan.`
      );
    } else if (msg.includes("order")) {
      await sendMessage(
        chatId,
`Format Order 🛒

Nama:
Produk:
Durasi:
Jumlah:
Metode pembayaran:`
      );
    } else if (msg.includes("bayar")) {
      await sendMessage(
        chatId,
`Metode Pembayaran 💳

DANA:
OVO:
GoPay:
Bank:

Kirim bukti transfer ya kak.`
      );
    } else if (msg.includes("admin")) {
      await sendMessage(
        chatId,
`Halo kak 👋
Admin akan segera bantu.

Silakan tulis kendalanya dengan jelas ya.`
      );
    } else {
      await sendMessage(
        chatId,
`Halo kak 👋
Selamat datang di Jakhis Store.

Ketik:
PRODUK - lihat daftar produk
ORDER - format order
BAYAR - metode pembayaran
ADMIN - bantuan admin`
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Bot jalan di port " + PORT);
});
