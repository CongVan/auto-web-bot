const TeleBot = require("telebot");
const puppeteer = require("puppeteer");

const bot = new TeleBot("5492681556:AAGx6MC2bK6422g9y9tLyDOX9oKkF_5EFwE");

bot.on("text", async (data) => {
  const { entities, text } = data;
  const entityUrl = entities.find((e) => e.type === "url");
  if (!entityUrl) return;

  const url = text.substring(entityUrl.offset, entityUrl.length);
  if (!url) return;

  const browser = await puppeteer.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
  });
  await browser.close();
  data.reply.text("Done!");
  console.log("[Done] ", url);
});

bot.start();
